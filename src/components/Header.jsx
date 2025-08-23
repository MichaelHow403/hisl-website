import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Header({ logoVariant = "HISL" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const getLogoConfig = () => {
    switch (logoVariant) {
      case "INTEGAI":
        return {
          src: "/integai_logo.png",
          alt: "IntegAI Logo",
          title: "IntegAI Platform",
          gradient: "from-amber-400 to-yellow-400"
        };
      case "DUAL":
        return {
          src: "/hisl_logo.png",
          alt: "HISL Logo",
          title: "HISL × IntegAI",
          gradient: "from-cyan-400 via-amber-400 to-cyan-400"
        };
      default: // HISL
        return {
          src: "/hisl_logo.png",
          alt: "HISL Logo",
          title: "HISL CONTROL",
          gradient: "from-cyan-400 to-blue-400"
        };
    }
  };

  const logoConfig = getLogoConfig();

  const navigationItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Globe", path: "/globe" },
    { label: "Deploy", path: "/deploy" },
    { label: "Projects Hub", path: "/projects" },
    { label: "Knowledge Base", path: "/knowledge" },
    { label: "Strategy LIVE", path: "/strategy" }
  ];

  const externalLinks = [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/YOUR-HANDLE", icon: "💼" },
    { label: "Substack", url: "https://YOUR-SUBSTACK.substack.com", icon: "📝" },
    { label: "Email", url: "mailto:contact@hisl.ai", icon: "✉️" }
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
          >
            <img 
              src={logoConfig.src}
              alt={logoConfig.alt}
              className="w-10 h-10 object-contain"
            />
            <div className={`text-2xl font-bold bg-gradient-to-r ${logoConfig.gradient} bg-clip-text text-transparent`}>
              {logoConfig.title}
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.slice(0, 4).map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="text-gray-300 hover:text-cyan-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
            
            {/* External Links */}
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-700">
              {externalLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
                  rel={link.url.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                  className="text-gray-300 hover:text-cyan-400 transition-colors text-sm"
                  title={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>

            <motion.button
              onClick={() => navigate('/deploy')}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Deploy Agent
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-300 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="lg:hidden mt-4 py-4 border-t border-gray-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-300 hover:text-cyan-400 transition-colors text-left"
                >
                  {item.label}
                </button>
              ))}
              
              <div className="flex space-x-4 pt-2">
                {externalLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
                    rel={link.url.startsWith('mailto:') ? '' : 'noopener noreferrer'}
                    className="text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    {link.icon} {link.label}
                  </a>
                ))}
              </div>
              
              <button 
                onClick={() => {
                  navigate('/deploy');
                  setIsMenuOpen(false);
                }}
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium text-left"
              >
                Deploy Agent
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}

