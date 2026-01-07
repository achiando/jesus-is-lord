import { cn } from '@/lib/utils';
import React from 'react';

export const Mission = () => {
  return (
    <section className="relative w-full py-24 md:py-32">
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <Image
        src="/image_3.png" // Using an existing image for the background
        alt="A crowd in worship"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="container mx-auto px-4 relative z-20 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
          Repent and Prepare The Way
        </h2>
        <blockquote className="mt-8 max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl italic text-white/90">
            “A voice of one calling: ‘In the wilderness prepare the way for the LORD; make straight in the desert a highway for our God.’”
          </p>
          <cite className="block mt-4 text-lg text-white/70 not-italic">
            Isaiah 40:3
          </cite>
        </blockquote>
      </div>
    </section>
  );
};

// We need to add the Image component to the scope for this to work.
// This is a placeholder for the actual import.
import Image from 'next/image';