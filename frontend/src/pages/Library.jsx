export default function Library() {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold gradient-text mb-6">Your Library</h1>
      <p className="text-gray-400 mb-8">
        Manage and browse your audiobook collection with automatic metadata updates.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="p-5 bg-gray-900/70 border border-gray-800 rounded-xl card-hover"
          >
            <div className="h-40 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-lg mb-3"></div>
            <h3 className="text-lg font-semibold">Audiobook Title #{i + 1}</h3>
            <p className="text-gray-400 text-sm">Narrator Name</p>
          </div>
        ))}
      </div>
    </div>
  );
}
