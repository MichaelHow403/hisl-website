import React, { useState } from 'react';
import { Database, Camera, Shield, FileCheck, Lock, Users, TrendingUp } from 'lucide-react';

const AgentEcosystem = () => {
  const [hoveredAgent, setHoveredAgent] = useState(null);

  const agents = [
    {
      id: 'integai',
      name: 'INTEGAI',
      description: 'Core orchestrator. Handles reasoning, agent routing, memory queries, and sovereign control.',
      buildProgress: 95,
      tooltip: 'The brain of your sovereign AI system.',
      animation: 'DNA helix pulses behind glyph',
      icon: <Database className="w-8 h-8" />,
      color: 'from-cyan-400 to-blue-500'
    },
    {
      id: 'conservai',
      name: 'ConservAI',
      description: 'Site inspector for built heritage. Captures photos and generates professional reports on-the-go.',
      buildProgress: 80,
      tooltip: 'Preserve history, intelligently.',
      animation: 'Feather glows with engraved texture',
      icon: <Camera className="w-8 h-8" />,
      color: 'from-emerald-400 to-teal-500'
    },
    {
      id: 'rams-ai',
      name: 'RAMS AI',
      description: 'Auto-generates RAMS documents and validates risk coverage in real-time.',
      buildProgress: 85,
      tooltip: 'Create compliant safety plans instantly.',
      animation: 'Safety glyph pulses in a gold ring',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'audittrail-ai',
      name: 'AuditTrailAI',
      description: 'Tracks compliance actions, creates time-stamped logs, and summarizes project risk trends.',
      buildProgress: 70,
      tooltip: 'Your ethical audit assistant.',
      animation: 'Circuit line flickers with memory node highlights',
      icon: <FileCheck className="w-8 h-8" />,
      color: 'from-purple-400 to-indigo-500'
    },
    {
      id: 'docushield',
      name: 'DocuShield',
      description: 'Validates and locks critical documents. Watermarks, timestamps, and confirms policy links.',
      buildProgress: 60,
      tooltip: 'Protect what matters.',
      animation: 'Shield icon glows and rotates faintly',
      icon: <Lock className="w-8 h-8" />,
      color: 'from-red-400 to-pink-500'
    },
    {
      id: 'compii-ai',
      name: 'CompIIAI',
      description: 'Maps contractor competencies and checks PSCS safety alignment.',
      buildProgress: 65,
      tooltip: 'Know who\'s really qualified.',
      animation: 'Worker glyph scans with a red/yellow/green flash',
      icon: <Users className="w-8 h-8" />,
      color: 'from-green-400 to-lime-500'
    },
    {
      id: 'fpx-ai',
      name: 'FPX AI',
      description: 'Tracks project finances, forecast risk, and monitors key deliverables.',
      buildProgress: 75,
      tooltip: 'Your project\'s pulse, visualized.',
      animation: 'Digital pulse line animates above glyph',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'from-blue-400 to-cyan-500'
    }
  ];

  const HexAgent = ({ agent, index }) => {
    const isHovered = hoveredAgent === agent.id;
    
    return (
      <div
        className="relative group cursor-pointer"
        onMouseEnter={() => setHoveredAgent(agent.id)}
        onMouseLeave={() => setHoveredAgent(null)}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className={`
          w-56 h-56 relative transition-all duration-500 transform
          ${isHovered ? 'scale-110 z-20' : 'z-10'}
        `}>
          {isHovered && (
            <div 
              className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-yellow-400/30 blur-xl"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
              }}
            />
          )}
          
          <div 
            className={`
              w-full h-full bg-black border-2 relative overflow-hidden
              ${isHovered ? 'border-cyan-400 shadow-2xl shadow-cyan-400/50' : 'border-yellow-600/50'}
              transition-all duration-300
            `}
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
            }}
          >
            <div className="absolute inset-4 flex flex-col items-center justify-center text-center">
              <div className={`
                mb-4 text-yellow-400 transition-all duration-300
                ${isHovered ? 'text-cyan-400 scale-125' : ''}
              `}>
                {agent.icon}
              </div>
              
              <h3 className="text-white font-bold text-lg mb-2">
                {agent.name}
              </h3>
              
              <div className="w-full bg-gray-800 rounded-full h-2 mb-3">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r transition-all duration-1000 ${agent.color}`}
                  style={{ 
                    width: `${agent.buildProgress}%`,
                    boxShadow: isHovered ? '0 0 20px currentColor' : 'none'
                  }}
                />
              </div>
              
              <div className="text-cyan-400 font-mono text-sm font-bold">
                {agent.buildProgress}%
              </div>
              
              <div className={`
                absolute top-3 right-3 w-3 h-3 rounded-full
                ${agent.buildProgress >= 70 ? 'bg-green-400' : 'bg-yellow-400'}
                ${agent.buildProgress >= 70 ? 'animate-pulse' : ''}
              `} />
            </div>
          </div>
        </div>

        {isHovered && (
          <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
            <div className="bg-black/90 backdrop-blur-md text-white px-6 py-4 rounded-xl border border-cyan-400/30 shadow-2xl max-w-sm">
              <div className="text-cyan-400 font-semibold mb-2">
                {agent.tooltip}
              </div>
              <div className="text-gray-300 text-sm mb-2">
                {agent.description}
              </div>
              <div className="text-yellow-400/70 text-xs italic">
                {agent.animation}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-20 px-4 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, cyan 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, gold 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Agent Ecosystem
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Sovereign AI agents designed for integrity, built for humanity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center mb-16">
          {agents.map((agent, index) => (
            <HexAgent key={agent.id} agent={agent} index={index} />
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-black/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-cyan-400/20 p-12">
          <h3 className="text-3xl font-bold text-white mb-6">
            Every agent contains a fragment of the Soul Seed
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Deploy what you need, and stay sovereign.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold rounded-lg hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-400/30">
            Deploy Agents
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default AgentEcosystem;
