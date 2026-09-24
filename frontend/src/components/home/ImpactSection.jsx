import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Trees, RefreshCw, HeartHandshake, BookmarkCheck, ArrowUpRight } from 'lucide-react';

export function ImpactSection() {
  const stats = [
    {
      id: 1,
      number: '35+',
      label: 'Years of Experience',
      bgColor: 'bg-[#1b5e3a]',
      badgeColor: 'bg-[#38bdf8]',
      icon: Users,
    },
    {
      id: 2,
      number: '50+',
      label: 'Projects Completed',
      bgColor: 'bg-[#10b981]',
      badgeColor: 'bg-[#10b981]',
      icon: Trees,
    },
    {
      id: 3,
      number: '300K+',
      label: 'Lives Impacted',
      bgColor: 'bg-[#2563eb]',
      badgeColor: 'bg-[#3b82f6]',
      icon: RefreshCw,
    },
    {
      id: 4,
      number: '75+',
      label: 'Communities Served',
      bgColor: 'bg-[#f97316]',
      badgeColor: 'bg-[#f97316]',
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#f6f9f6] text-slate-800 border-b border-emerald-100">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Impact Over the Years
          </h2>
          <p className="text-slate-600 text-sm sm:text-base md:text-lg font-normal leading-relaxed">
            Transforming lives and communities through sustainable development initiatives across Sri Lanka
          </p>

          {/* Action Buttons below subtitle */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-white text-slate-800 border border-slate-200 hover:border-slate-300 text-xs sm:text-sm font-semibold px-4.5 py-2.5 rounded-xl shadow-xs transition hover:bg-slate-50 hover:shadow-md"
            >
              <Users className="w-4 h-4 text-emerald-700" />
              <span>Learn About Our Mission</span>
            </Link>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-md transition hover:shadow-lg hover:scale-102 border border-emerald-600/80 active:scale-98"
            >
              <BookmarkCheck className="w-4 h-4 text-emerald-100" />
              <span>View All Projects</span>
            </Link>
          </div>
        </div>

        {/* 4 Stat Counter Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 pt-14 text-center">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.id} className="flex flex-col items-center space-y-3.5 group cursor-pointer">
                {/* Colorful Circular Icon Container with Floating Badge Accent */}
                <div className="relative">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${stat.bgColor} text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <IconComponent className="w-8 h-8 sm:w-9 sm:h-9" />
                  </div>
                  {/* Floating '+' Badge Accent */}
                  <span className={`absolute -top-1 -right-1 w-5.5 h-5.5 ${stat.badgeColor} text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md border-2 border-white`}>
                    +
                  </span>
                </div>

                {/* Number & Label */}
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight group-hover:text-emerald-800 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ImpactSection;
