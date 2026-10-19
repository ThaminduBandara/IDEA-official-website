import { createClient } from '@sanity/client';

// ============================================================================
// DEMO / PRESENTATION MODE TOGGLE
// Set to TRUE  -> Displays 100% complete, rich mock data (projects, news, downloads, etc.)
// Set to FALSE -> Connects live to Sanity Studio cloud data
// ============================================================================
export const USE_MOCK_DATA = false;

const rawSanityClient = createClient({
  projectId: 'cqnl8ze1', // Sanity Project ID
  dataset: 'production',
  useCdn: false, // `false` ensures 100% instant fresh data from Sanity Cloud
  apiVersion: '2023-05-03',
});

// Wrapper around sanityClient that returns null when in Demo Mode,
// allowing all components to cleanly fall back to rich default mock data.
export const sanityClient = {
  ...rawSanityClient,
  fetch: async (...args) => {
    if (USE_MOCK_DATA) {
      return null;
    }
    return rawSanityClient.fetch(...args);
  },
};

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

// Sanity GROQ query for Downloads & Resources Page Header Banner & Stat cards & CTA
export const DOWNLOADS_PAGE_QUERY = `*[_type == "downloadsPage"][0] {
  badge,
  headline,
  subheadline,
  "backgroundImage": backgroundImage.asset->url,
  statsCards,
  browseTitle,
  browseSubtitle,
  ctaTitle,
  ctaText,
  ctaButtonText,
  ctaButtonLink
}`;

// Sanity GROQ query for all Downloads & Resources items
export const ALL_DOWNLOADS_QUERY = `*[_type == "download"] | order(order asc, _createdAt desc) {
  "id": _id,
  title,
  "slug": slug.current,
  category,
  publishedAt,
  description,
  fileName,
  fileSize,
  fileFormat,
  "fileUrl": fileAsset.asset->url,
  "autoFileName": fileAsset.asset->originalFilename,
  "autoFileSize": fileAsset.asset->size,
  "autoFileExtension": fileAsset.asset->extension,
  externalUrl,
  featured,
  order
}`;

// Sanity GROQ query for Contact Page Header, Stats, Office Cards & FAQs
export const CONTACT_PAGE_QUERY = `*[_type == "contactPage"][0] {
  badge,
  headline,
  subheadline,
  "backgroundImage": backgroundImage.asset->url,
  statsCards,
  locationAddress,
  locationDescription,
  phoneNumber,
  phoneDescription,
  emailAddress,
  emailDescription,
  officeHoursTime,
  officeHoursDescription,
  mapGuideText,
  googleMapsLink,
  officeVisitsText,
  faqTitle,
  faqSubtitle,
  faqs,
  web3FormsAccessKey
}`;

// Sanity GROQ query for Technologies Page Header, Stats & CTA
export const TECHNOLOGIES_PAGE_QUERY = `*[_type == "technologiesPage"][0] {
  badge,
  headline,
  subheadline,
  "backgroundImage": backgroundImage.asset->url,
  statsCards,
  sectionTitle,
  sectionSubtitle,
  ctaTitle,
  ctaText,
  ctaButtonText,
  ctaButtonLink,
  ctaSecondaryButtonText,
  ctaSecondaryButtonLink
}`;

// Sanity GROQ query for all Technology items
export const ALL_TECHNOLOGIES_QUERY = `*[_type == "technology"] | order(order asc, _createdAt desc) {
  "id": _id,
  title,
  "slug": slug.current,
  category,
  tagline,
  icon,
  "image": image.asset->url,
  description,
  features,
  efficiency,
  deployment,
  order
}`;

// Sanity GROQ query for Training Page Header, Stats, Headings & CTA
export const TRAINING_PAGE_QUERY = `*[_type == "trainingPage"][0] {
  badge,
  headline,
  subheadline,
  "backgroundImage": backgroundImage.asset->url,
  statsCards,
  sectionTitle,
  sectionSubtitle,
  storiesBadge,
  storiesTitle,
  storiesSubtitle,
  ctaTitle,
  ctaText,
  ctaButtonText,
  ctaButtonLink,
  ctaSecondaryButtonText,
  ctaSecondaryButtonLink
}`;

// Sanity GROQ query for all Training Programs
export const ALL_TRAINING_PROGRAMS_QUERY = `*[_type == "trainingProgram"] | order(order asc, _createdAt desc) {
  "id": _id,
  title,
  "slug": slug.current,
  category,
  audience,
  duration,
  "image": image.asset->url,
  description,
  outcomes,
  impactStat,
  order
}`;

// Sanity GROQ query for all Trainee Stories & Testimonials
export const ALL_TRAINEE_STORIES_QUERY = `*[_type == "traineeStory"] | order(order asc, _createdAt desc) {
  "id": _id,
  name,
  role,
  district,
  story,
  "photo": photo.asset->url,
  order
}`;

// Sanity GROQ query for Media & Gallery Page Banner & Stats
export const GALLERY_PAGE_QUERY = `*[_type == "galleryPage"][0] {
  badge,
  headline,
  subheadline,
  "backgroundImage": backgroundImage.asset->url,
  statsCards,
  sectionTitle,
  sectionSubtitle
}`;

// Sanity GROQ query for all Gallery Items (photos & videos)
export const ALL_GALLERY_QUERY = `*[_type == "galleryItem"] | order(order asc, _createdAt desc) {
  "id": _id,
  title,
  mediaType,
  "image": image.asset->url,
  "videoFileUrl": videoFile.asset->url,
  videoUrl,
  videoDuration,
  category,
  district,
  year,
  caption,
  isFeatured,
  order,
  mediaItems[]{
    _type,
    "type": select(_type == "photoItem" => "image", _type == "videoItem" => "video", "image"),
    "videoFileUrl": videoFile.asset->url,
    videoUrl,
    "url": select(
      _type == "photoItem" => asset->url,
      defined(videoFile.asset) => videoFile.asset->url,
      videoUrl
    ),
    "thumbnail": select(
      _type == "videoItem" && defined(thumbnail.asset) => thumbnail.asset->url,
      _type == "photoItem" => asset->url,
      null
    ),
    caption,
    duration
  }
}`;

// Sanity GROQ query for Mobile Kitchen Advertisement Spotlight
export const MOBILE_KITCHEN_AD_QUERY = `*[_type == "mobileKitchenAd"][0] {
  badge,
  mainHeadline,
  subHeadline,
  "videoFileUrl": videoFile.asset->url,
  externalVideoUrl,
  "posterImageUrl": posterImage.asset->url,
  productBadge,
  productTitle,
  productDescription,
  sellingPoints,
  hotlineLabel,
  hotlineNumber,
  hotlineSubtext,
  callButtonText,
  inquireButtonText
}`;



