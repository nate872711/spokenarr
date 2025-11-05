import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Library from "./pages/Library";
import Downloads from "./pages/Downloads";
import Settings from "./pages/Settings";
import PWAUpdater from "./pwa-updater";

export default function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/library" element={<Library />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>

        {/* ✅ Progressive Web App update toast */}
        <PWAUpdater />
      </>
    </Router>
  );
}
