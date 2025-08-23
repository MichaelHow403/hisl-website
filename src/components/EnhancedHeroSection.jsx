import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EnhancedInteractiveGlobe from './EnhancedInteractiveGlobe';

export default function EnhancedHeroSection() {
  const [currentMetric, setCurrentMetric] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const metrics = [
    { value: '100%', label: 'Sovereign Control', icon: '🛡️' },
    { value: '24/7', label: 'Autonomous Operation', icon: '⚡' },
    { value: '∞', label: 'Scalable Intelligence', icon: '🧠' }
  ];

  // Auto-cycle through metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSendPrompt = async () => {
    if (!prompt.trim()) return;
    
    setIsTyping(true);
    // Simulate API call
    setTimeout(() => {
      setIsTyping(false);
      setPrompt('');
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
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

  const glowVariants = {
    initial: { textShadow: "0 0 20px #00ffff" },
    animate: {
      textShadow: [
        "0 0 20px #00ffff",
        "0 0 40px #00ffff, 0 0 60px #00ffff",
        "0 0 20px #00ffff"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Bridge construction background with enhanced overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url('/AI_Construction_Bridge_banner.png')`,
          filter: 'blur(1px)'
        }}
      />
      
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-transparent to-gray-900/90" />

      <motion.div 
        className="relative z-10 container mx-auto px-6 pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced main title */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
            variants={glowVariants}
            initial="initial"
            animate="animate"
          >
            HISL CONTROL
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Sovereign AI Infrastructure for the Future of Autonomous Intelligence
          </motion.p>
        </motion.div>

        {/* Enhanced action buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          variants={itemVariants}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            ⚡ Deploy Agents
          </motion.button>
          
          <motion.button
            className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "#22d3ee",
              color: "#111827"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Infrastructure →
          </motion.button>
        </motion.div>

        {/* Enhanced metrics with animation */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          variants={itemVariants}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-xl border transition-all duration-500 ${
                currentMetric === index
                  ? 'border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20'
                  : 'border-gray-600 bg-gray-800/50'
              }`}
              whileHover={{ 
                scale: 1.05,
                borderColor: "#22d3ee"
              }}
              animate={{
                borderColor: currentMetric === index ? "#22d3ee" : "#4b5563"
              }}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{metric.icon}</div>
                <div className={`text-3xl font-bold mb-2 transition-colors duration-500 ${
                  currentMetric === index ? 'text-cyan-400' : 'text-white'
                }`}>
                  {metric.value}
                </div>
                <div className="text-gray-400">{metric.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Globe and Prompt Section */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={itemVariants}
        >
          {/* Enhanced Globe */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              WHERE YOUR PROMPTS GO
            </h2>
            <p className="text-gray-300 text-center mb-8">
              Watch Huginn & Muninn carry your prompts through the sovereign AI infrastructure
            </p>
            <EnhancedInteractiveGlobe />
          </motion.div>

          {/* Enhanced DeepSeek Interface */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="p-8 rounded-2xl border border-cyan-400/30 bg-gray-800/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 flex items-center justify-center">
                  🌐
                </div>
                <h3 className="text-xl font-semibold text-cyan-400">DeepSeek AI Interface</h3>
              </div>
              
              <div className="space-y-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your prompt for the ravens to carry..."
                  className="w-full h-32 p-4 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                />
                
                <motion.button
                  onClick={handleSendPrompt}
                  disabled={isTyping || !prompt.trim()}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <AnimatePresence mode="wait">
                    {isTyping ? (
                      <motion.span
                        key="typing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        Processing...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="send"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        🚀 Send to Ravens
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

