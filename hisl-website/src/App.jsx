import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProjectsHub from './pages/ProjectsHub';
import KnowledgeBase from './pages/KnowledgeBase';
import StrategyLive from './pages/StrategyLive';
import QuickAccessMenu from './components/Navigation/QuickAccessMenu';
import ContactModal from './components/shared/ContactModal';
import { useState } from 'react';

function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [quickAccessOpen, setQuickAccessOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-hisl-dark to-black">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/projects" element={<ProjectsHub />} />
          <Route path="/knowledge" element={<KnowledgeBase />} />
          <Route path="/strategy-live" element={<StrategyLive />} />
        </Routes>
        
        <QuickAccessMenu 
          isOpen={quickAccessOpen} 
          setIsOpen={setQuickAccessOpen}
        />
        
        <ContactModal 
          isOpen={contactOpen} 
          setIsOpen={setContactOpen}
        />
        
        {/* Floating Menu Toggle */}
        <button
          onClick={() => setQuickAccessOpen(!quickAccessOpen)}
          className="fixed bottom-8 right-8 z-50 bg-hisl-cyan/20 backdrop-blur-md p-4 rounded-full hover:bg-hisl-cyan/30 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </Router>
  );
}

export default App;
