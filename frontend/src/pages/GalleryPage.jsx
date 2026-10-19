import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, ChevronRight, Camera, Film, Play, X, ChevronLeft, 
  MapPin, Search, Award, Sparkles, Layers
} from 'lucide-react';
import { galleryData } from '../data/galleryData';
import { sanityClient, GALLERY_PAGE_QUERY, ALL_GALLERY_QUERY } from '../sanityClient';

// Helper to check if a URL points to an uploaded video file (e.g. Sanity asset, mp4, mov, webm)
function isDirectVideoFile(url) {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i.test(url) || url.includes('/files/') || url.includes('cdn.sanity.io/files');
}

// Helper to extract YouTube video thumbnail
function getYouTubeThumbnail(url) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

// Helper to convert YouTube / Vimeo links into embedded player URLs
function getEmbedUrl(url) {
  if (!url) return null;
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (ytMatch) {
    return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  }
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  }
  return url;
}

// Helper to extract normalized list of media items from a card (photos & videos)
function getMediaList(item) {
  if (!item) return [];

  if (item.media && Array.isArray(item.media) && item.media.length > 0) {
    return item.media;
  }

  if (item.mediaItems && Array.isArray(item.mediaItems) && item.mediaItems.length > 0) {
    return item.mediaItems.map((m) => {
      const isVideo =
        m.type === 'video' ||
        m._type === 'videoItem' ||
        Boolean(m.videoUrl) ||
        Boolean(m.videoFileUrl);
      const mediaUrl = m.videoFileUrl || m.videoUrl || m.url;
      return {
        type: isVideo ? 'video' : 'image',
        url: mediaUrl,
        videoFileUrl: m.videoFileUrl || null,
        videoUrl: m.videoUrl || null,
        thumbnail: m.thumbnail || (isVideo ? null : mediaUrl),
        duration: m.duration || '',
        caption: m.caption || item.caption || item.title,
      };
    });
  }

  // Fallback to single image or video on item
  const list = [];
  if (item.image) {
    list.push({
      type: 'image',
      url: item.image,
      thumbnail: item.image,
      caption: item.title,
    });
  }
  if (item.videoFileUrl || item.videoUrl) {
    const vUrl = item.videoFileUrl || item.videoUrl;
    list.push({
      type: 'video',
      url: vUrl,
      videoFileUrl: item.videoFileUrl,
      videoUrl: item.videoUrl,
      thumbnail: item.image,
      duration: item.videoDuration || '',
      caption: item.caption || item.title,
    });
  }

  return list.length > 0
    ? list
    : [{ type: 'image', url: item.image, thumbnail: item.image, caption: item.title }];
}

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeFormat, setActiveFormat] = useState('all'); // 'all', 'image', 'video'
  const [searchQuery, setSearchQuery] = useState('');

  // Active Card & Active Media Index within the card
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  // Live Sanity Data + Fallbacks
  const [pageData, setPageData] = useState(null);
  const [items, setItems] = useState(galleryData);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch Banner & Stats from Sanity
    sanityClient.fetch(GALLERY_PAGE_QUERY).then((res) => {
      if (res) setPageData(res);
    }).catch((err) => console.error('Error fetching gallery banner:', err));

    // Fetch Gallery Items from Sanity
    sanityClient.fetch(ALL_GALLERY_QUERY).then((res) => {
      if (res && res.length > 0) {
        setItems(res);
      }
    }).catch((err) => console.error('Error fetching gallery items:', err));
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedCard) return;
      const mediaList = getMediaList(selectedCard);
      if (e.key === 'Escape') {
        setSelectedCard(null);
      } else if (e.key === 'ArrowRight') {
        setActiveMediaIndex((prev) => (prev + 1) % mediaList.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveMediaIndex((prev) => (prev - 1 + mediaList.length) % mediaList.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCard]);

  // Categories list
  const categories = [
    'All',
    'Clean Cooking & Stoves',
    'Renewable Energy & Biochar',
    'Artisan & Vocational Training',
    'Eco-Villages & Community',
    'Historical Archives',
  ];

  // Filtering
  const filteredItems = items.filter((item) => {
    const mediaList = getMediaList(item);
    const hasImage = mediaList.some((m) => m.type === 'image');
    const hasVideo = mediaList.some((m) => m.type === 'video');

    const matchesCategory =
      activeCategory === 'All' ||
      item.category?.toLowerCase() === activeCategory.toLowerCase();

    const matchesFormat =
      activeFormat === 'all' ||
      (activeFormat === 'image' && hasImage) ||
      (activeFormat === 'video' && hasVideo);

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.title?.toLowerCase().includes(q) ||
      item.caption?.toLowerCase().includes(q) ||
      item.district?.toLowerCase().includes(q) ||
      item.year?.toString().includes(q);

    return matchesCategory && matchesFormat && matchesSearch;
  });

  // Open modal for a card
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveMediaIndex(0);
  };

  // Header Banner Fallbacks
  const heroBadge = pageData?.badge || '35+ Years of Sustainable Impact • Est. 1990';
  const heroHeadline = pageData?.headline || 'Media Gallery';
  const heroSubheadline =
    pageData?.subheadline ||
    'Explore three decades of grassroots environmental action, renewable energy innovations, and community empowerment across Sri Lanka captured through photos and documentaries.';
  const heroBgImage =
    pageData?.backgroundImage ||
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2000&q=80';

  const statsCards = pageData?.statsCards || [
    { title: '500+ Field Photos', subtitle: 'Grassroots visual archives', icon: 'camera' },
    { title: '25+ Video Stories', subtitle: 'Documentaries & interviews', icon: 'video' },
    { title: '25 Districts', subtitle: 'Island-wide impact documented', icon: 'mapPin' },
  ];

  const sectionTitle = pageData?.sectionTitle || 'Our Fieldwork & Media Moments';
  const sectionSubtitle =
    pageData?.sectionSubtitle || 'Click any gallery card to explore the collection of photos and videos.';

  // Active album media list
  const activeMediaList = selectedCard ? getMediaList(selectedCard) : [];
  const currentMedia = activeMediaList[activeMediaIndex] || activeMediaList[0];

  return (
    <div className="w-full min-h-screen bg-[#f4f8f5] text-slate-800">
      
      {/* 1. HERO HEADER BANNER (Matches other pages) */}
      <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 bg-slate-900 overflow-hidden text-white">
        {/* Background Image & Contrast Gradients */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBgImage}
            alt="Gallery Header Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-emerald-950/65 z-10" />
          <div className="absolute inset-0 bg-black/20 z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column (7 cols): Title, Breadcrumbs & Subtitle */}
            <div className="lg:col-span-7 space-y-6">
              {/* Breadcrumbs */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <nav className="inline-flex items-center gap-2 text-xs font-bold text-slate-200 bg-white/10 backdrop-blur-md px-3.5 sm:px-4 py-1.5 rounded-full border border-white/20 shadow-xs">
                  <Link to="/" className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors">
                    <Home className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Home</span>
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  <span className="text-emerald-300 font-extrabold">Media</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  <span className="text-white font-extrabold">Gallery</span>
                </nav>
              </div>

              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-xs font-extrabold rounded-full border border-emerald-400/40 shadow-xs max-w-full">
                <Camera className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{heroBadge}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                {heroHeadline}
              </h1>

              {/* Subheadline */}
              <p className="text-slate-200 text-base sm:text-lg font-medium leading-relaxed max-w-2xl drop-shadow-xs">
                {heroSubheadline}
              </p>
            </div>

            {/* Right Column (5 cols): Translucent Glass Stats Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 relative">
              {statsCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl hover:bg-slate-900/75 hover:border-emerald-400/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0 group-hover:bg-[#00704a] group-hover:text-white transition-colors">
                    {idx === 0 && <Camera className="w-6 h-6" />}
                    {idx === 1 && <Film className="w-6 h-6" />}
                    {idx >= 2 && <MapPin className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-300">{card.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom Organic Wave Cut (Matches other pages) */}
        <div className="w-full absolute -bottom-px left-0 right-0 overflow-hidden leading-none pointer-events-none z-20">
          <svg
            className="relative block w-full h-12 sm:h-16 lg:h-20 text-[#f4f8f5]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,0 C400,110 800,0 1200,70 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. GALLERY SECTION WITH CATEGORIES & SEARCH */}
      <section className="py-10 sm:py-16 bg-[#f4f8f5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
          
          {/* Main Headline & Search Bar Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200">
            <div className="space-y-1 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {sectionTitle}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-medium">
                {sectionSubtitle}
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gallery or district..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00684a] focus:ring-2 focus:ring-[#00684a]/20 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills & Format Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 border cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#00684a] text-white border-[#00684a] shadow-md'
                      : 'bg-white text-slate-700 border-slate-200/90 hover:bg-[#d7f5e8] hover:text-[#00684a] hover:border-[#a3e6c5]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Format Toggle (All / Photos / Videos) */}
            <div className="inline-flex p-1 rounded-xl bg-white border border-slate-200/90 text-xs font-bold shadow-2xs shrink-0 self-start sm:self-auto">
              <button
                onClick={() => setActiveFormat('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeFormat === 'all'
                    ? 'bg-[#00684a] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#00684a]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFormat('image')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeFormat === 'image'
                    ? 'bg-[#00684a] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#00684a]'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Photos</span>
              </button>
              <button
                onClick={() => setActiveFormat('video')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeFormat === 'video'
                    ? 'bg-[#00684a] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#00684a]'
                }`}
              >
                <Film className="w-3.5 h-3.5 text-amber-500" />
                <span>Videos</span>
              </button>
            </div>
          </div>

          {/* 3. FULL-PHOTO CARDS (Text written directly on the image) */}
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <Search className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">No Media Found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No items matched your filter. Try selecting "All" or clearing your search.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setActiveFormat('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-[#00684a] text-white text-xs font-bold rounded-xl hover:bg-[#043927] transition cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredItems.map((item, idx) => {
                const mediaList = getMediaList(item);
                const photoCount = mediaList.filter((m) => m.type === 'image').length;
                const videoCount = mediaList.filter((m) => m.type === 'video').length;

                return (
                  <div
                    key={item.id || idx}
                    onClick={() => handleCardClick(item)}
                    className="relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[420px] flex flex-col justify-between p-6 sm:p-7 text-white shadow-lg border border-slate-200/90 group transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer bg-slate-900"
                  >
                    {/* Full Background Photo / Video Cover */}
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    ) : mediaList.find((m) => m.type === 'video')?.url && isDirectVideoFile(mediaList.find((m) => m.type === 'video').url) ? (
                      <video
                        src={`${mediaList.find((m) => m.type === 'video').url}#t=0.5`}
                        preload="metadata"
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out pointer-events-none"
                      />
                    ) : mediaList.find((m) => m.type === 'video')?.url && getYouTubeThumbnail(mediaList.find((m) => m.type === 'video').url) ? (
                      <img
                        src={getYouTubeThumbnail(mediaList.find((m) => m.type === 'video').url)}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 w-full h-full bg-slate-800" />
                    )}

                    {/* Dark Contrast Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-black/35 group-hover:via-slate-950/55 transition-all duration-300 pointer-events-none" />

                    {/* Top Overlay Row: Media Counts & Location Badge */}
                    <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#00684a]/95 text-white shadow-md border border-white/20">
                          <Layers className="w-3.5 h-3.5 text-emerald-300" />
                          <span>
                            {videoCount > 0 && photoCount > 0
                              ? `${photoCount} Photos • ${videoCount} Video${videoCount > 1 ? 's' : ''}`
                              : videoCount > 0
                              ? `${videoCount} Video${videoCount > 1 ? 's' : ''}`
                              : `${photoCount} Photos`}
                          </span>
                        </span>
                      </div>

                      {(item.district || item.year) && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-black/55 backdrop-blur-md text-white border border-white/20 shadow-sm">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{[item.district, item.year].filter(Boolean).join(' • ')}</span>
                        </span>
                      )}
                    </div>

                    {/* Center Video Indicator if this album contains videos */}
                    {videoCount > 0 && (
                      <div className="relative z-10 my-auto flex items-center justify-center">
                        <div className="w-13 h-13 rounded-full bg-[#00684a]/95 text-white flex items-center justify-center shadow-2xl backdrop-blur-xs border-2 border-white/90 group-hover:scale-115 group-hover:bg-emerald-500 transition-all duration-300">
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Bottom Overlay Row: Category, Title, Caption & Action Link */}
                    <div className="relative z-10 space-y-2 mt-auto pt-6">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-emerald-400 drop-shadow-sm">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-amber-300 transition-colors leading-snug drop-shadow-md">
                        {item.title}
                      </h3>

                      {item.caption && (
                        <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed drop-shadow-xs font-normal">
                          {item.caption}
                        </p>
                      )}

                      <div className="pt-2 flex items-center justify-between text-xs font-bold text-emerald-300 group-hover:text-white transition-colors">
                        <span className="flex items-center gap-1">
                          <span>View Collection ({mediaList.length} items)</span>
                          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-slate-300">
                          Click to open
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* 4. LIGHT VIEW MODAL: ONE ENLARGED IMAGE/VIDEO + HORIZONTAL THUMBNAIL STRIP AT BOTTOM */}
      {selectedCard && currentMedia && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md animate-fadeIn p-3 sm:p-6"
          onClick={() => setSelectedCard(null)}
        >
          {/* Modal Container: Crisp white card with rounded-3xl and soft shadow */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[94vh] overflow-hidden p-4 sm:p-6 space-y-3"
          >
            {/* Top Bar: Category Pill, Title & Close Button */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00684a] text-white shrink-0">
                  {selectedCard.category}
                </span>
                <span className="text-sm font-extrabold text-slate-800 truncate hidden sm:inline">
                  {selectedCard.title}
                </span>
                <span className="text-xs text-slate-400 font-semibold shrink-0">
                  ({activeMediaIndex + 1} of {activeMediaList.length})
                </span>
              </div>

              <button
                onClick={() => setSelectedCard(null)}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200 shrink-0 cursor-pointer"
                aria-label="Close"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Central Media Frame: ONE ENLARGED IMAGE OR VIDEO */}
            <div className="relative w-full flex items-center justify-center bg-slate-50 border border-slate-200/80 rounded-2xl p-2 min-h-[300px] max-h-[54vh] overflow-hidden shadow-inner">
              
              {/* Left Arrow Button */}
              {activeMediaList.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMediaIndex(
                      (prev) => (prev - 1 + activeMediaList.length) % activeMediaList.length
                    );
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md border border-slate-200 hover:scale-105 transition-all cursor-pointer"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-700" />
                </button>
              )}

              {/* Right Arrow Button */}
              {activeMediaList.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMediaIndex((prev) => (prev + 1) % activeMediaList.length);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md border border-slate-200 hover:scale-105 transition-all cursor-pointer"
                  aria-label="Next"
                >
                  <ChevronRight className="w-5 h-5 text-slate-700" />
                </button>
              )}

              {/* Media Content */}
              {currentMedia.type === 'video' ? (
                <div className="w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-lg border border-slate-300 bg-black flex items-center justify-center">
                  {currentMedia.url ? (
                    isDirectVideoFile(currentMedia.url) || currentMedia.videoFileUrl ? (
                      <video
                        key={currentMedia.url}
                        src={currentMedia.videoFileUrl || currentMedia.url}
                        controls
                        autoPlay
                        playsInline
                        className="w-full h-full object-contain"
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <iframe
                        src={getEmbedUrl(currentMedia.url)}
                        title={currentMedia.caption || selectedCard.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      Video stream currently unavailable.
                    </div>
                  )}
                </div>
              ) : (
                <img
                  src={currentMedia.url || currentMedia.thumbnail}
                  alt={currentMedia.caption || selectedCard.title}
                  className="max-h-[50vh] max-w-full w-auto object-contain rounded-xl shadow-sm"
                />
              )}
            </div>

            {/* Middle Caption & Location Details */}
            <div className="text-center space-y-1 px-4">
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {selectedCard.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed line-clamp-2 font-medium">
                {currentMedia.caption || selectedCard.caption}
              </p>
              {(selectedCard.district || selectedCard.year) && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-[#00684a] font-bold pt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{[selectedCard.district, selectedCard.year].filter(Boolean).join(' • ')}</span>
                </div>
              )}
            </div>

            {/* BOTTOM: ALL IMAGES AND VIDEOS SHOWN HORIZONTALLY */}
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-2.5 shadow-inner">
              <div className="flex items-center justify-center gap-2.5 overflow-x-auto py-1 px-2 scrollbar-none">
                {activeMediaList.map((mediaItem, thumbIdx) => {
                  const isActive = thumbIdx === activeMediaIndex;
                  const isVideo = mediaItem.type === 'video';

                  return (
                    <button
                      key={thumbIdx}
                      onClick={() => setActiveMediaIndex(thumbIdx)}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'border-2 border-[#00684a] ring-2 ring-[#00684a]/30 scale-105 shadow-md opacity-100'
                          : 'border border-slate-200 opacity-60 hover:opacity-100 hover:scale-102'
                      }`}
                      title={mediaItem.caption || `Item ${thumbIdx + 1}`}
                    >
                      {mediaItem.thumbnail ? (
                        <img
                          src={mediaItem.thumbnail}
                          alt={`Thumbnail ${thumbIdx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : isDirectVideoFile(mediaItem.url) ? (
                        <video
                          src={`${mediaItem.url}#t=0.5`}
                          preload="metadata"
                          muted
                          playsInline
                          className="w-full h-full object-cover pointer-events-none"
                        />
                      ) : getYouTubeThumbnail(mediaItem.url) ? (
                        <img
                          src={getYouTubeThumbnail(mediaItem.url)}
                          alt={`Thumbnail ${thumbIdx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={selectedCard.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=300&q=80'}
                          alt={`Thumbnail ${thumbIdx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}

                      {/* Video Indicator on thumbnail */}
                      {isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <div className="w-6 h-6 rounded-full bg-[#00684a] text-white flex items-center justify-center shadow-md">
                            <Play className="w-3 h-3 fill-white ml-0.5" />
                          </div>
                        </div>
                      )}

                      {/* Item index counter */}
                      <span className="absolute bottom-1 right-1 text-[9px] font-bold px-1 rounded bg-black/70 text-white">
                        {thumbIdx + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default GalleryPage;
