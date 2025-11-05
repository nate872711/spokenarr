import { useState } from "react";

export default function Discover() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Search audiobooks
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setMessage("");
    setResults([]);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
      if (data.results.length === 0) setMessage("No results found.");
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch search results.");
    } finally {
      setLoading(false);
    }
  };

  // Queue audiobook for download
  const queueBook = async (book) => {
    try {
      const res = await fetch("/api/queue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });

      if (res.ok) {
        setMessage(`✅ ${book.title} has been queued for download.`);
      } else {
        const err = await res.json();
        setMessage(err.detail || "Failed to queue audiobook.");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred while queueing the audiobook.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#1e3a8a] text-white flex flex-col items-center px-6 py-12">
      <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        Discover Audiobooks
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mb-8"
      >
        <input
          type="text"
          placeholder="Search for audiobooks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-3 rounded-md bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-md font-semibold shadow-md transition disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {message && (
        <div className="bg-blue-500/30 border border-blue-400 px-4 py-2 rounded-md mb-6 text-center text-sm">
          {message}
        </div>
      )}

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
            <p className="text-gray-400 text-sm mb-3 text-center">
              {book.author || "Unknown Author"} • {book.year || "—"}
            </p>
            <button
              onClick={() => queueBook(book)}
              className="mt-auto bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-md font-semibold text-white text-sm transition"
            >
              Queue for Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
