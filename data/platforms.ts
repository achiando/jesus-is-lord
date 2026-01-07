import { Youtube, Tv } from 'lucide-react';

export interface Platform {
  name: string;
  handle: string;
  link: string;
  icon: 'youtube' | 'tv';
}

export const platforms: Platform[] = [
  {
    name: 'Main Teachings Channel',
    handle: '@JesusIsLordRadioGlobal',
    link: 'https://www.youtube.com/@JesusIsLordRadioGlobal',
    icon: 'youtube',
  },
  {
    name: 'Repentance Channel',
    handle: '@RepentanceChannel',
    link: 'https://www.youtube.com/@RepentanceChannel',
    icon: 'youtube',
  },
  {
    name: 'Jesus is Lord TV',
    handle: 'Terrestrial TV',
    link: '#',
    icon: 'tv',
  },
];
