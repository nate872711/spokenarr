import { useEffect, useState } from "react";

export default function Library() {
  const [audiobooks, setAudiobooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAudiobooks = async () => {
      try {
        const response = await fetch("/api/audiobooks");
        if (!response.ok) throw new Error("Failed to load library");
        const data = await response.json();
        setAudiobooks(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load your audiobook library.");
      } finally {
        setLoading(false);
      }
    };

    fetchAudiobooks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#1e3a8a] text-white flex flex-col items-center px-6 py-12">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        My Library
      </h1>

      {/* Loading & Error States */}
      {loading && <p className="text-gray-400">Loading your audiobooks...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {/* Library Grid */}
      {!loading && !error && audiobooks.length > 0 && (
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
              <p className="text-gray-400 text-sm mb-2 text-center">
                {book.author || "Unknown Author"}
              </p>

              {book.year && (
                <p className="text-xs text-gray-500 mb-2">Published: {book.year}</p>
              )}

              <span
                className={`px-3 py-1 mt-auto rounded-md text-xs font-semibold ${
                  book.status === "queued"
                    ? "bg-yellow-600 text-yellow-100"
                    : "bg-green-600 text-green-100"
                }`}
              >
                {book.status === "queued" ? "Queued" : "Downloaded"}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && audiobooks.length === 0 && (
        <p className="text-gray-400 mt-10 text-center">
          🎧 No audiobooks found. Go to{" "}
          <a href="/discover" className="text-blue-400 hover:underline">
            Discover
          </a>{" "}
          to add some!
        </p>
      )}
    </div>
  );
}
