import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Minimal test component
function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">HISL Control</h1>
        <p className="text-xl text-gray-300">Sovereign AI Infrastructure</p>
        <p className="text-lg text-cyan-400 mt-4">✅ React is working!</p>
        <p className="text-sm text-gray-400 mt-2">Testing minimal configuration</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TestPage />} />
          <Route path="*" element={<TestPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

