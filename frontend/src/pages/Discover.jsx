export default function Discover() {
  const sampleBooks = [
    { title: "The Martian", author: "Andy Weir" },
    { title: "Project Hail Mary", author: "Andy Weir" },
    { title: "Dune", author: "Frank Herbert" },
    { title: "The Hobbit", author: "J.R.R. Tolkien" },
  ];

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Discover New Audiobooks</h1>
      <p className="text-gray-400 mb-6">
        Explore new releases and trending audiobooks automatically sourced from online libraries.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {sampleBooks.map((book, idx) => (
          <div key={idx} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition">
            <div className="h-40 bg-gray-600 rounded mb-3 flex items-center justify-center text-gray-300 text-sm">
              Cover Image
            </div>
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="text-sm text-gray-400">{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
