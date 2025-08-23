import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PulseTrail = () => {
  const linesRef = useRef([]);
  
  // Define data flow paths between key centers
  const dataPaths = useMemo(() => [
    {
      start: [1.2, 0.8, 1.2],   // Dublin
      end: [-1.8, 0.6, 0.5],    // Virginia
      color: '#39d7c9',
      speed: 0.8
    },
    {
      start: [1.2, 0.8, 1.2],   // Dublin  
      end: [0.5, -0.2, 1.9],    // Singapore
      color: '#f6c650',
      speed: 1.2
    },
    {
      start: [1.3, 0.9, 0.8],   // Frankfurt
      end: [1.8, 0.3, 1.0],     // Tokyo
      color: '#22c55e',
      speed: 1.0
    }
  ], []);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    linesRef.current.forEach((line, index) => {
      if (line) {
        const path = dataPaths[index];
        const progress = (Math.sin(time * path.speed) + 1) / 2;
        
        // Update line opacity based on pulse
        line.material.opacity = progress * 0.6 + 0.2;
      }
    });
  });
  
  return (
    <group>
      {dataPaths.map((path, index) => {
        // Create curve between points
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(...path.start),
          new THREE.Vector3(
            (path.start[0] + path.end[0]) / 2,
            Math.max(path.start[1], path.end[1]) + 0.5,
            (path.start[2] + path.end[2]) / 2
          ),
          new THREE.Vector3(...path.end)
        ]);
        
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        return (
          <line key={index} geometry={geometry}>
            <lineBasicMaterial
              ref={(ref) => (linesRef.current[index] = ref)}
              color={path.color}
              transparent={true}
              opacity={0.4}
              linewidth={2}
            />
          </line>
        );
      })}
    </group>
  );
};

export default PulseTrail;


