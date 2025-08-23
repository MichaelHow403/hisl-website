import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

export default function AboutPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <Header logoVariant="HISL" />
      
      <motion.div 
        className="container mx-auto px-6 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Page Header */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text text-transparent">
            About HISL
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Howard Integritas Solutions Limited - Where AI meets human ingenuity with unwavering integrity
          </p>
        </motion.div>

        {/* Company Story */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
          variants={itemVariants}
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-amber-400 mb-6">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              HISL represents the convergence of artificial intelligence and human wisdom, 
              built on a foundation of absolute integrity. We believe that the future of AI 
              lies not in replacing human intelligence, but in amplifying it while maintaining 
              complete sovereignty over your data and prompts.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Our sovereign AI infrastructure ensures that your intellectual property remains 
              yours, your compliance requirements are met, and your cognitive processes are 
              enhanced rather than replaced.
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <img 
                src="/hisl_logo.png" 
                alt="HISL Logo" 
                className="w-16 h-16 object-contain"
              />
              <div>
                <div className="text-amber-400 font-semibold">HISL</div>
                <div className="text-gray-400 text-sm">Corporate Identity</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-amber-400 mb-6">IntegAI Platform</h2>
            <p className="text-gray-300 leading-relaxed">
              IntegAI is our deployment platform that transforms complex AI requirements 
              into sovereign, compliant solutions. Built with enterprise-grade security 
              and regulatory compliance at its core, IntegAI ensures your AI agents 
              operate within your governance framework.
            </p>
            <p className="text-gray-300 leading-relaxed">
              From healthcare to defense, from finance to manufacturing, IntegAI adapts 
              to your industry's specific requirements while maintaining the highest 
              standards of data sovereignty and operational integrity.
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <img 
                src="/integai_logo.png" 
                alt="IntegAI Logo" 
                className="w-16 h-16 object-contain"
              />
              <div>
                <div className="text-amber-400 font-semibold">IntegAI</div>
                <div className="text-gray-400 text-sm">Deployment Platform</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Founder Bio */}
        <motion.div 
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-12"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-1">
              <div className="w-48 h-48 mx-auto bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center">
                <div className="text-6xl font-bold text-gray-900">MH</div>
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-3xl font-bold text-amber-400">Michael Howard</h3>
              <p className="text-xl text-gray-300">Founder & Chief Executive</p>
              
              <p className="text-gray-300 leading-relaxed">
                Michael Howard brings decades of experience in enterprise technology, 
                regulatory compliance, and AI governance. His vision for HISL emerged 
                from witnessing the gap between AI's potential and the real-world 
                requirements of regulated industries.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                With a background spanning financial services, healthcare technology, 
                and defense contracting, Michael understands that true AI adoption 
                requires more than just technical capability—it demands trust, 
                transparency, and unwavering commitment to data sovereignty.
              </p>

              <div className="flex space-x-4 pt-4">
                <a 
                  href="https://www.linkedin.com/in/michaelhowardmciob" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://substack.com/@michaelhowardmciob" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Substack
                </a>
                <a 
                  href="mailto:michael.howard@hisl.ie"
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={itemVariants}
        >
          <div className="text-center p-6 bg-gray-800/30 rounded-xl">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold text-amber-400 mb-3">Sovereignty</h3>
            <p className="text-gray-300">
              Your data, your prompts, your control. Complete sovereignty over your AI infrastructure.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-800/30 rounded-xl">
            <div className="text-4xl mb-4">⚖️</div>
            <h3 className="text-xl font-bold text-amber-400 mb-3">Compliance</h3>
            <p className="text-gray-300">
              Built-in regulatory compliance for healthcare, finance, defense, and beyond.
            </p>
          </div>

          <div className="text-center p-6 bg-gray-800/30 rounded-xl">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-bold text-amber-400 mb-3">Intelligence</h3>
            <p className="text-gray-300">
              AI that amplifies human cognition while preserving the soul of decision-making.
            </p>
          </div>
        </motion.div>
      </motion.div>

      <Footer logoVariant="HISL" />
    </div>
  );
}

