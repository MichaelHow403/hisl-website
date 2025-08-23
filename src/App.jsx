import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components
import Header from './components/Header';
import UpdatedHeroSection from './components/UpdatedHeroSection';
import EnhancedInteractiveGlobe from './components/EnhancedInteractiveGlobe';
import AgentFleet from './components/AgentFleet';
import Footer from './components/Footer';

// Import pages
import AboutPage from './components/AboutPage';
import GlobePage from './components/GlobePage';
import DeployPage from './components/DeployPage';
import ProjectsHub from './components/ProjectsHub';
import KnowledgeBase from './components/KnowledgeBase';
import StrategyLive from './components/StrategyLive';

// Home Page Component
function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <Header logoVariant="HISL" />
      <UpdatedHeroSection />
      
      {/* Globe Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              WHERE YOUR PROMPTS GO
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Watch Huginn & Muninn carry your prompts through the sovereign AI infrastructure
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <EnhancedInteractiveGlobe />
            
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-cyan-400/30 bg-gray-800/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 flex items-center justify-center">
                    🧠
                  </div>
                  <h3 className="text-xl font-semibold text-cyan-400">DeepSeek AI Interface</h3>
                </div>
                
                <textarea
                  placeholder="Enter your prompt for the ravens to carry..."
                  className="w-full h-32 p-4 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none"
                />
                
                <button className="w-full mt-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                  🚀 Send to Ravens
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                  <div className="text-2xl mb-2">🐦</div>
                  <h4 className="font-semibold text-red-400">Huginn</h4>
                  <p className="text-sm text-gray-400">Thought & Memory</p>
                </div>
                <div className="text-center p-4 bg-gray-800/30 rounded-xl">
                  <div className="text-2xl mb-2">🐦</div>
                  <h4 className="font-semibold text-teal-400">Muninn</h4>
                  <p className="text-sm text-gray-400">Mind & Intelligence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Fleet Section */}
      <section className="py-20">
        <AgentFleet />
      </section>

      <Footer logoVariant="HISL" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/globe" element={<GlobePage />} />
        <Route path="/deploy" element={<DeployPage />} />
        <Route path="/projects" element={<ProjectsHub />} />
        <Route path="/knowledge" element={<KnowledgeBase />} />
        <Route path="/strategy" element={<StrategyLive />} />
      </Routes>
    </Router>
  );
}

export default App;

