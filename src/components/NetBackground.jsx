import React, { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Geometry, Program, Mesh } from 'ogl';

export default function NetBackground({
  particleCount = 250,
  particleColor = '#555555',
  lineColor = '#aaaaaa',
  backgroundColor = '#ffffff',
  maxDistance = 120,
  interactive = true,
  className = "fixed inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden",
  style,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer Setup
    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 2), alpha: true });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    // Convert hex string/number to normalized RGB array
    const hexToRgb = (hex) => {
      let color = typeof hex === 'number' ? hex : parseInt(hex.replace('#', ''), 16);
      return [((color >> 16) & 255) / 255, ((color >> 8) & 255) / 255, (color & 255) / 255];
    };
    const pColor = hexToRgb(particleColor);
    const lColor = hexToRgb(lineColor);
    const bgColor = hexToRgb(backgroundColor);
    
    gl.clearColor(bgColor[0], bgColor[1], bgColor[2], 1);

    const camera = new Camera(gl, { fov: 45 });
    camera.position.z = 400;

    const scene = new Transform();

    // 2. Create Particles
    const particlesData = [];
    const particlePositions = new Float32Array(particleCount * 3);
    const range = 800;

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * range;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * range;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * range;
      
      particlesData.push({
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        vz: (Math.random() - 0.5) * 0.8,
      });
    }

    const particlesGeometry = new Geometry(gl, {
      position: { size: 3, data: particlePositions }
    });

    const particlesProgram = new Program(gl, {
      vertex: `
        attribute vec3 position;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 5.0 * (400.0 / length(gl_Position.xyz));
        }
      `,
      fragment: `
        precision highp float;
        uniform vec3 uColor;
        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          if(length(coord) > 0.5) discard;
          gl_FragColor = vec4(uColor, 0.8);
        }
      `,
      uniforms: {
        uColor: { value: pColor }
      },
      transparent: true
    });

    const particlesMesh = new Mesh(gl, { mode: gl.POINTS, geometry: particlesGeometry, program: particlesProgram });
    particlesMesh.setParent(scene);

    // 3. Create Lines
    const maxConnections = (particleCount * (particleCount - 1)) / 2;
    const linePositions = new Float32Array(maxConnections * 6);
    
    const linesGeometry = new Geometry(gl, {
      position: { size: 3, data: linePositions }
    });
    
    const linesProgram = new Program(gl, {
      vertex: `
        attribute vec3 position;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec3 uColor;
        void main() {
          gl_FragColor = vec4(uColor, 0.25);
        }
      `,
      uniforms: {
        uColor: { value: lColor }
      },
      transparent: true,
      depthTest: false
    });

    const linesMesh = new Mesh(gl, { mode: gl.LINES, geometry: linesGeometry, program: linesProgram });
    linesMesh.setParent(scene);

    // 4. Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    const handleMouseMove = (event) => {
      if (!interactive) return;
      mouseX = (event.clientX - windowHalfX) * 0.1;
      mouseY = (event.clientY - windowHalfY) * 0.1;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    // 5. Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      // Camera parallax
      targetX = mouseX * 1.5;
      targetY = mouseY * 1.5;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;
      camera.lookAt([scene.position.x, scene.position.y, scene.position.z]);

      let vertexpos = 0;

      for (let i = 0; i < particleCount; i++) {
        const pd = particlesData[i];
        particlePositions[i * 3] += pd.vx;
        particlePositions[i * 3 + 1] += pd.vy;
        particlePositions[i * 3 + 2] += pd.vz;

        if (particlePositions[i * 3 + 1] < -range / 2 || particlePositions[i * 3 + 1] > range / 2) pd.vy *= -1;
        if (particlePositions[i * 3] < -range / 2 || particlePositions[i * 3] > range / 2) pd.vx *= -1;
        if (particlePositions[i * 3 + 2] < -range / 2 || particlePositions[i * 3 + 2] > range / 2) pd.vz *= -1;

        for (let j = i + 1; j < particleCount; j++) {
          const dx = particlePositions[i * 3] - particlePositions[j * 3];
          const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
          const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistance * maxDistance) {
            linePositions[vertexpos++] = particlePositions[i * 3];
            linePositions[vertexpos++] = particlePositions[i * 3 + 1];
            linePositions[vertexpos++] = particlePositions[i * 3 + 2];

            linePositions[vertexpos++] = particlePositions[j * 3];
            linePositions[vertexpos++] = particlePositions[j * 3 + 1];
            linePositions[vertexpos++] = particlePositions[j * 3 + 2];
          }
        }
      }

      particlesGeometry.attributes.position.needsUpdate = true;

      linesGeometry.setDrawRange(0, vertexpos / 3);
      linesGeometry.attributes.position.needsUpdate = true;

      scene.rotation.y += 0.0005;

      renderer.render({ scene, camera });
    };

    animate();

    // 6. Handle Window Resizing
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);

      if (container && gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
    };
  }, [particleCount, particleColor, lineColor, backgroundColor, maxDistance, interactive]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={style}
    />
  );
}
