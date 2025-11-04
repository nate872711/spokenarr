import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/", label: "Dashboard" },
  { path: "/library", label: "Library" },
  { path: "/downloads", label: "Downloads" },
  { path: "/discover", label: "Discover" },
  { path: "/settings", label: "Settings" },
];

export default function Navbar() {
  return (
    <nav className="bg-gray-950 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-400">Spokenarr</h1>
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm uppercase tracking-wide ${
                  isActive
                    ? "text-indigo-400 border-b-2 border-indigo-400"
                    : "text-gray-400 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
