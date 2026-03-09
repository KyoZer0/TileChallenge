import type { Metadata } from 'next';
import AdSlot from '../components/AdSlot';

export const metadata: Metadata = {
    title: 'About Us – Tile Challenge',
    description: 'Learn about Tile Challenge, our mission to create the ultimate free online word puzzle experience, and the team behind the game.',
    keywords: ['about Tile Challenge', 'word game team', 'who made Tile Challenge'],
};

export default function AboutPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">About Tile Challenge</h1>
                    <p>Our story, mission, and the passion behind every word puzzle.</p>
                </div>
            </div>

            <div className="page-content">
                <h2>Our Story</h2>
                <p>
                    Tile Challenge was born from a simple idea: what if word search puzzles could be more engaging,
                    more strategic, and more satisfying? The result is a game where you swipe through grids of
                    letters to uncover hidden words — an experience that&apos;s instantly intuitive yet endlessly
                    rewarding.
                </p>
                <p>
                    We launched Tile Challenge with a clear vision — to create a free, accessible, and beautifully
                    designed word puzzle game that anyone can enjoy. Whether you&apos;re a student taking a study break, a
                    professional unwinding after work, or a parent looking for screen time that&apos;s actually
                    beneficial for your kids, Tile Challenge has something for you.
                </p>

                <h2>Our Mission</h2>
                <p>
                    We believe that word games are more than entertainment — they&apos;re tools for building
                    vocabulary, improving focus, and finding moments of calm in a busy world. Our mission
                    is to make high-quality word puzzle experiences freely available to everyone, everywhere.
                </p>
                <p>
                    Every puzzle in Tile Challenge is handcrafted with care. From curating the perfect word lists to
                    fine-tuning the difficulty progression, we obsess over the details so you can simply enjoy
                    the puzzles.
                </p>

                <AdSlot type="in-content" />

                <h2>What Makes Us Different</h2>
                <p>
                    Unlike traditional word search games, Tile Challenge uses a swipe-to-connect mechanic. Instead
                    of circling words in a grid full of random letters, every letter belongs to exactly one word.
                    You trace paths through adjacent letters to spell words, and as you find them, the grid
                    gradually clears — creating a satisfying sense of progress as you solve the puzzle.
                </p>

                <h3>Key Features</h3>
                <ul>
                    <li><strong>5 Word Categories:</strong> Animals, Food &amp; Drink, Science, Geography, and Daily Mix — each with curated vocabulary.</li>
                    <li><strong>500+ Words:</strong> Progressive difficulty from easy short words to challenging longer vocabulary.</li>
                    <li><strong>Smart Word Detection:</strong> Instantly validates words as you swipe through letters.</li>
                    <li><strong>Smooth Animations:</strong> Fluid swipe interactions with satisfying visual feedback.</li>
                    <li><strong>No Downloads Required:</strong> Play instantly in your browser on any device.</li>
                    <li><strong>100% Free:</strong> No paywalls, no premium tiers. Just pure word puzzle fun.</li>
                </ul>

                <h2>Our Values</h2>
                <p>
                    <strong>Accessibility First:</strong> We design for everyone. Our game works across devices
                    and screen sizes, with clear visuals and intuitive controls.
                </p>
                <p>
                    <strong>Privacy Matters:</strong> We respect your data. We don&apos;t collect personal
                    information from children, and we&apos;re transparent about how we use cookies and analytics.
                    Read our <a href="/privacy-policy">Privacy Policy</a> for full details.
                </p>
                <p>
                    <strong>Quality Over Quantity:</strong> We&apos;d rather have perfectly curated word puzzles
                    than thousands of mediocre ones. Every puzzle is tested and refined before release.
                </p>

                <h2>Get In Touch</h2>
                <p>
                    We love hearing from our community! Whether you have feedback, suggestions, bug reports,
                    or just want to say hello, don&apos;t hesitate to reach out through our{' '}
                    <a href="/contact">Contact page</a>. Your input helps us make Tile Challenge better for
                    everyone.
                </p>

                <AdSlot type="banner" />
            </div>
        </>
    );
}
