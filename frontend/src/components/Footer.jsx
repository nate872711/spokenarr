export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 border-t border-gray-800 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left section */}
        <div className="flex items-center gap-2">
          <img
            src="/logos/spokenarr-logo.svg"
            alt="Spokenarr"
            className="h-6 w-6"
          />
          <span className="font-semibold text-gray-300">Spokenarr</span>
          <span className="text-gray-500">v1.0.0</span>
        </div>

        {/* Center section */}
        <p className="text-gray-500 text-center">
          Your all-in-one audiobook automation platform — download, organize, and sync effortlessly.
        </p>

        {/* Right section */}
        <div className="flex space-x-5">
          <a
            href="https://github.com/nate8727/spokenarr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white hover:drop-shadow-[0_0_6px_rgba(147,51,234,0.8)] transition-all duration-200"
          >
            GitHub
          </a>
          <a
            href="mailto:support@spokenarr.app"
            className="hover:text-white hover:drop-shadow-[0_0_6px_rgba(59,130,246,0.8)] transition-all duration-200"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="h-[2px] bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 opacity-40" />
    </footer>
  );
}
