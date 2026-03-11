import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '../components/AdSlot';

export const metadata: Metadata = {
  title: 'How to Play TileChallenge - Complete Matching Guide',
  description:
    'Learn how to play TileChallenge step by step. Understand the tray, matching rules, and the best ways to clear the board without filling your stack.',
  keywords: ['how to play TileChallenge', 'tile matching guide', 'match 3 tile puzzle rules', 'TileChallenge tips']
};

export default function HowToPlayPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="gradient-text">How to Play</h1>
          <p>Everything you need to know to start clearing boards, protecting tray space, and making better moves.</p>
        </div>
      </div>

      <div className="page-content">
        <h2>The goal of TileChallenge</h2>
        <p>
          TileChallenge is a tile-matching puzzle game. You tap open tiles to move them into the tray at the bottom of the board. When three identical
          tiles collect in the tray, they clear automatically. You win by removing every tile from the board before the tray fills up.
        </p>

        <h2>How a turn works</h2>
        <ol>
          <li><strong>Scan the board:</strong> Look for matching designs that are already available to tap.</li>
          <li><strong>Select a tile:</strong> The tile moves into your tray and becomes part of your current plan.</li>
          <li><strong>Complete a set of three:</strong> Matching triples disappear from the tray, giving you more room.</li>
          <li><strong>Reveal new options:</strong> Clearing tiles opens space and exposes tiles that were blocked underneath.</li>
          <li><strong>Finish the board:</strong> Keep repeating the cycle until every tile has been cleared.</li>
        </ol>

        <AdSlot type="in-content" />

        <h2>Why the tray matters</h2>
        <p>
          The tray is where most wins and losses are decided. A tray full of unrelated tiles gives you very little room to recover. A tray built around
          pairs and near-complete triples gives you flexibility and momentum.
        </p>
        <ul>
          <li><strong>Safe move:</strong> Adds to a pair or finishes a triple.</li>
          <li><strong>Useful move:</strong> Reveals several new tiles or opens a crowded section.</li>
          <li><strong>Risky move:</strong> Starts a brand-new tile type with no visible follow-up.</li>
        </ul>

        <h2>Beginner strategy that works</h2>
        <p>
          Start by clearing the easiest visible pairs and triples. Try not to tap too many different designs in a row. If you already have two of the same
          tile in the tray, prioritizing the third one is often the strongest move available.
        </p>
        <ul>
          <li><strong>Finish what you start:</strong> Existing pairs are usually more valuable than brand-new singles.</li>
          <li><strong>Open dense areas early:</strong> Stacked or crowded sections are easier to manage before the tray gets busy.</li>
          <li><strong>Pause after clears:</strong> New information appears every time tiles disappear.</li>
          <li><strong>Avoid panic tapping:</strong> Fast random moves usually create tray clutter.</li>
        </ul>

        <h2>Common mistakes to avoid</h2>
        <p>
          The most common mistake is filling the tray with six or seven different tile designs. Another is focusing only on the top layer and ignoring what
          your move will reveal underneath. TileChallenge rewards deliberate play more than quick reactions.
        </p>

        <h2>When a level feels difficult</h2>
        <p>
          If a board starts to feel messy, slow down and reset your attention. Look for the tile type you are closest to clearing. Then check whether a
          crowded corner or stack can be opened with one or two clean moves. Often the best recovery starts with a small, tidy triple rather than a big gamble.
        </p>

        <h2>Ready to play?</h2>
        <p>
          Use the guide above as your starting routine: scan first, build around pairs, and protect tray space. With a little patience, the board becomes
          much easier to read.
        </p>
        <p style={{ marginTop: '1.5rem' }}>
          <Link href="/play/game" className="btn btn-primary">
            Play TileChallenge
          </Link>
        </p>

        <AdSlot type="banner" />
      </div>
    </>
  );
}
