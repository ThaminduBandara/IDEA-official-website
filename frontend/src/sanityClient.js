import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'cqnl8ze1', // Sanity Project ID
  dataset: 'production',
  useCdn: false, // `false` ensures 100% instant fresh data from Sanity Cloud
  apiVersion: '2023-05-03',
});

// Sanity GROQ query for Projects Page Header Banner & Stat cards
export const PROJECTS_PAGE_QUERY = `*[_type == "projectsPage"][0] {
  badge,
  headline,
  subheadline,
  "backgroundImage": backgroundImage.asset->url,
  statsCards,
  sectionTitle,
  sectionSubtitle
}`;

// Sanity GROQ query for all project items
export const ALL_PROJECTS_QUERY = `*[_type == "project"] | order(order asc, _createdAt desc) {
  "id": _id,
  title,
  "slug": slug.current,
  subtitle,
  featuredTag,
  isFeatured,
  order,
  status,
  categories,
  location,
  beneficiaries,
  duration,
  budget,
  partners,
  "image": image.asset->url,
  "gallery": gallery[].asset->url,
  aboutThisProject,
  objectivesText,
  outcomesText,
  keyObjectives,
  impactStats
}`;

// Sanity GROQ query for News & Events Page Header Banner & Stat cards
export const NEWS_PAGE_QUERY = `*[_type == "newsPage"][0] {
  badge,
  headline,
  subheadline,
  "backgroundImage": backgroundImage.asset->url,
  statsCards
}`;

// Sanity GROQ query for all News & Events items
export const ALL_NEWS_QUERY = `*[_type == "news"] | order(order asc, _createdAt desc) {
  "id": _id,
  title,
  "slug": slug.current,
  category,
  postType,
  publishedAt,
  location,
  "image": image.asset->url,
  excerpt,
  body,
  featured,
  order
}`;
