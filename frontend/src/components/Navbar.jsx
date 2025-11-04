import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 bg-opacity-90 backdrop-blur-md border-b border-slate-700 shadow-lg flex justify-between items-center px-6 py-3">
      <h1 className="text-xl font-bold text-white">Spokenarr</h1>
      <ul className="flex space-x-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/discover">Discover</Link></li>
        <li><Link to="/library">Library</Link></li>
        <li><Link to="/downloads">Downloads</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </nav>
  );
}
