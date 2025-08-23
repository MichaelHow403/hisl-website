import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BookOpen, Search, Clock } from 'lucide-react'

export default function KnowledgeBase() {
  const articles = [
    {
      id: 1,
      title: "Introduction to Sovereign AI Infrastructure",
      excerpt: "Understanding the principles and architecture of autonomous AI systems",
      category: "Fundamentals",
      readTime: "8 min read",
      date: "2025-01-15"
    },
    {
      id: 2,
      title: "Agent Fleet Management Best Practices",
      excerpt: "Guidelines for deploying and managing multiple AI agents effectively",
      category: "Operations",
      readTime: "12 min read",
      date: "2025-01-10"
    },
    {
      id: 3,
      title: "Security Protocols for AI Infrastructure",
      excerpt: "Implementing robust security measures for autonomous AI systems",
      category: "Security",
      readTime: "15 min read",
      date: "2025-01-05"
    },
    {
      id: 4,
      title: "DeepSeek Integration Guide",
      excerpt: "Step-by-step guide to integrating DeepSeek AI models",
      category: "Integration",
      readTime: "10 min read",
      date: "2024-12-28"
    },
    {
      id: 5,
      title: "Scaling AI Agent Networks",
      excerpt: "Strategies for horizontal and vertical scaling of AI agent deployments",
      category: "Architecture",
      readTime: "14 min read",
      date: "2024-12-20"
    },
    {
      id: 6,
      title: "Monitoring and Observability",
      excerpt: "Tools and techniques for monitoring AI agent performance and health",
      category: "Operations",
      readTime: "11 min read",
      date: "2024-12-15"
    }
  ]
  
  const categories = ["All", "Fundamentals", "Operations", "Security", "Integration", "Architecture"]
  
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
              Knowledge Base
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Comprehensive documentation and guides for sovereign AI infrastructure
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <article 
                key={article.id}
                className="p-6 bg-card rounded-lg hisl-border-glow hover:bg-card/80 transition-all duration-300 group cursor-pointer"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">
                      {article.category}
                    </span>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Clock className="mr-1 h-3 w-3" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="text-sm text-muted-foreground">
                    {new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full border-primary text-primary hover:bg-primary/10 group-hover:bg-primary group-hover:text-hisl-dark transition-all duration-300"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Read Article
                </Button>
              </article>
            ))}
          </div>
          
          {/* Featured Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-primary mb-8 text-center">
              Featured Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-card rounded-lg hisl-border-glow">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  API Documentation
                </h3>
                <p className="text-muted-foreground mb-4">
                  Complete API reference for integrating with HISL infrastructure
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  View Docs
                </Button>
              </div>
              
              <div className="p-6 bg-card rounded-lg hisl-border-glow">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Video Tutorials
                </h3>
                <p className="text-muted-foreground mb-4">
                  Step-by-step video guides for common tasks and configurations
                </p>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Watch Videos
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

