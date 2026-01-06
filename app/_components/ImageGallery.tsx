"use client"

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedImage(null);
    setIsDialogOpen(false);
  };

  const handleShare = (image: GalleryImage) => {
    // Placeholder for actual share functionality
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image) => (
          <div key={image.id} className="relative overflow-hidden group cursor-pointer border border-gray-200 rounded-sm" onClick={() => openDialog(image)}>
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={300}
              className="w-full h-auto object-cover aspect-video"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="icon" variant="secondary" asChild>
                <a href={image.downloadLink} download>
                  <Download className="h-5 w-5" />
                </a>
              </Button>
              <Button size="icon" variant="secondary" onClick={(e) => { e.stopPropagation(); handleShare(image); }}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px] p-0">
            <DialogHeader className="p-4 pb-0">
              <DialogTitle>{selectedImage.alt}</DialogTitle>
            </DialogHeader>
            <div className="relative w-full aspect-video">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex justify-center gap-4 p-4">
              <Button asChild>
                <a href={selectedImage.downloadLink} download>
                  <Download className="mr-2 h-4 w-4" /> Download
                </a>
              </Button>
              <Button variant="outline" onClick={() => handleShare(selectedImage)}>
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};
