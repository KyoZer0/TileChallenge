import type { Metadata } from 'next';
import AdSlot from '../components/AdSlot';

export const metadata: Metadata = {
  title: 'FAQ - TileChallenge',
  description: 'Frequently asked questions about TileChallenge, including gameplay, device support, accessibility, privacy, and family-friendly use.',
  keywords: ['TileChallenge FAQ', 'tile puzzle questions', 'TileChallenge help', 'browser puzzle support']
};

const faqs = [
  {
    q: 'Is TileChallenge free to play?',
    a: 'Yes. TileChallenge is free to play in your browser. There is no required download and no account is needed to start a round.'
  },
  {
    q: 'What kind of game is TileChallenge?',
    a: 'TileChallenge is a tile-matching puzzle game. You tap available tiles, build sets of three identical designs in the tray, and clear the full board before the tray fills up.'
  },
  {
    q: 'What devices does the game support?',
    a: 'The site is designed for modern desktop, tablet, and mobile browsers. If a page looks off, refreshing the browser or updating to a current version usually helps.'
  },
  {
    q: 'Do I need to create an account?',
    a: 'No. You can open the site and play without registration, profile setup, or social features.'
  },
  {
    q: 'What is the most important strategy tip?',
    a: 'Protect tray space. Finishing an existing pair is usually better than starting a new tile type with no clear follow-up.'
  },
  {
    q: 'Is TileChallenge appropriate for families?',
    a: 'Yes. The site is designed to be family-friendly, with puzzle-focused gameplay, no chat features, and clear support, privacy, and policy pages.'
  },
  {
    q: 'Does the site show ads?',
    a: 'Yes. Advertising helps support the free game and content. We aim to keep the site useful, readable, and balanced so ads do not replace the core experience.'
  },
  {
    q: 'Where can I learn the rules quickly?',
    a: 'The best starting point is the How to Play page, which explains the objective, how the tray works, and the most common beginner mistakes.'
  },
  {
    q: 'How can I contact the site team?',
    a: 'You can use the Contact page to open an email draft for support questions, feedback, accessibility concerns, or general inquiries.'
  }
];

export default function FAQPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="gradient-text">Frequently Asked Questions</h1>
          <p>Helpful answers about the game, the website, and what to expect before you play.</p>
        </div>
      </div>

      <div className="page-content">
        {faqs.map((faq) => (
          <div key={faq.q} style={{ marginBottom: '2rem' }}>
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </div>
        ))}

        <AdSlot type="banner" />
      </div>
    </>
  );
}
