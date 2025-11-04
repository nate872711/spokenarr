import { useState } from "react";

export default function Downloads() {
  const [downloads] = useState([
    { title: "Example Audiobook 1", progress: 75 },
    { title: "Example Audiobook 2", progress: 100 },
  ]);

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Downloads</h1>
      {downloads.map((d, i) => (
        <div
          key={i}
          className="bg-gray-800 rounded-xl p-4 mb-4 shadow-lg border border-purple-600"
        >
          <h2 className="font-semibold">{d.title}</h2>
          <div className="w-full bg-gray-700 rounded-full h-3 mt-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
              style={{ width: `${d.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
