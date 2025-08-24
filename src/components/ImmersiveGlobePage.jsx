import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import RefinedHeader from './RefinedHeader';
import RefinedFooter from './RefinedFooter';
import EnhancedGlobe from './EnhancedGlobe';
import { streamToOutput, estimateKwh, fakeLatency, estimateTokens } from '../utils/streamUtils';
import { estimateEnergyKJ, estimateLatency, generateRouteHops } from '../utils/energyLatencyEstimator';

// Raven component that orbits around the Earth
function Raven({ radius = 3, speed = 0.5, offset = 0, ravenType = 'huginn' }) {
  const meshRef = useRef();
  const [time, setTime] = useState(0);

  useFrame((state, delta) => {
    setTime(time + delta * speed);
    if (meshRef.current) {
      const angle = time + offset;
      meshRef.current.position.x = Math.cos(angle) * radius;
      meshRef.current.position.z = Math.sin(angle) * radius;
      meshRef.current.position.y = Math.sin(angle * 2) * 0.5; // Add some vertical movement
      
      // Make raven look forward in its orbit direction
      meshRef.current.lookAt(
        Math.cos(angle + 0.1) * radius,
        meshRef.current.position.y,
        Math.sin(angle + 0.1) * radius
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.2, 0.1, 0.3]} />
      <meshStandardMaterial 
        color={ravenType === 'huginn' ? '#1a1a1a' : '#2a2a2a'} 
        emissive={ravenType === 'huginn' ? '#ff4444' : '#44ffff'}
        emissiveIntensity={0.3}
      />
      {/* Wings */}
      <mesh position={[-0.15, 0, 0]} rotation={[0, 0, Math.sin(time * 10) * 0.3]}>
        <boxGeometry args={[0.3, 0.05, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.15, 0, 0]} rotation={[0, 0, -Math.sin(time * 10) * 0.3]}>
        <boxGeometry args={[0.3, 0.05, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </mesh>
  );
}

// Earth component with realistic textures
function Earth() {
  const earthRef = useRef();
  const cloudsRef = useRef();
  
  // Load Earth textures
  const [dayTexture, nightTexture, cloudsTexture] = useTexture([
    '/assets/earth_daymap.jpg',
    '/assets/earth_nightmap.jpg', 
    '/assets/earth_clouds.png'
  ]);

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
      {/* Earth sphere with day/night textures */}
      <Sphere ref={earthRef} args={[2, 64, 64]}>
        <meshPhongMaterial 
          map={dayTexture}
          emissiveMap={nightTexture}
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
      </Sphere>
      
      {/* Cloud layer */}
      <Sphere ref={cloudsRef} args={[2.02, 64, 64]}>
        <meshPhongMaterial 
          map={cloudsTexture}
          transparent={true}
          opacity={0.3}
          depthWrite={false}
        />
      </Sphere>
    </group>
  );
}

// Pulse line animation component
function PulseLine({ start, end, active, onComplete }) {
  const lineRef = useRef();
  const [progress, setProgress] = useState(0);

  useFrame((state, delta) => {
    if (active && progress < 1) {
      setProgress(Math.min(progress + delta * 2, 1));
      if (progress >= 1 && onComplete) {
        onComplete();
      }
    } else if (!active) {
      setProgress(0);
    }
  });

  const points = [];
  for (let i = 0; i <= 50; i++) {
    const t = i / 50;
    const point = new THREE.Vector3().lerpVectors(start, end, t);
    // Add some curve to the line
    point.y += Math.sin(t * Math.PI) * 0.5;
    points.push(point);
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points.slice(0, Math.floor(progress * points.length)));

  return (
    <line ref={lineRef}>
      <bufferGeometry attach="geometry" {...geometry} />
      <lineBasicMaterial attach="material" color="#00ffff" linewidth={3} />
    </line>
  );
}

// Data center points on Earth
const dataCenters = [
  { name: 'Dublin', position: [0.5, 1.8, 0.8] },
  { name: 'London', position: [0.2, 1.9, 0.6] },
  { name: 'Frankfurt', position: [0.3, 1.7, 0.9] },
  { name: 'Virginia', position: [-1.2, 1.5, 0.8] },
  { name: 'Oregon', position: [-1.8, 1.6, 0.4] },
  { name: 'Tokyo', position: [1.6, 1.4, 0.6] },
  { name: 'Singapore', position: [1.4, 0.2, 1.2] },
  { name: 'Sydney', position: [1.7, -1.2, 0.8] }
];

function DataCenterPoint({ position, name, active }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial 
        color={active ? "#00ffff" : "#ffffff"}
        emissive={active ? "#00ffff" : "#444444"}
        emissiveIntensity={active ? 0.8 : 0.2}
      />
    </mesh>
  );
}

export default function ImmersiveGlobePage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activePulse, setActivePulse] = useState(false);
  const [activeDataCenter, setActiveDataCenter] = useState(null);
  const [showOutput, setShowOutput] = useState(false);
  const [energyUsed, setEnergyUsed] = useState(0);
  const [activeDCs, setActiveDCs] = useState(12);
  const [latency, setLatency] = useState(0);
  const [dataCenters, setDataCenters] = useState([]);
  const [showPoints, setShowPoints] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [hoveredDC, setHoveredDC] = useState(null);
  const outputRef = useRef(null);

  // Load data centers
  useEffect(() => {
    fetch('/data/datacenters.json')
      .then(res => res.json())
      .then(data => {
        setDataCenters(data);
        setActiveDCs(data.length);
      })
      .catch(err => console.error('Failed to load data centers:', err));
  }, []);

  const handleSubmitPrompt = async () => {
    if (!prompt.trim()) return;
    
    setIsProcessing(true);
    setActivePulse(true);
    setShowOutput(true);
    setResponse('');
    
    // Select random data center and calculate latency
    const dcIndex = Math.floor(Math.random() * dataCenters.length);
    setActiveDataCenter(dcIndex);
    const currentLatency = fakeLatency('eu');
    setLatency(currentLatency);
    
    try {
      // Simulate API call to DeepSeek via proxy
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt })
      });
      
      const data = await response.json();
      const responseText = data.response || 'IntegAI processing complete. Your prompt has been analyzed through our sovereign infrastructure, ensuring complete data privacy and compliance with local regulations.';
      
      // Calculate energy usage
      const tokens = estimateTokens(prompt + responseText);
      const energy = estimateKwh(tokens);
      setEnergyUsed(energy);
      
      // Simulate network delay
      setTimeout(async () => {
        if (outputRef.current) {
          await streamToOutput(responseText, outputRef.current, 20);
        }
        setIsProcessing(false);
        setActivePulse(false);
        setActiveDataCenter(null);
      }, 2000 + currentLatency);
      
    } catch (error) {
      const fallbackText = 'IntegAI Simulation: Your prompt would be processed through our distributed sovereign infrastructure, ensuring privacy and compliance while maintaining optimal performance.';
      const tokens = estimateTokens(prompt + fallbackText);
      const energy = estimateKwh(tokens);
      setEnergyUsed(energy);
      
      setTimeout(async () => {
        if (outputRef.current) {
          await streamToOutput(fallbackText, outputRef.current, 20);
        }
        setIsProcessing(false);
        setActivePulse(false);
        setActiveDataCenter(null);
      }, 2000 + currentLatency);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <RefinedHeader logoVariant="HISL" />
      
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              SOVEREIGN GLOBE
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Watch Huginn & Muninn carry your prompts through our distributed AI infrastructure
          </motion.p>
        </div>
      </section>

      {/* Interactive Globe Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Globe Visualization */}
            <div className="relative h-96 lg:h-[500px] bg-black/20 rounded-2xl overflow-hidden border border-cyan-500/20">
              {/* Fullscreen Toggle */}
              <button
                onClick={() => {
                  const element = document.querySelector('.globe-container');
                  if (element.requestFullscreen) {
                    element.requestFullscreen();
                  }
                }}
                className="absolute top-4 right-4 z-10 p-2 bg-gray-900/80 hover:bg-gray-800 border border-cyan-500/30 rounded-lg text-cyan-400 hover:text-cyan-300 transition-colors"
                title="View in fullscreen (ESC to exit)"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
              
              <div className="globe-container w-full h-full">
                <Suspense fallback={<div className="flex items-center justify-center h-full text-cyan-400">Loading Globe...</div>}>
                  <EnhancedGlobe 
                    datacenters={dataCenters}
                    showPoints={showPoints}
                    showHeatmap={showHeatmap}
                    isAnimating={activePulse}
                    onDataCenterHover={setHoveredDC}
                  />
                </Suspense>
              </div>
            </div>

            {/* Interaction Panel */}
            <div className="space-y-6">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-cyan-400">
                    IntegAI Simulation Mode
                  </h3>
                  <img 
                    src="/assets/integai-logo.png" 
                    alt="IntegAI - AI with Soul" 
                    className="h-8 w-auto"
                  />
                </div>
                <p className="text-gray-300 mb-6">
                  Powered by API proxy - Experience how your prompts travel through sovereign infrastructure
                </p>

                {/* Data Center Overlay Controls */}
                <div className="mb-6 p-4 bg-gray-800/30 rounded-lg">
                  <h4 className="text-sm font-semibold text-white mb-3">Data Center Overlay</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setShowPoints(!showPoints)}
                      className={`px-3 py-1 text-xs rounded-full transition-all ${
                        showPoints 
                          ? 'bg-cyan-500 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Jurisdictions
                    </button>
                    <button
                      onClick={() => setShowHeatmap(!showHeatmap)}
                      className={`px-3 py-1 text-xs rounded-full transition-all ${
                        showHeatmap 
                          ? 'bg-yellow-500 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      Density
                    </button>
                  </div>
                  
                  {/* Tooltip for hovered data center */}
                  {hoveredDC && (
                    <div className="mt-3 p-2 bg-gray-900/80 rounded text-xs">
                      <div className="text-cyan-400 font-semibold">{hoveredDC.name}</div>
                      <div className="text-gray-300">{hoveredDC.jurisdiction} • {hoveredDC.region}</div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt to see it travel through the network..."
                    className="w-full h-32 p-4 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                  />
                  
                  <button
                    onClick={handleSubmitPrompt}
                    disabled={isProcessing || !prompt.trim()}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing through network...</span>
                      </div>
                    ) : (
                      '🚀 Send to Ravens'
                    )}
                  </button>
                  
                  {/* Energy & Latency Chips */}
                  {prompt.trim() && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      <div className="px-3 py-1 bg-yellow-900/30 border border-yellow-500/30 rounded-full text-xs">
                        <span className="text-yellow-400">⚡ Energy:</span>
                        <span className="text-white ml-1">
                          {estimateEnergyKJ(estimateTokens(prompt), 2)} kJ
                        </span>
                      </div>
                      <div className="px-3 py-1 bg-green-900/30 border border-green-500/30 rounded-full text-xs">
                        <span className="text-green-400">📡 Latency:</span>
                        <span className="text-white ml-1">
                          ~{estimateLatency(2)}ms
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Output Panel with Typewriter Effect */}
                {showOutput && (
                  <motion.div 
                    className="mt-6 p-4 bg-gray-800/30 border border-cyan-500/30 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h4 className="text-cyan-400 font-semibold mb-2 flex items-center">
                      <span className="mr-2">📡</span>
                      Response Stream:
                    </h4>
                    <div 
                      ref={outputRef}
                      className="text-gray-300 min-h-[60px] font-mono text-sm leading-relaxed"
                    >
                      {isProcessing && (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                          <span className="text-cyan-400">Connecting to sovereign network...</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Energy & Network Monitoring Card */}
              <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-600/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <span className="mr-2">⚡</span>
                  Energy & Network
                </h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Active Data Centers:</span>
                    <span className="text-cyan-400 font-semibold">{activeDCs}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Estimated Latency:</span>
                    <span className="text-green-400 font-semibold">
                      {latency > 0 ? `${latency}ms` : '--'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Energy per Prompt:</span>
                    <span className="text-yellow-400 font-semibold">
                      {energyUsed > 0 ? `${energyUsed} kWh` : '--'}
                    </span>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-600/20">
                    <p className="text-xs text-gray-500 italic">
                      * Simulated values for demonstration
                    </p>
                  </div>
                </div>
              </div>

              {/* Raven Status with Brand Icons */}
              <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-600/20 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-white mb-4">Raven Status</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <img 
                      src="/assets/raven_huginn.png" 
                      alt="Huginn raven — Thought & Memory" 
                      className="w-8 h-8 mx-auto mb-2 opacity-80"
                    />
                    <div className="text-sm text-red-400 font-semibold">Huginn</div>
                    <div className="text-xs text-gray-400">Thought & Memory</div>
                  </div>
                  <div className="text-center">
                    <img 
                      src="/assets/raven_muninn.png" 
                      alt="Muninn raven — Mind & Intelligence" 
                      className="w-8 h-8 mx-auto mb-2 opacity-80"
                    />
                    <div className="text-sm text-cyan-400 font-semibold">Muninn</div>
                    <div className="text-xs text-gray-400">Mind & Intelligence</div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-600/20">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Active Data Centers:</span>
                    <span className="text-cyan-400">{activeDCs}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2">
                    <span className="text-gray-400">Network Latency:</span>
                    <span className="text-green-400">{latency > 0 ? `${latency}ms` : '12ms'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Sovereign Infrastructure
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your prompts travel through a network of sovereign data centers, ensuring privacy, compliance, and control
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">Data Sovereignty</h3>
              <p className="text-gray-300">Your data never leaves your jurisdiction. Full compliance with local regulations.</p>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">Edge Processing</h3>
              <p className="text-gray-300">Distributed processing across multiple data centers for optimal performance.</p>
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-3">End-to-End Encryption</h3>
              <p className="text-gray-300">Military-grade encryption ensures your prompts remain private and secure.</p>
            </div>
          </div>
        </div>
      </section>

      <RefinedFooter />
    </div>
  );
}

