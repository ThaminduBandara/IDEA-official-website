import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import logoImg from '../../assets/logo.png';

export function Navbar({ onOpenJoinUs }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Technologies', path: '/technologies' },
    { name: 'Training', path: '/training' },
    { name: 'News & Events', path: '/news' },
    { name: 'Downloads', path: '/downloads' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="absolute top-0 left-0 z-50 w-full text-white bg-transparent py-2.5 sm:py-3.5">
      {/* Sleek Enterprise Header Container */}
      <div className="w-full px-4 sm:px-8 lg:px-10 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Brand & Logo Section */}
        <NavLink to="/" className="flex items-center gap-2.5 sm:gap-4 group shrink-0 min-w-0">
          <div className="p-1 sm:p-1.5 bg-white rounded-xl shadow-md border border-emerald-500/50 flex items-center justify-center shrink-0 transition-all duration-200 group-hover:border-emerald-400">
            <img 
              src={logoImg} 
              alt="Integrated Development Association" 
              className="h-9 sm:h-12 md:h-13 w-auto object-contain"
            />
          </div>
          <div className="border-l-2 sm:border-l-3 border-emerald-500/80 pl-2.5 sm:pl-3 py-0.5">
            <span className="font-extrabold text-white text-xs sm:text-base md:text-lg leading-tight tracking-tight block drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] transition-colors duration-200 group-hover:text-amber-300">
              <span className="sm:hidden">IDEA Sri Lanka</span>
              <span className="hidden sm:inline">Integrated Development Association</span>
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-amber-300 tracking-wide block mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              <span className="sm:hidden">Est. 1990</span>
              <span className="hidden sm:inline">Sustainable Development Since 1990</span>
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation Links as Clean Words */}
        <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 2xl:gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `text-xs xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] relative py-1 ${
                  isActive
                    ? 'text-emerald-300 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-400 after:rounded-full'
                    : 'text-white/90 hover:text-amber-300'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Action Button & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Join Us Executive CTA Button (hidden on mobile, available in mobile drawer) */}
          <button
            onClick={onOpenJoinUs}
            className="hidden sm:inline-flex group bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 items-center gap-1.5 border border-emerald-500/40 active:scale-98"
          >
            <span>Join Us</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          {/* Mobile Menu Toggle Button with explicit dark glass background */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-950/80 backdrop-blur-md text-white hover:bg-emerald-900 transition-all duration-200 focus:outline-none border border-emerald-500/50 shadow-md flex items-center justify-center shrink-0 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-white stroke-[2.5]" />
            ) : (
              <Menu className="w-5 h-5 text-white stroke-[2.5]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-emerald-950/98 backdrop-blur-2xl border-t border-emerald-800/80 px-6 pt-4 pb-8 space-y-4 shadow-2xl animate-fadeIn">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'font-bold text-white bg-emerald-800 border border-emerald-600 shadow-xs'
                      : 'text-emerald-100 hover:bg-emerald-900'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
          
          <div className="pt-3 border-t border-emerald-800/60">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoinUs();
              }}
              className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold py-3 px-5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <span>Join IDEA Community</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
