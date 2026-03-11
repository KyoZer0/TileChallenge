import type { MetadataRoute } from 'next';
import { blogPosts } from './lib/blogPosts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tilechallenge.com';
  const now = new Date();

  const staticPages = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/play/game', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/how-to-play', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/faq', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/parents', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/cookie-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/disclaimer', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/accessibility', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/sitemap-page', priority: 0.2, changeFrequency: 'monthly' as const },
  ];

  const blogPages = blogPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
    lastModified: new Date(post.publishedAt)
  }));

  const allPages: Array<{
    path: string;
    priority: number;
    changeFrequency: 'weekly' | 'monthly' | 'yearly';
    lastModified?: Date;
  }> = [...staticPages, ...blogPages];

  return allPages.map(page => ({
    url: `${baseUrl}${page.path}`,
    lastModified: page.lastModified ?? now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
