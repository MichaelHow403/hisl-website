import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Import raven images directly
import ravenHuginnImage from '../assets/raven_huginn.png';
import ravenMuninnImage from '../assets/raven_muninn.png';

// Simple raven component
function Raven({ angle, radius, height, imagePath }) {
  const ravenRef = useRef();
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(imagePath, (loadedTexture) => {
      setTexture(loadedTexture);
    });
  }, [imagePath]);

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

  if (!texture) return null; // Don't render until texture is loaded

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

// Main globe component
function Earth() {
  const earthRef = useRef();
  const [texture, setTexture] = useState(null);
  
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load("/src/assets/earth_daymap.jpg", (loadedTexture) => {
      setTexture(loadedTexture);
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
      />
    </mesh>
  );
}

// Main scene component
function Scene() {
  const [ravens, setRavens] = useState([]);
  
  useEffect(() => {
    // Create ravens with random positions
    const newRavens = [
      {
        id: 1,
        angle: Math.random() * Math.PI * 2,
        radius: 3.5,
        height: 0.5,
        speed: 0.01,
        imagePath: ravenHuginnImage
      },
      {
        id: 2,
        angle: Math.random() * Math.PI * 2,
        radius: 4,
        height: -0.5,
        speed: 0.008,
        imagePath: ravenMuninnImage
      }
    ];
    setRavens(newRavens);
  }, []);
  
  // Animation loop for ravens
  useFrame(() => {
    setRavens(prev => prev.map(raven => ({
      ...raven,
      angle: raven.angle + raven.speed
    })));
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Earth />
      <Stars radius={100} depth={50} count={5000} factor={4} />
      {ravens.map(raven => (
        <Raven key={raven.id} {...raven} />
      ))}
    </>
  );
}

// Main component with error boundary and WebGL check
export default function Globe({ className = "" }) {
  const [hasWebGL, setHasWebGL] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Check if WebGL is supported
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
    return <div className="loading">Loading globe...</div>;
  }

  if (!hasWebGL) {
    return (
      <div className="error">
        <h2>WebGL Not Supported</h2>
        <p>Your browser does not support WebGL, which is required to display the 3D globe.</p>
        <p>Please try updating your browser or use a different browser that supports WebGL.</p>
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
          <Scene />
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


