import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '../components/AdSlot';

export const metadata: Metadata = {
  title: 'Parents and Family Guide',
  description: 'Information for parents about TileChallenge, including family-friendly design, advertising context, privacy considerations, and healthy play habits.',
  keywords: ['TileChallenge parents guide', 'family-friendly puzzle game', 'browser game safety', 'kids puzzle site information']
};

export default function ParentsPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="gradient-text">Parents and Family Guide</h1>
          <p>Practical information for households that want to understand what TileChallenge is and how the site is presented.</p>
        </div>
      </div>

      <div className="page-content">
        <h2>A simple, family-friendly puzzle format</h2>
        <p>
          TileChallenge is a casual tile-matching puzzle game with no chat system, no public profiles, and no account requirement. The core experience is a
          solo browser puzzle built around observation, matching, and planning.
        </p>

        <h2>What parents may want to know first</h2>
        <ul>
          <li><strong>No sign-up required:</strong> Visitors can play without creating an account.</li>
          <li><strong>No social interaction layer:</strong> The site does not center on chat, messaging, or user-generated posting.</li>
          <li><strong>Short-session design:</strong> The game is easy to start and easy to leave, which makes it more manageable for quick breaks.</li>
          <li><strong>Policy pages are available:</strong> Privacy, cookie, accessibility, and contact information are published on the site.</li>
        </ul>

        <AdSlot type="in-content" />

        <h2>About learning and puzzle value</h2>
        <p>
          We do not position TileChallenge as a replacement for schoolwork or professional educational tools. What we can say is that puzzle games often ask
          players to focus, compare patterns, and think a few moves ahead. For many families, that makes them a more active kind of screen time than passive browsing.
        </p>

        <h2>Advertising on the site</h2>
        <p>
          TileChallenge uses ads to help support free access. We understand that families want context around that. Our goal is to keep the surrounding pages
          informative and avoid turning the site into a thin ad wrapper. If you want more detail about data use or cookies, see the{' '}
          <Link href="/privacy-policy">Privacy Policy</Link> and <Link href="/cookie-policy">Cookie Policy</Link>.
        </p>

        <h2>Healthy play tips for households</h2>
        <ol>
          <li><strong>Try a short session first:</strong> A few rounds are usually enough to understand whether the format suits your household.</li>
          <li><strong>Talk through the strategy:</strong> Asking why a move is good can make puzzle play more engaging and thoughtful.</li>
          <li><strong>Keep balance in mind:</strong> Puzzle games work best as one part of a wider routine that includes offline activities too.</li>
          <li><strong>Use the help pages:</strong> The guide, FAQ, and contact page are there to answer common questions clearly.</li>
        </ol>

        <h2>Questions or concerns</h2>
        <p>
          If you have a question about site content, accessibility, privacy, or how the game works, please use the <Link href="/contact">Contact page</Link>.
          We want parents and guardians to be able to review the site with confidence.
        </p>

        <AdSlot type="banner" />
      </div>
    </>
  );
}
