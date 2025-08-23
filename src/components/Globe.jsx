import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';

// Import raven images directly
import ravenHuginnImage from '../assets/raven_huginn.png';
import ravenMuninnImage from '../assets/raven_muninn.png';
import earthDaymapImage from '../assets/earth_daymap.jpg';

// Raven component that orbits around the globe
function Raven({ radius = 3, speed = 0.5, offset = 0, name, imagePath }) {
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
      {/* Raven sprite using the actual image */}
      <sprite scale={[0.8, 0.8, 1]}>
        <spriteMaterial 
          map={new THREE.TextureLoader().load(imagePath)}
          transparent={true}
          opacity={0.9}
        />
      </sprite>
      {/* Glow effect */}
      <pointLight color="#ffd700" intensity={0.3} distance={2} />
      {/* Name label */}
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.1}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/mono.woff"
      >
        {name}
      </Text>
    </group>
  );
}

// Earth globe component
function Earth() {
  const earthRef = useRef();
  const [texture, setTexture] = useState(null);
  
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(earthDaymapImage, (loadedTexture) => {
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
      <Raven 
        radius={3.5} 
        speed={0.3} 
        offset={0} 
        name="Huginn (Thought)" 
        imagePath={ravenHuginnImage}
      />
      <Raven 
        radius={4} 
        speed={0.25} 
        offset={Math.PI} 
        name="Muninn (Memory)" 
        imagePath={ravenMuninnImage}
      />
      
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


