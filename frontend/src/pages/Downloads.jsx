export default function Downloads() {
  const downloads = [
    { title: "The Expanse - Leviathan Wakes", progress: 80 },
    { title: "The Way of Kings", progress: 45 },
    { title: "Mistborn: The Final Empire", progress: 10 },
  ];

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Active Downloads</h1>
      <p className="text-gray-400 mb-6">
        Track your audiobook download queue and progress.
      </p>
      <div className="space-y-4">
        {downloads.map((item, idx) => (
          <div key={idx} className="bg-gray-800 p-4 rounded-lg">
            <div className="flex justify-between mb-1">
              <span>{item.title}</span>
              <span>{item.progress}%</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
