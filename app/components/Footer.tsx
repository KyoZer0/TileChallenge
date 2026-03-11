import Link from 'next/link';

const links = [
    { href: '/how-to-play', label: 'Guide' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQ' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/parents', label: 'Parents' },
    { href: '/privacy-policy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
    { href: '/sitemap-page', label: 'Sitemap' },
];

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container footer-inner">
                <Link href="/" className="footer-brand">
                    TileChallenge
                </Link>

                <div className="footer-links">
                    {links.map((link) => (
                        <Link key={link.href} href={link.href} className="footer-link">
                            {link.label}
                        </Link>
                    ))}
                </div>

                <span className="footer-copy">
                    © {new Date().getFullYear()} TileChallenge
                </span>
            </div>
        </footer>
    );
}
