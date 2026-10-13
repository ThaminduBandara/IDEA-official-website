import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, ChevronRight, Zap, Flame, Sun, Droplets, Factory, Award, 
  ArrowRight, CheckCircle2, Sparkles, Cpu, Layers, Leaf, Users
} from 'lucide-react';
import { technologiesData } from '../data/technologiesData';
import { sanityClient, TECHNOLOGIES_PAGE_QUERY, ALL_TECHNOLOGIES_QUERY } from '../sanityClient';

// Helper to render icon for stat cards
function renderStatIcon(iconName) {
  switch (iconName?.toLowerCase()) {
    case 'flame':
      return <Flame className="w-6 h-6" />;
    case 'factory':
      return <Factory className="w-6 h-6" />;
    case 'layers':
      return <Layers className="w-6 h-6" />;
    case 'sun':
      return <Sun className="w-6 h-6" />;
    case 'droplets':
      return <Droplets className="w-6 h-6" />;
    case 'cpu':
      return <Cpu className="w-6 h-6" />;
    case 'leaf':
    case 'eco':
      return <Leaf className="w-6 h-6" />;
    case 'users':
    case 'people':
      return <Users className="w-6 h-6" />;
    case 'zap':
    case 'energy':
      return <Zap className="w-6 h-6" />;
    case 'award':
    default:
      return <Award className="w-6 h-6" />;
  }
}

// Helper to render icon for technology cards
function renderTechIcon(iconName) {
  switch (iconName?.toLowerCase()) {
    case 'factory':
      return <Factory className="w-4 h-4" />;
    case 'layers':
      return <Layers className="w-4 h-4" />;
    case 'sun':
      return <Sun className="w-4 h-4" />;
    case 'cpu':
      return <Cpu className="w-4 h-4" />;
    case 'droplets':
      return <Droplets className="w-4 h-4" />;
    case 'zap':
      return <Zap className="w-4 h-4" />;
    case 'flame':
    default:
      return <Flame className="w-4 h-4" />;
  }
}

const defaultStatsCards = [
  {
    icon: 'flame',
    title: '1M+ Stoves',
    subtitle: 'Anagi clean biomass cookstoves deployed',
  },
  {
    icon: 'factory',
    title: '50+ Gasifiers',
    subtitle: 'Agro-processing industrial units active',
  },
  {
    icon: 'award',
    title: '35+ Years',
    subtitle: 'Technology research & village adaptation',
  },
];

export function TechnologiesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [pageData, setPageData] = useState(null);
  const [technologiesList, setTechnologiesList] = useState(technologiesData);

  useEffect(() => {
    window.scrollTo(0, 0);

    // 1. Fetch Technologies Page Banner & Stats & CTA
    sanityClient
      .fetch(TECHNOLOGIES_PAGE_QUERY)
      .then((data) => {
        if (data) {
          setPageData(data);
        }
      })
      .catch((err) => {
        console.error('Error fetching Technologies page data from Sanity:', err);
      });

    // 2. Fetch Technologies List
    sanityClient
      .fetch(ALL_TECHNOLOGIES_QUERY)
      .then((data) => {
        if (data && data.length > 0) {
          setTechnologiesList(data);
        }
      })
      .catch((err) => {
        console.error('Error fetching Technologies list from Sanity:', err);
      });
  }, []);

  // Compute category filters dynamically
  const categories = [
    'All',
    ...Array.from(new Set(technologiesList.map((tech) => tech.category).filter(Boolean))),
  ];

  const filteredTechnologies = technologiesList.filter(
    (tech) => activeCategory === 'All' || tech.category === activeCategory
  );

  // Fallbacks
  const heroBadge = pageData?.badge || '35+ Years of Renewable Energy Innovation • Est. 1990';
  const heroHeadline = pageData?.headline || 'Renewable Energy Technologies';
  const heroSubheadline =
    pageData?.subheadline ||
    "Discover IDEA's field-proven technological innovations in biomass energy, clean household cooking, solar thermal systems, and decentralized rural power.";
  const heroBgImage =
    pageData?.backgroundImage ||
    'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2000&q=80';
  const statsCards =
    pageData?.statsCards && pageData.statsCards.length > 0
      ? pageData.statsCards
      : defaultStatsCards;

  const sectionTitle = pageData?.sectionTitle || 'Our Technology Portfolio';
  const sectionSubtitle =
    pageData?.sectionSubtitle ||
    'Engineered for maximum thermal efficiency, low cost, local materials, and rural community empowerment.';

  const ctaTitle = pageData?.ctaTitle || 'Need Renewable Energy Technical Advice or Demonstrations?';
  const ctaText =
    pageData?.ctaText ||
    'Our engineering team at Kundasale Head Office provides technology adaptation, design consultancy, and field demonstrations for community organizations, small enterprises, and government projects.';
  const ctaButtonText = pageData?.ctaButtonText || 'Contact Engineering Team';
  const ctaButtonLink = pageData?.ctaButtonLink || '/contact';
  const ctaSecondaryButtonText = pageData?.ctaSecondaryButtonText || 'Browse Technical Manuals';
  const ctaSecondaryButtonLink = pageData?.ctaSecondaryButtonLink || '/downloads';

  return (
    <div className="w-full min-h-screen bg-[#f4f8f5] text-slate-800">
      {/* 1. HERO HEADER SECTION */}
      <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 bg-slate-900 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBgImage}
            alt="Renewable Energy Technologies Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-emerald-950/65 z-10" />
          <div className="absolute inset-0 bg-black/20 z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Breadcrumbs */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <nav className="inline-flex items-center gap-2 text-xs font-bold text-slate-200 bg-white/10 backdrop-blur-md px-3.5 sm:px-4 py-1.5 rounded-full border border-white/20 shadow-sm">
                  <Link to="/" className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors">
                    <Home className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Home</span>
                  </Link>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                  <span className="text-emerald-300 font-extrabold">Technologies</span>
                </nav>
                <span className="hidden sm:inline-flex text-xs font-semibold text-slate-200 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm">
                  You are here: <span className="text-emerald-300 font-extrabold ml-1">• RE Technologies</span>
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-xs font-extrabold rounded-full border border-emerald-400/40 shadow-sm max-w-full">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate sm:whitespace-normal">{heroBadge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md break-words">
                {heroHeadline}
              </h1>

              <p className="text-slate-200 text-base sm:text-xl font-medium leading-relaxed max-w-2xl drop-shadow-sm">
                {heroSubheadline}
              </p>
            </div>

            {/* Right Column (5 cols): Floating Glass Stat Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 relative">
              {statsCards.map((stat, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-900/60 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl flex items-center gap-4 hover:border-emerald-400/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0">
                    {renderStatIcon(stat.icon)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">{stat.title}</h3>
                    <p className="text-xs font-medium text-slate-300">{stat.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Wave Cut */}
        <div className="w-full absolute -bottom-px left-0 right-0 overflow-hidden leading-none pointer-events-none z-20">
          <svg className="relative block w-full h-12 sm:h-16 lg:h-20 text-[#f4f8f5]" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
            <path d="M0,0 C400,110 800,0 1200,70 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. MAIN TECHNOLOGIES CATALOG */}
      <section className="py-12 sm:py-20 bg-[#f4f8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          {/* Header Row & Filters */}
          <div className="space-y-6">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {sectionTitle}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-medium">
                {sectionSubtitle}
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 border cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#00684a] text-white border-[#00684a] shadow-md scale-102'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-[#d7f5e8] hover:text-[#00684a]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredTechnologies.map((tech) => (
              <div
                key={tech.id || tech.slug || tech.title}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image & Header Overlay */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={tech.image}
                    alt={tech.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-emerald-300 text-xs font-bold border border-emerald-500/40 shadow-md">
                      {tech.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600/90 text-white flex items-center justify-center shrink-0">
                        {renderTechIcon(tech.icon)}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {tech.title}
                      </h3>
                    </div>
                    {tech.tagline && (
                      <p className="text-xs sm:text-sm text-emerald-200 font-semibold pl-10">
                        {tech.tagline}
                      </p>
                    )}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-5">
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {tech.description}
                    </p>

                    {/* Feature Bullet Points */}
                    {tech.features && tech.features.length > 0 && (
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Key Technical Highlights:
                        </h4>
                        <ul className="space-y-2 text-xs text-slate-700">
                          {tech.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#00684a] shrink-0 mt-0.5" />
                              <span className="leading-snug">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Footer Metrics & CTA */}
                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 block uppercase">
                        Impact &amp; Efficiency
                      </span>
                      <span className="text-xs font-extrabold text-[#00684a] block">
                        {tech.efficiency}
                      </span>
                    </div>

                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#00684a] hover:bg-[#043927] text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-98"
                    >
                      <span>Technical Inquiry</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TECHNOLOGY ADVISORY & CTA BANNER */}
      <section className="py-14 sm:py-20 bg-emerald-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-6 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-emerald-800/80 text-emerald-300 mx-auto flex items-center justify-center border border-emerald-600/60 shadow-lg">
            <Zap className="w-7 h-7" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {ctaTitle}
          </h2>

          <p className="text-emerald-100/90 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">
            {ctaText}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to={ctaButtonLink}
              className="bg-white text-[#00684a] hover:bg-emerald-50 text-xs sm:text-sm font-bold px-6 py-3 rounded-xl shadow-lg transition-all"
            >
              {ctaButtonText}
            </Link>
            <Link
              to={ctaSecondaryButtonLink}
              className="bg-emerald-900/80 hover:bg-emerald-850 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl border border-emerald-700/80 transition-all"
            >
              {ctaSecondaryButtonText}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TechnologiesPage;
