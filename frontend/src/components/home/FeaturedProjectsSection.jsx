import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Calendar, ArrowUpRight, ArrowRight, Sparkles } from 'lucide-react';

export function FeaturedProjectsSection() {
  const projects = [
    {
      id: 1,
      title: 'Climate Resilient Eco Village Development Project',
      categories: ['Energy Efficiency', 'Climate Action', 'Eco-Villages'],
      description: 'Building climate-resilient, sustainable rural communities through rainwater harvesting, solar energy adoption, and organic farming.',
      location: 'Matara & Kandy Districts',
      beneficiaries: '500 Families',
      timeline: 'Ongoing Initiative',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      featuredTag: 'Flagship Project'
    },
    {
      id: 2,
      title: 'Introduce & Disseminate Use of Bio-Mass Waste in Brick Making',
      categories: ['Biomass Energy', 'Waste Management', 'Industrial Efficiency'],
      description: 'Transforming small & medium brick kilns across Anuradhapura by replacing fossil fuels with sustainable agricultural biomass waste.',
      location: 'Anuradhapura District',
      beneficiaries: '500+ Brick Makers',
      timeline: 'Completed Pilot Phase',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
      featuredTag: 'Biomass Innovation'
    },
    {
      id: 3,
      title: 'Fuel Efficient Wood Stove Program in Hambantota',
      categories: ['Anagi Cookstoves', 'Sustainable Agriculture', 'Rural Welfare'],
      description: 'Extending clean biomass stove technology to plantation households to slash wood consumption by 50% and eliminate indoor smoke.',
      location: 'Hambantota District',
      beneficiaries: '1,000+ Households',
      timeline: 'Est. Heritage 1994',
      image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80',
      featuredTag: 'Anagi Heritage'
    },
    {
      id: 4,
      title: 'Community Reforestation & Rainwater Harvesting',
      categories: ['Forest Conservation', 'Water Management', 'Eco-Villages'],
      description: 'Empowering local village committees to plant native timber and establish rainwater harvesting reservoirs in dry zone districts.',
      location: 'Polonnaruwa & Monaragala',
      beneficiaries: '750+ Families',
      timeline: 'Conservation Phase',
      image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80',
      featuredTag: 'Eco Conservation'
    },
    {
      id: 5,
      title: 'Biomass Commercialization & Industrial Thermal Energy',
      categories: ['Biomass Energy', 'Renewable Transition', 'Clean Power'],
      description: 'Developing sustainable woodchip supply chains for industrial boilers, reducing national reliance on imported fossil fuels.',
      location: 'Central & Sabaragamuwa',
      beneficiaries: '25+ Enterprises',
      timeline: 'Commercial Scaling',
      image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80',
      featuredTag: 'Clean Energy'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const isThrottled = React.useRef(false);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Horizontal wheel scroll handler
  const handleWheel = (e) => {
    if (isThrottled.current) return;
    if (Math.abs(e.deltaX) > 15 || Math.abs(e.deltaY) > 30) {
      isThrottled.current = true;
      if (e.deltaX > 0 || e.deltaY > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setTimeout(() => {
        isThrottled.current = false;
      }, 350);
    }
  };

  // Touch / Drag swipe handlers for mobile & trackpad
  const minSwipeDistance = 40;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <section className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-[#064E3B] to-slate-950 text-white overflow-hidden border-b border-emerald-900/60">
      
      {/* Background Ambient Glows & Grid Pattern */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-teal-400/10 blur-[100px] rounded-full pointer-events-none z-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            Featured Projects
          </h2>

          <p className="text-emerald-100/90 text-sm sm:text-base md:text-lg font-normal leading-relaxed">
            Discover our latest impactful initiatives in sustainable development, renewable energy, and environmental conservation across Sri Lanka.
          </p>
        </div>

        {/* 3D Curved Carousel Track Container with Drag/Wheel Event Listeners */}
        <div 
          onWheel={handleWheel}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="relative pt-10 pb-16 min-h-[580px] sm:min-h-[620px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        >
          {/* Cards Curved Layout Container */}
          <div className="relative w-full max-w-5xl h-[520px] flex items-center justify-center">
            {projects.map((project, idx) => {
              let offset = idx - activeIndex;

              if (offset < -2) offset += projects.length;
              if (offset > 2) offset -= projects.length;

              const isActive = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;
              const isFarLeft = offset <= -2;
              const isFarRight = offset >= 2;

              let transformStyle = '';
              let opacityStyle = 'opacity-0 pointer-events-none';
              let zIndexStyle = 'z-0';

              if (isActive) {
                transformStyle = 'translate-x-0 translate-y-0 scale-100 sm:scale-105';
                opacityStyle = 'opacity-100 shadow-2xl shadow-emerald-950/90 border border-emerald-600/50 bg-[#0d261e] text-white';
                zIndexStyle = 'z-30';
              } else if (isLeft) {
                transformStyle = '-translate-x-[60%] sm:-translate-x-[75%] translate-y-6 sm:translate-y-8 scale-90 sm:scale-95 -rotate-y-6';
                opacityStyle = 'opacity-90 hover:opacity-100 shadow-xl border border-emerald-900/80 bg-[#081b15] text-slate-300 filter brightness-95 cursor-pointer';
                zIndexStyle = 'z-20';
              } else if (isRight) {
                transformStyle = 'translate-x-[60%] sm:translate-x-[75%] translate-y-6 sm:translate-y-8 scale-90 sm:scale-95 rotate-y-6';
                opacityStyle = 'opacity-90 hover:opacity-100 shadow-xl border border-emerald-900/80 bg-[#081b15] text-slate-300 filter brightness-95 cursor-pointer';
                zIndexStyle = 'z-20';
              } else if (isFarLeft) {
                transformStyle = '-translate-x-[110%] sm:-translate-x-[135%] translate-y-12 sm:translate-y-16 scale-75 sm:scale-80';
                opacityStyle = 'opacity-30 pointer-events-none filter brightness-90 bg-[#081b15]';
                zIndexStyle = 'z-10';
              } else if (isFarRight) {
                transformStyle = 'translate-x-[110%] sm:translate-x-[135%] translate-y-12 sm:translate-y-16 scale-75 sm:scale-80';
                opacityStyle = 'opacity-30 pointer-events-none filter brightness-90 bg-[#081b15]';
                zIndexStyle = 'z-10';
              }

              return (
                <div
                  key={project.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`absolute w-full max-w-[340px] sm:max-w-[370px] rounded-3xl overflow-hidden transition-all duration-500 ease-out transform ${transformStyle} ${opacityStyle} ${zIndexStyle}`}
                >
                  {/* Card Header Photo & Category Pills */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d261e] via-[#0d261e]/30 to-transparent" />

                    {/* Tag Badge */}
                    <div className="absolute top-3 left-3 bg-emerald-800 text-emerald-100 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-600/50 shadow-md">
                      {project.featuredTag}
                    </div>

                    {/* Category Badges */}
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                      {project.categories.map((cat, cIdx) => (
                        <span
                          key={cIdx}
                          className="bg-[#051712] text-emerald-200 text-[10px] font-semibold px-2.5 py-0.5 rounded-md border border-emerald-800/50 shadow-xs"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Body Info */}
                  <div className="p-6 space-y-4 text-left flex flex-col justify-between h-[280px]">
                    <div className="space-y-2">
                      <h3 className="text-lg font-extrabold text-white leading-snug line-clamp-2 group-hover:text-emerald-300">
                        {project.title}
                      </h3>
                      <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Metadata Icons */}
                    <div className="pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="font-semibold text-emerald-200 truncate">{project.location}</span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{project.beneficiaries}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="text-slate-400">{project.timeline}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <Link
                        to={`/projects/${project.id}`}
                        className={`w-full text-xs font-bold py-2.5 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-1.5 ${
                          isActive
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md border border-emerald-500/50'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                        }`}
                      >
                        <span>Learn More</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Carousel Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === activeIndex
                  ? 'w-8 h-2.5 bg-emerald-500'
                  : 'w-2.5 h-2.5 bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Bottom Centered Main CTA Button */}
        <div className="pt-10 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm sm:text-base font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-950/60 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 border border-emerald-500/50"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4.5 h-4.5 text-emerald-100" />
          </Link>
        </div>

      </div>
    </section>
  );
}

export default FeaturedProjectsSection;

