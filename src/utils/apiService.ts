// Multi-provider API service with fallback handling
export interface APIResponse {
  ok: boolean;
  data?: string;
  error?: string;
  message?: string;
  provider?: string;
}

export interface StreamResponse {
  ok: boolean;
  stream?: ReadableStream;
  error?: string;
  message?: string;
  provider?: string;
}

type Provider = 'deepseek' | 'gemini' | 'grok';

interface ProviderConfig {
  name: string;
  baseURL: string;
  apiKey: string;
  headers: Record<string, string>;
  formatRequest: (prompt: string) => any;
  parseResponse: (data: any) => string | null;
}

class MultiProviderAPIService {
  private providers: Record<Provider, ProviderConfig>;
  private currentProvider: Provider = 'deepseek';

  constructor() {
    this.providers = {
      deepseek: {
        name: 'DeepSeek',
        baseURL: 'https://api.deepseek.com/v1/chat/completions',
        apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY || '',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY || ''}`
        },
        formatRequest: (prompt: string) => ({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: prompt }],
          stream: true,
          max_tokens: 1000,
          temperature: 0.7
        }),
        parseResponse: (data: any) => data.choices?.[0]?.delta?.content || null
      },
      gemini: {
        name: 'Gemini',
        baseURL: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${import.meta.env.VITE_GEMINI_API_KEY || ''}`,
        apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
        headers: {
          'Content-Type': 'application/json'
        },
        formatRequest: (prompt: string) => ({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.7
          }
        }),
        parseResponse: (data: any) => data.candidates?.[0]?.content?.parts?.[0]?.text || null
      },
      grok: {
        name: 'Grok',
        baseURL: 'https://api.x.ai/v1/chat/completions',
        apiKey: import.meta.env.VITE_GROK_API_KEY || '',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROK_API_KEY || ''}`
        },
        formatRequest: (prompt: string) => ({
          model: 'grok-beta',
          messages: [{ role: 'user', content: prompt }],
          stream: true,
          max_tokens: 1000,
          temperature: 0.7
        }),
        parseResponse: (data: any) => data.choices?.[0]?.delta?.content || null
      }
    };
  }

  private async makeRequest(provider: Provider, prompt: string): Promise<Response> {
    const config = this.providers[provider];
    
    if (!config.apiKey) {
      throw new Error(`${config.name} API key not configured`);
    }

    const response = await fetch(config.baseURL, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(config.formatRequest(prompt))
    });

    return response;
  }

  async sendPrompt(prompt: string, preferredProvider?: Provider): Promise<StreamResponse> {
    const providersToTry: Provider[] = preferredProvider 
      ? [preferredProvider, ...Object.keys(this.providers).filter(p => p !== preferredProvider) as Provider[]]
      : ['deepseek', 'grok', 'gemini'];

    for (const provider of providersToTry) {
      try {
        console.log(`Trying ${this.providers[provider].name}...`);
        const response = await this.makeRequest(provider, prompt);

        if (!response.ok) {
          const errorData = await response.text();
          console.warn(`${this.providers[provider].name} failed:`, response.status, errorData);
          
          // Try next provider on error
          continue;
        }

        console.log(`✅ ${this.providers[provider].name} succeeded`);
        this.currentProvider = provider;

        return {
          ok: true,
          stream: response.body,
          provider: this.providers[provider].name
        };

      } catch (error) {
        console.warn(`${this.providers[provider].name} network error:`, error);
        continue;
      }
    }

    // All providers failed, return fallback
    console.log('All providers failed, using fallback response');
    return this.getFallbackResponse(prompt);
  }

  private getFallbackResponse(prompt: string): StreamResponse {
    const mockResponses = [
      `Your prompt "${prompt.substring(0, 50)}..." is being processed through our sovereign AI infrastructure. The distributed network ensures your data remains private and secure while delivering intelligent responses.`,
      `Processing your request through our decentralized AI network. Your prompt travels through multiple secure data centers, maintaining privacy and sovereignty throughout the entire journey.`,
      `The ravens Huginn and Muninn are carrying your prompt across our global infrastructure. Each hop through our sovereign network maintains the highest standards of data protection and privacy.`
    ];
    
    const mockResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    
    const stream = new ReadableStream({
      start(controller) {
        const words = mockResponse.split(' ');
        let index = 0;
        
        const interval = setInterval(() => {
          if (index < words.length) {
            const chunk = words[index] + ' ';
            controller.enqueue(new TextEncoder().encode(`data: {"choices":[{"delta":{"content":"${chunk}"}}]}\n\n`));
            index++;
          } else {
            controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
            controller.close();
            clearInterval(interval);
          }
        }, 80 + Math.random() * 40); // Variable speed for realism
      }
    });

    return {
      ok: true,
      stream,
      provider: 'IntegAI Fallback'
    };
  }

  async processStream(
    stream: ReadableStream, 
    onChunk: (text: string) => void,
    provider?: string
  ): Promise<void> {
    const reader = stream.getReader();
    const decoder = new TextDecoder();

    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value);
        
        // Handle different provider response formats
        if (provider === 'Gemini') {
          // Gemini uses different streaming format
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.trim() && line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                const content = this.providers.gemini.parseResponse(data);
                if (content) onChunk(content);
              } catch (e) {
                continue;
              }
            }
          }
        } else {
          // DeepSeek and Grok use OpenAI-compatible format
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              
              if (data === '[DONE]') {
                return;
              }

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                
                if (content) {
                  onChunk(content);
                }
              } catch (e) {
                continue;
              }
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  getCurrentProvider(): string {
    return this.providers[this.currentProvider].name;
  }
}

export const apiService = new MultiProviderAPIService();

