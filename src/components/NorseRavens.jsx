import React, { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import ravenHuginn from '../assets/raven_huginn.png';
import ravenMuninn from '../assets/raven_muninn.png';

export default function NorseRavens() {
  const huginnRef = useRef();
  const muninnRef = useRef();
  
  // Load raven textures with error handling
  const huginnTexture = useTexture(ravenHuginn);
  const muninnTexture = useTexture(ravenMuninn);
  
  // Ensure textures are properly loaded
  useEffect(() => {
    if (huginnTexture && muninnTexture) {
      huginnTexture.minFilter = THREE.LinearFilter;
      muninnTexture.minFilter = THREE.LinearFilter;
      huginnTexture.generateMipmaps = false;
      muninnTexture.generateMipmaps = false;
    }
  }, [huginnTexture, muninnTexture]);
  
  // Create materials with transparency
  const huginnMaterial = new THREE.SpriteMaterial({ 
    map: huginnTexture, 
    transparent: true,
    opacity: 0.9,
    color: 0xFFD700, // Gold tint for Huginn
    depthTest: true,
    depthWrite: false,
    sizeAttenuation: true
  });
  
  const muninnMaterial = new THREE.SpriteMaterial({ 
    map: muninnTexture, 
    transparent: true,
    opacity: 0.9,
    color: 0x00FFFF, // Cyan tint for Muninn
    depthTest: true,
    depthWrite: false,
    sizeAttenuation: true
  });

  // Animation for ravens with improved performance
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Huginn orbit
    if (huginnRef.current) {
      huginnRef.current.position.x = Math.cos(t * 0.3) * 4;
      huginnRef.current.position.z = Math.sin(t * 0.3) * 4;
      huginnRef.current.position.y = Math.sin(t * 0.5) * 1.5;
      huginnRef.current.scale.set(1.2, 1.2, 1.2); // Increased size for better visibility
      
      // Make the raven face the direction it's flying
      huginnRef.current.material.rotation = Math.atan2(
        huginnRef.current.position.z, 
        huginnRef.current.position.x
      ) + Math.PI / 2;
    }
    
    // Muninn orbit (opposite direction)
    if (muninnRef.current) {
      muninnRef.current.position.x = Math.cos(t * 0.4 + Math.PI) * 3.5;
      muninnRef.current.position.z = Math.sin(t * 0.4 + Math.PI) * 3.5;
      muninnRef.current.position.y = Math.cos(t * 0.6) * 1.2;
      muninnRef.current.scale.set(1.2, 1.2, 1.2); // Increased size for better visibility
      
      // Make the raven face the direction it's flying
      muninnRef.current.material.rotation = Math.atan2(
        muninnRef.current.position.z, 
        muninnRef.current.position.x
      ) + Math.PI / 2;
    }
  });

  return (
    <>
      {/* Add a light trail effect for Huginn */}
      <sprite 
        position={[0, 0, 0]} 
        scale={[0.5, 0.5, 0.5]}
        ref={huginnRef} 
        material={huginnMaterial} 
      />
      
      {/* Add a light trail effect for Muninn */}
      <sprite 
        position={[0, 0, 0]} 
        scale={[0.5, 0.5, 0.5]}
        ref={muninnRef} 
        material={muninnMaterial} 
      />
      
      {/* Add subtle glow effects around the ravens */}
      <pointLight position={[0, 0, 0]} distance={10} intensity={0.5} color="#FFD700" />
      <pointLight position={[0, 0, 0]} distance={10} intensity={0.5} color="#00FFFF" />
    </>
  );
}

