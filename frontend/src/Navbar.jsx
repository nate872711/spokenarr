import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Library" },
    { path: "/discover", label: "Discover" },
    { path: "/downloads", label: "Downloads" },
    { path: "/settings", label: "Settings" },
  ];

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <img src="/assets/logo.png" alt="Spokenarr logo" className="h-8" />
          <h1 className="text-xl font-bold">Spokenarr</h1>
        </div>
        <div className="flex gap-6">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`${
                location.pathname === path
                  ? "text-yellow-400"
                  : "text-gray-300 hover:text-white"
              } font-medium`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
