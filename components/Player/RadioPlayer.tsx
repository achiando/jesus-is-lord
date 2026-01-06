"use client"

import React from 'react';
import Image from 'next/image';
import { Play, Pause } from 'lucide-react';
import { useRadioPlayer } from '@/lib/context/RadioPlayerContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RadioPlayerProps {
  variant: "home-featured" | "page-full" | "mini-player";
  onNavigateToFull?: () => void;
}

export const RadioPlayer: React.FC<RadioPlayerProps> = ({ variant, onNavigateToFull }) => {
  const { isPlaying, isLive, currentProgram, togglePlayPause } = useRadioPlayer();

  if (!isLive && variant === "home-featured") {
    return null; // Home page featured player only shows when live
  }

  const renderContent = () => {
    if (!currentProgram) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-white">
          <p>No program information available.</p>
        </div>
      );
    }

    switch (variant) {
      case "home-featured":
        return (
          <div
            className={cn(
              "relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden",
              "bg-cover bg-center flex flex-col justify-between p-4 md:p-8",
              "text-white"
            )}
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${currentProgram.backgroundImage})` }}
            onClick={onNavigateToFull} // Navigate to full player on click
          >
            {isLive && (
              <div className="absolute top-4 left-4 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                LIVE
              </div>
            )}
            <div className="flex flex-col items-start">
              <h3 className="text-xl md:text-2xl font-bold">{currentProgram.title}</h3>
              <p className="text-sm md:text-base">{currentProgram.host}</p>
            </div>
            <div className="flex justify-center items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-16 w-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                onClick={(e) => { e.stopPropagation(); togglePlayPause(); }} // Stop propagation to prevent navigation
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
              </Button>
            </div>
          </div>
        );
      case "page-full":
        return (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="relative w-64 h-64 flex items-center justify-center rounded-full bg-blue-50 shadow-xl">
              {/* Pulsing rings placeholder */}
              <div className="absolute inset-0 rounded-full bg-blue-100 opacity-50 animate-pulse"></div>
              <div className="absolute inset-4 rounded-full bg-blue-100 opacity-50 animate-pulse delay-100"></div>
              <div className="relative w-48 h-48 rounded-full bg-white flex items-center justify-center shadow-lg">
                <Image src="/logo.png" alt="Jesus Is Lord Radio" width={96} height={96} />
              </div>
            </div>
            <h2 className="text-3xl font-bold mt-8">{currentProgram.title}</h2>
            <p className="text-lg text-gray-600">{currentProgram.host}</p>
            <Button
              variant="ghost"
              size="icon"
              className="h-20 w-20 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg mt-8"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause size={40} /> : <Play size={40} />}
            </Button>
            {/* Waveform placeholder */}
            <div className="mt-8 flex gap-1 h-8 items-end">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className={cn("w-1 h-full bg-blue-400 rounded-full", isPlaying && "animate-waveform")} style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
                ))}
            </div>
          </div>
        );
      case "mini-player":
        return (
          <div className="fixed bottom-16 left-4 right-4 z-40 h-16 bg-gray-800 rounded-lg flex items-center px-4 shadow-lg text-white">
            <Image src="/logo.png" alt="Jesus Is Lord Radio" width={40} height={40} className="rounded-md" />
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold truncate">{currentProgram.title}</p>
              <p className="text-xs text-gray-400 truncate">{currentProgram.host}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white ml-4"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderContent()}</>;
};
