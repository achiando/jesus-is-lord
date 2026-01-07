"use client"

import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
  const [api, setApi] = React.useState<CarouselApi>();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!api) return;

    const startAutoplay = () => {
      timerRef.current = setInterval(() => {
        api.scrollNext();
      }, 5000);
    };

    startAutoplay();

    api.on("pointerDown", () => {
      if (timerRef.current) clearInterval(timerRef.current);
    });

    api.on("select", () => {
      if (timerRef.current) clearInterval(timerRef.current);
      startAutoplay();
    });

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [api]);

  return (
    <section className="w-full py-8">
      <h2 className="text-2xl font-serif font-bold mb-6 text-center">Announcements & Activities</h2>
      <Carousel className="w-full max-w-6xl mx-auto" setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {announcements.map((announcement) => (
            <CarouselItem key={announcement.id}>
              <div className="flex flex-col md:flex-row items-center overflow-hidden rounded-lg bg-card/50 md:h-80">
                <div className="relative w-full md:w-3/5 h-64 md:h-full">
                  <Image
                    src={announcement.imageUrl}
                    alt={announcement.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-full md:w-2/5 p-6 md:p-8 text-center md:text-left flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-3">{announcement.title}</h3>
                  <p className="text-muted-foreground mb-5">{announcement.description}</p>
                  {announcement.link && (
                    <div className="flex justify-center md:justify-start">
                      <Button asChild>
                        <Link href={announcement.link}>Learn More</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
};
