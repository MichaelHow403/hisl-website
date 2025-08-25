import { Link } from 'react-router-dom';

const insights = [
  { title: 'AI Transformation in Irish Construction', date: '2 days ago', source: 'Substack' },
  { title: 'GDPR Compliance Framework Update', date: '1 week ago', source: 'LinkedIn' },
  { title: 'Q1 2025 Construction Tech Trends', date: '2 weeks ago', source: 'Substack' },
];

const StrategyLive = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8">
          ← Back to Control
        </Link>
        
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Strategy LIVE
        </h1>
        <p className="text-gray-400 mb-8">Real-time insights from HISL thought leadership</p>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-black/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-8 min-h-[400px]">
              <div className="text-center text-gray-400">
                <p className="mb-4">Substack feed will be embedded here</p>
                <a href="https://hisl.substack.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
                  View on Substack →
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">📈 Featured Insights</h3>
            <div className="space-y-4">
              {insights.map((insight) => (
                <div key={insight.title} className="bg-black/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/50 transition-all">
                  <h4 className="font-bold mb-1">{insight.title}</h4>
                  <div className="text-sm text-gray-400">
                    {insight.date} • {insight.source}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyLive;
