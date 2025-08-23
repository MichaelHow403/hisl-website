import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Data center locations (approximate coordinates on a unit sphere)
const dataCenters = [
  { 
    name: 'Dublin', 
    position: [0.3, 1.9, 0.5], 
    color: 0x00ff00, // Green for primary
    isPrimary: true
  },
  { 
    name: 'London', 
    position: [0.2, 1.9, 0.6], 
    color: 0x0088ff, // Blue for secondary
    isPrimary: false
  },
  { 
    name: 'Frankfurt', 
    position: [0.6, 1.8, 0.8], 
    color: 0x0088ff, // Blue for secondary
    isPrimary: false
  }
];

export default function DataCenterOverlay() {
  const markersRef = useRef([]);
  const ringsRef = useRef([]);
  
  // Animation for data center markers
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Animate markers
    markersRef.current.forEach((marker, i) => {
      if (marker) {
        // Pulse effect for primary data center
        if (dataCenters[i].isPrimary) {
          marker.scale.setScalar(0.8 + Math.sin(t * 2) * 0.1);
        }
      }
    });
    
    // Animate rings
    ringsRef.current.forEach((ring, i) => {
      if (ring) {
        // Expand and fade rings
        const ringLife = (t * 0.5 + i * 0.2) % 1;
        ring.scale.setScalar(1 + ringLife * 2);
        if (ring.material) {
          ring.material.opacity = 0.5 * (1 - ringLife);
        }
      }
    });
  });

  return (
    <>
      {/* Data center markers */}
      {dataCenters.map((center, i) => (
        <group key={`center-${i}`} position={center.position}>
          {/* Main marker */}
          <mesh 
            ref={el => markersRef.current[i] = el}
            scale={center.isPrimary ? 1 : 0.6}
          >
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color={center.color} />
          </mesh>
          
          {/* Pulse rings for primary center */}
          {center.isPrimary && (
            <>
              {[0, 1, 2].map((ringIndex) => (
                <mesh 
                  key={`ring-${ringIndex}`}
                  ref={el => ringsRef.current[ringIndex] = el}
                >
                  <ringGeometry args={[0.1, 0.12, 32]} />
                  <meshBasicMaterial 
                    color={center.color} 
                    transparent={true} 
                    opacity={0.5} 
                    side={THREE.DoubleSide}
                  />
                </mesh>
              ))}
            </>
          )}
          
          {/* Connection lines between centers */}
          {i > 0 && (
            <line>
              <bufferGeometry attach="geometry">
                <bufferAttribute
                  attachObject={['attributes', 'position']}
                  array={new Float32Array([
                    0, 0, 0,
                    ...dataCenters[0].position.map((coord, j) => 
                      dataCenters[0].position[j] - center.position[j]
                    )
                  ])}
                  count={2}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial 
                attach="material" 
                color={0x00ffff} 
                opacity={0.3} 
                transparent 
                linewidth={1} 
              />
            </line>
          )}
        </group>
      ))}
    </>
  );
}

