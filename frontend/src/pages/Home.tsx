import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Dynamically import images with fallback support
let logoPath: string;
let spinnerPath: string;

try {
  logoPath = new URL("../assets/favicon.ico", import.meta.url).href;
} catch {
  console.warn("⚠️ favicon.ico not found — using spinner.png instead");
  logoPath = new URL("../assets/spinner.png", import.meta.url).href;
}

try {
  spinnerPath = new URL("../assets/spinner.png", import.meta.url).href;
} catch {
  spinnerPath = "";
  console.error("❌ spinner.png missing from /src/assets — please add it.");
}

export default function Home() {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = logoPath;
    img.onload = () => setImgLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#1e3a8a] text-white flex flex-col items-center justify-center px-6 py-12">
      {/* Header */}
      <header className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between mb-12 space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold tracking-tight text-white">Spokenarr</h1>
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/discover" className="hover:text-blue-400 transition">Discover</Link>
          <Link to="/library" className="hover:text-blue-400 transition">Library</Link>
          <Link to="/downloads" className="hover:text-blue-400 transition">Downloads</Link>
          <Link to="/settings" className="hover:text-blue-400 transition">Settings</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center mt-4">
        <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-8 flex items-center justify-center rounded-xl bg-black/20 backdrop-blur-md">
          {!imgLoaded && spinnerPath ? (
            <img
              src={spinnerPath}
              alt="Loading..."
              className="w-12 h-12 animate-spin opacity-70"
            />
          ) : (
            <img
              src={logoPath}
              alt="Spokenarr Logo"
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain drop-shadow-lg rounded-xl transition-transform duration-300 hover:scale-105"
            />
          )}
        </div>

        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Welcome to Spokenarr
        </h2>

        <p className="max-w-2xl text-gray-300 mb-8 text-lg">
          The intelligent audiobook manager — discover, download, and organize your collection seamlessly.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link
            to="/discover"
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="border border-blue-500 text-blue-300 hover:bg-blue-800 px-6 py-3 rounded-lg font-semibold transition"
          >
            Learn More
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm mt-auto pt-8 border-t border-white/10 w-full max-w-5xl">
        <p>© {new Date().getFullYear()} Spokenarr. All rights reserved.</p>
        <p className="mt-1">
          Built for seamless audiobook automation — discover, download, and organize effortlessly.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://github.com" className="hover:text-white transition">GitHub</a>
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
        </div>
      </footer>
    </div>
  );
}
