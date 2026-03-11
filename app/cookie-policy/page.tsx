import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Learn what kinds of cookies may be used on TileChallenge and how visitors can manage browser-level cookie preferences.',
  keywords: ['TileChallenge cookie policy', 'browser game cookies', 'ad cookies information']
};

export default function CookiePolicyPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="gradient-text">Cookie Policy</h1>
          <p>Last updated: March 11, 2026</p>
        </div>
      </div>

      <div className="page-content">
        <p>
          This page explains the kinds of cookies and similar technologies that may be used in connection with TileChallenge. Cookies are small text files or
          browser storage items that help websites remember settings, measure usage, or support services such as advertising.
        </p>

        <h2>Essential site functionality</h2>
        <p>
          Some storage or technical identifiers may be used so the site can load correctly, keep pages working across navigation, and maintain reliable access
          to core features.
        </p>

        <h2>Analytics-related cookies</h2>
        <p>
          Analytics services may use cookies or similar tools to help us understand how visitors use the site, which pages perform well, and where improvements
          are needed.
        </p>

        <h2>Advertising-related cookies</h2>
        <p>
          Advertising partners such as Google AdSense may use cookies or related technologies to serve and measure ads according to their own product policies.
          Those tools are managed by the advertising provider, not by a custom in-site cookie dashboard on TileChallenge.
        </p>

        <h2>How to manage cookies</h2>
        <p>
          Most browsers allow you to block, clear, or limit cookies through settings. If you disable some cookies, parts of the site or ad experience may work
          differently. Browser support pages from Chrome, Firefox, Safari, and Edge explain those controls in detail.
        </p>

        <h2>Third-party policies</h2>
        <p>
          Because some cookies come from third-party analytics or advertising services, their handling is also subject to those third parties&apos; policies. For
          advertising controls, visitors can review Google&apos;s ad settings and related privacy documentation.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this Cookie Policy, please use the Contact page or email <strong>privacy@tilechallenge.com</strong>.
        </p>
      </div>
    </>
  );
}
