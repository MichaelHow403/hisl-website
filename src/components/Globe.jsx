import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Earth component with realistic texture
function Earth() {
  const earthRef = useRef();
  const [texture, setTexture] = useState(null);
  
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/src/assets/earth_daymap.jpg', (loadedTexture) => {
      setTexture(loadedTexture);
    }, undefined, (error) => {
      console.log('Error loading earth texture:', error);
    });
  }, []);
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial 
        map={texture}
        roughness={0.8}
        metalness={0.1}
        color={texture ? '#ffffff' : '#4444ff'}
      />
    </mesh>
  );
}

// Pulse line component
function PulseLine({ start, end, progress, color = "#00ffff" }) {
  const lineRef = useRef();
  
  useEffect(() => {
    if (lineRef.current) {
      const points = [];
      const segments = 50;
      
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const x = start.x + (end.x - start.x) * t;
        const y = start.y + (end.y - start.y) * t;
        const z = start.z + (end.z - start.z) * t;
        points.push(new THREE.Vector3(x, y, z));
      }
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      lineRef.current.geometry = geometry;
    }
  }, [start, end]);

  const material = new THREE.LineBasicMaterial({ 
    color: color,
    transparent: true,
    opacity: Math.sin(progress * Math.PI) * 0.8
  });

  return (
    <line ref={lineRef}>
      <primitive object={material} attach="material" />
    </line>
  );
}

// Data centers component with pulse visualization
function DataCenters({ showPulse = false }) {
  const dataCenters = [
    { lat: 53.3498, lon: -6.2603, name: 'Dublin', isOrigin: true }, // Ireland - origin
    { lat: 37.7749, lon: -122.4194, name: 'San Francisco' },
    { lat: 34.0522, lon: -118.2437, name: 'Los Angeles' },
    { lat: 40.7128, lon: -74.0060, name: 'New York' },
    { lat: 51.5074, lon: 0.1278, name: 'London' },
    { lat: 35.6895, lon: 139.6917, name: 'Tokyo' },
    { lat: -33.8688, lon: 151.2093, name: 'Sydney' },
    { lat: 1.3521, lon: 103.8198, name: 'Singapore' },
  ];

  const [pulseProgress, setPulseProgress] = useState(0);

  useFrame(() => {
    if (showPulse) {
      setPulseProgress(prev => (prev + 0.02) % 1);
    }
  });

  // Convert lat/lon to 3D coordinates
  const getPosition = (lat, lon, radius = 2.05) => {
    const latRad = (lat * Math.PI) / 180;
    const lonRad = (lon * Math.PI) / 180;
    
    const x = radius * Math.cos(latRad) * Math.sin(lonRad);
    const y = radius * Math.sin(latRad);
    const z = radius * Math.cos(latRad) * Math.cos(lonRad);
    
    return { x, y, z };
  };

  const dublinPos = getPosition(53.3498, -6.2603);

  return (
    <group>
      {dataCenters.map((dc, index) => {
        const pos = getPosition(dc.lat, dc.lon);
        
        return (
          <group key={index}>
            {/* Data center marker */}
            <mesh position={[pos.x, pos.y, pos.z]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshBasicMaterial color={dc.isOrigin ? "#ff6600" : "#00ff00"} />
            </mesh>
            
            {/* Pulse lines from Dublin to other centers */}
            {showPulse && !dc.isOrigin && (
              <PulseLine 
                start={dublinPos}
                end={pos}
                progress={pulseProgress}
                color={index % 2 === 0 ? "#00ffff" : "#0088ff"}
              />
            )}
          </group>
        );
      })}
    </group>
  );
}

// Raven component with sprite texture
function Raven({ angle, radius, height, imagePath, name }) {
  const ravenRef = useRef();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(imagePath, (loadedTexture) => {
      setTexture(loadedTexture);
    }, undefined, (error) => {
      console.log(`Error loading ${name} texture:`, error);
    });
  }, [imagePath, name]);

  useFrame(() => {
    if (ravenRef.current) {
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      ravenRef.current.position.set(x, height, z);
      // Make raven look forward in its orbit direction
      ravenRef.current.lookAt(
        Math.sin(angle + 0.1) * radius,
        height,
        Math.cos(angle + 0.1) * radius
      );
    }
  });

  if (!texture) {
    // Fallback to simple geometry while texture loads
    return (
      <mesh ref={ravenRef} position={[
        Math.sin(angle) * radius,
        height,
        Math.cos(angle) * radius
      ]}>
        <boxGeometry args={[0.3, 0.1, 0.1]} />
        <meshBasicMaterial color={name === 'Huginn' ? "#00ffff" : "#0088ff"} />
      </mesh>
    );
  }

  return (
    <group ref={ravenRef}>
      <sprite scale={[0.8, 0.8, 1]}>
        <spriteMaterial 
          map={texture}
          transparent={true}
          opacity={0.9}
        />
      </sprite>
    </group>
  );
}

// Ravens component
function Ravens() {
  const [angle1, setAngle1] = useState(0);
  const [angle2, setAngle2] = useState(Math.PI);
  
  useFrame(() => {
    setAngle1(prev => prev + 0.01);
    setAngle2(prev => prev + 0.008);
  });

  return (
    <group>
      <Raven 
        angle={angle1}
        radius={3.5}
        height={0.5}
        imagePath="/src/assets/raven_huginn.png"
        name="Huginn"
      />
      <Raven 
        angle={angle2}
        radius={4}
        height={-0.5}
        imagePath="/src/assets/raven_muninn.png"
        name="Muninn"
      />
    </group>
  );
}

// Main scene
function Scene({ showPulse }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Earth />
      <DataCenters showPulse={showPulse} />
      <Ravens />
      <Stars radius={100} depth={50} count={5000} factor={4} />
    </>
  );
}

// Main Globe component
export default function Globe({ className = "", showPulse = false }) {
  const [hasWebGL, setHasWebGL] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const supported = !!window.WebGLRenderingContext && 
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
      setHasWebGL(supported);
    } catch (e) {
      setHasWebGL(false);
    }
    
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center">
        <div className="text-primary font-mono">Loading globe...</div>
      </div>
    );
  }

  if (!hasWebGL) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-bold text-primary mb-2">WebGL Not Supported</h3>
          <p className="text-muted-foreground">Your browser does not support WebGL, which is required for the 3D globe.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-[600px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#020617"));
        }}
      >
        <Suspense fallback={null}>
          <Scene showPulse={showPulse} />
        </Suspense>
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.5}
          rotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}

