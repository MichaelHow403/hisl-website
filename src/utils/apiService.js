// Multi-provider API service with fallback handling

class MultiProviderAPIService {
  constructor() {
    this.providers = {
      deepseek: {
        name: 'DeepSeek',
        baseURL: 'https://api.deepseek.com/v1/chat/completions',
        apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY || process.env.DEEPSEEK_API_KEY,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY || process.env.DEEPSEEK_API_KEY}`
        },
        formatRequest: (prompt) => ({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 2000
        }),
        parseResponse: (data) => {
          try {
            return data?.choices?.[0]?.message?.content || null;
          } catch (e) {
            console.error('DeepSeek response parsing error:', e);
            return null;
          }
        }
      },
      gemini: {
        name: 'Gemini',
        baseURL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
        apiKey: import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY,
        headers: {
          'Content-Type': 'application/json'
        },
        formatRequest: (prompt) => ({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2000
          }
        }),
        parseResponse: (data) => {
          try {
            return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
          } catch (e) {
            console.error('Gemini response parsing error:', e);
            return null;
          }
        }
      },
      grok: {
        name: 'Grok',
        baseURL: 'https://api.x.ai/v1/chat/completions',
        apiKey: import.meta.env.VITE_GROK_API_KEY || process.env.GROK_API_KEY,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROK_API_KEY || process.env.GROK_API_KEY}`
        },
        formatRequest: (prompt) => ({
          model: 'grok-beta',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 2000
        }),
        parseResponse: (data) => {
          try {
            return data?.choices?.[0]?.message?.content || null;
          } catch (e) {
            console.error('Grok response parsing error:', e);
            return null;
          }
        }
      }
    };
  }

  async callProvider(provider, prompt) {
    const config = this.providers[provider];
    if (!config || !config.apiKey) {
      throw new Error(`${config?.name || provider} API key not configured`);
    }

    try {
      const requestBody = config.formatRequest(prompt);
      const url = provider === 'gemini' 
        ? `${config.baseURL}?key=${config.apiKey}`
        : config.baseURL;

      const response = await fetch(url, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const content = config.parseResponse(data);
      
      if (!content) {
        throw new Error('No content in response');
      }

      return {
        ok: true,
        data: content,
        provider: config.name
      };
    } catch (error) {
      console.error(`${config.name} API error:`, error);
      return {
        ok: false,
        error: error.message,
        provider: config.name
      };
    }
  }

  async chat(prompt, preferredProvider = 'deepseek') {
    // Try preferred provider first
    if (this.providers[preferredProvider]?.apiKey) {
      const result = await this.callProvider(preferredProvider, prompt);
      if (result.ok) {
        return result;
      }
      console.warn(`${preferredProvider} failed, trying fallbacks...`);
    }

    // Try other providers as fallbacks
    const fallbackOrder = ['deepseek', 'gemini', 'grok'].filter(p => p !== preferredProvider);
    
    for (const provider of fallbackOrder) {
      if (this.providers[provider]?.apiKey) {
        const result = await this.callProvider(provider, prompt);
        if (result.ok) {
          return result;
        }
      }
    }

    // All providers failed
    return {
      ok: false,
      error: 'All API providers failed or are not configured',
      message: 'Please check your API keys and try again'
    };
  }

  async streamChat(prompt, preferredProvider = 'deepseek') {
    // For now, use regular chat and simulate streaming
    // TODO: Implement actual streaming when needed
    const result = await this.chat(prompt, preferredProvider);
    
    if (!result.ok) {
      return result;
    }

    // Create a simple stream simulation
    const stream = new ReadableStream({
      start(controller) {
        const text = result.data;
        let index = 0;
        
        const interval = setInterval(() => {
          if (index < text.length) {
            controller.enqueue(text.charAt(index));
            index++;
          } else {
            controller.close();
            clearInterval(interval);
          }
        }, 50); // 50ms delay between characters
      }
    });

    return {
      ok: true,
      stream,
      provider: result.provider
    };
  }

  // News-specific method for Grok
  async getNews(query, maxResults = 6) {
    const prompt = `Please provide ${maxResults} recent news items about: ${query}

Format the response as a JSON array with this exact structure:
[
  {
    "id": "unique_id",
    "title": "News headline",
    "summary": "Brief summary of the news item",
    "category": "AI|Tech|Innovation|Research",
    "timestamp": "ISO timestamp",
    "source": "Source name",
    "url": "URL if available or #"
  }
]

Focus on recent developments in AI, technology, and innovation. Make sure the JSON is valid and properly formatted.`;

    const result = await this.chat(prompt, 'grok');
    
    if (!result.ok) {
      return {
        ok: false,
        error: result.error,
        news: []
      };
    }

    try {
      // Try to extract JSON from the response
      const jsonMatch = result.data.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const news = JSON.parse(jsonMatch[0]);
        return {
          ok: true,
          news: Array.isArray(news) ? news : [],
          provider: result.provider
        };
      } else {
        throw new Error('No JSON array found in response');
      }
    } catch (error) {
      console.error('News parsing error:', error);
      return {
        ok: false,
        error: 'Failed to parse news response',
        news: []
      };
    }
  }

  // Agent recommendation method
  async getAgentRecommendation(organizationData) {
    const prompt = `Based on the following organization information, recommend the most suitable HISL AI agent:

Organization Details:
- Industry: ${organizationData.industry}
- Primary Need: ${organizationData.primaryNeed}
- Data Volume: ${organizationData.dataVolume}
- Compliance Requirements: ${organizationData.complianceReqs?.join(', ') || 'None specified'}
- Integration Systems: ${organizationData.integrationSystems?.join(', ') || 'None specified'}

Available HISL Agents:
1. DocuGenie - Document processing and compliance automation
2. BuildLens - Construction project management and monitoring
3. ComplianceCore - Regulatory compliance and audit management
4. DataSentry - Data security and privacy protection
5. ProcessFlow - Workflow automation and optimization

Please respond with a JSON object in this exact format:
{
  "recommendedAgent": "AgentName",
  "confidence": 85,
  "reasoning": "Detailed explanation of why this agent is recommended",
  "complianceNotes": "Specific compliance considerations",
  "integrationComplexity": "Low|Medium|High",
  "estimatedTimeframe": "Implementation timeframe estimate",
  "deploymentModel": "On-premises|Sovereign Cloud|Hybrid",
  "nextSteps": ["Step 1", "Step 2", "Step 3"]
}`;

    const result = await this.chat(prompt, 'deepseek');
    
    if (!result.ok) {
      return {
        ok: false,
        error: result.error
      };
    }

    try {
      // Try to extract JSON from the response
      const jsonMatch = result.data.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const recommendation = JSON.parse(jsonMatch[0]);
        return {
          ok: true,
          recommendation,
          provider: result.provider
        };
      } else {
        throw new Error('No JSON object found in response');
      }
    } catch (error) {
      console.error('Recommendation parsing error:', error);
      return {
        ok: false,
        error: 'Failed to parse recommendation response'
      };
    }
  }
}

// Create singleton instance
const apiService = new MultiProviderAPIService();

export default apiService;

// Export individual methods for convenience
export const chat = (prompt, provider) => apiService.chat(prompt, provider);
export const streamChat = (prompt, provider) => apiService.streamChat(prompt, provider);
export const getNews = (query, maxResults) => apiService.getNews(query, maxResults);
export const getAgentRecommendation = (organizationData) => apiService.getAgentRecommendation(organizationData);

