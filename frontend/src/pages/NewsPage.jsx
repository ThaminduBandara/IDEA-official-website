import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, Award, Calendar, Clock, MapPin, Search, Filter, ArrowUpRight, Sparkles, Newspaper, Megaphone, ArrowRight } from 'lucide-react';
import { newsData } from '../data/newsData';

export function NewsPage() {
  const [newsList, setNewsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    setNewsList(newsData);
  }, []);

  const categories = [
    'All',
    'Community Development',
    'Events & Workshops',
    'Climate Action',
    'Environmental Conservation',
    'Sustainable Development'
  ];

  const postTypes = ['All', 'News', 'Event'];

  // Filter news items based on search query, category, and post type
  const filteredNews = newsList.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesType = selectedType === 'All' || item.postType === selectedType;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesType && matchesSearch;
  });

  const featuredItem = newsList.find((item) => item.featured) || newsList[0];

  return (
    <div className="w-full min-h-screen bg-[#f7faf7] text-slate-800">
      
      {/* 1. HERO HEADER SECTION (MATCHING PROJECTS PAGE HERO STYLE) */}
      <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 bg-slate-900 border-b border-emerald-900/40 overflow-hidden text-white">
        
        {/* Real High-Resolution Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2000&q=80"
            alt="IDEA Sustainable Field Projects & News Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle dark gradient overlay to ensure text contrast while preserving image vibrancy */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-emerald-950/65 z-10" />
          <div className="absolute inset-0 bg-black/20 z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column (7 cols): Main Title, Breadcrumb & Subtitle */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Top Breadcrumb Nav */}
              <div className="flex flex-wrap items-center gap-3">
                <nav className="inline-flex items-center gap-2 text-xs font-bold text-slate-200 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-xs">
                  <Link to="/" className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors">
                    <Home className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Home</span>
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  <span className="text-emerald-300 font-extrabold">News &amp; Events</span>
                </nav>

                <span className="text-xs font-semibold text-slate-200 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-xs">
                  You are here: <span className="text-emerald-300 font-extrabold ml-1">• News &amp; Events</span>
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-xs font-extrabold rounded-full border border-emerald-400/40 shadow-xs">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>35+ Years Sustainable Impact • Est. 1990</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                News &amp; Events
              </h1>

              <p className="text-slate-200 text-base sm:text-xl font-medium leading-relaxed max-w-2xl drop-shadow-sm">
                Stay updated with IDEA&apos;s latest activities, workshops, press releases, and contributions to sustainable development across Sri Lanka.
              </p>
            </div>

            {/* Right Column (5 cols): Overlapping Translucent Glass Stats Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 relative">
              
              {/* Stat Glass Card 1 */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl hover:bg-slate-900/75 hover:border-emerald-400/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0 group-hover:bg-[#00704a] group-hover:text-white transition-colors">
                  <Newspaper className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">100+ News &amp; Updates</h3>
                  <p className="text-xs font-medium text-slate-300">Latest announcements &amp; press releases</p>
                </div>
              </div>

              {/* Stat Glass Card 2 */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl hover:bg-slate-900/75 hover:border-emerald-400/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0 group-hover:bg-[#00704a] group-hover:text-white transition-colors">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">25+ Annual Workshops</h3>
                  <p className="text-xs font-medium text-slate-300">Empowering local communities nationwide</p>
                </div>
              </div>

              {/* Stat Glass Card 3 */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl hover:bg-slate-900/75 hover:border-emerald-400/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0 group-hover:bg-[#00704a] group-hover:text-white transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">9 Project Districts</h3>
                  <p className="text-xs font-medium text-slate-300">Climate resilience &amp; clean energy network</p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Organic Wave Cut (Flows seamlessly into light background below) */}
        <div className="w-full absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none z-20">
          <svg
            className="relative block w-full h-8 sm:h-12 text-[#f7faf7]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,40 L1200,120 L0,120 Z"></path>
          </svg>
        </div>

      </section>

      {/* 2. Search & Interactive Category Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 space-y-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Live Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search news, events, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#00684a] focus:ring-1 focus:ring-[#00684a] transition"
              />
            </div>

            {/* Type Selector (All, News, Event) */}
            <div className="flex items-center gap-2 self-start lg:self-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Type:</span>
              <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
                {postTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                      selectedType === type
                        ? 'bg-[#00684a] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">Categories:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-xl border transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#ebf5ee] text-[#00684a] border-[#00684a]/40 shadow-2xs font-bold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* 4. Featured Spotlight Card (Top Item) */}
      {featuredItem && selectedCategory === 'All' && searchQuery === '' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
          <div className="bg-gradient-to-br from-[#043927] to-[#00684a] text-white rounded-3xl overflow-hidden shadow-xl border border-[#00684a]/40 grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Image */}
            <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-[340px] overflow-hidden">
              <img
                src={featuredItem.image}
                alt={featuredItem.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 left-4 bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Spotlight Item</span>
              </div>
            </div>

            {/* Right Details */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-emerald-800/80 text-emerald-200 text-xs font-bold px-3 py-1 rounded-lg border border-emerald-600/40">
                    {featuredItem.category}
                  </span>
                  <span className="text-xs text-emerald-200/80 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    {featuredItem.publishedAt}
                  </span>
                </div>

                <h3 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
                  {featuredItem.title}
                </h3>

                <p className="text-slate-200 text-xs sm:text-base leading-relaxed line-clamp-3">
                  {featuredItem.excerpt}
                </p>

                {featuredItem.location && (
                  <div className="flex items-center gap-2 text-xs text-emerald-200 font-medium">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>{featuredItem.location}</span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <Link
                  to={`/news/${featuredItem.id}`}
                  className="inline-flex items-center gap-2 bg-white text-[#00684a] hover:bg-emerald-50 text-xs sm:text-sm font-extrabold px-6 py-3 rounded-xl shadow-md transition transform hover:-translate-y-0.5"
                >
                  <span>Read Full Announcement</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 5. Main News Grid (Matching screenshot layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        
        {filteredNews.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-3">
            <Newspaper className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No News Found</h3>
            <p className="text-slate-500 text-sm">
              Try adjusting your search criteria or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedType('All');
                setSearchQuery('');
              }}
              className="mt-2 text-xs font-bold text-[#00684a] underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#00684a]/40 transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div className="space-y-4">
                  
                  {/* Top Metadata Row: Category Badge + Date */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="bg-[#ebf5ee] text-[#00684a] font-bold text-[11px] px-3 py-1 rounded-lg border border-[#00684a]/20">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1 text-slate-400 font-semibold text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.publishedAt}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-[#00684a] leading-snug transition-colors line-clamp-3">
                    {item.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>

                </div>

                {/* Bottom Card Footer Row: Type Badge + Read More Button */}
                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="bg-amber-100/80 text-amber-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border border-amber-200">
                    {item.postType || 'News'}
                  </span>

                  <Link
                    to={`/news/${item.id}`}
                    className="inline-flex items-center gap-1.5 bg-[#f0f7f2] hover:bg-[#00684a] text-[#00684a] hover:text-white text-xs font-bold px-4 py-2 rounded-xl border border-[#00684a]/30 transition-all duration-200 group-hover:bg-[#00684a] group-hover:text-white"
                  >
                    <span>Read More</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* 6. "Together We Can Make A Difference" Bottom CTA Banner (Matching Screenshot 3) */}
      <div className="w-full bg-[#00684a] text-white py-14 sm:py-16 px-6 sm:px-8 mt-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Together We Can Make A Difference
          </h2>

          <p className="text-emerald-100 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
            When individuals associate with a shared purpose, their collective efforts can create meaningful change. Join IDEA in addressing climate and environmental challenges across Sri Lanka.
          </p>

          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#00684a] hover:bg-emerald-50 text-sm sm:text-base font-extrabold px-8 py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}

export default NewsPage;
