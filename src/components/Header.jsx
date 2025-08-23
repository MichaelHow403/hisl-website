import { Link } from 'react-router-dom'
import hislLogo from '../assets/HISL_LOGO.PNG'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-hisl-dark/90 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img 
            src={hislLogo} 
            alt="HISL Logo" 
            className="h-12 w-auto"
          />
          <div className="text-xl font-bold text-primary hisl-text-glow">
            HISL CONTROL
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/projects" 
            className="text-foreground hover:text-primary transition-colors duration-300"
          >
            Projects Hub
          </Link>
          <Link 
            to="/knowledge" 
            className="text-foreground hover:text-primary transition-colors duration-300"
          >
            Knowledge Base
          </Link>
          <Link 
            to="/strategy" 
            className="text-foreground hover:text-primary transition-colors duration-300"
          >
            Strategy LIVE
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-primary text-hisl-dark font-semibold rounded-lg hover:bg-primary/80 transition-colors duration-300">
            Connect
          </button>
        </div>
      </div>
    </header>
  )
}

