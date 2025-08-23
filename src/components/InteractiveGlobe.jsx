import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

import PhotorealisticEarth from './RealisticEarth';
import PulseTrail from './PulseTrail';
import DataCenterOverlay from './DataCenterOverlay';

// Import raven images directly
import ravenHuginnImage from '../assets/raven_huginn.png';
import ravenMuninnImage from '../assets/raven_muninn.png';

// Raven component that orbits around the globe
function Raven({ radius = 3, speed = 0.5, offset = 0, name, imagePath }) {
  const ravenRef = useRef();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(imagePath, (loadedTexture) => {
      setTexture(loadedTexture);
    });
  }, [imagePath]);
  
  useFrame((state) => {
    if (ravenRef.current) {
      const time = state.clock.getElapsedTime() * speed + offset;
      ravenRef.current.position.x = Math.cos(time) * radius;
      ravenRef.current.position.z = Math.sin(time) * radius;
      ravenRef.current.position.y = Math.sin(time * 0.5) * 0.5; // Add some vertical movement
      
      // Make raven look forward in its orbit direction
      ravenRef.current.lookAt(
        Math.cos(time + 0.1) * radius,
        ravenRef.current.position.y,
        Math.sin(time + 0.1) * radius
      );
    }
  });

  if (!texture) return null; // Don't render until texture is loaded

  return (
    <group ref={ravenRef}>
      {/* Raven sprite using the actual image */}
      <sprite scale={[0.8, 0.8, 1]}>
        <spriteMaterial 
          map={texture}
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

// Main Globe Scene
function GlobeScene() {
  const handleRegionClick = (event) => {
    // Logic for handling clicks on specific regions of the globe
    console.log('Clicked on globe region:', event.point);
  };

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} color="#0088ff" intensity={0.5} />
      
      {/* Earth */}
      <PhotorealisticEarth onRegionClick={handleRegionClick} />
      
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
      
      {/* Data Center Overlay */}
      <DataCenterOverlay />

      {/* Pulse Trails */}
      <PulseTrail />
      
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
export default function InteractiveGlobe({ className = "" }) {
  return (
    <div className={`w-full h-[600px] ${className}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <GlobeScene />
      </Canvas>
    </div>
  );
}


