// Demo AI Service for public deployment (no real API keys)
// This provides realistic demo responses without exposing actual API keys

// Demo responses for DeepSeek API simulation
const DEMO_RESPONSES = {
  default: {
    response: "Welcome to HISL's Sovereign AI Infrastructure! Your prompt has been processed through our secure, compliant AI network. This is a demonstration of our capabilities - in production, your data remains private and under your control.",
    processing_time: "0.34s",
    nodes_used: 3,
    compliance_score: "99.7%"
  },
  hello: {
    response: "Hello! I'm running on HISL's sovereign infrastructure. Your prompts are processed securely without data mining or external surveillance. How can I assist you today?",
    processing_time: "0.28s", 
    nodes_used: 2,
    compliance_score: "100%"
  },
  ai: {
    response: "HISL provides sovereign AI infrastructure where your prompts remain yours. We ensure compliance, privacy, and performance without compromising on capability. Our distributed network processes requests while maintaining full data sovereignty.",
    processing_time: "0.41s",
    nodes_used: 4,
    compliance_score: "99.9%"
  }
};

// Demo DeepSeek API simulation
export async function callDeepSeekAPI(prompt) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Select appropriate demo response
  const lowerPrompt = prompt.toLowerCase();
  let response;
  
  if (lowerPrompt.includes('hello') || lowerPrompt.includes('hi')) {
    response = DEMO_RESPONSES.hello;
  } else if (lowerPrompt.includes('ai') || lowerPrompt.includes('artificial')) {
    response = DEMO_RESPONSES.ai;
  } else {
    response = DEMO_RESPONSES.default;
  }
  
  return {
    success: true,
    data: {
      ...response,
      timestamp: new Date().toISOString(),
      prompt_length: prompt.length,
      model: "DeepSeek-V3 (Sovereign Instance)"
    }
  };
}

// Demo Gemini API simulation for deployment analysis
export async function callGeminiAPI(industry, problem) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));
  
  const agents = {
    healthcare: "MedCore AI",
    finance: "FinanceAI", 
    legal: "LegalMind",
    environmental: "ConservAI",
    defense: "RAMS Guard",
    manufacturing: "IndustrialAI",
    education: "EduCore",
    infrastructure: "InfraAI"
  };
  
  const recommendedAgent = agents[industry.toLowerCase()] || "CustomAI";
  const complianceScore = 85 + Math.floor(Math.random() * 15);
  const energyUsage = (Math.random() * 2 + 0.5).toFixed(2);
  
  return {
    success: true,
    data: {
      recommended_agent: recommendedAgent,
      industry: industry,
      problem_analysis: `Analyzed ${problem} for ${industry} sector. Recommended deployment strategy identified.`,
      modules: [
        "Data Processing Core",
        "Compliance Engine", 
        "Security Layer",
        "API Gateway",
        "Monitoring Suite"
      ],
      compliance_score: `${complianceScore}%`,
      energy_usage: `${energyUsage} kWh`,
      estimated_deployment: "2-3 weeks",
      confidence: "High",
      timestamp: new Date().toISOString()
    }
  };
}

// Demo Claude API simulation
export async function callClaudeAPI(prompt) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
  
  return {
    success: true,
    data: {
      response: "This is a demonstration of Claude integration within HISL's sovereign infrastructure. In production, all AI models operate under strict data sovereignty protocols.",
      model: "Claude-3.5 (Sovereign Instance)",
      processing_time: "0.52s",
      compliance_verified: true,
      timestamp: new Date().toISOString()
    }
  };
}

// Energy usage simulation (for Tree Hugger feature)
export function getEnergyUsage(region = "EU-West") {
  const baseUsage = {
    "EU-West": 120,
    "US-East": 280,
    "Asia-Pacific": 200,
    "Nordic": 45
  };
  
  const base = baseUsage[region] || 150;
  const variation = Math.floor(Math.random() * 50 - 25);
  
  return {
    region,
    co2_intensity: base + variation,
    renewable_percentage: Math.floor(Math.random() * 40 + 60),
    estimated_footprint: "0.03 kWh",
    offset_available: true
  };
}

