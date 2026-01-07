"use client"

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { weeklySchedule, ScheduleItem } from '@/data/schedule'; // Import schedule

// Extend Program to include an image for the player
interface Program extends ScheduleItem {
  backgroundImage?: string;
}

interface RadioPlayerContextType {
  isPlaying: boolean;
  isLive: boolean;
  volume: number;
  currentProgram: Program | null;
  togglePlayPause: () => void;
  setVolume: (volume: number) => void;
}

const RadioPlayerContext = createContext<RadioPlayerContextType | undefined>(undefined);

// Helper to get the current program based on time
const getCurrentProgram = (): Program | null => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const activeProgram = weeklySchedule.find(item => {
    const [startHour, startMinute] = item.startTime.split(':').map(Number);
    const [endHour, endMinute] = item.endTime.split(':').map(Number);
    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;
    return currentTime >= startTimeInMinutes && currentTime < endTimeInMinutes;
  });

  return activeProgram || weeklySchedule[0] || null; // Fallback to the first item
};


export const RadioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const [volume, setVolumeState] = useState(0.8);
  const [currentProgram, setCurrentProgram] = useState<Program | null>(getCurrentProgram());

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const streamUrl = process.env.NEXT_PUBLIC_RADIO_STREAM_URL || "http://stream.radio.co/s0d4f5e6c7/listen";

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(streamUrl);
      audioRef.current.preload = "none";
    }
    audioRef.current.volume = volume;

    const audio = audioRef.current;
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = (e: Event) => {
      console.error("Audio error:", e);
      setIsPlaying(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, [streamUrl, volume]);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
    }
  }, [isPlaying]);

  const setVolume = useCallback((newVolume: number) => {
    if (audioRef.current) {
      const clampedVolume = Math.max(0, Math.min(1, newVolume));
      audioRef.current.volume = clampedVolume;
      setVolumeState(clampedVolume);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgram(getCurrentProgram());
    }, 60000); // Update program every minute
    return () => clearInterval(interval);
  }, []);

  const value = {
    isPlaying,
    isLive,
    volume,
    currentProgram,
    togglePlayPause,
    setVolume,
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
