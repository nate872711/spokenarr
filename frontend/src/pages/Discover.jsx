import React, { useState } from "react";

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
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();

      if (data.results?.length) setResults(data.results);
      else setError("No audiobooks found for that search.");
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch search results. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#1e3a8a] text-white flex flex-col items-center px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
        Discover Audiobooks
      </h1>

      <form
        onSubmit={handleSearch}
        className="w-full max-w-lg flex items-center gap-3 mb-10"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or author..."
          className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-gray-300">Searching...</p>}
      {error && <p className="text-red-400 mt-2">{error}</p>}

      <div className="w-full max-w-4xl mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((book) => (
          <div
            key={book.id}
            className="bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:scale-105 transition-transform"
          >
            <img
              src={book.cover_url || "/logos/spokenarr-logo.svg"}
              alt={book.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold text-white">{book.title}</h2>
            <p className="text-sm text-gray-300 mb-2">by {book.author}</p>
            <p className="text-xs text-gray-400 line-clamp-3">
              {book.description || "No description available."}
            </p>
            <button
              onClick={() => alert(`Download started for ${book.title}`)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md transition"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
