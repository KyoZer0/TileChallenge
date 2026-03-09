'use client';
import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/how-to-play', label: 'Guide' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="island-nav">
        <Link href="/" className="island-brand">
          TileChallenge
        </Link>

        <div className="island-links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="island-link"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link href="/play" className="island-cta">
          Play Now
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="island-menu-btn"
          aria-label="Toggle menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </nav>

      {isOpen && (
        <div className="island-mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/play" onClick={() => setIsOpen(false)}>
            Play Now
          </Link>
        </div>
      )}
    </>
  );
}
