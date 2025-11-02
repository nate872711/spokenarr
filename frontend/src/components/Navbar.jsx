import React from 'react'
export default function Navbar(){
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-primary to-primary-light">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">S</div>
        <div className="text-white font-heading text-xl">Spokenarr</div>
      </div>
      <div className="flex gap-4">
        <button className="text-white">Library</button>
        <button className="text-white">Downloads</button>
        <button className="text-white">Settings</button>
      </div>
    </nav>
  )
}
