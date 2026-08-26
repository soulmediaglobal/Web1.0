import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import * as THREE from 'three';

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const threeContainerRef = useRef<HTMLDivElement | null>(null);

  // 1. WebGL Background Canvas Shader
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;

      float grid(vec2 uv, float res) {
          vec2 grid = fract(uv * res);
          return 1.0 - smoothstep(0.0, 0.03, min(grid.x, grid.y));
      }

      void main() {
          vec2 uv = v_texCoord;
          uv.x *= u_resolution.x / u_resolution.y;
          uv += 0.05 * vec2(sin(u_time * 0.3), cos(u_time * 0.2));
          
          float g1 = grid(uv, 12.0);
          float g2 = grid(uv, 3.0);
          
          vec3 color = vec3(0.05); // Base dark background
          
          // Vivid Crimson glow in background
          float glow = length(v_texCoord - vec2(0.7, 0.4)) * 0.6;
          color += vec3(0.81, 0.1, 0.06) * (1.0 - smoothstep(0.0, 0.7, glow)) * 0.25;
          
          // Animated wireframe grid lines
          color += vec3(0.25) * g1 * 0.4;
          color += vec3(0.81, 0.1, 0.06) * g2 * 0.3;
          
          float vig = 1.0 - length(v_texCoord - 0.5) * 0.6;
          color *= vig;

          gl_FragColor = vec4(color, 1.0);
      }
    `;

    const createShader = (glContext: WebGLRenderingContext, type: number, source: string) => {
      const shader = glContext.createShader(type)!;
      glContext.shaderSource(shader, source);
      glContext.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vs));
    gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');

    let animId: number;
    const render = (t: number) => {
      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  // 2. Three.js Animated 3D Wireframe (Right Side)
  useEffect(() => {
    const container = threeContainerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();

    // Crimson Icosahedron Geometry
    const geometry = new THREE.IcosahedronGeometry(1.8, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0xD0190F,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);

    // Vertex Glow Points
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.06,
    });
    const points = new THREE.Points(geometry, pointsMaterial);
    group.add(points);

    scene.add(group);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xD0190F, 2.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5.2;

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      group.rotation.y += 0.003;
      group.rotation.x += 0.0015;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="relative w-full h-[85vh] min-h-[650px] flex items-center overflow-hidden bg-[#0A0A0A]">
      {/* Dynamic Canvas Background Shader */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block opacity-70" />

      {/* Hero Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Copy Section */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          <span className="font-['JetBrains_Mono'] text-xs text-[#D0190F] tracking-[0.25em] uppercase border-b border-[#D0190F]/40 pb-2">
            MISSION CONTROL ENABLED
          </span>
          
          <h1 className="font-['Bebas_Neue'] text-7xl md:text-9xl text-white uppercase leading-[0.9] tracking-wider drop-shadow-2xl">
            ARCHITECTING<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#D0190F]">
              DIGITAL FUTURES
            </span>
          </h1>

          <p className="font-['Inter'] text-lg md:text-xl text-gray-300 max-w-2xl border-l-2 border-[#D0190F] pl-6 py-1 leading-relaxed">
            PT Soul Media Global merancang, membangun, dan mengintegrasikan ekosistem digital berkinerja tinggi untuk korporasi dan institusi publik secara efisien, aman, dan terukur.[cite: 1]
          </p>

          <button className="relative group mt-6 cursor-pointer">
            <div className="absolute inset-0 bg-[#D0190F] opacity-30 blur-xl group-hover:opacity-60 transition-opacity duration-500" />
            <div className="relative px-8 py-4 bg-[#0A0A0A]/80 border-2 border-[#D0190F] text-white font-['JetBrains_Mono'] text-xs uppercase tracking-widest flex items-center gap-4 transition-all duration-300 group-hover:bg-[#D0190F] group-hover:text-white">
              Explore Solutions
              <ArrowRight className="w-4 h-4 text-[#D0190F] group-hover:text-white group-hover:translate-x-2 transition-all duration-300" />
            </div>
          </button>
        </div>

        {/* Right 3D Wireframe Canvas */}
        <div className="hidden lg:block lg:col-span-5 h-[500px] relative">
          <div ref={threeContainerRef} className="w-full h-full relative z-10" />
        </div>

      </div>
    </section>
  );
};