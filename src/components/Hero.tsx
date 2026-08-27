import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { useScrollProgress } from '../hooks/useScrollProgress';

export function Hero() {
  const sectionRef = useScrollProgress<HTMLElement>('exit');
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

    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(syncSize) : null;
    resizeObserver?.observe(canvas);
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
      resizeObserver?.disconnect();
      if (buf) gl.deleteBuffer(buf);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteProgram(prog);
    };
  }, []);

  // 2. Three.js 3D Wireframe Animation
  useEffect(() => {
    const container = threeContainerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const isMobile = window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));
    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.style.touchAction = 'none';
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    const geometry = new THREE.IcosahedronGeometry(isMobile ? 2.25 : 3.2, isMobile ? 1 : 2);
    const material = new THREE.MeshPhongMaterial({
      color: 0xD0190F,
      wireframe: true,
      transparent: true,
      opacity: isMobile ? 0.3 : 0.48
    });

    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);

    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: isMobile ? 0.05 : 0.065
    });
    const points = new THREE.Points(geometry, pointsMaterial);
    group.add(points);

    // Animated signals travel between network vertices to suggest connected
    // business processes becoming one digital system.
    const sourcePositions = geometry.getAttribute('position');
    const signalCount = isMobile ? 42 : 110;
    const signalPositions = new Float32Array(signalCount * 3);
    const signalFrom: THREE.Vector3[] = [];
    const signalTo: THREE.Vector3[] = [];
    const signalProgress = new Float32Array(signalCount);
    const signalSpeed = new Float32Array(signalCount);

    const readVertex = (index: number) => new THREE.Vector3(
      sourcePositions.getX(index),
      sourcePositions.getY(index),
      sourcePositions.getZ(index)
    );

    for (let i = 0; i < signalCount; i += 1) {
      const fromIndex = Math.floor(Math.random() * sourcePositions.count);
      let toIndex = Math.floor(Math.random() * sourcePositions.count);
      if (toIndex === fromIndex) toIndex = (toIndex + 1) % sourcePositions.count;
      signalFrom.push(readVertex(fromIndex));
      signalTo.push(readVertex(toIndex));
      signalProgress[i] = Math.random();
      signalSpeed[i] = 0.0025 + Math.random() * 0.004;
    }

    const signalGeometry = new THREE.BufferGeometry();
    signalGeometry.setAttribute('position', new THREE.BufferAttribute(signalPositions, 3));
    const signalMaterial = new THREE.PointsMaterial({
      color: 0xff4b3f,
      size: isMobile ? 0.075 : 0.105,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const signals = new THREE.Points(signalGeometry, signalMaterial);
    group.add(signals);

    const coreGeometry = new THREE.SphereGeometry(0.18, 20, 20);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xff3b30,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    scene.add(group);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xD0190F, 1.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = isMobile ? 6.2 : 6.8;

    let isDragging = false;
    let previousX = 0;
    let previousY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let isHovering = false;

    const handlePointerDown = (event: PointerEvent) => {
      isDragging = true;
      previousX = event.clientX;
      previousY = event.clientY;
      renderer.domElement.style.cursor = 'grabbing';
      renderer.domElement.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent) => {
      isHovering = true;
      const rect = renderer.domElement.getBoundingClientRect();
      pointerTargetY = ((event.clientX - rect.left) / rect.width - 0.5) * 0.28;
      pointerTargetX = ((event.clientY - rect.top) / rect.height - 0.5) * 0.18;

      if (!isDragging) return;

      const deltaX = event.clientX - previousX;
      const deltaY = event.clientY - previousY;
      velocityY = deltaX * 0.006;
      velocityX = deltaY * 0.006;
      previousX = event.clientX;
      previousY = event.clientY;
    };

    const handlePointerUp = (event: PointerEvent) => {
      isDragging = false;
      renderer.domElement.style.cursor = 'grab';
      if (renderer.domElement.hasPointerCapture(event.pointerId)) {
        renderer.domElement.releasePointerCapture(event.pointerId);
      }
    };

    const handlePointerLeave = () => {
      isHovering = false;
      pointerTargetX = 0;
      pointerTargetY = 0;
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    renderer.domElement.addEventListener('pointermove', handlePointerMove);
    renderer.domElement.addEventListener('pointerup', handlePointerUp);
    renderer.domElement.addEventListener('pointercancel', handlePointerUp);
    renderer.domElement.addEventListener('pointerleave', handlePointerLeave);

    let reqId: number;
    function animate(time = 0) {
      reqId = requestAnimationFrame(animate);
      if (!isDragging) {
        const autoRotation = prefersReducedMotion ? 0 : (isMobile ? 0.0012 : 0.002);
        velocityY += (autoRotation - velocityY) * 0.025;
        velocityX *= 0.94;
      } else {
        velocityY *= 0.96;
        velocityX *= 0.96;
      }
      group.rotation.y += velocityY;
      group.rotation.x += velocityX;
      group.rotation.x += (pointerTargetX - group.rotation.x * 0.03) * 0.002;
      group.rotation.z += (pointerTargetY - group.rotation.z) * 0.025;

      const positionAttribute = signalGeometry.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < signalCount; i += 1) {
        signalProgress[i] += signalSpeed[i] * (isHovering ? 1.8 : 1) * (prefersReducedMotion ? 0 : 1);
        if (signalProgress[i] > 1) {
          signalProgress[i] = 0;
          signalFrom[i].copy(signalTo[i]);
          signalTo[i].copy(readVertex(Math.floor(Math.random() * sourcePositions.count)));
        }
        const p = signalFrom[i].clone().lerp(signalTo[i], signalProgress[i]);
        positionAttribute.setXYZ(i, p.x, p.y, p.z);
      }
      positionAttribute.needsUpdate = true;

      const transformationCycle = (Math.sin(time * 0.00052) + 1) * 0.5;
      const pulse = 1 + Math.pow(transformationCycle, 8) * 0.16;
      group.scale.setScalar(pulse);
      core.scale.setScalar(1 + transformationCycle * 3.4);
      coreMaterial.opacity = 0.22 + transformationCycle * 0.68;
      material.opacity = (isHovering ? 0.63 : 0.44) + transformationCycle * 0.1;
      signalMaterial.opacity = isHovering ? 1 : 0.72 + transformationCycle * 0.2;
      pointLight.intensity = (isHovering ? 2.4 : 1.5) + transformationCycle * 0.8;
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
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('pointerup', handlePointerUp);
      renderer.domElement.removeEventListener('pointercancel', handlePointerUp);
      renderer.domElement.removeEventListener('pointerleave', handlePointerLeave);
      geometry.dispose();
      material.dispose();
      pointsMaterial.dispose();
      signalGeometry.dispose();
      signalMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <section ref={sectionRef} className="parallax-section hero-parallax relative z-20 flex min-h-[calc(100svh-6rem)] w-full items-center bg-[#0e0e0e] pt-20">
      
      <div className="parallax-hero-grid absolute inset-0 h-full w-full mix-blend-screen opacity-40">
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }}></canvas>
      </div>

      <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 50%, transparent 20%, #0e0e0e 80%)' }}></div>
      <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(14,14,14,0.9) 0%, transparent 100%)' }}></div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        <div className="parallax-hero-copy relative z-10 flex flex-col items-start gap-8 lg:col-span-8">
          <div className="flex flex-col">
            <span className="mb-4 max-w-full border-b border-[#D0190F]/30 pb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#D0190F] opacity-80 sm:w-max sm:text-xs sm:tracking-[0.2em]">
              Digital Transformation &amp; Technology Partner
            </span>
            <h1 className="max-w-5xl font-['Bebas_Neue'] text-5xl uppercase leading-[0.92] text-white mix-blend-exclusion sm:text-6xl md:text-7xl xl:text-8xl">
              We Build Digital Systems That Move Businesses Forward.
            </h1>
          </div>

          <p className="font-sans text-gray-400 text-lg max-w-2xl border-l-2 border-[#D0190F]/50 pl-6 leading-relaxed">
            From strategy and product architecture to engineering, AI, automation, and infrastructure — Soul Media Global turns complex business challenges into scalable digital systems.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4">
            <Link to="/work" className="relative group">
              <div className="absolute inset-0 bg-[#D0190F] opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative px-8 py-4 bg-[#D0190F] border-2 border-[#D0190F] text-white font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-4 transition-all duration-300 group-hover:bg-[#b5120a] cursor-pointer">
                Explore Our Work
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </div>
            </Link>
            <Link to="/contact" className="group px-8 py-4 bg-transparent border border-white/30 text-white font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-4 transition-all duration-300 hover:border-white hover:bg-white/5">
              Start a Project
              <span className="text-[#D0190F] group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>

        <div className="parallax-hero-object pointer-events-none absolute inset-0 z-30 lg:relative lg:inset-auto lg:col-span-4 lg:h-full">
          <div className="absolute w-[125%] h-[440px] -right-[58%] top-[58%] -translate-y-1/2 opacity-55 lg:w-[190%] lg:h-[720px] lg:-right-36 lg:top-1/2 lg:opacity-100">
            <div
              ref={threeContainerRef}
              aria-label="Interactive digital transformation network. Drag to rotate."
              className="absolute inset-0 pointer-events-auto"
            ></div>
            <div className="hero-network-labels">
              <div className="hero-signal-label hero-signal-label--strategy">Strategy</div>
              <div className="hero-signal-label hero-signal-label--product">Product</div>
              <div className="hero-signal-label hero-signal-label--engineering">Engineering</div>
              <div className="hero-signal-label hero-signal-label--ai">AI</div>
              <div className="hero-signal-label hero-signal-label--infrastructure">Infrastructure</div>
              <div className="hero-transformation-status" aria-hidden="true">
                <span>Business input</span><i></i><span>Connected system</span><i></i><span>Operational impact</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
