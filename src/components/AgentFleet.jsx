import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  FlaskConical, 
  Shield, 
  Scale, 
  Leaf, 
  Stethoscope, 
  CreditCard, 
  Target, 
  Factory, 
  BookOpen, 
  Building,
  Filter
} from 'lucide-react'

const agents = [
  {
    id: 1,
    name: "PharmaAI",
    category: "Healthcare",
    status: "Active",
    icon: FlaskConical,
    functions: "Drug discovery, clinical trial optimization, regulatory compliance",
    differentiator: "FDA-compliant AI with 99.7% accuracy in compound analysis"
  },
  {
    id: 2,
    name: "ConservAI",
    category: "Environmental",
    status: "Active", 
    icon: Leaf,
    functions: "Environmental monitoring, conservation planning, ecosystem analysis",
    differentiator: "Real-time biodiversity tracking with satellite integration"
  },
  {
    id: 3,
    name: "RAMS Guard",
    category: "Defense",
    status: "Classified",
    icon: Shield,
    functions: "Threat assessment, strategic defense, intelligence analysis",
    differentiator: "Quantum-encrypted decision making with predictive modeling"
  },
  {
    id: 4,
    name: "LegalMind",
    category: "Legal",
    status: "Active",
    icon: Scale,
    functions: "Contract analysis, legal research, compliance monitoring",
    differentiator: "Multi-jurisdiction legal framework with 95% case prediction accuracy"
  },
  {
    id: 5,
    name: "MedCore",
    category: "Healthcare",
    status: "Active",
    icon: Stethoscope,
    functions: "Diagnostic assistance, treatment planning, patient monitoring",
    differentiator: "HIPAA-compliant with real-time vital sign analysis"
  },
  {
    id: 6,
    name: "FinanceAI",
    category: "Finance",
    status: "Active",
    icon: CreditCard,
    functions: "Risk assessment, algorithmic trading, fraud detection",
    differentiator: "Microsecond trading decisions with 99.9% fraud detection rate"
  },
  {
    id: 7,
    name: "TargetOps",
    category: "Military",
    status: "Classified",
    icon: Target,
    functions: "Mission planning, tactical analysis, resource optimization",
    differentiator: "Autonomous mission execution with zero-failure protocols"
  },
  {
    id: 8,
    name: "IndustrialAI",
    category: "Manufacturing",
    status: "Active",
    icon: Factory,
    functions: "Production optimization, quality control, predictive maintenance",
    differentiator: "99.5% uptime guarantee with autonomous repair protocols"
  },
  {
    id: 9,
    name: "EduCore",
    category: "Education",
    status: "Active",
    icon: BookOpen,
    functions: "Personalized learning, curriculum development, assessment",
    differentiator: "Adaptive learning paths with 40% faster skill acquisition"
  },
  {
    id: 10,
    name: "UrbanAI",
    category: "Infrastructure",
    status: "Active",
    icon: Building,
    functions: "Smart city management, traffic optimization, resource allocation",
    differentiator: "Real-time city optimization reducing energy consumption by 30%"
  }
]

const categories = ["All", "Healthcare", "Environmental", "Defense", "Legal", "Finance", "Military", "Manufacturing", "Education", "Infrastructure"]

export default function AgentFleet() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  
  const filteredAgents = selectedCategory === "All" 
    ? agents 
    : agents.filter(agent => agent.category === selectedCategory)
  
  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "text-green-400"
      case "Classified": return "text-red-400"
      default: return "text-yellow-400"
    }
  }
  
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-hisl-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 hisl-text-glow">
            AGENT FLEET
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sovereign AI agents operating across critical infrastructure domains
          </p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category 
                  ? "bg-primary text-hisl-dark" 
                  : "border-primary text-primary hover:bg-primary/10"
              }`}
            >
              <Filter className="mr-2 h-4 w-4" />
              {category}
            </Button>
          ))}
        </div>
        
        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => {
            const IconComponent = agent.icon
            return (
              <div 
                key={agent.id}
                className="p-6 bg-card rounded-lg hisl-border-glow hover:bg-card/80 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{agent.name}</h3>
                      <p className="text-sm text-muted-foreground">{agent.category}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-semibold ${getStatusColor(agent.status)}`}>
                    {agent.status}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-1">Functions:</h4>
                    <p className="text-sm text-muted-foreground">{agent.functions}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-1">Differentiator:</h4>
                    <p className="text-sm text-foreground">{agent.differentiator}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full border-primary text-primary hover:bg-primary/10 group-hover:bg-primary group-hover:text-hisl-dark transition-all duration-300"
                  >
                    Deploy Agent
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
        
        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No agents found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}

