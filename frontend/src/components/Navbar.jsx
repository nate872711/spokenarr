import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navLinks = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Discover", path: "/discover", icon: "🔍" },
    { name: "Library", path: "/library", icon: "🎧" },
    { name: "Downloads", path: "/downloads", icon: "⬇️" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
  ];

  return (
    <nav className="w-full bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 border-b border-gray-800 shadow-lg">
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

        {/* Navigation Links */}
        <div className="flex space-x-6">
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
      </div>
    </nav>
  );
}
