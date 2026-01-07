"use client"

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Download, Share2 } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  downloadLink: string;
  shareLink: string; // Placeholder for actual share functionality
}

const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/image_4.png',
    alt: 'Church Gathering 1',
    downloadLink: '/image_4.png',
    shareLink: '#',
  },
  {
    id: '2',
    src: '/image_5.png',
    alt: 'Worship Session',
    downloadLink: '/image_5.png',
    shareLink: '#',
  },
  {
    id: '3',
    src: '/image copy.png',
    alt: 'Community Event',
    downloadLink: '/image copy.png',
    shareLink: '#',
  },
  {
    id: '4',
    src: '/image copy 2.png',
    alt: 'Prayer Meeting',
    downloadLink: '/image copy 2.png',
    shareLink: '#',
  },
  {
    id: '5',
    src: '/image copy 3.png',
    alt: 'Youth Group',
    downloadLink: '/image copy 3.png',
    shareLink: '#',
  },
  {
    id: '6',
    src: '/image copy 4.png',
    alt: 'Bible Study',
    downloadLink: '/image copy 4.png',
    shareLink: '#',
  },
];

export const ImageGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const openDialog = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const handleShare = (image: GalleryImage) => {
    if (navigator.share) {
      navigator.share({
        title: image.alt,
        url: window.location.origin + image.src,
      }).catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Share functionality not supported in this browser.');
    }
  };

  return (
    <section className="w-full py-8">
      <h2 className="text-2xl font-serif font-bold mb-6 text-center">Our Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {galleryImages.map((image) => (
          <div key={image.id} className="relative overflow-hidden group cursor-pointer" onClick={() => openDialog(image)}>
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={300}
              className="w-full h-auto object-cover aspect-square"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" asChild>
                <a href={image.downloadLink} download onClick={(e) => e.stopPropagation()}>
                  <Download className="h-6 w-6" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={(e) => { e.stopPropagation(); handleShare(image); }}>
                <Share2 className="h-6 w-6" />
              </Button>
            </div>
          </div>
        ))}
      </div>

  {selectedImage && (
  <Dialog open={!!selectedImage} onOpenChange={(o) => !o && setSelectedImage(null)}>
    <DialogContent
      className="
        w-screen
        h-screen
        max-w-none
        max-h-none
        p-0
        bg-black/95
        border-none
        overflow-hidden
      "
    >
      <DialogTitle className="sr-only">
        {selectedImage.alt}
      </DialogTitle>

      <div className="relative w-full h-full">
  <div className="absolute inset-0">
    <Image
      src={selectedImage.src}
      alt={selectedImage.alt}
      fill
      sizes="100vw"
      className="object-contain"
      priority
    />
  </div>

  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 bg-black/60 p-4 rounded-lg z-10">
    <Button asChild>
      <a href={selectedImage.downloadLink} download>
        <Download className="mr-2 h-4 w-4" /> Download
      </a>
    </Button>
    <Button variant="outline" onClick={() => handleShare(selectedImage)}>
      <Share2 className="mr-2 h-4 w-4" /> Share
    </Button>
  </div>
</div>

    </DialogContent>
  </Dialog>
)}

    </section>
  );
};
