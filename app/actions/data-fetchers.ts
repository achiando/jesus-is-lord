
import { teachingsConfig } from '@/data/teachings.config';

// --- TYPE DEFINITIONS ---

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoId: string;
  publishedAt: string;
}

export interface SpotifyEpisode {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  url: string;
  releaseDate: string;
  durationMs: number;
}

export interface WordPressPost {
    id: number;
    date: string;
    slug: string;
    title: string;
    excerpt: string;
    link: string;
    featuredImageUrl?: string;
}


// --- SPOTIFY API HELPERS ---

// This function handles the client credentials flow to get an access token.
async function getSpotifyAccessToken() {
  const { clientId, clientSecret } = teachingsConfig.spotify;

  if (!clientId || !clientSecret) {
    // Return null instead of throwing an error if config is missing
    console.warn("Spotify client ID or secret is not configured. Skipping Spotify fetch.");
    return null;
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // The client ID and secret must be Base64 encoded.
      "Authorization": "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    },
    body: "grant_type=client_credentials",
    // Cache for 55 minutes (tokens expire in 60 minutes)
    next: { revalidate: 3300 } 
  });

  if (!response.ok) {
    console.error("Failed to fetch Spotify access token. Please check your credentials.");
    return null;
  }

  const data = await response.json();
  return data.access_token;
}

// --- PUBLIC DATA FETCHERS ---

export async function getYouTubePlaylistItems(playlistId: string, apiKey: string): Promise<YouTubeVideo[]> {
  if (!apiKey) {
    console.error("YouTube API key is missing.");
    return [];
  }

  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${apiKey}`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Failed to fetch YouTube playlist ${playlistId}. Please check your API key and playlist ID. Error:`, errorData.error.message);
      return [];
    }
    const data = await response.json();

    // Map the raw API response to our clean YouTubeVideo type
    return data.items.map((item: any): YouTubeVideo => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
      videoId: item.snippet.resourceId.videoId,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (error) {
    console.error(`Error fetching YouTube playlist ${playlistId}:`, error);
    return [];
  }
}


export async function getSpotifyPlaylistItems(playlistId: string): Promise<SpotifyEpisode[]> {
  try {
    const accessToken = await getSpotifyAccessToken();
    // If the token is null (due to missing or incorrect config), stop here.
    if (!accessToken) {
      return [];
    }

    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Failed to fetch Spotify playlist ${playlistId}. Error:`, errorData.error.message);
      return [];
    }

    const data = await response.json();

    // Map the raw API response to our clean SpotifyEpisode type
    return data.items
      .filter((item: any) => item.track) // Ensure track data exists
      .map((item: any): SpotifyEpisode => ({
        id: item.track.id,
        title: item.track.name,
        description: item.track.description || '',
        thumbnailUrl: item.track.album.images[0]?.url,
        url: item.track.external_urls.spotify,
        releaseDate: item.track.album.release_date,
        durationMs: item.track.duration_ms,
      }));
  } catch (error) {
    console.error(`Error fetching Spotify playlist ${playlistId}:`, error);
    return [];
  }
}

export async function getWordPressPosts(): Promise<WordPressPost[]> {
    const { baseUrl } = teachingsConfig.wordPress;
    // Fetch the 10 most recent posts, and get embedded featured images
    const url = `${baseUrl}/posts?_embed&per_page=10`;

    try {
        const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
        if (!response.ok) {
            console.error("Failed to fetch WordPress posts. Status:", response.status);
            return [];
        }
        const data = await response.json();

        // Map the raw API response to our clean WordPressPost type
        return data.map((item: any): WordPressPost => ({
            id: item.id,
            date: item.date,
            slug: item.slug,
            title: item.title.rendered,
            excerpt: item.excerpt.rendered,
            link: item.link,
            featuredImageUrl: item. _embedded?.['wp:featuredmedia']?.[0]?.source_url,
        }));

    } catch (error) {
        console.error("Error fetching WordPress posts:", error);
        return [];
    }
}
