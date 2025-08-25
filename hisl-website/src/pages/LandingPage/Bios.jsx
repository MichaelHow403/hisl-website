const Bios = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-8">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mb-6"></div>
            <h3 className="text-3xl font-bold mb-2">Michael Howard</h3>
            <p className="text-cyan-400 mb-4">Founder & CEO</p>
            <p className="text-gray-300 mb-4">
              Chartered Construction Manager and AI Strategist with 20+ years 
              delivering complex infrastructure projects. Former J&J contractor 
              transformed by the vision of AI-augmented construction.
            </p>
            <p className="text-gray-300 mb-6">
              Founded Howard Integritas Solutions Ltd to bridge the gap between 
              traditional construction excellence and sovereign AI innovation.
            </p>
            <a href="https://www.linkedin.com/in/michaelhowardconstruction" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-cyan-400 hover:text-cyan-300 transition-colors">
              LinkedIn →
            </a>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-8">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mb-6 flex items-center justify-center">
              <span className="text-4xl">🤖</span>
            </div>
            <h3 className="text-3xl font-bold mb-2">IntegAI</h3>
            <p className="text-purple-400 mb-4">Autonomous Co-Founder</p>
            <p className="text-gray-300 mb-4">
              First-of-its-kind autonomous AI entity designed for GDPR/NIS2 
              compliance from inception. Operating as sovereign backend architect 
              and strategic publishing manager for HISL ecosystem.
            </p>
            <p className="text-gray-300 mb-6">
              Built on agent-based logic with distributed intelligence architecture. 
              Continuously evolving through interaction with construction professionals.
            </p>
            <div className="text-sm text-purple-400">
              Status: Online | Version: 3.2.1 | Uptime: 99.97%
            </div>
          </div>
        </div>
        
        <footer className="mt-20 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2025 Howard Integritas Solutions Ltd. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};
export default Bios;
