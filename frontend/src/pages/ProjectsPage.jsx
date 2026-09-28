import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ChevronRight, Award, MapPin, Users, Clock, Search, X, ArrowUpRight } from 'lucide-react';
import { projectsData } from '../data/projectsData';

export function ProjectsPage() {
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Energy Efficiency',
    'Climate Action',
    'Community Development',
    'Environmental Conservation',
    'Sustainable Agriculture'
  ];

  // Filter projects based on category and search query
  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = activeCategory === 'All' || project.categories.includes(activeCategory);
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.overview?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-[#f4f8f5] text-slate-800">
      
      {/* 1. CINEMATIC REAL PHOTO HERO BANNER WITH FLOATING GLASS STATS CARDS */}
      <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 bg-slate-900 border-b border-emerald-900/40 overflow-hidden text-white">
        
        {/* Real High-Resolution Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2000&q=80"
            alt="IDEA Sustainable Field Projects Background"
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
                <nav className="inline-flex items-center gap-2 text-xs font-bold text-slate-200 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-sm">
                  <Link to="/" className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors">
                    <Home className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Home</span>
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  <span className="text-emerald-300 font-extrabold">Projects</span>
                </nav>

                <span className="text-xs font-semibold text-slate-200 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm">
                  You are here: <span className="text-emerald-300 font-extrabold ml-1">• Our Projects</span>
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-xs font-extrabold rounded-full border border-emerald-400/40 shadow-sm">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>35+ Years Sustainable Impact • Est. 1990</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                Our Projects
              </h1>

              <p className="text-slate-200 text-base sm:text-xl font-medium leading-relaxed max-w-2xl drop-shadow-sm">
                Discover IDEA's impactful initiatives in sustainable development, renewable energy, bio-mass cooking, and environmental conservation across Sri Lanka and South Asia.
              </p>
            </div>

            {/* Right Column (5 cols): Overlapping Translucent Glass Stats Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 relative">
              
              {/* Stat Glass Card 1 */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl hover:bg-slate-900/75 hover:border-emerald-400/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0 group-hover:bg-[#00704a] group-hover:text-white transition-colors">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">50+ Initiatives</h3>
                  <p className="text-xs font-medium text-slate-300">Implemented nationwide across Sri Lanka</p>
                </div>
              </div>

              {/* Stat Glass Card 2 */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl hover:bg-slate-900/75 hover:border-emerald-400/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0 group-hover:bg-[#00704a] group-hover:text-white transition-colors">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">35+ Years Impact</h3>
                  <p className="text-xs font-medium text-slate-300">Active sustainable development since 1990</p>
                </div>
              </div>

              {/* Stat Glass Card 3 */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl hover:bg-slate-900/75 hover:border-emerald-400/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0 group-hover:bg-[#00704a] group-hover:text-white transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white group-hover:text-emerald-300 transition-colors">11 Districts</h3>
                  <p className="text-xs font-medium text-slate-300">Clean energy & community network</p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Organic Wave Cut */}
        <div className="w-full absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none z-20">
          <svg
            className="relative block w-full h-8 sm:h-12 text-[#f4f8f5]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,40 L1200,120 L0,120 Z"></path>
          </svg>
        </div>

      </section>

      {/* 2. PROJECTS STREAM SECTION WITH CATEGORY FILTER TABS & SEARCH BAR */}
      <section className="py-10 sm:py-16 bg-[#f4f8f5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
          
          {/* Main Headline & Search Bar Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Our Projects
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-medium">
                Discover IDEA's impactful initiatives in sustainable development, renewable energy, and environmental conservation across Sri Lanka.
              </p>
            </div>

            {/* Interactive Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or location..."
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

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-300 border shadow-2xs ${
                  activeCategory === cat
                    ? 'bg-[#00684a] text-white border-[#00684a] shadow-md scale-105'
                    : 'bg-white text-slate-700 border-slate-200/90 hover:bg-[#d7f5e8] hover:text-[#00684a] hover:border-[#a3e6c5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 2-COLUMN FULL-PHOTO SPOTLIGHT CARDS GRID SCROLLING DOWN */}
          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <Search className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">No Projects Found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No initiatives matched your filter parameters. Try clearing your search or selecting a different category tab.
              </p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="px-4 py-2 bg-[#00684a] text-white text-xs font-bold rounded-xl hover:bg-[#043927] transition"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[420px] flex flex-col justify-between p-7 sm:p-9 text-white shadow-xl border border-slate-200/90 group transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer"
                >
                  {/* Background Photo Cover */}
                  <img
                    src={project.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1400&q=80'}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Dark Contrast Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-black/30 pointer-events-none" />

                  {/* Top Overlay Row: Category & Status Badge */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-400/30">
                        SPOTLIGHT: {project.categories[0]}
                      </span>
                      {project.categories[1] && (
                        <span className="text-[10px] font-bold text-slate-200 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 hidden sm:inline-block">
                          {project.categories[1]}
                        </span>
                      )}
                    </div>

                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full shadow-sm border border-white/20 ${project.statusBg}`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Bottom Content Area */}
                  <div className="relative z-10 space-y-4 pt-12">
                    
                    <div className="space-y-2">
                      <p className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider">
                        {project.subtitle}
                      </p>

                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight uppercase group-hover:text-emerald-300 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed line-clamp-3 max-w-xl">
                        {project.overview || project.description}
                      </p>
                    </div>

                    {/* Metadata Badges (Location, Beneficiaries, Timeline) */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-semibold text-slate-200">
                      <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate max-w-[160px]">{project.location}</span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                        <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{project.beneficiaries}</span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                        <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{project.timeline}</span>
                      </div>
                    </div>

                    {/* Action Link: View Full Project Details > */}
                    <div className="pt-2">
                      <Link
                        to={`/projects/${project.id}`}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-white hover:text-emerald-300 underline underline-offset-4 transition-all cursor-pointer group-hover:translate-x-1"
                      >
                        <span>View Project Details Page</span>
                        <ChevronRight className="w-4 h-4 text-emerald-400" />
                      </Link>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

export default ProjectsPage;
