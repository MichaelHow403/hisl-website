import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

export default function DeployPage() {
  const [industry, setIndustry] = useState('');
  const [problem, setProblem] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [activeModule, setActiveModule] = useState(null);

  const industries = [
    'Healthcare', 'Finance', 'Manufacturing', 'Defense', 'Legal', 
    'Education', 'Energy', 'Transportation', 'Retail', 'Agriculture'
  ];

  const modules = [
    { id: 'compliance', name: 'Compliance Engine', icon: '⚖️', color: 'blue' },
    { id: 'security', name: 'Security Layer', icon: '🛡️', color: 'red' },
    { id: 'analytics', name: 'Analytics Core', icon: '📊', color: 'green' },
    { id: 'integration', name: 'Integration Hub', icon: '🔗', color: 'purple' },
    { id: 'monitoring', name: 'Monitoring Suite', icon: '👁️', color: 'yellow' },
    { id: 'automation', name: 'Automation Engine', icon: '⚙️', color: 'cyan' }
  ];

  const handleAnalyze = async () => {
    if (!industry || !problem.trim()) return;
    
    setIsAnalyzing(true);
    setAnalysis(null);

    // Simulate analysis with module lighting up
    for (let i = 0; i < modules.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setActiveModule(modules[i].id);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock analysis result
    const mockAnalysis = {
      recommendedAgent: `${industry}AI Specialist`,
      modules: modules.filter(() => Math.random() > 0.3), // Random subset
      complianceScore: Math.floor(Math.random() * 20) + 80, // 80-99%
      energyUsage: Math.random() * 50 + 20, // 20-70 kWh/month
      buildTime: Math.floor(Math.random() * 14) + 7, // 7-21 days
      confidence: Math.floor(Math.random() * 15) + 85, // 85-99%
      requirements: [
        `${industry}-specific regulatory compliance`,
        'Data sovereignty and privacy protection',
        'Real-time monitoring and alerting',
        'Scalable infrastructure architecture'
      ],
      estimatedCost: `$${(Math.random() * 50000 + 25000).toLocaleString()}/month`
    };

    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
    setActiveModule(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900">
      <Header logoVariant="INTEGAI" />
      
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
          <div className="flex items-center justify-center gap-4 mb-6">
            <img 
              src="/integai_logo.png" 
              alt="IntegAI Logo" 
              className="w-16 h-16 object-contain"
            />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent">
              IntegAI Platform
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            Deploy sovereign AI agents tailored to your industry and compliance requirements
          </p>
          <div className="text-sm text-amber-400/80">
            Enterprise-Grade AI Deployment • Regulatory Compliant • Sovereign Infrastructure
          </div>
        </motion.div>

        {/* Input Section */}
        <motion.div 
          className="max-w-4xl mx-auto mb-12"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Industry Selection */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-amber-400">
                Select Your Industry
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full p-4 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
              >
                <option value="">Choose an industry...</option>
                {industries.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            {/* Problem Description */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-amber-400">
                Describe Your Challenge
              </label>
              <textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="What business problem do you need to solve with AI?"
                className="w-full h-24 p-4 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 resize-none"
              />
            </div>
          </div>

          <motion.button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !industry || !problem.trim()}
            className="w-full mt-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence mode="wait">
              {isAnalyzing ? (
                <motion.span
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-900 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  Analyzing Requirements...
                </motion.span>
              ) : (
                <motion.span
                  key="analyze"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  🚀 Analyze & Generate Deployment Plan
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* Module Pipeline Visualization */}
        <motion.div 
          className="mb-12"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-amber-400 text-center mb-8">
            IntegAI Module Pipeline
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                className={`p-4 rounded-xl border-2 transition-all duration-500 ${
                  activeModule === module.id
                    ? `border-${module.color}-400 bg-${module.color}-400/20 shadow-lg shadow-${module.color}-400/30`
                    : 'border-gray-600 bg-gray-800/30'
                }`}
                animate={{
                  borderColor: activeModule === module.id ? `var(--${module.color}-400)` : '#4b5563',
                  backgroundColor: activeModule === module.id ? `rgba(var(--${module.color}-400-rgb), 0.1)` : 'rgba(31, 41, 55, 0.3)'
                }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{module.icon}</div>
                  <div className="text-sm font-medium text-white">{module.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Analysis Results */}
        <AnimatePresence>
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recommended Agent */}
                <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-amber-400/30">
                  <h3 className="text-2xl font-bold text-amber-400 mb-4">
                    Recommended Agent
                  </h3>
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-white">{analysis.recommendedAgent}</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Compliance Score:</span>
                        <div className="text-green-400 font-bold">{analysis.complianceScore}%</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Confidence:</span>
                        <div className="text-blue-400 font-bold">{analysis.confidence}%</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Build Time:</span>
                        <div className="text-yellow-400 font-bold">{analysis.buildTime} days</div>
                      </div>
                      <div>
                        <span className="text-gray-400">Energy Usage:</span>
                        <div className="text-green-400 font-bold">{analysis.energyUsage.toFixed(1)} kWh/mo</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Requirements & Modules */}
                <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-blue-400/30">
                  <h3 className="text-2xl font-bold text-blue-400 mb-4">
                    Required Modules
                  </h3>
                  <div className="space-y-3">
                    {analysis.modules.map(module => (
                      <div key={module.id} className="flex items-center gap-3 p-2 bg-gray-700/50 rounded-lg">
                        <span className="text-xl">{module.icon}</span>
                        <span className="text-white">{module.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-green-400/30">
                  <h3 className="text-2xl font-bold text-green-400 mb-4">
                    Key Requirements
                  </h3>
                  <ul className="space-y-2">
                    {analysis.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <span className="text-green-400 mt-1">✓</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deployment Summary */}
                <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-purple-400/30">
                  <h3 className="text-2xl font-bold text-purple-400 mb-4">
                    Deployment Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Estimated Cost:</span>
                      <span className="text-white font-bold">{analysis.estimatedCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Deployment Time:</span>
                      <span className="text-white font-bold">{analysis.buildTime} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Carbon Footprint:</span>
                      <span className="text-green-400 font-bold">Offset by HISL</span>
                    </div>
                  </div>
                  
                  <motion.button
                    className="w-full mt-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🚀 Deploy This Agent
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Footer logoVariant="INTEGAI" />
    </div>
  );
}

