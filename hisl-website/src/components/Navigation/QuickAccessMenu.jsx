import { Link } from 'react-router-dom';

const QuickAccessMenu = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed bottom-20 right-8 z-50 bg-black/90 backdrop-blur-md border border-cyan-500/30 rounded-lg p-4 min-w-[200px]">
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-white text-sm"
      >
        ✕
      </button>
      
      <div className="space-y-3 mt-4">
        <Link
          to="/projects"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors"
        >
          <span>📁</span>
          <span>Projects Hub</span>
        </Link>
        
        <Link
          to="/knowledge"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors"
        >
          <span>📚</span>
          <span>Knowledge Base</span>
        </Link>
        
        <Link
          to="/strategy-live"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors"
        >
          <span>📡</span>
          <span>Strategy LIVE</span>
        </Link>
      </div>
    </div>
  );
};

export default QuickAccessMenu;
