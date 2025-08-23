import { Button } from '@/components/ui/button'
import { ArrowRight, Zap } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Bridge Banner Background */}
      <div className="absolute inset-0 bridge-overlay scrolling-bg"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 hisl-text-glow">
          HISL CONTROL
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Sovereign AI Infrastructure for the Future of Autonomous Intelligence
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="bg-primary text-hisl-dark hover:bg-primary/80 px-8 py-4 text-lg font-semibold hisl-border-glow"
          >
            <Zap className="mr-2 h-5 w-5" />
            Deploy Agents
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary/10 px-8 py-4 text-lg"
          >
            Explore Infrastructure
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-card/50 rounded-lg hisl-border-glow">
            <h3 className="text-2xl font-bold text-primary mb-2">100%</h3>
            <p className="text-muted-foreground">Sovereign Control</p>
          </div>
          
          <div className="p-6 bg-card/50 rounded-lg hisl-border-glow">
            <h3 className="text-2xl font-bold text-primary mb-2">24/7</h3>
            <p className="text-muted-foreground">Autonomous Operation</p>
          </div>
          
          <div className="p-6 bg-card/50 rounded-lg hisl-border-glow">
            <h3 className="text-2xl font-bold text-primary mb-2">∞</h3>
            <p className="text-muted-foreground">Scalable Intelligence</p>
          </div>
        </div>
      </div>
    </section>
  )
}

