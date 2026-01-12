"use client";

import { SpotifyEpisode } from "@/app/actions/data-fetchers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AudioPlayerClientProps {
  episode: SpotifyEpisode;
}

export function AudioPlayerClient({ episode }: AudioPlayerClientProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{episode.title}</CardTitle>
        <CardDescription>{episode.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={`https://open.spotify.com/embed/episode/${episode.id}`}
            width="100%"
            height="232" // Standard Spotify embed height for episodes
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
        <p className="text-sm text-muted-foreground">Released: {new Date(episode.releaseDate).toLocaleDateString()}</p>
        <Button asChild>
          <Link href={episode.url} target="_blank" rel="noopener noreferrer">
            Listen on Spotify
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
