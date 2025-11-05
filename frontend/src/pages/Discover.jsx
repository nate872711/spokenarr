import React, { useState } from "react";

export default function Discover() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Failed to fetch search results.");
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch search results.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (book) => {
    try {
      const res = await fetch(`/api/download/${book.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });

      if (!res.ok) throw new Error("Failed to download audiobook.");
      const result = await res.json();

      alert(`✅ Added "${result.book.title}" to your library.`);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add audiobook to your library.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#1e3a8a] text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Discover Audiobooks
          </h1>
          <p className="text-gray-300">
            Search your library or find new audiobooks to download.
          </p>
        </header>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="flex justify-center mb-10 gap-3 flex-wrap"
        >
          <input
            type="text"
            placeholder="Search by title or author..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:w-96 px-4 py-3 rounded-lg text-black text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-semibold transition text-white"
          >
            Search
          </button>
        </form>

        {/* Loading */}
        {loading && (
          <div className="text-center text-blue-400 text-lg font-semibold">
            Searching...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center text-red-400 text-lg font-semibold">
            {error}
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((book) => (
              <div
                key={book.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col"
              >
                <img
                  src={
                    book.cover_url ||
                    "https://via.placeholder.com/200x300?text=No+Cover"
                  }
                  alt={book.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold text-white mb-1">
                  {book.title}
                </h2>
                <p className="text-gray-300 text-sm mb-2">
                  {book.author || "Unknown Author"}
                </p>
                <p className="text-gray-400 text-sm flex-grow line-clamp-3">
                  {book.description || "No description available."}
                </p>

                <div className="mt-4">
                  {book.source === "openlibrary" ? (
                    <button
                      onClick={() => handleDownload(book)}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md transition"
                    >
                      Download to Library
                    </button>
                  ) : (
                    <span className="block text-center text-green-400 font-medium">
                      ✅ In Library
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && results.length === 0 && !error && (
          <p className="text-center text-gray-400 mt-8 text-lg">
            Try searching for an author or title to discover audiobooks.
          </p>
        )}
      </div>
    </div>
  );
}
