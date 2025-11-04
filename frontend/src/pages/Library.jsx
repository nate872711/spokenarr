import { useEffect, useState } from "react";
import { getAudiobooks } from "../services/api";

export default function Library() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAudiobooks()
      .then(setBooks)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-400 p-8">Loading library...</p>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Library</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {books.length ? (
          books.map((book) => (
            <div
              key={book.id}
              className="bg-gradient-to-br from-purple-700 to-blue-700 rounded-xl p-4 shadow-lg"
            >
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-300">{book.author}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No audiobooks found.</p>
        )}
      </div>
    </div>
  );
}
