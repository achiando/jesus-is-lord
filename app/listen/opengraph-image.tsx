
import { generateOgImage } from '@/components/shared/OgImage';

export const runtime = 'edge';
export const alt = 'Listen Live | Jesus Is Lord Radio';
export const contentType = 'image/png';

// This file generates the OG image for the Listen page.
export default async function Image() {
  return generateOgImage('Listen Live');
}
