import { useEffect, useState } from "react";

export default function Discover() {
  const [audiobooks, setAudiobooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [downloading, setDownloading] = useState({});

  async function fetchDiscover(manual = false) {
    if (manual) setRefreshing(true);
    try {
      const res = await fetch("/api/discover");
      const data = await res.json();
      setAudiobooks(data || []);
    } catch (err) {
      console.error("Discover fetch failed:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function downloadBook(book) {
    setDownloading((d) => ({ ...d, [book.title]: true }));
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: book.title,
          author: book.author,
          link: book.link,
        }),
      });
      if (!res.ok) throw new Error(`Download failed: ${res.status}`);
      const result = await res.json();
      console.log("Downloaded:", result);
    } catch (err) {
      console.error("Download error:", err);
    } finally {
      setDownloading((d) => ({ ...d, [book.title]: false }));
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
              key={book.title}
              className="bg-gradient-to-br from-blue-700 to-purple-700 rounded-xl p-4 shadow-lg flex flex-col justify-between hover:scale-105 transition-transform"
            >
              <div>
                <h2 className="text-lg font-semibold truncate">{book.title}</h2>
                <p className="text-sm text-gray-300">{book.author}</p>
              </div>
              <button
                onClick={() => downloadBook(book)}
                disabled={!!downloading[book.title]}
                className={`mt-4 w-full py-2 rounded-md font-semibold ${
                  downloading[book.title]
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90"
                }`}
              >
                {downloading[book.title] ? "Downloading..." : "📥 Download"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
