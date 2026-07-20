'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Shader source ───────────────────────────────────────────────────
const INTRO_VS = `attribute vec2 a_position;varying vec2 v_uv;void main(){v_uv=a_position*0.5+0.5;gl_Position=vec4(a_position,0.0,1.0);}`;

const INTRO_FS = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_uv;

vec3 sim(vec3 p,float s);
vec2 rot(vec2 p,float r);
vec2 rotsim(vec2 p,float s);
vec2 zoom(vec2 p,float f);

vec2 makeSymmetry(vec2 p){
   vec2 ret=p;
   ret=rotsim(ret,sin(u_time*0.3)*2.0+3.0);
   ret.x=abs(ret.x);
   return ret;
}

float makePoint(float x,float y,float fx,float fy,float sx,float sy,float t){
   float xx=x+tan(t*fx)*sy;
   float yy=y-tan(t*fy)*sy;
   float a=0.5/sqrt(abs(abs(x*xx)+abs(yy*y)));
   float b=0.5/sqrt(abs(x*xx+yy*y));
   return a*b;
}

const float PI=3.14159265;

vec3 sim(vec3 p,float s){
   vec3 ret=p;
   ret=p+s/2.0;
   ret=fract(ret/s)*s-s/4.0;
   return ret;
}

vec2 rot(vec2 p,float r){
   vec2 ret;
   ret.x=p.x*sin(r)*cos(r)-p.y*cos(r);
   ret.y=p.x*cos(r)+p.y*sin(r);
   return ret;
}

vec2 rotsim(vec2 p,float s){
   vec2 ret=p;
   ret=rot(p,-PI/(s*2.0));
   ret=rot(p,floor(atan(ret.x,ret.y)/PI*s)*(PI/s));
   return ret;
}

vec2 zoom(vec2 p,float f){
    return vec2(p.x*f,p.y*f);
}

void main( void ) {
   vec2 p = gl_FragCoord.xy/u_resolution.y-vec2((u_resolution.x/u_resolution.y)/2.0,0.5);
   p=rot(p,sin(u_time+length(p))*4.0);
   p=zoom(p,sin(u_time*2.0)*0.5+0.8);
   p=p*2.0;
   float x=p.x;
   float y=p.y;
   float speed = 0.3;
   float level = 0.3;
   float t = u_time * speed;
   float a, b, c;
   a = makePoint(x,y,3.3,2.9,0.3,0.3,t);
   a=a+makePoint(x,y,1.9,2.0,0.4,0.4,t);
   a=a+makePoint(x,y,0.8,0.7,0.4,0.5,t);
   a=a+makePoint(x,y,2.3,0.1,0.6,0.3,t);
   a=a+makePoint(x,y,0.8,1.7,0.5,0.4,t);
   a=a+makePoint(x,y,0.3,1.0,0.4,0.4,t);
   a=a+makePoint(x,y,1.4,1.7,0.4,0.5,t);
   a=a+makePoint(x,y,1.3,2.1,0.6,0.3,t);
   a=a+makePoint(x,y,1.8,1.7,0.5,0.4,t);
   b=makePoint(x,y,1.2,1.9,0.3,0.3,t);
   b=b+makePoint(x,y,0.7,2.7,0.4,0.4,t);
   b=b+makePoint(x,y,1.4,0.6,0.4,0.5,t);
   b=b+makePoint(x,y,2.6,0.4,0.6,0.3,t);
   b=b+makePoint(x,y,0.7,1.4,0.5,0.4,t);
   b=b+makePoint(x,y,0.7,1.7,0.4,0.4,t);
   b=b+makePoint(x,y,0.8,0.5,0.4,0.5,t);
   b=b+makePoint(x,y,1.4,0.9,0.6,0.3,t);
   b=b+makePoint(x,y,0.7,1.3,0.5,0.4,t);
   c=makePoint(x,y,3.7,0.3,0.3,0.3,t);
   c=c+makePoint(x,y,1.9,1.3,0.4,0.4,t);
   c=c+makePoint(x,y,0.8,0.9,0.4,0.5,t);
   c=c+makePoint(x,y,1.2,1.7,0.6,0.3,t);
   c=c+makePoint(x,y,0.3,0.6,0.5,0.4,t);
   c=c+makePoint(x,y,0.3,0.3,0.4,0.4,t);
   c=c+makePoint(x,y,1.4,0.8,0.4,0.5,t);
   c=c+makePoint(x,y,0.2,0.6,0.6,0.3,t);
   c=c+makePoint(x,y,1.3,0.5,0.5,0.4,t);

   vec3 d=vec3(a,b,c)*level/10.0;
   gl_FragColor = vec4(d.x,d.y,d.z,1.0);
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
              <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-white/80">
                Avora Ventures
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 1.1, ease: [0.22,1,0.36,1] }}
              className="font-heading text-[15vw] md:text-[10vw] lg:text-[8vw] uppercase leading-none tracking-wide mb-3 text-white"
            >
              Avora
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1.0 }}
              className="font-sans text-base md:text-lg text-white/80 tracking-wide max-w-xs mb-16"
            >
              Institutional AI Infrastructure
            </motion.p>

            {/* CTA button */}
            <motion.button
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8, ease: [0.22,1,0.36,1] }}
              onClick={enter}
              className="group relative flex items-center gap-3 px-8 py-4 border border-white/50 text-white font-sans font-semibold text-sm tracking-[0.12em] uppercase hover:bg-white/10 transition-all duration-400"
            >
              <span>Enter Experience</span>
              <span className="text-white transition-transform duration-300 group-hover:translate-x-1">→</span>
            </motion.button>

            {/* Scroll hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 2.4, duration: 1.0 }}
              className="absolute bottom-10 font-mono text-[10px] tracking-[0.25em] uppercase text-white/60"
            >
              or scroll down
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
