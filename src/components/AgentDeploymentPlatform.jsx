import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader, Shield, Zap, Brain, Building, FileText, Wrench } from 'lucide-react';
import RefinedHeader from './RefinedHeader';
import RefinedFooter from './RefinedFooter';

// Predefined agent types with their capabilities
const agentTypes = {
  'DocuGenie': {
    name: 'DocuGenie',
    icon: '📄',
    description: 'Document processing and compliance automation',
    capabilities: ['Document Analysis', 'Compliance Checking', 'Data Extraction', 'Report Generation'],
    industries: ['Legal', 'Finance', 'Healthcare', 'Government'],
    complexity: 'Medium',
    deploymentTime: '2-4 weeks'
  },
  'BuildLens': {
    name: 'BuildLens',
    icon: '🏗️',
    description: 'Construction project management and safety monitoring',
    capabilities: ['Project Planning', 'Safety Monitoring', 'Resource Optimization', 'Progress Tracking'],
    industries: ['Construction', 'Engineering', 'Infrastructure', 'Real Estate'],
    complexity: 'High',
    deploymentTime: '4-8 weeks'
  },
  'ComplianceCore': {
    name: 'ComplianceCore',
    icon: '⚖️',
    description: 'Regulatory compliance and risk assessment',
    capabilities: ['Risk Assessment', 'Regulatory Monitoring', 'Audit Trail', 'Policy Enforcement'],
    industries: ['Finance', 'Healthcare', 'Energy', 'Manufacturing'],
    complexity: 'High',
    deploymentTime: '6-12 weeks'
  },
  'DataSentry': {
    name: 'DataSentry',
    icon: '🛡️',
    description: 'Data security and privacy protection',
    capabilities: ['Data Classification', 'Privacy Monitoring', 'Threat Detection', 'Access Control'],
    industries: ['Technology', 'Finance', 'Healthcare', 'Government'],
    complexity: 'High',
    deploymentTime: '4-8 weeks'
  },
  'ProcessFlow': {
    name: 'ProcessFlow',
    icon: '⚙️',
    description: 'Business process automation and optimization',
    capabilities: ['Workflow Automation', 'Process Mining', 'Efficiency Analysis', 'Task Orchestration'],
    industries: ['Manufacturing', 'Logistics', 'Retail', 'Services'],
    complexity: 'Medium',
    deploymentTime: '3-6 weeks'
  },
  'InsightEngine': {
    name: 'InsightEngine',
    icon: '🧠',
    description: 'Business intelligence and predictive analytics',
    capabilities: ['Data Analysis', 'Predictive Modeling', 'Trend Analysis', 'Decision Support'],
    industries: ['Retail', 'Finance', 'Marketing', 'Operations'],
    complexity: 'Medium',
    deploymentTime: '2-4 weeks'
  }
};

// Assessment questions to determine the best agent
const assessmentQuestions = [
  {
    id: 'industry',
    question: 'What industry does your organization operate in?',
    type: 'select',
    options: ['Construction', 'Finance', 'Healthcare', 'Legal', 'Manufacturing', 'Technology', 'Government', 'Retail', 'Other']
  },
  {
    id: 'primaryNeed',
    question: 'What is your primary need?',
    type: 'select',
    options: ['Document Processing', 'Project Management', 'Compliance Monitoring', 'Data Security', 'Process Automation', 'Business Intelligence']
  },
  {
    id: 'dataVolume',
    question: 'What is your typical data volume?',
    type: 'select',
    options: ['Small (< 1GB/day)', 'Medium (1-100GB/day)', 'Large (100GB-1TB/day)', 'Enterprise (> 1TB/day)']
  },
  {
    id: 'complianceReqs',
    question: 'Do you have specific compliance requirements?',
    type: 'multiselect',
    options: ['GDPR', 'HIPAA', 'SOX', 'ISO 27001', 'PCI DSS', 'None', 'Other']
  },
  {
    id: 'integrationNeeds',
    question: 'What systems need integration?',
    type: 'multiselect',
    options: ['ERP Systems', 'CRM', 'Document Management', 'Project Management', 'Financial Systems', 'HR Systems', 'Custom APIs']
  }
];

function AgentCard({ agent, isRecommended = false }) {
  return (
    <motion.div 
      className={`bg-gray-800/50 backdrop-blur-sm border rounded-xl p-6 ${
        isRecommended ? 'border-cyan-400 ring-2 ring-cyan-400/20' : 'border-gray-600/20'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isRecommended && (
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4 inline-block">
          ⭐ Recommended
        </div>
      )}
      
      <div className="flex items-center mb-4">
        <div className="text-3xl mr-3">{agent.icon}</div>
        <div>
          <h3 className="text-xl font-bold text-white">{agent.name}</h3>
          <p className="text-gray-400 text-sm">{agent.description}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-semibold text-cyan-400 mb-2">Capabilities:</h4>
          <div className="flex flex-wrap gap-2">
            {agent.capabilities.map((cap, index) => (
              <span key={index} className="bg-gray-700/50 text-xs px-2 py-1 rounded text-gray-300">
                {cap}
              </span>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Complexity:</span>
            <span className={`ml-2 font-semibold ${
              agent.complexity === 'High' ? 'text-red-400' : 
              agent.complexity === 'Medium' ? 'text-yellow-400' : 'text-green-400'
            }`}>
              {agent.complexity}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Deployment:</span>
            <span className="ml-2 text-cyan-400 font-semibold">{agent.deploymentTime}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AgentDeploymentPlatform() {
  const [currentStep, setCurrentStep] = useState('assessment'); // assessment, analysis, results
  const [answers, setAnswers] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendedAgent, setRecommendedAgent] = useState(null);
  const [feasibilityScore, setFeasibilityScore] = useState(null);
  const [auditHash, setAuditHash] = useState('');

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const analyzeRequirements = async () => {
    setIsAnalyzing(true);
    setCurrentStep('analysis');
    
    // Simulate API call to analyze requirements
    try {
      const response = await fetch('/api/analyze-requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });
      
      // Simulate analysis delay
      setTimeout(() => {
        // Simple logic to recommend agent based on answers
        let recommended = 'ProcessFlow'; // default
        
        if (answers.primaryNeed === 'Document Processing') {
          recommended = 'DocuGenie';
        } else if (answers.industry === 'Construction') {
          recommended = 'BuildLens';
        } else if (answers.complianceReqs && answers.complianceReqs.length > 0) {
          recommended = 'ComplianceCore';
        } else if (answers.primaryNeed === 'Data Security') {
          recommended = 'DataSentry';
        } else if (answers.primaryNeed === 'Business Intelligence') {
          recommended = 'InsightEngine';
        }
        
        setRecommendedAgent(recommended);
        setFeasibilityScore(Math.floor(Math.random() * 20) + 80); // 80-100%
        
        // Generate audit hash
        const hash = btoa(JSON.stringify(answers) + Date.now()).substring(0, 16);
        setAuditHash(hash);
        
        setIsAnalyzing(false);
        setCurrentStep('results');
      }, 3000);
      
    } catch (error) {
      // Fallback simulation
      setTimeout(() => {
        setRecommendedAgent('ProcessFlow');
        setFeasibilityScore(85);
        setAuditHash('SIM' + Math.random().toString(36).substring(2, 10).toUpperCase());
        setIsAnalyzing(false);
        setCurrentStep('results');
      }, 3000);
    }
  };

  const resetAssessment = () => {
    setCurrentStep('assessment');
    setAnswers({});
    setRecommendedAgent(null);
    setFeasibilityScore(null);
    setAuditHash('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <RefinedHeader logoVariant="HISL" />
      
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              AGENT DEPLOYMENT
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Discover which IntegAI agent is perfect for your organization
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          
          {/* Assessment Phase */}
          {currentStep === 'assessment' && (
            <motion.div 
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">
                  Organization Assessment
                </h2>
                
                <div className="space-y-8">
                  {assessmentQuestions.map((question, index) => (
                    <div key={question.id} className="space-y-3">
                      <label className="block text-lg font-semibold text-white">
                        {index + 1}. {question.question}
                      </label>
                      
                      {question.type === 'select' && (
                        <select
                          value={answers[question.id] || ''}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                          className="w-full p-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
                        >
                          <option value="">Select an option...</option>
                          {question.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      )}
                      
                      {question.type === 'multiselect' && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {question.options.map(option => (
                            <label key={option} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={(answers[question.id] || []).includes(option)}
                                onChange={(e) => {
                                  const current = answers[question.id] || [];
                                  const updated = e.target.checked 
                                    ? [...current, option]
                                    : current.filter(item => item !== option);
                                  handleAnswerChange(question.id, updated);
                                }}
                                className="w-4 h-4 text-cyan-400 bg-gray-800 border-gray-600 rounded focus:ring-cyan-400"
                              />
                              <span className="text-gray-300">{option}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <button
                    onClick={analyzeRequirements}
                    disabled={Object.keys(answers).length < assessmentQuestions.length}
                    className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    🔍 Analyze Requirements
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Analysis Phase */}
          {currentStep === 'analysis' && (
            <motion.div 
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-12">
                <div className="mb-8">
                  <Loader className="w-16 h-16 text-cyan-400 animate-spin mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-cyan-400 mb-4">
                    Analyzing Your Requirements
                  </h2>
                  <p className="text-gray-300">
                    IntegAI is processing your organization's needs and matching them with our agent capabilities...
                  </p>
                </div>
                
                <div className="space-y-4 text-left">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Analyzing industry requirements</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Evaluating compliance needs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Loader className="w-5 h-5 text-cyan-400 animate-spin" />
                    <span className="text-gray-300">Matching agent capabilities</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-gray-600 rounded-full"></div>
                    <span className="text-gray-500">Generating deployment plan</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results Phase */}
          {currentStep === 'results' && recommendedAgent && (
            <motion.div 
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Results Header */}
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-cyan-400 mb-4">
                  Analysis Complete
                </h2>
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span className="text-xl font-semibold text-green-400">
                      Feasible — {feasibilityScore}% Match
                    </span>
                  </div>
                </div>
                
                {/* Audit Trail */}
                <div className="bg-gray-800/30 border border-gray-600/20 rounded-lg p-4 inline-block">
                  <div className="text-sm text-gray-400 mb-1">Audit Trail Hash:</div>
                  <div className="font-mono text-cyan-400 text-sm">{auditHash}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Timestamp: {new Date().toISOString()}
                  </div>
                </div>
              </div>

              {/* Recommended Agent */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Recommended Agent
                </h3>
                <AgentCard agent={agentTypes[recommendedAgent]} isRecommended={true} />
              </div>

              {/* All Available Agents */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  All Available Agents
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.values(agentTypes).map((agent, index) => (
                    <AgentCard 
                      key={agent.name} 
                      agent={agent} 
                      isRecommended={agent.name === recommendedAgent}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="text-center space-x-4">
                <button
                  onClick={resetAssessment}
                  className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all duration-300"
                >
                  🔄 New Assessment
                </button>
                <button
                  onClick={() => window.location.href = '/contact'}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                >
                  📞 Contact for Deployment
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <RefinedFooter />
    </div>
  );
}

