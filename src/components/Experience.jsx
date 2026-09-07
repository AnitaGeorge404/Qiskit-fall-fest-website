import React, { useEffect, useRef, useState } from 'react';
import { Renderer, Camera, Transform, Orbit, GLTFLoader, Mesh, Geometry, Program } from 'ogl';
import TextType from './TextType';

function createShadowPlane(gl) {
  const geometry = new Geometry(gl, {
    position: { size: 3, data: new Float32Array([
      -1, 0, -1,
       1, 0, -1,
      -1, 0,  1,
       1, 0,  1
    ]) },
    uv: { size: 2, data: new Float32Array([
      0, 0,
      1, 0,
      0, 1,
      1, 1
    ]) },
    index: { data: new Uint16Array([0, 2, 1, 1, 2, 3]) }
  });

  const program = new Program(gl, {
    vertex: `
      attribute vec3 position;
      attribute vec2 uv;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragment: `
      precision highp float;
      varying vec2 vUv;
      void main() {
        float dist = distance(vUv, vec2(0.5));
        float alpha = smoothstep(0.5, 0.0, dist) * 0.4;
        gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
      }
    `,
    transparent: true,
    depthWrite: false
  });

  const mesh = new Mesh(gl, { geometry, program });
  mesh.rotation.x = -Math.PI / 2;
  return mesh;
}

export default function Experience() {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true });
    const gl = renderer.gl;
    // Set absolute positioning to fit inside the parent div correctly
    gl.canvas.style.position = 'absolute';
    gl.canvas.style.top = '0';
    gl.canvas.style.left = '0';
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 40 });
    camera.position.set(0, 0, 10);

    const controls = new Orbit(camera, {
      target: new Transform(),
      element: container,
      enablePan: false,
      enableZoom: false,
      minDistance: 4,
      maxDistance: 20
    });

    const scene = new Transform();

    // Fake drop shadow to replace ContactShadows
    const shadow = createShadowPlane(gl);
    shadow.position.y = -3;
    shadow.scale.set(6, 1, 6);
    shadow.setParent(scene);

    const modelContainer = new Transform();
    modelContainer.scale.set(5, 5, 5);
    modelContainer.setParent(scene);

    let modelLoaded = false;
    GLTFLoader.load(gl, '/models/quantum-computer.glb').then((gltf) => {
      setLoading(false);
      const model = gltf.scene || gltf.scenes[0];
      
      const bounds = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] };
      
      model.traverse((node) => {
        if (node.program) {
           if (node.geometry && node.geometry.attributes.position) {
              const pos = node.geometry.attributes.position.data;
              let minX=Infinity, minY=Infinity, minZ=Infinity;
              let maxX=-Infinity, maxY=-Infinity, maxZ=-Infinity;
              for(let i=0; i<pos.length; i+=3) {
                 minX = Math.min(minX, pos[i]);
                 minY = Math.min(minY, pos[i+1]);
                 minZ = Math.min(minZ, pos[i+2]);
                 maxX = Math.max(maxX, pos[i]);
                 maxY = Math.max(maxY, pos[i+1]);
                 maxZ = Math.max(maxZ, pos[i+2]);
              }
              const width = maxX - minX;
              const height = maxY - minY;
              const depth = maxZ - minZ;

              // Accumulate bounds for centering
              bounds.min[0] = Math.min(bounds.min[0], minX);
              bounds.min[1] = Math.min(bounds.min[1], minY);
              bounds.min[2] = Math.min(bounds.min[2], minZ);
              bounds.max[0] = Math.max(bounds.max[0], maxX);
              bounds.max[1] = Math.max(bounds.max[1], maxY);
              bounds.max[2] = Math.max(bounds.max[2], maxZ);

              // Apply original custom coloring logic
              const detRandom = (node.name.length) % 3;
              let r = 0.75, g = 0.75, b = 0.75; // Silver
              
              if (width > 1.0 && depth > 1.0 && height < 0.5) {
                // Gold
                r=0.83; g=0.68; b=0.21;
              } else if (height > 0.8 && width < 0.5 && depth < 0.5) {
                // Silver
                r=0.75; g=0.75; b=0.75;
              } else if (maxY > 2.0 && width > 1.5) {
                // Titanium
                r=0.62; g=0.62; b=0.62;
              } else {
                if (detRandom === 0) {
                  r=0.72; g=0.45; b=0.20; // Copper
                } else if (detRandom === 1) {
                  r=0.83; g=0.68; b=0.21; // Gold
                } else {
                  r=0.75; g=0.75; b=0.75; // Silver
                }
              }

              if (node.program.uniforms.uBaseColorFactor) {
                 node.program.uniforms.uBaseColorFactor.value = [r, g, b, 1];
              }
           }
        }
      });

      // Auto-center
      const cx = (bounds.min[0] + bounds.max[0]) / 2;
      const cy = (bounds.min[1] + bounds.max[1]) / 2;
      const cz = (bounds.min[2] + bounds.max[2]) / 2;
      if (isFinite(cx)) {
          model.position.set(-cx, -cy, -cz);
      }

      model.setParent(modelContainer);
      modelLoaded = true;
    }).catch(err => {
      console.error("Failed to load model:", err);
      setLoading(false);
    });

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;
      
      controls.update();
      
      if (modelLoaded) {
          modelContainer.rotation.y += 0.01;
      }
      
      renderer.render({ scene, camera });
    };
    
    animate();

    const handleResize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.perspective({ aspect: width / height });
    };
    
    // Slight delay for initial size to let layout settle
    setTimeout(handleResize, 50);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      controls.remove();
      if (container && gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
    };
  }, []);

  return (
    <section id="events" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
        {/* Left Column - 3D Quantum Computer Box */}
        <div className="w-full lg:w-1/2 bg-white/40 border border-[var(--border-color)] backdrop-blur-md rounded-2xl overflow-hidden relative flex flex-col p-0 items-center justify-center min-h-[500px] lg:min-h-[600px] shadow-2xl">
          <div className="absolute top-4 left-4 z-20">
            <div className="inline-block px-3 py-1 rounded-full bg-black/5 border border-[var(--border-color)] text-xs font-mono text-[var(--text-primary)] uppercase tracking-wider backdrop-blur-md">
              Interactive Hardware Model
            </div>
          </div>
          <div className="w-full h-full min-h-[500px] lg:min-h-[600px] cursor-grab active:cursor-grabbing relative" ref={containerRef}>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="text-[var(--text-primary)] font-mono text-sm whitespace-nowrap bg-white/80 border border-[var(--border-color)] px-4 py-2 rounded-md backdrop-blur-md shadow-sm">
                  Loading 3D Model...
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Core Objectives Box */}
        <div className="w-full lg:w-1/2 bg-white/40 border border-[var(--border-color)] backdrop-blur-md rounded-2xl p-8 md:p-12 text-[var(--text-primary)] flex flex-col justify-center shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-black mb-10 text-[var(--text-primary)]">
            <TextType text="What you will earn" loop={false} startOnVisible={true} />
          </h2>
          
          <div className="space-y-8 mb-10 flex-grow">
            <div className="flex gap-6 border-b border-[var(--border-color)] pb-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Learn from the flock</h3>
                <p className="text-[var(--muted-foreground)] text-base leading-relaxed">Connect with industry experts and learn quantum fundamentals from scratch.</p>
              </div>
            </div>
            <div className="flex gap-6 border-b border-[var(--border-color)] pb-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Build in the cloud</h3>
                <p className="text-[var(--muted-foreground)] text-base leading-relaxed">Run real quantum circuits directly on IBM Quantum hardware during the hackathon.</p>
              </div>
            </div>
            <div className="flex gap-6 pb-2">
              <div>
                <h3 className="text-xl font-bold mb-2">Share the sky</h3>
                <p className="text-[var(--muted-foreground)] text-base leading-relaxed">Collaborate with peers globally and present your innovative projects to the community.</p>
              </div>
            </div>
          </div>

          <div className="mt-auto bg-[var(--muted)]/50 p-5 rounded-lg text-sm leading-relaxed border-l-4 border-[var(--accent-pink)] text-[var(--muted-foreground)]">
            Open to the public. Registration is required. In-person attendees should confirm they can attend at IIIT Kottayam and consent to event photography during registration.
          </div>
        </div>
      </div>
    </section>
  );
}
