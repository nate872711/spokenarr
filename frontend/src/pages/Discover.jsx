import { useState } from "react";

export default function Discover() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      setError("Could not load search results. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleQueueDownload = (title) => {
    alert(`📚 Queued "${title}" for download! (placeholder)`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#1e3a8a] text-white flex flex-col items-center px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        Discover Audiobooks
      </h1>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-4 w-full max-w-3xl mb-10"
      >
        <input
          type="text"
          placeholder="Search by title or author..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Error */}
      {error && <p className="text-red-400 mb-6">{error}</p>}

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {results.map((book) => (
          <div
            key={book.key}
            className="bg-white/10 rounded-xl p-4 flex flex-col items-center shadow-lg hover:bg-white/20 transition"
          >
            {book.cover_url ? (
              <img
                src={book.cover_url}
                alt={book.title}
                className="w-32 h-48 object-cover rounded-md mb-4"
              />
            ) : (
              <div className="w-32 h-48 bg-gray-700 flex items-center justify-center rounded-md mb-4 text-gray-400 text-sm">
                No Cover
              </div>
            )}
            <h2 className="text-lg font-semibold mb-1 text-center">
              {book.title}
            </h2>
            <p className="text-gray-400 text-sm mb-2">{book.author}</p>
            <p className="text-xs text-gray-500 mb-4">
              {book.year ? `Published: ${book.year}` : ""}
            </p>
            <button
              onClick={() => handleQueueDownload(book.title)}
              className="mt-auto bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Queue Download
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && results.length === 0 && !error && (
        <p className="text-gray-400 mt-10">Search to discover new audiobooks!</p>
      )}
    </div>
  );
}
