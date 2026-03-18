import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });

export const metadata: Metadata = {
  title: 'Best Music Artist in Gadag | Eco-Conscious Pop Culture & Concerts',
  description: 'Experience the best music in Gadag. An eco-conscious music artist blending pop culture, live concerts, and environmental advocacy (air, water, soil, and sustainable living).',
  keywords: [
    'best music artist in gadag',
    'best music in gadag',
    'pop culture concerts gadag',
    'environmental music artist',
    'eco-friendly business music',
    'sustainable living diet and music',
    'air water soil conservation music',
    'live music gadag'
  ],
  openGraph: {
    title: 'Best Music Artist in Gadag | Eco-Conscious Pop Culture',
    description: 'Experience the best music in Gadag. An eco-conscious music artist blending pop culture, live concerts, and environmental advocacy.',
    url: 'https://yourwebsite.com',
    siteName: 'Your Artist Name',
    images: [
      {
        url: 'https://yourwebsite.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Artist Name in Gadag',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} scroll-smooth`}>
      <body className="antialiased bg-brand-orange text-brand-white selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
