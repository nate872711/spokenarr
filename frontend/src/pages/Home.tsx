import { Link } from "react-router-dom";

export default function Home(): JSX.Element {
  return (
    <section className="relative overflow-hidden text-gray-100">
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-blue-800 to-purple-950 opacity-70 blur-3xl animate-pulse-slow"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center flex flex-col items-center">
        <img
          src="/logos/spokenarr-logo.svg"
          alt="Spokenarr logo"
          className="w-24 h-24 mb-6 opacity-90"
        />
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 drop-shadow-[0_0_12px_rgba(147,51,234,0.6)]">
          Spokenarr
        </h1>
        <p className="mt-6 text-lg text-gray-300 max-w-2xl">
          The next-generation audiobook automation platform — monitor, download,
          and organize your library automatically.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <Link
            to="/discover"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl text-white font-semibold hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300"
          >
            Discover New Audiobooks
          </Link>
          <Link
            to="/library"
            className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl text-gray-200 font-semibold border border-gray-700 hover:bg-gray-700 hover:text-white transition-all duration-300"
          >
            View Library
          </Link>
        </div>
      </div>
    </section>
  );
}
