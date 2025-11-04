import { useEffect, useState } from 'react';
import { fetchDownloads } from '../services/api';

export default function Downloads() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDownloads().then((data) => {
      setDownloads(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="p-8 text-gray-400">Loading downloads...</p>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Downloads</h1>
      <ul className="space-y-4">
        {downloads.map((item) => (
          <li
            key={item.id}
            className={`p-4 rounded-xl shadow-lg ${
              item.status === 'downloading'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse'
                : 'bg-gray-700'
            }`}
          >
            <h2 className="font-semibold text-lg">{item.title}</h2>
            <p className="text-sm text-gray-300">Status: {item.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
