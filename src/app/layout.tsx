import type { Metadata, Viewport } from "next";
import { DM_Sans, Cinzel } from 'next/font/google';
import "./globals.css";

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dmsans', display: 'swap' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel', display: 'swap' });

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "AATMAN YODHA | Sonic Architecture & Live Encounters",
  description: "Experience the transcendental sonic architecture of Aatman Yodha. Global tour dates, exclusive Vault merchandise, and unparalleled live encounters.",
  keywords: ["Aatman Yodha", "Music Artist", "Concerts", "Tour Dates", "Trance", "EDM", "Sonic Architecture", "Live Encounters"],
  authors: [{ name: "Aatman Yodha" }],
  creator: "ABHISHEK H & TEAM",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aatmanyodha.com",
    title: "AATMAN YODHA | Sonic Architecture",
    description: "Experience the transcendental sonic architecture of Aatman Yodha.",
    siteName: "AATMAN YODHA",
    images: [{
      url: "/assets/main-dashboard.png",
      width: 1200,
      height: 630,
      alt: "Aatman Yodha Cover",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AATMAN YODHA | Sonic Architecture",
    description: "Experience the transcendental sonic architecture of Aatman Yodha.",
    creator: "@aatmanyodha",
    images: ["/assets/main-dashboard.png"],
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
    <html lang="en" className={`${dmSans.variable} ${cinzel.variable}`}>
      <head>
        <link rel="icon" href="/assets/vintage_mic.png" type="image/png" />
      </head>
      <body className="antialiased font-dmsans bg-[#0a0a0a] text-brand-light">
        <div className="noise-bg"></div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicGroup",
              "name": "Aatman Yodha",
              "url": "https://aatmanyodha.com",
              "image": "https://aatmanyodha.com/assets/main-dashboard.png",
              "description": "Redefining live concerts and sustainable artistry for a new generation.",
              "genre": ["Ambient", "Electronic", "Cinematic"],
              "member": [
                {
                  "@type": "OrganizationRole",
                  "member": {
                    "@type": "Person",
                    "name": "Aatman Yoga Creator",
                    "sameAs": "https://instagram.com/aatmanyodha"
                  },
                  "roleName": ["Producer", "Vocalist"]
                }
              ]
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
