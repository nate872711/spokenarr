import { useState, useEffect } from "react";

export default function Discover() {
  const [audiobooks, setAudiobooks] = useState([]);

  useEffect(() => {
    // placeholder API call — connect to /api/audiobooks later
    fetch("/api/audiobooks")
      .then((res) => res.json())
      .then((data) => setAudiobooks(data || []))
      .catch(() => setAudiobooks([]));
  }, []);

  return (
    <section className="relative min-h-screen text-gray-100 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-6 py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-gray-900/20 to-gray-950/90 pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 mb-8">
          Discover Audiobooks
        </h1>

        {audiobooks.length === 0 ? (
          <p className="text-gray-400">
            No audiobooks found. Try connecting your sources or scanning again.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {audiobooks.map((book) => (
              <div
                key={book.id}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/70 rounded-xl p-5 shadow-lg hover:shadow-[0_0_12px_rgba(147,51,234,0.5)] transition-all duration-300"
              >
                <img
                  src={book.cover || "/assets/placeholder.png"}
                  alt={book.title}
                  className="rounded-md w-full h-64 object-cover mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-100">
                  {book.title}
                </h2>
                <p className="text-sm text-gray-400 mb-3">{book.author}</p>
                <button className="w-full py-2 mt-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-[0_0_12px_rgba(59,130,246,0.6)] transition-all">
                  Add to Library
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
