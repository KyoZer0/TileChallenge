import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '../components/AdSlot';

export const metadata: Metadata = {
    title: 'How to Play Tile Challenge – Complete Guide',
    description: 'Learn how to play Tile Challenge step by step. Master swiping through letters, finding hidden words, and using hints to solve puzzles faster.',
    keywords: ['how to play Tile Challenge', 'Tile Challenge guide', 'word game tutorial', 'fill words instructions'],
};

export default function HowToPlayPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">How to Play</h1>
                    <p>Everything you need to know to master Tile Challenge — from your first word to advanced strategies.</p>
                </div>
            </div>

            <div className="page-content">
                <h2>Getting Started</h2>
                <p>
                    Tile Challenge is a word puzzle game where you swipe through a grid of letters to find hidden words.
                    Each grid contains several words that intersect and overlap, filling every cell. Your goal is
                    to find all the words and clear the entire grid.
                </p>

                <h3>Step 1: Look at the Grid</h3>
                <p>
                    Each puzzle presents you with a grid filled with letters. Hidden within the grid are several
                    words running horizontally, vertically, or in bending paths. Every letter in the grid belongs
                    to exactly one word.
                </p>

                <h3>Step 2: Swipe to Connect Letters</h3>
                <p>
                    When you spot a word, swipe or drag through the letters in order. The letters will highlight
                    as you trace your path. If the word is correct, it will lock in place and the letters will
                    change color to show they&apos;ve been found.
                </p>

                <h3>Step 3: Clear the Grid</h3>
                <p>
                    Keep finding words until every letter in the grid has been claimed. The puzzle is complete
                    when all words are found. The game tracks how many words you&apos;ve found and your solving time.
                </p>

                <AdSlot type="in-content" />

                <h2>Hints &amp; Help</h2>
                <p>
                    Stuck on a tricky word? Tile Challenge offers a hint system to help you out. Use a hint to
                    reveal the first letter of an unfound word, or highlight a word&apos;s starting position.
                    There&apos;s no penalty for using hints — they&apos;re there to keep the game fun and flowing.
                </p>

                <h2>Difficulty Progression</h2>
                <p>
                    Early puzzles use smaller grids with common, shorter words. As you advance, grids grow
                    larger, words get longer, and the vocabulary becomes more challenging. Each category
                    has its own difficulty curve so you can pick your comfort level.
                </p>

                <h2>Tips &amp; Strategies</h2>
                <ul>
                    <li><strong>Start with short words:</strong> Two and three-letter words are easiest to spot and help you eliminate letters from the grid.</li>
                    <li><strong>Look for common patterns:</strong> Prefixes like &quot;UN-&quot;, &quot;RE-&quot;, &quot;PRE-&quot; and suffixes like &quot;-ING&quot;, &quot;-TION&quot;, &quot;-LY&quot; can help you spot longer words.</li>
                    <li><strong>Work the edges:</strong> Corner and edge letters often start or end words, making them good starting points.</li>
                    <li><strong>Use the word count:</strong> The number of remaining words gives you a sense of how many are left to find.</li>
                    <li><strong>Don&apos;t overthink it:</strong> Sometimes the simplest words are hiding in plain sight. Take a step back and look at the grid fresh.</li>
                </ul>

                <h2>Ready to Play?</h2>
                <p>
                    Now that you know the basics, it&apos;s time to put your skills to the test!
                    Head to the game and start finding words.
                </p>
                <p style={{ marginTop: '1.5rem' }}>
                    <Link href="/#game" className="btn btn-primary">
                        Play Now →
                    </Link>
                </p>

                <AdSlot type="banner" />
            </div>
        </>
    );
}
