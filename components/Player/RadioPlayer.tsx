"use client"

import { Button } from '@/components/ui/button';
import { useRadioPlayer } from '@/lib/context/RadioPlayerContext';
import { cn } from '@/lib/utils';
import { Pause, Play } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { VolumeControl } from './VolumeControl'; // Import the new VolumeControl

interface RadioPlayerProps {
  variant: "home-featured" | "page-full" | "mini-player";
  onNavigateToFull?: () => void;
}

export const RadioPlayer: React.FC<RadioPlayerProps> = ({ variant, onNavigateToFull }) => {
  const { isPlaying, isLive, currentProgram, togglePlayPause } = useRadioPlayer();

  if (!isLive && variant === "home-featured") {
    return null;
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
              "relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden cursor-pointer border border-white/10",
              "bg-cover bg-center flex flex-col justify-between p-4 md:p-8 border border-red-500 border-4 rounded-lg",
              "text-white group"
            )}
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${currentProgram.backgroundImage || '/image_1.png'})` }}
            onClick={onNavigateToFull}
          >
            {isLive && (
              <div className="absolute top-4 left-4 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold uppercase flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                LIVE
              </div>
            )}
            <div className="z-10">
              <h3 className="text-xl md:text-2xl font-bold">{currentProgram.title}</h3>
              <p className="text-sm md:text-base">{currentProgram.speaker}</p>
            </div>
            <div className="absolute inset-0 flex justify-center items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-16 w-16 rounded-full bg-blue-600/80 hover:bg-blue-700/90 text-white shadow-lg transition-transform transform group-hover:scale-110"
                onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
              </Button>
            </div>
          </div>
        );
      case "page-full":
        return (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center border border-primary border-4 rounded-lg">
            <div className={cn(
              "relative w-64 h-64 flex items-center justify-center",
              isPlaying && "animate-spin-slow" // Apply slow spin when playing
            )}>
              <div
                className={cn(
                  "relative w-full h-full rounded-full bg-white flex items-center justify-center shadow-lg overflow-hidden border-4 border-white",
                  "transition-transform duration-500",
                  isPlaying && "animate-pulse-scale" // Apply pulse and scale when playing
                )}
              >
                <Image
                  src={currentProgram.image || '/logo.png'}
                  alt={currentProgram.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>
            <h2 className="text-3xl font-bold mt-8">{currentProgram.title}</h2>
            <p className="text-lg text-gray-600">{currentProgram.speaker}</p>
            <Button
              variant="ghost"
              size="icon"
              className="h-20 w-20 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg mt-8"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause size={40} /> : <Play size={40} className="ml-1" />}
            </Button>
            <VolumeControl />
            <div className="mt-8 flex gap-1 h-8 items-end">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-1 bg-blue-400 rounded-full transition-all duration-300",
                    isPlaying ? "animate-wave" : "h-1"
                  )}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationPlayState: isPlaying ? 'running' : 'paused',
                    height: isPlaying ? `${Math.random() * 80 + 20}%` : '4px'
                  }}
                ></div>
              ))}
            </div>
          </div>
        );
      case "mini-player":
        return (
          <div className="fixed bottom-16 left-4 right-4 z-40 h-16 bg-gray-800 rounded-lg flex items-center px-4 shadow-lg text-white border border-gray-600">
            <Image
              src={currentProgram.image || '/logo.png'}
              alt={currentProgram.title}
              width={40}
              height={40}
              className="rounded-md"
            />
            <div className="ml-3 flex-1">
              <p className="text-sm font-semibold truncate">{currentProgram.title}</p>
              <p className="text-xs text-gray-400 truncate">{currentProgram.speaker}</p>
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
