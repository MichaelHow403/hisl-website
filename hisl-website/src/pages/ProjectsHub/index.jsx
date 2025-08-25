import { Link } from 'react-router-dom';

const projects = [
  { name: 'Dublin Port Expansion', region: 'Dublin', status: 'Active', ai: true },
  { name: 'Cork Smart Housing', region: 'Cork', status: 'Planning', ai: true },
  { name: 'Galway Tech Campus', region: 'Galway', status: 'Active', ai: false },
  { name: 'Belfast Bridge Retrofit', region: 'Belfast', status: 'Complete', ai: true },
  { name: 'Limerick Data Center', region: 'Limerick', status: 'Active', ai: true },
  { name: 'Waterford Marina', region: 'Waterford', status: 'Planning', ai: false },
  { name: 'Sligo Wind Farm', region: 'Sligo', status: 'Active', ai: true },
  { name: 'Kilkenny Heritage Site', region: 'Kilkenny', status: 'Complete', ai: false },
  { name: 'Derry Innovation Hub', region: 'Derry', status: 'Planning', ai: true },
];

const ProjectsHub = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8">
          ← Back to Control
        </Link>
        
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Projects Hub
        </h1>
        <p className="text-gray-400 mb-8">Active construction projects with AI integration status</p>
        
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full p-4 bg-black/50 border border-cyan-500/30 rounded-lg text-white"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.name} className="bg-black/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-500/50 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  project.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                  project.status === 'Planning' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {project.status}
                </span>
                {project.ai && (
                  <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-full">
                    AI-Enabled
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">{project.name}</h3>
              <p className="text-sm text-gray-400">📍 {project.region}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsHub;
