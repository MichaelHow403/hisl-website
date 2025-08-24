// API endpoint for fetching AI & Tech news using Grok
export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    const grokApiKey = process.env.VITE_GROK_API_KEY || import.meta.env.VITE_GROK_API_KEY;
    
    if (!grokApiKey) {
      return new Response(
        JSON.stringify({ 
          error: 'API key not configured',
          content: null 
        }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${grokApiKey}`
      },
      body: JSON.stringify({
        model: 'grok-beta',
        messages: [
          {
            role: 'system',
            content: 'You are a tech news curator. Generate realistic, current AI and technology news items in JSON format. Focus on recent developments, breakthroughs, and industry trends.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      console.error('Grok API error:', response.status, await response.text());
      
      // Return fallback response
      return new Response(
        JSON.stringify({
          content: generateFallbackNewsResponse(),
          provider: 'IntegAI Fallback'
        }),
        { 
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || generateFallbackNewsResponse();

    return new Response(
      JSON.stringify({
        content,
        provider: 'Grok'
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('News API error:', error);
    
    return new Response(
      JSON.stringify({
        content: generateFallbackNewsResponse(),
        provider: 'IntegAI Fallback',
        error: 'Network error'
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

function generateFallbackNewsResponse(): string {
  const currentTime = new Date();
  const newsItems = [
    {
      title: "Sovereign AI Infrastructure Gains Industry Adoption",
      summary: "Major enterprises are increasingly adopting sovereign AI solutions to maintain data control and regulatory compliance while leveraging advanced AI capabilities.",
      category: "AI",
      timestamp: currentTime.toLocaleTimeString()
    },
    {
      title: "Edge Computing Revolutionizes Real-Time AI Processing",
      summary: "New edge computing architectures enable millisecond-latency AI inference, transforming applications in autonomous vehicles and industrial automation.",
      category: "Tech",
      timestamp: new Date(currentTime.getTime() - 3600000).toLocaleTimeString()
    },
    {
      title: "Privacy-Preserving AI Models Show Breakthrough Performance",
      summary: "Researchers demonstrate that federated learning and differential privacy techniques can maintain AI model accuracy while protecting sensitive data.",
      category: "Research",
      timestamp: new Date(currentTime.getTime() - 7200000).toLocaleTimeString()
    },
    {
      title: "Multi-Modal AI Systems Achieve Human-Level Understanding",
      summary: "Latest AI models capable of processing text, images, and audio simultaneously demonstrate unprecedented comprehension across multiple domains.",
      category: "Innovation",
      timestamp: new Date(currentTime.getTime() - 10800000).toLocaleTimeString()
    },
    {
      title: "Quantum-Enhanced AI Training Reduces Compute Requirements",
      summary: "Hybrid quantum-classical computing approaches show promise in reducing the energy and time required for training large language models.",
      category: "Research",
      timestamp: new Date(currentTime.getTime() - 14400000).toLocaleTimeString()
    },
    {
      title: "Decentralized AI Networks Enable Global Collaboration",
      summary: "New protocols allow AI models to be trained and deployed across distributed networks while maintaining data sovereignty and privacy.",
      category: "AI",
      timestamp: new Date(currentTime.getTime() - 18000000).toLocaleTimeString()
    }
  ];

  return JSON.stringify(newsItems, null, 2);
}

