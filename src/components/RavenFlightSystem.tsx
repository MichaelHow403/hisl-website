import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { DataCenter, generateRouteHops, latLonToVector3 } from '../data/datacenters';
import { greatCirclePoints, haversineDistance, estimateLatency } from '../utils/greatCircle';

interface RavenFlightSystemProps {
  isActive: boolean;
  route: DataCenter[];
  onFlightComplete: () => void;
  onHopComplete: (hop: number, dataCenter: DataCenter, latency: number) => void;
}

interface RavenSprite {
  sprite: THREE.Sprite;
  position: THREE.Vector3;
  target: THREE.Vector3;
  progress: number;
  currentHop: number;
  isFlying: boolean;
}

export default function RavenFlightSystem({ 
  isActive, 
  route, 
  onFlightComplete, 
  onHopComplete 
}: RavenFlightSystemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [ravens, setRavens] = useState<RavenSprite[]>([]);
  const [pulseLines, setPulseLines] = useState<THREE.Line[]>([]);
  const [flightStartTime, setFlightStartTime] = useState<number>(0);
  const [currentHopIndex, setCurrentHopIndex] = useState<number>(0);

  // Initialize ravens
  useEffect(() => {
    if (!groupRef.current || route.length === 0) return;

    const textureLoader = new THREE.TextureLoader();
    
    // Load raven textures
    const huginnTexture = textureLoader.load('/assets/raven_huginn.png');
    const muninnTexture = textureLoader.load('/assets/raven_muninn.png');

    // Create raven sprites
    const huginnSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({ 
        map: huginnTexture, 
        transparent: true,
        opacity: 0.9,
        alphaTest: 0.1
      })
    );
    huginnSprite.scale.set(0.15, 0.15, 1);

    const muninnSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({ 
        map: muninnTexture, 
        transparent: true,
        opacity: 0.9,
        alphaTest: 0.1
      })
    );
    muninnSprite.scale.set(0.15, 0.15, 1);

    // Position ravens at the starting point (near camera for UI launch effect)
    const startPos = new THREE.Vector3(2, 0.5, 1);
    huginnSprite.position.copy(startPos);
    muninnSprite.position.copy(startPos);

    groupRef.current.add(huginnSprite);
    groupRef.current.add(muninnSprite);

    const newRavens: RavenSprite[] = [
      {
        sprite: huginnSprite,
        position: startPos.clone(),
        target: startPos.clone(),
        progress: 0,
        currentHop: 0,
        isFlying: false
      },
      {
        sprite: muninnSprite,
        position: startPos.clone(),
        target: startPos.clone(),
        progress: 0,
        currentHop: 0,
        isFlying: false
      }
    ];

    setRavens(newRavens);

    return () => {
      if (groupRef.current) {
        groupRef.current.remove(huginnSprite);
        groupRef.current.remove(muninnSprite);
      }
    };
  }, [route]);

  // Create pulse lines for the route
  useEffect(() => {
    if (!groupRef.current || route.length < 2) return;

    const lines: THREE.Line[] = [];

    for (let i = 0; i < route.length - 1; i++) {
      const start = route[i];
      const end = route[i + 1];

      // Generate great circle path
      const pathPoints = greatCirclePoints(
        { lat: start.lat, lon: start.lon },
        { lat: end.lat, lon: end.lon },
        60
      );

      // Convert to 3D coordinates
      const geometry = new THREE.BufferGeometry();
      const positions: number[] = [];

      pathPoints.forEach(([lon, lat]) => {
        const [x, y, z] = latLonToVector3(lat, lon, 1.02); // Slightly above Earth surface
        positions.push(x, y, z);
      });

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

      // Create animated pulse line material
      const material = new THREE.LineBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.6,
        linewidth: 2
      });

      const line = new THREE.Line(geometry, material);
      line.visible = false; // Initially hidden
      
      groupRef.current.add(line);
      lines.push(line);
    }

    setPulseLines(lines);

    return () => {
      lines.forEach(line => {
        if (groupRef.current) {
          groupRef.current.remove(line);
        }
      });
    };
  }, [route]);

  // Start flight animation
  useEffect(() => {
    if (isActive && ravens.length > 0 && route.length > 0) {
      setFlightStartTime(Date.now());
      setCurrentHopIndex(0);
      
      // Start ravens flying to first data center
      const firstDC = route[0];
      const [x, y, z] = latLonToVector3(firstDC.lat, firstDC.lon, 1.05);
      const target = new THREE.Vector3(x, y, z);

      setRavens(prev => prev.map(raven => ({
        ...raven,
        target: target.clone(),
        progress: 0,
        currentHop: 0,
        isFlying: true
      })));
    }
  }, [isActive, ravens.length, route]);

  // Animation loop
  useFrame((state, delta) => {
    if (!isActive || ravens.length === 0 || route.length === 0) return;

    const updatedRavens = ravens.map((raven, index) => {
      if (!raven.isFlying) return raven;

      // Update flight progress
      const flightSpeed = 0.8; // Adjust speed as needed
      const newProgress = Math.min(raven.progress + delta * flightSpeed, 1);

      // Interpolate position
      const newPosition = raven.position.clone().lerp(raven.target, newProgress - raven.progress);
      raven.sprite.position.copy(newPosition);

      // Check if reached target
      if (newProgress >= 1) {
        const currentDC = route[raven.currentHop];
        const distance = raven.currentHop > 0 
          ? haversineDistance(route[raven.currentHop - 1], currentDC)
          : 0;
        const latency = estimateLatency(distance);

        // Notify hop completion
        onHopComplete(raven.currentHop, currentDC, latency);

        // Show pulse line for this hop
        if (pulseLines[raven.currentHop]) {
          pulseLines[raven.currentHop].visible = true;
        }

        // Move to next hop or complete flight
        if (raven.currentHop < route.length - 1) {
          const nextDC = route[raven.currentHop + 1];
          const [x, y, z] = latLonToVector3(nextDC.lat, nextDC.lon, 1.05);
          
          return {
            ...raven,
            position: newPosition,
            target: new THREE.Vector3(x, y, z),
            progress: 0,
            currentHop: raven.currentHop + 1
          };
        } else {
          // Flight complete - return to UI
          const returnPos = new THREE.Vector3(2, -0.5, 1);
          
          if (raven.target.distanceTo(returnPos) > 0.1) {
            return {
              ...raven,
              position: newPosition,
              target: returnPos,
              progress: 0,
              currentHop: raven.currentHop
            };
          } else {
            // Fully complete
            if (index === 0) { // Only call once
              setTimeout(() => onFlightComplete(), 500);
            }
            return {
              ...raven,
              position: newPosition,
              isFlying: false
            };
          }
        }
      }

      return {
        ...raven,
        position: newPosition,
        progress: newProgress
      };
    });

    setRavens(updatedRavens);

    // Animate pulse lines
    pulseLines.forEach((line, index) => {
      if (line.visible && line.material instanceof THREE.LineBasicMaterial) {
        // Create pulsing effect
        const time = state.clock.elapsedTime;
        const pulse = Math.sin(time * 3 + index) * 0.3 + 0.7;
        line.material.opacity = pulse * 0.6;
      }
    });
  });

  return <group ref={groupRef} />;
}

// Helper component for data center highlights
export function DataCenterHighlight({ 
  dataCenter, 
  isActive 
}: { 
  dataCenter: DataCenter; 
  isActive: boolean; 
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [x, y, z] = latLonToVector3(dataCenter.lat, dataCenter.lon, 1.03);

  useFrame((state) => {
    if (meshRef.current && isActive) {
      const time = state.clock.elapsedTime;
      const scale = 1 + Math.sin(time * 4) * 0.3;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={[x, y, z]} visible={isActive}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial 
        color={0x00ffff} 
        transparent 
        opacity={0.8}
        emissive={0x004444}
      />
    </mesh>
  );
}

