import { useEffect, useState } from "react";

export default function Library() {
  const [audiobooks, setAudiobooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLibrary() {
      try {
        const res = await fetch("/api/scan");
        const data = await res.json();
        setAudiobooks(data.audiobooks || []);
      } catch (error) {
        console.error("Failed to load library:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLibrary();
  }, []);

  if (loading) {
    return <p className="p-8 text-gray-400">Loading your library...</p>;
  }

  if (audiobooks.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400">
        <h2 className="text-2xl font-bold mb-2 text-white">No Audiobooks Found</h2>
        <p>Place some .mp3 files inside <code>data/audiobooks/</code> and refresh.</p>
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
        Library
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {audiobooks.map((book, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-purple-700 to-blue-700 rounded-xl p-4 shadow-lg hover:scale-105 transition-transform"
          >
            <h2 className="text-lg font-semibold truncate">{book.title}</h2>
            <p className="text-sm text-gray-300 mb-1">{book.author}</p>
            <p className="text-xs text-gray-400">{book.files} files</p>
          </div>
        ))}
      </div>
    </div>
  );
}
