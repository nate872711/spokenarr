import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">Spokenarr</h1>
        <div className="space-x-6">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/stories" className="hover:text-gray-200">
            Stories
          </Link>
          <Link to="/about" className="hover:text-gray-200">
            About
          </Link>
          <a
            href="/storybook/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200"
          >
            Storybook
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
