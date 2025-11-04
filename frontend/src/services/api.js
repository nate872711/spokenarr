const API_BASE_URL = import.meta.env.VITE_API_URL || "http://api:80";

export async function getHealth() {
  const res = await fetch(`${API_BASE_URL}/api/health`);
  if (!res.ok) throw new Error("API health check failed");
  return res.json();
}

export async function getAudiobooks(limit = 25) {
  const res = await fetch(`${API_BASE_URL}/api/audiobooks?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch audiobooks");
  return res.json();
}

export async function getAudio(filename) {
  const res = await fetch(`${API_BASE_URL}/audio/${filename}`);
  if (!res.ok) throw new Error("Audio file not found");
  return res.blob();
}
