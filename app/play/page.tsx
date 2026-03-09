'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const VARIANTS = [
    {
        id: 'Starter',
        name: 'FillWords',
        tagline: 'The simple and fun version',
        description: 'Swipe through a letter grid to find all hidden words. 3 categories, 15 levels, unlimited fun.',
        locked: false,
        href: '/play/game',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <path d="M6.5 6.5h0M17.5 6.5h0M6.5 17.5h0M17.5 17.5h0" strokeWidth="2.5" />
            </svg>
        ),
    },
    {
        id: 'extra',
        name: 'FillWords Extra',
        tagline: 'Want more challenge, more fun? Try FillWords Extra!',
        description: 'Harder puzzles with bonus word chains, time challenges, arcade vibes, and more.',
        locked: false,
        href: '/play/arcade',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
        ),
    },
    {
        id: 'Classic',
        name: 'FillWords Classic',
        tagline: 'The original word puzzle',
        description: 'Experience the original FillWords puzzle, the one that started it all.',
        locked: true,
        href: null,
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 7 7 7 7" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 17 7 17 7" />
                <path d="M4 22h16" />
                <path d="M10 22V8a6 6 0 0 0-6-1v6c0 5.523 2.477 9 8 9Z" />
                <path d="M14 22V8a6 6 0 0 1 6-1v6c0 5.523-2.477 9-8 9Z" />
            </svg>
        ),
    },
];

export default function PlayPage() {
    const router = useRouter();

    return (
        <>
            <style>{`
        .island-nav, .island-mobile, footer, .site-footer { display: none !important; }
        main { padding: 0 !important; }
      `}</style>
            <div style={{
                minHeight: '100vh',
                background: '#f0f7fa',
                position: 'relative',
            }}>
                {/* Back button */}
                <div style={{ padding: '1.25rem 1.5rem' }}>
                    <Link href="/" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: '#4a7a8a',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                    }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
                        </svg>
                        Back to Home
                    </Link>
                </div>

                {/* Header */}
                <div style={{
                    textAlign: 'center',
                    padding: '2rem 1.5rem 2.5rem',
                }}>
                    <h1 style={{
                        fontFamily: "'Outfit', system-ui, sans-serif",
                        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                        fontWeight: 800,
                        color: '#0c3547',
                        letterSpacing: '-0.04em',
                        margin: '0 0 0.5rem',
                        lineHeight: 1.1,
                    }}>
                        Choose a Game Mode
                    </h1>
                    <p style={{
                        fontSize: '0.95rem',
                        color: '#4a7a8a',
                        maxWidth: '400px',
                        margin: '0 auto',
                        lineHeight: 1.5,
                    }}>
                        Start with the classic, or unlock new challenges as they arrive.
                    </p>
                </div>

                {/* Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1rem',
                    maxWidth: '920px',
                    margin: '0 auto',
                    padding: '0 1.5rem 3rem',
                }}>
                    {VARIANTS.map((v) => (
                        <div
                            key={v.id}
                            onClick={() => { if (!v.locked && v.href) router.push(v.href); }}
                            style={{
                                background: 'white',
                                border: '1.5px solid rgba(14,116,144,0.12)',
                                borderRadius: '20px',
                                padding: '1.75rem',
                                cursor: v.locked ? 'default' : 'pointer',
                                opacity: v.locked ? 0.55 : 1,
                                transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                                display: 'flex',
                                flexDirection: 'column' as const,
                                gap: '1rem',
                                position: 'relative' as const,
                                boxShadow: v.locked
                                    ? '0 2px 8px rgba(14,116,144,0.05)'
                                    : '0 4px 20px rgba(14,116,144,0.08)',
                            }}
                            onMouseEnter={(e) => {
                                if (!v.locked) {
                                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(14,116,144,0.12)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!v.locked) {
                                    (e.currentTarget as HTMLDivElement).style.transform = '';
                                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(14,116,144,0.08)';
                                }
                            }}
                        >
                            {/* Lock badge */}
                            {v.locked && (
                                <div style={{
                                    position: 'absolute',
                                    top: '1.25rem',
                                    right: '1.25rem',
                                    fontSize: '0.68rem',
                                    fontWeight: 700,
                                    color: '#8ab0bc',
                                    textTransform: 'uppercase' as const,
                                    letterSpacing: '0.06em',
                                }}>
                                    Coming Soon
                                </div>
                            )}

                            {/* Icon */}
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: v.locked ? '#f0f4f8' : '#f0f7fa',
                                border: `1.5px solid ${v.locked ? 'rgba(14,116,144,0.08)' : 'rgba(14,116,144,0.15)'}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: v.locked ? '#8ab0bc' : '#0e7490',
                            }}>
                                {v.icon}
                            </div>

                            {/* Text */}
                            <div>
                                <div style={{
                                    fontFamily: "'Outfit', system-ui, sans-serif",
                                    fontSize: '1.2rem',
                                    fontWeight: 800,
                                    color: '#0c3547',
                                    letterSpacing: '-0.02em',
                                    marginBottom: '0.3rem',
                                }}>
                                    {v.name}
                                </div>
                                <div style={{
                                    fontSize: '0.82rem',
                                    fontWeight: 600,
                                    color: v.locked ? '#8ab0bc' : '#0e7490',
                                    marginBottom: '0.5rem',
                                }}>
                                    {v.tagline}
                                </div>
                                <p style={{
                                    fontSize: '0.85rem',
                                    color: '#4a7a8a',
                                    lineHeight: 1.55,
                                    margin: 0,
                                }}>
                                    {v.description}
                                </p>
                            </div>

                            {/* CTA */}
                            <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                                {v.locked ? (
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.35rem',
                                        fontSize: '0.82rem',
                                        fontWeight: 600,
                                        color: '#a3c4cf',
                                    }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                        </svg>
                                        Not yet available
                                    </div>
                                ) : (
                                    <div style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        background: '#FFD700',
                                        color: '#0e7490',
                                        padding: '0.6rem 1.3rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.88rem',
                                        fontWeight: 700,
                                        fontFamily: "'Outfit', system-ui, sans-serif",
                                        boxShadow: '0 3px 0 #c9a300',
                                    }}>
                                        Play Now
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14" /><polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
