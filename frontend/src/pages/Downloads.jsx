import { useEffect, useState } from "react";
import { api } from "../api";

export default function Downloads() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDownloads = async () => {
      const data = await api.downloads();
      setDownloads(data || []);
      setLoading(false);
    };
    loadDownloads();
  }, []);

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold gradient-text mb-6">Downloads</h1>

      {loading ? (
        <p className="text-gray-400">Loading downloads...</p>
      ) : downloads.length === 0 ? (
        <p className="text-gray-400">No active or completed downloads found.</p>
      ) : (
        <div className="space-y-4">
          {downloads.map((dl) => (
            <div
              key={dl.id}
              className="bg-gray-900/70 border border-gray-800 p-4 rounded-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">{dl.title}</h3>
                <span
                  className={`text-sm ${
                    dl.progress === 100
                      ? "text-green-400"
                      : "text-blue-400 animate-pulse"
                  }`}
                >
                  {dl.progress === 100 ? "Complete" : `${dl.progress}%`}
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    dl.progress === 100
                      ? "bg-green-500"
                      : "bg-gradient-to-r from-blue-500 to-purple-600"
                  }`}
                  style={{ width: `${dl.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
