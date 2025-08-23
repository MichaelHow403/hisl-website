import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function PulseTrail() {
  const trailRef = useRef();
  const pulseRef = useRef();
  
  // Create a curved path from user to data center
  const curve = useMemo(() => {
    const start = new THREE.Vector3(0, -2, 3); // User position (outside globe)
    const end = new THREE.Vector3(0.3, 1.9, 0.5); // Dublin data center
    const control = new THREE.Vector3(2, 0, 2); // Control point for curve
    
    const path = new THREE.QuadraticBezierCurve3(start, control, end);
    return path;
  }, []);
  
  // Create points along the curve for the trail
  const trailPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 50; i++) {
      points.push(curve.getPoint(i / 50));
    }
    return points;
  }, [curve]);
  
  // Create geometry for the trail
  const trailGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(trailPoints);
    return geometry;
  }, [trailPoints]);
  
  // Animation for pulse along the trail
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Animate pulse along the path
    if (pulseRef.current) {
      // Cycle the pulse along the path
      const pulsePosition = (t * 0.5) % 1;
      const point = curve.getPoint(pulsePosition);
      pulseRef.current.position.copy(point);
      
      // Pulse size based on position
      const pulseSize = 0.1 + 0.05 * Math.sin(t * 10);
      pulseRef.current.scale.setScalar(pulseSize);
    }
  });

  return (
    <>
      {/* Data trail */}
      <line ref={trailRef}>
        <bufferGeometry attach="geometry" {...trailGeometry} />
        <lineBasicMaterial 
          attach="material" 
          color={0x00ffff} 
          opacity={0.6} 
          transparent 
          linewidth={2} 
          dashSize={0.2}
          gapSize={0.1}
        />
      </line>
      
      {/* Pulse traveling along the trail */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial 
          color={0x00ffff} 
          transparent={true} 
          opacity={0.8}
        />
      </mesh>
      
      {/* User position indicator */}
      <mesh position={[0, -2, 3]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshBasicMaterial color={0xffffff} />
      </mesh>
    </>
  );
}

