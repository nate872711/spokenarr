import { Link } from "react-router-dom";
import logo from "../assets/favicon.ico"; // ✅ Updated image path

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 fade-in">
      <img
        src={logo}
        alt="Spokenarr Logo"
        className="w-32 h-32 mb-6 animate-pulse-slow"
      />
      <h1 className="text-5xl font-extrabold gradient-text mb-4">
        Welcome to Spokenarr
      </h1>
      <p className="text-gray-400 text-lg max-w-xl mb-8">
        A beautiful self-hosted audiobook server — browse, download, and listen
        effortlessly.
      </p>
      <div className="flex gap-4">
        <Link to="/discover" className="btn btn-primary px-6 py-3">
          Discover Audiobooks
        </Link>
        <Link to="/library" className="btn btn-secondary px-6 py-3">
          View Library
        </Link>
      </div>
    </div>
  );
}
