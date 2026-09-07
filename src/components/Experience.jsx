import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF, Html, Center } from '@react-three/drei';
import * as THREE from 'three';

/* 
function QuantumModel(props) {
  const { scene } = useGLTF('/models/quantum-computer.glb');
  
  React.useLayoutEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.geometry.computeBoundingBox();
        const bbox = child.geometry.boundingBox;
        const width = bbox.max.x - bbox.min.x;
        const height = bbox.max.y - bbox.min.y;
        const depth = bbox.max.z - bbox.min.z;

        const newMaterial = new THREE.MeshStandardMaterial({
          metalness: 0.8,
          roughness: 0.25 
        });

        const detRandom = (child.name.length + child.uuid.length) % 3;

        if (width > 1.0 && depth > 1.0 && height < 0.5) {
          // Flat disks -> Gold
          newMaterial.color.set('#D4AF37');
        } else if (height > 0.8 && width < 0.5 && depth < 0.5) {
          // Tall thin objects -> Silver
          newMaterial.color.set('#C0C0C0');
          newMaterial.metalness = 0.9;
        } else if (bbox.max.y > 2.0 && width > 1.5) {
          // Huge top flange -> Darker Titanium
          newMaterial.color.set('#A0A0A0');
          newMaterial.metalness = 0.8;
        } else {
          // Smaller components
          if (detRandom === 0) {
            newMaterial.color.set('#B87333'); // Copper
          } else if (detRandom === 1) {
            newMaterial.color.set('#D4AF37'); // Gold
          } else {
            newMaterial.color.set('#C0C0C0'); // Silver
          }
        }

        child.material = newMaterial;
      }
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}
useGLTF.preload('/models/quantum-computer.glb');
*/

export default function Experience() {
  return (
    <section id="events" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="flex flex-col lg:flex-row gap-8 min-h-[500px]">
        {/* Left Column - 3D Quantum Computer */}
        <div className="w-full lg:w-1/2 bg-[var(--muted)] rounded-md border-t border-b md:border-r md:border-t-0 md:border-b-0 border-[var(--border-color)] overflow-hidden relative flex flex-col p-0 items-center justify-center min-h-[500px]">
          
          <div className="w-full h-full min-h-[500px] cursor-grab active:cursor-grabbing">
            {/* 3D Model temporarily removed 
            <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
              
              <ambientLight intensity={1.2} />
              <directionalLight position={[10, 10, 10]} intensity={1.0} color="#ffffff" />
              <directionalLight position={[-10, 10, -10]} intensity={0.5} color="#ffffff" />
              <directionalLight position={[10, -10, -10]} intensity={0.5} color="#ffffff" />
              <directionalLight position={[-10, -10, 10]} intensity={0.5} color="#ffffff" />
              <directionalLight position={[0, 0, 15]} intensity={1.0} color="#ffffff" />
              
              <Suspense fallback={<Html center><div className="text-[var(--text-primary)] font-mono text-sm whitespace-nowrap">Loading 3D Model...</div></Html>}>
                <Center>
                  <QuantumModel scale={7.5} />
                </Center>
                <Environment preset="city" />
                <ContactShadows position={[0, -5, 0]} opacity={0.4} scale={20} blur={2} far={10} />
              </Suspense>
              
              <OrbitControls 
                enablePan={false} 
                enableZoom={true} 
                zoomSpeed={3}
                rotateSpeed={2.5}
                panSpeed={2}
                minDistance={4} 
                maxDistance={25}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
            */}
            <div className="flex items-center justify-center w-full h-full min-h-[500px] text-gray-500 font-mono text-sm">
              [ 3D Model Placeholder ]
            </div>
          </div>
          
        </div>

        {/* Right Column - Features */}
        <div className="w-full lg:w-1/2 bg-[var(--text-primary)] rounded-md p-8 md:p-12 text-[var(--bg-primary)] flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-black mb-12">Learn. Build. Share.</h2>
          
          <div className="space-y-8 mb-12 flex-grow">
            <div className="flex gap-6 border-b border-[var(--bg-primary)]/20 pb-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Learn from the flock</h3>
                <p className="opacity-90">Connect with industry experts and learn quantum fundamentals from scratch.</p>
              </div>
            </div>
            <div className="flex gap-6 border-b border-[var(--bg-primary)]/20 pb-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Build in the cloud</h3>
                <p className="opacity-90">Run real quantum circuits directly on IBM Quantum hardware during the hackathon.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Share the sky</h3>
                <p className="opacity-90">Collaborate with peers globally and present your innovative projects to the community.</p>
              </div>
            </div>
          </div>

          <div className="mt-auto bg-[var(--bg-primary)]/10 p-4 text-xs leading-relaxed border-l-2 border-[var(--accent-pink)]">
            Open to the public. Registration is required. In-person attendees should confirm they can attend at IIIT Kottayam and consent to event photography during registration.
          </div>
        </div>
      </div>
    </section>
  );
}
