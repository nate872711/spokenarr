import { useEffect, useState } from "react";

export default function Library() {
  const [audiobooks, setAudiobooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Fetch downloaded audiobooks from API
  const loadDownloaded = async (showMessage = false) => {
    try {
      setLoading(true);
      const res = await fetch("/api/audiobooks?status=downloaded");
      if (!res.ok) throw new Error("Failed to fetch audiobooks");
      const data = await res.json();
      setAudiobooks(data);
      if (data.length === 0)
        setMessage("No downloaded audiobooks found. Download some first!");
      else if (showMessage)
        setMessage("✅ Library refreshed successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error loading downloaded audiobooks.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Handle refresh button
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDownloaded(true);
  };

  useEffect(() => {
    loadDownloaded();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#1e3a8a] text-white flex flex-col items-center px-6 py-12">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-6xl mb-6">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4 sm:mb-0">
          Library
        </h1>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className={`bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-md font-semibold text-white text-sm transition ${
            refreshing ? "opacity-70 cursor-wait" : ""
          }`}
        >
          {refreshing ? "Refreshing..." : "🔄 Refresh Library"}
        </button>
      </div>

      {message && (
        <div className="bg-blue-500/30 border border-blue-400 px-4 py-2 rounded-md mb-6 text-center text-sm w-full max-w-3xl">
          {message}
        </div>
      )}

      {loading ? (
        <p className="text-gray-400">Loading your audiobooks...</p>
      ) : audiobooks.length === 0 ? (
        <p className="text-gray-400 mt-6">
          📚 No downloaded audiobooks yet. Go to{" "}
          <a href="/discover" className="text-blue-400 hover:underline">
            Discover
          </a>{" "}
          to find and download some!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {audiobooks.map((book) => (
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
              <p className="text-gray-400 text-sm text-center mb-2">
                {book.author || "Unknown Author"} • {book.year || "—"}
              </p>

              <div className="flex items-center space-x-3 mt-auto">
                <button
                  className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-md font-semibold text-white text-sm transition"
                  onClick={() => alert("Metadata editing coming soon!")}
                >
                  Edit Info
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-md font-semibold text-white text-sm transition"
                  onClick={() =>
                    alert("External player integration coming soon!")
                  }
                >
                  Open
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
