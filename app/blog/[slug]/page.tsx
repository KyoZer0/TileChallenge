import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AdSlot from '../../components/AdSlot';
import { blogPosts, getBlogPost } from '../../lib/blogPosts';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Article Not Found'
    };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://tilechallenge.com/blog/${post.slug}`,
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description
    }
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <>
      <div className="page-header">
        <div className="container" style={{ maxWidth: '900px' }}>
          <p style={{ marginBottom: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {post.category} · {new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })} · {post.readTime}
          </p>
          <h1 className="gradient-text">{post.title}</h1>
          <p>{post.description}</p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '900px', padding: '0 1.5rem 4rem' }}>
        <article className="page-content" style={{ maxWidth: '100%', padding: 0 }}>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            {post.featured}
          </p>

          <AdSlot type="in-content" />

          {post.sections.map((section) => (
            <section key={section.heading} style={{ marginTop: '2rem' }}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          {post.takeaway ? (
            <div
              className="card"
              style={{
                marginTop: '2.5rem',
                padding: '1.5rem',
                borderLeft: '4px solid var(--primary)'
              }}
            >
              <h2 style={{ marginBottom: '0.75rem' }}>Key takeaway</h2>
              <p style={{ margin: 0 }}>{post.takeaway}</p>
            </div>
          ) : null}

          <AdSlot type="banner" />
        </article>

        <section style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>More from the TileChallenge blog</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="card"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <strong style={{ display: 'block', marginBottom: '0.35rem' }}>{relatedPost.title}</strong>
                <span style={{ color: 'var(--text-secondary)' }}>{relatedPost.excerpt}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
