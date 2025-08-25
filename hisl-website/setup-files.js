const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const dirs = [
  'src/pages/LandingPage',
  'src/pages/ProjectsHub',
  'src/pages/KnowledgeBase', 
  'src/pages/StrategyLive',
  'src/components/Navigation',
  'src/components/Globe',
  'src/components/shared'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Hero.jsx
const heroContent = `import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>
      
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center mb-4">
            <span className="text-hisl-cyan text-sm font-mono">
              ● SYSTEM ONLINE
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-glow">
            HISL CONTROL
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-8">
            Sovereign AI Infrastructure for Construction
          </p>
          
          <p className="text-lg max-w-3xl mx-auto text-gray-300 mb-12">
            Building the future where artificial intelligence meets construction excellence. 
            GDPR-compliant, NIS2-ready, Irish-sovereign.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://www.linkedin.com/in/michaelhowardconstruction" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-hisl-cyan/20 border border-hisl-cyan rounded-lg hover:bg-hisl-cyan/30 transition-all">
              LinkedIn
            </a>
            <a href="https://hisl.substack.com" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-hisl-cyan/20 border border-hisl-cyan rounded-lg hover:bg-hisl-cyan/30 transition-all">
              Substack
            </a>
            <button className="px-8 py-3 bg-hisl-cyan text-black font-bold rounded-lg hover:bg-hisl-cyan/80 transition-all">
              Deploy Agent
            </button>
          </div>
        </motion.div>
        
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-8 h-8 text-hisl-cyan/50" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;`;

// KnowledgeBase index.jsx
const knowledgeBaseContent = `import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Book, FileText, Video, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const resources = [
  { id: 1, title: 'GDPR Compliance in Construction AI', type: 'article', category: 'Compliance' },
  { id: 2, title: 'Building Information Modeling with ML', type: 'video', category: 'Technology' },
  { id: 3, title: 'Risk Assessment Automation Guide', type: 'guide', category: 'Safety' },
  { id: 4, title: 'NIS2 Directive Implementation', type: 'article', category: 'Compliance' },
  { id: 5, title: 'AI Agent Architecture Patterns', type: 'guide', category: 'Technology' },
  { id: 6, title: 'Construction Site Safety ML Models', type: 'article', category: 'Safety' },
];

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const getIcon = (type) => {
    switch(type) {
      case 'article': return <FileText className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'guide': return <Book className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-hisl-cyan hover:underline mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Control
        </Link>
        
        <h1 className="text-4xl font-bold mb-4">Knowledge Base</h1>
        <p className="text-gray-400 mb-8">AI-powered construction intelligence resources</p>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Ask anything about construction AI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-4 bg-black/50 border border-hisl-cyan/30 rounded-lg focus:border-hisl-cyan outline-none text-lg"
            />
          </div>
        </div>

        <div className="flex gap-2 mb-8">
          {['All', 'Compliance', 'Technology', 'Safety'].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={\`px-4 py-2 rounded-lg transition-all \${
                selectedCategory === category 
                  ? 'bg-hisl-cyan text-black font-bold' 
                  : 'bg-black/50 border border-hisl-cyan/30 hover:border-hisl-cyan'
              }\`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/50 backdrop-blur-sm border border-hisl-cyan/30 rounded-lg p-6 hover:border-hisl-cyan transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="text-hisl-cyan">
                    {getIcon(resource.type)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                    <div className="flex gap-2 text-sm">
                      <span className="text-gray-400">{resource.type}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-400">{resource.category}</span>
                    </div>
                  </div>
                </div>
                <button className="text-hisl-cyan hover:underline flex items-center gap-1">
                  View <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="https://notion.so/hisl" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-hisl-cyan text-black font-bold rounded-lg hover:bg-hisl-cyan/80 transition-all">
            View Full Knowledge Base in Notion
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;`;

// StrategyLive index.jsx
const strategyLiveContent = `import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Rss, Linkedin, MessageSquare, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const StrategyLive = () => {
  const [activeTab, setActiveTab] = useState('substack');

  const insights = [
    { id: 1, title: 'AI Transformation in Irish Construction', date: '2 days ago', source: 'Substack' },
    { id: 2, title: 'GDPR Compliance Framework Update', date: '1 week ago', source: 'LinkedIn' },
    { id: 3, title: 'Q1 2025 Construction Tech Trends', date: '2 weeks ago', source: 'Substack' },
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-hisl-cyan hover:underline mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Control
        </Link>
        
        <h1 className="text-4xl font-bold mb-4">Strategy LIVE</h1>
        <p className="text-gray-400 mb-8">Real-time insights from HISL thought leadership</p>

        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('substack')}
            className={\`px-4 py-2 rounded-lg transition-all flex items-center gap-2 \${
              activeTab === 'substack' 
                ? 'bg-hisl-cyan text-black font-bold' 
                : 'bg-black/50 border border-hisl-cyan/30 hover:border-hisl-cyan'
            }\`}
          >
            <Rss className="w-4 h-4" />
            Substack
          </button>
          <button
            onClick={() => setActiveTab('linkedin')}
            className={\`px-4 py-2 rounded-lg transition-all flex items-center gap-2 \${
              activeTab === 'linkedin' 
                ? 'bg-hisl-cyan text-black font-bold' 
                : 'bg-black/50 border border-hisl-cyan/30 hover:border-hisl-cyan'
            }\`}
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-black/50 backdrop-blur-sm border border-hisl-cyan/30 rounded-lg p-8 min-h-[400px]">
              <div className="text-center text-gray-400">
                <p className="mb-4">
                  {activeTab === 'substack' 
                    ? 'Substack feed will be embedded here'
                    : 'LinkedIn feed will be embedded here'}
                </p>
                <a href={activeTab === 'substack' ? 'https://hisl.substack.com' : 'https://www.linkedin.com/in/michaelhowardconstruction'} target="_blank" rel="noopener noreferrer" className="text-hisl-cyan hover:underline">
                  View on {activeTab === 'substack' ? 'Substack' : 'LinkedIn'} →
                </a>
              </div>
            </div>

            <div className="mt-6">
              <div className="bg-black/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 font-bold">AI Summary</span>
                </div>
                <input
                  type="text"
                  placeholder="Ask IntegAI to summarize latest insights..."
                  className="w-full px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg focus:border-purple-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-hisl-cyan" />
              Featured Insights
            </h3>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/50 backdrop-blur-sm border border-hisl-cyan/30 rounded-lg p-4 hover:border-hisl-cyan transition-all"
                >
                  <h4 className="font-bold mb-1">{insight.title}</h4>
                  <div className="text-sm text-gray-400">
                    {insight.date} • {insight.source}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <a href="https://hisl.substack.com/subscribe" target="_blank" rel="noopener noreferrer" className="block w-full text-center px-4 py-3 bg-orange-500/20 border border-orange-500 rounded-lg hover:bg-orange-500/30 transition-all">
                Subscribe on Substack
              </a>
              <a href="https://www.linkedin.com/in/michaelhowardconstruction" target="_blank" rel="noopener noreferrer" className="block w-full text-center px-4 py-3 bg-blue-500/20 border border-blue-500 rounded-lg hover:bg-blue-500/30 transition-all">
                Follow on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyLive;`;

// Write the files
fs.writeFileSync('src/pages/LandingPage/Hero.jsx', heroContent);
fs.writeFileSync('src/pages/KnowledgeBase/index.jsx', knowledgeBaseContent);
fs.writeFileSync('src/pages/StrategyLive/index.jsx', strategyLiveContent);

console.log('✅ Files created successfully!');
