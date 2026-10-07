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
    { name: 'News & Events', path: '/news' },
    { name: 'Downloads', path: '/downloads' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="absolute top-0 left-0 z-50 w-full text-white bg-transparent py-2.5 sm:py-3.5">
      {/* Sleek Enterprise Header Container */}
      <div className="w-full px-6 sm:px-10 flex items-center justify-between gap-6">
        
        {/* Brand & Logo Section */}
        <NavLink to="/" className="flex items-center gap-3 sm:gap-4 group shrink-0">
          <div className="p-1 sm:p-1.5 bg-white rounded-xl shadow-md border border-emerald-500/50 flex items-center justify-center transition-all duration-200 group-hover:border-emerald-400">
            <img 
              src={logoImg} 
              alt="Integrated Development Association" 
              className="h-10 sm:h-12 md:h-13 w-auto object-contain"
            />
          </div>
          <div className="border-l-2 sm:border-l-3 border-emerald-500/80 pl-3 py-0.5">
            <span className="font-extrabold text-white text-sm sm:text-base md:text-lg leading-tight tracking-tight block drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] transition-colors duration-200 group-hover:text-amber-300">
              Integrated Development Association
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-amber-300 tracking-wide block mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Sustainable Development Since 1990
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation Links as Clean Words */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] relative py-1 ${
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
        <div className="flex items-center gap-3 shrink-0">
          {/* Join Us Executive CTA Button */}
          <button
            onClick={onOpenJoinUs}
            className="group bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-1.5 border border-emerald-500/40 active:scale-98"
          >
            <span>Join Us</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg text-emerald-100 hover:bg-emerald-800 transition-all duration-200 focus:outline-none border border-emerald-700/70"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-emerald-950 border-t border-emerald-800 px-6 pt-4 pb-8 space-y-2 shadow-2xl">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'font-bold text-white bg-emerald-800 border border-emerald-600'
                      : 'text-emerald-100 hover:bg-emerald-900'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
