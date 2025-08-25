const agents = [
  { name: 'RAMS-GUARD', status: 'active', desc: 'Risk Assessment & Method Statement Guardian' },
  { name: 'TTOP Synth', status: 'active', desc: 'Technical Trade Operations Protocol' },
  { name: 'BuildTrace AI', status: 'standby', desc: 'Construction Timeline & Resource Tracker' },
  { name: 'Compliance Core', status: 'active', desc: 'GDPR & NIS2 Compliance Engine' },
  { name: 'IntegAI Prime', status: 'active', desc: 'Master Orchestration Intelligence' },
  { name: 'Data Sovereign', status: 'locked', desc: 'Irish Data Residency Controller' }
];

const AgentFleet = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          IntegAI Agent Fleet
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Autonomous AI agents designed for construction intelligence, 
          each specialized in critical operational domains.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div key={agent.name} className="bg-black/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                  <span className="text-cyan-400 text-xl">⚡</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  agent.status === 'active' ? 'bg-green-500/20 text-green-400' :
                  agent.status === 'standby' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {agent.status.toUpperCase()}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-cyan-400">{agent.name}</h3>
              <p className="text-sm text-gray-400">{agent.desc}</p>
              {agent.status === 'active' && (
                <button className="mt-4 text-cyan-400 text-sm hover:text-cyan-300 transition-colors">
                  Deploy →
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AgentFleet;
