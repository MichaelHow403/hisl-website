// Utility functions for streaming text effects

export async function streamToOutput(text, el, speed = 15) {
  el.textContent = '';
  for (const ch of text) {
    el.textContent += ch;
    await new Promise(r => setTimeout(r, speed));
  }
}

// Energy estimation constants and functions
const ENERGY_PER_TOKEN_KWH = 0.0000008; // placeholder

export function estimateKwh(tokens = 1200) {
  return (tokens * ENERGY_PER_TOKEN_KWH).toFixed(6);
}

export function fakeLatency(region = 'eu') {
  const base = { eu: 18, us: 30, apac: 50 }[region] ?? 35;
  return base + Math.round(Math.random() * 10);
}

export function estimateTokens(text) {
  // Rough estimation: ~4 characters per token
  return Math.ceil(text.length / 4);
}

