import React, { useState } from 'react';

const DeepSeekChat = ({ onPulseChange }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse('');
    
    // Trigger pulse visualization
    if (onPulseChange) {
      onPulseChange(true);
    }
    
    try {
      const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer sk-3bfecdbb798e441e82899dfabfd39ec6`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: prompt }],
          stream: false
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching from DeepSeek API:', error);
      setResponse('Error: Could not get a response from DeepSeek API.');
    } finally {
      setLoading(false);
      // Stop pulse visualization after a delay
      setTimeout(() => {
        if (onPulseChange) {
          onPulseChange(false);
        }
      }, 3000);
    }
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6 max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-cyan-400 mb-4">
        Ask DeepSeek AI
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt to see the flow..."
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none resize-none font-mono"
            rows={3}
            disabled={loading}
          />
        </div>
        
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-mono glow"
        >
          {loading ? 'Sending...' : 'Send →'}
        </button>
      </form>

      {response && (
        <div className="mt-4 p-4 bg-gray-800/50 border border-gray-600 rounded-lg">
          <h4 className="text-cyan-400 font-semibold mb-2">DeepSeek Response:</h4>
          <div className="text-gray-300 whitespace-pre-wrap">{response}</div>
        </div>
      )}
      
      <p className="text-xs text-gray-400 text-center mt-4">
        Server Status: Dublin ✓ | Jurisdiction: Ireland | Latency: &lt;50ms
      </p>
    </div>
  );
};

export default DeepSeekChat;


