import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import logoImg from '../../assets/logo.png';

export function Navbar({ onOpenJoinUs }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'News & Events', path: '/news' },
    { name: 'Downloads', path: '/downloads' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 text-white ${
      isScrolled
        ? 'bg-emerald-950/75 backdrop-blur-md shadow-lg border-b border-emerald-800/80 py-2 sm:py-2.5'
        : 'bg-emerald-950/25 backdrop-blur-md border-b border-white/10 py-2.5 sm:py-3'
    }`}>
      {/* Sleek Enterprise Header Container */}
      <div className="w-full px-6 sm:px-10 flex items-center justify-between gap-6">
        
        {/* Brand & Logo Section */}
        <NavLink to="/" className="flex items-center gap-4 sm:gap-5 group shrink-0">
          <div className="p-1.5 bg-white rounded-xl shadow-md border border-emerald-700/50 flex items-center justify-center transition-all duration-200 group-hover:border-emerald-400">
            <img 
              src={logoImg} 
              alt="Integrated Development Association" 
              className="h-12 sm:h-16 md:h-18 w-auto object-contain"
            />
          </div>
          <div className="border-l-2 sm:border-l-3 border-emerald-700/80 pl-4 py-0.5">
            <span className="font-extrabold text-white text-base sm:text-xl leading-tight tracking-tight block transition-colors duration-200 group-hover:text-amber-300">
              Integrated Development Association
            </span>
            <span className="text-xs sm:text-sm font-bold text-amber-300/90 tracking-wide block mt-0.5">
              Sustainable Development Since 1990
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation Links with Enterprise Professional Hover */}
        <nav className="hidden lg:flex items-center gap-1.5 font-semibold text-xs sm:text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full transition-all duration-200 ease-in-out whitespace-nowrap border ${
                  isActive
                    ? 'font-bold text-white bg-emerald-800/90 border-emerald-600 shadow-inner'
                    : 'text-emerald-100/80 border-transparent hover:text-white hover:bg-emerald-800/50 hover:border-emerald-700/50'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Action Button & Mobile Hamburger */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Join Us Executive CTA Button */}
          <button
            onClick={onOpenJoinUs}
            className="group bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs sm:text-sm font-bold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 border border-emerald-500/40 active:scale-98"
          >
            <span>Join Us</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
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
