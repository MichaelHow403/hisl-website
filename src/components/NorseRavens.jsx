import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import ravenHuginn from '../assets/raven_huginn.png';
import ravenMuninn from '../assets/raven_muninn.png';

export default function NorseRavens() {
  const huginnRef = useRef();
  const muninnRef = useRef();
  
  // Load raven textures
  const huginnTexture = useTexture(ravenHuginn);
  const muninnTexture = useTexture(ravenMuninn);
  
  // Create materials with transparency
  const huginnMaterial = new THREE.SpriteMaterial({ 
    map: huginnTexture, 
    transparent: true,
    opacity: 0.9,
    color: 0xFFD700 // Gold tint for Huginn
  });
  
  const muninnMaterial = new THREE.SpriteMaterial({ 
    map: muninnTexture, 
    transparent: true,
    opacity: 0.9,
    color: 0x00FFFF // Cyan tint for Muninn
  });

  // Animation for ravens
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Huginn orbit
    if (huginnRef.current) {
      huginnRef.current.position.x = Math.cos(t * 0.3) * 4;
      huginnRef.current.position.z = Math.sin(t * 0.3) * 4;
      huginnRef.current.position.y = Math.sin(t * 0.5) * 1.5;
      huginnRef.current.scale.set(0.8, 0.8, 0.8);
      
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
      muninnRef.current.scale.set(0.8, 0.8, 0.8);
      
      // Make the raven face the direction it's flying
      muninnRef.current.material.rotation = Math.atan2(
        muninnRef.current.position.z, 
        muninnRef.current.position.x
      ) + Math.PI / 2;
    }
  });

  return (
    <>
      <sprite ref={huginnRef} material={huginnMaterial} />
      <sprite ref={muninnRef} material={muninnMaterial} />
    </>
  );
}

