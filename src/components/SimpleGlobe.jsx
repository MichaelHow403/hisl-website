import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DEEPSEEK_API_KEY = 'sk-3bfecdbb798e441e82899dfabfd39ec6';

export default function SimpleGlobe() {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    try {
      const ctx = canvas.getContext('2d');
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 20;
      
      // Draw globe
      const drawGlobe = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw globe
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
        gradient.addColorStop(0, '#0a4166');
        gradient.addColorStop(1, '#00ffff');
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        
        // Draw latitude lines
        for (let i = 0; i < 10; i++) {
          const latRadius = radius * (i / 10);
          ctx.beginPath();
          ctx.arc(centerX, centerY, latRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        // Draw longitude lines
        for (let i = 0; i < 12; i++) {
          const angle = (i / 12) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(
            centerX + radius * Math.cos(angle),
            centerY + radius * Math.sin(angle)
          );
          ctx.stroke();
        }
        
        // Draw data points
        const numPoints = 20;
        for (let i = 0; i < numPoints; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * radius * 0.9;
          const x = centerX + distance * Math.cos(angle);
          const y = centerY + distance * Math.sin(angle);
          
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }
        
        // Draw API key indicator
        ctx.fillStyle = '#00ffff';
        ctx.font = '12px JetBrains Mono';
        ctx.textAlign = 'center';
        ctx.fillText('DeepSeek API Connected', centerX, centerY + radius + 30);
        
        setIsLoading(false);
      };
      
      drawGlobe();
      
      // Animate data flow
      let animationFrame;
      const animate = () => {
        drawGlobe();
        animationFrame = requestAnimationFrame(animate);
      };
      
      animate();
      
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    } catch (err) {
      console.error('Error rendering globe:', err);
      setError('Failed to render globe');
      setIsLoading(false);
    }
  }, []);
  
  return (
    <div className="relative w-full h-[300px] flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <canvas 
          ref={canvasRef} 
          width={300} 
          height={300} 
          className="rounded-full shadow-lg"
        />
        
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
          <div className="text-xs font-mono text-primary opacity-70">
            {DEEPSEEK_API_KEY.substring(0, 8)}...
          </div>
        </div>
      </motion.div>
    </div>
  );
}

