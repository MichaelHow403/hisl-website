import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import earthDayMap from '../assets/earth_daymap.jpg';

export default function RealisticEarth() {
  const earthRef = useRef();
  const cloudsRef = useRef();
  
  // Load earth texture
  const earthTexture = useTexture(earthDayMap);
  
  // Create materials
  const earthMaterial = new THREE.MeshPhongMaterial({
    map: earthTexture,
    bumpMap: earthTexture,
    bumpScale: 0.05,
    specular: new THREE.Color('grey'),
    shininess: 5
  });
  
  // Create cloud material with procedural texture
  const cloudsMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.2,
    wireframe: true
  });

  // Slow rotation animation
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
    
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <>
      {/* Earth sphere */}
      <mesh ref={earthRef} material={earthMaterial}>
        <sphereGeometry args={[2, 64, 64]} />
      </mesh>
      
      {/* Cloud layer */}
      <mesh ref={cloudsRef} material={cloudsMaterial}>
        <sphereGeometry args={[2.05, 32, 32]} />
      </mesh>
      
      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[2.1, 32, 32]} />
        <meshBasicMaterial 
          color={0x00ffff} 
          transparent={true} 
          opacity={0.05} 
        />
      </mesh>
      
      {/* Data center marker - Ireland */}
      <mesh position={[0.3, 1.9, 0.5]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={0x00ff00} />
      </mesh>
    </>
  );
}

