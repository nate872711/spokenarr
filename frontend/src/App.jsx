import logo from './assets/logo.svg';
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="app">
      <img src={logo} alt="Spokenarr logo" className="w-32 mx-auto mb-6" />
      <h1 className="text-4xl font-bold mb-2">Spokenarr</h1>
      <p className="text-lg text-gray-300">Manage, organize, and discover audiobooks seamlessly.</p>
    </div>
  );
}
