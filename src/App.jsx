import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import InteractiveGlobe from './components/InteractiveGlobe'
import AgentFleet from './components/AgentFleet'
import Footer from './components/Footer'
import ProjectsHub from './components/ProjectsHub'
import KnowledgeBase from './components/KnowledgeBase'
import StrategyLive from './components/StrategyLive'
import './App.css'

function HomePage() {
  return (
    <div className="min-h-screen bg-hisl-dark text-foreground">
      <Header />
      <HeroSection />
      <InteractiveGlobe />
      <AgentFleet />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsHub />} />
        <Route path="/knowledge" element={<KnowledgeBase />} />
        <Route path="/strategy" element={<StrategyLive />} />
      </Routes>
    </Router>
  )
}

export default App

