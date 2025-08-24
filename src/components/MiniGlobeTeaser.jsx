import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

// Earth component with realistic textures
function Earth() {
  const meshRef = useRef();
  const cloudsRef = useRef();
  
  // Load Earth textures with error handling
  const [dayTexture, setDayTexture] = useState(null);
  const [cloudsTexture, setCloudsTexture] = useState(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    
    // Load day texture
    loader.load(
      '/assets/earth_daymap.jpg',
      (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        setDayTexture(texture);
      },
      undefined,
      (error) => {
        console.warn('Failed to load day texture, using fallback');
        // Create blue fallback texture
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
        gradient.addColorStop(0, '#4A90E2');
        gradient.addColorStop(1, '#1E3A8A');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);
        const fallbackTexture = new THREE.CanvasTexture(canvas);
        setDayTexture(fallbackTexture);
      }
    );
    
    // Load clouds texture
    loader.load(
      '/assets/earth_clouds.png',
      (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        setCloudsTexture(texture);
      },
      undefined,
      (error) => {
        console.warn('Failed to load clouds texture, using fallback');
        // Create white cloud fallback
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        for (let i = 0; i < 20; i++) {
          ctx.beginPath();
          ctx.arc(Math.random() * 256, Math.random() * 256, Math.random() * 30 + 10, 0, Math.PI * 2);
          ctx.fill();
        }
        const fallbackTexture = new THREE.CanvasTexture(canvas);
        setCloudsTexture(fallbackTexture);
      }
    );
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Slow Earth rotation (≈ 0.25°/sec)
      meshRef.current.rotation.y += 0.002;
    }
    if (cloudsRef.current) {
      // Very slow cloud drift
      cloudsRef.current.rotation.y += 0.001;
    }
  });

  if (!dayTexture) {
    return (
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#4A90E2" />
      </mesh>
    );
  }

  return (
    <group>
      {/* Main Earth sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={dayTexture} />
      </mesh>
      
      {/* Clouds layer */}
      {cloudsTexture && (
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[1.015, 32, 32]} />
          <meshBasicMaterial
            map={cloudsTexture}
            transparent={true}
            opacity={0.3}
            depthWrite={false}
          />
        </mesh>
      )}
      
      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.05, 16, 16]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent={true}
          opacity={0.1}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// Simplified Raven component
function Raven({ radius, speed, inclination, name, color }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * speed;
      
      // Orbit around Earth
      const x = Math.cos(time) * radius;
      const z = Math.sin(time) * radius;
      const y = Math.sin(time * 0.5) * 0.2 + Math.sin(inclination) * 0.3;
      
      meshRef.current.position.set(x, y, z);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial 
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

// Scene setup component
function Scene() {
  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 3, 5]}
        intensity={0.8}
      />
      
      {/* Subtle starfield */}
      <Stars
        radius={50}
        depth={50}
        count={500}
        factor={2}
        saturation={0.1}
        fade={true}
      />
      
      {/* Earth */}
      <Earth />
      
      {/* Ravens */}
      <Raven
        radius={1.25}
        speed={0.05}
        inclination={0}
        name="Huginn"
        color="#FFD700"
      />
      <Raven
        radius={1.35}
        speed={0.04}
        inclination={Math.PI * 0.15}
        name="Muninn"
        color="#FFA500"
      />
    </>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-cyan-400 animate-pulse">Loading sovereign infrastructure...</div>
    </div>
  );
}

// Main MiniGlobeTeaser component
const MiniGlobeTeaser = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate('/globe');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate('/globe');
    }
  };

  return (
    <div className="relative">
      {/* Optional badge */}
      <div className="text-center mb-4">
        <div className="inline-block px-4 py-2 bg-cyan-900/30 border border-cyan-500/30 rounded-full text-sm text-cyan-400">
          Sovereign infrastructure — local-first, region-locked
        </div>
      </div>

      {/* Interactive globe container */}
      <div
        className={`relative w-full h-96 bg-gradient-to-br from-gray-900/50 to-blue-900/50 rounded-xl border border-cyan-500/20 overflow-hidden cursor-pointer transition-all duration-300 ${
          isHovered ? 'border-cyan-400/40 shadow-lg shadow-cyan-500/20' : ''
        }`}
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex={0}
        role="button"
        aria-label="Open interactive globe — where your prompts go"
      >
        <Canvas
          camera={{
            position: [0, 0, 3],
            fov: 45,
            near: 0.1,
            far: 100
          }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <Suspense fallback={<LoadingFallback />}>
            <Scene />
          </Suspense>
          
          {/* Subtle camera controls for visual interest */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI * 0.7}
            minPolarAngle={Math.PI * 0.3}
          />
        </Canvas>

        {/* Hover overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-cyan-500/5 flex items-center justify-center">
            <div className="text-white text-lg font-semibold bg-black/50 px-4 py-2 rounded-lg">
              Click to explore →
            </div>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-400">
          Huginn (thought & memory) • Muninn (mind & intelligence)
        </p>
      </div>
    </div>
  );
};

export default MiniGlobeTeaser;

