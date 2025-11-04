import { useState, useRef } from "react";

export default function useAudioPlayer() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  const playTrack = (url) => {
    if (currentTrack !== url) {
      audioRef.current.src = url;
      setCurrentTrack(url);
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }

    audioRef.current.onended = () => {
      setIsPlaying(false);
    };
  };

  return { playTrack, isPlaying, currentTrack };
}
