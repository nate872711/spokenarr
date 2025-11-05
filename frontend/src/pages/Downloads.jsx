export default function Downloads() {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold gradient-text mb-6">Downloads</h1>
      <p className="text-gray-400 mb-8">
        Monitor and manage ongoing audiobook downloads. Completed files will appear in your library automatically.
      </p>
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="p-5 rounded-xl bg-gray-900/70 border border-gray-800 flex justify-between items-center card-hover"
          >
            <div>
              <h3 className="text-lg font-semibold">Audiobook {item}</h3>
              <p className="text-gray-400 text-sm">Downloading...</p>
            </div>
            <span className="text-purple-400 text-sm animate-pulse">45%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
