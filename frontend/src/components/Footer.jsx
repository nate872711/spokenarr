export default function Footer() {
  return (
    <footer className="mt-auto bg-gradient-to-r from-purple-950 via-blue-950 to-purple-950 text-gray-400 py-8 border-t border-purple-800/30">
      <div className="max-w-6xl mx-auto px-6 text-center space-y-4">
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="text-purple-400 font-semibold">Spokenarr</span>.  
          All rights reserved.
        </p>
        <p className="text-xs text-gray-500">
          Built for seamless audiobook automation — discover, download, and organize effortlessly.
        </p>
        <div className="flex justify-center gap-6 text-gray-500 text-sm">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition">GitHub</a>
          <a href="#" className="hover:text-purple-400 transition">Privacy</a>
          <a href="#" className="hover:text-purple-400 transition">Terms</a>
        </div>
      </div>
    </footer>
  );
}
