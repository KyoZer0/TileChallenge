import type { Metadata } from "next";
import Script from 'next/script';
import { Quicksand, Fredoka, Righteous } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-arcade",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TileChallenge – Free Online Matching Puzzle Game",
    template: "%s | TileChallenge",
  },
  description:
    "Play TileChallenge online! A colorful, fun, and addictive tile-matching puzzle game. Test your strategy and clear the board.",
  keywords: [
    "TileChallenge",
    "tile puzzle",
    "matching game",
    "online puzzle",
    "free puzzle game",
    "brain games",
  ],
  authors: [{ name: "TileChallenge Team" }],
  creator: "TileChallenge",
  publisher: "TileChallenge",
  metadataBase: new URL("https://tilechallenge.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "TileChallenge",
    title: "TileChallenge – Free Online Tile Puzzle Game",
    description:
      "Play TileChallenge online! A colorful, fun, and addictive matching puzzle game.",
    url: "https://tilechallenge.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "TileChallenge – Free Online Tile Puzzle Game",
    description:
      "A colorful and addictive tile-matching game. Play free online today!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

function getPublisherId() {
  const raw = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  if (!raw) return '';
  return raw.startsWith('ca-pub-') ? raw : `ca-pub-${raw}`;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publisherId = getPublisherId();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {publisherId ? (
          <Script
            id="adsense-script"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "TileChallenge",
              url: "https://tilechallenge.com",
              description:
                "Free online tile-matching puzzle game. Colorful, fun, and addictive.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://tilechallenge.com/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={`${quicksand.variable} ${fredoka.variable} ${righteous.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
