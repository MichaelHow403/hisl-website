import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroClarity = () => {
  const navigate = useNavigate();
  const [activeAccordion, setActiveAccordion] = useState(null);

  const pillars = [
    {
      title: "Who we are",
      body: "Howard Integritas Solutions Ltd. (HISL) — an engineering-led AI company born from construction and critical infrastructure. We deliver systems you can operate, audit, and trust."
    },
    {
      title: "What we do", 
      body: "Design, deploy, and operate sovereign AI agents: document intelligence, compliance monitors, secure comms, and agent-to-agent orchestration — on-prem or air-gapped."
    },
    {
      title: "What makes us different",
      body: "Local-first processing, zero data retention, immutable audit trails, evidence logs, EU data sovereignty, and energy-aware compute — by design."
    }
  ];

  const chips = [
    "Sovereign-by-Design",
    "Local-First / Air-Gap Ready", 
    "100% Audit Log Coverage",
    "Zero Data Retention",
    "NIS2 / GDPR Aligned",
    "Energy-Aware Compute"
  ];

  const ctas = [
    { label: "Explore the Agents", href: "/#agents", icon: "⚡" },
    { label: "See the Globe", href: "/globe", icon: "🌍" },
    { label: "View Energy Impact", href: "/#energy", icon: "🌱" },
    { label: "Talk to Us", href: "/contact", icon: "✉️" }
  ];

  const handleCTAClick = (href) => {
    if (href.startsWith('/#')) {
      // Scroll to anchor
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href === '/contact') {
      // Navigate to contact or open email
      window.location.href = 'mailto:michael.howard@hisl.ie';
    } else {
      // Navigate to page
      navigate(href);
    }
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      {/* Radial gradient overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-radial from-black/50 via-black/30 to-transparent pointer-events-none"></div>
      
      <div className="relative z-20 text-center">
        {/* H1 */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          AI + Human <span className="text-cyan-400">…with soul</span>
        </h1>

        {/* Subheadline */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
            <span className="font-semibold text-white">Sovereign AI infrastructure for regulated work.</span>
            <br className="hidden md:block" />
            <span className="text-gray-300">HISL builds IntegAI — human-aligned agents that run on your terms: local-first, auditable, privacy-preserving.</span>
          </p>
        </div>

        {/* Who/What/Why Cards - Desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
          {pillars.map((pillar, index) => (
            <div key={index} className="bg-gray-900/60 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 text-left hover:border-cyan-400/40 transition-all duration-300">
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">{pillar.title}</h2>
              <p className="text-base md:text-lg text-gray-200 leading-relaxed">{pillar.body}</p>
            </div>
          ))}
        </div>

        {/* Who/What/Why Accordion - Mobile */}
        <div className="md:hidden mb-12">
          <div className="bg-gray-900/60 backdrop-blur-sm border border-cyan-500/20 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-cyan-500/20">
              <h2 className="text-xl font-semibold text-white">Who / What / Why</h2>
            </div>
            {pillars.map((pillar, index) => (
              <div key={index} className="border-b border-gray-700/50 last:border-b-0">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-800/30 transition-colors"
                  aria-expanded={activeAccordion === index}
                >
                  <span className="text-lg font-medium text-white">{pillar.title}</span>
                  <span className={`text-cyan-400 transform transition-transform ${activeAccordion === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {activeAccordion === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-200 leading-relaxed">{pillar.body}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Proof Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-4xl mx-auto">
          {chips.map((chip, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-gray-900/60 backdrop-blur-sm border border-cyan-500/30 rounded-full text-sm font-medium text-cyan-300 hover:border-cyan-400/50 transition-colors"
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {ctas.map((cta, index) => (
            <button
              key={index}
              onClick={() => handleCTAClick(cta.href)}
              className="group px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              aria-label={cta.label}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{cta.icon}</span>
                <span className="font-semibold">{cta.label}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Micro-explainer */}
        <p className="text-sm text-gray-400 max-w-3xl mx-auto leading-relaxed">
          What you're seeing: a live, privacy-preserving front end to IntegAI — your prompts stay yours, and every decision is traceable.
        </p>

        {/* Optional: Operating Regions */}
        <div className="mt-8 pt-6 border-t border-gray-700/50">
          <p className="text-xs text-gray-500 mb-2">Operating Regions</p>
          <p className="text-sm text-gray-400">
            Ireland • Germany • UK • USA • APAC (pilot)
          </p>
        </div>

        {/* Optional: How it works scroller */}
        <div className="mt-6">
          <p className="text-xs text-gray-500 mb-2">How it works</p>
          <div className="flex justify-center">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="text-cyan-400">Prompt</span>
              <span>→</span>
              <span className="text-cyan-400">Parse</span>
              <span>→</span>
              <span className="text-cyan-400">Plan</span>
              <span>→</span>
              <span className="text-cyan-400">Perform</span>
              <span>→</span>
              <span className="text-cyan-400">Present</span>
              <span className="text-xs text-gray-500 ml-2">(fully traceable)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroClarity;

