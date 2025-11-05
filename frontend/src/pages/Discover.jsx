import { useEffect, useState } from "react";
import { api } from "../api";

export default function Discover() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscover = async () => {
      const data = await api.audiobooks(6);
      if (data) setBooks(data);
      setLoading(false);
    };
    fetchDiscover();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold gradient-text mb-6">
        Discover New Audiobooks
      </h1>

      {loading ? (
        <p className="text-gray-400">Loading recommendations...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="p-6 rounded-2xl bg-gray-900/70 border border-gray-800 card-hover"
            >
              <div className="h-40 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-xl mb-4"></div>
              <h3 className="font-semibold text-lg">{book.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{book.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
