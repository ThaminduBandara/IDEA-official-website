import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: '92pfc5yn', // Your Sanity Project ID from backend/sanity.config.ts
  dataset: 'production',
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2023-05-03',
});

// Sanity GROQ query for all projects matching our exact template
export const ALL_PROJECTS_QUERY = `*[_type == "project"] | order(_createdAt desc) {
  "id": _id,
  title,
  "slug": slug.current,
  subtitle,
  categories,
  status,
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
