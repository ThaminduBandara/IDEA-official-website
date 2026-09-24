import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award, ShieldCheck, HeartHandshake, Trees, Flame, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

export function HeroSection() {
  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1920&q=80',
      caption: 'Sri Lanka Rural Countryside & Eco-Village Communities'
    },
    {
      url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1920&q=80',
      caption: 'Sri Lankan Village Farmers & Sustainable Agriculture'
    },
    {
      url: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1920&q=80',
      caption: 'Sri Lankan Rural Paddy Fields & Energy Efficiency'
    },
    {
      url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1920&q=80',
      caption: 'Community Forestry & Biomass Conservation Workshop'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlideIndex, setPrevSlideIndex] = useState(0);
  const [direction, setDirection] = useState('next'); // 'next' or 'prev'

  // Auto-play slideshow timer
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection('next');
      setPrevSlideIndex(currentSlide);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

  const handleNext = () => {
    setDirection('next');
    setPrevSlideIndex(currentSlide);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection('prev');
    setPrevSlideIndex(currentSlide);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleDotClick = (idx) => {
    if (idx === currentSlide) return;
    setDirection(idx > currentSlide ? 'next' : 'prev');
    setPrevSlideIndex(currentSlide);
    setCurrentSlide(idx);
  };

  return (
    <section className="relative w-full bg-slate-950 text-white overflow-hidden h-screen sm:h-[100dvh] flex flex-col justify-between">
      {/* 2. Main Hero Container with Entering/Leaving Slide Animations */}
      <div className="relative w-full px-6 sm:px-12 lg:px-16 pt-24 sm:pt-28 pb-4 overflow-hidden flex-grow flex items-center">
        
        {/* ANIMATED ENTERING & LEAVING BACKGROUND LAYER */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {slides.map((slide, index) => {
            const isCurrent = index === currentSlide;
            const isLeaving = index === prevSlideIndex && prevSlideIndex !== currentSlide;

            // Compute directional CSS animation classes for entering and leaving
            let animationClass = 'opacity-0 pointer-events-none scale-100';

            if (isCurrent) {
              // Active entering slide: slides in with smooth scale normalization
              animationClass = direction === 'next'
                ? 'opacity-100 scale-105 translate-x-0 transition-all duration-1000 ease-out z-10'
                : 'opacity-100 scale-105 translate-x-0 transition-all duration-1000 ease-out z-10';
            } else if (isLeaving) {
              // Leaving slide: slides out with subtle zoom-out effect
              animationClass = direction === 'next'
                ? 'opacity-0 scale-110 -translate-x-12 transition-all duration-1000 ease-in z-0'
                : 'opacity-0 scale-95 translate-x-12 transition-all duration-1000 ease-in z-0';
            }

            return (
              <div
                key={slide.url}
                className={`absolute inset-0 transform ${animationClass}`}
              >
                <img
                  src={slide.url}
                  alt={slide.caption}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            );
          })}

          {/* Clean Gradient Overlay: Light at top for header transparency, deeper at bottom for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/50 to-slate-950/80 z-10"></div>
          
          {/* Ambient Grid Pattern Overlay with Subtle Opacity */}
          <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:32px_32px] opacity-20 z-10"></div>
        </div>

        {/* Hero Foreground Content */}
        <div className="relative z-20 max-w-5xl mx-auto space-y-5 sm:space-y-6 text-left w-full">
          
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-950/80 text-emerald-300 text-xs font-extrabold rounded-full border border-emerald-700/70 backdrop-blur-md shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Pioneer of &quot;Anagi&quot; Stoves, Renewable Energy &amp; Eco-Villages</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-[1.08] tracking-tight">
            Building a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-300">
              Sustainable Future
            </span>{' '}
            for <span className="inline-block whitespace-nowrap">Sri Lanka.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-xl text-slate-200 max-w-3xl font-normal leading-relaxed drop-shadow-sm">
            Join IDEA SRI LANKA in our mission to create lasting environmental impact through innovative sustainable development projects.
          </p>

          {/* Action Buttons & Stat Badge */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-1">
            <Link
              to="/projects"
              className="group bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 text-xs sm:text-sm font-black px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl shadow-xl shadow-emerald-950/80 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 flex items-center gap-2 border border-emerald-400/50"
            >
              <span>Explore Our Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/about"
              className="bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl backdrop-blur-md border border-white/20 transition-all duration-300 hover:border-white/40"
            >
              About Our Mission
            </Link>

            <div className="bg-emerald-950/90 border border-emerald-800/80 rounded-xl px-4 py-2.5 text-xs flex items-center gap-2.5 text-emerald-300 shadow-lg backdrop-blur-md">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-amber-400 font-black text-sm sm:text-base block leading-none">300,000+</span>
                <span className="text-slate-300 text-[11px] font-semibold">Lives Impacted Across Sri Lanka</span>
              </div>
            </div>
          </div>

        </div>

        {/* Slideshow Controls & Indicators (Bottom Right of Hero) */}
        <div className="absolute bottom-4 right-6 sm:right-12 z-20 flex items-center gap-2.5 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-emerald-800/60 shadow-xl">
          <button 
            onClick={handlePrev}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-emerald-800/60 transition active:scale-95"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {/* Pagination Indicators */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentSlide 
                    ? 'w-6 h-2 bg-amber-400' 
                    : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-emerald-800/60 transition active:scale-95"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 3. Full-Width Sanity-Style Partner / Trust Logo Cloud Bar matching Navbar Theme */}
      <div className="relative z-20 bg-gradient-to-r from-emerald-950 via-[#064E3B] to-emerald-950 text-emerald-100 py-3.5 px-6 border-t border-emerald-800/60 shadow-lg shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Badge Tag */}
          <div className="flex items-center gap-2 shrink-0 z-10 bg-emerald-900/90 px-3 py-1 rounded-lg border border-emerald-700/60 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-widest text-emerald-200">
              Trusted Partners & Collaborators
            </span>
          </div>

          {/* Scrolling Marquee Ticker with Edge Fade Masks */}
          <div 
            className="w-full md:w-auto overflow-hidden relative flex-grow"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)'
            }}
          >
            <div className="animate-marquee flex items-center gap-10 whitespace-nowrap opacity-90 font-extrabold text-xs sm:text-sm tracking-wider">
              {/* Set 1 */}
              <span className="flex items-center gap-2 hover:text-white transition cursor-pointer"><Trees className="w-4 h-4 text-emerald-400" /> IUCN</span>
              <span className="flex items-center gap-2 hover:text-white transition cursor-pointer"><ShieldCheck className="w-4 h-4 text-emerald-400" /> UNDP</span>
              <span className="flex items-center gap-2 hover:text-white transition cursor-pointer"><HeartHandshake className="w-4 h-4 text-emerald-400" /> GEF Small Grants</span>
              <span className="flex items-center gap-2 hover:text-white transition cursor-pointer"><Flame className="w-4 h-4 text-emerald-400" /> Ministry of Environment</span>
              <span className="flex items-center gap-2 hover:text-white transition cursor-pointer"><Zap className="w-4 h-4 text-emerald-400" /> Sustainable Energy Authority</span>

              {/* Set 2 (Duplicate for Seamless Endless Loop) */}
              <span className="flex items-center gap-2 hover:text-white transition cursor-pointer"><Trees className="w-4 h-4 text-emerald-400" /> IUCN</span>
              <span className="flex items-center gap-2 hover:text-white transition cursor-pointer"><ShieldCheck className="w-4 h-4 text-emerald-400" /> UNDP</span>
              <span className="flex items-center gap-2 hover:text-white transition cursor-pointer"><HeartHandshake className="w-4 h-4 text-emerald-400" /> GEF Small Grants</span>
              <span className="flex items-center gap-2 hover:text-white transition cursor-pointer"><Flame className="w-4 h-4 text-emerald-400" /> Ministry of Environment</span>
              <span className="flex items-center gap-2 hover:text-white transition cursor-pointer"><Zap className="w-4 h-4 text-emerald-400" /> Sustainable Energy Authority</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
