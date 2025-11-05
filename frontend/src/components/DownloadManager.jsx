import { useEffect, useState } from "react";

export default function DownloadManager() {
  const [queue, setQueue] = useState({});
  const [visible, setVisible] = useState(true);

  async function fetchStatus() {
    try {
      const res = await fetch("/api/queue/status");
      const data = await res.json();
      setQueue(data || {});
    } catch (err) {
      console.error("Failed to fetch queue:", err);
    }
  }

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeJobs = Object.entries(queue).filter(
    ([, status]) => status !== "done"
  );
  const completedJobs = Object.entries(queue).filter(
    ([, status]) => status === "done"
  );

  if (!visible) {
    return (
      <button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90"
        onClick={() => setVisible(true)}
      >
        📥 Show Downloads
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 bg-gray-900/95 backdrop-blur-lg border border-gray-700 shadow-2xl rounded-2xl p-4 w-80 text-sm text-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">📦 Download Manager</h2>
        <button
          className="text-gray-400 hover:text-white"
          onClick={() => setVisible(false)}
        >
          ✖
        </button>
      </div>

      {activeJobs.length === 0 && completedJobs.length === 0 ? (
        <p className="text-gray-400">No downloads running.</p>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {activeJobs.map(([id, status]) => {
            const [title, author] = id.split("_");
            return (
              <div
                key={id}
                className="bg-gradient-to-r from-blue-700 to-purple-700 rounded-lg px-3 py-2"
              >
                <p className="font-semibold truncate">{title}</p>
                <p className="text-xs text-gray-300 mb-1">{author}</p>
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-2 ${
                      status.includes("downloading")
                        ? "bg-blue-400 animate-pulse"
                        : "bg-yellow-400"
                    }`}
                    style={{ width: status.includes("downloading") ? "60%" : "20%" }}
                  ></div>
                </div>
                <p className="text-xs mt-1 text-gray-300">{status}</p>
              </div>
            );
          })}

          {completedJobs.slice(-3).map(([id]) => {
            const [title, author] = id.split("_");
            return (
              <div
                key={id}
                className="bg-gradient-to-r from-green-700 to-green-500 rounded-lg px-3 py-2"
              >
                <p className="font-semibold truncate">{title}</p>
                <p className="text-xs text-gray-300 mb-1">{author}</p>
                <p className="text-xs text-green-200">✅ Completed</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
