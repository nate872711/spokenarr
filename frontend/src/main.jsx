import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Navbar from './components/Navbar';
import Discover from './pages/Discover';
import Library from './pages/Library';
import Downloads from './pages/Downloads';
import Settings from './pages/Settings';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/library" element={<Library />} />
      <Route path="/downloads" element={<Downloads />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </Router>
);
