import React, { useEffect, useState } from 'react';

export default function Discover() {
  const [audiobooks, setAudiobooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAudiobooks = async () => {
      try {
        const res = await fetch('/api/audiobooks');
        if (!res.ok) throw new Error('Failed to fetch audiobooks');
        const data = await res.json();
        setAudiobooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAudiobooks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Discover Audiobooks</h1>

      {loading && <p className="text-center text-gray-400">Loading audiobooks...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      {!loading && !error && audiobooks.length === 0 && (
        <p className="text-center text-gray-400">No audiobooks found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <p className="text-sm text-gray-400">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
