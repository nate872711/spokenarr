const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://spokenarr-api:80/api";

/**
 * Generic API GET request handler with mock fallback.
 */
async function get(endpoint, mockData) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.warn(`[Mock Fallback] ${endpoint}`, err.message);
    return mockData;
  }
}

/**
 * Mock data used when API is unavailable.
 */
const mockAudiobooks = [
  { id: 1, title: "Project Hail Mary", author: "Andy Weir" },
  { id: 2, title: "Dune", author: "Frank Herbert" },
  { id: 3, title: "The Martian", author: "Andy Weir" },
  { id: 4, title: "Atomic Habits", author: "James Clear" },
  { id: 5, title: "The Name of the Wind", author: "Patrick Rothfuss" },
  { id: 6, title: "Ready Player One", author: "Ernest Cline" },
];

const mockDownloads = [
  { id: 1, title: "The Way of Kings", progress: 82 },
  { id: 2, title: "Mistborn: The Final Empire", progress: 45 },
  { id: 3, title: "The Hobbit", progress: 100 },
];

const mockSettings = {
  downloadPath: "/app/audio",
  autoDownload: true,
  preferredSource: "audiobookbay",
  notifications: true,
};

export const api = {
  // Health endpoint (always safe to check API status)
  health: () =>
    get("/health", { status: "mocked", message: "Offline demo mode active" }),

  // Audiobook library
  audiobooks: (limit = 25) =>
    get(`/audiobooks?limit=${limit}`, mockAudiobooks.slice(0, limit)),

  // Download manager state
  downloads: () => get("/downloads", mockDownloads),

  // Application settings
  settings: () => get("/settings", mockSettings),
};
