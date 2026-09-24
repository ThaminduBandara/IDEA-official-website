import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowRight, ArrowUpRight, Sparkles, Briefcase, ChevronLeft, ChevronRight, Pause, Play, Award, Megaphone, ShieldAlert, ArrowRightCircle } from 'lucide-react';

export function LatestNewsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-changing Banner Items with Prominent Images & News Details
  const bannerItems = [
    {
      id: 1,
      category: 'URGENT JOB OPPORTUNITY',
      badgeColor: 'bg-amber-400 text-slate-950 font-black',
      icon: Briefcase,
      dateOrDeadline: 'Apply Before: Oct 15, 2026',
      title: 'Job Vacancies: Experienced Welder & Metal Fabricator',
      description: 'Full-time position at IDEA Kundasale Workshop, Kandy. Fabricating "Anagi" biomass energy stoves, solar racks, and eco-village rainwater harvesting tanks.',
      location: 'Kundasale Workshop, Kandy',
      type: 'Full-Time Position',
      link: '/news/job-vacancies-welder-fabricator',
      ctaText: 'Apply / Read Details',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'IDEA Metal Fabrication Workshop'
    },
    {
      id: 2,
      category: 'EVENTS & WORKSHOPS',
      badgeColor: 'bg-emerald-500 text-white font-black',
      icon: Sparkles,
      dateOrDeadline: 'Held: Jul 7, 2026',
      title: 'Final Progress Review Meeting Held for CREVD Project',
      description: 'Close-out evaluation meeting with local village committees reviewing eco-village rainwater harvesting systems, solar energy installations, and organic farming kits across Badulla & Kandy districts.',
      location: 'IDEA Head Office, Kundasale, Kandy',
      type: 'Project Review Event',
      link: '/news/crevd-final-progress-review',
      ctaText: 'Read Event Coverage',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Eco-Village Community Meeting'
    },
    {
      id: 3,
      category: 'CLIMATE DISASTER ACTION',
      badgeColor: 'bg-sky-500 text-white font-black',
      icon: ShieldAlert,
      dateOrDeadline: 'Launched: Jul 7, 2026',
      title: 'Community-Validated Flood Risk Maps Launched for Kithalagama',
      description: 'Participatory disaster risk reduction maps created and validated directly by local Sri Lankan villagers to protect vulnerable riverine communities against flash floods during monsoon season.',
      location: 'Kithalagama Village, Sabaragamuwa',
      type: 'Disaster Risk Mapping',
      link: '/news/kithalagama-flood-risk-maps',
      ctaText: 'View Disaster Maps',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Sri Lankan Village Flood Action'
    },
    {
      id: 4,
      category: 'NATIONAL EXPO & DEMO',
      badgeColor: 'bg-purple-600 text-white font-black',
      icon: Megaphone,
      dateOrDeadline: 'Upcoming: Nov 12-14, 2026',
      title: 'National Biomass & Clean Cooking Technology Expo 2026',
      description: 'Join IDEA Sri Lanka at BMICH Colombo for live demonstrations of fuelwood-saving gasifier stoves, biochar kilns, micro-hydro systems, and sustainable agro-processing machinery.',
      location: 'BMICH Exhibition Center, Colombo',
      type: 'Public Exhibition | Free Entry',
      link: '/news/biomass-clean-cooking-expo-2026',
      ctaText: 'Register for Free Access',
      image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=80',
      imageAlt: 'Renewable Energy Exhibition'
    }
  ];

  // Auto-slide interval (5 seconds)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerItems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, bannerItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerItems.length) % bannerItems.length);
  };

  return (
    <section className="relative w-full py-16 sm:py-20 bg-[#f4f8f5] text-slate-800 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 pb-8 sm:pb-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Latest News & Announcements
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            Stay updated with our active vacancies, community workshops, disaster action projects, and renewable energy expos.
          </p>
        </div>

        {/* SINGLE FULL-WIDTH HORIZONTAL SLIDING BANNER CARD */}
        <div 
          className="relative w-full rounded-3xl bg-white border border-slate-200/90 shadow-2xl overflow-hidden select-none group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Top Animated Progress Bar */}
          <div className="w-full bg-slate-100 h-1.5 overflow-hidden z-30 relative">
            <div 
              key={currentSlide + (isPaused ? '-paused' : '-active')}
              className={`h-full bg-emerald-600 ${isPaused ? 'w-full' : 'animate-[progress_5s_linear]'}`}
              style={{
                animationDuration: '5000ms',
                animationPlayState: isPaused ? 'paused' : 'running'
              }}
            />
          </div>

          {/* HORIZONTAL SLIDER TRACK */}
          <div 
            className="flex transition-transform duration-700 ease-in-out w-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {bannerItems.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <div 
                  key={item.id}
                  className="w-full shrink-0 flex-none grid grid-cols-1 lg:grid-cols-12 items-stretch"
                >
                  
                  {/* PROMINENT IMAGE CONTAINER (5 Columns) */}
                  <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] overflow-hidden bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />
                    
                    {/* Category Tag Overlay on Image */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`${item.badgeColor} text-[11px] px-3.5 py-1.5 rounded-xl uppercase tracking-wider shadow-lg flex items-center gap-1.5`}>
                        <ItemIcon className="w-3.5 h-3.5" />
                        <span>{item.category}</span>
                      </span>
                    </div>

                    {/* Image Counter Badge */}
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="text-white text-xs font-mono font-bold bg-slate-950/80 px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
                        0{index + 1} / 0{bannerItems.length}
                      </span>
                    </div>
                  </div>

                  {/* SYNCED NEWS & EVENT DETAILS (7 Columns) */}
                  <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-white">
                    
                    {/* Top Row: Date & Opportunity Type Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                          {item.dateOrDeadline}
                        </span>
                      </div>

                      <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                        {item.type}
                      </span>
                    </div>

                    {/* Title & Description Summary */}
                    <div className="space-y-3">
                      <h3 className="text-2xl sm:text-3xl lg:text-3xl font-extrabold text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>

                    {/* Location & CTA Button */}
                    <div className="pt-4 border-t border-slate-100 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700">
                          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{item.location}</span>
                        </div>

                        <Link
                          to={item.link}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                        >
                          <span>{item.ctaText}</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>

                      {/* Bottom Navigation Controls & Pagination Dots */}
                      <div className="flex items-center justify-between pt-2">
                        {/* Pagination Dots */}
                        <div className="flex items-center gap-2">
                          {bannerItems.map((dotItem, dotIndex) => (
                            <button
                              key={dotItem.id}
                              onClick={() => setCurrentSlide(dotIndex)}
                              className={`h-2.5 rounded-full transition-all duration-300 ${
                                dotIndex === currentSlide 
                                  ? 'w-8 bg-emerald-600' 
                                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                              }`}
                              aria-label={`Go to slide ${dotIndex + 1}`}
                            />
                          ))}
                        </div>

                        {/* Navigation Arrows & Pause */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={prevSlide}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition border border-slate-200 hover:scale-105"
                            aria-label="Previous banner"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => setIsPaused(!isPaused)}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition border border-slate-200 hover:scale-105"
                            title={isPaused ? "Play Auto-Slide" : "Pause Auto-Slide"}
                            aria-label="Toggle pause"
                          >
                            {isPaused ? <Play className="w-4 h-4 text-amber-600" /> : <Pause className="w-4 h-4 text-emerald-700" />}
                          </button>

                          <button
                            onClick={nextSlide}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition border border-slate-200 hover:scale-105"
                            aria-label="Next banner"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* BOTTOM LINK */}
        <div className="mt-8 text-center">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-slate-700 hover:text-emerald-800 font-extrabold text-sm sm:text-base px-6 py-3 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all duration-200 group"
          >
            <span>Explore All News, Events & Announcements</span>
            <ArrowRightCircle className="w-5 h-5 text-emerald-600 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}

export default LatestNewsSection;




