import { useEffect, useState } from 'react';
import { fetchDiscover } from '../services/api';

export default function Discover() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiscover().then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="p-8 text-gray-400">Loading discoveries...</p>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Discover New Audiobooks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-xl shadow-lg"
          >
            <h2 className="font-semibold text-lg">{book.title}</h2>
            <p className="text-sm text-gray-200">{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
