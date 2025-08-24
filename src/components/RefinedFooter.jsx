import React from 'react';
import { Link } from 'react-router-dom';

export default function RefinedFooter() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Globe', path: '/globe' },
    { name: 'Deploy', path: '/deploy' },
    { name: 'Projects', path: '/projects' },
    { name: 'Knowledge', path: '/knowledge' },
    { name: 'Strategy', path: '/strategy' }
  ];

  const agentCategories = [
    'Healthcare', 'Environmental', 'Defense', 'Legal', 
    'Finance', 'Military', 'Manufacturing', 'Education', 'Infrastructure'
  ];

  return (
    <footer id="contact" className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info with HISL Logo */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/assets/hisl-logo.jpeg" 
                alt="HISL Logo" 
                className="h-10 w-auto"
              />
              <div>
                <div className="text-lg font-bold text-white">HISL</div>
                <div className="text-sm text-gray-400">Control</div>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Sovereign AI Infrastructure for the Future of Autonomous Intelligence. 
              Engineering intelligence like infrastructure—built to serve people.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3">
              <a 
                href="mailto:michael.howard@hisl.ie"
                className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                michael.howard@hisl.ie
              </a>
              
              <div className="flex items-center gap-4 pt-2">
                <a 
                  href="https://www.linkedin.com/in/michaelhowardconstruction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </a>
                
                <a 
                  href="https://hisl.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                  title="Substack"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Navigation</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Agents */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">AI Agents</h3>
            <ul className="space-y-3">
              {agentCategories.slice(0, 7).map((category) => (
                <li key={category}>
                  <button 
                    onClick={() => {
                      // Scroll to agents section
                      const element = document.getElementById('agents');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200 text-left"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Waitlist */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Get Started</h3>
            <div className="space-y-4">
              <p className="text-gray-400 text-sm leading-relaxed">
                Join the waitlist for early access to IntegAI's sovereign AI platform.
              </p>
              
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-200"
                >
                  Join Waitlist
                </button>
                
                <a 
                  href="mailto:michael.howard@hisl.ie?subject=IntegAI Inquiry"
                  className="block w-full px-4 py-2 border border-cyan-400 text-cyan-400 font-semibold rounded-lg text-center hover:bg-cyan-400 hover:text-gray-900 transition-colors duration-200"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <p className="text-gray-400 text-sm">
                © {currentYear} Howard Integritas Solutions Limited (HISL). All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Powered by</span>
              <img 
                src="/assets/integai-logo.png" 
                alt="IntegAI" 
                className="h-4 w-4"
              />
              <span className="text-yellow-400 font-medium">IntegAI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

