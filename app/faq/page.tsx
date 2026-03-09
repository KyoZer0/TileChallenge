import type { Metadata } from 'next';
import AdSlot from '../components/AdSlot';

export const metadata: Metadata = {
    title: 'FAQ – FillWords',
    description: 'Frequently asked questions about FillWords. Find answers about gameplay, features, device support, and more.',
    keywords: ['FillWords FAQ', 'word game questions', 'FillWords help'],
};

const faqs = [
    {
        q: 'Is FillWords really free?',
        a: 'Yes! FillWords is 100% free to play. No downloads, no accounts, no hidden paywalls. Just open your browser and start finding words.',
    },
    {
        q: 'What devices can I play on?',
        a: 'FillWords works on any modern browser — desktop, tablet, or mobile. The game automatically adapts to your screen size for the best experience.',
    },
    {
        q: 'How does word detection work?',
        a: 'Simply swipe through adjacent letters to spell a word. FillWords instantly validates your selection — if the word is correct, it locks in and the letters change color. Every letter in the grid belongs to exactly one word.',
    },
    {
        q: 'How many puzzles are there?',
        a: 'FillWords currently features hundreds of puzzles across 5 categories (Animals, Food & Drink, Science, Geography, and Daily Mix). New puzzles are added regularly.',
    },
    {
        q: 'What does the difficulty progression look like?',
        a: 'Early puzzles use smaller grids with common, short words. As you advance, grids grow larger, words get longer, and the vocabulary becomes more specialized.',
    },
    {
        q: 'Can I play offline?',
        a: 'FillWords requires an internet connection to load puzzle data. Once loaded, gameplay is smooth even on slower connections.',
    },
    {
        q: 'Is my progress saved?',
        a: 'Currently, progress is not saved between sessions. We\'re working on adding progress tracking in a future update.',
    },
    {
        q: 'Is FillWords safe for children?',
        a: 'Yes! FillWords contains no violent or inappropriate content. It\'s a great way for kids to build vocabulary and pattern recognition skills. We also don\'t collect personal information from children.',
    },
];

export default function FAQPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">Frequently Asked Questions</h1>
                    <p>Got questions? We&apos;ve got answers.</p>
                </div>
            </div>

            <div className="page-content">
                {faqs.map((faq, i) => (
                    <div key={i} style={{ marginBottom: '2rem' }}>
                        <h3>{faq.q}</h3>
                        <p>{faq.a}</p>
                    </div>
                ))}

                <AdSlot type="banner" />
            </div>
        </>
    );
}
