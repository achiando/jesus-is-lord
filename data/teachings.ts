export interface TeachingCardProps {
  type: 'audio' | 'video' | 'article';
  title: string;
  speaker?: string;
  series?: string;
  duration?: string;
  date?: string;
  description: string;
  thumbnail: string;
  link: string;
  downloadLink?: string;
  spotifyLink?: string;
  spotifyEmbedUrl?: string;
}

export const audioTeachings: TeachingCardProps[] = [
  {
    type: "audio",
    title: "Walking in Divine Purpose",
    speaker: "Senior Pastor John Doe",
    series: "Foundations of Faith",
    duration: "45:20",
    description: "Discover how to align your daily walk with God's eternal plan for your life and ministry.",
    thumbnail: "/images/teaching-cover-1.jpg",
    link: "#",
    downloadLink: "#",
  },
  {
    type: "audio",
    title: "The Power of Forgiveness",
    speaker: "Dr. Sarah Adams",
    series: "Living by Grace",
    duration: "30:15",
    description: "Learn about the liberating power of forgiveness and how it transforms your life.",
    thumbnail: "/images/teaching-cover-2.jpg",
    link: "#",
    downloadLink: "#",
  },
  {
    type: "audio",
    title: "Faith in Action",
    speaker: "Pastor David Chen",
    series: "Practical Christianity",
    duration: "55:00",
    description: "Understand how to put your faith into action and see God's promises manifest.",
    thumbnail: "/images/spotify-cover-1.jpg",
    link: "#",
    spotifyLink: "https://open.spotify.com/show/2U0AsCwsoPnNwtDMQ8j775",
    spotifyEmbedUrl: "https://open.spotify.com/embed/show/2U0AsCwsoPnNwtDMQ8j775",
  },
];

export const videoTeachings: TeachingCardProps[] = [
  {
    type: "video",
    title: "Understanding the Holy Spirit",
    speaker: "Bishop Michael",
    series: "Divine Encounters",
    duration: "60:00",
    description: "A deep dive into the person and work of the Holy Spirit in a believer's life.",
    thumbnail: "/images/video-cover-1.jpg",
    link: "#",
  },
  {
    type: "video",
    title: "The Kingdom of God",
    speaker: "Evangelist Grace",
    series: "Gospel Truths",
    duration: "40:00",
    description: "Explore the principles and realities of God's kingdom and how to live in it.",
    thumbnail: "/images/video-cover-2.jpg",
    link: "#",
  },
];

export const articles: TeachingCardProps[] = [
  {
    type: "article",
    title: "The Importance of Daily Devotion",
    date: "Jan 15, 2024",
    description: "Discover why a consistent daily devotion time is crucial for spiritual growth and intimacy with God.",
    thumbnail: "/images/article-cover-1.jpg",
    link: "#",
    downloadLink: "#",
  },
  {
    type: "article",
    title: "Navigating Life's Challenges with Faith",
    date: "Dec 20, 2023",
    description: "Practical steps and biblical principles to overcome adversity and maintain your faith.",
    thumbnail: "/images/article-cover-2.jpg",
    link: "#",
    downloadLink: "#",
  },
];
