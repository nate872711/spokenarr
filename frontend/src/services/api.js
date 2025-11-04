// frontend/src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://api:80';

export async function fetchAudiobooks(limit = 25) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/audiobooks?limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch audiobooks');
    return await response.json();
  } catch (error) {
    console.error('Error fetching audiobooks:', error);
    return [];
  }
}
