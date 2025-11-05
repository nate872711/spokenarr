import { useEffect, useState } from "react";

export default function Discover() {
  const [audiobooks, setAudiobooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [queueStatus, setQueueStatus] = useState({});

  // Fetch Discover list
  async function fetchDiscover(manual = false) {
    if (manual) setRefreshing(true);
    try {
      const res = await fetch("/api/discover");
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setAudiobooks(data || []);
    } catch (err) {
      console.error("Discover fetch failed:", err);
    } finally {
      setLoading(false);
      if (manual) setRefreshing(false);
    }
  }

  // Add audiobook to background download queue
  async function queueBook(book) {
    try {
      const res = await fetch("/api/queue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: book.title,
          author: book.author,
          link: book.link,
        }),
      });
      if (!res.ok) throw new Error(`Queue failed: ${res.status}`);
      const result = await res.json();
      console.log("Queued:", result);
      await fetchQueueStatus();
    } catch (err) {
      console.error("Queue error:", err);
    }
  }

  // Poll queue status from backend
  async function fetchQueueStatus() {
    try {
      const res = await fetch("/api/queue/status");
      const data = await res.json();
      setQueueStatus(data || {});
    } catch (err) {
      console.error("Status fetch failed:", err);
    }
  }

  // Poll queue every 5s for live updates
  useEffect(() => {
    fetchDiscover();
    const interval = setInterval(fetchQueueStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return <p className="p-8 text-gray-400">Loading new releases...</p>;

  return (
    <div className="p-8 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
          Discover New Audiobooks
        </h1>
        <button
          onClick={() => fetchDiscover(true)}
          disabled={refreshing}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            refreshing
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
          }`}
        >
          {refreshing ? "Refreshing..." : "🔄 Refresh"}
        </button>
      </div>

      {audiobooks.length === 0 ? (
        <div className="text-center text-gray-400">
          <h2 className="text-2xl font-bold mb-2 text-white">No New Audiobooks</h2>
          <p>Discovery runs automatically every 12 hours, or you can refresh manually.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {audiobooks.map((book) => {
            const jobId = `${book.title}_${book.author}`;
            const status = queueStatus[jobId];
            const isQueued = status && status.includes("queued");
            const isDownloading = status && status.includes("downloading");
            const isDone = status && status === "done";
            const isFailed = status && status.startsWith("failed");

            return (
              <div
                key={book.title}
                className="bg-gradient-to-br from-blue-800 to-purple-700 rounded-xl p-4 shadow-lg flex flex-col justify-between hover:scale-105 transition-transform"
              >
                <div>
                  <h2 className="text-lg font-semibold truncate">{book.title}</h2>
                  <p className="text-sm text-gray-300">{book.author}</p>
                </div>
                <div className="mt-4">
                  {isQueued && <p className="text-yellow-400 text-sm">Queued...</p>}
                  {isDownloading && (
                    <p className="text-blue-400 text-sm animate-pulse">Downloading...</p>
                  )}
                  {isDone && <p className="text-green-400 text-sm">✅ Done</p>}
                  {isFailed && <p className="text-red-400 text-sm">❌ Failed</p>}

                  {!status && (
                    <button
                      onClick={() => queueBook(book)}
                      className="mt-2 w-full py-2 rounded-md font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90"
                    >
                      📥 Download
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
