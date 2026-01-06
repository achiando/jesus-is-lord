"use client"

import React from 'react';

interface YouTubePlaylistEmbedProps {
  playlistId: string;
  width?: string;
  height?: string;
  title?: string;
}

export const YouTubePlaylistEmbed: React.FC<YouTubePlaylistEmbedProps> = ({
  playlistId,
  width = "100%",
  height = "500",
  title = "YouTube Playlist"
}) => {
  if (!playlistId) {
    return <p className="text-red-500">Error: YouTube playlist ID not provided.</p>;
  }

  const embedUrl = `https://www.youtube.com/embed/videoseries?list=${playlistId}`;

  return (
    <div className="w-full">
      <h3 className="text-xl font-serif font-bold mb-4">{title}</h3>
      <div className="aspect-video w-full">
        <iframe
          width={width}
          height={height}
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg shadow-lg"
        ></iframe>
      </div>
    </div>
  );
};
