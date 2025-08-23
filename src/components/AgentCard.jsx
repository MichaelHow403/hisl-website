import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

const statusColors = {
  active: 'bg-green-500',
  standby: 'bg-yellow-500',
  locked: 'bg-gray-500'
};

const statusLabels = {
  active: 'ACTIVE',
  standby: 'STANDBY',
  locked: 'LOCKED'
};

export default function AgentCard({ 
  name, 
  description, 
  status = 'active', 
  sector,
  functions = [],
  differentiator,
  onDeploy 
}) {
  const isLocked = status === 'locked';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: isLocked ? 1 : 1.02 }}
      className={`
        relative p-6 rounded-lg border transition-all duration-300
        ${isLocked 
          ? 'bg-card/50 border-gray-600 opacity-60' 
          : 'bg-card border-border hover:border-primary/50 hover:glow'
        }
      `}
    >
      {/* Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${statusColors[status]} ${status === 'active' ? 'animate-pulse' : ''}`} />
          <span className="text-xs font-mono text-muted-foreground">
            {statusLabels[status]}
          </span>
        </div>
        {sector && (
          <span className="text-xs text-primary font-mono">
            {sector}
          </span>
        )}
      </div>

      {/* Agent Name */}
      <h3 className="text-xl font-bold mb-2 text-gradient">
        {name}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {description}
      </p>

      {/* Key Functions */}
      {functions.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-mono text-primary mb-2">KEY FUNCTIONS:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            {functions.slice(0, 3).map((func, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>{func}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Differentiator */}
      {differentiator && (
        <div className="mb-4 p-3 bg-primary/10 rounded border border-primary/20">
          <p className="text-xs text-primary font-mono">
            {differentiator}
          </p>
        </div>
      )}

      {/* Deploy Button */}
      <Button
        onClick={onDeploy}
        disabled={isLocked}
        className={`
          w-full font-mono text-sm
          ${isLocked 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:glow-blue'
          }
        `}
        variant={isLocked ? "outline" : "default"}
      >
        {isLocked ? 'LOCKED' : 'DEPLOY →'}
      </Button>

      {/* Glow effect for active agents */}
      {status === 'active' && (
        <div className="absolute inset-0 rounded-lg bg-primary/5 animate-pulse-glow pointer-events-none" />
      )}
    </motion.div>
  );
}

