import { useEffect, useState } from 'react';
import { fetchAudiobooks } from '../services/api';

export default function Library() {
  const [audiobooks, setAudiobooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchAudiobooks();
      setAudiobooks(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p className="text-gray-400 p-8">Loading your library...</p>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Library</h1>
      {audiobooks.length === 0 ? (
        <p className="text-gray-400">No audiobooks found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {audiobooks.map((book) => (
            <li key={book.id} className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-xl shadow-lg">
              <h2 className="font-semibold text-lg">{book.title}</h2>
              <p className="text-sm text-gray-200">{book.author || 'Unknown Author'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
