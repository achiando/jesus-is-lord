// data/teachings.ts

export interface Playlist {
  platform: 'spotify' | 'youtube';
  playlistId: string;
  title: string;
  description: string;
}

export interface Document {
  title: string;
  description: string;
  link: string;
  type: 'pdf' | 'google-doc' | 'web-link';
}

export const audioPlaylists: Playlist[] = [
  {
    platform: 'spotify',
    playlistId: '1xD1LP2bWQx2KPBktwZlsf', // Example Playlist ID
    title: 'Sunday Sermons',
    description: 'Listen to the powerful Sunday service teachings from the main altar.',
  },
  {
    platform: 'spotify',
    playlistId: '37i9dQZF1DXaB4n0u6914s', // Example Playlist ID
    title: 'Mid-Week Services',
    description: 'Catch up on the anointed teachings from our mid-week fellowship.',
  },
];

export const videoPlaylists: Playlist[] = [
  {
    platform: 'youtube',
    playlistId: 'PL2MI0fUR_b4s4z_4a6I0Y3f5s_gK8dJ_', // Example Playlist ID
    title: 'Healing & Deliverance Services',
    description: 'Watch the powerful move of God in our Healing and Deliverance services.',
  },
  {
    platform: 'youtube',
    playlistId: 'PL2MI0fUR_b4v3pW3h-A3i_jO-G4gK8dJ_', // Example Playlist ID
    title: 'National Youth Conferences',
    description: 'Highlights and full sessions from our national youth conferences.',
  },
];

export const documents: Document[] = [
  {
    title: 'The Importance of Daily Devotion',
    description: 'A guide to establishing a consistent and fruitful daily devotion time for spiritual growth.',
    link: '#', // Placeholder for a direct link to a PDF or Google Doc
    type: 'pdf',
  },
  {
    title: 'Navigating Life\'s Challenges with Faith',
    description: 'Biblical principles to overcome adversity and maintain your faith in difficult seasons.',
    link: '#', // Placeholder
    type: 'google-doc',
  },
  {
    title: 'Foundations of Faith: A Study Guide',
    description: 'A comprehensive study guide on the foundational doctrines of our faith.',
    link: '#', // Placeholder
    type: 'pdf',
  },
];