import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#1e3a8a] text-white flex flex-col items-center justify-center px-6 py-12">
      {/* Header */}
      <header className="w-full max-w-5xl flex items-center justify-between mb-12">
        <h1 className="text-3xl font-bold text-white tracking-tight">Spokenarr</h1>
        <nav className="flex space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/discover" className="hover:text-blue-400 transition">Discover</Link>
          <Link to="/library" className="hover:text-blue-400 transition">Library</Link>
          <Link to="/downloads" className="hover:text-blue-400 transition">Downloads</Link>
          <Link to="/settings" className="hover:text-blue-400 transition">Settings</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="text-center flex flex-col items-center">
        <img
          src={logo}
          alt="Spokenarr Logo"
          className="w-64 h-64 sm:w-80 sm:h-80 object-contain mb-8 drop-shadow-lg"
        />

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
