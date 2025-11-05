import { useState } from "react";
import useFetch from "../hooks/useFetch";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Discover() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { fetchData, loading, error } = useFetch("/api");
  const [downloading, setDownloading] = useState(null); // track which book is downloading

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const data = await fetchData(`/search?q=${encodeURIComponent(query)}`);
    setResults(data || []);
  };

  const handleDownload = async (bookId) => {
    setDownloading(bookId);
    const blob = await fetchData(`/download/${bookId}`, {}, true);
    if (blob) {
      // create temporary file link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${bookId}.mp3`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    }
    setDownloading(null);
  };

  return (
    <div className="page-container fade-in">
      <h1 className="text-3xl font-bold mb-4 gradient-text">Discover Audiobooks</h1>
      <p className="text-gray-400 mb-6">
        Search for audiobooks to download or explore new releases.
      </p>

      <form onSubmit={handleSearch} className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or author..."
          className="flex-grow p-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {loading && <LoadingSpinner />}

      {error && (
        <div className="text-red-400 font-semibold mb-4">
          ❌ Failed to fetch search results.
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
          {results.map((book) => (
            <div
              key={book.id}
              className="p-4 bg-gray-800 rounded-lg shadow-glow card-hover"
            >
              <img
                src={book.cover_url || "/assets/placeholder.png"}
                alt={book.title}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
              <p className="text-gray-400 text-sm mb-2">{book.author}</p>

              {downloading === book.id ? (
                <div className="flex justify-center">
                  <img
                    src="/assets/spinner.png"
                    alt="Downloading..."
                    className="w-6 h-6 animate-spin-slow opacity-80"
                  />
                </div>
              ) : (
                <button
                  onClick={() => handleDownload(book.id)}
                  className="btn btn-secondary w-full"
                >
                  Download
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
