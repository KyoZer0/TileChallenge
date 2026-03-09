import type { Metadata } from 'next';
import HeroSection from './components/HeroSection';
import HomeContent from './components/HomeContent';

export const metadata: Metadata = {
  title: 'TileChallenge – The Ultimate Puzzle',
  description: 'Relax with TileChallenge, an elegant and free online matching puzzle game.',
  keywords: ['TileChallenge', 'tile puzzle', 'matching game', 'online puzzle', 'free game'],
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <HomeContent />
    </>
  );
}
