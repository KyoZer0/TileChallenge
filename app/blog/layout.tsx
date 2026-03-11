import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog – TileChallenge Articles and Guides',
    description: 'Read original TileChallenge articles about gameplay, strategy, puzzle habits, and the design ideas behind the game.',
    keywords: ['TileChallenge blog', 'tile matching strategy', 'puzzle game guides', 'browser game articles'],
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
