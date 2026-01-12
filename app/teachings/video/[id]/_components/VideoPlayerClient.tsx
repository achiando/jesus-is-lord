"use client";

import { YouTubeVideo } from "@/app/actions/data-fetchers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface VideoPlayerClientProps {
  video: YouTubeVideo;
}

export function VideoPlayerClient({ video }: VideoPlayerClientProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{video.title}</CardTitle>
        <CardDescription>{video.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg shadow-lg"
          ></iframe>
        </div>
        <p className="text-sm text-muted-foreground">Published: {new Date(video.publishedAt).toLocaleDateString()}</p>
      </CardContent>
    </Card>
  );
}
