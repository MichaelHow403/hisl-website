import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'

export default function ProjectsHub() {
  const projects = [
    {
      id: 1,
      title: "Sovereign AI Infrastructure",
      description: "Core infrastructure for autonomous AI agent deployment and management",
      status: "Active Development",
      technologies: ["React", "Node.js", "Docker", "Kubernetes"],
      link: "#"
    },
    {
      id: 2,
      title: "Agent Fleet Management",
      description: "Centralized control system for managing multiple AI agents across domains",
      status: "Beta Testing",
      technologies: ["Python", "FastAPI", "PostgreSQL", "Redis"],
      link: "#"
    },
    {
      id: 3,
      title: "DeepSeek Integration",
      description: "Advanced AI model integration for enhanced reasoning capabilities",
      status: "Production",
      technologies: ["Python", "TensorFlow", "CUDA", "REST API"],
      link: "#"
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
              Projects Hub
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Explore our active projects and contributions to sovereign AI infrastructure
            </p>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="p-6 bg-card rounded-lg hisl-border-glow hover:bg-card/80 transition-all duration-300"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-3">{project.description}</p>
                  <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
                    {project.status}
                  </span>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-primary mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 border-primary text-primary hover:bg-primary/10"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Project
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="p-8 bg-card rounded-lg hisl-border-glow max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Contribute to Sovereign AI
              </h2>
              <p className="text-muted-foreground mb-6">
                Join our mission to build autonomous AI infrastructure. Contribute code, ideas, or resources.
              </p>
              <Button className="bg-primary text-hisl-dark hover:bg-primary/80">
                Get Involved
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

