
import { ImageResponse } from 'next/og';

// This is a reusable function that generates the OG Image.
export async function generateOgImage(title: string) {
  // Fetch the font from Google Fonts CDN.
  const fontData = await fetch(
    new URL('https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuU_Y-ziXW_tvpcA.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  // The logo path needs to be an absolute URL, even for local files.
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  const logoUrl = `${baseUrl}/logo.png`;

  return new ImageResponse(
    (
      <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#111827', color: 'white', fontFamily: '"Inter"', padding: '40px' }}>
        <img src={logoUrl} alt="Logo" width={128} height={128} style={{ borderRadius: '50%', marginBottom: '40px' }} />
        <h1 style={{ fontSize: '60px', fontWeight: 'bold', textAlign: 'center', lineHeight: 1.2, marginBottom: '20px' }}>{title}</h1>
        <p style={{ fontSize: '30px', color: '#D1D5DB' }}>Jesus Is Lord Radio</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: 'Inter', data: fontData, style: 'normal', weight: 700 }],
    }
  );
}
