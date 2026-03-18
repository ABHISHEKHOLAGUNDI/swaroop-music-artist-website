import type { Metadata } from 'next';
import { DM_Sans, Cinzel } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dmsans', display: 'swap' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel', display: 'swap' });

export const metadata: Metadata = {
  title: 'AATMAN YODHA | Cinematic Music Experience',
  description: 'Experience the sonic architecture of Aatman Yodha. An eco-conscious music artist blending pop culture, live concerts, and environmental advocacy.',
  keywords: [
    'aatman yodha',
    'best music artist',
    'cinematic music tickets',
    'environmental music artist',
    'live music'
  ],
  openGraph: {
    title: 'AATMAN YODHA | Cinematic Music Experience',
    description: 'Experience the cinematic music journey of Aatman Yodha.',
    url: 'https://aatmanyodha.com',
    siteName: 'Aatman Yodha',
    images: [
      {
        url: 'https://aatmanyodha.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aatman Yodha Live',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cinzel.variable}`}>
      <body className="antialiased bg-brand-dark text-brand-light">
        <div className="noise-bg"></div>
        {children}
      </body>
    </html>
  );
}
