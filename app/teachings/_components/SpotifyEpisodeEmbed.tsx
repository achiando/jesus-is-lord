"use client"

import React, { useEffect, useState } from 'react';

interface Track {
  track: {
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      images: Array<{ url: string }>;
    };
    external_urls: {
      spotify: string;
    };
  };
}

interface SpotifyPlaylistEmbedProps {
  playlistId: string;
  accessToken?: string;
  width?: string;
  height?: string;
}

export const SpotifyEpisodeEmbed: React.FC<SpotifyPlaylistEmbedProps> = ({
  playlistId,
  accessToken,
  width = "100%",
  height = "600",
}) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylistTracks = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch playlist tracks');
        }

        const data = await response.json();
        setTracks(data.items);
      } catch (err) {
        setError('Error loading playlist. Please check the playlist ID and try again.');
        console.error('Error fetching playlist:', err);
      } finally {
        setLoading(false);
      }
    };

    if (playlistId && accessToken) {
      fetchPlaylistTracks();
    }
  }, [playlistId, accessToken]);

  if (!playlistId) {
    return <p className="text-red-500">Error: Spotify playlist ID not provided.</p>;
  }

  if (loading) {
    return <div className="text-center py-4">Loading playlist...</div>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="w-full space-y-4">
      <div className="w-full rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={`https://open.spotify.com/embed/playlist/${playlistId}`}
          width={width}
          height={height}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="border-0"
        ></iframe>
      </div>
      
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Playlist Tracks</h3>
        <div className="space-y-3">
          {tracks.map((item, index) => (
            <a
              key={index}
              href={item.track.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded mr-4 overflow-hidden">
                {item.track.album.images[0]?.url && (
                  <img 
                    src={item.track.album.images[0].url} 
                    alt={item.track.album.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div>
                <h4 className="font-medium">{item.track.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.track.artists.map(artist => artist.name).join(', ')}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
