import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function RefinedHeroSection() {
  const [currentMetric, setCurrentMetric] = useState(0);
  
  const metrics = [
    { icon: "🛡️", value: "100%", label: "Sovereign Control" },
    { icon: "⚡", value: "24/7", label: "Autonomous Operation" },
    { icon: "🧠", value: "∞", label: "Scalable Intelligence" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        {/* DNA/Feather Animated Overlay */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path
                d="M100,20 Q120,40 100,60 Q80,40 100,20 M100,60 Q120,80 100,100 Q80,80 100,60 M100,100 Q120,120 100,140 Q80,120 100,100 M100,140 Q120,160 100,180 Q80,160 100,140"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-cyan-400"
              />
            </svg>
          </motion.div>
          
          <motion.div
            className="absolute top-3/4 right-1/4 w-48 h-48"
            animate={{
              rotate: -360,
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path
                d="M100,50 L120,70 L100,90 L80,70 Z M100,90 L120,110 L100,130 L80,110 Z M100,130 L120,150 L100,170 L80,150 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                className="text-blue-400"
              />
            </svg>
          </motion.div>
        </div>

        {/* Starfield Background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Main Headline */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI + Human
          </span>
          <br />
          <span className="text-white">… with </span>
          <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            soul
          </span>
        </motion.h1>

        {/* Subline */}
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Where compliance meets cognition. Where prompts stay yours.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <button
            onClick={() => scrollToSection('agents')}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
          >
            <span className="relative z-10 flex items-center gap-2">
              🤖 Explore the Agents
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="group relative px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-cyan-400 hover:text-gray-900"
          >
            <span className="relative z-10 flex items-center gap-2">
              📝 Join the Waitlist
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </motion.div>

        {/* Animated Metrics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-xl border transition-all duration-500 ${
                currentMetric === index
                  ? 'border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20'
                  : 'border-gray-700 bg-gray-800/50'
              }`}
              animate={{
                scale: currentMetric === index ? 1.05 : 1,
                opacity: currentMetric === index ? 1 : 0.7,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl mb-2">{metric.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-sm text-gray-400">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
}

