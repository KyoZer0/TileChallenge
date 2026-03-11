import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Read the TileChallenge disclaimer regarding game availability, informational content, third-party links, and advertising.',
  keywords: ['TileChallenge disclaimer', 'browser game disclaimer', 'site information notice']
};

export default function DisclaimerPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="gradient-text">Disclaimer</h1>
          <p>Last updated: March 11, 2026</p>
        </div>
      </div>

      <div className="page-content">
        <p>
          TileChallenge provides a browser-based puzzle game and related informational pages for general entertainment and website support purposes. While we
          aim to keep the site accurate and useful, we cannot guarantee uninterrupted availability or the completeness of every third-party service connected to it.
        </p>

        <h2>Game availability</h2>
        <p>
          The game is offered as a browser experience and may behave differently across devices, browsers, connections, or future updates. We try to keep it
          playable and stable, but we cannot promise uninterrupted access at all times.
        </p>

        <h2>Informational content</h2>
        <p>
          Blog posts, guides, and support pages are written for general informational purposes. They are not medical, educational, legal, or psychological advice.
          Visitors should use professional judgment and seek qualified advice when needed.
        </p>

        <h2>External links and third-party services</h2>
        <p>
          Some pages may link to third-party websites or rely on third-party services such as advertising or analytics providers. We do not control those third-party
          sites and are not responsible for their content, policies, or availability.
        </p>

        <h2>Advertising notice</h2>
        <p>
          TileChallenge displays advertisements to support the free site. Ads are supplied by third parties, and their appearance does not mean that TileChallenge
          personally endorses every advertised product or service.
        </p>

        <h2>Contact</h2>
        <p>
          If you have a question about this disclaimer, please use the Contact page.
        </p>
      </div>
    </>
  );
}
