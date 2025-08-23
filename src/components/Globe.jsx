import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';

// Raven component that orbits around the globe
function Raven({ radius = 3, speed = 0.5, offset = 0, name }) {
  const ravenRef = useRef();
  
  useFrame((state) => {
    if (ravenRef.current) {
      const time = state.clock.getElapsedTime() * speed + offset;
      ravenRef.current.position.x = Math.cos(time) * radius;
      ravenRef.current.position.z = Math.sin(time) * radius;
      ravenRef.current.position.y = Math.sin(time * 0.5) * 0.5;
      
      // Make raven look forward in its orbit direction
      ravenRef.current.lookAt(
        Math.cos(time + 0.1) * radius,
        ravenRef.current.position.y,
        Math.sin(time + 0.1) * radius
      );
    }
  });

  return (
    <group ref={ravenRef}>
      {/* Simple raven representation */}
      <mesh>
        <boxGeometry args={[0.1, 0.05, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Wings */}
      <mesh position={[-0.08, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.15, 0.02, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.08, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.15, 0.02, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Glow effect */}
      <pointLight color="#00ffff" intensity={0.5} distance={2} />
    </group>
  );
}

// Earth globe component
function Earth() {
  const earthRef = useRef();
  const [texture, setTexture] = useState(null);
  
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/src/assets/earth_daymap.jpg', (loadedTexture) => {
      setTexture(loadedTexture);
    });
  }, []);
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial 
        map={texture}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

// Prompt flow visualization
function PromptFlow() {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newParticle = {
        id: Date.now(),
        position: [Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5],
        target: [0, 0, 0],
        life: 1.0
      };
      
      setParticles(prev => [...prev.slice(-20), newParticle]);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      {particles.map(particle => (
        <mesh key={particle.id} position={particle.position}>
          <sphereGeometry args={[0.02]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={particle.life} />
        </mesh>
      ))}
    </>
  );
}

// Main Globe Scene
function GlobeScene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} color="#0088ff" intensity={0.5} />
      
      {/* Earth */}
      <Earth />
      
      {/* Ravens - Huginn and Muninn */}
      <Raven radius={3.5} speed={0.3} offset={0} name="Huginn" />
      <Raven radius={4} speed={0.25} offset={Math.PI} name="Muninn" />
      
      {/* Prompt Flow */}
      <PromptFlow />
      
      {/* Controls */}
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        minDistance={5}
        maxDistance={15}
      />
    </>
  );
}

// Main Globe Component
export default function Globe({ className = "" }) {
  return (
    <div className={`w-full h-[600px] ${className}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <GlobeScene />
      </Canvas>
    </div>
  );
}

