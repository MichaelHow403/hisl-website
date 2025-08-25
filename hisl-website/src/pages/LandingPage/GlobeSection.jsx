const GlobeSection = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Where Your Prompts Go
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Watch your queries travel through sovereign Irish infrastructure, 
          guided by Huginn and Muninn, returning with GDPR-compliant intelligence.
        </p>
        <div className="relative">
          <div className="aspect-video bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-cyan-500/30 animate-spin-slow"></div>
                <p className="text-cyan-400">Interactive 3D Globe Coming Soon</p>
              </div>
            </div>
          </div>
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/20">
            <h3 className="text-cyan-400 font-bold mb-2">🦅 Huginn & Muninn</h3>
            <p className="text-xs text-gray-400 max-w-xs">
              Like Odins ravens, our AI agents traverse the digital realm, 
              gathering wisdom while maintaining complete data sovereignty.
            </p>
          </div>
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/20">
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Dublin Server: Online</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>GDPR: Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Latency: 12ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GlobeSection;
