import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Activity, TrendingUp, Users, Zap } from 'lucide-react'

export default function StrategyLive() {
  const metrics = [
    {
      label: "Active Agents",
      value: "247",
      change: "+12%",
      trend: "up"
    },
    {
      label: "Processing Power",
      value: "1.2 PH/s",
      change: "+8%",
      trend: "up"
    },
    {
      label: "Network Nodes",
      value: "156",
      change: "+3%",
      trend: "up"
    },
    {
      label: "Uptime",
      value: "99.97%",
      change: "0%",
      trend: "stable"
    }
  ]
  
  const strategies = [
    {
      id: 1,
      title: "Global Infrastructure Expansion",
      status: "Active",
      progress: 75,
      description: "Expanding sovereign AI infrastructure across 5 new regions"
    },
    {
      id: 2,
      title: "Agent Capability Enhancement",
      status: "Planning",
      progress: 25,
      description: "Developing next-generation AI agent capabilities"
    },
    {
      id: 3,
      title: "Security Protocol Upgrade",
      status: "Active",
      progress: 60,
      description: "Implementing quantum-resistant security measures"
    }
  ]
  
  return (
    <div className="min-h-screen bg-hisl-dark text-foreground">
      <Header />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 hisl-text-glow">
              Strategy LIVE
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Real-time strategic operations and infrastructure monitoring
            </p>
          </div>
          
          {/* Live Metrics */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
              <Activity className="mr-3 h-6 w-6" />
              Live Infrastructure Metrics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <div 
                  key={index}
                  className="p-6 bg-card rounded-lg hisl-border-glow pulse-animation"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-muted-foreground">
                      {metric.label}
                    </h3>
                    <div className={`flex items-center text-sm ${
                      metric.trend === 'up' ? 'text-green-400' : 
                      metric.trend === 'down' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      <TrendingUp className="mr-1 h-3 w-3" />
                      {metric.change}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Active Strategies */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
              <Zap className="mr-3 h-6 w-6" />
              Active Strategic Initiatives
            </h2>
            
            <div className="space-y-6">
              {strategies.map((strategy) => (
                <div 
                  key={strategy.id}
                  className="p-6 bg-card rounded-lg hisl-border-glow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {strategy.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {strategy.description}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      strategy.status === 'Active' 
                        ? 'bg-green-400/20 text-green-400' 
                        : 'bg-yellow-400/20 text-yellow-400'
                    }`}>
                      {strategy.status}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm text-primary font-semibold">
                        {strategy.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${strategy.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Command Center */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 bg-card rounded-lg hisl-border-glow">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                <Users className="mr-3 h-5 w-5" />
                Operations Team
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Strategic Command</span>
                  <span className="text-green-400 text-sm">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Infrastructure Team</span>
                  <span className="text-green-400 text-sm">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Security Operations</span>
                  <span className="text-green-400 text-sm">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Agent Coordination</span>
                  <span className="text-green-400 text-sm">Online</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-card rounded-lg hisl-border-glow">
              <h3 className="text-xl font-bold text-primary mb-4">
                Emergency Protocols
              </h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full border-red-400 text-red-400 hover:bg-red-400/10"
                >
                  Emergency Shutdown
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400/10"
                >
                  Failsafe Mode
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary/10"
                >
                  System Diagnostics
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

