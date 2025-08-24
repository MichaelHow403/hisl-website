// Great circle interpolation for raven flight paths
export function greatCirclePoints(a, b, steps = 120) {
  // Simple great circle interpolation
  const lat1 = a.lat * Math.PI / 180;
  const lon1 = a.lon * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;
  const lon2 = b.lon * Math.PI / 180;
  
  const points = [];
  
  for (let i = 0; i <= steps; i++) {
    const f = i / steps;
    
    // Spherical linear interpolation
    const d = Math.acos(
      Math.sin(lat1) * Math.sin(lat2) + 
      Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)
    );
    
    if (d === 0) {
      points.push([a.lon, a.lat]);
      continue;
    }
    
    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);
    
    const x = A * Math.cos(lat1) * Math.cos(lon1) + B * Math.cos(lat2) * Math.cos(lon2);
    const y = A * Math.cos(lat1) * Math.sin(lon1) + B * Math.cos(lat2) * Math.sin(lon2);
    const z = A * Math.sin(lat1) + B * Math.sin(lat2);
    
    const lat = Math.atan2(z, Math.sqrt(x * x + y * y)) * 180 / Math.PI;
    const lon = Math.atan2(y, x) * 180 / Math.PI;
    
    points.push([lon, lat]);
  }
  
  return points;
}

// Calculate distance between two points on Earth (in km)
export function haversineDistance(a, b) {
  const R = 6371; // Earth's radius in km
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLon = (b.lon - a.lon) * Math.PI / 180;
  
  const lat1 = a.lat * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;
  
  const a1 = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1) * Math.cos(lat2) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a1), Math.sqrt(1-a1));
  
  return R * c;
}

// Estimate latency based on distance (fiber optic speed approximation)
export function estimateLatency(distance) {
  // Fiber optic speed ~200,000 km/s (2/3 speed of light)
  // Add processing delays and routing overhead
  const fiberLatency = distance / 200; // ms
  const processingDelay = Math.random() * 5 + 3; // 3-8ms processing
  
  return Math.max(8, Math.round(fiberLatency + processingDelay));
}

