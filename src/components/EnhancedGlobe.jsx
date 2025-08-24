import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Enhanced Earth component with realistic textures and lighting
function Earth() {
  const earthRef = useRef();
  const cloudsRef = useRef();
  
  // Load Earth textures
  const [dayTexture, nightTexture, cloudsTexture] = useTexture([
    '/assets/earth_daymap.jpg',
    '/assets/earth_nightmap.jpg', 
    '/assets/earth_clouds.png'
  ]);

  // Configure textures
  useEffect(() => {
    if (dayTexture) {
      dayTexture.colorSpace = THREE.SRGBColorSpace;
      dayTexture.generateMipmaps = true;
    }
    if (nightTexture) {
      nightTexture.colorSpace = THREE.SRGBColorSpace;
      nightTexture.generateMipmaps = true;
    }
    if (cloudsTexture) {
      cloudsTexture.colorSpace = THREE.SRGBColorSpace;
      cloudsTexture.generateMipmaps = true;
    }
  }, [dayTexture, nightTexture, cloudsTexture]);

  // Rotate Earth and clouds
  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.1; // Slow rotation
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.12; // Slightly faster cloud rotation
    }
  });

  return (
    <group>
      {/* Earth sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={dayTexture}
          emissiveMap={nightTexture}
          emissive={new THREE.Color(0x112244)}
          emissiveIntensity={0.75}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Cloud layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.02, 64, 64]} />
        <meshStandardMaterial
          map={cloudsTexture}
          transparent={true}
          opacity={0.5}
          alphaMap={cloudsTexture}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// Brand raven component using official assets
function BrandRaven({ radius = 3.5, speed = 0.5, offset = 0, ravenType = 'huginn', isAnimating = false }) {
  const spriteRef = useRef();
  const [time, setTime] = useState(0);
  
  // Load raven textures
  const ravenTexture = useLoader(THREE.TextureLoader, 
    ravenType === 'huginn' ? '/assets/raven_huginn.png' : '/assets/raven_muninn.png'
  );

  useFrame((state, delta) => {
    setTime(time + delta * speed);
    if (spriteRef.current) {
      const angle = time + offset;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 2) * 0.3; // Subtle vertical movement
      
      spriteRef.current.position.set(x, y, z);
      
      // Add glow effect when animating
      if (isAnimating) {
        spriteRef.current.material.opacity = 0.8 + Math.sin(time * 8) * 0.2;
      }
    }
  });

  return (
    <sprite ref={spriteRef} scale={[0.4, 0.4, 1]}>
      <spriteMaterial
        map={ravenTexture}
        transparent={true}
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </sprite>
  );
}

// Starfield background
function Starfield() {
  const starsRef = useRef();
  
  const starPositions = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, []);

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2000}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        color="#ffffff"
        transparent={true}
        opacity={0.3}
        sizeAttenuation={false}
      />
    </points>
  );
}

// Data center points overlay
function DataCenterPoints({ datacenters, showPoints, showHeatmap, onHover }) {
  const pointsRef = useRef();
  
  if (!showPoints && !showHeatmap) return null;

  return (
    <group>
      {datacenters.map((dc, index) => {
        // Convert lat/lon to 3D coordinates
        const phi = (90 - dc.lat) * (Math.PI / 180);
        const theta = (dc.lon + 180) * (Math.PI / 180);
        const radius = 2.05;
        
        const x = -(radius * Math.sin(phi) * Math.cos(theta));
        const z = radius * Math.sin(phi) * Math.sin(theta);
        const y = radius * Math.cos(phi);

        return (
          <group key={index}>
            {showPoints && (
              <mesh 
                position={[x, y, z]}
                onPointerOver={() => onHover && onHover(dc)}
                onPointerOut={() => onHover && onHover(null)}
              >
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshBasicMaterial
                  color="#00ffff"
                  emissive="#00ffff"
                  emissiveIntensity={0.5}
                  transparent={true}
                  opacity={0.8}
                />
              </mesh>
            )}
            
            {showHeatmap && (
              <mesh position={[x, y, z]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial
                  color="#ffaa00"
                  transparent={true}
                  opacity={0.3}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

// Scene setup with enhanced lighting and rendering
function SceneSetup() {
  const { gl, scene } = useThree();
  
  useEffect(() => {
    // Enhanced renderer settings
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.2;
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Environment setup
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    const envTexture = pmremGenerator.fromScene(new THREE.Scene()).texture;
    scene.environment = envTexture;
    
    return () => {
      pmremGenerator.dispose();
    };
  }, [gl, scene]);

  return (
    <>
      {/* Directional light (sun) */}
      <directionalLight
        position={[5, 3, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Ambient light */}
      <ambientLight intensity={0.6} />
      
      {/* Subtle fill light */}
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#4488ff" />
    </>
  );
}

// Main Enhanced Globe component
export default function EnhancedGlobe({ 
  datacenters = [], 
  showPoints = false, 
  showHeatmap = false, 
  isAnimating = false,
  onDataCenterHover = null 
}) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <SceneSetup />
        <Starfield />
        <Earth />
        <BrandRaven 
          radius={3.5} 
          speed={0.3} 
          offset={0} 
          ravenType="huginn" 
          isAnimating={isAnimating}
        />
        <BrandRaven 
          radius={3.8} 
          speed={0.25} 
          offset={Math.PI} 
          ravenType="muninn" 
          isAnimating={isAnimating}
        />
        <DataCenterPoints 
          datacenters={datacenters}
          showPoints={showPoints}
          showHeatmap={showHeatmap}
          onHover={onDataCenterHover}
        />
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={15}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

