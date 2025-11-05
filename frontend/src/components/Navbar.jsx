import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Discover", path: "/discover", icon: "🔍" },
    { name: "Library", path: "/library", icon: "🎧" },
    { name: "Downloads", path: "/downloads", icon: "⬇️" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
  ];

  return (
    <nav className="w-full bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 border-b border-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="/logos/spokenarr-logo.svg"
            alt="Spokenarr"
            className="h-8 w-8"
          />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Spokenarr
          </h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-2 font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-white hover:drop-shadow-[0_0_5px_rgba(147,51,234,0.7)]"
                }`
              }
            >
              <span>{link.icon}</span>
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown (animated) */}
      <div
        className={`md:hidden bg-gray-900 border-t border-gray-800 overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="py-3 px-4 space-y-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              {link.icon} {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
