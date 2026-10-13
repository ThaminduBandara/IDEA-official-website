import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, Pause, Volume2, VolumeX, Sparkles, Flame, 
  ArrowRight, Maximize2, ShieldCheck, CheckCircle2, PhoneCall, Utensils
} from 'lucide-react';

export function VideoShowcaseSection() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;

        if (entry.isIntersecting) {
          setIsInView(true);
          // Standard browser autoplay: requires muted=true to start without user gesture
          videoRef.current.muted = isMuted;
          videoRef.current.play()
            .then(() => setIsPlaying(true))
            .catch((err) => {
              console.warn('Scroll autoplay blocked by browser policy:', err);
            });
        } else {
          setIsInView(false);
          // Auto-pause when scrolled out of view to save battery and memory
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.25, // Trigger when 25% of the card is on screen
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isMuted]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleFullscreen = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-16 sm:py-24 bg-slate-950 text-white overflow-hidden border-b border-emerald-900/60"
    >
      {/* Ambient Radial Lighting Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[700px] h-[400px] bg-[#00684a]/20 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute -bottom-10 right-10 w-[500px] h-[350px] bg-emerald-600/15 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Atmospheric Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-950/90 text-emerald-300 text-xs font-extrabold rounded-full border border-emerald-700/80 backdrop-blur-md shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Product Spotlight • නවතම ජංගම මුළුතැන්ගෙය</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            The All-New{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-300">
              Mobile Kitchen
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base md:text-lg font-normal leading-relaxed">
            Indoor &amp; Outdoor 2-Burner Clean Biomass Kitchen. Zero smoke, cuts firewood expenses by 50%, and cooks anywhere with portable ease.
          </p>
        </div>

        {/* Advertisement Split Layout: Portrait Video on Left, Feature Spotlight on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Portrait Video Player Showcase (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-500/40 bg-black group">
              
              <div className="relative w-full aspect-[9/16] bg-black flex items-center justify-center">
                {/* HTML5 Video Element */}
                <video
                  ref={videoRef}
                  src="/videos/idea-documentary.mp4"
                  muted={isMuted}
                  loop
                  playsInline
                  preload="metadata"
                  onClick={togglePlay}
                  className="w-full h-full object-cover bg-black cursor-pointer"
                >
                  Your browser does not support HTML5 video streaming.
                </video>

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

                {/* Top Status Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-emerald-300 text-[11px] font-bold border border-emerald-500/40 shadow-md">
                    <span className={`w-2 h-2 rounded-full ${isInView && isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-slate-400'}`}></span>
                    <span>{isInView && isPlaying ? 'Autoplaying' : 'Scroll to Play'}</span>
                  </span>

                  <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-slate-300 text-[11px] font-bold border border-white/20 shadow-md">
                    HD Video
                  </span>
                </div>

                {/* Center Play/Pause Indicator (when paused) */}
                {!isPlaying && (
                  <div 
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer z-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#00684a] via-[#00875a] to-emerald-400 text-white flex items-center justify-center shadow-2xl border-2 border-emerald-300/80 hover:scale-110 active:scale-95 transition-all">
                      <Play className="w-7 h-7 fill-current ml-1 text-white" />
                    </div>
                  </div>
                )}

                {/* Bottom Sound & Control Pill */}
                <div className="absolute bottom-4 left-3 right-3 flex items-center justify-between gap-2 z-20">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 hover:border-emerald-400 transition-all shadow-md flex items-center justify-center cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 text-emerald-400" /> : <Play className="w-4 h-4 fill-current text-emerald-400" />}
                  </button>

                  <button
                    onClick={toggleSound}
                    className={`flex-1 py-2 px-3 rounded-xl backdrop-blur-md border transition-all shadow-md flex items-center justify-center gap-1.5 text-xs font-bold cursor-pointer ${
                      isMuted
                        ? 'bg-amber-500/30 border-amber-400/60 text-amber-200 hover:bg-amber-500/40'
                        : 'bg-emerald-600/90 border-emerald-400 text-white hover:bg-emerald-500'
                    }`}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-4 h-4 text-amber-300" />
                        <span>Tap to Unmute Audio</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-white" />
                        <span>Audio Playing</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleFullscreen}
                    className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 hover:border-emerald-400 transition-all shadow-md flex items-center justify-center cursor-pointer"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4 text-slate-200" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Commercial Product Advertisement & Order Callout (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
                <Flame className="w-4 h-4 text-emerald-400" />
                <span>Heavy-Duty Double Burner Design</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Cook Clean, Cook Anywhere
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                The IDEA Mobile Kitchen (ජංගම මුළුතැන්ගෙය) combines traditional clay pot cooking with modern thermal efficiency. Engineered with high-retention refractory chambers and a built-in smoke chimney, you can prepare meals indoors without smoke or outdoors in the garden.
              </p>
            </div>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/70 border border-emerald-800/50 rounded-2xl p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dual Burner Efficiency</span>
                </div>
                <p className="text-xs text-slate-300">
                  Cook two clay pots simultaneously while saving 50%+ on fuelwood expenses.
                </p>
              </div>

              <div className="bg-slate-900/70 border border-emerald-800/50 rounded-2xl p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Smoke-Free Indoors</span>
                </div>
                <p className="text-xs text-slate-300">
                  Flue pipe directs smoke outside, protecting your family’s respiratory health.
                </p>
              </div>

              <div className="bg-slate-900/70 border border-emerald-800/50 rounded-2xl p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Portable &amp; Weatherproof</span>
                </div>
                <p className="text-xs text-slate-300">
                  Easily moved between indoor kitchen, garden, verandah, or small restaurant.
                </p>
              </div>

              <div className="bg-slate-900/70 border border-emerald-800/50 rounded-2xl p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>National Delivery</span>
                </div>
                <p className="text-xs text-slate-300">
                  Delivered directly to homes and institutions across all 25 districts in Sri Lanka.
                </p>
              </div>
            </div>

            {/* Order Hotline Box */}
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-2 border-emerald-500/50 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-extrabold text-amber-300 uppercase tracking-wider block">
                  Direct Inquiries &amp; Orders Hotline
                </span>
                <a 
                  href="tel:0766013396" 
                  className="text-2xl sm:text-3xl font-black text-white hover:text-emerald-300 transition-colors inline-flex items-center gap-2"
                >
                  <PhoneCall className="w-6 h-6 text-emerald-400 animate-bounce" />
                  <span>076 601 3396</span>
                </a>
                <p className="text-xs text-slate-300">
                  Call or WhatsApp our team for pricing, specifications &amp; islandwide delivery.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                <a
                  href="tel:0766013396"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all active:scale-95"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
                <Link
                  to="/contact"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/20 font-bold text-sm rounded-xl transition-all"
                >
                  <span>Inquire Online</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default VideoShowcaseSection;
