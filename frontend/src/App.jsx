import React from 'react'
import Navbar from './components/Navbar'
export default function App(){
  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white">
      <Navbar />
      <main className="p-6">
        <h1 className="text-2xl font-heading">Spokenarr Dashboard</h1>
        <p className="text-gray-300 mt-2">Welcome to Spokenarr — open Storybook on port 6006 to edit components.</p>
      </main>
    </div>
  )
}
