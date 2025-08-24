export type DataCenter = {
  id: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  region: "NA"|"SA"|"EU"|"AF"|"ME"|"AS"|"OC";
  providers: string[];
};

export const DATA_CENTERS: DataCenter[] = [
  // North America
  { id:"us-iad", city:"N. Virginia", country:"USA", lat:38.95, lon:-77.45, region:"NA", providers:["AWS","Azure","GCP"] },
  { id:"us-oh",  city:"Ohio",       country:"USA", lat:40.37, lon:-82.99, region:"NA", providers:["AWS","Azure"] },
  { id:"us-or",  city:"Oregon",     country:"USA", lat:45.52, lon:-122.67, region:"NA", providers:["AWS","GCP"] },
  { id:"us-sjc", city:"N. California", country:"USA", lat:37.36, lon:-121.92, region:"NA", providers:["AWS","Azure"] },
  { id:"us-iah", city:"Texas",      country:"USA", lat:29.76, lon:-95.36, region:"NA", providers:["Azure"] },
  { id:"us-phx", city:"Phoenix",    country:"USA", lat:33.45, lon:-112.07, region:"NA", providers:["Azure"] },
  { id:"us-ia",  city:"Iowa",       country:"USA", lat:41.60, lon:-93.60, region:"NA", providers:["GCP"] },
  { id:"ca-mtl", city:"Montreal",   country:"Canada", lat:45.50, lon:-73.56, region:"NA", providers:["AWS","Azure","GCP"] },
  { id:"ca-tor", city:"Toronto",    country:"Canada", lat:43.65, lon:-79.38, region:"NA", providers:["Azure"] },
  // South America
  { id:"br-sp",  city:"São Paulo",  country:"Brazil", lat:-23.55, lon:-46.63, region:"SA", providers:["AWS","Azure","GCP"] },
  { id:"cl-scl", city:"Santiago",   country:"Chile",  lat:-33.45, lon:-70.66, region:"SA", providers:["Azure","GCP"] },
  // Europe
  { id:"ie-dub", city:"Dublin",     country:"Ireland", lat:53.33, lon:-6.25, region:"EU", providers:["AWS","Azure","GCP"] },
  { id:"gb-lon", city:"London",     country:"UK",      lat:51.50, lon:-0.12, region:"EU", providers:["AWS","Azure","GCP"] },
  { id:"de-fra", city:"Frankfurt",  country:"Germany", lat:50.11, lon:8.68, region:"EU", providers:["AWS","Azure","GCP"] },
  { id:"fr-par", city:"Paris",      country:"France",  lat:48.86, lon:2.35, region:"EU", providers:["AWS","Azure"] },
  { id:"nl-ams", city:"Amsterdam",  country:"Netherlands", lat:52.37, lon:4.90, region:"EU", providers:["AWS","GCP"] },
  { id:"ch-zrh", city:"Zurich",     country:"Switzerland", lat:47.37, lon:8.54, region:"EU", providers:["Azure","GCP"] },
  { id:"it-mil", city:"Milan",      country:"Italy",   lat:45.46, lon:9.19, region:"EU", providers:["AWS","Azure"] },
  { id:"es-mad", city:"Madrid",     country:"Spain",   lat:40.42, lon:-3.70, region:"EU", providers:["AWS","Azure"] },
  { id:"se-sto", city:"Stockholm",  country:"Sweden",  lat:59.33, lon:18.06, region:"EU", providers:["AWS","GCP"] },
  { id:"pl-waw", city:"Warsaw",     country:"Poland",  lat:52.23, lon:21.01, region:"EU", providers:["GCP","Azure"] },
  { id:"fi-hel", city:"Helsinki",   country:"Finland", lat:60.17, lon:24.94, region:"EU", providers:["GCP"] },
  // Middle East
  { id:"bh-bah", city:"Bahrain",    country:"Bahrain", lat:26.07, lon:50.55, region:"ME", providers:["AWS"] },
  { id:"ae-dxb", city:"Dubai",      country:"UAE",     lat:25.27, lon:55.30, region:"ME", providers:["Azure"] },
  { id:"il-tlv", city:"Tel Aviv",   country:"Israel",  lat:32.08, lon:34.78, region:"ME", providers:["GCP"] },
  // Africa
  { id:"za-cpt", city:"Cape Town",  country:"South Africa", lat:-33.92, lon:18.42, region:"AF", providers:["AWS","Azure"] },
  { id:"za-jnb", city:"Johannesburg", country:"South Africa", lat:-26.20, lon:28.03, region:"AF", providers:["Azure"] },
  { id:"ke-nbo", city:"Nairobi",    country:"Kenya",   lat:-1.29, lon:36.82, region:"AF", providers:["Azure"] },
  // Asia
  { id:"jp-tyo", city:"Tokyo",      country:"Japan",   lat:35.68, lon:139.76, region:"AS", providers:["AWS","Azure","GCP"] },
  { id:"jp-osa", city:"Osaka",      country:"Japan",   lat:34.69, lon:135.50, region:"AS", providers:["AWS"] },
  { id:"kr-seo", city:"Seoul",      country:"Korea",   lat:37.57, lon:126.98, region:"AS", providers:["AWS","Azure","GCP"] },
  { id:"sg-sin", city:"Singapore",  country:"Singapore", lat:1.29, lon:103.85, region:"AS", providers:["AWS","Azure","GCP"] },
  { id:"in-bom", city:"Mumbai",     country:"India",   lat:19.08, lon:72.88, region:"AS", providers:["AWS","Azure"] },
  { id:"in-del", city:"Delhi",      country:"India",   lat:28.61, lon:77.21, region:"AS", providers:["Azure"] },
  { id:"id-jkt", city:"Jakarta",    country:"Indonesia", lat:-6.20, lon:106.82, region:"AS", providers:["AWS"] },
  { id:"hk-hkg", city:"Hong Kong",  country:"China (HK)", lat:22.28, lon:114.17, region:"AS", providers:["Azure","GCP"] },
  { id:"tw-tpe", city:"Taipei",     country:"Taiwan",  lat:25.04, lon:121.56, region:"AS", providers:["GCP"] },
  // Oceania
  { id:"au-syd", city:"Sydney",     country:"Australia", lat:-33.87, lon:151.21, region:"OC", providers:["AWS","Azure","GCP"] },
  { id:"au-mel", city:"Melbourne",  country:"Australia", lat:-37.81, lon:144.96, region:"OC", providers:["Azure","GCP"] },
  { id:"nz-akl", city:"Auckland",   country:"New Zealand", lat:-36.85, lon:174.76, region:"OC", providers:["Azure"] },
];

// Helper functions for data center operations
export function getDataCentersByRegion(region: string): DataCenter[] {
  return DATA_CENTERS.filter(dc => dc.region === region);
}

export function getRandomDataCenter(region?: string): DataCenter {
  const centers = region ? getDataCentersByRegion(region) : DATA_CENTERS;
  return centers[Math.floor(Math.random() * centers.length)];
}

export function generateRouteHops(userRegion: string = 'EU'): DataCenter[] {
  const route: DataCenter[] = [];
  
  // Start with user region
  const regionCenters = getDataCentersByRegion(userRegion);
  if (regionCenters.length > 0) {
    route.push(regionCenters[Math.floor(Math.random() * regionCenters.length)]);
  }
  
  // Add interconnect from different region
  const otherRegions = ['NA', 'EU', 'AS', 'OC'].filter(r => r !== userRegion);
  const interconnectRegion = otherRegions[Math.floor(Math.random() * otherRegions.length)];
  const interconnectCenters = getDataCentersByRegion(interconnectRegion);
  if (interconnectCenters.length > 0) {
    route.push(interconnectCenters[Math.floor(Math.random() * interconnectCenters.length)]);
  }
  
  // Final hop back to user region or nearby
  const finalCenters = getDataCentersByRegion(userRegion);
  if (finalCenters.length > 1) {
    const availableFinal = finalCenters.filter(dc => dc.id !== route[0]?.id);
    if (availableFinal.length > 0) {
      route.push(availableFinal[Math.floor(Math.random() * availableFinal.length)]);
    }
  }
  
  return route;
}

// Convert lat/lon to 3D sphere coordinates
export function latLonToVector3(lat: number, lon: number, radius: number = 1): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));
  
  return [x, y, z];
}

