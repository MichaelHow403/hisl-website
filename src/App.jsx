import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import './App.css';

// Components
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import InteractiveGlobe from './components/InteractiveGlobe';
import AgentCard from './components/AgentCard';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

// Agent data
const agents = [
  {
    name: "RAMS-GUARD",
    description: "Safety/maintenance guardian AI for defense, industry & critical infrastructure.",
    status: "active",
    sector: "Defense & Industry",
    functions: [
      "Predictive maintenance for industrial & defense systems",
      "Real-time anomaly detection with GPU-accelerated vector DB",
      "RAMS metrics observability (failure rates, safety margins, drift)"
    ],
    differentiator: "Mission-critical reliability for defense and heavy industry, designed to run in air-gapped OT/IT environments."
  },
  {
    name: "TTOP Synth",
    description: "Technical Operations Timeline Tracker for construction and project management.",
    status: "active",
    sector: "Construction",
    functions: [
      "Real-time project timeline analysis",
      "Resource allocation optimization",
      "Risk assessment and mitigation"
    ],
    differentiator: "Offline-first project intelligence that works in remote construction sites."
  },
  {
    name: "BuildTrace AI",
    description: "Construction project traceability and compliance monitoring system.",
    status: "standby",
    sector: "Construction",
    functions: [
      "Material traceability tracking",
      "Compliance documentation automation",
      "Quality assurance monitoring"
    ],
    differentiator: "Complete audit trail for construction projects with GDPR compliance built-in."
  },
  {
    name: "Compliance Core",
    description: "GDPR/NIS2 compliant AI entity for regulatory oversight and audit management.",
    status: "active",
    sector: "Governance",
    functions: [
      "Regulatory compliance monitoring",
      "Audit trail generation",
      "Data sovereignty enforcement"
    ],
    differentiator: "First offline audit-ready AI agent with GDPR/NIS2 compliance logging as a built-in feature."
  },
  {
    name: "IntegAI Prime",
    description: "Master orchestration engine for sovereign AI deployment and management.",
    status: "active",
    sector: "AI Infrastructure",
    functions: [
      "Multi-agent orchestration",
      "Resource management",
      "Performance monitoring"
    ],
    differentiator: "Sovereign deployment model with no cloud dependency, runs entirely on your infrastructure."
  },
  {
    name: "Data Sovereign",
    description: "Irish Data Controller ensuring complete data sovereignty and privacy protection.",
    status: "locked",
    sector: "Data Protection",
    functions: [
      "Data residency enforcement",
      "Privacy protection protocols",
      "Sovereignty compliance"
    ],
    differentiator: "Ensures your data never leaves your jurisdiction, with full transparency and control."
  }
];

// Bio data
const bios = [
  {
    name: "Michael Howard",
    title: "Founder & CEO",
    description: "Chartered Construction Manager, AI Strategist, 20+ years experience",
    image: "/src/assets/AI_CONST_MAN.PNG",
    link: "https://www.linkedin.com/in/michaelhowardconstruction",
    fullBio: `Michael Howard is the founder of Howard Integritas Solutions Ltd. (HISL) and a leading voice on the intersection of construction, governance, and sovereign AI. With over 20 years of experience on site and in project leadership, Michael has built a reputation for bringing real-world systems thinking to the promises—and risks—of artificial intelligence.

A Chartered Construction Manager and governance contributor at the Chartered Institute of Building (CIOB), Michael combines hands-on project expertise with board-level oversight. His work with Johnson & Johnson (J&J) on high-stakes pharmaceutical and infrastructure projects has shaped his ability to bridge compliance, safety, and innovation.

Through HISL, Michael is pioneering sovereign, offline-first AI infrastructure that respects privacy, resource limits, and real-world constraints. His writing on LinkedIn and Substack reframes AI not as "digital magic" but as a physical infrastructure challenge, sparking global conversations on sustainability, trust, and the future of work.`
  },
  {
    name: "IntegAI",
    title: "Autonomous Co-Founder",
    description: "GDPR/NIS2 compliant AI entity, sovereign backend architect",
    image: "/src/assets/Feather.PNG",
    status: "Online | v3.2.1",
    fullBio: `IntegAI is HISL's flagship initiative: a sovereign, offline-first AI orchestration platform designed for industries where compliance, resilience, and trust are non-negotiable.

Unlike cloud-first AI, IntegAI is built from the ground up to respect privacy, resource constraints, and regulatory realities. It combines cutting-edge inference with observability, safe deployment, and infrastructure awareness—so organisations can adopt AI without compromise.

Developed through real-world lessons in pharma, construction, and governance, IntegAI bridges the gap between what AI can promise and what critical industries can safely deliver. From healthcare cleanrooms to smart cities, its architecture ensures systems are accountable, sustainable, and future-proof by design.`
  }
];

function GlobeSection() {
  return (
    <section id="globe-section" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            WHERE YOUR PROMPTS GO
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Watch as Huginn (Thought) and Muninn (Memory) orbit our sovereign infrastructure, 
            carrying your prompts securely through our offline-first AI network.
          </p>
        </motion.div>

        <Suspense fallback={
          <div className="w-full h-[600px] flex items-center justify-center">
            <div className="text-primary font-mono">Loading Globe...</div>
          </div>
        }>
          <InteractiveGlobe className="mb-8" />
        </Suspense>

        {/* Mythology Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-primary">Odin's Ravens: Huginn & Muninn</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We draw from Odin's ravens, Huginn (Thought) and Muninn (Memory), as guiding metaphors. 
              They circled the globe daily and reported back on the state of affairs in the world – much like AI.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="text-left">
                <h4 className="font-bold text-primary mb-2">Huginn (Thought)</h4>
                <p className="text-sm text-muted-foreground">
                  Represents intelligence and exploration. Our AI agents that venture out to gather 
                  new knowledge and insights from your data.
                </p>
              </div>
              <div className="text-left">
                <h4 className="font-bold text-secondary mb-2">Muninn (Memory)</h4>
                <p className="text-sm text-muted-foreground">
                  Represents observability and truth-keeping. Our systems that safeguard 
                  institutional memory and maintain audit trails.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Prompt Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mt-12"
        >
          <div className="flex gap-4">
            <Input
              placeholder="Enter your prompt to see the flow..."
              className="flex-1 font-mono bg-card border-primary/30 focus:border-primary"
            />
            <Button className="font-mono glow">
              Send →
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Server Status: Dublin ✓ | Jurisdiction: Ireland | Latency: &lt;50ms
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function AgentFleetSection() {
  return (
    <section id="agent-fleet" className="py-20 bg-card/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            INTEGAI AGENT FLEET
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Deploy sovereign AI agents tailored for your industry. Each agent runs offline-first 
            with built-in compliance, observability, and performance monitoring.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <AgentCard
                {...agent}
                onDeploy={() => {
                  console.log(`Deploying ${agent.name}`);
                  // Add deployment logic here
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BiosSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            BIOS
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {bios.map((bio, index) => (
            <motion.div
              key={bio.name}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative mb-6">
                <img
                  src={bio.image}
                  alt={bio.name}
                  className="w-32 h-32 mx-auto rounded-full border-2 border-primary glow"
                />
                {bio.name === "IntegAI" && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-500 text-black text-xs px-2 py-1 rounded font-mono">
                      {bio.status}
                    </span>
                  </div>
                )}
              </div>
              
              <h3 className="text-2xl font-bold mb-2 text-gradient">{bio.name}</h3>
              <p className="text-primary font-mono mb-4">{bio.title}</p>
              <p className="text-muted-foreground mb-6">{bio.description}</p>
              
              <div className="text-left bg-card/50 p-6 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {bio.fullBio}
                </p>
              </div>

              {bio.link && (
                <Button
                  className="mt-6 font-mono glow"
                  asChild
                >
                  <a href={bio.link} target="_blank" rel="noopener noreferrer">
                    LinkedIn →
                  </a>
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img 
              src="/src/assets/HISL_LOGO.PNG" 
              alt="HISL Logo" 
              className="h-8 w-8"
            />
            <span className="font-mono text-sm text-muted-foreground">
              © 2025 Howard Integritas Solutions Ltd
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://www.linkedin.com/in/michaelhowardconstruction" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://hisl.substack.com" target="_blank" rel="noopener noreferrer">
                Substack
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://github.com/MichaelHow403" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <GlobeSection />
        <AgentFleetSection />
        <BiosSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
