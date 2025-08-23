import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import HISLLogo from '../assets/HISL_LOGO.PNG';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const links = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/michaelhowardconstruction' },
    { name: 'Substack', href: 'https://substack.com/@michaelhowardmciob?utm_source=user-menu' },
    { name: 'GitHub', href: 'https://github.com/MichaelHow403' }
  ];
  
  const navItems = [
    { name: 'Projects Hub', href: '/projects' },
    { name: 'Knowledge Base', href: '/knowledge' },
    { name: 'Strategy LIVE', href: '/strategy-live' }
  ];

  return (
    <footer className="bg-hisl-dark border-t border-primary/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={HISLLogo} 
                alt="HISL Logo" 
                className="h-10 w-10"
              />
              <div>
                <h3 className="text-xl font-bold text-gradient">HISL CONTROL</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Building the future of offline-first AI, securely in your hands.
            </p>
          </div>
          
          {/* Navigation */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-bold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Connect */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg font-bold text-foreground mb-4">Connect</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Howard Integritas Solutions Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

