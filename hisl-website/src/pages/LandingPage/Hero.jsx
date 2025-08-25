const Hero = () => {
  const scrollToGlobe = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIxMjEyMSIgb3BhY2l0eT0iMC4yIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+)] opacity-20"></div>
      <div className="text-center z-10 relative px-4">
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-green-400 text-sm font-mono uppercase tracking-wider">System Online</span>
        </div>
        <h1 className="text-7xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-fade-in">
          HISL CONTROL
        </h1>
        <p className="text-xl md:text-2xl mb-2 text-gray-300">Sovereign AI Infrastructure for Construction</p>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Building the future where artificial intelligence meets construction excellence.
          GDPR-compliant, NIS2-ready, Irish-sovereign.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="https://www.linkedin.com/in/michaelhowardconstruction" target="_blank" rel="noopener noreferrer" 
             className="px-8 py-3 bg-cyan-500/10 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-all duration-300 hover:scale-105">
            LinkedIn
          </a>
          <a href="https://hisl.substack.com" target="_blank" rel="noopener noreferrer"
             className="px-8 py-3 bg-cyan-500/10 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-all duration-300 hover:scale-105">
            Substack
          </a>
          <button 
            onClick={scrollToGlobe}
            className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:scale-105 hover:shadow-cyan-500/50">
            Deploy Agent
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};
export default Hero;
