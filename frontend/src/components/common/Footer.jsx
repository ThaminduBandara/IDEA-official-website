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
      {/* 1. Newsletter / Join Mission Callout Banner - Light Mint Accent */}
      <div className="w-full bg-gradient-to-r from-emerald-100/80 via-emerald-50 to-emerald-100/80 border-b border-emerald-200/80 py-10 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Join Our Mission for a Sustainable Sri Lanka
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm font-normal">
              Subscribe to get quarterly field reports, environmental updates, and rural community impact stories.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="flex w-full sm:w-auto gap-2 max-w-md">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="bg-white border border-emerald-300 text-slate-900 placeholder-slate-400 text-xs sm:text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-emerald-600 w-full sm:w-72 shadow-xs"
              required
            />
            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl transition duration-200 shadow-md flex items-center gap-1.5 shrink-0 active:scale-98"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5 text-emerald-100" />
            </button>
          </form>
        </div>
      </div>

      {/* 2. Main Footer Content - 4 Columns Light Theme */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        
        {/* Column 1: Brand & Logo */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-1.5 bg-white rounded-xl shadow-md border border-emerald-200 flex items-center justify-center">
              <img src={logoImg} alt="IDEA Logo" className="h-12 w-auto object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-base leading-tight block group-hover:text-emerald-700 transition-colors">
                Integrated Development Association
              </span>
              <span className="text-xs font-bold text-emerald-700 block mt-0.5">
                Sustainable Development Since 1990
              </span>
            </div>
          </Link>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Empowering rural communities through clean energy access, biomass innovation, "Anagi" cookstoves, and environmental conservation projects across Sri Lanka.
          </p>

          {/* Social Media Links */}
          <div className="flex items-center gap-2.5 pt-1">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white hover:bg-emerald-700 text-emerald-800 hover:text-white flex items-center justify-center border border-emerald-200 transition-all duration-200 hover:scale-110 shadow-xs"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white hover:bg-emerald-700 text-emerald-800 hover:text-white flex items-center justify-center border border-emerald-200 transition-all duration-200 hover:scale-110 shadow-xs"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4">
          <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-emerald-200 pb-2">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-slate-700">
            <li>
              <Link to="/" className="hover:text-emerald-700 hover:translate-x-1 transition-all duration-150 inline-block">
                Home Page
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-emerald-700 hover:translate-x-1 transition-all duration-150 inline-block">
                About Us & Mission
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-emerald-700 hover:translate-x-1 transition-all duration-150 inline-block">
                Our Projects & Impact
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-emerald-700 hover:translate-x-1 transition-all duration-150 inline-block">
                Latest News & Events
              </Link>
            </li>
            <li>
              <Link to="/downloads" className="hover:text-emerald-700 hover:translate-x-1 transition-all duration-150 inline-block">
                Publications & Downloads
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
        <div className="space-y-4">
          <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-emerald-200 pb-2">
            Core Focus Areas
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm font-medium text-slate-700">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>Biomass Energy Technology</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>Anagi Cookstove Initiative</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>Climate-Resilient Eco-Villages</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>Forest & Buffer Zone Conservation</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>Rural Community Empowerment</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Official Contact Info Card */}
        <div className="space-y-4">
          <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 uppercase tracking-wider border-b border-emerald-200 pb-2">
            Contact Details
          </h4>
          <div className="bg-white p-5 rounded-2xl border border-emerald-200/80 shadow-xs space-y-3.5 text-xs sm:text-sm text-slate-700">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                10-1/11, 3rd Lane, Galmaduwawatte Kundasale, Kandy Sri Lanka 20000
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
              <a href="tel:+94812423396" className="font-semibold text-emerald-800 hover:text-emerald-900 transition-colors">
                +94 812 423 396
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
              <a href="mailto:info@idealk.org" className="font-semibold text-emerald-800 hover:text-emerald-900 transition-colors">
                info@idealk.org
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Bottom Legal Bar & Back to Top */}
      <div className="w-full bg-white border-t border-emerald-200/80 py-5 px-6 sm:px-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Integrated Development Association (IDEA). All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-emerald-700 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-emerald-700 transition-colors">
              Terms of Service
            </Link>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white transition-all duration-200 hover:scale-110 shadow-sm focus:outline-none"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
