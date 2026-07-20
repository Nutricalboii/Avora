'use client';

import { useEffect, useRef } from 'react';

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 640, y: 360 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
      }
    }
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(syncSize) : null;
    ro?.observe(canvas);
    syncSize();

    const gl = (canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    const VS = `attribute vec2 a_position;varying vec2 v_uv;void main(){v_uv=a_position*0.5+0.5;gl_Position=vec4(a_position,0.0,1.0);}`;

    // High-contrast, clearly visible cream & gold fluid shader
    const FS = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_uv;

void main() {
  vec2 p=(gl_FragCoord.xy*2.0-u_resolution.xy)/min(u_resolution.x,u_resolution.y);
  float t=u_time*0.12;
  vec2 mouse=(u_mouse/u_resolution)-0.5;
  for(float n=1.0;n<8.0;n++){
    p.x+=0.5/n*sin(n*p.y+t+0.6*n)+mouse.x*0.04;
    p.y+=0.4/n*sin(n*p.x+t+0.4*n)-mouse.y*0.04;
  }
  
  // Light, airy pastel blues
  vec3 lightCyan = vec3(0.55, 0.85, 0.95);
  vec3 veryPaleBlue = vec3(0.85, 0.95, 1.0);
  vec3 gold = vec3(0.85, 0.65, 0.15);
  vec3 darkGold = vec3(0.50, 0.35, 0.05);

  float flow = abs(sin(p.x*1.2+p.y*1.2+t*0.5));

  // Base background (bright rippling water)
  float shadow = smoothstep(0.10, 0.90, flow);
  vec3 color = mix(lightCyan, veryPaleBlue, shadow);

  // Gold veins (highly contrasty)
  float vein = smoothstep(0.32, 0.62, flow);
  color = mix(color, gold, vein * 0.7);

  // Dark gold in troughs for depth
  float trough = smoothstep(0.0, 0.30, flow);
  color = mix(color, darkGold, trough * 0.3);

  // Specular highlights (shiny liquid gold and bright water reflections)
  float ridge = pow(max(0.0,1.0-flow), 14.0);
  color += vec3(1.0, 0.9, 0.5) * ridge * 0.8; // More yellowish-white specular

  // Warm shimmer wave
  float shimmer = sin(p.x*3.0+p.y*2.0+t*2.0)*0.5+0.5;
  color += gold * shimmer * 0.08;

  // Very slight grain
  float grain = fract(sin(dot(v_uv+u_time*0.007,vec2(12.9898,78.233)))*43758.5453);
  color += (grain-0.5)*0.015;

  gl_FragColor=vec4(color,1.0);
}`;

    function compileShader(type: number, src: string): WebGLShader {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime  = gl.getUniformLocation(prog, 'u_time');
    const uRes   = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width * canvas!.width,
        y: (1 - (e.clientY - rect.top) / rect.height) * canvas!.height,
      };
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    function render(t: number) {
      if (!gl || !canvas) return;
      if (!ro) syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime)  gl.uniform1f(uTime, t * 0.001);
      if (uRes)   gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    }
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      ro?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: -10,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}


