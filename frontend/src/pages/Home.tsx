export default function Home() {
  return (
    <div className="fade-in">
      <section className="text-center space-y-6 mt-12">
        <h1 className="text-5xl font-extrabold gradient-text">
          Welcome to Spokenarr
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          The intelligent audiobook manager — discover, download, and organize your collection seamlessly.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <button className="btn btn-primary">Get Started</button>
          <button className="btn btn-secondary">Learn More</button>
        </div>
      </section>
    </div>
  );
}
