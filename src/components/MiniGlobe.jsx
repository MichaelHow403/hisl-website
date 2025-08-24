import React from 'react';
import { useNavigate } from 'react-router-dom';

// Simplified Mini Globe component to prevent WebGL conflicts
export default function MiniGlobe({ className = "" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/globe');
  };

  return (
    <div 
      className={`cursor-pointer transition-transform hover:scale-105 ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      aria-label="Interactive globe preview - Click to explore full experience"
    >
      {/* Static globe preview with CSS animation */}
      <div className="relative w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-black rounded-full overflow-hidden border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
        {/* Earth surface pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-800/30 via-blue-600/40 to-blue-900/60 rounded-full"></div>
        
        {/* Continents overlay */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/3 w-8 h-6 bg-green-600/60 rounded-lg transform rotate-12"></div>
          <div className="absolute top-1/2 right-1/4 w-6 h-8 bg-green-600/60 rounded-lg transform -rotate-6"></div>
          <div className="absolute bottom-1/3 left-1/4 w-10 h-4 bg-green-600/60 rounded-lg transform rotate-45"></div>
        </div>
        
        {/* Animated ravens */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 w-3 h-3 transform -translate-x-1/2 animate-pulse">
            <img 
              src="/assets/raven_huginn.png" 
              alt="Huginn raven" 
              className="w-full h-full opacity-80"
            />
          </div>
          <div className="absolute bottom-1/3 right-1/3 w-3 h-3 animate-pulse" style={{ animationDelay: '1s' }}>
            <img 
              src="/assets/raven_muninn.png" 
              alt="Muninn raven" 
              className="w-full h-full opacity-80"
            />
          </div>
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-transparent to-blue-400/10 rounded-full animate-pulse"></div>
        
        {/* Data points */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Click hint */}
      <div className="text-center mt-3">
        <p className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
          See how your prompts travel →
        </p>
      </div>
    </div>
  );
}

