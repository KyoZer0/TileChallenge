import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '../components/AdSlot';

export const metadata: Metadata = {
  title: 'About TileChallenge',
  description: 'Learn what TileChallenge is, why the site exists, and how we approach browser-based puzzle content, accessibility, and trust.',
  keywords: ['about TileChallenge', 'browser puzzle game team', 'TileChallenge mission']
};

export default function AboutPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="gradient-text">About TileChallenge</h1>
          <p>What the game is, what kind of experience we want to build, and how we try to keep the site useful and trustworthy.</p>
        </div>
      </div>

      <div className="page-content">
        <h2>What TileChallenge is</h2>
        <p>
          TileChallenge is a free browser-based tile-matching puzzle game. Players clear boards by selecting open tiles and building sets of three identical
          designs in a limited tray. The goal is simple enough to understand quickly, but the puzzle still rewards planning and careful board reading.
        </p>

        <h2>Why we built the site this way</h2>
        <p>
          We wanted a game that was easy to start and comfortable to return to. Browser access keeps the barrier low, and short puzzle sessions make the
          site practical for quick breaks on desktop or mobile. We also want the surrounding pages to be genuinely helpful, not just placeholders around a game embed.
        </p>

        <h2>Our content approach</h2>
        <p>
          Beyond the game itself, we publish original guides, FAQs, and blog articles that explain how TileChallenge works, how to improve at it, and how we
          think about site quality, accessibility, and family-friendly design. The goal is to give visitors real information before and after they play.
        </p>

        <AdSlot type="in-content" />

        <h2>What matters to us</h2>
        <ul>
          <li><strong>Clarity:</strong> Players should be able to understand the game and the site without digging through vague copy.</li>
          <li><strong>Accessibility:</strong> We aim for readable layouts, responsive pages, and ongoing improvements across the site experience.</li>
          <li><strong>Family-friendly presentation:</strong> The site is designed to feel broadly suitable for casual and household use.</li>
          <li><strong>Transparency:</strong> Contact details, privacy information, cookie details, and policy pages should be easy to find.</li>
        </ul>

        <h2>How the site is supported</h2>
        <p>
          TileChallenge uses advertising to support free access. That makes content quality especially important: pages should still be informative, original,
          and easy to use even when ads are present.
        </p>

        <h2>Get in touch</h2>
        <p>
          If you have feedback about gameplay, broken pages, accessibility concerns, or partnership inquiries, please visit the{' '}
          <Link href="/contact">Contact page</Link>. We want the site to keep improving over time.
        </p>

        <AdSlot type="banner" />
      </div>
    </>
  );
}
