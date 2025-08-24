import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HeroClarity from './components/HeroClarity';
import RefinedHeader from './components/RefinedHeader';
import RefinedFooter from './components/RefinedFooter';
import MiniGlobeTeaser from './components/MiniGlobeTeaser';
import WorkingGlobePage from './components/WorkingGlobePage';

// Simple working homepage with Hero Clarity
function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <RefinedHeader logoVariant="HISL" />
      
      {/* Hero Section with Bridge Background */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('/assets/AI_Construction_Bridge_banner.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Reduced brightness starfield */}
        <div className="absolute inset-0 opacity-25">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Subtle particle drift */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${10 + Math.random() * 10}s infinite linear`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Clarity Content */}
        <div className="relative z-10 w-full">
          <HeroClarity />
        </div>
      </section>

      {/* Vision Section */}
      <section 
        className="py-32 relative overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/reach_for_the_stars.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <img 
                src="/assets/IntegAI_Logo.png" 
                alt="IntegAI" 
                className="h-12 w-12"
              />
              <h2 className="text-4xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  OUR VISION
                </span>
              </h2>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Classical Poem */}
              <div className="space-y-8">
                <div className="text-2xl md:text-3xl font-light text-yellow-300 leading-relaxed italic">
                  <p className="mb-6">
                    "Then prove we now with best endeavour,<br/>
                    What from our efforts yet may spring,<br/>
                    He justly is despised who never,<br/>
                    Did thought to aid his labours bring."
                  </p>
                  
                  <p className="mb-8">
                    "For this is Art's true indication,<br/>
                    When skill is minister to thought,<br/>
                    When types that are the mind's creation,<br/>
                    The hand to perfect form has wrought."
                  </p>
                </div>
                
                {/* Closing Quote */}
                <div className="text-center pt-8 border-t border-yellow-400/30">
                  <p className="text-xl md:text-2xl font-light text-yellow-200 italic">
                    "We reach not just for the stars, but for the soul within the machine."
                  </p>
                  <p className="text-lg text-yellow-400/80 mt-4">
                    — The IntegAI Promise
                  </p>
                </div>
              </div>

              {/* Vision Principles */}
              <div className="space-y-8">
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/20">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">Human-Centric AI</h3>
                  <p className="text-gray-200 leading-relaxed">
                    Technology that serves humanity, not the other way around. Every algorithm designed with human dignity at its core.
                  </p>
                </div>

                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/20">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">Sovereign Intelligence</h3>
                  <p className="text-gray-200 leading-relaxed">
                    AI that respects borders, cultures, and local values. Your data, your rules, your sovereignty.
                  </p>
                </div>

                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/20">
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4">Transparent by Design</h3>
                  <p className="text-gray-200 leading-relaxed">
                    Every decision traceable, every process auditable. AI you can understand, trust, and verify.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Globe Section */}
      <section className="py-20 relative bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                WHERE YOUR PROMPTS GO
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Watch Huginn & Muninn carry your prompts through the sovereign AI infrastructure
            </p>
          </div>
          <MiniGlobeTeaser />
          
          {/* How your prompts travel link */}
          <div className="text-center mt-8">
            <a 
              href="/globe" 
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 text-lg font-medium"
            >
              <span>How your prompts travel</span>
              <span className="text-xl">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Agent Fleet Section */}
      <section id="agents" className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                AGENT FLEET
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Sovereign AI agents designed for regulated industries
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-8 bg-gray-900/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl">
              <div className="text-4xl mb-4">🤖</div>
              <div className="text-xl font-semibold text-white mb-2">Document Intelligence</div>
              <div className="text-gray-400">AI-powered document analysis and processing</div>
            </div>
            
            <div className="text-center p-8 bg-gray-900/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl">
              <div className="text-4xl mb-4">🛡️</div>
              <div className="text-xl font-semibold text-white mb-2">Compliance Monitors</div>
              <div className="text-gray-400">Real-time regulatory compliance checking</div>
            </div>
            
            <div className="text-center p-8 bg-gray-900/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl">
              <div className="text-4xl mb-4">🔒</div>
              <div className="text-xl font-semibold text-white mb-2">Secure Communications</div>
              <div className="text-gray-400">Encrypted agent-to-agent orchestration</div>
            </div>
          </div>
        </div>
      </section>

      {/* Energy Impact Section */}
      <section id="energy" className="py-20 bg-gradient-to-br from-green-900/20 to-blue-900/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                ENERGY IMPACT
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Sustainable AI infrastructure with transparent energy consumption
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-8 bg-gray-900/30 backdrop-blur-sm border border-green-500/20 rounded-xl">
              <div className="text-4xl font-bold text-green-400 mb-4">-40%</div>
              <div className="text-lg font-semibold text-white mb-2">Energy Reduction</div>
              <div className="text-sm text-gray-400">Compared to cloud-only solutions</div>
            </div>
            
            <div className="text-center p-8 bg-gray-900/30 backdrop-blur-sm border border-green-500/20 rounded-xl">
              <div className="text-4xl font-bold text-green-400 mb-4">100%</div>
              <div className="text-lg font-semibold text-white mb-2">Renewable Energy</div>
              <div className="text-sm text-gray-400">Carbon-neutral operations</div>
            </div>
            
            <div className="text-center p-8 bg-gray-900/30 backdrop-blur-sm border border-green-500/20 rounded-xl">
              <div className="text-4xl font-bold text-green-400 mb-4">Real-time</div>
              <div className="text-lg font-semibold text-white mb-2">Energy Monitoring</div>
              <div className="text-sm text-gray-400">Full transparency and control</div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">
              Our local-first approach reduces data transfer, minimizes cloud dependencies, 
              and provides complete visibility into energy consumption patterns. 
              Every prompt processed includes energy cost calculations.
            </p>
          </div>
        </div>
      </section>

      <RefinedFooter />
    </div>
  );
}

// Simple placeholder pages
function SimplePage({ title, description }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-gray-300">{description}</p>
        <a href="/" className="inline-block mt-6 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors">
          ← Back to Home
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<SimplePage title="About HISL" description="Learn more about Howard Integritas Solutions Ltd." />} />
          <Route path="/globe" element={<WorkingGlobePage />} />
          <Route path="/deploy" element={<SimplePage title="Agent Deployment" description="Deploy and manage your AI agents." />} />
          <Route path="/projects" element={<SimplePage title="Projects" description="Explore our AI projects and case studies." />} />
          <Route path="/knowledge" element={<SimplePage title="Knowledge Base" description="Access documentation and resources." />} />
          <Route path="/strategy" element={<SimplePage title="Strategy" description="Strategic AI implementation guidance." />} />
          <Route path="/contact" element={<SimplePage title="Contact Us" description="Get in touch with our team." />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

