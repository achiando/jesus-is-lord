import { Youtube, Tv } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { platforms } from '@/data/platforms'; // Import data

const iconMap = {
  youtube: <Youtube className="h-5 w-5 text-red-500" />,
  tv: <Tv className="h-5 w-5 text-blue-500" />,
};

export const Platforms = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Our Platforms</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {platforms.map((platform) => (
          <Link
            key={platform.name}
            href={platform.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group p-2 rounded-md hover:bg-secondary transition-colors"
          >
            <div className="flex-shrink-0">
              {iconMap[platform.icon]}
            </div>
            <div>
              <p className="font-medium group-hover:text-primary transition-colors">{platform.name}</p>
              <p className="text-sm text-muted-foreground">{platform.handle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
