import React from "react";
import StoryList from "../components/StoryList";

const mockStories = [
  {
    id: 1,
    title: "The Future of Spoken Narratives",
    description: "Exploring AI-powered storytelling and voice-driven worlds.",
    author: "Spokenarr Team",
    date: "Nov 2025",
  },
  {
    id: 2,
    title: "Voices from the Cosmos",
    description: "A science fiction anthology of AI-generated space tales.",
    author: "Luna Vox",
    date: "Oct 2025",
  },
  {
    id: 3,
    title: "Whispers in the Code",
    description: "A suspense story where AI learns to narrate human emotions.",
    author: "Orion Narratives",
    date: "Sep 2025",
  },
];

const StoryPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Spokenarr</h1>
        <p className="text-gray-600">Your portal to AI-powered storytelling</p>
      </div>
      <StoryList stories={mockStories} />
    </main>
  );
};

export default StoryPage;
