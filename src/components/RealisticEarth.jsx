import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PhotorealisticEarth = ({ onRegionClick }) => {
  const meshRef = useRef();
  const atmosphereRef = useRef();
  
  // Create high-quality Earth texture
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;  // Higher resolution
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    
    // Deep ocean base with gradient
    const oceanGradient = ctx.createLinearGradient(0, 0, 0, 1024);
    oceanGradient.addColorStop(0, '#1e40af');    // Deep blue top
    oceanGradient.addColorStop(0.3, '#1e3a8a');  // Deeper middle
    oceanGradient.addColorStop(0.7, '#1e3a8a');  // Consistent deep
    oceanGradient.addColorStop(1, '#0f172a');    // Very deep bottom
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, 0, 2048, 1024);
    
    // Add subtle ocean texture with noise
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * 2048;
      const y = Math.random() * 1024;
      const size = Math.random() * 2 + 1;
      ctx.fillStyle = `rgba(30, 58, 138, ${Math.random() * 0.3})`;
      ctx.fillRect(x, y, size, size);
    }
    
    // Realistic continent shapes with better colors
    ctx.fillStyle = '#059669'; // Rich emerald green
    
    // North America - more accurate shape
    ctx.beginPath();
    ctx.ellipse(300, 280, 140, 100, -0.2, 0, 2 * Math.PI);
    ctx.fill();
    // Mexico extension
    ctx.beginPath();
    ctx.ellipse(280, 380, 60, 40, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // South America - characteristic shape
    ctx.beginPath();
    ctx.ellipse(400, 500, 50, 140, 0.3, 0, 2 * Math.PI);
    ctx.fill();
    
    // Europe - small but distinct
    ctx.beginPath();
    ctx.ellipse(700, 220, 80, 50, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Africa - iconic shape
    ctx.beginPath();
    ctx.ellipse(720, 450, 80, 160, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Asia - large landmass
    ctx.beginPath();
    ctx.ellipse(1100, 280, 200, 120, 0, 0, 2 * Math.PI);
    ctx.fill();
    // India extension
    ctx.beginPath();
    ctx.ellipse(1050, 420, 40, 60, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Australia
    ctx.beginPath();
    ctx.ellipse(1350, 600, 80, 40, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Greenland
    ctx.beginPath();
    ctx.ellipse(500, 150, 50, 70, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add mountain ranges (darker green)
    ctx.fillStyle = '#047857';
    // Himalayas
    ctx.beginPath();
    ctx.ellipse(1100, 320, 100, 20, 0, 0, 2 * Math.PI);
    ctx.fill();
    // Andes
    ctx.beginPath();
    ctx.ellipse(380, 500, 15, 120, 0.3, 0, 2 * Math.PI);
    ctx.fill();
    // Rocky Mountains
    ctx.beginPath();
    ctx.ellipse(270, 280, 20, 80, -0.2, 0, 2 * Math.PI);
    ctx.fill();
    
    // Ice caps (white/light blue)
    ctx.fillStyle = '#e0f2fe';
    // Arctic
    ctx.beginPath();
    ctx.ellipse(1024, 50, 300, 50, 0, 0, 2 * Math.PI);
    ctx.fill();
    // Antarctic
    ctx.beginPath();
    ctx.ellipse(1024, 974, 400, 50, 0, 0, 2 * Math.PI);
    ctx.fill();
    
    return new THREE.CanvasTexture(canvas);
  }, []);
  
  // Create atmosphere glow effect
  const atmosphereTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, 'rgba(135, 206, 235, 0)');
    gradient.addColorStop(0.7, 'rgba(135, 206, 235, 0.1)');
    gradient.addColorStop(1, 'rgba(135, 206, 235, 0.8)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    
    return new THREE.CanvasTexture(canvas);
  }, []);
  
  // Rotate the Earth slowly
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05; // Very slow, realistic rotation
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.02; // Slightly different for atmosphere
    }
  });
  
  return (
    <group>
      {/* Main Earth sphere */}
      <mesh ref={meshRef} onClick={onRegionClick}>
        <sphereGeometry args={[2, 128, 64]} />
        <meshPhongMaterial
          map={earthTexture}
          shininess={5}
          transparent={false}
          side={THREE.FrontSide}
        />
      </mesh>
      
      {/* Atmospheric glow layer */}
      <mesh ref={atmosphereRef} scale={[1.05, 1.05, 1.05]}>
        <sphereGeometry args={[2, 64, 32]} />
        <meshBasicMaterial
          map={atmosphereTexture}
          transparent={true}
          opacity={0.3}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export default PhotorealisticEarth;


