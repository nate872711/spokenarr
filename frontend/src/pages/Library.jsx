import { useEffect, useState } from "react";
import { api } from "../api";

export default function Library() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await api.audiobooks();
      if (data) setBooks(data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold gradient-text mb-6">Your Library</h1>

      {loading ? (
        <p className="text-gray-400">Loading audiobooks...</p>
      ) : books.length === 0 ? (
        <p className="text-gray-400">
          No audiobooks found. Try adding some to your library.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="p-5 bg-gray-900/70 border border-gray-800 rounded-xl card-hover"
            >
              <div className="h-40 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-lg mb-3"></div>
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-gray-400 text-sm">{book.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
