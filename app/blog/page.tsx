'use client';

import { useState } from 'react';
import Link from 'next/link';
import AdSlot from '../components/AdSlot';

const posts = [
    {
        slug: 'what-is-Tile Challenge',
        title: 'What is Tile Challenge? The Ultimate Puzzle Experience',
        excerpt: 'Discover the game that blends the best of jigsaw puzzles with solitaire card mechanics. Learn what makes Tile Challenge unique and why players love it.',
        icon: '🧩',
        date: 'February 10, 2026',
        readTime: '5 min read',
        category: 'Game',
    },
    {
        slug: 'benefits-of-puzzle-games',
        title: '7 Brain Benefits of Playing Puzzle Games',
        excerpt: 'Science shows that puzzles improve memory, concentration, and problem-solving skills. Seven proven ways puzzles boost your brain.',
        icon: '🧠',
        date: 'February 8, 2026',
        readTime: '6 min read',
        category: 'Science',
    },
    {
        slug: 'tips-and-tricks',
        title: 'Pro Tips & Tricks to Master Tile Challenge',
        excerpt: 'From corner strategies to move optimization, expert tips backed by cognitive science to solve puzzles faster.',
        icon: '💡',
        date: 'February 5, 2026',
        readTime: '7 min read',
        category: 'Strategy',
    },
    {
        slug: 'history-of-puzzle-games',
        title: 'The Fascinating History of Jigsaw & Solitaire Games',
        excerpt: 'From 18th-century dissected maps to modern digital puzzles, explore the rich history behind two beloved game types.',
        icon: '📜',
        date: 'February 2, 2026',
        readTime: '8 min read',
        category: 'History',
    },
    {
        slug: 'best-puzzle-games-for-kids',
        title: 'Best Puzzle Games for Kids in 2025',
        excerpt: 'Educational and fun puzzle games curated for children, evaluated against AAP and research-backed safety and learning criteria.',
        icon: '👧',
        date: 'January 28, 2026',
        readTime: '6 min read',
        category: 'Family',
    },
    // --- New blog posts ---
    {
        slug: 'neuroscience-of-puzzle-solving',
        title: 'The Neuroscience of Puzzle Solving: What Happens in Your Brain',
        excerpt: 'Dopamine, neural plasticity, and the brain regions activated when you solve puzzles — the full neuroscience breakdown.',
        icon: '🔬',
        date: 'February 24, 2026',
        readTime: '10 min read',
        category: 'Science',
    },
    {
        slug: 'puzzles-and-focus',
        title: 'How Puzzles Improve Focus and Attention in the Digital Age',
        excerpt: 'Combat digital distraction and train sustained attention through puzzle solving, backed by attention research.',
        icon: '🎯',
        date: 'February 21, 2026',
        readTime: '9 min read',
        category: 'Science',
    },
    {
        slug: 'puzzle-solving-psychology',
        title: 'Puzzle-Solving Psychology: Why We Love the \'Aha!\' Moment',
        excerpt: 'The psychology of insight, curiosity, and intrinsic motivation — why solving puzzles feels so good.',
        icon: '💡',
        date: 'February 18, 2026',
        readTime: '10 min read',
        category: 'Science',
    },
    {
        slug: 'pattern-recognition-skills',
        title: 'Pattern Recognition: The Hidden Skill Behind Every Great Puzzler',
        excerpt: 'How expert puzzlers develop visual pattern-matching skills and why this ability transfers to real life.',
        icon: '👁️',
        date: 'February 18, 2026',
        readTime: '9 min read',
        category: 'Strategy',
    },
    {
        slug: 'brain-training-techniques',
        title: 'Brain Training Techniques: Science-Based Methods That Actually Work',
        excerpt: 'Cut through the hype — which brain training approaches are genuinely backed by scientific evidence?',
        icon: '🏋️',
        date: 'February 15, 2026',
        readTime: '10 min read',
        category: 'Strategy',
    },
    {
        slug: 'mindfulness-and-puzzles',
        title: 'Mindfulness and Puzzles: How Games Create Flow States',
        excerpt: 'The deep connection between puzzles, mindfulness, and Csikszentmihalyi\'s flow — active meditation through games.',
        icon: '🧘',
        date: 'February 12, 2026',
        readTime: '9 min read',
        category: 'Strategy',
    },
    {
        slug: 'history-of-card-games',
        title: 'The Complete History of Card Games: From Ancient China to Solitaire',
        excerpt: 'A thousand-year journey from Tang Dynasty leaf cards through Mamluk courts to Windows Solitaire.',
        icon: '🃏',
        date: 'February 9, 2026',
        readTime: '10 min read',
        category: 'History',
    },
    {
        slug: 'famous-puzzle-designers',
        title: 'Famous Puzzle Designers Who Changed Gaming Forever',
        excerpt: 'The brilliant minds behind the Rubik\'s Cube, Tetris, Sudoku, and modern puzzle game design.',
        icon: '🏆',
        date: 'February 6, 2026',
        readTime: '10 min read',
        category: 'History',
    },
    {
        slug: 'golden-age-of-puzzles',
        title: 'The Golden Age of Puzzles: How the Great Depression Made Jigsaws a Craze',
        excerpt: 'How economic hardship in the 1930s sparked the greatest jigsaw puzzle craze in history.',
        icon: '📰',
        date: 'February 3, 2026',
        readTime: '9 min read',
        category: 'History',
    },
    {
        slug: 'screen-time-guide',
        title: "A Parent's Complete Guide to Screen Time and Educational Games",
        excerpt: 'Navigate the screen time debate with evidence from the AAP, Oxford, and developmental psychology.',
        icon: '📱',
        date: 'January 25, 2026',
        readTime: '10 min read',
        category: 'Family',
    },
    {
        slug: 'family-game-night',
        title: 'Family Game Night: Building Bonds Through Puzzles',
        excerpt: 'How shared puzzle solving strengthens family relationships, communication, and emotional development.',
        icon: '👨‍👩‍👧‍👦',
        date: 'January 22, 2026',
        readTime: '9 min read',
        category: 'Family',
    },
    {
        slug: 'puzzles-build-resilience',
        title: 'How Puzzles Build Resilience and Patience in Children',
        excerpt: 'Research on how productive struggle in puzzles develops grit, growth mindset, and frustration tolerance.',
        icon: '💪',
        date: 'January 19, 2026',
        readTime: '9 min read',
        category: 'Family',
    },
    {
        slug: 'best-free-online-puzzle-games',
        title: '10 Best Free Online Puzzle Games in 2026 (Honest Reviews)',
        excerpt: 'Independent, unbiased reviews of the best free puzzle games available online today.',
        icon: '⭐',
        date: 'January 16, 2026',
        readTime: '10 min read',
        category: 'Reviews',
    },
    {
        slug: 'puzzles-vs-social-media',
        title: 'Puzzles vs. Social Media: What Science Says About Screen Quality',
        excerpt: 'Active vs passive screen time — the cognitive effects of puzzles compared to social media scrolling.',
        icon: '📊',
        date: 'January 13, 2026',
        readTime: '9 min read',
        category: 'Reviews',
    },
    {
        slug: 'puzzles-for-seniors',
        title: 'How Seniors Can Use Puzzles to Stay Mentally Sharp',
        excerpt: 'Evidence-based strategies for older adults to maintain cognitive health through regular puzzle practice.',
        icon: '🧓',
        date: 'January 10, 2026',
        readTime: '9 min read',
        category: 'Reviews',
    },
];

// Sort by date (newest first)
const sortedPosts = [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const allCategories = ['All', ...Array.from(new Set(posts.map(p => p.category)))];

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredPosts = activeCategory === 'All'
        ? sortedPosts
        : sortedPosts.filter(p => p.category === activeCategory);

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">Tile Challenge Blog</h1>
                    <p>Tips, insights, and stories from the world of puzzles.</p>
                </div>
            </div>

            <div className="container" style={{ maxWidth: '900px', padding: '0 1.5rem 4rem' }}>
                <AdSlot type="banner" />

                {/* Category filter tabs */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginTop: '2rem',
                    marginBottom: '1rem',
                }}>
                    {allCategories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '0.4rem 1rem',
                                borderRadius: 'var(--radius-xl)',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                background: activeCategory === cat ? 'var(--primary)' : 'rgba(108, 92, 231, 0.1)',
                                color: activeCategory === cat ? '#fff' : 'var(--primary-light)',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                    Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {filteredPosts.map((post, i) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                            <article className="card animate-in" style={{
                                animationDelay: `${0.1 + i * 0.05}s`,
                                display: 'flex',
                                gap: '1.5rem',
                                cursor: 'pointer',
                                alignItems: 'flex-start',
                            }}>
                                <div style={{
                                    fontSize: '2.5rem',
                                    flexShrink: 0,
                                    width: '80px',
                                    height: '80px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(108, 92, 231, 0.1)',
                                    borderRadius: 'var(--radius-md)',
                                }}>
                                    {post.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        display: 'flex',
                                        gap: '1rem',
                                        marginBottom: '0.5rem',
                                        fontSize: '0.8rem',
                                        color: 'var(--text-muted)',
                                    }}>
                                        <span style={{
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: 'var(--radius-xl)',
                                            background: 'rgba(108, 92, 231, 0.15)',
                                            color: 'var(--primary-light)',
                                            fontWeight: 600,
                                        }}>
                                            {post.category}
                                        </span>
                                        <span>{post.date}</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text)' }}>
                                        {post.title}
                                    </h2>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.7 }}>
                                        {post.excerpt}
                                    </p>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                <AdSlot type="banner" />
            </div>
        </>
    );
}
