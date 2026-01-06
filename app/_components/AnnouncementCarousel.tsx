"use client"

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

interface Announcement {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
}

const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Annual Youth Conference',
    description: 'Join us for an empowering weekend of worship, teaching, and fellowship.',
    imageUrl: '/image_1.png',
    link: '#',
  },
  {
    id: '2',
    title: 'Global Prayer Vigil',
    description: 'Unite with believers worldwide in a night of fervent prayer for revival.',
    imageUrl: '/image_2.png',
    link: '#',
  },
  {
    id: '3',
    title: 'New Teaching Series: Living by Faith',
    description: 'Discover practical steps to walk in unwavering faith amidst life\'s challenges.',
    imageUrl: '/image_3.png',
    link: '#',
  },
  {
    id: '4',
    title: 'Community Outreach Program',
    description: 'Partner with us to serve our local community and share the love of Christ.',
    imageUrl: '/image.png',
    link: '#',
  },
];

export const AnnouncementCarousel: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi>(); // Use useState for api
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!api) return;

    timerRef.current = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [api]);

  return (
    <section className="w-full">
      <h2 className="text-2xl font-serif font-bold mb-6 text-center">Announcements & Activities</h2>
      <Carousel className="w-full max-w-4xl mx-auto" setApi={setApi} opts={{ loop: true }}> {/* Pass setApi and opts */}
        <CarouselContent>
          {announcements.map((announcement) => (
            <CarouselItem key={announcement.id}>
              <div className="p-1">
                <Card> {/* Removed a tag wrapping the Card */}
                  <CardContent className="flex flex-col md:flex-row items-center justify-center p-6 md:p-8 gap-6">
                    <div className="relative w-full md:w-1/2 aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={announcement.imageUrl}
                        alt={announcement.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left">
                      <h3 className="text-xl font-bold mb-2">{announcement.title}</h3>
                      <p className="text-muted-foreground mb-4">{announcement.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};