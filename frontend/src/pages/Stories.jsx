import React from "react";
import useAudioPlayer from "../hooks/useAudioPlayer";

const stories = [
  {
    id: 1,
    title: "The Future of Spoken Narratives",
    author: "Spokenarr Team",
    cover: "/logos/spokenarr-logo.svg",
    description: "Exploring AI-powered storytelling and voice-driven worlds.",
    date: "Nov 2025",
    audioUrl: "http://spokenarr-api:80/audio/future-narratives.mp3",
  },
  {
    id: 2,
    title: "Voices from the Cosmos",
    author: "Luna Vox",
    cover: "/assets/space-story.jpg",
    description: "A science fiction anthology of AI-generated space tales.",
    date: "Oct 2025",
    audioUrl: "http://spokenarr-api:80/audio/voices-cosmos.mp3",
  },
  {
    id: 3,
    title: "Whispers in the Code",
    author: "Orion Narratives",
    cover: "/assets/ai-code.jpg",
    description: "A suspense story where AI learns to narrate human emotions.",
    date: "Sep 2025",
    audioUrl: "http://spokenarr-api:80/audio/whispers-code.mp3",
  },
];

export default function StoriesPage() {
  const { playTrack, currentTrack, isPlaying } = useAudioPlayer();

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Story Library</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={story.cover}
              alt={story.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{story.title}</h2>
              <p className="text-sm text-gray-400 mb-2">{story.author}</p>
              <p className="text-gray-300 text-sm mb-4">{story.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{story.date}</span>
                <button
                  onClick={() => playTrack(story.audioUrl)}
                  className={`${
                    currentTrack === story.audioUrl && isPlaying
                      ? "bg-red-600"
                      : "bg-indigo-600 hover:bg-indigo-500"
                  } text-white text-sm px-3 py-1 rounded-lg`}
                >
                  {currentTrack === story.audioUrl && isPlaying
                    ? "⏸ Pause"
                    : "▶ Listen"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
