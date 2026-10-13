import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, ChevronRight, GraduationCap, Users, BookOpen, Award, 
  ArrowRight, CheckCircle2, Sparkles, Calendar, MapPin, Heart, Clock
} from 'lucide-react';
import { trainingProgramsData, traineeStoriesData } from '../data/trainingData';
import { 
  sanityClient, 
  TRAINING_PAGE_QUERY, 
  ALL_TRAINING_PROGRAMS_QUERY, 
  ALL_TRAINEE_STORIES_QUERY 
} from '../sanityClient';

// Helper to render icon for stat cards
function renderStatIcon(iconName) {
  switch (iconName?.toLowerCase()) {
    case 'users':
    case 'people':
      return <Users className="w-6 h-6" />;
    case 'bookopen':
    case 'book-open':
    case 'education':
      return <BookOpen className="w-6 h-6" />;
    case 'graduationcap':
    case 'graduation-cap':
      return <GraduationCap className="w-6 h-6" />;
    case 'clock':
    case 'time':
      return <Clock className="w-6 h-6" />;
    case 'mappin':
    case 'map-pin':
    case 'location':
      return <MapPin className="w-6 h-6" />;
    case 'heart':
      return <Heart className="w-6 h-6" />;
    case 'award':
    default:
      return <Award className="w-6 h-6" />;
  }
}

const defaultStatsCards = [
  {
    icon: 'users',
    title: '1,500+',
    subtitle: 'Total trained artisans & leaders',
  },
  {
    icon: 'bookOpen',
    title: '25+ Annual',
    subtitle: 'Workshops & field training sessions',
  },
  {
    icon: 'award',
    title: '15+ Universities',
    subtitle: 'National academic collaboration partners',
  },
];

export function TrainingPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [pageData, setPageData] = useState(null);
  const [programsList, setProgramsList] = useState(trainingProgramsData);
  const [storiesList, setStoriesList] = useState(traineeStoriesData);

  useEffect(() => {
    window.scrollTo(0, 0);

    // 1. Fetch Training Page Banner & Stats & CTA
    sanityClient
      .fetch(TRAINING_PAGE_QUERY)
      .then((data) => {
        if (data) {
          setPageData(data);
        }
      })
      .catch((err) => {
        console.error('Error fetching Training page data from Sanity:', err);
      });

    // 2. Fetch Training Programs
    sanityClient
      .fetch(ALL_TRAINING_PROGRAMS_QUERY)
      .then((data) => {
        if (data && data.length > 0) {
          setProgramsList(data);
        }
      })
      .catch((err) => {
        console.error('Error fetching Training programs from Sanity:', err);
      });

    // 3. Fetch Trainee Stories
    sanityClient
      .fetch(ALL_TRAINEE_STORIES_QUERY)
      .then((data) => {
        if (data && data.length > 0) {
          setStoriesList(data);
        }
      })
      .catch((err) => {
        console.error('Error fetching Trainee stories from Sanity:', err);
      });
  }, []);

  // Compute category filters dynamically
  const categories = [
    'All',
    ...Array.from(new Set(programsList.map((prog) => prog.category).filter(Boolean))),
  ];

  const filteredPrograms = programsList.filter(
    (prog) => activeCategory === 'All' || prog.category === activeCategory
  );

  // Fallbacks
  const heroBadge = pageData?.badge || 'Capacity Building & Community Empowerment';
  const heroHeadline = pageData?.headline || 'Training & Trainees';
  const heroSubheadline =
    pageData?.subheadline ||
    'Developing grassroots skills, certifying local artisans, and nurturing the next generation of environmental researchers across Sri Lanka.';
  const heroBgImage =
    pageData?.backgroundImage ||
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2000&q=80';
  const statsCards =
    pageData?.statsCards && pageData.statsCards.length > 0
      ? pageData.statsCards
      : defaultStatsCards;

  const sectionTitle = pageData?.sectionTitle || 'Our Core Training Programs';
  const sectionSubtitle =
    pageData?.sectionSubtitle ||
    'Combining traditional community knowledge with modern sustainable engineering to build self-reliant livelihoods.';

  const storiesBadge = pageData?.storiesBadge || 'Voices from the Field';
  const storiesTitle = pageData?.storiesTitle || 'Trainee Stories & Impact';
  const storiesSubtitle =
    pageData?.storiesSubtitle ||
    'Hear from artisans, university scholars, and village leaders who took part in IDEA training programs.';

  const ctaTitle = pageData?.ctaTitle || 'Interested in Joining an Upcoming Training Cohort or Internship?';
  const ctaText =
    pageData?.ctaText ||
    'We regularly welcome university students, research fellows, community groups, and artisan cooperatives. Reach out to our training coordinator at Kundasale Head Office.';
  const ctaButtonText = pageData?.ctaButtonText || 'Contact Training Coordinator';
  const ctaButtonLink = pageData?.ctaButtonLink || '/contact';
  const ctaSecondaryButtonText = pageData?.ctaSecondaryButtonText || 'Download Course Material & Guides';
  const ctaSecondaryButtonLink = pageData?.ctaSecondaryButtonLink || '/downloads';

  return (
    <div className="w-full min-h-screen bg-[#f4f8f5] text-slate-800">
      {/* 1. HERO HEADER SECTION */}
      <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 bg-slate-900 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBgImage}
            alt="Training & Capacity Building Background"
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
                  <span className="text-emerald-300 font-extrabold">Training</span>
                </nav>
                <span className="hidden sm:inline-flex text-xs font-semibold text-slate-200 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm">
                  You are here: <span className="text-emerald-300 font-extrabold ml-1">• Training &amp; Trainees</span>
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-xs font-extrabold rounded-full border border-emerald-400/40 shadow-sm max-w-full">
                <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate sm:whitespace-normal">{heroBadge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md break-words">
                {heroHeadline}
              </h1>

              <p className="text-slate-200 text-base sm:text-xl font-medium leading-relaxed max-w-2xl drop-shadow-sm">
                {heroSubheadline}
              </p>
            </div>

            {/* Right Column (5 cols): Floating Glass Stat Badges */}
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

      {/* 2. TRAINING PROGRAMS SHOWCASE */}
      <section className="py-12 sm:py-20 bg-[#f4f8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="space-y-6">
            <div className="space-y-2 max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {sectionTitle}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base font-medium">
                {sectionSubtitle}
              </p>
            </div>

            {/* Filter Pills */}
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

          {/* Programs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPrograms.map((prog) => (
              <div
                key={prog.id || prog.slug || prog.title}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-60 sm:h-64 overflow-hidden">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-emerald-300 text-xs font-bold border border-emerald-500/40 shadow-md">
                      {prog.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {prog.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-200 font-semibold">
                      {prog.audience && (
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          <span>{prog.audience}</span>
                        </span>
                      )}
                      {prog.audience && prog.duration && <span>•</span>}
                      {prog.duration && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{prog.duration}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {prog.description}
                    </p>

                    {prog.outcomes && prog.outcomes.length > 0 && (
                      <div className="space-y-2.5">
                        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Program Learning Outcomes:
                        </h4>
                        <ul className="space-y-2 text-xs text-slate-700">
                          {prog.outcomes.map((item, oIdx) => (
                            <li key={oIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#00684a] shrink-0 mt-0.5" />
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-400 block uppercase">
                        Historical Reach
                      </span>
                      <span className="text-xs font-extrabold text-[#00684a] block">
                        {prog.impactStat}
                      </span>
                    </div>

                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#00684a] hover:bg-[#043927] text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-98"
                    >
                      <span>Inquire / Apply</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRAINEE SPOTLIGHT & TESTIMONIALS */}
      {storiesList && storiesList.length > 0 && (
        <section className="py-14 sm:py-20 bg-white border-y border-emerald-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-100 text-[#00684a] text-xs font-extrabold rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{storiesBadge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {storiesTitle}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm">
                {storiesSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {storiesList.map((story, sIdx) => (
                <div
                  key={story.id || sIdx}
                  className="bg-[#f6f9f6] p-6 sm:p-7 rounded-3xl border border-emerald-200/80 space-y-4 flex flex-col justify-between shadow-xs hover:border-emerald-400/80 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                      “
                    </div>
                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                      "{story.story}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-emerald-200/60 space-y-0.5">
                    <h4 className="text-sm font-extrabold text-slate-900">{story.name}</h4>
                    {story.role && (
                      <p className="text-xs font-semibold text-[#00684a]">{story.role}</p>
                    )}
                    {story.district && (
                      <p className="text-[11px] font-medium text-slate-500">{story.district}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. APPLY OR ENROLL CTA */}
      <section className="py-14 sm:py-20 bg-emerald-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center space-y-6 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-emerald-800/80 text-emerald-300 mx-auto flex items-center justify-center border border-emerald-600/60 shadow-lg">
            <GraduationCap className="w-7 h-7" />
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

export default TrainingPage;
