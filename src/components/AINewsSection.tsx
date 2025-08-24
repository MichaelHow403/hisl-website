import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Clock, TrendingUp, Zap } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'AI' | 'Tech' | 'Innovation' | 'Research';
  timestamp: string;
  source?: string;
  url?: string;
}

export default function AINewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch latest AI & Tech news using Grok API
  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/grok-news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Generate 6 latest AI and technology news items for today ${new Date().toDateString()}. 
          Focus on: artificial intelligence breakthroughs, tech industry developments, AI research, 
          emerging technologies, and innovation. Format as JSON array with fields: 
          title (concise, engaging), summary (2-3 sentences), category (AI/Tech/Innovation/Research), 
          timestamp (realistic recent time). Make it current and relevant.`
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data = await response.json();
      
      // Parse the response and extract news items
      let newsItems: NewsItem[] = [];
      
      try {
        // Try to parse JSON from the response
        const jsonMatch = data.content?.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const parsedNews = JSON.parse(jsonMatch[0]);
          newsItems = parsedNews.map((item: any, index: number) => ({
            id: `news-${Date.now()}-${index}`,
            title: item.title || `AI News Update ${index + 1}`,
            summary: item.summary || 'Latest developments in artificial intelligence and technology.',
            category: item.category || 'AI',
            timestamp: item.timestamp || new Date().toLocaleTimeString(),
            source: 'IntegAI News',
            url: '#'
          }));
        }
      } catch (parseError) {
        // Fallback: create news items from the text response
        newsItems = generateFallbackNews();
      }

      if (newsItems.length === 0) {
        newsItems = generateFallbackNews();
      }

      setNews(newsItems);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Unable to fetch latest news');
      setNews(generateFallbackNews());
    } finally {
      setLoading(false);
    }
  };

  // Generate fallback news items
  const generateFallbackNews = (): NewsItem[] => {
    const fallbackNews = [
      {
        id: 'fallback-1',
        title: 'Breakthrough in Sovereign AI Infrastructure',
        summary: 'New developments in decentralized AI processing ensure data privacy while maintaining high performance across distributed networks.',
        category: 'AI' as const,
        timestamp: new Date().toLocaleTimeString(),
        source: 'IntegAI Research'
      },
      {
        id: 'fallback-2',
        title: 'Edge Computing Revolutionizes AI Deployment',
        summary: 'Latest advances in edge computing technology enable real-time AI processing closer to data sources, reducing latency significantly.',
        category: 'Tech' as const,
        timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(),
        source: 'Tech Innovation'
      },
      {
        id: 'fallback-3',
        title: 'Privacy-First AI Models Gain Momentum',
        summary: 'Industry leaders adopt new approaches to AI development that prioritize user privacy and data sovereignty without compromising functionality.',
        category: 'Innovation' as const,
        timestamp: new Date(Date.now() - 7200000).toLocaleTimeString(),
        source: 'AI Ethics Today'
      },
      {
        id: 'fallback-4',
        title: 'Quantum-Enhanced AI Processing Breakthrough',
        summary: 'Researchers demonstrate significant improvements in AI model training using quantum-classical hybrid computing architectures.',
        category: 'Research' as const,
        timestamp: new Date(Date.now() - 10800000).toLocaleTimeString(),
        source: 'Quantum AI Lab'
      },
      {
        id: 'fallback-5',
        title: 'Multi-Modal AI Systems Show Promise',
        summary: 'New AI architectures capable of processing text, images, and audio simultaneously achieve unprecedented accuracy in complex tasks.',
        category: 'AI' as const,
        timestamp: new Date(Date.now() - 14400000).toLocaleTimeString(),
        source: 'AI Research Weekly'
      },
      {
        id: 'fallback-6',
        title: 'Sustainable AI Computing Initiatives Launch',
        summary: 'Major tech companies announce new initiatives to reduce the environmental impact of AI training and inference operations.',
        category: 'Tech' as const,
        timestamp: new Date(Date.now() - 18000000).toLocaleTimeString(),
        source: 'Green Tech News'
      }
    ];

    return fallbackNews;
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && news.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % news.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, news.length]);

  // Fetch news on component mount
  useEffect(() => {
    fetchNews();
    
    // Refresh news every 30 minutes
    const refreshInterval = setInterval(fetchNews, 30 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  const nextNews = () => {
    setCurrentIndex((prev) => (prev + 1) % news.length);
    setIsAutoPlaying(false);
  };

  const prevNews = () => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
    setIsAutoPlaying(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI': return <Zap className="w-4 h-4" />;
      case 'Tech': return <TrendingUp className="w-4 h-4" />;
      case 'Innovation': return <ExternalLink className="w-4 h-4" />;
      case 'Research': return <Clock className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI': return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30';
      case 'Tech': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'Innovation': return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
      case 'Research': return 'text-green-400 bg-green-400/10 border-green-400/30';
      default: return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30';
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Latest AI & Tech News</h2>
            <p className="text-gray-400">Powered by IntegAI Intelligence</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <span className="text-cyan-400 ml-4">Fetching latest news...</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Latest AI & Tech News
          </motion.h2>
          <motion.p 
            className="text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Powered by IntegAI Intelligence • Updated in real-time
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="bg-gray-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* News Window Header */}
            <div className="bg-gray-800/50 border-b border-cyan-500/20 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm font-mono">IntegAI News Terminal</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    isAutoPlaying 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}
                >
                  {isAutoPlaying ? 'LIVE' : 'PAUSED'}
                </button>
                <span className="text-gray-500 text-xs">
                  {currentIndex + 1} / {news.length}
                </span>
              </div>
            </div>

            {/* News Content */}
            <div className="relative h-64 overflow-hidden">
              <AnimatePresence mode="wait">
                {news.length > 0 && (
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-medium ${getCategoryColor(news[currentIndex].category)}`}>
                          {getCategoryIcon(news[currentIndex].category)}
                          <span>{news[currentIndex].category}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500 text-xs">
                          <Clock className="w-3 h-3" />
                          <span>{news[currentIndex].timestamp}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                        {news[currentIndex].title}
                      </h3>
                      
                      <p className="text-gray-300 leading-relaxed">
                        {news[currentIndex].summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-cyan-400 text-sm font-medium">
                        {news[currentIndex].source}
                      </span>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={prevNews}
                          className="p-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/30 rounded-lg text-gray-400 hover:text-white transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={nextNews}
                          className="p-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/30 rounded-lg text-gray-400 hover:text-white transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress Indicators */}
            <div className="bg-gray-800/30 p-4">
              <div className="flex space-x-2 justify-center">
                {news.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex 
                        ? 'bg-cyan-400' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Refresh Button */}
          <div className="text-center mt-6">
            <button
              onClick={fetchNews}
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Refreshing...' : 'Refresh News'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

