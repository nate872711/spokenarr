import { useEffect, useState } from "react";

export default function Downloads() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Load all non-downloaded audiobooks
  const loadDownloads = async (showMsg = false) => {
    try {
      setLoading(true);
      const res = await fetch("/api/audiobooks?status!=downloaded");
      if (!res.ok) throw new Error("Failed to fetch downloads");
      const data = await res.json();

      // Filter out any that might have been marked downloaded recently
      const active = data.filter(
        (b) => b.status !== "downloaded" && b.status !== "completed"
      );
      setDownloads(active);

      if (active.length === 0)
        setMessage("No active downloads — check your Library!");
      else if (showMsg)
        setMessage("✅ Download list refreshed successfully.");
    } catch (err) {
      console.error(err);
      setMessage("Error loading downloads.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Handle manual refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDownloads(true);
  };

  // Auto-refresh every 10s
  useEffect(() => {
    loadDownloads();
    const interval = setInterval(loadDownloads, 10000);
    return () => clearInterval(interval);
  }, []);

  // Compute progress color
  const getStatusColor = (status) => {
    switch (status) {
      case "queued":
        return "bg-yellow-500/30 border-yellow-400 text-yellow-300";
      case "downloading":
        return "bg-blue-500/30 border-blue-400 text-blue-300";
      case "completed":
        return "bg-green-500/30 border-green-400 text-green-300";
      default:
        return "bg-gray-500/30 border-gray-400 text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#1e3a8a] text-white flex flex-col items-center px-6 py-12">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-6xl mb-6">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4 sm:mb-0">
          Downloads
        </h1>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className={`bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-md font-semibold text-white text-sm transition ${
            refreshing ? "opacity-70 cursor-wait" : ""
          }`}
        >
          {refreshing ? "Refreshing..." : "🔄 Refresh Downloads"}
        </button>
      </div>

      {message && (
        <div className="bg-blue-500/30 border border-blue-400 px-4 py-2 rounded-md mb-6 text-center text-sm w-full max-w-3xl">
          {message}
        </div>
      )}

      {loading ? (
        <p className="text-gray-400">Loading active downloads...</p>
      ) : downloads.length === 0 ? (
        <p className="text-gray-400 mt-6">
          ✅ All downloads complete! Check your{" "}
          <a href="/library" className="text-blue-400 hover:underline">
            Library
          </a>{" "}
          to listen.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {downloads.map((book) => (
            <div
              key={book.id}
              className="bg-white/10 rounded-xl p-4 flex flex-col items-center shadow-lg hover:bg-white/20 transition"
            >
              {book.cover_url ? (
                <img
                  src={book.cover_url}
                  alt={book.title}
                  className="w-32 h-48 object-cover rounded-md mb-4 shadow-md"
                />
              ) : (
                <div className="w-32 h-48 bg-gray-700 flex items-center justify-center rounded-md mb-4 text-gray-400 text-sm">
                  No Cover
                </div>
              )}

              <h2 className="text-lg font-semibold mb-1 text-center">
                {book.title}
              </h2>
              <p className="text-gray-400 text-sm text-center mb-3">
                {book.author || "Unknown Author"} • {book.year || "—"}
              </p>

              <div
                className={`border rounded-md px-3 py-1 text-xs font-semibold uppercase ${getStatusColor(
                  book.status
                )}`}
              >
                {book.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
