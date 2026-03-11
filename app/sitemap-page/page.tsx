import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '../lib/blogPosts';

export const metadata: Metadata = {
  title: 'Sitemap - All Pages',
  description: 'Browse the main pages, support pages, and published blog articles available on TileChallenge.',
  keywords: ['TileChallenge sitemap', 'all pages', 'site navigation']
};

const sections = [
  {
    title: 'Main Pages',
    links: [
      { href: '/', label: 'Home' },
      { href: '/play/game', label: 'Play TileChallenge' },
      { href: '/how-to-play', label: 'How to Play' },
      { href: '/blog', label: 'Blog' },
      { href: '/faq', label: 'FAQ' }
    ]
  },
  {
    title: 'Company and Support',
    links: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/parents', label: 'Parents and Family Guide' },
      { href: '/accessibility', label: 'Accessibility Statement' }
    ]
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
      { href: '/cookie-policy', label: 'Cookie Policy' },
      { href: '/disclaimer', label: 'Disclaimer' }
    ]
  },
  {
    title: 'Blog Articles',
    links: blogPosts.map((post) => ({ href: `/blog/${post.slug}`, label: post.title }))
  }
];

export default function SitemapPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="gradient-text">Sitemap</h1>
          <p>Browse the main sections of TileChallenge and every published blog article.</p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1000px', padding: '0 1.5rem 4rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}
        >
          {sections.map((section) => (
            <div key={section.title} className="card">
              <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--primary-light)' }}>{section.title}</h2>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {section.links.map((link) => (
                  <li key={link.href} style={{ marginBottom: '0.75rem' }}>
                    <Link href={link.href} style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
