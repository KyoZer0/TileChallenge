import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'Learn how TileChallenge approaches accessibility across its website and browser puzzle game, including current practices and known limitations.',
  keywords: ['TileChallenge accessibility', 'accessible browser game', 'website accessibility statement']
};

export default function AccessibilityPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="gradient-text">Accessibility Statement</h1>
          <p>Our current accessibility approach for the website, along with the areas we continue to improve.</p>
        </div>
      </div>

      <div className="page-content">
        <p>
          TileChallenge aims to provide a website that is understandable, readable, and usable across modern devices. We treat accessibility as ongoing work,
          not a one-time claim, and we review both the content pages and the game experience as the site evolves.
        </p>

        <h2>Website accessibility practices</h2>
        <ul>
          <li><strong>Clear page structure:</strong> Content pages use headings, paragraphs, and lists to make information easier to follow.</li>
          <li><strong>Responsive layouts:</strong> Pages are designed to adapt across desktop, tablet, and mobile screens.</li>
          <li><strong>Keyboard-friendly navigation:</strong> Links and standard page controls are intended to remain reachable without a mouse.</li>
          <li><strong>Readable content:</strong> We aim for straightforward language and scannable support pages.</li>
        </ul>

        <h2>Game-specific limitations</h2>
        <p>
          The puzzle itself is a highly visual experience and may present barriers for some users. Tile recognition, layered boards, and direct selection are a
          central part of the gameplay loop, which means the game is not equally accessible to every player in its current form.
        </p>

        <h2>Areas we continue to review</h2>
        <ul>
          <li>Visual clarity and contrast across interactive elements</li>
          <li>Touch and click comfort on smaller screens</li>
          <li>Page readability around ads and embedded content</li>
          <li>Better guidance for players who need more context before starting</li>
        </ul>

        <h2>Third-party content</h2>
        <p>
          Some parts of the experience, such as advertising content provided by third parties, may not fully match the standards we try to apply to our own
          pages. We do not control every aspect of those third-party interfaces.
        </p>

        <h2>Feedback</h2>
        <p>
          If you encounter an accessibility issue on TileChallenge or have a suggestion that would make the site easier to use, please contact us through the{' '}
          <Link href="/contact">Contact page</Link>. Accessibility feedback helps us prioritize the improvements that matter most.
        </p>
      </div>
    </>
  );
}
