import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

// Earth component with realistic textures
function Earth() {
  const meshRef = useRef();
  const cloudsRef = useRef();
  
  // Load Earth textures
  const [dayTexture, nightTexture, cloudsTexture] = useLoader(THREE.TextureLoader, [
    '/assets/earth_daymap.jpg',
    '/assets/earth_nightmap.jpg', 
    '/assets/earth_clouds.png'
  ]);

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

  return (
    <group>
      {/* Main Earth sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={dayTexture}
          roughness={1.0}
          metalness={0.0}
        />
      </mesh>
      
      {/* Clouds layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.015, 32, 32]} />
        <meshPhongMaterial
          map={cloudsTexture}
          transparent={true}
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>
      
      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent={true}
          opacity={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// Raven component using gold raven sprites
function Raven({ radius, speed, inclination, name, imagePath }) {
  const groupRef = useRef();
  const spriteRef = useRef();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      imagePath,
      (loadedTexture) => {
        setTexture(loadedTexture);
      },
      undefined,
      (error) => {
        console.warn(`Failed to load raven texture: ${imagePath}`, error);
        // Create fallback golden dot
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(16, 16, 12, 0, Math.PI * 2);
        ctx.fill();
        const fallbackTexture = new THREE.CanvasTexture(canvas);
        setTexture(fallbackTexture);
      }
    );
  }, [imagePath]);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime() * speed;
      
      // Apply inclination to the orbit
      groupRef.current.rotation.z = inclination;
      
      // Orbit around Earth
      const x = Math.cos(time) * radius;
      const z = Math.sin(time) * radius;
      const y = Math.sin(time * 0.5) * 0.2; // Slight vertical movement
      
      if (spriteRef.current) {
        spriteRef.current.position.set(x, y, z);
        // Make sprite always face camera
        spriteRef.current.lookAt(state.camera.position);
      }
    }
  });

  if (!texture) return null;

  return (
    <group ref={groupRef}>
      <sprite ref={spriteRef} scale={[0.15, 0.15, 1]}>
        <spriteMaterial
          map={texture}
          transparent={true}
          alphaTest={0.1}
        />
      </sprite>
    </group>
  );
}

// Scene setup component
function Scene() {
  return (
    <>
      {/* Lighting setup */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 3, 5]}
        intensity={1.2}
        castShadow={false}
      />
      
      {/* Subtle starfield */}
      <Stars
        radius={50}
        depth={50}
        count={1000}
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
        imagePath="/assets/ravens/huginn.png"
      />
      <Raven
        radius={1.35}
        speed={0.04}
        inclination={Math.PI * 0.15}
        name="Muninn"
        imagePath="/assets/ravens/muninn.png"
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
            outputColorSpace: 'srgb',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1
          }}
        >
          <Suspense fallback={null}>
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

