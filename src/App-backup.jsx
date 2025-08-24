import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import refined components
import RefinedHeader from './components/RefinedHeader';
import RefinedHeroSection from './components/RefinedHeroSection';
import ParallaxHeroSection from './components/ParallaxHeroSection';
import EnhancedInteractiveGlobe from './components/EnhancedInteractiveGlobe';
import AgentFleet from './components/AgentFleet';
import RefinedFooter from './components/RefinedFooter';

// Import pages
import AppleStyleAboutPage from './components/AppleStyleAboutPage';
import ImmersiveGlobePage from './components/ImmersiveGlobePage';
import AgentDeploymentPlatform from './components/AgentDeploymentPlatform';
import GlobePage from './components/GlobePage';
import DeployPage from './components/DeployPage';
import ProjectsHub from './components/ProjectsHub';
import KnowledgeBase from './components/KnowledgeBase';
import StrategyLive from './components/StrategyLive';

// Home Page Component
function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <RefinedHeader logoVariant="HISL" />
      <ParallaxHeroSection />
      
      {/* Globe Section */}
      <section className="py-20 relative">
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
          <EnhancedInteractiveGlobe />
        </div>
      </section>

      {/* Agent Fleet Section */}
      <section id="agents" className="py-20 bg-gray-900/50">
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
          <AgentFleet />
        </div>
      </section>

      <RefinedFooter />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AppleStyleAboutPage />} />
          <Route path="/globe" element={<ImmersiveGlobePage />} />
          <Route path="/deploy" element={<AgentDeploymentPlatform />} />
          <Route path="/projects" element={<ProjectsHub />} />
          <Route path="/knowledge" element={<KnowledgeBase />} />
          <Route path="/strategy" element={<StrategyLive />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

