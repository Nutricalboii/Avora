'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Shader source ───────────────────────────────────────────────────
// Drop-in: replace VS/FS strings with your own .vs/.fs file contents.
// The canvas uniform contract is: u_time (float), u_resolution (vec2), u_mouse (vec2).
const INTRO_VS = `attribute vec2 a_position;varying vec2 v_uv;void main(){v_uv=a_position*0.5+0.5;gl_Position=vec4(a_position,0.0,1.0);}`;

const INTRO_FS = `precision highp float;
uniform float u_time;uniform vec2 u_resolution;uniform vec2 u_mouse;varying vec2 v_uv;

// ── Signed-distance field helpers ──────────────────────────────────
float sdCircle(vec2 p,float r){return length(p)-r;}
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}

// ── Noise ───────────────────────────────────────────────────────────
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.0,a=0.5;for(int i=0;i<6;i++){v+=a*noise(p);p=p*2.1+vec2(1.3,7.2);a*=0.5;}return v;}

void main(){
  vec2 uv=(gl_FragCoord.xy/u_resolution.xy)*2.0-1.0;
  uv.x*=u_resolution.x/u_resolution.y;
  float t=u_time*0.18;
  vec2 mouse=(u_mouse/u_resolution)*2.0-1.0;
  mouse.x*=u_resolution.x/u_resolution.y;

  /* Swirling domain warp */
  vec2 q=uv;
  q+=0.3*vec2(fbm(uv+t*0.4),fbm(uv+vec2(5.2,1.3)));
  vec2 r=uv;
  r+=0.4*vec2(fbm(q+t*0.3+vec2(1.7,9.2)+mouse*0.08),
               fbm(q+t*0.2+vec2(8.3,2.8)-mouse*0.06));

  float f=fbm(r+t*0.25);

  /* Gold palette ─ dark void → rich gold → cream highlight */
  vec3 void_   = vec3(0.06, 0.04, 0.01);
  vec3 amber   = vec3(0.45, 0.28, 0.02);
  vec3 gold    = vec3(0.80, 0.60, 0.08);
  vec3 pale    = vec3(0.97, 0.90, 0.72);
  vec3 white   = vec3(1.00, 0.97, 0.92);

  vec3 col = void_;
  col = mix(col, amber, smoothstep(0.0, 0.4, f));
  col = mix(col, gold,  smoothstep(0.3, 0.6, f));
  col = mix(col, pale,  smoothstep(0.5, 0.8, f));
  col = mix(col, white, smoothstep(0.78,0.95,f));

  /* Specular veins */
  float vein = pow(max(0.0, f-0.55), 3.0)*4.0;
  col += gold*vein*0.7;

  /* Depth vignette */
  float vig = 1.0-dot(uv*0.55,uv*0.55);
  col *= vig*0.7+0.3;

  /* Central glow under cursor/logo */
  float glow = exp(-length(uv-mouse*0.3)*2.5)*0.18;
  col += gold*glow;

  /* Film grain */
  float grain=fract(sin(dot(v_uv+u_time*0.01,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*0.022;

  gl_FragColor=vec4(col,1.0);
}`;

function useWebGL(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function sync() {
      if (!canvas) return;
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
      }
    }
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(sync) : null;
    ro?.observe(canvas); sync();

    const gl = (canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    const cs = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s); return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, cs(gl.VERTEX_SHADER, INTRO_VS));
    gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, INTRO_FS));
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uT = gl.getUniformLocation(prog, 'u_time');
    const uR = gl.getUniformLocation(prog, 'u_resolution');
    const uM = gl.getUniformLocation(prog, 'u_mouse');

    const onMM = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - r.left) / r.width * canvas.width,
        y: (1-(e.clientY - r.top) / r.height) * canvas.height,
      };
    };
    window.addEventListener('mousemove', onMM, { passive: true });

    const render = (t: number) => {
      if (!gl || !canvas) return;
      if (!ro) sync();
      gl.viewport(0,0,canvas.width,canvas.height);
      if (uT) gl.uniform1f(uT, t*0.001);
      if (uR) gl.uniform2f(uR, canvas.width, canvas.height);
      if (uM) gl.uniform2f(uM, mouseRef.current.x, mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMM);
      ro?.disconnect();
    };
  }, [canvasRef]);
}

export default function IntroPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);
  useWebGL(canvasRef);

  const enter = () => {
    if (leaving) return;
    setLeaving(true); sessionStorage.setItem('avora_intro_seen', '1');
    setTimeout(() => router.push('/home'), 800);
  };

  // Also enter on scroll
  useEffect(() => {
    let ticking = false;
    const onWheel = () => {
      if (!ticking) { ticking = true; enter(); }
    };
    window.addEventListener('wheel', onWheel, { passive: true, once: true });
    return () => window.removeEventListener('wheel', onWheel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          key="intro"
          className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* WebGL canvas — fills entire screen */}
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full"
          />

          {/* Dark overlay so text is legible */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 select-none">
            {/* Logo wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.0, ease: [0.22,1,0.36,1] }}
              className="mb-6"
            >
              <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-[#D4AF37]/80">
                Avora Ventures
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 1.1, ease: [0.22,1,0.36,1] }}
              className="font-heading text-[15vw] md:text-[10vw] lg:text-[8vw] uppercase leading-none tracking-wide mb-3"
              style={{
                background: 'linear-gradient(135deg, #F5E6A0 0%, #D4AF37 40%, #B8860B 70%, #FDF2C0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Avora
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1.0 }}
              className="font-sans text-base md:text-lg text-white/60 tracking-wide max-w-xs mb-16"
            >
              Institutional AI Infrastructure
            </motion.p>

            {/* CTA button */}
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8, ease: [0.22,1,0.36,1] }}
              onClick={enter}
              className="group relative flex items-center gap-3 px-8 py-4 border border-[#D4AF37]/50 text-[#D4AF37] font-sans font-semibold text-sm tracking-[0.12em] uppercase hover:bg-[#D4AF37]/10 transition-all duration-400"
            >
              <span>Enter Experience</span>
              <span className="text-[#D4AF37] transition-transform duration-300 group-hover:translate-x-1">→</span>
            </motion.button>

            {/* Scroll hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 2.4, duration: 1.0 }}
              className="absolute bottom-10 font-mono text-[10px] tracking-[0.25em] uppercase text-white/40"
            >
              or scroll down
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

