import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import Downloads from "./pages/Downloads";
import Discover from "./pages/Discover";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/library" element={<Library />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}
