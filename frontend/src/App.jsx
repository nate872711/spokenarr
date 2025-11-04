import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Library from "./pages/Library";
import Discover from "./pages/Discover";
import Downloads from "./pages/Downloads";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Router>
      <div className="app min-h-screen bg-gray-900 text-gray-100">
        <Navbar />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Library />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
