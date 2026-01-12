import { Suspense } from "react";
import { TeachingsContent } from "./_components/TeachingsContent";

// Import the data directly from the JSON cache files.
import { SpotifyEpisode, WordPressPost, YouTubeVideo } from "@/app/actions/data-fetchers";
import spotifyData from '@/data/spotify-cache.json';
import wordpressData from '@/data/wordpress-cache.json';
import youtubeData from '@/data/youtube-cache.json';

// This function extracts unique years from all content sources
export function getUniqueYears(
  videos: YouTubeVideo[], 
  episodes: SpotifyEpisode[], 
  articles: WordPressPost[]
): string[] {
  const years = new Set<string>();
  
  videos.forEach(v => v.publishedAt && years.add(v.publishedAt.substring(0, 4)));
  episodes.forEach(e => e.releaseDate && years.add(e.releaseDate.substring(0, 4)));
  articles.forEach(a => a.date && years.add(a.date.substring(0, 4)));

  return Array.from(years).sort((a, b) => b.localeCompare(a)); // Sort descending
}


export default function TeachingsPage() {
  const uniqueYears = getUniqueYears(
    youtubeData.videos, 
    spotifyData.episodes, 
    wordpressData.articles
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-serif font-bold text-primary">Teachings Library</h1>
        <p className="text-lg text-muted-foreground">Explore a rich collection of sermons, teachings, and articles.</p>
      </div>
      <Suspense fallback={<div className="text-center">Loading Teachings...</div>}>
        <TeachingsContent 
          videos={youtubeData.videos}
          episodes={spotifyData.episodes}
          articles={wordpressData.articles}
          years={uniqueYears}
        />
      </Suspense>
    </div>
  );
}