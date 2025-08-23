import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import SimpleGlobe from './components/SimpleGlobe';
import Footer from './components/Footer';
import './App.css';

// Placeholder pages
const ProjectsHub = () => (
  <div className="min-h-screen pt-24 pb-12 bg-hisl-dark">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-gradient mb-8">Projects Hub</h1>
      <p className="text-muted-foreground">Coming soon - Projects Hub will display all active and completed HISL projects.</p>
    </div>
  </div>
);

const KnowledgeBase = () => (
  <div className="min-h-screen pt-24 pb-12 bg-hisl-dark">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-gradient mb-8">Knowledge Base</h1>
      <p className="text-muted-foreground">Coming soon - Knowledge Base will provide resources and documentation.</p>
    </div>
  </div>
);

const StrategyLive = () => (
  <div className="min-h-screen pt-24 pb-12 bg-hisl-dark">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-gradient mb-8">Strategy LIVE</h1>
      <p className="text-muted-foreground">Coming soon - Strategy LIVE will feature the latest updates and insights.</p>
    </div>
  </div>
);

// Globe Section Component
const GlobeSection = () => (
  <section id="globe-section" className="py-16 bg-hisl-dark">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gradient">WHERE YOUR PROMPTS GO</h2>
      <div className="flex flex-col items-center justify-center">
        <SimpleGlobe />
        <div className="mt-8 max-w-2xl text-center">
          <p className="text-muted-foreground mb-4">
            Your prompts are processed through our sovereign AI infrastructure, ensuring data privacy and security.
          </p>
          <p className="text-muted-foreground">
            Powered by DeepSeek AI, our system provides reliable, offline-first intelligence for your organization.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// Home page component
const Home = () => (
  <>
    <HeroSection />
    <GlobeSection />
  </>
);

function App() {
  return (
    <Router>
      <div className="app bg-hisl-dark text-foreground min-h-screen">
        <Header />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsHub />} />
            <Route path="/knowledge" element={<KnowledgeBase />} />
            <Route path="/strategy-live" element={<StrategyLive />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
