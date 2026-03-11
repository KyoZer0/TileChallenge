import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the TileChallenge privacy policy to learn what information may be collected, how site services work, and how to contact us with privacy questions.',
  keywords: ['TileChallenge privacy policy', 'browser game privacy', 'ads and cookies policy']
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="gradient-text">Privacy Policy</h1>
          <p>Last updated: March 11, 2026</p>
        </div>
      </div>

      <div className="page-content">
        <p>
          This Privacy Policy explains how TileChallenge handles information connected with the website, the browser game, and support communications. We aim
          to keep this explanation readable and practical.
        </p>

        <h2>1. Information you choose to send</h2>
        <p>
          If you contact us, you may provide information such as your name, email address, subject line, and message contents. We use that information only
          to review and respond to your inquiry.
        </p>

        <h2>2. Technical and usage information</h2>
        <p>
          Like most websites, TileChallenge and its service providers may process basic technical information needed to run the site, understand usage, and
          support advertising or performance measurement. This can include browser type, device type, pages viewed, approximate region, and referral source.
        </p>

        <h2>3. Cookies and similar technologies</h2>
        <p>
          The site may use cookies or similar technologies for essential site functions, analytics, and advertising-related purposes. For a fuller explanation,
          please review the Cookie Policy.
        </p>

        <h2>4. Advertising</h2>
        <p>
          TileChallenge uses advertising services, including Google AdSense, to support free access to the site. Those services may use cookies or related
          technologies according to their own policies and settings. Visitors can review Google advertising controls through Google&apos;s ad settings tools.
        </p>

        <h2>5. Analytics and site improvement</h2>
        <p>
          We may use analytics tools to understand which pages are useful, where visitors encounter issues, and how the site performs across devices. This
          helps us improve gameplay pages, support content, and overall usability.
        </p>

        <h2>6. Children&apos;s privacy</h2>
        <p>
          TileChallenge is presented as a family-friendly puzzle site, but it is not built around accounts, profiles, or direct social interaction. We do not
          intend to collect personal information from children through account registration because no such registration system exists on the site.
        </p>

        <h2>7. Data sharing</h2>
        <p>
          We do not sell personal contact messages as a product. Information may be processed by third-party services that support hosting, analytics,
          advertising, security, or communication workflows, and it may be disclosed when required by law.
        </p>

        <h2>8. Your choices</h2>
        <p>
          You can manage cookies through your browser settings. You can also choose not to contact us through the site if you do not want to send personal
          contact information such as an email address.
        </p>

        <h2>9. Policy updates</h2>
        <p>
          We may update this policy from time to time to reflect operational, legal, or site changes. The date at the top of the page shows the latest revision.
        </p>

        <h2>10. Contact</h2>
        <p>
          For privacy-related questions, please use the Contact page or email <strong>privacy@tilechallenge.com</strong>.
        </p>
      </div>
    </>
  );
}
