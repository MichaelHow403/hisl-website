import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Zap, Globe, Info, X, TrendingUp, TrendingDown } from 'lucide-react';
import { energyService } from '../utils/energyService';

export default function EnergyAwarenessOverlay({ isVisible, onClose, regionCode = 'IE', promptType = 'simple' }) {
  const [energyData, setEnergyData] = useState(null);
  const [gridStatus, setGridStatus] = useState(null);
  const [regionComparison, setRegionComparison] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isVisible) {
      loadEnergyData();
    }
  }, [isVisible, regionCode, promptType]);

  const loadEnergyData = async () => {
    setLoading(true);
    try {
      const [emissions, status, comparison] = await Promise.all([
        energyService.calculatePromptEmissions(promptType, regionCode),
        energyService.getGridStatus(regionCode),
        energyService.getRegionComparison()
      ]);
      
      setEnergyData(emissions);
      setGridStatus(status);
      setRegionComparison(comparison.slice(0, 5)); // Top 5 cleanest regions
    } catch (error) {
      console.error('Failed to load energy data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-900/95 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Leaf className="w-8 h-8 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Energy Awareness</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-300">Loading energy data...</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Current Prompt Impact */}
              {energyData && (
                <div className="bg-gray-800/50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Your Prompt Impact
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                      <div className="text-2xl font-bold text-cyan-400">
                        {energyService.formatEnergy(energyData.energyConsumption)}
                      </div>
                      <div className="text-sm text-gray-400">Energy Used</div>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                      <div className="text-2xl font-bold text-orange-400">
                        {energyService.formatEmissions(energyData.co2Emissions)}
                      </div>
                      <div className="text-sm text-gray-400">CO₂ Emissions</div>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-700/30 rounded-lg">
                      <div className="text-2xl font-bold text-green-400">
                        {energyData.renewablePercentage}%
                      </div>
                      <div className="text-sm text-gray-400">Renewable Energy</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-400">
                    <div className="flex items-center justify-between">
                      <span>Region: {energyData.region}</span>
                      <span>Carbon Intensity: {energyData.carbonIntensity} gCO₂/kWh</span>
                    </div>
                    <div className="mt-1 text-xs">
                      Data source: {energyData.source === 'electricitymap' ? 'ElectricityMap API' : 'Static fallback'}
                    </div>
                  </div>
                </div>
              )}

              {/* Grid Status */}
              {gridStatus && (
                <div className="bg-gray-800/50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Current Grid Status
                  </h3>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-4 h-4 rounded-full ${
                      gridStatus.statusColor === 'green' ? 'bg-green-400' :
                      gridStatus.statusColor === 'yellow' ? 'bg-yellow-400' : 'bg-red-400'
                    }`}></div>
                    <span className="text-white font-semibold">{gridStatus.statusMessage}</span>
                    <div className="flex items-center space-x-1">
                      {gridStatus.sustainabilityScore >= 70 ? (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      )}
                      <span className="text-sm text-gray-400">
                        Sustainability Score: {gridStatus.sustainabilityScore}/100
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Renewable Energy</span>
                      <span className="text-green-400 font-semibold">{gridStatus.renewablePercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${gridStatus.renewablePercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Regional Comparison */}
              {regionComparison.length > 0 && (
                <div className="bg-gray-800/50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Cleanest Data Centers
                  </h3>
                  
                  <div className="space-y-3">
                    {regionComparison.map((region, index) => (
                      <div key={region.region} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? 'bg-green-500 text-white' :
                            index === 1 ? 'bg-yellow-500 text-black' :
                            index === 2 ? 'bg-orange-500 text-white' : 'bg-gray-500 text-white'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="text-white font-medium">{region.region}</span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="text-center">
                            <div className="text-green-400 font-semibold">{region.renewablePercentage}%</div>
                            <div className="text-gray-400">Renewable</div>
                          </div>
                          <div className="text-center">
                            <div className="text-orange-400 font-semibold">{region.carbonIntensity}</div>
                            <div className="text-gray-400">gCO₂/kWh</div>
                          </div>
                          <div className="text-center">
                            <div className="text-cyan-400 font-semibold">
                              {energyService.formatEmissions(region.promptEmissions)}
                            </div>
                            <div className="text-gray-400">Per prompt</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Environmental Context */}
              <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl p-6 border border-green-500/20">
                <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  Environmental Context
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Why This Matters</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• AI processing requires significant energy</li>
                      <li>• Data center location affects carbon footprint</li>
                      <li>• Renewable energy reduces environmental impact</li>
                      <li>• Sovereign infrastructure enables green choices</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-white mb-2">IntegAI's Commitment</h4>
                    <ul className="space-y-1 text-gray-300">
                      <li>• Prioritize renewable energy data centers</li>
                      <li>• Transparent energy consumption reporting</li>
                      <li>• Efficient model architectures</li>
                      <li>• Carbon offset programs</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-green-900/20 rounded-lg border border-green-500/20">
                  <p className="text-green-300 text-sm">
                    <strong>Tip:</strong> Choose data centers in regions with high renewable energy percentages 
                    to minimize your AI carbon footprint. IntegAI automatically routes to the cleanest available infrastructure.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 pt-4">
                <button
                  onClick={loadEnergyData}
                  className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
                >
                  🔄 Refresh Data
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

