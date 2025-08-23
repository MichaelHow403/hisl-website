import React, { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import RealisticEarth from './RealisticEarth';
import NorseRavens from './NorseRavens';
import DataCenterOverlay from './DataCenterOverlay';
import PulseTrail from './PulseTrail';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Error boundary component for WebGL rendering
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-900/20 rounded-lg border border-red-500/30 text-center">
          <h3 className="text-xl font-bold text-red-400 mb-2">3D Rendering Error</h3>
          <p className="text-muted-foreground">
            There was an issue rendering the 3D globe. Please try refreshing the page or using a different browser.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

// WebGL detection component
const WebGLCheck = ({ children }) => {
  const [hasWebGL, setHasWebGL] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if WebGL is supported
    try {
      const canvas = document.createElement('canvas');
      const supported = !!window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
      setHasWebGL(supported);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  if (!isClient) {
    return <div className="p-6 text-center">Loading globe...</div>;
  }

  if (hasWebGL === false) {
    return (
      <div className="p-6 bg-yellow-900/20 rounded-lg border border-yellow-500/30 text-center">
        <h3 className="text-xl font-bold text-yellow-400 mb-2">WebGL Not Supported</h3>
        <p className="text-muted-foreground">
          Your browser does not support WebGL, which is required to display the 3D globe.
          Please try updating your browser or use a different browser that supports WebGL.
        </p>
      </div>
    );
  }

  return children;
};

// Scene setup component
const Scene = ({ processingState }) => {
  // Handle WebGL context loss
  useEffect(() => {
    const handleContextLost = (event) => {
      event.preventDefault();
      console.warn('WebGL context lost. Trying to restore...');
    };
    
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
      };
    }
  }, []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.2}
        castShadow={true}
      />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#4f46e5" />
      
      <Stars radius={500} depth={80} count={2000} factor={8} />
      <RealisticEarth />
      <NorseRavens />
      <DataCenterOverlay />
      {processingState === 'processing' && <PulseTrail />}
    </>
  );
};

const InteractiveGlobe = () => {
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [processingState, setProcessingState] = useState('idle');
  const [outputLog, setOutputLog] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const canvasRef = useRef();

  const handlePromptSubmit = async () => {
    if (!selectedPrompt.trim()) return;
    
    setProcessingState('processing');
    setOutputLog(prev => [...prev, `🌍 Prompt received: "${selectedPrompt}"`]);
    
    // Simulate processing stages
    setTimeout(() => {
      setOutputLog(prev => [...prev, '🐦 Huginn analyzing query structure...']);
    }, 500);
    
    setTimeout(() => {
      setOutputLog(prev => [...prev, '🐦 Muninn accessing knowledge base...']);
    }, 1000);
    
    setTimeout(() => {
      setOutputLog(prev => [...prev, '🏛️ Routing through GDPR-compliant Dublin center...']);
    }, 1500);
    
    setTimeout(() => {
      setOutputLog(prev => [...prev, '✅ Processing complete - data sovereignty maintained']);
      setProcessingState('complete');
    }, 2500);
    
    setTimeout(() => {
      setProcessingState('idle');
    }, 4000);
  };

  const promptExamples = [
    "How does HISL ensure data sovereignty?",
    "What AI models power the IntegAI fleet?", 
    "Show me GDPR compliance workflow",
    "Explain the Norse mythology integration"
  ];

  return (
    <div id="globe-section" className="w-full min-h-screen bg-gradient-to-b from-hisl-dark to-black relative overflow-hidden py-20">
      {/* Background bridge banner overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: `url(${require('../assets/AI_Construction_Bridge_banner.png')})`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover'
        }}
      />
      
      {/* Header */}
      <div className="container mx-auto px-4 mb-16 relative z-10">
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-gradient mb-6"
          >
            WHERE YOUR PROMPTS GO
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Watch as Huginn (Thought) and Muninn (Memory) orbit our
            sovereign infrastructure, carrying your prompts securely through
            our offline-first AI network.
          </motion.p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Panel - Output Log */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full lg:w-1/4 glass rounded-xl border border-primary/30 p-6"
          >
            <h3 className="text-primary font-mono text-xl mb-6 tracking-wide">🖥️ PROCESSING LOG</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {outputLog.map((log, index) => (
                <div key={index} className="text-sm text-muted-foreground font-mono p-3 bg-card rounded-lg border border-border">
                  {log}
                </div>
              ))}
            </div>
            
            {/* Status Indicator */}
            <div className="mt-6 p-4 bg-card rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${
                  processingState === 'idle' ? 'bg-green-500 shadow-lg shadow-green-500/50' :
                  processingState === 'processing' ? 'bg-yellow-500 animate-pulse shadow-lg shadow-yellow-500/50' :
                  'bg-blue-500 shadow-lg shadow-blue-500/50'
                }`}></div>
                <span className="text-base text-muted-foreground font-mono tracking-wide">
                  {processingState === 'idle' ? 'READY' :
                   processingState === 'processing' ? 'PROCESSING' : 'COMPLETE'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Center Panel - Globe */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full lg:w-2/4 h-[500px] glass rounded-xl border border-primary/30 relative overflow-hidden"
          >
            <ErrorBoundary>
              <WebGLCheck>
                <Canvas 
                  ref={canvasRef}
                  camera={{ position: [0, 0, 8], fov: 50 }}
                  onCreated={({ gl }) => {
                    gl.setClearColor(new THREE.Color('#020617'));
                    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                    gl.outputEncoding = THREE.sRGBEncoding;
                  }}
                  dpr={[1, 2]} // Optimize for different pixel ratios
                >
                  <Suspense fallback={null}>
                    <Scene processingState={processingState} />
                    <OrbitControls 
                      enableZoom={true}
                      enablePan={false}
                      minDistance={6}
                      maxDistance={20}
                      autoRotate={processingState === 'idle'}
                      autoRotateSpeed={0.3}
                      dampingFactor={0.05}
                    />
                  </Suspense>
                </Canvas>
              </WebGLCheck>
            </ErrorBoundary>
            
            {/* Norse Mythology Tooltip - Enhanced */}
            <div 
              className="absolute top-4 right-4 glass rounded-lg p-3 cursor-pointer"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <div className="text-amber-500 text-3xl mb-2">🐦‍⬛</div>
              <div className="text-amber-400 font-mono text-sm">HUGINN & MUNINN</div>
              {showTooltip && (
                <div className="absolute top-full right-0 mt-3 w-72 glass rounded-lg p-4 text-sm text-muted-foreground shadow-2xl z-10">
                  <div className="text-amber-400 font-bold mb-2">Odin's Data Ravens</div>
                  <p className="leading-relaxed">
                    <strong className="text-amber-300">Huginn</strong> (Thought) and <strong className="text-cyan-300">Muninn</strong> (Memory) 
                    guide your prompts through sovereign data paths, ensuring privacy and GDPR compliance 
                    across global infrastructure.
                  </p>
                </div>
              )}
            </div>
            
            {/* Data Center Status */}
            <div className="absolute top-4 left-4 glass rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-muted-foreground text-sm">Dublin Sovereign Zone</span>
              </div>
            </div>
          </motion.div>

          {/* Right Panel - Prompt Interface */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="w-full lg:w-1/4 glass rounded-xl border border-primary/30 p-6"
          >
            <h3 className="text-primary font-mono text-xl mb-6 tracking-wide">🤖 AGENT PROMPT</h3>
            
            {/* Quick Examples */}
            <div className="mb-6">
              <p className="text-muted-foreground text-sm mb-3 font-medium">Quick examples:</p>
              <div className="space-y-2">
                {promptExamples.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPrompt(example)}
                    className="w-full text-left text-xs text-muted-foreground hover:text-primary p-3 bg-card rounded-lg hover:bg-card/70 transition-all duration-200 border border-border hover:border-primary/50"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Prompt Input */}
            <div className="space-y-4">
              <textarea
                value={selectedPrompt}
                onChange={(e) => setSelectedPrompt(e.target.value)}
                placeholder="Enter your query about HISL, AI sovereignty, or data compliance..."
                className="w-full h-32 bg-card border border-primary/30 rounded-lg p-4 text-foreground text-sm resize-none focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              
              <button
                onClick={handlePromptSubmit}
                disabled={processingState === 'processing' || !selectedPrompt.trim()}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed text-primary-foreground py-3 px-6 rounded-lg font-mono text-sm transition-all duration-200 shadow-lg hover:shadow-primary/25"
              >
                {processingState === 'processing' ? 'PROCESSING...' : 'SUBMIT QUERY'}
              </button>
            </div>
            
            {/* Data Sovereignty Info */}
            <div className="mt-8 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
                <span className="text-green-400 text-sm font-mono tracking-wide">GDPR COMPLIANT</span>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">
                All queries processed through Irish jurisdiction. Your data never leaves EU sovereignty.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Norse Context */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass rounded-xl p-6 border border-amber-500/30">
              <h4 className="text-xl font-bold text-amber-400 mb-3">Huginn (Thought)</h4>
              <p className="text-muted-foreground">
                Represents intelligence and exploration. Our AI
                agents that venture out to gather new knowledge
                and insights from your data.
              </p>
            </div>
            
            <div className="glass rounded-xl p-6 border border-cyan-500/30">
              <h4 className="text-xl font-bold text-cyan-400 mb-3">Muninn (Memory)</h4>
              <p className="text-muted-foreground">
                Represents observability and truth-keeping. Our
                systems that safeguard institutional memory and
                maintain audit trails.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveGlobe;

