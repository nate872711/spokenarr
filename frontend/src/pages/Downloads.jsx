import { useEffect, useState } from "react";

export default function Downloads() {
  const [queued, setQueued] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch queued audiobooks
  const loadQueued = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/audiobooks?status=queued");
      const data = await res.json();
      setQueued(data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load queued audiobooks.");
    } finally {
      setLoading(false);
    }
  };

  // Mark an audiobook as downloaded
  const markAsDownloaded = async (id) => {
    try {
      const formData = new FormData();
      formData.append("audiobook_id", id);
      formData.append("new_status", "downloaded");

      const res = await fetch("/api/update-status", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMessage("Audiobook marked as downloaded!");
        // Refresh queued list
        await loadQueued();
      } else {
        const err = await res.json();
        setMessage(err.detail || "Failed to update status.");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred while updating the audiobook.");
    }
  };

  useEffect(() => {
    loadQueued();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#1e3a8a] text-white flex flex-col items-center px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
        Downloads
      </h1>

      {message && (
        <div className="bg-blue-500/30 border border-blue-400 px-4 py-2 rounded-md mb-6 text-center text-sm">
          {message}
        </div>
      )}

      {loading ? (
        <p className="text-gray-400">Loading queued downloads...</p>
      ) : queued.length === 0 ? (
        <p className="text-gray-400 mt-6">
          📚 No queued audiobooks. Go to{" "}
          <a href="/discover" className="text-blue-400 hover:underline">
            Discover
          </a>{" "}
          to add some!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {queued.map((book) => (
            <div
              key={book.id}
              className="bg-white/10 rounded-xl p-4 flex flex-col items-center shadow-lg hover:bg-white/20 transition"
            >
              {book.cover_url ? (
                <img
                  src={book.cover_url}
                  alt={book.title}
                  className="w-32 h-48 object-cover rounded-md mb-4 shadow-md"
                />
              ) : (
                <div className="w-32 h-48 bg-gray-700 flex items-center justify-center rounded-md mb-4 text-gray-400 text-sm">
                  No Cover
                </div>
              )}

              <h2 className="text-lg font-semibold mb-1 text-center">
                {book.title}
              </h2>
              <p className="text-gray-400 text-sm mb-2 text-center">
                {book.author || "Unknown Author"}
              </p>

              <button
                onClick={() => markAsDownloaded(book.id)}
                className="mt-auto bg-green-600 hover:bg-green-500 px-5 py-2 rounded-md font-semibold text-white text-sm transition"
              >
                Mark as Downloaded
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
