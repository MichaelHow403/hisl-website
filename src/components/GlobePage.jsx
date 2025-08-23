import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import EnhancedInteractiveGlobe from './EnhancedInteractiveGlobe';

export default function GlobePage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPulse, setShowPulse] = useState(false);
  const [energyUsage, setEnergyUsage] = useState(null);

  const handleSubmitPrompt = async () => {
    if (!prompt.trim()) return;
    
    setIsProcessing(true);
    setShowPulse(true);
    setResponse('');

    try {
      // Simulate API call to DeepSeek (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response - replace with actual DeepSeek API integration
      const mockResponse = {
        result: `Based on your prompt: "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}"

Here's the sovereign AI analysis:

{
  "status": "processed",
  "compliance_level": "enterprise_grade",
  "data_sovereignty": "maintained",
  "processing_location": "hisl_sovereign_infrastructure",
  "analysis": "Your prompt has been processed through our sovereign AI infrastructure, ensuring complete data privacy and regulatory compliance. The response maintains full traceability while protecting your intellectual property.",
  "recommendations": [
    "Consider expanding the scope for deeper insights",
    "Leverage additional HISL agents for comprehensive analysis",
    "Maintain current security protocols"
  ],
  "metadata": {
    "processing_time": "1.847s",
    "energy_efficiency": "optimized",
    "carbon_footprint": "offset_by_sovereign_infrastructure"
  }
}`,
        energyUsed: Math.random() * 0.1 + 0.02 // 0.02-0.12 kWh
      };

      setResponse(mockResponse.result);
      setEnergyUsage(mockResponse.energyUsed);
      
    } catch (error) {
      setResponse('Error: Unable to process prompt through sovereign infrastructure. Please try again.');
    } finally {
      setIsProcessing(false);
      setShowPulse(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900">
      <Header logoVariant="DUAL" />
      
      <motion.div 
        className="container mx-auto px-6 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Page Header */}
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Where Your Prompts Go
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            Watch Huginn & Muninn carry your prompts through the sovereign AI infrastructure
          </p>
          <div className="text-sm text-cyan-400/80">
            Powered by HISL Sovereign Infrastructure • Data Never Leaves Your Control
          </div>
        </motion.div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Globe Visualization */}
          <motion.div variants={itemVariants}>
            <div className="relative">
              <EnhancedInteractiveGlobe />
              
              {/* Pulse Animation Overlay */}
              <AnimatePresence>
                {showPulse && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Animated pulse lines */}
                    <motion.div
                      className="absolute top-1/2 left-1/4 w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{
                        x: [0, 200, 400],
                        y: [0, -50, 0],
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.8, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Prompt Interface */}
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
          >
            {/* Input Section */}
            <div className="p-6 rounded-2xl border border-cyan-400/30 bg-gray-800/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 flex items-center justify-center">
                  🧠
                </div>
                <h3 className="text-xl font-semibold text-cyan-400">Sovereign AI Interface</h3>
              </div>
              
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt for sovereign processing..."
                className="w-full h-32 p-4 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
              />
              
              <motion.button
                onClick={handleSubmitPrompt}
                disabled={isProcessing || !prompt.trim()}
                className="w-full mt-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatePresence mode="wait">
                  {isProcessing ? (
                    <motion.span
                      key="processing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      Ravens Processing...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="send"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      🚀 Send to Sovereign Infrastructure
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Response Section */}
            <AnimatePresence>
              {response && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-6 rounded-2xl border border-green-400/30 bg-gray-800/50 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center">
                      ✓
                    </div>
                    <h3 className="text-xl font-semibold text-green-400">Sovereign Response</h3>
                  </div>
                  
                  <pre className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-mono bg-gray-900/50 p-4 rounded-lg overflow-auto max-h-64">
                    {response}
                  </pre>

                  {/* Energy Usage Display */}
                  {energyUsage && (
                    <div className="mt-4 p-3 bg-green-900/20 rounded-lg border border-green-400/20">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-400">🌱 Energy Usage:</span>
                        <span className="text-gray-300">{energyUsage.toFixed(3)} kWh</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        Carbon footprint offset by HISL Sovereign Infrastructure
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Raven Information */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={itemVariants}
        >
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-red-400/20">
            <div className="w-16 h-16 bg-red-400 rounded-full mx-auto mb-4 flex items-center justify-center">
              🐦
            </div>
            <h3 className="text-xl font-bold text-red-400 mb-3">Huginn</h3>
            <p className="text-gray-300 mb-2">Thought & Memory</p>
            <p className="text-sm text-gray-400">
              Carries your prompts through the sovereign infrastructure, ensuring data integrity and compliance
            </p>
          </div>

          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-teal-400/20">
            <div className="w-16 h-16 bg-teal-400 rounded-full mx-auto mb-4 flex items-center justify-center">
              🐦
            </div>
            <h3 className="text-xl font-bold text-teal-400 mb-3">Muninn</h3>
            <p className="text-gray-300 mb-2">Mind & Intelligence</p>
            <p className="text-sm text-gray-400">
              Returns processed insights while maintaining complete data sovereignty and privacy
            </p>
          </div>
        </motion.div>
      </motion.div>

      <Footer logoVariant="DUAL" />
    </div>
  );
}

