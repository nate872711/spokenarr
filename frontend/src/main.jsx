import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Discover from "./pages/Discover";
import Downloads from "./pages/Downloads";
import Settings from "./pages/Settings";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="library" element={<Library />} />
          <Route path="discover" element={<Discover />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
