import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronDown, Newspaper, Camera } from 'lucide-react';
import logoImg from '../../assets/logo.png';

export function Navbar({ onOpenJoinUs }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  const location = useLocation();

  const isMediaActive =
    location.pathname.startsWith('/news') || location.pathname.startsWith('/gallery');

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setMediaDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setMediaDropdownOpen(false);
    }, 150);
  };

  // Close dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMediaDropdownOpen(false);
  }, [location.pathname]);

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

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 2xl:gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-xs xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] relative py-1 ${
                isActive
                  ? 'text-emerald-300 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-400 after:rounded-full'
                  : 'text-white/90 hover:text-amber-300'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-xs xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] relative py-1 ${
                isActive
                  ? 'text-emerald-300 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-400 after:rounded-full'
                  : 'text-white/90 hover:text-amber-300'
              }`
            }
          >
            About Us
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `text-xs xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] relative py-1 ${
                isActive
                  ? 'text-emerald-300 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-400 after:rounded-full'
                  : 'text-white/90 hover:text-amber-300'
              }`
            }
          >
            Projects
          </NavLink>

          <NavLink
            to="/technologies"
            className={({ isActive }) =>
              `text-xs xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] relative py-1 ${
                isActive
                  ? 'text-emerald-300 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-400 after:rounded-full'
                  : 'text-white/90 hover:text-amber-300'
              }`
            }
          >
            Technologies
          </NavLink>

          <NavLink
            to="/training"
            className={({ isActive }) =>
              `text-xs xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] relative py-1 ${
                isActive
                  ? 'text-emerald-300 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-400 after:rounded-full'
                  : 'text-white/90 hover:text-amber-300'
              }`
            }
          >
            Training
          </NavLink>

          {/* Option A: Dropdown for Media (News & Events + Photo/Video Gallery) */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setMediaDropdownOpen(!mediaDropdownOpen)}
              className={`text-xs xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] relative py-1 flex items-center gap-1 cursor-pointer ${
                isMediaActive
                  ? 'text-emerald-300 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-400 after:rounded-full'
                  : 'text-white/90 hover:text-amber-300'
              }`}
            >
              <span>Media</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  mediaDropdownOpen ? 'rotate-180 text-emerald-400' : 'text-white/70'
                }`}
              />
            </button>

            {/* Dropdown: Fully Transparent, No Icons, Just Like Header Buttons */}
            {mediaDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-fadeIn">
                <div className="flex flex-col items-center gap-1.5 py-1 px-3 bg-transparent whitespace-nowrap">
                  {/* Item 1: News & Events */}
                  <NavLink
                    to="/news"
                    className={({ isActive }) =>
                      `text-xs xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] relative py-1 ${
                        isActive
                          ? 'text-emerald-300 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-400 after:rounded-full'
                          : 'text-white/90 hover:text-amber-300'
                      }`
                    }
                  >
                    News &amp; Events
                  </NavLink>

                  {/* Item 2: Media Gallery */}
                  <NavLink
                    to="/gallery"
                    className={({ isActive }) =>
                      `text-xs xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] relative py-1 ${
                        isActive
                          ? 'text-emerald-300 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-400 after:rounded-full'
                          : 'text-white/90 hover:text-amber-300'
                      }`
                    }
                  >
                    Media Gallery
                  </NavLink>
                </div>
              </div>
            )}
          </div>

          <NavLink
            to="/downloads"
            className={({ isActive }) =>
              `text-xs xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] relative py-1 ${
                isActive
                  ? 'text-emerald-300 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-400 after:rounded-full'
                  : 'text-white/90 hover:text-amber-300'
              }`
            }
          >
            Downloads
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-xs xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] relative py-1 ${
                isActive
                  ? 'text-emerald-300 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-400 after:rounded-full'
                  : 'text-white/90 hover:text-amber-300'
              }`
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Action Button & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Join Us Executive CTA Button */}
          <button
            onClick={onOpenJoinUs}
            className="hidden sm:inline-flex group bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 items-center gap-1.5 border border-emerald-500/40 active:scale-98 cursor-pointer"
          >
            <span>Join Us</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          {/* Mobile Menu Toggle Button */}
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
            <NavLink
              to="/"
              end
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive ? 'font-bold text-white bg-emerald-800 border border-emerald-600 shadow-xs' : 'text-emerald-100 hover:bg-emerald-900'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive ? 'font-bold text-white bg-emerald-800 border border-emerald-600 shadow-xs' : 'text-emerald-100 hover:bg-emerald-900'
                }`
              }
            >
              About Us
            </NavLink>

            <NavLink
              to="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive ? 'font-bold text-white bg-emerald-800 border border-emerald-600 shadow-xs' : 'text-emerald-100 hover:bg-emerald-900'
                }`
              }
            >
              Projects
            </NavLink>

            <NavLink
              to="/technologies"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive ? 'font-bold text-white bg-emerald-800 border border-emerald-600 shadow-xs' : 'text-emerald-100 hover:bg-emerald-900'
                }`
              }
            >
              Technologies
            </NavLink>

            <NavLink
              to="/training"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive ? 'font-bold text-white bg-emerald-800 border border-emerald-600 shadow-xs' : 'text-emerald-100 hover:bg-emerald-900'
                }`
              }
            >
              Training
            </NavLink>

            {/* Mobile Media Section Header & Sub-links */}
            <div className="pt-2 pb-1">
              <div className="px-4 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Media &amp; Archives
              </div>
              <div className="mt-1 space-y-1 pl-2">
                <NavLink
                  to="/news"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                      isActive ? 'font-bold text-white bg-emerald-800 border border-emerald-600 shadow-xs' : 'text-emerald-100 hover:bg-emerald-900'
                    }`
                  }
                >
                  <Newspaper className="w-4 h-4 text-emerald-400" />
                  <span>News &amp; Events</span>
                </NavLink>

                <NavLink
                  to="/gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 ${
                      isActive ? 'font-bold text-white bg-emerald-800 border border-emerald-600 shadow-xs' : 'text-emerald-100 hover:bg-emerald-900'
                    }`
                  }
                >
                  <Camera className="w-4 h-4 text-amber-300" />
                  <span>Media Gallery</span>
                </NavLink>
              </div>
            </div>

            <NavLink
              to="/downloads"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive ? 'font-bold text-white bg-emerald-800 border border-emerald-600 shadow-xs' : 'text-emerald-100 hover:bg-emerald-900'
                }`
              }
            >
              Downloads
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive ? 'font-bold text-white bg-emerald-800 border border-emerald-600 shadow-xs' : 'text-emerald-100 hover:bg-emerald-900'
                }`
              }
            >
              Contact
            </NavLink>
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
