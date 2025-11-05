import React, { useEffect, useState } from 'react';

export default function Library() {
  const [audiobooks, setAudiobooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const res = await fetch('/api/audiobooks');
        if (!res.ok) throw new Error('Failed to load library');
        const data = await res.json();
        setAudiobooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLibrary();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Library</h1>

      {loading && <p className="text-center text-gray-400">Loading your library...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      {!loading && !error && audiobooks.length === 0 && (
        <p className="text-center text-gray-400">No audiobooks in your library yet.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {audiobooks.map((book) => (
          <div
            key={book.id || book.title}
            className="bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <img
              src={book.cover_url || '/assets/placeholder.png'}
              alt={book.title}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-white truncate">{book.title}</h2>
              <p className="text-sm text-gray-400 mb-2">{book.author}</p>
              <p className="text-xs text-gray-500 mb-4">
                Added: {book.added_at ? new Date(book.added_at).toLocaleDateString() : '—'}
              </p>
              <div className="flex justify-between">
                <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-md text-sm transition">
                  Edit Metadata
                </button>
                <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-sm transition">
                  Change Cover
                </button>
                <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-sm transition">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
