import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function UpdatedHeroSection() {
  const navigate = useNavigate();
  const [currentMetric, setCurrentMetric] = useState(0);

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
    initial: { 
      textShadow: "0 0 20px #ffd700, 0 0 40px #ffd700",
      filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))"
    },
    animate: {
      textShadow: [
        "0 0 20px #ffd700, 0 0 40px #ffd700",
        "0 0 40px #ffd700, 0 0 80px #ffd700, 0 0 120px #ffd700",
        "0 0 20px #ffd700, 0 0 40px #ffd700"
      ],
      filter: [
        "drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))",
        "drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))",
        "drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Milky Way Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900">
        {/* Animated stars */}
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Animated HISL Logo Watermark */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center opacity-5"
        animate={{
          rotate: [0, 360],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <img 
          src="/hisl_logo.png" 
          alt="HISL Logo Watermark" 
          className="w-96 h-96 object-contain"
        />
      </motion.div>

      {/* AI Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
          {[...Array(96)].map((_, i) => (
            <motion.div
              key={i}
              className="border border-cyan-400/20"
              animate={{
                borderColor: [
                  "rgba(34, 211, 238, 0.1)",
                  "rgba(34, 211, 238, 0.3)",
                  "rgba(34, 211, 238, 0.1)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      </div>

      <motion.div 
        className="relative z-10 container mx-auto px-6 pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Updated Hero Title */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent"
            variants={glowVariants}
            initial="initial"
            animate="animate"
          >
            AI + Human … with Soul
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-4"
            variants={itemVariants}
          >
            Where compliance meets cognition. Where prompts stay yours.
          </motion.p>

          <motion.div
            className="text-sm text-amber-400/80 font-medium"
            variants={itemVariants}
          >
            HOWARD INTEGRITAS SOLUTIONS LIMITED
          </motion.div>
        </motion.div>

        {/* Updated CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => navigate('/globe')}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-semibold rounded-lg shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(245, 158, 11, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            🌍 Explore the Globe
          </motion.button>
          
          <motion.button
            onClick={() => navigate('/deploy')}
            className="px-8 py-4 border-2 border-amber-400 text-amber-400 font-semibold rounded-lg hover:bg-amber-400 hover:text-gray-900 transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "#f59e0b",
              color: "#111827"
            }}
            whileTap={{ scale: 0.95 }}
          >
            ⚡ Deploy an Agent
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
              className={`p-6 rounded-xl border transition-all duration-500 backdrop-blur-sm ${
                currentMetric === index
                  ? 'border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-400/20'
                  : 'border-gray-600 bg-gray-800/30'
              }`}
              whileHover={{ 
                scale: 1.05,
                borderColor: "#f59e0b"
              }}
              animate={{
                borderColor: currentMetric === index ? "#f59e0b" : "#4b5563"
              }}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{metric.icon}</div>
                <div className={`text-3xl font-bold mb-2 transition-colors duration-500 ${
                  currentMetric === index ? 'text-amber-400' : 'text-white'
                }`}>
                  {metric.value}
                </div>
                <div className="text-gray-400">{metric.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Company Tagline */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <motion.p 
            className="text-lg text-amber-400/60 font-light italic"
            animate={{
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            "Sovereign AI Infrastructure for the Future of Autonomous Intelligence"
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}

