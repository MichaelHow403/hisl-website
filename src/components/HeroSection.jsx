import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ChevronDown, ExternalLink } from 'lucide-react';

export default function HeroSection() {
  const scrollToGlobe = () => {
    document.getElementById('globe-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]" />
        {/* Animated stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* System Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-500 font-mono text-sm">SYSTEM ONLINE</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-8xl font-bold mb-6 text-gradient leading-tight"
          >
            HISL CONTROL
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl font-light mb-8 text-secondary"
          >
            Intelligence for Sovereign Offline Leadership
          </motion.h2>

          {/* Mission Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Building the future of offline-first AI, securely in your hands. We design and deploy 
            sovereign AI systems that run on your own infrastructure, offline-first, with 
            observability, safety, and performance built in.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              size="lg"
              className="font-mono text-lg px-8 py-4 glow hover:glow-blue"
              asChild
            >
              <a 
                href="https://www.linkedin.com/in/michaelhowardconstruction" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                LinkedIn
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="font-mono text-lg px-8 py-4 hover:glow"
              asChild
            >
              <a 
                href="https://substack.com/@michaelhowardmciob?utm_source=user-menu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Substack
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="font-mono text-lg px-8 py-4 hover:glow-blue"
              onClick={() => document.getElementById('agent-fleet')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Deploy Agent
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={scrollToGlobe}
          >
            <span className="text-sm font-mono text-muted-foreground">
              WHERE YOUR PROMPTS GO
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-primary" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/src/assets/AI_Construction_Bridge_banner.png')`
        }}
      />
    </section>
  );
}

