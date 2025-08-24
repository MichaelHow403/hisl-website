export const DATA_CENTERS = [
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
  { id:"se-sto", city:"Stockholm",  country:"Sweden",  lat:59.33, lon:18.06, region:"EU", providers:["Azure","GCP"] },
  { id:"no-osl", city:"Oslo",       country:"Norway",  lat:59.91, lon:10.75, region:"EU", providers:["Azure"] },
  { id:"fi-hel", city:"Helsinki",   country:"Finland", lat:60.17, lon:24.94, region:"EU", providers:["GCP"] },
  { id:"dk-cph", city:"Copenhagen", country:"Denmark", lat:55.68, lon:12.57, region:"EU", providers:["GCP"] },
  { id:"be-bru", city:"Brussels",   country:"Belgium", lat:50.85, lon:4.35, region:"EU", providers:["Azure"] },
  { id:"ch-zur", city:"Zurich",     country:"Switzerland", lat:47.37, lon:8.55, region:"EU", providers:["AWS","GCP"] },
  { id:"it-mil", city:"Milan",      country:"Italy",   lat:45.46, lon:9.19, region:"EU", providers:["AWS","Azure","GCP"] },
  { id:"es-mad", city:"Madrid",     country:"Spain",   lat:40.42, lon:-3.70, region:"EU", providers:["AWS","Azure"] },
  { id:"pl-war", city:"Warsaw",     country:"Poland",  lat:52.23, lon:21.01, region:"EU", providers:["AWS","GCP"] },
  // Middle East
  { id:"ae-dxb", city:"Dubai",      country:"UAE",     lat:25.20, lon:55.27, region:"ME", providers:["AWS","Azure"] },
  { id:"il-tlv", city:"Tel Aviv",   country:"Israel",  lat:32.08, lon:34.78, region:"ME", providers:["Azure"] },
  { id:"bh-man", city:"Manama",     country:"Bahrain", lat:26.23, lon:50.59, region:"ME", providers:["AWS"] },
  // Africa
  { id:"za-jnb", city:"Johannesburg", country:"South Africa", lat:-26.20, lon:28.04, region:"AF", providers:["AWS","Azure"] },
  { id:"za-cpt", city:"Cape Town",  country:"South Africa", lat:-33.92, lon:18.42, region:"AF", providers:["Azure"] },
  // Asia
  { id:"jp-nrt", city:"Tokyo",      country:"Japan",   lat:35.68, lon:139.69, region:"AS", providers:["AWS","Azure","GCP"] },
  { id:"jp-kix", city:"Osaka",      country:"Japan",   lat:34.69, lon:135.50, region:"AS", providers:["AWS","Azure"] },
  { id:"kr-icn", city:"Seoul",      country:"South Korea", lat:37.57, lon:126.98, region:"AS", providers:["AWS","Azure","GCP"] },
  { id:"sg-sin", city:"Singapore",  country:"Singapore", lat:1.35, lon:103.82, region:"AS", providers:["AWS","Azure","GCP"] },
  { id:"hk-hkg", city:"Hong Kong",  country:"Hong Kong", lat:22.32, lon:114.17, region:"AS", providers:["AWS","Azure","GCP"] },
  { id:"tw-tpe", city:"Taipei",     country:"Taiwan",  lat:25.03, lon:121.57, region:"AS", providers:["AWS","GCP"] },
  { id:"in-mum", city:"Mumbai",     country:"India",   lat:19.08, lon:72.88, region:"AS", providers:["AWS","Azure","GCP"] },
  { id:"in-hyd", city:"Hyderabad",  country:"India",   lat:17.39, lon:78.49, region:"AS", providers:["AWS","Azure"] },
  { id:"in-del", city:"Delhi",      country:"India",   lat:28.61, lon:77.21, region:"AS", providers:["Azure","GCP"] },
  { id:"in-chn", city:"Chennai",    country:"India",   lat:13.08, lon:80.27, region:"AS", providers:["GCP"] },
  { id:"th-bkk", city:"Bangkok",    country:"Thailand", lat:13.76, lon:100.50, region:"AS", providers:["AWS","GCP"] },
  { id:"id-jkt", city:"Jakarta",    country:"Indonesia", lat:-6.21, lon:106.85, region:"AS", providers:["AWS","GCP"] },
  { id:"my-kul", city:"Kuala Lumpur", country:"Malaysia", lat:3.16, lon:101.71, region:"AS", providers:["Azure"] },
  { id:"ph-mnl", city:"Manila",     country:"Philippines", lat:14.60, lon:120.98, region:"AS", providers:["Azure"] },
  { id:"vn-hcm", city:"Ho Chi Minh", country:"Vietnam", lat:10.82, lon:106.63, region:"AS", providers:["GCP"] },
  { id:"cn-bjs", city:"Beijing",    country:"China",   lat:39.90, lon:116.40, region:"AS", providers:["Azure"] },
  { id:"cn-sha", city:"Shanghai",   country:"China",   lat:31.23, lon:121.47, region:"AS", providers:["Azure"] },
  // Oceania
  { id:"au-syd", city:"Sydney",     country:"Australia", lat:-33.87, lon:151.21, region:"OC", providers:["AWS","Azure","GCP"] },
  { id:"au-mel", city:"Melbourne",  country:"Australia", lat:-37.81, lon:144.96, region:"OC", providers:["AWS","Azure"] },
  { id:"au-per", city:"Perth",      country:"Australia", lat:-31.95, lon:115.86, region:"OC", providers:["Azure"] },
  { id:"nz-akl", city:"Auckland",   country:"New Zealand", lat:-36.85, lon:174.76, region:"OC", providers:["Azure"] }
];

export const getDataCentersByRegion = (region) => {
  return DATA_CENTERS.filter(dc => dc.region === region);
};

export const getDataCenterById = (id) => {
  return DATA_CENTERS.find(dc => dc.id === id);
};

export const getAllRegions = () => {
  return [...new Set(DATA_CENTERS.map(dc => dc.region))];
};

export const getDataCentersByProvider = (provider) => {
  return DATA_CENTERS.filter(dc => dc.providers.includes(provider));
};

