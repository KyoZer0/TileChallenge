import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Play TileChallenge Online',
  description: 'Play TileChallenge online in your browser. Match tiles, build triples, and clear the board with smart tray management.',
  keywords: ['play TileChallenge', 'online tile matching game', 'browser puzzle game']
};

export default function PlayGamePage() {
  return (
    <div style={{ paddingBottom: '3rem' }}>
      <div className="page-header">
        <div className="container" style={{ maxWidth: '1000px' }}>
          <h1 className="gradient-text">Play TileChallenge</h1>
          <p>Match identical tiles, build sets of three, and clear the board before your tray fills up.</p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1100px', padding: '0 1.5rem' }}>
        <div className="card" style={{ marginTop: '2rem', padding: '1rem' }}>
          <iframe
            src="/game/index.html"
            style={{
              width: '100%',
              minHeight: '70vh',
              border: 'none',
              display: 'block',
              borderRadius: '16px'
            }}
            title="TileChallenge Game"
            allow="autoplay"
            scrolling="no"
          />
        </div>

        <div className="page-content" style={{ maxWidth: '100%', paddingLeft: 0, paddingRight: 0 }}>
          <h2>What to expect</h2>
          <p>
            TileChallenge is built for quick browser play. You do not need an account to start. The puzzle loop is straightforward: select open tiles, create
            matching triples in the tray, and clear every tile from the board.
          </p>

          <h2>Quick rules</h2>
          <ul>
            <li><strong>Select open tiles:</strong> Available tiles move into the tray.</li>
            <li><strong>Match three identical tiles:</strong> Completed triples clear automatically.</li>
            <li><strong>Manage your tray carefully:</strong> Too many unmatched tiles can end the round.</li>
            <li><strong>Clear the full board:</strong> Removing all tiles completes the puzzle.</li>
          </ul>

          <h2>Helpful strategy reminders</h2>
          <ul>
            <li>Finish existing pairs before starting new tile types whenever possible.</li>
            <li>Open crowded stacks early so the late game is easier to control.</li>
            <li>Pause after each clear to see what the board reveals next.</li>
          </ul>

          <h2>Need help first?</h2>
          <p>
            If you want a fuller walkthrough before playing, visit the <Link href="/how-to-play">How to Play guide</Link>. You can also browse the{' '}
            <Link href="/blog">blog</Link> for strategy tips and broader puzzle articles.
          </p>
        </div>
      </div>
    </div>
  );
}
