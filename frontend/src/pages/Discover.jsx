import { useEffect, useState } from "react";

export default function Discover() {
  const [audiobooks, setAudiobooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchDiscover(manual = false) {
    if (manual) setRefreshing(true);
    try {
      const res = await fetch("/api/discover");
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setAudiobooks(data || []);
    } catch (err) {
      console.error("Discover fetch failed:", err);
    } finally {
      setLoading(false);
      if (manual) setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchDiscover();
  }, []);

  if (loading)
    return <p className="p-8 text-gray-400">Loading new releases...</p>;

  return (
    <div className="p-8 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
          Discover New Audiobooks
        </h1>
        <button
          onClick={() => fetchDiscover(true)}
          disabled={refreshing}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            refreshing
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
          }`}
        >
          {refreshing ? "Refreshing..." : "🔄 Refresh"}
        </button>
      </div>

      {audiobooks.length === 0 ? (
        <div className="text-center text-gray-400">
          <h2 className="text-2xl font-bold mb-2 text-white">No New Audiobooks</h2>
          <p>Discovery runs automatically every 12 hours, or you can refresh manually.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {audiobooks.map((book) => (
            <div
              key={book.id}
              className="bg-gradient-to-br from-blue-700 to-purple-700 rounded-xl p-4 shadow-lg hover:scale-105 transition-transform"
            >
              <h2 className="text-lg font-semibold truncate">{book.title}</h2>
              <p className="text-sm text-gray-300">{book.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
