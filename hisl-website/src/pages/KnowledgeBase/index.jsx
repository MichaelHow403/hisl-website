import { Link } from 'react-router-dom';

const resources = [
  { title: 'GDPR Compliance in Construction AI', type: 'article', category: 'Compliance' },
  { title: 'Building Information Modeling with ML', type: 'video', category: 'Technology' },
  { title: 'Risk Assessment Automation Guide', type: 'guide', category: 'Safety' },
  { title: 'NIS2 Directive Implementation', type: 'article', category: 'Compliance' },
  { title: 'AI Agent Architecture Patterns', type: 'guide', category: 'Technology' },
  { title: 'Construction Site Safety ML Models', type: 'article', category: 'Safety' },
];

const KnowledgeBase = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8">
          ← Back to Control
        </Link>
        
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Knowledge Base
        </h1>
        <p className="text-gray-400 mb-8">AI-powered construction intelligence resources</p>
        
        <div className="mb-8">
          <input
            type="text"
            placeholder="Ask anything about construction AI..."
            className="w-full p-4 bg-black/50 border border-cyan-500/30 rounded-lg text-white"
          />
        </div>
        
        <div className="flex gap-2 mb-8">
          {['All', 'Compliance', 'Technology', 'Safety'].map(category => (
            <button
              key={category}
              className="px-4 py-2 bg-black/50 border border-cyan-500/30 rounded-lg hover:border-cyan-500 transition-all"
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="space-y-4">
          {resources.map((resource) => (
            <div key={resource.title} className="bg-black/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-500/50 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                  <div className="flex gap-2 text-sm">
                    <span className="text-gray-400">{resource.type}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-400">{resource.category}</span>
                  </div>
                </div>
                <button className="text-cyan-400 hover:text-cyan-300">
                  View →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
