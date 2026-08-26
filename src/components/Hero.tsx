import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const threeContainerRef = useRef<HTMLDivElement>(null);

  // 1. WebGL Background Shader Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function syncSize() {
      const w = canvas?.clientWidth || 1280;
      const h = canvas?.clientHeight || 720;
      if (canvas && (canvas.width !== w || canvas.height !== h)) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    if (typeof ResizeObserver !== 'undefined' && canvas) {
      new ResizeObserver(syncSize).observe(canvas);
    }
    syncSize();

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    const vs = `attribute vec2 a_position;
    varying vec2 v_texCoord;
    void main() {
      v_texCoord = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }`;

    const fs = `precision highp float;
    varying vec2 v_texCoord;
    uniform float u_time;
    uniform vec2 u_resolution;

    float grid(vec2 uv, float res) {
        vec2 grid = fract(uv * res);
        return 1.0 - smoothstep(0.0, 0.02, min(grid.x, grid.y));
    }

    void main() {
        vec2 uv = v_texCoord;
        uv.x *= u_resolution.x / u_resolution.y;
        uv += 0.05 * vec2(sin(u_time * 0.2), cos(u_time * 0.15));
        
        float g1 = grid(uv, 10.0);
        float g2 = grid(uv, 2.0);
        
        vec3 color = vec3(0.04); 
        float glow = length(v_texCoord - vec2(0.8, 0.2)) * 0.5;
        color += vec3(0.81, 0.1, 0.06) * (1.0 - smoothstep(0.0, 0.8, glow)) * 0.05;
        
        color += vec3(0.15) * g1 * 0.3;
        color += vec3(0.2) * g2 * 0.5;
        
        float vig = 1.0 - length(v_texCoord - 0.5) * 0.7;
        color *= vig;

        gl_FragColor = vec4(color, 1.0);
    }`;

    function cs(type: number, src: string) {
      const s = gl?.createShader(type);
      if (!s || !gl) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const vertShader = cs(gl.VERTEX_SHADER, vs);
    const fragShader = cs(gl.FRAGMENT_SHADER, fs);
    if (!vertShader || !fragShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vertShader);
    gl.attachShader(prog, fragShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');

    let animId: number;
    function render(t: number) {
      syncSize();
      if (!canvas || !gl) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    }
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  // 2. Three.js 3D Wireframe Animation
  useEffect(() => {
    const container = threeContainerRef.current;
    if (!container || !(window as any).THREE) return;

    const THREE = (window as any).THREE;
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    const geometry = new THREE.IcosahedronGeometry(1.5, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0xD0190F,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });

    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);

    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05
    });
    const points = new THREE.Points(geometry, pointsMaterial);
    group.add(points);

    scene.add(group);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xD0190F, 1.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;

    let reqId: number;
    function animate() {
      reqId = requestAnimationFrame(animate);
      group.rotation.y += 0.002;
      group.rotation.x += 0.001;
      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center pt-20 overflow-hidden bg-[#0e0e0e]">
      
      <div className="absolute inset-0 w-full h-full mix-blend-screen opacity-40">
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }}></canvas>
      </div>

      <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 50%, transparent 20%, #0e0e0e 80%)' }}></div>
      <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(14,14,14,0.9) 0%, transparent 100%)' }}></div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        <div className="lg:col-span-8 flex flex-col items-start gap-8">
          <div className="flex flex-col">
            <span className="font-mono text-xs text-[#D0190F] tracking-[0.2em] uppercase mb-4 opacity-80 border-b border-[#D0190F]/30 pb-2 w-max">
              Mission Control Enabled
            </span>
            <h1 className="font-['Bebas_Neue'] text-6xl md:text-8xl text-white uppercase leading-none mix-blend-exclusion">
              Architecting<br />Digital Futures
            </h1>
          </div>

          <p className="font-sans text-gray-400 text-lg max-w-2xl border-l-2 border-[#D0190F]/50 pl-6 leading-relaxed">
            Enterprise IT consulting and digital transformation for Indonesia's market leaders. We build resilient systems for high-stakes environments.
          </p>

          <Link to="/solutions" className="relative group mt-4">
            <div className="absolute inset-0 bg-[#D0190F] opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative px-8 py-4 bg-transparent border-2 border-[#D0190F] text-white font-mono text-xs uppercase tracking-widest flex items-center gap-4 transition-all duration-300 group-hover:bg-[#D0190F]/10 cursor-pointer">
              Explore Solutions
              <span className="text-[#D0190F] group-hover:translate-x-2 transition-transform duration-300">→</span>
            </div>
          </Link>
        </div>

        <div className="hidden lg:block lg:col-span-4 h-full relative">
          <div ref={threeContainerRef} className="absolute inset-0 w-full h-[600px] -right-24 top-1/2 -translate-y-1/2"></div>
        </div>

      </div>
    </section>
  );
}