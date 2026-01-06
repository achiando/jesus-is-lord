"use client"

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'

interface Program {
  title: string;
  host: string;
  backgroundImage?: string;
}

interface RadioPlayerContextType {
  isPlaying: boolean;
  isLive: boolean; // This will eventually come from an API
  currentProgram: Program | null;
  togglePlayPause: () => void;
  // Add other controls as needed, e.g., setVolume, seek, etc.
}

const RadioPlayerContext = createContext<RadioPlayerContextType | undefined>(undefined);

export const RadioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLive, setIsLive] = useState(true); // Default to true for now, will be dynamic
  const [currentProgram, setCurrentProgram] = useState<Program | null>({
    title: "Morning Devotion",
    host: "Pastor John",
    backgroundImage: "/images/default-program-bg.jpg", // Placeholder
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const streamUrl = process.env.NEXT_PUBLIC_RADIO_STREAM_URL || "http://stream.radio.co/s0d4f5e6c7/listen"; // Default for testing

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(streamUrl);
      audioRef.current.preload = "none"; // Don't load until play is pressed
      audioRef.current.volume = 0.8; // Default volume
    }

    const audio = audioRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = (e: Event) => {
      console.error("Audio error:", e);
      setIsPlaying(false);
      // Potentially try to reconnect or show an error message
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      // Do not destroy audio object here, it's a singleton
    };
  }, [streamUrl]);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
    }
  }, [isPlaying]);

  // You might want to fetch live status and current program from an API here
  useEffect(() => {
    // Example: Fetch live status and program every 30 seconds
    const fetchRadioStatus = async () => {
      // In a real app, this would be an API call
      // For now, we'll simulate it
      // setIsLive(Math.random() > 0.5); // Simulate live status changing
      // setCurrentProgram(...)
    };

    fetchRadioStatus();
    const interval = setInterval(fetchRadioStatus, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);


  const value = {
    isPlaying,
    isLive,
    currentProgram,
    togglePlayPause,
  };

  return (
    <RadioPlayerContext.Provider value={value}>
      {children}
    </RadioPlayerContext.Provider>
  );
};

export const useRadioPlayer = () => {
  const context = useContext(RadioPlayerContext);
  if (context === undefined) {
    throw new Error('useRadioPlayer must be used within a RadioPlayerProvider');
  }
  return context;
};
