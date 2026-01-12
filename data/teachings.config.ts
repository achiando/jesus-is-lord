
// data/teachings.config.ts
// IMPORTANT: You must create a .env.local file in the root of your project
// and add your API keys there.
//
// .env.local
// YOUTUBE_API_KEY=your_youtube_api_key_here
// SPOTIFY_CLIENT_ID=your_spotify_client_id_here
// SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here

export const teachingsConfig = {
  youTube: {
    // Fetch your API key from the Google Cloud Console
    apiKey: process.env.YOUTUBE_API_KEY,
    // Add the public playlist IDs you want to fetch
    playlists: [
      { id: "PLwBWRXgffpKNImLCLl9nefMgTmW_qHnXX", title: "Repentance and Holiness Ministry" }
    ]
  },
  spotify: {
    // Fetch your credentials from the Spotify Developer Dashboard
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    // Add the public playlist IDs you want to fetch
    playlists: [
      { id: "37i9dQZF1DX4sWSpwq3LiO", title: "Worship Hour" },
    ]
  },
  wordPress: {
    // Replace with the URL to your WordPress site's REST API
    baseUrl: "https://techcrunch.com/wp-json/wp/v2"
  }
};
