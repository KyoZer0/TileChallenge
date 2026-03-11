import Link from 'next/link';
import AdSlot from '../components/AdSlot';
import { blogPosts } from '../lib/blogPosts';

const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

export default function BlogPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="gradient-text">TileChallenge Blog</h1>
          <p>Original articles about gameplay, strategy, puzzle habits, and the ideas behind the game.</p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '950px', padding: '0 1.5rem 4rem' }}>
        <div className="card" style={{ marginTop: '2rem' }}>
          <h2 style={{ marginBottom: '0.75rem' }}>What you will find here</h2>
          <p style={{ marginBottom: '0.75rem' }}>
            The TileChallenge blog focuses on useful, evergreen content rather than filler. Each post is written to help
            players understand the game, improve at it, or learn more about the design choices behind the site.
          </p>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
            Current topics include beginner help, strategy, balanced puzzle benefits, and a behind-the-game design post.
          </p>
        </div>

        <AdSlot type="banner" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {sortedPosts.map((post, index) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <article
                className="card animate-in"
                style={{
                  animationDelay: `${0.1 + index * 0.05}s`,
                  display: 'grid',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  <span
                    style={{
                      padding: '0.2rem 0.7rem',
                      borderRadius: '999px',
                      background: 'rgba(108, 92, 231, 0.12)',
                      color: 'var(--primary-light)',
                      fontWeight: 700
                    }}
                  >
                    {post.category}
                  </span>
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <span>{post.readTime}</span>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: 'var(--text)' }}>{post.title}</h2>
                  <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>{post.excerpt}</p>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>{post.featured}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
