import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RefinedHeader from './RefinedHeader';
import RefinedFooter from './RefinedFooter';

export default function StrategyPage() {
  const [activeStrategy, setActiveStrategy] = useState('digital-transformation');

  const strategies = [
    { id: 'digital-transformation', name: 'Digital Transformation', icon: '🚀', color: 'cyan' },
    { id: 'ai-governance', name: 'AI Governance', icon: '⚖️', color: 'blue' },
    { id: 'data-sovereignty', name: 'Data Sovereignty', icon: '🛡️', color: 'green' },
    { id: 'compliance-strategy', name: 'Compliance Strategy', icon: '📋', color: 'purple' },
    { id: 'risk-management', name: 'Risk Management', icon: '🎯', color: 'red' },
    { id: 'innovation-roadmap', name: 'Innovation Roadmap', icon: '🗺️', color: 'yellow' }
  ];

  const strategyContent = {
    'digital-transformation': {
      title: 'Digital Transformation Strategy',
      subtitle: 'Accelerate your organization\'s AI-driven transformation',
      overview: 'Transform your organization with sovereign AI infrastructure that maintains complete control over your data and processes while delivering enterprise-grade performance and compliance.',
      keyPoints: [
        {
          title: 'Assessment & Planning',
          description: 'Comprehensive evaluation of current systems, identification of AI opportunities, and development of a phased transformation roadmap.',
          benefits: ['Current state analysis', 'Gap identification', 'ROI projections', 'Risk assessment']
        },
        {
          title: 'Pilot Implementation',
          description: 'Start with high-impact, low-risk use cases to demonstrate value and build organizational confidence in AI capabilities.',
          benefits: ['Proof of concept', 'Quick wins', 'Learning opportunities', 'Stakeholder buy-in']
        },
        {
          title: 'Scaled Deployment',
          description: 'Expand successful pilots across the organization with robust governance, monitoring, and continuous improvement processes.',
          benefits: ['Enterprise-wide adoption', 'Standardized processes', 'Governance frameworks', 'Performance optimization']
        },
        {
          title: 'Continuous Evolution',
          description: 'Establish processes for ongoing innovation, model updates, and adaptation to changing business requirements.',
          benefits: ['Adaptive capabilities', 'Innovation culture', 'Competitive advantage', 'Future readiness']
        }
      ],
      caseStudy: {
        title: 'Healthcare System Transformation',
        description: 'A major healthcare network transformed their patient care delivery using IntegAI, achieving 40% reduction in diagnostic time while maintaining HIPAA compliance.',
        results: ['40% faster diagnostics', '99.9% compliance rate', '60% cost reduction', '95% staff satisfaction']
      }
    },
    'ai-governance': {
      title: 'AI Governance Framework',
      subtitle: 'Establish robust governance for responsible AI deployment',
      overview: 'Implement comprehensive AI governance that ensures ethical, compliant, and effective use of artificial intelligence across your organization.',
      keyPoints: [
        {
          title: 'Governance Structure',
          description: 'Establish clear roles, responsibilities, and decision-making processes for AI initiatives across the organization.',
          benefits: ['Clear accountability', 'Defined processes', 'Risk oversight', 'Strategic alignment']
        },
        {
          title: 'Ethical AI Principles',
          description: 'Develop and implement ethical guidelines that ensure AI systems are fair, transparent, and aligned with organizational values.',
          benefits: ['Ethical compliance', 'Bias mitigation', 'Transparency', 'Trust building']
        },
        {
          title: 'Risk Management',
          description: 'Comprehensive risk assessment and mitigation strategies for AI deployment, including technical, operational, and reputational risks.',
          benefits: ['Risk identification', 'Mitigation strategies', 'Monitoring systems', 'Incident response']
        },
        {
          title: 'Performance Monitoring',
          description: 'Continuous monitoring of AI system performance, accuracy, and impact with regular reviews and adjustments.',
          benefits: ['Performance tracking', 'Quality assurance', 'Continuous improvement', 'Outcome measurement']
        }
      ],
      caseStudy: {
        title: 'Financial Services Governance',
        description: 'Global bank implemented comprehensive AI governance framework, reducing regulatory risk by 70% while accelerating AI adoption.',
        results: ['70% risk reduction', '3x faster approvals', '100% audit compliance', '50% governance efficiency']
      }
    },
    'data-sovereignty': {
      title: 'Data Sovereignty Strategy',
      subtitle: 'Maintain complete control over your data and AI processes',
      overview: 'Ensure your organization maintains full sovereignty over data processing, storage, and AI operations while meeting regulatory requirements.',
      keyPoints: [
        {
          title: 'Jurisdictional Control',
          description: 'Implement controls to ensure data processing occurs only within specified jurisdictions and complies with local regulations.',
          benefits: ['Regulatory compliance', 'Legal certainty', 'Risk mitigation', 'Operational control']
        },
        {
          title: 'Local-First Architecture',
          description: 'Design AI systems that prioritize local processing and minimize external dependencies while maintaining performance.',
          benefits: ['Reduced latency', 'Enhanced security', 'Compliance assurance', 'Operational independence']
        },
        {
          title: 'Audit and Transparency',
          description: 'Comprehensive audit trails and transparency mechanisms that provide complete visibility into data usage and AI decisions.',
          benefits: ['Full auditability', 'Regulatory reporting', 'Trust building', 'Compliance verification']
        },
        {
          title: 'Cross-Border Protocols',
          description: 'Establish protocols for any necessary cross-border data transfers that maintain sovereignty while enabling business operations.',
          benefits: ['Controlled transfers', 'Compliance maintenance', 'Business continuity', 'Risk management']
        }
      ],
      caseStudy: {
        title: 'Government Agency Implementation',
        description: 'National agency deployed sovereign AI infrastructure, achieving 100% data residency compliance while improving service delivery.',
        results: ['100% data residency', '50% faster processing', '99.99% uptime', '0 compliance violations']
      }
    },
    'compliance-strategy': {
      title: 'Regulatory Compliance Strategy',
      subtitle: 'Navigate complex regulatory landscapes with confidence',
      overview: 'Develop comprehensive compliance strategies that address current and emerging regulations while enabling AI innovation.',
      keyPoints: [
        {
          title: 'Regulatory Mapping',
          description: 'Comprehensive analysis of applicable regulations including GDPR, HIPAA, SOX, NIS2, and industry-specific requirements.',
          benefits: ['Regulatory clarity', 'Compliance roadmap', 'Risk assessment', 'Gap analysis']
        },
        {
          title: 'Automated Compliance',
          description: 'Implement automated compliance monitoring and reporting systems that ensure continuous adherence to regulatory requirements.',
          benefits: ['Real-time monitoring', 'Automated reporting', 'Reduced manual effort', 'Compliance assurance']
        },
        {
          title: 'Documentation Framework',
          description: 'Establish comprehensive documentation practices that support regulatory audits and demonstrate compliance.',
          benefits: ['Audit readiness', 'Evidence collection', 'Process documentation', 'Regulatory reporting']
        },
        {
          title: 'Change Management',
          description: 'Processes for adapting to regulatory changes and ensuring ongoing compliance as requirements evolve.',
          benefits: ['Regulatory agility', 'Proactive adaptation', 'Continuous compliance', 'Risk mitigation']
        }
      ],
      caseStudy: {
        title: 'Pharmaceutical Compliance',
        description: 'Pharmaceutical company achieved 100% FDA compliance for AI-driven drug discovery while reducing approval time by 30%.',
        results: ['100% FDA compliance', '30% faster approvals', '50% cost reduction', '0 regulatory issues']
      }
    },
    'risk-management': {
      title: 'AI Risk Management',
      subtitle: 'Identify, assess, and mitigate AI-related risks',
      overview: 'Comprehensive risk management framework that addresses technical, operational, ethical, and business risks associated with AI deployment.',
      keyPoints: [
        {
          title: 'Risk Assessment',
          description: 'Systematic identification and evaluation of AI-related risks including bias, security, performance, and operational risks.',
          benefits: ['Risk identification', 'Impact assessment', 'Probability analysis', 'Risk prioritization']
        },
        {
          title: 'Mitigation Strategies',
          description: 'Develop and implement specific mitigation strategies for identified risks with clear ownership and timelines.',
          benefits: ['Risk reduction', 'Clear accountability', 'Measurable outcomes', 'Proactive management']
        },
        {
          title: 'Monitoring Systems',
          description: 'Continuous monitoring of risk indicators with automated alerts and escalation procedures for emerging risks.',
          benefits: ['Early detection', 'Rapid response', 'Trend analysis', 'Preventive action']
        },
        {
          title: 'Incident Response',
          description: 'Comprehensive incident response procedures for AI-related issues including containment, investigation, and remediation.',
          benefits: ['Rapid containment', 'Root cause analysis', 'Effective remediation', 'Learning integration']
        }
      ],
      caseStudy: {
        title: 'Manufacturing Risk Management',
        description: 'Manufacturing company reduced AI-related incidents by 85% through comprehensive risk management framework.',
        results: ['85% incident reduction', '90% faster response', '60% cost savings', '99% uptime achievement']
      }
    },
    'innovation-roadmap': {
      title: 'AI Innovation Roadmap',
      subtitle: 'Chart your path to AI-driven competitive advantage',
      overview: 'Strategic roadmap for AI innovation that balances ambitious goals with practical implementation while maintaining sovereignty and compliance.',
      keyPoints: [
        {
          title: 'Innovation Assessment',
          description: 'Evaluate current innovation capabilities and identify opportunities for AI-driven competitive advantage.',
          benefits: ['Capability mapping', 'Opportunity identification', 'Competitive analysis', 'Innovation gaps']
        },
        {
          title: 'Technology Roadmap',
          description: 'Develop phased technology adoption plan that aligns with business objectives and resource constraints.',
          benefits: ['Strategic alignment', 'Resource optimization', 'Timeline clarity', 'Milestone tracking']
        },
        {
          title: 'Capability Building',
          description: 'Systematic development of internal capabilities including skills, processes, and infrastructure for sustained innovation.',
          benefits: ['Skill development', 'Process improvement', 'Infrastructure growth', 'Innovation culture']
        },
        {
          title: 'Partnership Strategy',
          description: 'Strategic partnerships and ecosystem development to accelerate innovation while maintaining sovereignty.',
          benefits: ['Accelerated innovation', 'Risk sharing', 'Capability access', 'Market expansion']
        }
      ],
      caseStudy: {
        title: 'Technology Company Innovation',
        description: 'Tech company accelerated product development by 50% through strategic AI innovation roadmap while maintaining data sovereignty.',
        results: ['50% faster development', '3x innovation rate', '40% cost reduction', '100% sovereignty maintained']
      }
    }
  };

  const currentStrategy = strategyContent[activeStrategy];

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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Strategic AI Implementation
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive strategies for successful AI adoption with sovereignty, compliance, and innovation at the core
          </p>
        </motion.div>

        {/* Strategy Navigation */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {strategies.map((strategy) => (
            <button
              key={strategy.id}
              onClick={() => setActiveStrategy(strategy.id)}
              className={`p-4 rounded-xl transition-all duration-300 text-center ${
                activeStrategy === strategy.id
                  ? `bg-${strategy.color}-600/30 border-2 border-${strategy.color}-400 text-${strategy.color}-300`
                  : 'bg-gray-800/30 border border-gray-600/30 text-gray-300 hover:bg-gray-700/40'
              }`}
            >
              <div className="text-2xl mb-2">{strategy.icon}</div>
              <div className="text-sm font-medium">{strategy.name}</div>
            </button>
          ))}
        </motion.div>

        {/* Strategy Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStrategy}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            {/* Strategy Header */}
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">{currentStrategy.title}</h2>
              <p className="text-xl text-gray-300 mb-6">{currentStrategy.subtitle}</p>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-gray-400 leading-relaxed">{currentStrategy.overview}</p>
              </div>
            </div>

            {/* Key Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentStrategy.keyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-gray-800/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">{point.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{point.description}</p>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-cyan-400 uppercase tracking-wide">Key Benefits</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {point.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                          <span className="text-sm text-gray-300">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Case Study */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-8"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Success Story</h3>
                <h4 className="text-xl font-semibold text-purple-300 mb-4">{currentStrategy.caseStudy.title}</h4>
                <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto">{currentStrategy.caseStudy.description}</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {currentStrategy.caseStudy.results.map((result, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-purple-300 mb-2">{result.split(' ')[0]}</div>
                    <div className="text-sm text-gray-300">{result.split(' ').slice(1).join(' ')}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="text-center bg-gray-800/30 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-12"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Implement This Strategy?</h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Our team of experts can help you develop and implement a customized strategy that aligns with your organization's goals and requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors font-medium">
                  Schedule Consultation
                </button>
                <button className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium">
                  Download Strategy Guide
                </button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <RefinedFooter />
    </div>
  );
}

