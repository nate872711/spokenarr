export default function Discover() {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold gradient-text mb-6">Discover New Audiobooks</h1>
      <p className="text-gray-400 mb-8">
        Automatically track new releases and recommendations from your favorite authors and sources.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((book) => (
          <div
            key={book}
            className="p-6 rounded-2xl bg-gray-900/70 border border-gray-800 card-hover"
          >
            <div className="h-40 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-xl mb-4"></div>
            <h3 className="font-semibold text-lg">New Release #{book}</h3>
            <p className="text-sm text-gray-400 mt-1">Author name</p>
          </div>
        ))}
      </div>
    </div>
  );
}
