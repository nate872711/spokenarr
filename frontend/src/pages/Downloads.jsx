// frontend/src/pages/Downloads.jsx
import React, { useEffect, useState } from "react";

export default function Downloads() {
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    // ✅ Use Storybook mock data if available
    if (window.mockDownloads) {
      setDownloads(window.mockDownloads);
      return;
    }

    // ✅ Otherwise, try to fetch from API
    const fetchDownloads = async () => {
      try {
        const res = await fetch("/api/downloads");
        if (!res.ok) throw new Error("API not available");
        const data = await res.json();
        setDownloads(data);
      } catch {
        // Fallback data if API is offline
        setDownloads([
          { id: 1, title: "The Hobbit", progress: 100 },
          { id: 2, title: "Dune", progress: 60 },
        ]);
      }
    };

    fetchDownloads();
  }, []);

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Downloads</h1>

      {downloads.length === 0 ? (
        <p className="text-gray-400">No downloads yet.</p>
      ) : (
        <ul className="space-y-4">
          {downloads.map((d) => (
            <li
              key={d.id}
              className="bg-gradient-to-r from-purple-700 to-blue-600 rounded-xl p-4 shadow-lg"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{d.title}</span>
                <span>{d.progress}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
                <div
                  className="h-2 rounded-full bg-blue-400 transition-all duration-500"
                  style={{ width: `${d.progress}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
