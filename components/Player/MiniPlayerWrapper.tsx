"use client"

import React from 'react';
import { useRadioPlayer } from '@/lib/context/RadioPlayerContext';
import { RadioPlayer } from './RadioPlayer'; // Assuming RadioPlayer is in the same directory

export const MiniPlayerWrapper: React.FC = () => {
  const { isPlaying } = useRadioPlayer();

  if (!isPlaying) {
    return null;
  }

  return <RadioPlayer variant="mini-player" />;
};
