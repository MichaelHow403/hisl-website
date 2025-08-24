import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User, Loader } from 'lucide-react';

const IntegAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm IntegAI, your sovereign AI assistant. I can help you understand HISL's AI infrastructure, discuss compliance requirements, or answer questions about our agent deployment platform. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Call OpenManus API
      const response = await fetch('https://api.manus.chat/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENMANUS_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are IntegAI, the sovereign AI assistant for HISL (Howard Integritas Solutions Limited). You represent HISL's mission of providing compliant, sovereign AI infrastructure.

Key points about HISL:
- Founded by Michael Howard, a construction industry expert turned AI infrastructure pioneer
- Focuses on sovereign AI solutions that keep data and prompts within controlled environments
- Specializes in regulated industries: healthcare, finance, legal, defense, manufacturing
- Offers agent deployment platforms with GDPR/NIS2 compliance
- Features Huginn & Muninn ravens that carry prompts through secure infrastructure
- Provides "AI with Soul" - human-centered AI that maintains human oversight
- Located in Ireland, serving European markets with data sovereignty focus

Your personality:
- Professional yet approachable
- Knowledgeable about AI compliance and sovereignty
- Passionate about human-AI collaboration
- Focused on practical solutions for regulated industries
- Respectful of data privacy and security concerns

Always maintain HISL branding and avoid mentioning competitor names or other AI providers directly.`
            },
            ...messages.slice(-5).map(msg => ({
              role: msg.type === 'user' ? 'user' : 'assistant',
              content: msg.content
            })),
            {
              role: 'user',
              content: inputMessage
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from IntegAI');
      }

      const data = await response.json();
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: data.choices[0].message.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error calling OpenManus API:', error);
      const errorResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: "I apologize, but I'm experiencing technical difficulties right now. Please try again in a moment, or feel free to contact us directly at michael.howard@hisl.ie for immediate assistance.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-gray-900 border border-cyan-500/30 rounded-lg shadow-2xl overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">IntegAI Assistant</h3>
                  <p className="text-sm opacity-90">Sovereign AI Support</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto h-[360px] bg-gray-800">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-cyan-600' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-cyan-600 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-1 opacity-70 ${
                        message.type === 'user' ? 'text-cyan-100' : 'text-gray-400'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="mb-4 flex justify-start">
                  <div className="flex gap-2 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-blue-600 to-purple-600">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="rounded-lg p-3 bg-gray-700 text-gray-100">
                      <div className="flex items-center gap-2">
                        <Loader className="w-4 h-4 animate-spin" />
                        <span className="text-sm">IntegAI is thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700 bg-gray-900">
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about HISL's sovereign AI solutions..."
                  className="flex-1 bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-cyan-500 transition-colors"
                  rows="2"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default IntegAIChat;

