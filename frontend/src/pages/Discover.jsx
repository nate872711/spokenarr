import { useEffect, useState } from "react";

export default function Discover() {
  const [audiobooks, setAudiobooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDiscover() {
      try {
        const res = await fetch("/api/discover");
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setAudiobooks(data || []);
      } catch (err) {
        console.error("Discover fetch failed:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDiscover();
  }, []);

  if (loading)
    return <p className="p-8 text-gray-400">Loading new releases...</p>;

  if (!audiobooks.length)
    return (
      <div className="p-8 text-center text-gray-400">
        <h2 className="text-2xl font-bold mb-2 text-white">No New Audiobooks</h2>
        <p>Discovery runs automatically every 12 hours.</p>
      </div>
    );

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
        Discover New Audiobooks
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {audiobooks.map((book) => (
          <div
            key={book.id}
            className="bg-gradient-to-br from-blue-700 to-purple-700 rounded-xl p-4 shadow-lg hover:scale-105 transition-transform"
          >
            <h2 className="text-lg font-semibold truncate">{book.title}</h2>
            <p className="text-sm text-gray-300">{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
