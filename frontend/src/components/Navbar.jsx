import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/library", label: "Library" },
  { to: "/discover", label: "Discover" },
  { to: "/downloads", label: "Downloads" },
  { to: "/settings", label: "Settings" },
];

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-700 to-blue-600 p-4 shadow-lg">
      <ul className="flex justify-center space-x-8 text-lg font-semibold">
        {navItems.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "text-white border-b-2 border-white pb-1"
                  : "text-gray-200 hover:text-white transition"
              }
              end
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
