'use client';

/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/purity, react/no-unescaped-entities, @typescript-eslint/no-unused-vars */

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AdSlot from './AdSlot';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const FloatingTiles = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            const tiles = gsap.utils.toArray('.bg-tile');
            tiles.forEach((tile: any, i) => {
                gsap.to(tile, {
                    y: 'random(-50, 50)',
                    x: 'random(-30, 30)',
                    rotation: 'random(-15, 15)',
                    ease: 'sine.inOut',
                    duration: 'random(4, 8)',
                    repeat: -1,
                    yoyo: true,
                    delay: i * 0.2
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const letters = ['🧩', '💎', '🟢', '🔺', '🟨', '🟦', '🟪', '✨', '⭐', '🔥', '🎲', '🪙'];
    return (
        <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
            {letters.map((letter, i) => (
                <div key={i} className="bg-tile" style={{
                    position: 'absolute',
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    fontSize: '2rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    opacity: 0.05,
                    color: 'var(--text-primary)',
                    background: 'var(--bg-card)',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                    border: '1px solid var(--border-light)'
                }}>
                    {letter}
                </div>
            ))}
        </div>
    );
};

const VariantCard = ({ title, tagline, desc, icon, color, href, locked = false }: { title: string, tagline: string, desc: string, icon: React.ReactNode, color: string, href?: string | null, locked?: boolean }) => {
    const router = useRouter();
    return (
        <div className="stat-swipe-container variant-card" style={{
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.25rem',
            background: locked ? 'var(--bg)' : 'var(--white)',
            border: `1px solid ${locked ? 'rgba(14,116,144,0.08)' : 'var(--border)'}`,
            borderRadius: '24px',
            padding: '2.5rem 2rem', width: '100%',
            position: 'relative', overflow: 'hidden', height: '100%',
            transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
            boxShadow: locked ? '0 2px 8px rgba(0,0,0,0.02)' : '0 4px 12px rgba(0, 0, 0, 0.02), inset 0 2px 10px rgba(255, 255, 255, 0.05)',
            isolation: 'isolate',
            cursor: locked ? 'default' : 'pointer',
            opacity: locked ? 0.6 : 1
        }}
            onClick={() => {
                if (!locked && href) {
                    router.push(href);
                }
            }}
            onMouseEnter={(e) => {
                if (locked) return;
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = color;
                e.currentTarget.style.boxShadow = `0 24px 48px ${color}20, inset 0 2px 10px rgba(255,255,255,0.1)`;
                const glow = e.currentTarget.querySelector('.card-glow') as HTMLElement;
                if (glow) glow.style.opacity = '1';
                const iconEl = e.currentTarget.querySelector('.card-icon') as HTMLElement;
                if (iconEl) iconEl.style.transform = 'scale(1.1) translateY(-4px)';
            }}
            onMouseLeave={(e) => {
                if (locked) return;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.02), inset 0 2px 10px rgba(255, 255, 255, 0.05)';
                const glow = e.currentTarget.querySelector('.card-glow') as HTMLElement;
                if (glow) glow.style.opacity = '0';
                const iconEl = e.currentTarget.querySelector('.card-icon') as HTMLElement;
                if (iconEl) iconEl.style.transform = 'scale(1) translateY(0)';
            }}
        >
            {/* Animated Glow effect */}
            {!locked && (
                <div className="card-glow" style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: `radial-gradient(circle at 100% 0%, ${color}15 0%, transparent 70%)`,
                    opacity: 0,
                    transition: 'opacity 0.6s ease',
                    zIndex: -1,
                    pointerEvents: 'none'
                }} />
            )}

            {locked && (
                <div style={{
                    position: 'absolute', top: '1.5rem', right: '1.5rem',
                    fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                    background: 'var(--bg)', padding: '0.3rem 0.8rem', borderRadius: '99px',
                    border: '1px solid var(--border-light)'
                }}>
                    Coming Soon
                </div>
            )}

            <div className="card-icon" style={{
                width: '56px', height: '56px', borderRadius: '16px',
                background: locked ? 'var(--bg)' : `${color}15`,
                color: locked ? 'var(--text-muted)' : color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                filter: locked ? 'none' : `drop-shadow(0 8px 16px ${color}30)`,
                transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}>
                {icon}
            </div>

            <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>
                    {title}
                </h3>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: locked ? 'var(--text-muted)' : color, marginBottom: '1rem' }}>
                    {tagline}
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, flexGrow: 1 }}>
                    {desc}
                </p>

                <div style={{ marginTop: '2rem', display: 'flex' }}>
                    {locked ? (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            Locked
                        </div>
                    ) : (
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                            background: color, color: '#fff', padding: '0.6rem 1.4rem', borderRadius: '99px',
                            fontSize: '0.9rem', fontWeight: 700, fontFamily: 'var(--font-sans)',
                            boxShadow: `0 4px 12px ${color}40`,
                            transition: 'all 0.2s'
                        }}>
                            Play Now
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const ArcadeVariantCard = ({ title, tagline, desc, icon, color, href }: { title: string, tagline: string, desc: string, icon: React.ReactNode, color: string, href?: string | null }) => {
    const router = useRouter();
    return (
        <div className="stat-swipe-container variant-card arcade-card" style={{
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.25rem',
            background: 'var(--white)',
            border: `1px solid rgba(173, 40, 211, 0.15)`,
            borderRadius: '24px',
            padding: '2.5rem 2rem', width: '100%',
            position: 'relative', overflow: 'hidden', height: '100%',
            transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
            boxShadow: `0 8px 32px rgba(173, 40, 211, 0.08), inset 0 2px 10px rgba(255, 255, 255, 0.5)`,
            isolation: 'isolate',
            cursor: 'pointer',
            perspective: '1000px'
        }}
            onClick={() => {
                if (href) router.push(href);
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) rotateX(4deg)';
                e.currentTarget.style.borderColor = 'rgba(173, 40, 211, 0.4)';
                e.currentTarget.style.boxShadow = `0 32px 64px rgba(173, 40, 211, 0.15), inset 0 2px 20px rgba(255,255,255,0.8), 0 0 20px rgba(255, 215, 0, 0.15)`;

                const elements = e.currentTarget.querySelectorAll('.arcade-float');
                elements.forEach((el, index) => {
                    const htmlEl = el as HTMLElement;
                    htmlEl.style.transform = `translateZ(${30 + index * 20}px) translateY(-15px) rotate(${index % 2 === 0 ? '15deg' : '-15deg'}) scale(1.2)`;
                    htmlEl.style.filter = `drop-shadow(0 15px 20px rgba(0,0,0,0.15))`;
                });

                const iconEl = e.currentTarget.querySelector('.card-icon') as HTMLElement;
                if (iconEl) iconEl.style.transform = 'scale(1.1) translateZ(40px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) rotateX(0)';
                e.currentTarget.style.borderColor = `rgba(173, 40, 211, 0.15)`;
                e.currentTarget.style.boxShadow = `0 8px 32px rgba(173, 40, 211, 0.08), inset 0 2px 10px rgba(255, 255, 255, 0.5)`;

                const elements = e.currentTarget.querySelectorAll('.arcade-float');
                elements.forEach((el) => {
                    const htmlEl = el as HTMLElement;
                    htmlEl.style.transform = `translateZ(0) translateY(0) rotate(0) scale(1)`;
                    htmlEl.style.filter = `drop-shadow(0 4px 8px rgba(0,0,0,0.06))`;
                });

                const iconEl = e.currentTarget.querySelector('.card-icon') as HTMLElement;
                if (iconEl) iconEl.style.transform = 'scale(1) translateZ(0)';
            }}
        >
            {/* 3D Floating Elements */}
            <div className="arcade-float" style={{
                position: 'absolute', top: '15%', right: '10%',
                width: '40px', height: '40px', borderRadius: '8px',
                background: 'linear-gradient(135deg, #FFD700, #ffb300)', // Yellow
                transformStyle: 'preserve-3d',
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: 0, opacity: 0.8,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.06))',
                transform: 'rotate(15deg)'
            }}>
                <div style={{ position: 'absolute', inset: 0, border: '2px solid rgba(255,255,255,0.4)', borderRadius: '8px', transform: 'translateZ(10px)' }} />
            </div>

            <div className="arcade-float" style={{
                position: 'absolute', bottom: '25%', right: '-5%',
                width: '60px', height: '60px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #ef4444, #b91c1c)', // Red
                transformStyle: 'preserve-3d',
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
                zIndex: 0, opacity: 0.6,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.06))',
            }}>
                <div style={{ position: 'absolute', top: '15%', left: '15%', width: '30%', height: '30%', background: 'rgba(255,255,255,0.4)', borderRadius: '50%', transform: 'translateZ(15px)' }} />
            </div>

            <div className="arcade-float" style={{
                position: 'absolute', top: '-10%', left: '50%',
                width: '80px', height: '30px', borderRadius: '15px',
                background: 'linear-gradient(135deg, #ad28d3, #7e22ce)', // Purple
                transformStyle: 'preserve-3d',
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.05s',
                zIndex: 0, opacity: 0.4,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.06))',
                transform: 'rotate(-25deg)'
            }} />


            {/* Orbiting Elements Area */}
            <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', marginTop: '1rem', marginBottom: '2.5rem', transformStyle: 'preserve-3d' }}>

                {/* 3D Orbit Ring */}
                <div className="arcade-orbit" style={{
                    position: 'absolute', top: '50%', left: '50%',
                    width: '120px', height: '120px',
                    marginLeft: '-60px', marginTop: '-60px',
                    border: '2px solid rgba(173, 40, 211, 0.4)',
                    borderRadius: '50%',
                    transformStyle: 'preserve-3d',
                    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    opacity: 0.5,
                    pointerEvents: 'none'
                }}>
                    <div style={{
                        position: 'absolute', top: '-6px', left: '50%', marginLeft: '-6px',
                        width: '12px', height: '12px', background: '#FFD700', borderRadius: '50%',
                        boxShadow: '0 0 10px #FFD700, 0 0 20px #FFD700'
                    }} />
                    <div style={{
                        position: 'absolute', bottom: '-4px', right: '20px',
                        width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%',
                        boxShadow: '0 0 8px #ef4444'
                    }} />
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes orbit-spin {
                        from { transform: rotateX(70deg) rotateZ(0deg); }
                        to { transform: rotateX(70deg) rotateZ(360deg); }
                    }
                    .arcade-card:hover .arcade-orbit {
                        animation: orbit-spin 4s linear infinite;
                        opacity: 1;
                        border-color: rgba(173, 40, 211, 0.8);
                        box-shadow: inset 0 0 20px rgba(173, 40, 211, 0.2);
                    }
                    .arcade-card:not(:hover) .arcade-orbit {
                        transform: rotateX(70deg) rotateZ(45deg); /* static angled resting state */
                    }
                `}} />

                <div className="card-icon" style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    background: `linear-gradient(135deg, rgba(173, 40, 211, 0.1), rgba(173, 40, 211, 0.2))`,
                    color: '#ad28d3',
                    border: `1px solid rgba(173, 40, 211, 0.3)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 8px 16px rgba(173, 40, 211, 0.15), inset 0 2px 6px rgba(255,255,255,0.8)`,
                    transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transformStyle: 'preserve-3d',
                    zIndex: 2,
                    position: 'relative'
                }}>
                    {React.cloneElement(icon as React.ReactElement<any>, { width: 22, height: 22 } as any)}
                </div>
            </div>

            <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%', transformStyle: 'preserve-3d' }}>
                <h3 style={{ fontFamily: 'var(--font-arcade), var(--font-display)', fontSize: '1.4rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '0.25rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                    {title}
                </h3>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ad28d3', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {tagline}
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, flexGrow: 1, maxWidth: '90%' }}>
                    {desc}
                </p>

                <div style={{ marginTop: '1.75rem', display: 'flex' }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        background: 'linear-gradient(135deg, #FFD700, #ffb300)', // Yellow button
                        color: '#000', padding: '0.5rem 1.4rem', borderRadius: '99px',
                        border: `none`,
                        fontSize: '0.85rem', fontWeight: 800, fontFamily: 'var(--font-sans)',
                        boxShadow: `0 6px 16px rgba(255, 215, 0, 0.4), inset 0 -3px 0 rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.5)`,
                        transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        transform: 'translateZ(20px)'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateZ(30px) translateY(-2px) scale(1.05)';
                            e.currentTarget.style.boxShadow = `0 10px 24px rgba(255, 215, 0, 0.5), inset 0 -3px 0 rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.6)`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateZ(20px) translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = `0 6px 16px rgba(255, 215, 0, 0.4), inset 0 -3px 0 rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.5)`;
                        }}
                    >
                        Play Now
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Tile = ({ char, yellow = false }: { char: string, yellow?: boolean }) => (
    <div className="stat-tile" style={{
        width: 'clamp(2.2rem, 8vw, 3.5rem)',
        height: 'clamp(2.2rem, 8vw, 3.5rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: yellow ? 'var(--accent)' : 'var(--bg-card)',
        color: yellow ? '#000' : 'var(--text-primary)',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.2rem, 5vw, 2rem)',
        fontWeight: 800,
        borderRadius: '8px',
        boxShadow: yellow ? '0 4px 12px rgba(201, 163, 0, 0.3), 0 4px 0 #c9a300' : '0 4px 12px rgba(14, 116, 144, 0.06), 0 4px 0 rgba(14, 116, 144, 0.1)',
        border: yellow ? '2px solid #e5b900' : '2px solid rgba(14, 116, 144, 0.1)',
        position: 'relative',
        textTransform: 'uppercase'
    }}>
        {char}
        {!yellow && /[A-Z]/.test(char) && (
            <span style={{ position: 'absolute', bottom: '2px', right: '4px', fontSize: 'clamp(0.45rem, 2vw, 0.65rem)', fontWeight: 600, color: 'var(--text-muted)' }}>
                {{ 'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2, 'H': 4, 'I': 1, 'J': 8, 'K': 5, 'L': 1, 'M': 3, 'N': 1, 'O': 1, 'P': 3, 'Q': 10, 'R': 1, 'S': 1, 'T': 1, 'U': 1, 'V': 4, 'W': 4, 'X': 8, 'Y': 4, 'Z': 10 }[char as string] || 1}
            </span>
        )}
    </div>
);

export default function HomeContent() {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Stats Animation Setup (Removed specific SwipeStat animations, ThemeCard handles its own hover)
            gsap.utils.toArray('.stat-swipe-container').forEach((container: any, i) => {
                gsap.fromTo(container,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: i * 0.1,
                        scrollTrigger: {
                            trigger: container,
                            start: 'top 95%',
                        }
                    }
                );
            });

            // Features Animation
            gsap.utils.toArray('.feature-card').forEach((card: any) => {
                gsap.fromTo(card,
                    { y: 50, opacity: 0 },
                    {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 95%',
                        },
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power3.out'
                    }
                );
            });

            // Swipe lines animation in Features
            gsap.utils.toArray('.swipe-line').forEach((line: any) => {
                gsap.fromTo(line,
                    { scaleX: 0, transformOrigin: 'left center' },
                    {
                        scrollTrigger: {
                            trigger: line,
                            start: 'top 95%',
                        },
                        scaleX: 1,
                        duration: 0.6,
                        delay: 0.2, // let element appear first
                        ease: 'power2.out'
                    }
                );
            });

            // Blog Cards Animation
            gsap.utils.toArray('.blog-card').forEach((card: any) => {
                gsap.fromTo(card,
                    { scale: 0.95, opacity: 0, y: 30 },
                    {
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 95%',
                        },
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out'
                    }
                );
            });

            // Force refresh in case layout shifts
            setTimeout(() => ScrollTrigger.refresh(), 500);

        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={wrapperRef} style={{ position: 'relative' }}>
            <FloatingTiles />

            {/* ── Game Variants ── */}
            <section className="section features-section" style={{ position: 'relative', zIndex: 1, padding: '4rem 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                        <div className="feature-card" style={{
                            background: 'var(--bg)',
                            border: '4px solid #4A2E1B',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            position: 'relative',
                            boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
                            marginBottom: '2rem'
                        }}>
                            <div style={{
                                position: 'absolute', top: '-20px', left: '2rem',
                                background: '#8C5A35', color: '#FFF', padding: '0.5rem 1.5rem', borderRadius: '4px',
                                fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, border: '3px solid #4A2E1B',
                                boxShadow: '4px 4px 0 #4A2E1B', textShadow: '1px 1px 0px #4A2E1B', textTransform: 'uppercase'
                            }}>
                                Game Flow
                            </div>
                            <h2 style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
                                fontWeight: 800,
                                marginBottom: '0.5rem',
                                color: 'var(--text-primary)',
                                display: 'inline-block',
                                position: 'relative'
                            }}>
                                The Joy of Tile Matching
                                <div className="swipe-line" style={{
                                    position: 'absolute', bottom: '8px', left: '-5%', width: '110%', height: '12px',
                                }}></div>
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0.5rem 0 0', fontFamily: 'var(--font-sans)', lineHeight: 1.6 }}>
                                Match tiles and plan moves ahead safely. Tile Challenge brings fun and colorful satisfaction directly to your screen.
                            </p>
                        </div>

                        <div className="feature-card" style={{
                            background: 'var(--bg)',
                            border: '4px solid #4A2E1B',
                            borderRadius: '24px',
                            padding: '2rem',
                            position: 'relative',
                            boxShadow: '4px 4px 0 rgba(0,0,0,0.3)'
                        }}>
                            <div style={{
                                position: 'absolute', top: '-20px', left: '2rem',
                                background: '#8C5A35', color: '#FFF', padding: '0.5rem 1.5rem', borderRadius: '4px',
                                fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, border: '3px solid #4A2E1B',
                                boxShadow: '4px 4px 0 #4A2E1B', textShadow: '1px 1px 0px #4A2E1B', textTransform: 'uppercase'
                            }}>
                                Features
                            </div>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                                Dynamic & Colorful
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {[
                                    { icon: '✨', title: 'Strategic Play', desc: 'Click tiles to match and clear them from the board. Look ahead to avoid a dead end.' },
                                    { icon: '💡', title: 'Relaxing Gameplay', desc: 'No need to rush, take your time think hard and enjoy the game.' },
                                    { icon: '🧠', title: 'Mental Clarity', desc: 'Our vibrant interfaces provide endless fun and keep your brain sharp.' }
                                ].map((step, i) => (
                                    <div key={i} className="card" style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', border: '4px solid #4A2E1B', background: '#EBE3D5', borderRadius: '12px', padding: '1.5rem', boxShadow: '4px 4px 0 rgba(0,0,0,0.3)' }}>
                                        <div style={{ fontSize: '2rem', marginTop: '0.1rem', background: '#FFF', padding: '10px', borderRadius: '8px', border: '2px solid #D1C5B4', boxShadow: 'inset 0 0 0 2px #FFFFFF, inset 0 0 0 4px #FF7A59, 0 4px 0 #A8704A' }}>
                                            {step.icon}
                                        </div>
                                        <div>
                                            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '0.5rem', fontWeight: 700 }}>{step.title}</h4>
                                            <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: '1rem', lineHeight: 1.5 }}>
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="feature-card" style={{
                            background: 'var(--bg)',
                            border: '4px solid #4A2E1B',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            position: 'relative',
                            boxShadow: '4px 4px 0 rgba(0,0,0,0.3)'
                        }}>
                            <div style={{
                                position: 'absolute', top: '-20px', left: '2rem',
                                background: '#D3AD81', color: '#FFF', padding: '0.5rem 1.5rem', borderRadius: '4px',
                                fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, border: '4px solid #4A2E1B',
                                boxShadow: '4px 4px 0 #4A2E1B', textShadow: '2px 2px 0px #4A2E1B', textTransform: 'uppercase'
                            }}>
                                Rulebook
                            </div>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                                How to Play Tile Challenge
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
                                {[
                                    { title: 'Find Matches', desc: 'Look for identical tiles that are free to be selected from the board.' },
                                    { title: 'Click to Stack', desc: 'Select tiles to move them into your stack at the bottom of the screen.' },
                                    { title: 'Match Three', desc: 'Get three identical tiles in your stack to clear them and score points.' },
                                    { title: 'Clear the Board', desc: 'Remove all tiles from the board to win! But be careful not to let your stack get full.' }
                                ].map((step, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: '#F5EFEB', padding: '1rem', border: '4px solid #4A2E1B', borderRadius: '8px' }}>
                                        <div style={{
                                            width: '40px', height: '40px',
                                            borderRadius: '8px',
                                            background: '#8C5A35',
                                            color: '#FFF',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 700,
                                            fontFamily: 'var(--font-display)',
                                            fontSize: '1.25rem',
                                            flexShrink: 0,
                                            border: '3px solid #633C1F',
                                            boxShadow: 'inset 0 4px 0 rgba(0,0,0,0.2)'
                                        }}>
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.1rem', fontWeight: 700 }}>{step.title}</h4>
                                            <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: '0.95rem', lineHeight: 1.4, margin: 0 }}>
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '4px dashed #633C1F', textAlign: 'center' }}>
                                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#4A2E1B', margin: 0 }}>
                                    "It's intensely satisfying to clear that final tile."
                                </p>
                            </div>
                        </div>

                        <div className="feature-card blog-card" style={{
                            background: 'var(--bg)',
                            border: '4px solid #4A2E1B',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            position: 'relative',
                            boxShadow: '4px 4px 0 rgba(0,0,0,0.3)'
                        }}>
                            <div style={{
                                position: 'absolute', top: '-20px', left: '2rem',
                                background: '#8C5A35', color: '#FFF', padding: '0.5rem 1.5rem', borderRadius: '4px',
                                fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, border: '3px solid #4A2E1B',
                                boxShadow: '4px 4px 0 #4A2E1B', textShadow: '1px 1px 0px #4A2E1B', textTransform: 'uppercase'
                            }}>
                                From the Blog
                            </div>

                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                                Learn the game faster
                            </h3>

                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                If you want more than a quick rules summary, these articles explain the basics, strategy, and the thinking behind TileChallenge.
                            </p>

                            <div style={{ display: 'grid', gap: '1rem' }}>
                                {[
                                    {
                                        href: '/blog/how-to-play-tilechallenge',
                                        title: 'How to Play TileChallenge',
                                        desc: 'A beginner-friendly walkthrough of the rules, tray management, and smart first moves.'
                                    },
                                    {
                                        href: '/blog/tile-matching-strategy-guide',
                                        title: 'Tile-Matching Strategy Guide',
                                        desc: 'Eight practical ways to make steadier decisions and clear the board more consistently.'
                                    },
                                    {
                                        href: '/blog/benefits-of-puzzle-games-for-focus-and-problem-solving',
                                        title: 'Puzzle Games, Focus, and Problem-Solving',
                                        desc: 'A balanced look at why puzzle play can feel mentally engaging without making exaggerated claims.'
                                    }
                                ].map((post) => (
                                    <Link
                                        key={post.href}
                                        href={post.href}
                                        className="card"
                                        style={{ textDecoration: 'none', color: 'inherit', border: '3px solid #4A2E1B', background: '#F5EFEB' }}
                                    >
                                        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.35rem', fontWeight: 700 }}>
                                            {post.title}
                                        </h4>
                                        <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{post.desc}</p>
                                    </Link>
                                ))}
                            </div>

                            <div style={{ marginTop: '1.5rem' }}>
                                <Link href="/blog" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
                                    Visit the Blog
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Final Call ── */}
            <section style={{
                padding: '6rem 0',
                textAlign: 'center',
                background: 'var(--bg)',
                borderTop: '1px solid var(--border)',
                backgroundImage: 'linear-gradient(rgba(14,116,144,0.03) 2px, transparent 2px), linear-gradient(90deg, rgba(14,116,144,0.03) 2px, transparent 2px)',
                backgroundSize: '40px 40px',
                position: 'relative',
                zIndex: 1
            }}>
                <div className="container" style={{ position: 'relative' }}>
                    <div style={{ paddingBottom: '1rem' }}>
                        <div style={{
                            background: '#D3AD81', color: '#FFF', padding: '10px 20px', borderRadius: '4px',
                            fontFamily: 'var(--font-display)', fontSize: '2rem', border: '4px solid #4A2E1B',
                            display: 'inline-block',
                            whiteSpace: 'nowrap', textShadow: '2px 2px 0px #4A2E1B'
                        }}>
                            Ready to Play?
                        </div>
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 8vw, 3.5rem)', marginBottom: '1.5rem', marginTop: '0', color: 'var(--text-primary)', fontWeight: 800 }}>
                        Your daily puzzle awaits
                    </h2>
                    <p style={{
                        color: 'var(--text-secondary)',
                        maxWidth: '500px',
                        margin: '0 auto 3rem',
                        fontSize: '1.2rem',
                        fontFamily: 'var(--font-sans)',
                        lineHeight: 1.7,
                    }}>
                        No subscription required. Scroll up to the front page and start matching tiles instantly.
                    </p>
                    <a href="#game" id="btn-play" style={{
                        background: '#D3AD81', color: '#FFF', border: '6px solid #4A2E1B', padding: '15px 45px',
                        fontSize: '1.8rem', fontWeight: 700, borderRadius: '8px', cursor: 'pointer',
                        boxShadow: '0 8px 0 #4A2E1B', transition: 'transform 0.1s, box-shadow 0.1s',
                        fontFamily: 'var(--font-display)', letterSpacing: '2px', textShadow: '2px 2px 0px #4A2E1B',
                        display: 'inline-block', textDecoration: 'none'
                    }}
                        onMouseDown={(e) => {
                            e.currentTarget.style.transform = 'translateY(8px)';
                            e.currentTarget.style.boxShadow = '0 0px 0 #4A2E1B';
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 8px 0 #4A2E1B';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 8px 0 #4A2E1B';
                        }}
                    >
                        PLAY NOW
                    </a>
                </div>
            </section>
        </div>
    );
}
