import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-200 font-sans">
      {/* Top Navbar */}
      <Navbar />

      {/* Main content (page routes render here) */}
      <main className="flex-grow px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
}
