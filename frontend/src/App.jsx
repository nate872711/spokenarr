import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Library from "./pages/Library";
import Downloads from "./pages/Downloads";
import Settings from "./pages/Settings";
import DownloadManager from "./components/DownloadManager";
import { useState, useEffect } from "react";

export default function App() {
  const [showManager, setShowManager] = useState(false);
  const [activeDownloads, setActiveDownloads] = useState(0);

  // Poll the backend for queue activity
  async function pollQueue() {
    try {
      const res = await fetch("/api/queue/status");
      const data = await res.json();
      const active = Object.values(data || {}).filter(
        (s) => s !== "done" && !s.startsWith("failed")
      ).length;
      setActiveDownloads(active);
      if (active > 0) setShowManager(true);
    } catch (err) {
      console.error("Queue poll error:", err);
    }
  }

  useEffect(() => {
    const interval = setInterval(pollQueue, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 text-white flex flex-col">
        {/* Top navigation bar */}
        <Navbar
