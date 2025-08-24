// Energy awareness service for CO2 and energy metrics
// Uses electricitymap.org API with fallback to static data

// Fallback energy data for different regions (gCO2/kWh)
const fallbackEnergyData = {
  'IE': { // Ireland
    carbonIntensity: 320,
    renewablePercentage: 35,
    region: 'Ireland',
    lastUpdated: new Date().toISOString()
  },
  'GB': { // United Kingdom
    carbonIntensity: 280,
    renewablePercentage: 42,
    region: 'United Kingdom',
    lastUpdated: new Date().toISOString()
  },
  'DE': { // Germany
    carbonIntensity: 350,
    renewablePercentage: 45,
    region: 'Germany',
    lastUpdated: new Date().toISOString()
  },
  'US-VA': { // Virginia, USA
    carbonIntensity: 400,
    renewablePercentage: 25,
    region: 'Virginia, USA',
    lastUpdated: new Date().toISOString()
  },
  'US-OR': { // Oregon, USA
    carbonIntensity: 180,
    renewablePercentage: 75,
    region: 'Oregon, USA',
    lastUpdated: new Date().toISOString()
  },
  'JP': { // Japan
    carbonIntensity: 450,
    renewablePercentage: 20,
    region: 'Japan',
    lastUpdated: new Date().toISOString()
  },
  'SG': { // Singapore
    carbonIntensity: 420,
    renewablePercentage: 15,
    region: 'Singapore',
    lastUpdated: new Date().toISOString()
  },
  'AU': { // Australia
    carbonIntensity: 520,
    renewablePercentage: 28,
    region: 'Australia',
    lastUpdated: new Date().toISOString()
  }
};

// Estimated energy consumption per AI prompt (kWh)
const PROMPT_ENERGY_CONSUMPTION = {
  'simple': 0.0001, // Simple text processing
  'complex': 0.0005, // Complex analysis
  'multimodal': 0.001, // Image/video processing
  'training': 0.01 // Model training/fine-tuning
};

class EnergyService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Get energy data for a specific region
  async getEnergyData(regionCode) {
    const cacheKey = `energy_${regionCode}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      // Try to fetch from electricitymap.org API
      const response = await fetch(`https://api.electricitymap.org/v3/carbon-intensity/latest?zone=${regionCode}`, {
        headers: {
          'auth-token': process.env.ELECTRICITY_MAP_API_KEY || 'demo'
        }
      });

      if (response.ok) {
        const data = await response.json();
        const energyData = {
          carbonIntensity: data.carbonIntensity,
          renewablePercentage: data.renewablePercentage || 0,
          region: regionCode,
          lastUpdated: data.datetime,
          source: 'electricitymap'
        };
        
        this.cache.set(cacheKey, {
          data: energyData,
          timestamp: Date.now()
        });
        
        return energyData;
      }
    } catch (error) {
      console.warn('Failed to fetch from electricitymap API, using fallback data');
    }

    // Fallback to static data
    const fallbackData = fallbackEnergyData[regionCode] || fallbackEnergyData['IE'];
    fallbackData.source = 'fallback';
    
    this.cache.set(cacheKey, {
      data: fallbackData,
      timestamp: Date.now()
    });
    
    return fallbackData;
  }

  // Calculate CO2 emissions for a prompt
  calculatePromptEmissions(promptType = 'simple', regionCode = 'IE') {
    return new Promise(async (resolve) => {
      try {
        const energyData = await this.getEnergyData(regionCode);
        const energyConsumption = PROMPT_ENERGY_CONSUMPTION[promptType] || PROMPT_ENERGY_CONSUMPTION['simple'];
        
        // Calculate CO2 emissions (gCO2)
        const co2Emissions = energyConsumption * energyData.carbonIntensity;
        
        resolve({
          energyConsumption: energyConsumption,
          co2Emissions: co2Emissions,
          carbonIntensity: energyData.carbonIntensity,
          region: energyData.region,
          renewablePercentage: energyData.renewablePercentage,
          lastUpdated: energyData.lastUpdated,
          source: energyData.source
        });
      } catch (error) {
        // Ultra-safe fallback
        resolve({
          energyConsumption: 0.0001,
          co2Emissions: 0.032, // 0.0001 kWh * 320 gCO2/kWh
          carbonIntensity: 320,
          region: 'Ireland (fallback)',
          renewablePercentage: 35,
          lastUpdated: new Date().toISOString(),
          source: 'fallback'
        });
      }
    });
  }

  // Get energy comparison between regions
  async getRegionComparison() {
    const regions = Object.keys(fallbackEnergyData);
    const comparisons = [];

    for (const region of regions) {
      try {
        const data = await this.getEnergyData(region);
        comparisons.push({
          region: data.region,
          carbonIntensity: data.carbonIntensity,
          renewablePercentage: data.renewablePercentage,
          promptEmissions: PROMPT_ENERGY_CONSUMPTION['simple'] * data.carbonIntensity
        });
      } catch (error) {
        // Skip failed regions
      }
    }

    return comparisons.sort((a, b) => a.carbonIntensity - b.carbonIntensity);
  }

  // Format emissions for display
  formatEmissions(gCO2) {
    if (gCO2 < 1) {
      return `${(gCO2 * 1000).toFixed(1)} mgCO₂`;
    } else if (gCO2 < 1000) {
      return `${gCO2.toFixed(1)} gCO₂`;
    } else {
      return `${(gCO2 / 1000).toFixed(2)} kgCO₂`;
    }
  }

  // Format energy consumption for display
  formatEnergy(kWh) {
    if (kWh < 0.001) {
      return `${(kWh * 1000000).toFixed(1)} mWh`;
    } else if (kWh < 1) {
      return `${(kWh * 1000).toFixed(1)} Wh`;
    } else {
      return `${kWh.toFixed(3)} kWh`;
    }
  }

  // Get sustainability score (0-100)
  getSustainabilityScore(renewablePercentage, carbonIntensity) {
    // Weighted score: 60% renewable, 40% carbon intensity
    const renewableScore = renewablePercentage;
    const carbonScore = Math.max(0, 100 - (carbonIntensity / 10)); // Lower carbon = higher score
    
    return Math.round(renewableScore * 0.6 + carbonScore * 0.4);
  }

  // Get real-time grid status
  async getGridStatus(regionCode = 'IE') {
    const data = await this.getEnergyData(regionCode);
    const sustainabilityScore = this.getSustainabilityScore(data.renewablePercentage, data.carbonIntensity);
    
    let status = 'moderate';
    let statusColor = 'yellow';
    let statusMessage = 'Moderate carbon intensity';
    
    if (sustainabilityScore >= 70) {
      status = 'clean';
      statusColor = 'green';
      statusMessage = 'Clean energy available';
    } else if (sustainabilityScore <= 40) {
      status = 'dirty';
      statusColor = 'red';
      statusMessage = 'High carbon intensity';
    }
    
    return {
      status,
      statusColor,
      statusMessage,
      sustainabilityScore,
      ...data
    };
  }
}

// Export singleton instance
export const energyService = new EnergyService();

// Export utility functions
export {
  PROMPT_ENERGY_CONSUMPTION,
  fallbackEnergyData
};

