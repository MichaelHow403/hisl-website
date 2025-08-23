import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Enhanced Raven component with better animations
function Raven({ position, color, name, speed = 1 }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * speed;
      const radius = 3.5;
      meshRef.current.position.x = Math.cos(time) * radius;
      meshRef.current.position.z = Math.sin(time) * radius;
      meshRef.current.position.y = Math.sin(time * 2) * 0.5;
      
      // Add rotation for more dynamic movement
      meshRef.current.rotation.y = time;
      
      // Scale effect when hovered
      const scale = hovered ? 1.5 : 1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[0.3, 0.2, 0.1]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={hovered ? 0.8 : 0.3}
      />
      {/* Add a glowing trail effect */}
      <mesh position={[-0.5, 0, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.6}
        />
      </mesh>
    </mesh>
  );
}

// Enhanced Earth component with better materials
function Earth() {
  const meshRef = useRef();
  const [texture, setTexture] = useState(null);
  
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    // Create a simple procedural earth texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Create a gradient for the earth
    const gradient = ctx.createLinearGradient(0, 0, 512, 256);
    gradient.addColorStop(0, '#1e3a8a');
    gradient.addColorStop(0.3, '#1e40af');
    gradient.addColorStop(0.6, '#2563eb');
    gradient.addColorStop(1, '#3b82f6');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 256);
    
    // Add some landmass-like patterns
    ctx.fillStyle = '#059669';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 256;
      const size = Math.random() * 50 + 20;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const earthTexture = new THREE.CanvasTexture(canvas);
    setTexture(earthTexture);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2.5, 64, 64]}>
      <meshStandardMaterial
        map={texture}
        emissive="#1e40af"
        emissiveIntensity={0.1}
        roughness={0.8}
        metalness={0.2}
      />
    </Sphere>
  );
}

// Data pulse effect
function DataPulse({ position, delay = 0 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() + delay;
      const scale = 1 + Math.sin(time * 3) * 0.3;
      meshRef.current.scale.setScalar(scale);
      
      // Fade in and out
      const opacity = (Math.sin(time * 2) + 1) * 0.5;
      meshRef.current.material.opacity = opacity * 0.6;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial 
        color="#00ffff" 
        transparent 
        opacity={0.6}
      />
    </mesh>
  );
}

export default function EnhancedInteractiveGlobe() {
  return (
    <div className="w-full h-96 relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        {/* Enhanced lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
        
        {/* Background stars */}
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1}
        />
        
        {/* Enhanced Earth */}
        <Earth />
        
        {/* Enhanced Ravens with different speeds and colors */}
        <Raven 
          position={[3, 0, 0]} 
          color="#ff6b6b" 
          name="Huginn" 
          speed={0.8}
        />
        <Raven 
          position={[-3, 0, 0]} 
          color="#4ecdc4" 
          name="Muninn" 
          speed={1.2}
        />
        
        {/* Data pulse effects around the globe */}
        <DataPulse position={[2, 1, 1]} delay={0} />
        <DataPulse position={[-1, 2, -1]} delay={1} />
        <DataPulse position={[1, -2, 2]} delay={2} />
        <DataPulse position={[-2, -1, -1]} delay={3} />
        
        {/* Orbital rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.8, 4, 64]} />
          <meshBasicMaterial 
            color="#00ffff" 
            transparent 
            opacity={0.2} 
            side={THREE.DoubleSide}
          />
        </mesh>
        
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <ringGeometry args={[4.2, 4.4, 64]} />
          <meshBasicMaterial 
            color="#ff6b6b" 
            transparent 
            opacity={0.15} 
            side={THREE.DoubleSide}
          />
        </mesh>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Enhanced overlay information */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-8">
        <div className="text-center">
          <div className="w-4 h-4 bg-red-400 rounded-full mx-auto mb-2 animate-pulse"></div>
          <div className="text-cyan-400 text-sm font-medium">Huginn</div>
          <div className="text-gray-400 text-xs">Thought & Memory</div>
        </div>
        <div className="text-center">
          <div className="w-4 h-4 bg-teal-400 rounded-full mx-auto mb-2 animate-pulse"></div>
          <div className="text-cyan-400 text-sm font-medium">Muninn</div>
          <div className="text-gray-400 text-xs">Mind & Intelligence</div>
        </div>
      </div>
    </div>
  );
}

