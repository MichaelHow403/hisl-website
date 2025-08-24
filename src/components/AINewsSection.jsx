import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Clock, TrendingUp, Zap } from 'lucide-react';

export default function AINewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

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
          query: 'latest AI technology news artificial intelligence machine learning 2025',
          maxResults: 6
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.news && Array.isArray(data.news)) {
        setNews(data.news);
      } else {
        // Fallback to simulated news if API fails
        setNews(getFallbackNews());
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(err.message);
      // Use fallback news on error
      setNews(getFallbackNews());
    } finally {
      setLoading(false);
    }
  };

  // Fallback news data
  const getFallbackNews = () => [
    {
      id: '1',
      title: 'Sovereign AI Infrastructure Gains Momentum in Enterprise',
      summary: 'Organizations increasingly adopt on-premises AI solutions to maintain data sovereignty and comply with regulations like GDPR and NIS2.',
      category: 'AI',
      timestamp: new Date().toISOString(),
      source: 'IntegAI Intelligence',
      url: '#'
    },
    {
      id: '2',
      title: 'Edge Computing Revolutionizes AI Deployment Models',
      summary: 'New edge computing architectures enable real-time AI processing while reducing latency and improving data privacy.',
      category: 'Tech',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      source: 'IntegAI Intelligence',
      url: '#'
    },
    {
      id: '3',
      title: 'Regulatory Compliance Drives AI Architecture Decisions',
      summary: 'European regulations push enterprises toward sovereign AI solutions that keep sensitive data within controlled environments.',
      category: 'Innovation',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      source: 'IntegAI Intelligence',
      url: '#'
    },
    {
      id: '4',
      title: 'Human-in-the-Loop AI Systems Show Superior Performance',
      summary: 'Research demonstrates that AI systems with human oversight achieve better outcomes in critical decision-making scenarios.',
      category: 'Research',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      source: 'IntegAI Intelligence',
      url: '#'
    },
    {
      id: '5',
      title: 'Construction Industry Embraces AI-Powered Project Management',
      summary: 'AI agents are transforming construction workflows, from planning and compliance to real-time project monitoring.',
      category: 'AI',
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      source: 'IntegAI Intelligence',
      url: '#'
    },
    {
      id: '6',
      title: 'Zero-Trust AI Architectures Emerge as Security Standard',
      summary: 'New security frameworks ensure AI systems operate with minimal trust assumptions and maximum verification.',
      category: 'Tech',
      timestamp: new Date(Date.now() - 18000000).toISOString(),
      source: 'IntegAI Intelligence',
      url: '#'
    }
  ];

  // Auto-rotation effect
  useEffect(() => {
    if (isAutoPlaying && news.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % news.length);
      }, 5000); // Change every 5 seconds
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
  }, []);

  const nextNews = () => {
    setCurrentIndex((prev) => (prev + 1) % news.length);
    setIsAutoPlaying(false);
  };

  const prevNews = () => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
    setIsAutoPlaying(false);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'AI': return <Zap className="w-4 h-4" />;
      case 'Tech': return <TrendingUp className="w-4 h-4" />;
      case 'Innovation': return <ExternalLink className="w-4 h-4" />;
      case 'Research': return <Clock className="w-4 h-4" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'AI': return 'text-cyan-400 bg-cyan-400/10';
      case 'Tech': return 'text-blue-400 bg-blue-400/10';
      case 'Innovation': return 'text-purple-400 bg-purple-400/10';
      case 'Research': return 'text-green-400 bg-green-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                AI & TECH NEWS
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Latest developments in artificial intelligence and technology
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-700 rounded mb-4"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error && news.length === 0) {
    return (
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                AI & TECH NEWS
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Latest developments in artificial intelligence and technology
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 text-center">
              <p className="text-red-400 mb-4">Unable to load latest news</p>
              <button 
                onClick={fetchNews}
                className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const currentNews = news[currentIndex];

  return (
    <section className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              AI & TECH NEWS
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Latest developments in artificial intelligence and technology
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* News Terminal Window */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="bg-gray-800/90 px-6 py-4 border-b border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-gray-300 font-mono text-sm">
                    IntegAI News Terminal
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-mono">LIVE</span>
                  </div>
                  <div className="text-gray-400 text-sm">
                    {currentIndex + 1} / {news.length}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                Powered by IntegAI Intelligence • Updated in real-time
              </div>
            </div>

            {/* News Content */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Category and Time */}
                  <div className="flex items-center justify-between">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(currentNews?.category)}`}>
                      {getCategoryIcon(currentNews?.category)}
                      <span>{currentNews?.category}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{formatTimeAgo(currentNews?.timestamp)}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                    {currentNews?.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {currentNews?.summary}
                  </p>

                  {/* Source and Link */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                    <div className="text-sm text-gray-400">
                      Source: {currentNews?.source || 'IntegAI Intelligence'}
                    </div>
                    {currentNews?.url && currentNews.url !== '#' && (
                      <a
                        href={currentNews.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <span>Read More</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700/50">
                <button
                  onClick={prevNews}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex space-x-2">
                  {news.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentIndex(index);
                        setIsAutoPlaying(false);
                      }}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex ? 'bg-cyan-400' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextNews}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Auto-play Toggle */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`text-sm px-3 py-1 rounded transition-colors ${
                    isAutoPlaying 
                      ? 'text-green-400 bg-green-400/10' 
                      : 'text-gray-400 bg-gray-400/10'
                  }`}
                >
                  {isAutoPlaying ? 'Auto-playing' : 'Paused'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

