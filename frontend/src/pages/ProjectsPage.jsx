import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, ChevronRight, Award, MapPin, Users, Clock, Search, X, 
  Sparkles, Zap, Leaf, Globe, CheckCircle2, Calendar, Building, 
  ArrowUpDown, ChevronLeft, Filter, TrendingUp
} from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { completedProjectsData } from '../data/completedProjectsData';
import { 
  sanityClient, 
  PROJECTS_PAGE_QUERY, 
  ALL_PROJECTS_QUERY, 
  ALL_COMPLETED_PROJECTS_QUERY 
} from '../sanityClient';

// Helper to render icon for stat cards
function renderStatIcon(iconName) {
  switch (iconName?.toLowerCase()) {
    case 'clock':
      return <Clock className="w-6 h-6" />;
    case 'mappin':
    case 'map-pin':
    case 'location':
      return <MapPin className="w-6 h-6" />;
    case 'users':
    case 'people':
      return <Users className="w-6 h-6" />;
    case 'zap':
    case 'energy':
      return <Zap className="w-6 h-6" />;
    case 'leaf':
    case 'eco':
      return <Leaf className="w-6 h-6" />;
    case 'globe':
      return <Globe className="w-6 h-6" />;
    case 'award':
    default:
      return <Award className="w-6 h-6" />;
  }
}

export function ProjectsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top or target hash section on mount/navigation
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 150);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.hash]);

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Page Header Banner Data from Sanity
  const [pageData, setPageData] = useState(null);
  // Projects List Data from Sanity
  const [projectsList, setProjectsList] = useState(projectsData);
  const [completedList, setCompletedList] = useState(completedProjectsData);

  // Completed Projects Archive State
  const [archiveSearch, setArchiveSearch] = useState('');
  const [archiveDecade, setArchiveDecade] = useState('All');
  const [archiveAgency, setArchiveAgency] = useState('All');
  const [archiveSort, setArchiveSort] = useState('newest'); // 'newest' | 'oldest' | 'amount-high' | 'amount-low'
  const [archivePage, setArchivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  // Unique Funding Agencies for dropdown filter
  const allAgencies = useMemo(() => {
    const set = new Set(completedList.map((p) => p.fundingAgency));
    return ['All', ...Array.from(set).sort()];
  }, [completedList]);

  // Filtered & Sorted Completed Projects
  const filteredCompletedProjects = useMemo(() => {
    return completedList
      .filter((p) => {
        // Decade filter
        if (archiveDecade !== 'All') {
          const y = parseInt(p.year.slice(0, 4), 10);
          const decade = y >= 2020 ? '2020s' : y >= 2010 ? '2010s' : y >= 2000 ? '2000s' : '1990s';
          if (decade !== archiveDecade) return false;
        }

        // Agency filter
        if (archiveAgency !== 'All' && p.fundingAgency !== archiveAgency) {
          return false;
        }

        // Search text filter
        if (archiveSearch.trim()) {
          const q = archiveSearch.toLowerCase();
          const matchesName = (p.name || '').toLowerCase().includes(q);
          const matchesAgency = (p.fundingAgency || '').toLowerCase().includes(q);
          const matchesYear = (p.year || '').toLowerCase().includes(q);
          const matchesAmount = (p.amountFormatted || '').includes(q);
          if (!matchesName && !matchesAgency && !matchesYear && !matchesAmount) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (archiveSort === 'newest') return (b.order || b.id) - (a.order || a.id);
        if (archiveSort === 'oldest') return (a.order || a.id) - (b.order || b.id);
        if (archiveSort === 'amount-high') return (b.amountLkr || 0) - (a.amountLkr || 0);
        if (archiveSort === 'amount-low') return (a.amountLkr || 0) - (b.amountLkr || 0);
        return 0;
      });
  }, [completedList, archiveDecade, archiveAgency, archiveSearch, archiveSort]);

  // Reset pagination when filter changes
  useEffect(() => {
    setArchivePage(1);
  }, [archiveSearch, archiveDecade, archiveAgency, archiveSort]);

  // Paginated Projects Slice
  const totalArchivePages = Math.max(1, Math.ceil(filteredCompletedProjects.length / itemsPerPage));
  const paginatedArchive = useMemo(() => {
    if (itemsPerPage >= filteredCompletedProjects.length) return filteredCompletedProjects;
    const start = (archivePage - 1) * itemsPerPage;
    return filteredCompletedProjects.slice(start, start + itemsPerPage);
  }, [filteredCompletedProjects, archivePage, itemsPerPage]);

  // Total summary figures
  const totalArchiveCount = completedList.length;
  const totalFundsSum = useMemo(() => {
    return completedList.reduce((acc, p) => acc + (p.amountLkr || 0), 0);
  }, [completedList]);

  useEffect(() => {
    // 1. Fetch Projects Page Header Banner & Stat Cards
    sanityClient
      .fetch(PROJECTS_PAGE_QUERY)
      .then((data) => {
        if (data) {
          setPageData(data);
        }
      })
      .catch((err) => {
        console.error('Error fetching Projects page banner from Sanity:', err);
      });

    // 2. Fetch Projects List
    sanityClient
      .fetch(ALL_PROJECTS_QUERY)
      .then((data) => {
        if (data && data.length > 0) {
          setProjectsList(data);
        }
      })
      .catch((err) => {
        console.error('Error fetching Projects list from Sanity:', err);
      });

    // 3. Fetch Completed Projects Archive from Sanity
    sanityClient
      .fetch(ALL_COMPLETED_PROJECTS_QUERY)
      .then((data) => {
        if (data && data.length > 0) {
          const formattedFromSanity = data.map((item) => ({
            ...item,
            id: item.order || item.id,
            amountLkr: Number(item.amountLkr) || 0,
            amountFormatted: item.amountLkr 
              ? Number(item.amountLkr).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
              : '0.00',
            status: item.status || 'Completed'
          }));

          const existingIds = new Set(formattedFromSanity.map((p) => p.order || p.id));
          const remainingStatic = completedProjectsData.filter((p) => !existingIds.has(p.id));
          setCompletedList([...formattedFromSanity, ...remainingStatic]);
        }
      })
      .catch((err) => {
        console.warn('Using static completed projects fallback:', err);
      });
  }, []);

  // Default Fallbacks
  const heroBadge = pageData?.badge || '35+ Years Sustainable Impact • Est. 1990';
  const heroTitle = pageData?.headline || 'Our Projects';
  const heroSubtitle =
    pageData?.subheadline ||
    "Discover IDEA's impactful initiatives in sustainable development, renewable energy, bio-mass cooking, and environmental conservation across Sri Lanka and South Asia.";
  const heroBg =
    pageData?.backgroundImage ||
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2000&q=80';

  const defaultStats = [
    {
      icon: 'award',
      title: '50+ Initiatives',
      subtitle: 'Implemented nationwide across Sri Lanka',
    },
    {
      icon: 'clock',
      title: '35+ Years Impact',
      subtitle: 'Active sustainable development since 1990',
    },
    {
      icon: 'mapPin',
      title: '11 Districts',
      subtitle: 'Clean energy & community network',
    },
  ];

  const statsCards = pageData?.statsCards?.length > 0 ? pageData.statsCards : defaultStats;

  const sectionTitle = pageData?.sectionTitle || 'Our Projects';
  const sectionSubtitle =
    pageData?.sectionSubtitle ||
    "Discover IDEA's impactful initiatives in sustainable development, renewable energy, and environmental conservation across Sri Lanka.";

  // Extract all categories dynamically or fallback
  const allCategories = [
    'All',
    'Energy Efficiency',
    'Climate Action',
    'Community Development',
    'Environmental Conservation',
    'Sustainable Agriculture',
  ];

  // Filter projects based on category and search query
  const filteredProjects = projectsList.filter((project) => {
    const projCategories = project.categories || [];
    const matchesCategory = activeCategory === 'All' || projCategories.includes(activeCategory);
    
    const titleMatch = project.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const locationMatch = project.location?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const descMatch =
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.aboutThisProject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.overview?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      false;

    return matchesCategory && (titleMatch || locationMatch || descMatch);
  });

  return (
    <div className="w-full min-h-screen bg-[#f4f8f5] text-slate-800">
      {/* 1. CINEMATIC REAL PHOTO HERO BANNER WITH FLOATING GLASS STATS CARDS */}
      <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 bg-slate-900 overflow-hidden text-white">
        {/* Real High-Resolution Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="IDEA Sustainable Field Projects Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle dark gradient overlay to ensure text contrast while preserving image vibrancy */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-emerald-950/65 z-10" />
          <div className="absolute inset-0 bg-black/20 z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column (7 cols): Main Title, Breadcrumb & Subtitle */}
            <div className="lg:col-span-7 space-y-6">
              {/* Top Breadcrumb Nav */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <nav className="inline-flex items-center gap-2 text-xs font-bold text-slate-200 bg-white/10 backdrop-blur-md px-3.5 sm:px-4 py-1.5 rounded-full border border-white/20 shadow-sm">
                  <Link to="/" className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors">
                    <Home className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Home</span>
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  <span className="text-emerald-300 font-extrabold">Projects</span>
                </nav>

                <span className="hidden sm:inline-flex text-xs font-semibold text-slate-200 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm">
                  You are here: <span className="text-emerald-300 font-extrabold ml-1">• Our Projects</span>
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-xs font-extrabold rounded-full border border-emerald-400/40 shadow-sm max-w-full">
                <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate sm:whitespace-normal">{heroBadge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md break-words">
                {heroTitle}
              </h1>

              <p className="text-slate-200 text-base sm:text-xl font-medium leading-relaxed max-w-2xl drop-shadow-sm">
                {heroSubtitle}
              </p>

              <div className="pt-1">
                <a
                  href="#completed-projects"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all backdrop-blur-md group cursor-pointer"
                >
                  <span>View 55+ Completed Projects Archive (1991–2026)</span>
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Column (5 cols): Overlapping Translucent Glass Stats Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 relative">
              {statsCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl hover:bg-slate-900/75 hover:border-emerald-400/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0 group-hover:bg-[#00704a] group-hover:text-white transition-colors">
                    {renderStatIcon(card.icon)}
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

        {/* Bottom Organic Wave Cut */}
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

      {/* 2. PROJECTS STREAM SECTION WITH CATEGORY FILTER TABS & SEARCH BAR */}
      <section className="py-10 sm:py-16 bg-[#f4f8f5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
          {/* Main Headline & Search Bar Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {sectionTitle}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-medium">
                {sectionSubtitle}
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
            {allCategories.map((cat) => (
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

          {/* 2-COLUMN FULL-PHOTO SPOTLIGHT CARDS GRID */}
          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
              <Search className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">No Projects Found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No initiatives matched your filter parameters. Try clearing your search or selecting a different category tab.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-[#00684a] text-white text-xs font-bold rounded-xl hover:bg-[#043927] transition"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredProjects.map((project, idx) => {
                const projectKey = project.id || project.slug || idx;
                const projectTarget = project.slug || project.id || projectKey;
                const projectStatusBg =
                  project.status === 'Completed'
                    ? 'bg-[#1d63ed] text-white'
                    : 'bg-[#00a86b] text-white';

                const primaryCategory = project.categories?.[0] || 'Sustainable Development';
                const secondaryCategory = project.categories?.[1];

                return (
                  <div
                    key={projectKey}
                    onClick={() => navigate(`/projects/${projectTarget}`)}
                    className="relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[420px] flex flex-col justify-between p-7 sm:p-9 text-white shadow-xl border border-slate-200/90 group transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer"
                  >
                    {/* Background Photo Cover */}
                    <img
                      src={
                        project.image ||
                        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1400&q=80'
                      }
                      alt={project.title}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1400&q=80';
                      }}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Dark Contrast Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-black/30 pointer-events-none" />

                    {/* Top Overlay Row: Category & Status Badge */}
                    <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-widest text-emerald-400 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-400/30">
                          SPOTLIGHT: {primaryCategory}
                        </span>
                        {secondaryCategory && (
                          <span className="text-[10px] font-bold text-slate-200 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 hidden sm:inline-block">
                            {secondaryCategory}
                          </span>
                        )}
                      </div>

                      <span className={`text-xs font-extrabold px-3 py-1 rounded-full shadow-sm border border-white/20 ${projectStatusBg}`}>
                        {project.status || 'Ongoing'}
                      </span>
                    </div>

                    {/* Bottom Content Area */}
                    <div className="relative z-10 space-y-4 pt-12">
                      <div className="space-y-2">
                        {project.subtitle && (
                          <p className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider">
                            {project.subtitle}
                          </p>
                        )}

                        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight uppercase group-hover:text-emerald-300 transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed line-clamp-3 max-w-xl">
                          {project.aboutThisProject || project.overview || project.description}
                        </p>
                      </div>

                      {/* Metadata Badges (Location, Beneficiaries, Timeline) */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-semibold text-slate-200">
                        {project.location && (
                          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate max-w-[160px]">{project.location}</span>
                          </div>
                        )}

                        {project.beneficiaries && (
                          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                            <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{project.beneficiaries}</span>
                          </div>
                        )}

                        {(project.duration || project.timeline) && (
                          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                            <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{project.duration || project.timeline}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Link: View Full Project Details > */}
                      <div className="pt-2">
                        <Link
                          to={`/projects/${projectTarget}`}
                          className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-white hover:text-emerald-300 underline underline-offset-4 transition-all cursor-pointer group-hover:translate-x-1"
                        >
                          <span>View Project Details Page</span>
                          <ChevronRight className="w-4 h-4 text-emerald-400" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 3. HISTORICAL COMPLETED PROJECTS PORTFOLIO ARCHIVE (1991 - 2026) */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200" id="completed-projects">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#d7f5e8] text-[#00684a] text-xs font-extrabold rounded-full border border-[#a3e6c5]">
              <Sparkles className="w-3.5 h-3.5 text-[#00684a]" />
              <span>Institutional Track Record • 1991 – 2026</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Completed Projects
            </h2>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              A comprehensive 35-year archive of 55 development initiatives, clean energy innovations, artisan trainings, and climate-resilient programs implemented by IDEA in partnership with international and national development agencies.
            </p>
          </div>

          {/* 4 Summary Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-[#f8fbf9] p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Initiatives
              </span>
              <p className="text-2xl sm:text-3xl font-black text-[#00684a]">
                55 Projects
              </p>
              <p className="text-xs text-slate-500 font-medium">
                Documented &amp; executed
              </p>
            </div>

            <div className="bg-[#f8fbf9] p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Continuous Track Record
              </span>
              <p className="text-2xl sm:text-3xl font-black text-[#00684a]">
                35+ Years
              </p>
              <p className="text-xs text-slate-500 font-medium">
                Active presence (1991–2026)
              </p>
            </div>

            <div className="bg-[#f8fbf9] p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Development Funding
              </span>
              <p className="text-2xl sm:text-3xl font-black text-[#00684a]">
                179M+ LKR
              </p>
              <p className="text-xs text-slate-500 font-medium">
                Total capital deployed
              </p>
            </div>

            <div className="bg-[#f8fbf9] p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-2xs space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Partner Agencies
              </span>
              <p className="text-2xl sm:text-3xl font-black text-[#00684a]">
                24+ Donors
              </p>
              <p className="text-xs text-slate-500 font-medium">
                Multilateral &amp; global partners
              </p>
            </div>
          </div>

          {/* Interactive Filter Toolbar */}
          <div className="bg-[#f8fbf9] p-5 sm:p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
            {/* Top row: Search, Agency filter, Sort */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Search input (5 cols) */}
              <div className="md:col-span-5 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={archiveSearch}
                  onChange={(e) => setArchiveSearch(e.target.value)}
                  placeholder="Search project name, donor, or year..."
                  className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00684a] focus:ring-2 focus:ring-[#00684a]/20 transition shadow-2xs"
                />
                {archiveSearch && (
                  <button
                    onClick={() => setArchiveSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Agency dropdown (4 cols) */}
              <div className="md:col-span-4 relative">
                <select
                  value={archiveAgency}
                  onChange={(e) => setArchiveAgency(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#00684a] focus:ring-2 focus:ring-[#00684a]/20 transition shadow-2xs cursor-pointer truncate"
                >
                  <option value="All">All Funding Agencies ({allAgencies.length - 1} Donors)</option>
                  {allAgencies.filter(a => a !== 'All').map(agency => (
                    <option key={agency} value={agency}>
                      {agency}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort dropdown (3 cols) */}
              <div className="md:col-span-3 relative">
                <select
                  value={archiveSort}
                  onChange={(e) => setArchiveSort(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#00684a] focus:ring-2 focus:ring-[#00684a]/20 transition shadow-2xs cursor-pointer"
                >
                  <option value="newest">Sort: Newest First</option>
                  <option value="oldest">Sort: Oldest First</option>
                  <option value="amount-high">Budget: Highest First</option>
                  <option value="amount-low">Budget: Lowest First</option>
                </select>
              </div>
            </div>

            {/* Bottom row: Decade Filter Pills & Count */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/70">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-xs font-bold text-slate-500 mr-1 hidden sm:inline-block">Filter Decade:</span>
                {['All', '2020s', '2010s', '2000s', '1990s'].map((decade) => {
                  let count = 55;
                  if (decade === '2020s') count = 3;
                  if (decade === '2010s') count = 13;
                  if (decade === '2000s') count = 20;
                  if (decade === '1990s') count = 19;

                  const isActive = archiveDecade === decade;
                  return (
                    <button
                      key={decade}
                      onClick={() => setArchiveDecade(decade)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                        isActive
                          ? 'bg-[#00684a] text-white border-[#00684a] shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-[#d7f5e8] hover:text-[#00684a]'
                      }`}
                    >
                      {decade === 'All' ? `All (${count})` : `${decade} (${count})`}
                    </button>
                  );
                })}
              </div>

              {/* Showing stats counter */}
              <div className="text-xs font-semibold text-slate-500">
                Found <span className="font-extrabold text-slate-900">{filteredCompletedProjects.length}</span> matching projects
              </div>
            </div>
          </div>

          {/* TABLE VIEW (Desktop & Tablets) */}
          <div className="hidden md:block bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-[11px] font-extrabold uppercase tracking-wider">
                    <th className="py-4 px-4 w-12 text-center">#</th>
                    <th className="py-4 px-4 w-28">Year</th>
                    <th className="py-4 px-6">Name of the Project</th>
                    <th className="py-4 px-6 w-56">Funding Agency / Partner</th>
                    <th className="py-4 px-6 w-44 text-right">Total Amount (LKR)</th>
                    <th className="py-4 px-5 w-32 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {paginatedArchive.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-slate-400 font-medium">
                        No projects found matching your search or filters.
                      </td>
                    </tr>
                  ) : (
                    paginatedArchive.map((item) => (
                      <tr 
                        key={item.id} 
                        className="hover:bg-emerald-50/40 transition-colors group"
                      >
                        {/* Number */}
                        <td className="py-3.5 px-4 text-center font-bold text-slate-400 group-hover:text-slate-600 text-xs">
                          {item.id}
                        </td>

                        {/* Year */}
                        <td className="py-3.5 px-4 font-extrabold text-slate-700 whitespace-nowrap">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                            {item.year}
                          </span>
                        </td>

                        {/* Project Name */}
                        <td className="py-3.5 px-6 font-bold text-slate-900 group-hover:text-[#00684a] transition-colors leading-snug">
                          {item.name}
                        </td>

                        {/* Funding Agency */}
                        <td className="py-3.5 px-6">
                          <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/90 max-w-full truncate" title={item.fundingAgency}>
                            {item.fundingAgency}
                          </span>
                        </td>

                        {/* Total Amount LKR */}
                        <td className="py-3.5 px-6 text-right font-mono font-bold text-slate-800 whitespace-nowrap">
                          {item.amountFormatted}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-5 text-center whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#d7f5e8] text-[#00684a] border border-[#a3e6c5]">
                            <CheckCircle2 className="w-3 h-3 text-[#00684a]" />
                            <span>{item.status}</span>
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* CARD VIEW (Mobile Screens) */}
          <div className="md:hidden space-y-3">
            {paginatedArchive.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center text-slate-400 font-medium border border-slate-200">
                No projects found matching your search or filters.
              </div>
            ) : (
              paginatedArchive.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-extrabold border border-slate-200">
                      {item.year}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#d7f5e8] text-[#00684a] border border-[#a3e6c5]">
                      <CheckCircle2 className="w-3 h-3 text-[#00684a]" />
                      <span>{item.status}</span>
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-sm leading-snug">
                    {item.name}
                  </h3>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                    <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/90 truncate max-w-[180px]">
                      {item.fundingAgency}
                    </span>
                    <span className="font-mono font-bold text-slate-900 text-xs">
                      LKR {item.amountFormatted}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {filteredCompletedProjects.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <div className="text-xs font-medium text-slate-500">
                Showing{' '}
                <span className="font-bold text-slate-800">
                  {itemsPerPage >= filteredCompletedProjects.length
                    ? `1 to ${filteredCompletedProjects.length}`
                    : `${(archivePage - 1) * itemsPerPage + 1} to ${Math.min(
                        archivePage * itemsPerPage,
                        filteredCompletedProjects.length
                      )}`}
                </span>{' '}
                of <span className="font-bold text-slate-800">{filteredCompletedProjects.length}</span> projects
              </div>

              <div className="flex items-center gap-2">
                {/* View All toggle */}
                <button
                  onClick={() => {
                    if (itemsPerPage >= filteredCompletedProjects.length) {
                      setItemsPerPage(15);
                      setArchivePage(1);
                    } else {
                      setItemsPerPage(filteredCompletedProjects.length);
                      setArchivePage(1);
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  {itemsPerPage >= filteredCompletedProjects.length ? 'Show 15 Per Page' : 'View All 55 Projects'}
                </button>

                {itemsPerPage < filteredCompletedProjects.length && totalArchivePages > 1 && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setArchivePage((prev) => Math.max(1, prev - 1))}
                      disabled={archivePage === 1}
                      className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                      aria-label="Previous Page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <span className="px-3 py-1 text-xs font-bold text-slate-700">
                      Page {archivePage} of {totalArchivePages}
                    </span>

                    <button
                      onClick={() => setArchivePage((prev) => Math.min(totalArchivePages, prev + 1))}
                      disabled={archivePage === totalArchivePages}
                      className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                      aria-label="Next Page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Partnership & Audited Accounts CTA Box */}
          <div className="bg-[#f4f8f5] p-6 sm:p-8 rounded-3xl border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="space-y-1">
              <h4 className="text-base sm:text-lg font-black text-slate-900">
                Interested in Reviewing Audited Project Reports or Partnering on New Grants?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                IDEA maintains audited financial statements and project performance documentation for all completed donor partnerships since 1991.
              </p>
            </div>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-xl bg-[#00684a] hover:bg-[#043927] text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>Contact Secretariat</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}

export default ProjectsPage;
