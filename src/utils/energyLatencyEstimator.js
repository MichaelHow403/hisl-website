// Energy & Latency Estimator for Globe UI
export function estimateEnergyKJ(tokens, hops = 2) {
  // Energy: estimated_kJ = tokens * 0.00035 * hops
  return (tokens * 0.00035 * hops).toFixed(3);
}

export function estimateLatency(hops = 2) {
  // Latency: hops * 8–14 ms + 20–40 ms service time
  const hopLatency = hops * (8 + Math.random() * 6); // 8-14ms per hop
  const serviceTime = 20 + Math.random() * 20; // 20-40ms service time
  return Math.round(hopLatency + serviceTime);
}

export function estimateTokens(text) {
  // Rough token estimation: ~4 characters per token
  return Math.ceil(text.length / 4);
}

export function generateRouteHops(dataCenters, userRegion = 'Europe') {
  // Generate 2-3 hops through data centers
  const hops = 2 + Math.floor(Math.random() * 2); // 2-3 hops
  const route = [];
  
  // Start with user region
  const regionCenters = dataCenters.filter(dc => dc.region === userRegion);
  if (regionCenters.length > 0) {
    route.push(regionCenters[Math.floor(Math.random() * regionCenters.length)]);
  }
  
  // Add intermediate hops
  for (let i = 1; i < hops; i++) {
    const availableCenters = dataCenters.filter(dc => !route.includes(dc));
    if (availableCenters.length > 0) {
      route.push(availableCenters[Math.floor(Math.random() * availableCenters.length)]);
    }
  }
  
  return route;
}

