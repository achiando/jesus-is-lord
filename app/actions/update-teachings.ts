"use server";

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { teachingsConfig } from '@/data/teachings.config';
import { getYouTubePlaylistItems, getSpotifyPlaylistItems, getWordPressPosts } from './data-fetchers';

// Defines the structure of the response from this server action
interface ActionResult {
  success: boolean;
  message: string;
}

export async function updateTeachingsCache(): Promise<ActionResult> {
  console.log("Starting teachings cache update...");
  let success = true;
  let messages: string[] = [];

  try {
    // --- FETCH YOUTUBE DATA ---
    const { apiKey, playlists: youtubePlaylists } = teachingsConfig.youTube;
    if (apiKey) {
      console.log("Fetching YouTube data...");
      const youtubeDataPromises = youtubePlaylists.map(p => getYouTubePlaylistItems(p.id, apiKey));
      const youtubeResults = await Promise.all(youtubeDataPromises);
      const allYouTubeVideos = youtubeResults.flat();

      const youtubeCachePath = path.join(process.cwd(), 'data', 'youtube-cache.json');
      await fs.writeFile(youtubeCachePath, JSON.stringify({ videos: allYouTubeVideos }, null, 2));
      messages.push(`Synced ${allYouTubeVideos.length} videos from YouTube.`);
      console.log(`Successfully wrote ${allYouTubeVideos.length} videos to youtube-cache.json`);
    } else {
      messages.push("YouTube API key not configured. Skipped.");
      console.warn("YouTube API key is not set. Skipping YouTube fetch.");
    }

    // --- FETCH SPOTIFY DATA ---
    const { clientId, clientSecret, playlists: spotifyPlaylists } = teachingsConfig.spotify;
    if (clientId && clientSecret) {
      console.log("Fetching Spotify data...");
      const spotifyDataPromises = spotifyPlaylists.map(p => getSpotifyPlaylistItems(p.id));
      const spotifyResults = await Promise.all(spotifyDataPromises);
      const allSpotifyEpisodes = spotifyResults.flat();

      const spotifyCachePath = path.join(process.cwd(), 'data', 'spotify-cache.json');
      await fs.writeFile(spotifyCachePath, JSON.stringify({ episodes: allSpotifyEpisodes }, null, 2));
      messages.push(`Synced ${allSpotifyEpisodes.length} episodes from Spotify.`);
      console.log(`Successfully wrote ${allSpotifyEpisodes.length} episodes to spotify-cache.json`);
    } else {
      messages.push("Spotify credentials not configured. Skipped.");
      console.warn("Spotify credentials not configured. Skipping Spotify fetch.");
    }

    // --- FETCH WORDPRESS DATA ---
    const { baseUrl } = teachingsConfig.wordPress;
    const placeholderUrl = "https://your-wordpress-site.com/wp-json/wp/v2";
    if (baseUrl && baseUrl !== placeholderUrl) {
      console.log("Fetching WordPress data...");
      const allWordPressPosts = await getWordPressPosts();
      const wordpressCachePath = path.join(process.cwd(), 'data', 'wordpress-cache.json');
      await fs.writeFile(wordpressCachePath, JSON.stringify({ articles: allWordPressPosts }, null, 2));
      messages.push(`Synced ${allWordPressPosts.length} articles from WordPress.`);
      console.log(`Successfully wrote ${allWordPressPosts.length} articles to wordpress-cache.json`);
    } else {
      messages.push("WordPress URL not configured. Skipped.");
      console.warn("WordPress URL not configured. Skipping WordPress fetch.");
    }

    // --- REVALIDATE CACHE ---
    revalidatePath('/teachings');
    revalidatePath('/(admin)/admin/teachings');
    console.log("Cache revalidated for /teachings and admin page.");

    return {
      success: success,
      message: messages.join(' '),
    };

  } catch (error) {
    console.error("A critical error occurred during teachings cache update:", error);
    return {
      success: false,
      message: "A critical error occurred. Check server logs for details.",
    };
  }
}