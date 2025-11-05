const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://spokenarr-api:80/api";

/**
 * Generic API GET request handler.
 */
async function get(endpoint) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error("API request failed:", err);
    return null;
  }
}

export const api = {
  health: () => get("/health"),
  audiobooks: (limit = 25) => get(`/audiobooks?limit=${limit}`),
};
