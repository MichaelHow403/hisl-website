import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RefinedHeader from './RefinedHeader';
import RefinedFooter from './RefinedFooter';

export default function KnowledgePage() {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: '🚀' },
    { id: 'architecture', name: 'Architecture', icon: '🏗️' },
    { id: 'security', name: 'Security & Compliance', icon: '🔒' },
    { id: 'deployment', name: 'Deployment Guides', icon: '⚙️' },
    { id: 'api', name: 'API Reference', icon: '📡' },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: '🔧' },
    { id: 'best-practices', name: 'Best Practices', icon: '⭐' },
    { id: 'case-studies', name: 'Case Studies', icon: '📊' }
  ];

  const knowledgeBase = {
    'getting-started': [
      {
        title: 'Introduction to HISL IntegAI',
        content: 'IntegAI is a sovereign AI infrastructure platform designed for regulated industries. This guide covers the fundamental concepts, architecture principles, and getting started with your first deployment.',
        tags: ['basics', 'overview', 'introduction']
      },
      {
        title: 'System Requirements',
        content: 'Hardware and software requirements for deploying IntegAI in your environment. Includes minimum specifications, recommended configurations, and network requirements.',
        tags: ['requirements', 'hardware', 'setup']
      },
      {
        title: 'Quick Start Guide',
        content: 'Get your first IntegAI agent deployed in under 30 minutes. Step-by-step instructions for initial setup, configuration, and testing.',
        tags: ['quickstart', 'setup', 'tutorial']
      },
      {
        title: 'Understanding Sovereign AI',
        content: 'Core principles of data sovereignty, local-first processing, and regulatory compliance in AI systems. Learn why sovereignty matters for your organization.',
        tags: ['sovereignty', 'compliance', 'principles']
      }
    ],
    'architecture': [
      {
        title: 'IntegAI Platform Architecture',
        content: 'Comprehensive overview of the IntegAI platform architecture, including the Compliance Engine, Security Layer, Analytics Core, Integration Hub, Monitoring Suite, and Automation Engine.',
        tags: ['architecture', 'platform', 'components']
      },
      {
        title: 'Data Flow and Processing',
        content: 'How data flows through the IntegAI system, from prompt ingestion through Huginn and Muninn processing to final response delivery. Includes latency optimization and energy efficiency.',
        tags: ['dataflow', 'processing', 'huginn', 'muninn']
      },
      {
        title: 'Microservices Design',
        content: 'IntegAI\'s microservices architecture enables scalable, maintainable, and sovereign AI deployments. Learn about service boundaries, communication patterns, and deployment strategies.',
        tags: ['microservices', 'scalability', 'design']
      },
      {
        title: 'Network Topology',
        content: 'Understanding the global network of sovereign data centers, regional processing nodes, and edge computing capabilities that power IntegAI\'s distributed architecture.',
        tags: ['network', 'topology', 'distributed']
      }
    ],
    'security': [
      {
        title: 'Zero Trust Security Model',
        content: 'IntegAI implements a zero trust security model with end-to-end encryption, continuous authentication, and comprehensive audit logging for all AI operations.',
        tags: ['security', 'zero-trust', 'encryption']
      },
      {
        title: 'Compliance Frameworks',
        content: 'Built-in support for GDPR, HIPAA, SOX, NIS2, and other regulatory frameworks. Automated compliance checking and reporting capabilities.',
        tags: ['compliance', 'gdpr', 'hipaa', 'regulations']
      },
      {
        title: 'Data Sovereignty Controls',
        content: 'Granular controls for data residency, processing location, and cross-border data transfer restrictions. Ensure your data never leaves your jurisdiction.',
        tags: ['sovereignty', 'data-residency', 'controls']
      },
      {
        title: 'Audit and Monitoring',
        content: 'Comprehensive audit trails for all AI decisions, data access, and system operations. Real-time monitoring and alerting for security events.',
        tags: ['audit', 'monitoring', 'logging']
      }
    ],
    'deployment': [
      {
        title: 'On-Premises Deployment',
        content: 'Deploy IntegAI in your own data center with full air-gap capabilities. Includes hardware specifications, installation procedures, and configuration management.',
        tags: ['on-premises', 'air-gap', 'installation']
      },
      {
        title: 'Hybrid Cloud Setup',
        content: 'Combine on-premises processing with sovereign cloud capabilities. Configure hybrid deployments for optimal performance and compliance.',
        tags: ['hybrid', 'cloud', 'configuration']
      },
      {
        title: 'Container Orchestration',
        content: 'Deploy IntegAI using Kubernetes, Docker Swarm, or other container orchestration platforms. Includes Helm charts and deployment manifests.',
        tags: ['containers', 'kubernetes', 'orchestration']
      },
      {
        title: 'High Availability Setup',
        content: 'Configure IntegAI for high availability with automatic failover, load balancing, and disaster recovery capabilities.',
        tags: ['high-availability', 'failover', 'disaster-recovery']
      }
    ],
    'api': [
      {
        title: 'REST API Reference',
        content: 'Complete REST API documentation for IntegAI platform integration. Includes authentication, endpoints, request/response formats, and code examples.',
        tags: ['api', 'rest', 'integration']
      },
      {
        title: 'GraphQL Interface',
        content: 'GraphQL API for complex queries and real-time subscriptions. Schema documentation and query examples for advanced integrations.',
        tags: ['graphql', 'queries', 'subscriptions']
      },
      {
        title: 'SDK Documentation',
        content: 'Official SDKs for Python, JavaScript, Java, and .NET. Installation guides, code examples, and best practices for each language.',
        tags: ['sdk', 'python', 'javascript', 'integration']
      },
      {
        title: 'Webhook Configuration',
        content: 'Configure webhooks for real-time notifications of AI processing events, compliance alerts, and system status updates.',
        tags: ['webhooks', 'notifications', 'events']
      }
    ],
    'troubleshooting': [
      {
        title: 'Common Issues and Solutions',
        content: 'Frequently encountered issues and their solutions. Includes performance problems, configuration errors, and integration challenges.',
        tags: ['troubleshooting', 'issues', 'solutions']
      },
      {
        title: 'Performance Optimization',
        content: 'Optimize IntegAI performance for your specific use case. Covers prompt optimization, resource allocation, and system tuning.',
        tags: ['performance', 'optimization', 'tuning']
      },
      {
        title: 'Log Analysis',
        content: 'Understanding IntegAI logs, error codes, and diagnostic information. Tools and techniques for effective troubleshooting.',
        tags: ['logs', 'analysis', 'diagnostics']
      },
      {
        title: 'Support Escalation',
        content: 'When and how to escalate issues to HISL support. Information gathering, ticket creation, and emergency contact procedures.',
        tags: ['support', 'escalation', 'emergency']
      }
    ],
    'best-practices': [
      {
        title: 'Prompt Engineering',
        content: 'Best practices for crafting effective prompts that maximize AI performance while maintaining compliance and security standards.',
        tags: ['prompts', 'engineering', 'optimization']
      },
      {
        title: 'Data Governance',
        content: 'Establish robust data governance practices for AI operations. Includes data classification, access controls, and retention policies.',
        tags: ['governance', 'data-management', 'policies']
      },
      {
        title: 'Model Management',
        content: 'Lifecycle management for AI models including versioning, testing, deployment, and retirement strategies.',
        tags: ['models', 'lifecycle', 'versioning']
      },
      {
        title: 'Operational Excellence',
        content: 'Operational best practices for running IntegAI in production. Monitoring, maintenance, and continuous improvement strategies.',
        tags: ['operations', 'production', 'maintenance']
      }
    ],
    'case-studies': [
      {
        title: 'Healthcare: Patient Data Analysis',
        content: 'How a major healthcare provider deployed IntegAI for HIPAA-compliant patient data analysis, reducing processing time by 60% while maintaining full audit trails.',
        tags: ['healthcare', 'hipaa', 'case-study']
      },
      {
        title: 'Finance: Regulatory Compliance',
        content: 'Financial services firm uses IntegAI for automated compliance monitoring, achieving 99.9% accuracy in regulatory reporting while reducing manual effort by 80%.',
        tags: ['finance', 'compliance', 'automation']
      },
      {
        title: 'Manufacturing: Quality Control',
        content: 'Manufacturing company implements IntegAI for real-time quality control, improving defect detection by 45% while maintaining complete data sovereignty.',
        tags: ['manufacturing', 'quality', 'real-time']
      },
      {
        title: 'Defense: Secure Communications',
        content: 'Defense contractor deploys air-gapped IntegAI for secure document analysis, meeting the highest security clearance requirements.',
        tags: ['defense', 'security', 'air-gap']
      }
    ]
  };

  const filteredContent = knowledgeBase[activeCategory]?.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <RefinedHeader logoVariant="HISL" />
      
      <div className="container mx-auto px-6 py-20">
        {/* Page Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Knowledge Base
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive documentation, guides, and resources for IntegAI platform
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 bg-gray-800/50 border border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-gray-800/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                      activeCategory === category.id
                        ? 'bg-cyan-600/20 border border-cyan-400/30 text-cyan-300'
                        : 'text-gray-300 hover:bg-gray-700/30 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {filteredContent.length > 0 ? (
                  filteredContent.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="bg-gray-800/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-400/40 transition-all duration-300"
                    >
                      <h3 className="text-2xl font-semibold text-white mb-4">{item.title}</h3>
                      <p className="text-gray-300 leading-relaxed mb-6">{item.content}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 bg-cyan-600/20 text-cyan-300 rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📚</div>
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">No results found</h3>
                    <p className="text-gray-400">Try adjusting your search terms or browse different categories</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Quick Links */}
        <motion.div 
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-white mb-3">Quick Start</h3>
            <p className="text-gray-300 mb-4">Get up and running with IntegAI in minutes</p>
            <button className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors">
              Start Tutorial
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">📡</div>
            <h3 className="text-xl font-semibold text-white mb-3">API Reference</h3>
            <p className="text-gray-300 mb-4">Complete API documentation and examples</p>
            <button className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors">
              View APIs
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-white mb-3">Get Support</h3>
            <p className="text-gray-300 mb-4">Need help? Our team is here to assist</p>
            <button className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors">
              Contact Support
            </button>
          </div>
        </motion.div>
      </div>

      <RefinedFooter />
    </div>
  );
}

