import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RefinedHeader from './RefinedHeader';
import RefinedFooter from './RefinedFooter';

export default function WorkingGlobePage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [energyUsed, setEnergyUsed] = useState(0);
  const [currentLatency, setCurrentLatency] = useState(0);

  // Simulate processing with HISL branding
  const handleSubmitPrompt = async () => {
    if (!prompt.trim()) return;
    
    setIsProcessing(true);
    setResponse('');
    
    // Simulate latency calculation
    const latency = Math.floor(Math.random() * 200) + 50;
    setCurrentLatency(latency);
    
    // Simulate energy calculation
    const tokens = Math.floor(prompt.length / 4) + Math.floor(Math.random() * 100);
    const energy = tokens * 0.0001; // Rough estimate
    setEnergyUsed(energy);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // HISL-branded response
    const responses = [
      `IntegAI Analysis: Your prompt "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}" has been processed through our sovereign infrastructure. The ravens Huginn and Muninn have carried your request through our secure data centers, ensuring complete privacy and GDPR compliance. Processing time: ${latency}ms across our distributed network.`,
      
      `Sovereign Processing Complete: Your query has been analyzed using our distributed AI network. The prompt traveled through encrypted channels, maintaining data sovereignty while delivering intelligent insights. Processing time: ${latency}ms across ${Math.floor(Math.random() * 3) + 2} compliance-verified nodes.`,
      
      `HISL Response: Your prompt has been successfully processed through our secure, sovereign AI infrastructure. Huginn (Thought) and Muninn (Memory) have ensured context preservation across the network. All processing remained within your jurisdiction as required by NIS2 regulations.`
    ];
    
    setResponse(responses[Math.floor(Math.random() * responses.length)]);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <RefinedHeader />
      
      <div className="pt-20 pb-10">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Interactive Globe
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore how your prompts travel through our sovereign infrastructure
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Globe Visualization */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-cyan-400/20 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
                  Sovereign Infrastructure Network
                </h3>
                
                {/* Simplified Globe Representation */}
                <div className="relative w-80 h-80 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/30 to-purple-600/30 border-2 border-cyan-400/50">
                    {/* Globe surface pattern */}
                    <div className="absolute inset-4 rounded-full border border-cyan-400/20"></div>
                    <div className="absolute inset-8 rounded-full border border-cyan-400/10"></div>
                    
                    {/* Data center points */}
                    <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    
                    {/* Huginn and Muninn ravens */}
                    <motion.div
                      className="absolute top-1/4 right-1/4 w-4 h-4 bg-yellow-400 rounded-full"
                      animate={{
                        rotate: 360,
                        x: [0, 20, 0, -20, 0],
                        y: [0, -10, 0, 10, 0]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <motion.div
                      className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-orange-400 rounded-full"
                      animate={{
                        rotate: -360,
                        x: [0, -15, 0, 15, 0],
                        y: [0, 15, 0, -15, 0]
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </div>
                </div>
                
                <div className="text-center text-gray-300">
                  <p className="mb-2">🐦 <span className="text-yellow-400">Huginn</span> (Thought & Memory)</p>
                  <p>🐦 <span className="text-orange-400">Muninn</span> (Mind & Intelligence)</p>
                </div>
              </div>
            </div>

            {/* Prompt Interface */}
            <div className="space-y-6">
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-cyan-400/20 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                  Test Your Prompt Journey
                </h3>
                
                <div className="space-y-4">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt to see how it travels through our sovereign infrastructure..."
                    className="w-full h-32 bg-gray-900/50 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none resize-none"
                  />
                  
                  <button
                    onClick={handleSubmitPrompt}
                    disabled={!prompt.trim() || isProcessing}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing through Ravens...' : 'Send Prompt'}
                  </button>
                </div>
              </div>

              {/* Response Display */}
              {(response || isProcessing) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800/50 rounded-2xl p-6 border border-green-400/20 backdrop-blur-sm"
                >
                  <h4 className="text-xl font-bold text-green-400 mb-4">
                    Sovereign AI Response
                  </h4>
                  
                  {isProcessing ? (
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-400"></div>
                      <span className="text-gray-300">Ravens are carrying your prompt through the network...</span>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-gray-200 leading-relaxed">{response}</p>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-600">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-cyan-400">{currentLatency}ms</div>
                          <div className="text-sm text-gray-400">Processing Time</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">{energyUsed.toFixed(4)} kWh</div>
                          <div className="text-sm text-gray-400">Energy Used</div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-900/30 rounded-xl p-4 border border-blue-400/20">
                  <h5 className="font-bold text-blue-400 mb-2">Data Sovereignty</h5>
                  <p className="text-sm text-gray-300">Your prompts never leave your jurisdiction</p>
                </div>
                <div className="bg-green-900/30 rounded-xl p-4 border border-green-400/20">
                  <h5 className="font-bold text-green-400 mb-2">Full Auditability</h5>
                  <p className="text-sm text-gray-300">Every step is logged and traceable</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <RefinedFooter />
    </div>
  );
}

