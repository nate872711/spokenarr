import { useEffect, useState } from "react";
import { getAudiobooks } from "../services/api";

export default function Discover() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAudiobooks(10)
      .then(setBooks)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-400 p-8">Finding new releases...</p>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Discover</h1>
      <p className="text-gray-400 mb-6">Browse new and trending audiobooks.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-gradient-to-br from-blue-700 to-purple-700 rounded-xl p-4 shadow-lg"
          >
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="text-sm text-gray-300">{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
