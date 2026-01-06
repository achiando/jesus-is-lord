"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Download, FileText, MoreHorizontal, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface TeachingCardProps {
  type: "audio" | "video" | "article";
  title: string;
  speaker?: string;
  series?: string;
  duration?: string; // For audio/video
  date?: string; // For articles
  description: string;
  thumbnail?: string; // For audio/video
  link: string; // Link to full teaching/article
  downloadLink?: string;
  spotifyLink?: string; // For Spotify hosted audio
  spotifyEmbedUrl?: string; // New prop for Spotify embed
}

export const TeachingCard: React.FC<TeachingCardProps> = ({
  type,
  title,
  speaker,
  series,
  duration,
  date,
  description,
  thumbnail,
  link,
  downloadLink,
  spotifyLink,
  spotifyEmbedUrl, // Destructure new prop
}) => {
  const renderActions = () => {
    if (type === "audio") {
      return (
        <>
          <Button size="sm" className="flex-1">
            <Play className="mr-2 h-3.5 w-3.5 fill-current" /> Listen
          </Button>
          {downloadLink && (
            <Button size="sm" variant="outline" title="Download Audio" asChild>
              <a href={downloadLink} download>
                <Download className="h-4 w-4" />
              </a>
            </Button>
          )}
          {spotifyLink && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" title="More Options">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={spotifyLink} target="_blank" rel="noopener noreferrer">
                    Listen on Spotify
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </>
      );
    } else if (type === "video") {
      return (
        <Button size="sm" className="flex-1">
          <Play className="mr-2 h-3.5 w-3.5 fill-current" /> Watch
        </Button>
      );
    } else if (type === "article") {
      return (
        <>
          <Button size="sm" className="flex-1" asChild>
            <Link href={link}>Read Article</Link>
          </Button>
          {downloadLink && (
            <Button size="sm" variant="outline" title="Download PDF" asChild>
              <a href={downloadLink} download>
                <FileText className="h-4 w-4" />
              </a>
            </Button>
          )}
        </>
      );
    }
    return null;
  };

  return (
    <Card className={cn(
      "overflow-hidden border-primary/5 transition-all",
      "hover:border-primary/20 hover:shadow-lg", // Hover effect
      "flex flex-col" // Ensure card takes full height in grid
    )}>
      {(thumbnail && (type === "audio" || type === "video")) && (
        <div className="relative w-full aspect-video bg-muted">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Button size="icon" className="rounded-full h-12 w-12 bg-white/80 hover:bg-white text-primary">
              <Play className="h-6 w-6 fill-current" />
            </Button>
          </div>
        </div>
      )}
      {spotifyEmbedUrl && type === "audio" && (
        <div className="relative w-full aspect-video bg-muted">
          <iframe
            src={spotifyEmbedUrl}
            width="100%"
            height="152" // Spotify embed height for podcast/episode
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="border-0"
          ></iframe>
        </div>
      )}
      {thumbnail && type === "article" && (
        <div className="relative w-full aspect-video bg-muted">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <CardHeader className="bg-primary/5 pb-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          {date && <span className="text-xs font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10">{date}</span>}
          {duration && <span className="text-xs text-muted-foreground">{duration}</span>}
        </div>
        <CardTitle className="text-lg leading-tight">{title}</CardTitle>
        {speaker && <CardDescription>{speaker}</CardDescription>}
        {series && <CardDescription className="text-xs text-muted-foreground">{series}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-6 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2 pt-4">
        {renderActions()}
      </CardFooter>
    </Card>
  );
};