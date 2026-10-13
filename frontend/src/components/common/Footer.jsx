import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUp, Send } from 'lucide-react';
import logoImg from '../../assets/logo.png';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#f4f8f5] text-slate-800 border-t border-emerald-200/80 relative">
      {/* 1. Newsletter / Join Mission Callout Banner */}
      <div className="w-full bg-gradient-to-r from-emerald-100/80 via-emerald-50 to-emerald-100/80 border-b border-emerald-200/80 py-8 sm:py-10 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Join Our Mission for a Sustainable Sri Lanka
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm font-normal">
              Subscribe to get quarterly field reports, environmental updates, and rural community impact stories.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row w-full sm:w-auto gap-2.5 max-w-md">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="bg-white border border-emerald-300 text-slate-900 placeholder-slate-400 text-xs sm:text-sm px-4 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:border-emerald-600 w-full sm:w-72 shadow-xs"
              required
            />
            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 sm:py-3 rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-1.5 shrink-0 active:scale-98 cursor-pointer"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5 text-emerald-100" />
            </button>
          </form>
        </div>
      </div>

      {/* 2. Main Footer Content - 2 Columns on Mobile, 4 Columns on Desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        
        {/* Column 1: Brand & Logo */}
        <div className="space-y-3.5">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-1.5 bg-white rounded-xl shadow-md border border-emerald-200 flex items-center justify-center shrink-0">
              <img src={logoImg} alt="IDEA Logo" className="h-11 sm:h-12 w-auto object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight block group-hover:text-emerald-700 transition-colors">
                Integrated Development Association
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-emerald-700 block mt-0.5">
                Sustainable Development Since 1990
              </span>
            </div>
          </Link>

          <p className="text-slate-600 text-xs leading-relaxed">
            Empowering rural communities through clean energy access, biomass innovation, "Anagi" cookstoves, and environmental conservation projects across Sri Lanka.
          </p>

          {/* Social Media Links */}
          <div className="flex items-center gap-2.5 pt-1">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-xl bg-white hover:bg-emerald-700 text-emerald-800 hover:text-white flex items-center justify-center border border-emerald-200 transition-all duration-200 hover:scale-110 shadow-xs"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-xl bg-white hover:bg-emerald-700 text-emerald-800 hover:text-white flex items-center justify-center border border-emerald-200 transition-all duration-200 hover:scale-110 shadow-xs"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>

        {/* Middle Group: 2 Columns on Mobile, Distributed on Desktop */}
        <div className="grid grid-cols-2 gap-4 sm:gap-8 md:contents">
          
          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-emerald-200/80">
              <div className="w-1.5 h-3 bg-emerald-600 rounded-full"></div>
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Quick Links
              </h4>
            </div>
            
            <ul className="space-y-2 text-xs font-medium text-slate-700">
              <li>
                <Link to="/" className="hover:text-emerald-700 hover:translate-x-1 transition-all duration-150 inline-block">
                  Home Page
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-700 hover:translate-x-1 transition-all duration-150 inline-block">
                  About Us &amp; Mission
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-emerald-700 hover:translate-x-1 transition-all duration-150 inline-block">
                  Our Projects
                </Link>
              </li>
              <li>
                <Link to="/technologies" className="hover:text-emerald-700 hover:translate-x-1 transition-all duration-150 inline-block font-bold text-[#00684a]">
                  RE Technologies
                </Link>
              </li>
              <li>
                <Link to="/training" className="hover:text-emerald-700 hover:translate-x-1 transition-all duration-150 inline-block font-bold text-[#00684a]">
                  Training &amp; Trainees
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-emerald-700 hover:translate-x-1 transition-all duration-150 inline-block">
                  News &amp; Events
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="hover:text-emerald-700 hover:translate-x-1 transition-all duration-150 inline-block">
                  Downloads
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-700 hover:translate-x-1 transition-all duration-150 inline-block">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Focus Areas */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-emerald-200/80">
              <div className="w-1.5 h-3 bg-emerald-600 rounded-full"></div>
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Core Focus
              </h4>
            </div>

            <ul className="space-y-2 text-xs font-medium text-slate-700">
              <li className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
                <Link to="/technologies" className="hover:text-emerald-700 transition">Biomass Energy</Link>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
                <Link to="/technologies" className="hover:text-emerald-700 transition">Anagi Cookstoves</Link>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
                <span>Eco-Villages</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
                <span>Forest Conservation</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
                <Link to="/training" className="hover:text-emerald-700 transition">Artisan Training</Link>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
                <Link to="/training" className="hover:text-emerald-700 transition">Internships</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Column 4: Official Contact Info Card */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-1 border-b border-emerald-200/80">
            <div className="w-1.5 h-3 bg-emerald-600 rounded-full"></div>
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Contact Details
            </h4>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-200/80 shadow-xs space-y-3 text-xs text-slate-700">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                10-1/11, 3rd Lane, Galmaduwawatte Kundasale, Kandy Sri Lanka 20000
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
              <a href="tel:+94812423396" className="font-bold text-emerald-800 hover:text-emerald-900 transition-colors">
                +94 812 423 396
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
              <a href="mailto:info@idealk.org" className="font-bold text-emerald-800 hover:text-emerald-900 transition-colors truncate">
                info@idealk.org
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Bottom Legal Bar & Back to Top */}
      <div className="w-full bg-white border-t border-emerald-200/80 py-4 sm:py-5 px-4 sm:px-8 lg:px-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Integrated Development Association (IDEA). All rights reserved.
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/about" className="hover:text-emerald-700 transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-emerald-700 transition-colors">
              Contact
            </Link>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white transition-all duration-200 hover:scale-110 shadow-sm focus:outline-none cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
