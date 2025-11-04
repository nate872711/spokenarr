// frontend/src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://api:80';

export async function fetchAudiobooks(limit = 25) {
  return fetchData(`${API_BASE_URL}/api/audiobooks?limit=${limit}`);
}

export async function fetchDiscover() {
  // Placeholder or replace with a real endpoint later
  return fetchData(`${API_BASE_URL}/api/discover`, [
    { id: 1, title: 'The Martian', author: 'Andy Weir' },
    { id: 2, title: 'Project Hail Mary', author: 'Andy Weir' },
    { id: 3, title: 'Dune', author: 'Frank Herbert' },
  ]);
}

export async function fetchDownloads() {
  // Placeholder
  return fetchData(`${API_BASE_URL}/api/downloads`, [
    { id: 101, title: 'Becoming', status: 'completed' },
    { id: 102, title: 'Sapiens', status: 'downloading' },
  ]);
}

async function fetchData(url, fallback = []) {
  try {
    const response = await fetch(url);
    if (!response.ok) return fallback;
    return await response.json();
  } catch (error) {
    console.warn(`API request failed for ${url}, using fallback`, error);
    return fallback;
  }
}
