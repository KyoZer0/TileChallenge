'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

export default function HeroSection() {
    const heroRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const gameRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo(
                gameRef.current,
                { opacity: 0, y: 20, scale: 0.98 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.1)' }
            );

            tl.fromTo(
                headlineRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.8 },
                '-=0.4'
            );

            tl.fromTo(
                subtitleRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.8 },
                '-=0.6'
            );

            tl.fromTo(
                ctaRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.8 },
                '-=0.6'
            );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero hero-full hero-with-game" ref={heroRef} id="game">
            {/* ── Grid pattern overlay ── */}
            <div className="hero-grid-overlay" />

            {/* ── Content ── */}
            <div className="container hero-content" style={{ maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', paddingTop: '2rem' }}>

                {/* ── Embedded Game ── */}
                <div
                    className="hero-game-wrapper"
                    ref={gameRef}
                    style={{
                        width: '100%',
                        maxWidth: '960px',
                        margin: '0 auto',
                        padding: '10px'
                    }}
                >
                    <iframe
                        src="/game/index.html"
                        title="TileChallenge Game"
                        className="hero-game-iframe"
                        allow="autoplay"
                        loading="eager"
                        scrolling="no"
                        style={{ borderRadius: '14px', border: '12px solid #4A2E1B', display: 'block', overflow: 'hidden', boxShadow: '8px 8px 0 rgba(74, 46, 27, 0.4)', width: '100%', aspectRatio: '16/10' }}
                    />
                </div>

                {/* ── Action buttons ── */}
                <div className="hero-cta" ref={ctaRef} style={{
                    display: 'flex',
                    gap: '0.75rem',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Link href="/play/game" className="btn btn-primary" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        textDecoration: 'none'
                    }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></svg>
                        Fullscreen
                    </Link>
                    <button onClick={() => {
                        const url = 'https://tilechallenge.com';
                        if (navigator.share) {
                            navigator.share({ title: 'Tile Challenge', text: 'Play Tile Challenge – the ultimate tile puzzle!', url });
                        } else {
                            navigator.clipboard.writeText(url);
                            const btn = document.querySelector('.share-btn-hero') as HTMLButtonElement;
                            if (btn) { btn.textContent = '✓ Copied!'; setTimeout(() => btn.textContent = 'Share', 2000); }
                        }
                    }} className="btn btn-secondary share-btn-hero" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
                        Share
                    </button>
                </div>

                <h1 ref={headlineRef} style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginTop: '1rem', textShadow: '2px 2px 0px #D3AD81' }}>
                    Tile Challenge: Match, Clear, Conquer
                </h1>

                <p className="hero-subtitle" ref={subtitleRef} style={{ margin: '0' }}>
                    Match identical tiles to clear the board and challenge your strategic thinking. Free to play puzzle fun.
                </p>
            </div>
        </section>
    );
}
