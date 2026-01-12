"use client";

import { TeachingsContent } from "./TeachingsContent";
import { SpotifyEpisode, WordPressPost, YouTubeVideo } from "@/app/actions/data-fetchers";

interface TeachingsPageClientProps {
  videos: YouTubeVideo[];
  episodes: SpotifyEpisode[];
  articles: WordPressPost[];
  years: string[];
}

export function TeachingsPageClient({ videos, episodes, articles, years }: TeachingsPageClientProps) {
  return (
    <TeachingsContent
      videos={videos}
      episodes={episodes}
      articles={articles}
      years={years}
    />
  );
}
