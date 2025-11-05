import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Library from "./pages/Library";
import Downloads from "./pages/Downloads";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background-dark text-gray-100">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-grow fade-in page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/library" element={<Library />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}
