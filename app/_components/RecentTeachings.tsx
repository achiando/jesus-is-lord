import { documents } from '@/data/teachings';
import { FileText, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const RecentTeachings = () => {
  // Get the 3 most recent documents for this example
  const recentDocs = documents.slice(0, 3);

  return (
    <section className="w-full">
      <h2 className="text-2xl font-serif font-bold mb-4">Recent Teachings</h2>
      <div className="space-y-3">
        {recentDocs.map((doc) => (
          <Link
            key={doc.title}
            href={doc.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-3 rounded-md bg-secondary/50 hover:bg-secondary transition-colors group"
          >
            <div className="p-2 bg-background rounded-md">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold leading-tight">{doc.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{doc.description}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </section>
  );
};
