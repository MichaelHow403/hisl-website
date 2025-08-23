import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AgentCard from './AgentCard';
import AIConstMan from '../assets/AI_CONST_MAN.PNG';
import { Flask, Shield, Scale, Leaf, Stethoscope, CreditCard, Target, Factory, BookOpen, Building } from 'lucide-react';

export default function AgentFleet() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const agents = [
    {
      id: 'pharma-ai',
      name: 'PharmaAI',
      icon: <Flask className="w-6 h-6" />,
      category: 'healthcare',
      status: 'active',
      description: 'Research co-pilot for drug discovery & trials.',
      sector: 'Healthcare',
      functions: [
        'Cross-modal retrieval (literature, assay data, clinical trial results)',
        'Confidential vector compute → protect IP & unpublished studies',
        'Embedded compliance guardrails for FDA/EMA workflows'
      ],
      differentiator: 'Offline sovereign assistant that accelerates drug discovery while remaining compliant and private.'
    },
    {
      id: 'conserv-ai',
      name: 'ConservAI',
      icon: <Leaf className="w-6 h-6" />,
      category: 'environment',
      status: 'active',
      description: 'Field intelligence & ecological modeling agent.',
      sector: 'Environment',
      functions: [
        'Fusion of sensor, satellite, and field notes',
        'Works offline in remote areas (low connectivity regions)',
        'Predictive modeling for biodiversity, soil/water health'
      ],
      differentiator: 'Designed for rangers, NGOs, and conservation scientists working in the field with rugged/offline devices.'
    },
    {
      id: 'rams-guard',
      name: 'RAMS Guard',
      icon: <Shield className="w-6 h-6" />,
      category: 'defense',
      status: 'active',
      description: 'Safety/maintenance guardian AI for defense, industry & critical infrastructure.',
      sector: 'Defense',
      functions: [
        'Predictive maintenance for industrial & defense systems',
        'Real-time anomaly detection with GPU-accelerated vector DB',
        'RAMS metrics observability (failure rates, safety margins, drift)'
      ],
      differentiator: 'Mission-critical reliability for defense and heavy industry, designed to run in air-gapped OT/IT environments.'
    },
    {
      id: 'pharma-compliance',
      name: 'Pharma Compliance',
      icon: <Scale className="w-6 h-6" />,
      category: 'healthcare',
      status: 'active',
      description: 'Compliance & audit agent for pharma operations.',
      sector: 'Healthcare',
      functions: [
        'Tracks regulatory updates (EMA, FDA, MHRA) offline',
        'Hybrid search across SOPs, GxP logs, and regulatory texts',
        'Confidential compute vectors to ensure data integrity in audits'
      ],
      differentiator: 'First offline audit-ready AI agent with GDPR/NIS2 compliance logging as a built-in feature.'
    },
    {
      id: 'envior-ai',
      name: 'EnviorAI',
      icon: <Leaf className="w-6 h-6" />,
      category: 'environment',
      status: 'active',
      description: 'Sustainability intelligence & environmental risk agent.',
      sector: 'Environment',
      functions: [
        'Cross-modal fusion of satellite imagery, IoT sensor data, policy documents',
        'Carbon/ESG compliance tracker (offline-first regulatory mapping)',
        'Predictive modeling for climate risk, pollution, and energy optimization'
      ],
      differentiator: 'A sovereign, offline-first environmental intelligence system that combines scientific modeling with compliance-grade auditability.'
    },
    {
      id: 'med-agent',
      name: 'MedAgent',
      icon: <Stethoscope className="w-6 h-6" />,
      category: 'healthcare',
      status: 'active',
      description: 'Clinical knowledge assistant & secure workflow aide.',
      sector: 'Healthcare',
      functions: [
        'Offline diagnostic retrieval (guidelines, imaging embeddings, drug refs)',
        'Privacy-preserving inference (confidential compute vectors)',
        'Cross-modal support (radiology images + notes + EHR text)'
      ],
      differentiator: 'Compliance-first (GDPR, HIPAA, NIS2), audit logging native.'
    },
    {
      id: 'fin-agent',
      name: 'FinAgent',
      icon: <CreditCard className="w-6 h-6" />,
      category: 'finance',
      status: 'active',
      description: 'Risk, compliance & strategy assistant.',
      sector: 'Finance',
      functions: [
        'Vector-driven fraud detection and anomaly spotting offline',
        'Real-time hybrid search across regulatory & transaction data',
        'Embedded MoE routing (risk, strategy, compliance experts)'
      ],
      differentiator: 'Operates even in air-gapped environments (e.g., central banks).'
    },
    {
      id: 'def-agent',
      name: 'DefAgent',
      icon: <Target className="w-6 h-6" />,
      category: 'defense',
      status: 'active',
      description: 'Tactical decision support + field intelligence.',
      sector: 'Defense',
      functions: [
        'Offline multimodal fusion (sensor + imagery + comms transcripts)',
        'Geo-partitioned vector search for distributed deployments',
        'Resilient fallback inference (works without net/GPU)'
      ],
      differentiator: 'Sovereign, deployable on rugged edge hardware.'
    },
    {
      id: 'indus-agent',
      name: 'IndusAgent',
      icon: <Factory className="w-6 h-6" />,
      category: 'industry',
      status: 'active',
      description: 'Predictive maintenance + operational intelligence.',
      sector: 'Industry',
      functions: [
        'Local ingestion of sensor + SCADA logs',
        'GPU-accelerated RAPIDS vector DB for fast anomaly search',
        'Vector-native observability to detect equipment drift'
      ],
      differentiator: 'Designed for air-gapped plants with strict OT/IT separation.'
    },
    {
      id: 'edu-agent',
      name: 'EduAgent',
      icon: <BookOpen className="w-6 h-6" />,
      category: 'education',
      status: 'standby',
      description: 'Offline tutor + research co-pilot.',
      sector: 'Education',
      functions: [
        'Multi-lingual, domain-specific knowledge capsules',
        'Cross-modal retrieval (books, lecture video, lab data)',
        'Runs on low-power hardware (laptops, tablets)'
      ],
      differentiator: 'Works in low-connectivity or rural settings.'
    },
    {
      id: 'gov-agent',
      name: 'GovAgent',
      icon: <Building className="w-6 h-6" />,
      category: 'government',
      status: 'locked',
      description: 'Policy intelligence + secure citizen service.',
      sector: 'Government',
      functions: [
        'Secure, offline-first records + legislation analysis',
        'Vector observability for transparency & auditability',
        'Confidential compute → protect sensitive citizen data'
      ],
      differentiator: 'Sovereign deployment model, no cloud dependency.'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Agents' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'environment', name: 'Environment' },
    { id: 'defense', name: 'Defense' },
    { id: 'finance', name: 'Finance' },
    { id: 'industry', name: 'Industry' },
    { id: 'education', name: 'Education' },
    { id: 'government', name: 'Government' }
  ];

  const filteredAgents = activeCategory === 'all' 
    ? agents 
    : agents.filter(agent => agent.category === activeCategory);

  const handleDeploy = (agentName) => {
    alert(`Deploying ${agentName}... This would connect to the agent deployment system in a production environment.`);
  };

  return (
    <section 
      id="agent-fleet"
      className="py-20 relative"
      style={{
        background: `linear-gradient(135deg, rgba(10, 10, 15, 0.95) 0%, rgba(26, 26, 46, 0.9) 100%)`
      }}
    >
      {/* Background overlay */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${AIConstMan})`
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gradient mb-6">IntegAI Agent Fleet</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sovereign, offline-first AI agents designed for industries where compliance, 
            resilience, and trust are non-negotiable.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + categories.indexOf(category) * 0.1 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card hover:bg-card/80 text-muted-foreground'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            >
              <AgentCard
                key={agent.name}
                {...agent}
                onDeploy={() => handleDeploy(agent.name)}
              />
            </motion.div>
          ))}
        </div>

        {/* Common Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 p-6 glass rounded-xl border border-primary/30"
        >
          <h3 className="text-2xl font-bold text-gradient mb-4">Cross-Sector Commonalities</h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <li className="flex items-start gap-3">
              <div className="mt-1 text-primary">✓</div>
              <p className="text-muted-foreground">Offline-first RAG with hybrid + cross-modal search</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 text-primary">✓</div>
              <p className="text-muted-foreground">Observability + compliance baked in</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1 text-primary">✓</div>
              <p className="text-muted-foreground">Modular design → each agent can "slot into" RAVEN core</p>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block glass rounded-xl p-6 border border-primary/30">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-500 font-mono text-sm">FLEET STATUS: OPERATIONAL</span>
            </div>
            <p className="text-muted-foreground">
              All agents run on sovereign Irish infrastructure with full GDPR compliance.
              <br />
              <span className="text-primary">Data never leaves your control.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

