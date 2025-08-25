const ContactModal = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 border border-cyan-500/30 rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Contact HISL</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-black/50 border border-cyan-500/30 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-black/50 border border-cyan-500/30 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Message</label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 bg-black/50 border border-cyan-500/30 rounded-lg text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
