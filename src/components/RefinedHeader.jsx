import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function RefinedHeader({ logoVariant = "HISL" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const getLogo = () => {
    switch (logoVariant) {
      case "INTEGAI":
        return {
          src: "/assets/integai-logo.png",
          alt: "IntegAI Logo",
          className: "h-8 w-auto"
        };
      case "DUAL":
        return {
          dual: true,
          hisl: { src: "/assets/hisl-logo.jpeg", alt: "HISL Logo", className: "h-8 w-auto" },
          integai: { src: "/assets/integai-logo.png", alt: "IntegAI Logo", className: "h-6 w-auto" }
        };
      default: // HISL
        return {
          src: "/assets/hisl-logo.jpeg",
          alt: "HISL Logo",
          className: "h-8 w-auto"
        };
    }
  };

  const logo = getLogo();
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Globe', path: '/globe' },
    { name: 'Deploy', path: '/deploy' },
    { name: 'Projects', path: '/projects' },
    { name: 'Knowledge', path: '/knowledge' },
    { name: 'Strategy', path: '/strategy' }
  ];

  const externalLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/michaelhowardconstruction',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: 'Substack',
      url: 'https://hisl.substack.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
      )
    },
    {
      name: 'Email',
      url: 'mailto:michael.howard@hisl.ie',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      )
    }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4">
            {logo.dual ? (
              <div className="flex items-center gap-3">
                <img 
                  src={logo.hisl.src} 
                  alt={logo.hisl.alt} 
                  className={logo.hisl.className}
                />
                <div className="w-px h-6 bg-gray-600" />
                <img 
                  src={logo.integai.src} 
                  alt={logo.integai.alt} 
                  className={logo.integai.className}
                />
              </div>
            ) : (
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className={logo.className}
              />
            )}
            
            {logoVariant === "INTEGAI" && (
              <div className="ml-2">
                <div className="text-lg font-bold text-white">IntegAI</div>
                <div className="text-xs text-gray-400">Deploy Platform</div>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* External Links & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* External Links - Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              {externalLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
                  rel={link.url.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>

            {/* IntegAI Badge - Show on non-IntegAI pages */}
            {logoVariant !== "INTEGAI" && (
              <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30">
                <img 
                  src="/assets/integai-logo.png" 
                  alt="IntegAI" 
                  className="h-4 w-4"
                />
                <span className="text-xs text-yellow-400 font-medium">IntegAI</span>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-300 hover:text-white transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 py-4 border-t border-gray-800"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-cyan-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* External Links - Mobile */}
              <div className="flex items-center gap-6 pt-4 border-t border-gray-800">
                {externalLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
                    rel={link.url.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                    className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.icon}
                    <span className="text-sm">{link.name}</span>
                  </a>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}

