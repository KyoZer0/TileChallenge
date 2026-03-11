import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the TileChallenge Terms of Service for rules related to the browser game, site content, advertising, and acceptable use.',
  keywords: ['TileChallenge terms of service', 'terms and conditions', 'browser game usage agreement']
};

export default function TermsPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="gradient-text">Terms of Service</h1>
          <p>Last updated: March 11, 2026</p>
        </div>
      </div>

      <div className="page-content">
        <p>
          Welcome to TileChallenge. By accessing or using the website, game, and related content, you agree to these Terms of Service. If you do not agree,
          please do not use the site.
        </p>

        <h2>1. What the service includes</h2>
        <p>
          TileChallenge provides a free browser-based tile-matching puzzle game, support pages, original blog articles, and related informational content.
        </p>

        <h2>2. Acceptable use</h2>
        <p>You agree not to misuse the site or interfere with its operation. This includes not attempting to:</p>
        <ul>
          <li>Access systems or data without authorization</li>
          <li>Disrupt the website or game through malicious tools or abusive traffic</li>
          <li>Copy or redistribute protected site content beyond ordinary personal use</li>
          <li>Reverse-engineer or exploit the game in ways that harm the service</li>
        </ul>

        <h2>3. Accounts and age context</h2>
        <p>
          TileChallenge does not require account creation to play. The site is presented as family-friendly, and younger users should use the web under normal
          parental or guardian guidance.
        </p>

        <h2>4. Intellectual property</h2>
        <p>
          The site design, game presentation, text, branding, audio, and related materials are owned by TileChallenge or used with permission. You may access
          the site for personal, non-commercial use, but you may not republish or commercially exploit protected content without permission.
        </p>

        <h2>5. Feedback submissions</h2>
        <p>
          If you send feedback, suggestions, or bug reports, you allow us to review and use that feedback to improve the site and game without creating an
          obligation to compensate you.
        </p>

        <h2>6. Advertising and third-party services</h2>
        <p>
          TileChallenge displays advertising and may rely on third-party services for analytics, hosting, and related site functions. We are not responsible
          for every representation made in third-party ads or on third-party sites.
        </p>

        <h2>7. Availability and disclaimers</h2>
        <p>
          The site is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. We try to keep the game and pages working properly, but we do not guarantee uninterrupted
          availability, complete compatibility, or the absence of errors at all times.
        </p>

        <h2>8. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, TileChallenge and its operators are not liable for indirect or consequential damages arising from use of the site.
          Because the service is free, any direct liability is limited to the amount paid for access, which is zero.
        </p>

        <h2>9. Changes to these terms</h2>
        <p>
          We may revise these terms from time to time. Continued use of the site after updates means you accept the revised version.
        </p>

        <h2>10. Contact</h2>
        <p>
          For questions about these terms, please use the Contact page or email <strong>legal@tilechallenge.com</strong>.
        </p>
      </div>
    </>
  );
}
