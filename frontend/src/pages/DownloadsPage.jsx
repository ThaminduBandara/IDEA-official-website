import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, Award, Download, FileText, Search, Filter, ExternalLink, FileCheck, BookOpen, Clock, FolderDown, ShieldCheck, ArrowRight } from 'lucide-react';
import { downloadsData } from '../data/downloadsData';

export function DownloadsPage() {
  const [downloadsList, setDownloadsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    setDownloadsList(downloadsData);
  }, []);

  const categories = ['All', 'Reports', 'Guidelines', 'Forms', 'Presentations', 'Other'];

  // Filter list based on category and search query
  const filteredDownloads = downloadsList.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fileName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleDownload = (fileName) => {
    alert(`Downloading ${fileName}...\n(In production, this initiates direct file download from Sanity CDN)`);
  };

  return (
    <div className="w-full min-h-screen bg-[#f4f7f5] text-slate-800">
      
      {/* 1. HERO HEADER SECTION (MATCHING PROJECTS & NEWS PAGE HERO STYLE) */}
      <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 bg-slate-900 overflow-hidden text-white">
        
        {/* Real High-Resolution Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=2000&q=80"
            alt="IDEA Environmental Research & Downloads Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark gradient tint overlay for clean text contrast */}
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
                  <span className="text-emerald-300 font-extrabold">Downloads</span>
                </nav>

                <span className="text-xs font-semibold text-slate-200 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-xs">
                  You are here: <span className="text-emerald-300 font-extrabold ml-1">• Downloads &amp; Resources</span>
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-xs font-extrabold rounded-full border border-emerald-400/40 shadow-xs">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>35+ Years Sustainable Impact • Est. 1990</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                Downloads &amp; Resources
              </h1>

              <p className="text-slate-200 text-base sm:text-xl font-medium leading-relaxed max-w-2xl drop-shadow-sm">
                Access important documents, reports, guidelines, policy briefs, and educational resources related to IDEA&apos;s sustainable development initiatives.
              </p>

              {/* Category Quick Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {['Reports', 'Guidelines', 'Forms', 'Presentations'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold px-3.5 py-1.5 rounded-xl border border-white/20 backdrop-blur-md transition"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{cat}</span>
                  </button>
                ))}
              </div>

            </div>

            {/* Right Column (5 cols): Overlapping Translucent Glass Stats Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 relative">
              
              {/* Stat Glass Card 1 */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl hover:bg-slate-900/75 hover:border-emerald-400/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0 group-hover:bg-[#00704a] group-hover:text-white transition-colors">
                  <FolderDown className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">50+ Publications</h3>
                  <p className="text-xs font-medium text-slate-300">Public policy reports &amp; research studies</p>
                </div>
              </div>

              {/* Stat Glass Card 2 */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl hover:bg-slate-900/75 hover:border-emerald-400/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0 group-hover:bg-[#00704a] group-hover:text-white transition-colors">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">100% Free Access</h3>
                  <p className="text-xs font-medium text-slate-300">Open-access community &amp; NGO resources</p>
                </div>
              </div>

              {/* Stat Glass Card 3 */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl hover:bg-slate-900/75 hover:border-emerald-400/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0 group-hover:bg-[#00704a] group-hover:text-white transition-colors">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">5 Categories</h3>
                  <p className="text-xs font-medium text-slate-300">Reports, guidelines, forms &amp; presentations</p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Organic Wave Cut (Flows seamlessly into light background below) */}
        <div className="w-full absolute -bottom-px left-0 right-0 overflow-hidden leading-none pointer-events-none z-20">
          <svg
            className="relative block w-full h-12 sm:h-16 lg:h-20 text-[#f4f7f5]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,0 C400,110 800,0 1200,70 L1200,120 L0,120 Z"></path>
          </svg>
        </div>

      </section>

      {/* 2. BROWSE RESOURCES FILTER & SEARCH BAR CARD (MATCHING SCREENSHOT 1 & 2) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Browse Resources
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm font-medium">
              Discover and download valuable resources from our comprehensive collection
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            
            {/* Search Input Box */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#00684a] focus:ring-1 focus:ring-[#00684a] transition"
              />
            </div>

            {/* Category Dropdown Selector */}
            <div className="relative w-full sm:w-44">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-[#00684a] font-bold text-slate-700 cursor-pointer transition appearance-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                ▼
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 3. DOWNLOAD CARDS GRID (MATCHING SCREENSHOTS 2 & 3) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-16">
        
        {filteredDownloads.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No Documents Found</h3>
            <p className="text-slate-500 text-sm">
              No files match your current search query or category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-2 text-xs font-bold text-[#00684a] underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDownloads.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#00684a]/40 transition-all duration-300 flex flex-col justify-between h-full space-y-5"
              >
                <div className="space-y-4">
                  
                  {/* Top Header Row: Category Badge + Release Date */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="bg-[#ebf5ee] text-[#00684a] font-bold text-[11px] px-3.5 py-1 rounded-lg border border-[#00684a]/20">
                      {item.category}
                    </span>
                    <span className="text-slate-400 font-semibold text-[11px]">
                      {item.publishedAt}
                    </span>
                  </div>

                  {/* Document Title */}
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-[#00684a] leading-snug transition-colors line-clamp-3">
                    {item.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                </div>

                {/* Document File Container & Action Buttons */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  
                  {/* Filename Preview Box */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                    <FileText className="w-4 h-4 text-[#00684a] shrink-0 mt-0.5" />
                    <span className="break-all line-clamp-2 text-slate-800 font-semibold">
                      {item.fileName}
                    </span>
                  </div>

                  {/* File Metadata Row: Size + Format */}
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
                    <span>{item.fileSize}</span>
                    <span className="uppercase text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-bold">
                      {item.fileFormat}
                    </span>
                  </div>

                  {/* Action Buttons Row: Primary Download + Pop-out Preview */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleDownload(item.fileName)}
                      className="flex-grow bg-[#00684a] hover:bg-[#043927] text-white text-xs font-bold py-3 px-4 rounded-xl shadow-xs transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>

                    <button
                      onClick={() => alert(`Opening preview for ${item.fileName}`)}
                      className="p-3 bg-slate-100 hover:bg-[#00684a] text-slate-700 hover:text-white rounded-xl border border-slate-200 transition-colors"
                      title="Open Document Preview"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* 4. Bottom CTA Banner */}
      <div className="w-full bg-[#00684a] text-white py-14 sm:py-16 px-6 sm:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Need Additional Documentation or Custom Reports?
          </h2>

          <p className="text-emerald-100 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
            Our teams provide custom project evaluations, research papers, and administrative documentation upon request. Contact our Kundasale head office.
          </p>

          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#00684a] hover:bg-emerald-50 text-sm sm:text-base font-extrabold px-8 py-3.5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <span>Contact IDEA Office</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}

export default DownloadsPage;
