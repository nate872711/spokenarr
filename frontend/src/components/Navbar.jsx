import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Discover", path: "/discover" },
    { name: "Library", path: "/library" },
    { name: "Downloads", path: "/downloads" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-purple-900/70 via-blue-900/50 to-purple-900/70 border-b border-purple-800/50 shadow-[0_0_12px_rgba(59,130,246,0.3)]">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo / Title */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 hover:opacity-90 transition"
        >
          <img
            src="/logos/spokenarr-logo.svg"
            alt="Spokenarr logo"
            className="w-8 h-8"
          />
          Spokenarr
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `font-medium ${
                  isActive
                    ? "text-purple-400 border-b-2 border-purple-500 pb-1"
                    : "text-gray-300 hover:text-purple-300"
                } transition duration-300`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
