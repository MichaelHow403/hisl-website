import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Menu, X, ExternalLink } from 'lucide-react';
import HISLLogo from '../assets/HISL_LOGO.PNG';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Projects Hub', href: '/projects' },
    { name: 'Knowledge Base', href: '/knowledge' },
    { name: 'Strategy LIVE', href: '/strategy-live' }
  ];

  const externalLinks = [
    { 
      name: 'LinkedIn', 
      href: 'https://www.linkedin.com/in/michaelhowardconstruction',
      tooltip: "Let's build the future of AI + Construction together."
    },
    { 
      name: 'Substack', 
      href: "https://substack.com/@michaelhowardmciob?utm_source=user-menu" 
    }
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-hisl-dark/80 backdrop-blur-md border-b border-primary/20"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <img 
              src={HISLLogo}
              alt="HISL Logo" 
              className="h-10 w-10"
            />
            <div>
              <h1 className="text-xl font-bold text-gradient">HISL CONTROL</h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-mono text-green-500">SYSTEM ONLINE</span>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="font-mono text-sm hover:text-primary"
                asChild
              >
                <a href={item.href}>{item.name}</a>
              </Button>
            ))}
          </nav>

          {/* External Links */}
          <div className="hidden md:flex items-center gap-4">
            {externalLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Button
                  variant="outline"
                  size="sm"
                  className="font-mono hover:glow"
                  asChild
                >
                  <a 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
                {link.tooltip && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-card border border-border rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {link.tooltip}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pt-4 border-t border-primary/20"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="justify-start font-mono"
                  asChild
                >
                  <a href={item.href}>{item.name}</a>
                </Button>
              ))}
              <div className="flex gap-2 pt-2">
                {externalLinks.map((link) => (
                  <Button
                    key={link.name}
                    variant="outline"
                    size="sm"
                    className="font-mono flex-1"
                    asChild
                  >
                    <a 
                      href={link.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      {link.name}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}

