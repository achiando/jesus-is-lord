"use client"

import React from 'react';
import { Volume1, Volume2, VolumeX } from 'lucide-react';
import { useRadioPlayer } from '@/lib/context/RadioPlayerContext';
import { cn } from '@/lib/utils';

export const VolumeControl = () => {
  const { volume, setVolume, isPlaying } = useRadioPlayer();

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
  };

  const getVolumeIcon = () => {
    if (volume === 0) {
      return <VolumeX className="h-6 w-6 text-gray-500" />;
    }
    if (volume < 0.5) {
      return <Volume1 className="h-6 w-6 text-gray-500" />;
    }
    return <Volume2 className="h-6 w-6 text-gray-500" />;
  };

  return (
    <div className="flex items-center gap-3 w-full max-w-xs mt-8">
      {getVolumeIcon()}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className={cn(
          "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-blue-500",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md",
          "[&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none",
          isPlaying && "[&::-webkit-slider-thumb]:animate-pulse-scale" // Pulsating thumb when playing
        )}
      />
    </div>
  );
};
