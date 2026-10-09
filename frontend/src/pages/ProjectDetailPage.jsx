import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Home, ChevronRight, ChevronLeft, MapPin, Users, Clock, Award, ArrowLeft, 
  Target, TrendingUp, DollarSign, Handshake, Image as ImageIcon, Tag, 
  Building2, CheckCircle2, Sparkles, Layers, Loader2 
} from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { sanityClient, ALL_PROJECTS_QUERY } from '../sanityClient';

export function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Active image index for the interactive project gallery
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [allProjects, setAllProjects] = useState(projectsData);
  const [currentProject, setCurrentProject] = useState(() => {
    return (
      projectsData.find(
        (p) =>
          p.slug === id ||
          p.id === id ||
          p.id === parseInt(id, 10) ||
          String(p.id) === String(id)
      ) || null
    );
  });
  const [loading, setLoading] = useState(!currentProject);

  // Scroll to top when page loads or ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
  }, [id]);

  useEffect(() => {
    // Fetch all projects from Sanity to support slug & id routing
    sanityClient
      .fetch(ALL_PROJECTS_QUERY)
      .then((data) => {
        if (data && data.length > 0) {
          setAllProjects(data);
          const found = data.find(
            (p) =>
              p.slug === id ||
              p.id === id ||
              p._id === id ||
              p.id === parseInt(id, 10) ||
              String(p.id) === String(id)
          );

          if (found) {
            setCurrentProject(found);
            setLoading(false);
          } else {
            const staticFound = projectsData.find(
              (p) =>
                p.slug === id ||
                p.id === id ||
                p.id === parseInt(id, 10) ||
                String(p.id) === String(id)
            );
            if (staticFound) {
              setCurrentProject(staticFound);
            }
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching projects from Sanity for details page:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading || !currentProject) {
    return (
      <div className="w-full min-h-screen bg-[#f4f7f5] text-slate-800 pt-32 pb-20 px-6 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-[#00684a] animate-spin" />
        <p className="text-slate-600 text-sm font-semibold">Loading project details...</p>
      </div>
    );
  }

  const project = currentProject;

  // Find next project for navigation
  const currentIndex = allProjects.findIndex(
    (p) => (p.slug || p.id || p._id) === (project.slug || project.id || project._id)
  );
  const nextProject =
    allProjects[(currentIndex >= 0 ? currentIndex + 1 : 0) % allProjects.length] || projectsData[0];

  const galleryImages =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [project.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80'];

  const statusClass =
    project.status === 'Completed'
      ? 'bg-[#1d63ed] text-white'
      : 'bg-[#00a86b] text-white';

  const nextProjectTarget = nextProject.slug || nextProject.id || nextProject._id;

  return (
    <div className="w-full min-h-screen bg-[#f4f7f5] text-slate-800">
      {/* 1. CINEMATIC HERO HEADER */}
      <section className="relative flex flex-col justify-center min-h-[260px] sm:min-h-[300px] lg:min-h-[320px] pt-24 sm:pt-28 pb-14 sm:pb-16 bg-slate-950 overflow-hidden text-white">
        {/* Full-bleed Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={project.image || galleryImages[0]}
            alt={project.title}
            className="w-full h-full object-cover object-center scale-105 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-emerald-950/70 z-10" />
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 w-full my-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left Column: Breadcrumb, Badges & Title */}
            <div className="space-y-3.5 max-w-3xl">
              {/* Top Breadcrumb & Status Ribbon */}
              <div className="flex flex-wrap items-center gap-2.5">
                <nav className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-200 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15 shadow-xs">
                  <Link to="/" className="flex items-center gap-1 hover:text-emerald-300 transition-colors">
                    <Home className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Home</span>
                  </Link>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                  <Link to="/projects" className="hover:text-emerald-300 transition-colors">
                    Projects
                  </Link>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                  <span className="text-emerald-300 font-bold truncate max-w-[160px] sm:max-w-xs">
                    {project.title}
                  </span>
                </nav>

                <span className={`text-xs font-bold px-3 py-1 rounded-full shadow-xs border border-white/15 ${statusClass}`}>
                  {project.status || 'Ongoing'}
                </span>

                {/* Category Pills */}
                {project.categories && project.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.categories.map((cat, idx) => (
                      <span
                        key={idx}
                        className="bg-[#9333ea]/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-purple-400/30 shadow-xs"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Project Main Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug drop-shadow-sm">
                {project.title}
              </h1>

              {/* Subtitle / Funder Tag */}
              {project.subtitle && (
                <p className="text-emerald-300 text-xs sm:text-sm font-bold tracking-wide uppercase flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{project.subtitle}</span>
                </p>
              )}
            </div>

            {/* Right Column: Quick Metrics Bar */}
            {(project.location || project.beneficiaries || project.duration || project.timeline) && (
              <div className="flex flex-wrap lg:flex-row items-center gap-2.5 text-xs font-medium text-slate-200 shrink-0 lg:pb-1">
                {project.location && (
                  <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 shadow-xs whitespace-nowrap">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{project.location}</span>
                  </div>
                )}

                {project.beneficiaries && (
                  <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 shadow-xs whitespace-nowrap">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{project.beneficiaries} Beneficiaries</span>
                  </div>
                )}

                {(project.duration || project.timeline) && (
                  <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 shadow-xs whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{project.duration || project.timeline}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Organic Curve Cut */}
        <div className="w-full absolute -bottom-px left-0 right-0 overflow-hidden leading-none pointer-events-none z-20">
          <svg
            className="relative block w-full h-10 sm:h-14 lg:h-16 text-[#f4f7f5]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,0 C400,110 800,0 1200,70 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. MAIN CONTENT BODY SECTION */}
      <section className="py-12 sm:py-20 bg-[#f4f7f5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Back Button Link */}
          <div className="mb-8">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-extrabold text-[#00684a] bg-white px-5 py-2.5 rounded-full border border-slate-200/90 hover:bg-[#00684a] hover:text-white transition-all shadow-xs group"
            >
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
              <span>Back to All Projects</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT MAIN COLUMN (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* SECTION 1: PROJECT GALLERY */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                {/* Gallery Title Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#00684a] border border-emerald-100 flex items-center justify-center">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        Project Gallery
                      </h2>
                      <p className="text-xs text-slate-500 font-medium">Field photography and initiative milestones</p>
                    </div>
                  </div>

                  <span className="text-xs font-extrabold text-[#00684a] bg-[#ebf5ee] px-3 py-1 rounded-full border border-emerald-200">
                    {activeImageIndex + 1} / {galleryImages.length} Photos
                  </span>
                </div>

                {/* Main Viewport Container */}
                <div className="relative h-[340px] sm:h-[450px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 group shadow-md">
                  <img
                    src={galleryImages[activeImageIndex]}
                    alt={`${project.title} gallery photo ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-105"
                  />

                  {/* Circular Navigation Arrow Buttons */}
                  {galleryImages.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
                        }
                        className="w-11 h-11 rounded-full bg-black/60 hover:bg-[#00684a] text-white flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-all cursor-pointer shadow-lg backdrop-blur-md border border-white/20"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>

                      <button
                        onClick={() =>
                          setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
                        }
                        className="w-11 h-11 rounded-full bg-black/60 hover:bg-[#00684a] text-white flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 z-10 transition-all cursor-pointer shadow-lg backdrop-blur-md border border-white/20"
                        aria-label="Next photo"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}

                  {/* Counter Badge Pill */}
                  <div className="absolute bottom-4 left-4 z-10 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md border border-white/10">
                    {activeImageIndex + 1} of {galleryImages.length}
                  </div>
                </div>

                {/* Thumbnail Strip Below */}
                {galleryImages.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto py-2 px-2 scrollbar-none">
                    {galleryImages.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`p-1 rounded-2xl transition-all duration-300 cursor-pointer shrink-0 ${
                          activeImageIndex === idx
                            ? 'bg-[#00684a] shadow-md opacity-100'
                            : 'bg-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <div className="h-20 w-28 sm:h-24 sm:w-36 rounded-xl overflow-hidden border border-white/60 bg-slate-100">
                          <img
                            src={imgUrl}
                            alt={`Thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION 2: ABOUT THIS PROJECT */}
              {project.aboutThisProject && (
                <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-7 rounded-full bg-[#00684a]" />
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      About This Project
                    </h2>
                  </div>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal whitespace-pre-line">
                    {project.aboutThisProject}
                  </p>
                </div>
              )}

              {/* SECTION 3: CATEGORIES */}
              {project.categories && project.categories.length > 0 && (
                <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center">
                      <Layers className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      Categories
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {project.categories.map((cat, idx) => (
                      <span
                        key={idx}
                        className="bg-[#ebf5ee] hover:bg-[#00684a] hover:text-white border border-[#a3e6c5] text-[#00684a] text-xs font-extrabold px-4 py-2 rounded-full transition-all duration-300 shadow-2xs"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 4: PROJECT OBJECTIVES */}
              {(project.keyObjectives?.length > 0 || project.objectivesText) && (
                <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                      <Target className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      Project Objectives
                    </h2>
                  </div>

                  {project.keyObjectives && project.keyObjectives.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3">
                      {project.keyObjectives.map((obj, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-2xl bg-[#f8faf9] border border-emerald-100/90 flex items-start gap-3.5 hover:border-[#00684a]/30 transition"
                        >
                          <CheckCircle2 className="w-5 h-5 text-[#00684a] shrink-0 mt-0.5" />
                          <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                            {obj}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal whitespace-pre-line">
                      {project.objectivesText}
                    </p>
                  )}
                </div>
              )}

              {/* SECTION 5: EXPECTED OUTCOMES */}
              {(project.outcomesText || project.impactStats?.length > 0) && (
                <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-sm space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#00684a] border border-emerald-100 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      Expected Outcomes
                    </h2>
                  </div>

                  {project.outcomesText && (
                    <div className="p-5 rounded-2xl bg-[#ebf5ee] border border-emerald-200/80 space-y-3">
                      <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-semibold">
                        {project.outcomesText}
                      </p>
                    </div>
                  )}

                  {/* Additional Impact Stat Callouts */}
                  {project.impactStats && project.impactStats.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      {project.impactStats.map((stat, i) => (
                        <div key={i} className="bg-[#f8faf9] p-4 rounded-2xl border border-slate-200/80 space-y-1">
                          <p className="text-xl sm:text-2xl font-black text-[#00684a]">{stat.value}</p>
                          <p className="text-xs font-bold text-slate-800">{stat.label}</p>
                          <p className="text-[11px] text-slate-500">{stat.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR COLUMN (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              {/* PROJECT DETAILS SIDEBAR CARD */}
              <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-md space-y-6">
                <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-xl font-black text-slate-900">
                    Project Details
                  </h3>
                  <span className="text-[10px] font-extrabold text-[#00684a] bg-[#ebf5ee] px-2.5 py-1 rounded-full uppercase">
                    Key Specs
                  </span>
                </div>

                <div className="space-y-5">
                  {/* Location */}
                  {project.location && (
                    <div className="flex items-start gap-3.5 border-b border-slate-100 pb-4">
                      <div className="w-10 h-10 rounded-2xl bg-[#ebf5ee] text-[#00684a] border border-emerald-100 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Location</span>
                        <span className="text-slate-900 font-black text-sm block mt-0.5">
                          {project.location}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Beneficiaries */}
                  {project.beneficiaries && (
                    <div className="flex items-start gap-3.5 border-b border-slate-100 pb-4">
                      <div className="w-10 h-10 rounded-2xl bg-[#ebf5ee] text-[#00684a] border border-emerald-100 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Beneficiaries</span>
                        <span className="text-slate-900 font-black text-sm block mt-0.5">
                          {project.beneficiaries}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Duration */}
                  {(project.duration || project.timeline) && (
                    <div className="flex items-start gap-3.5 border-b border-slate-100 pb-4">
                      <div className="w-10 h-10 rounded-2xl bg-[#ebf5ee] text-[#00684a] border border-emerald-100 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Duration</span>
                        <span className="text-slate-900 font-black text-sm block mt-0.5">
                          {project.duration || project.timeline}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Budget */}
                  {project.budget && (
                    <div className="flex items-start gap-3.5 border-b border-slate-100 pb-4">
                      <div className="w-10 h-10 rounded-2xl bg-[#ebf5ee] text-[#00684a] border border-emerald-100 flex items-center justify-center shrink-0">
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Budget</span>
                        <span className="text-[#00684a] font-black text-sm block mt-0.5">
                          {project.budget}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Partners */}
                  {project.partners && (
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-[#ebf5ee] text-[#00684a] border border-emerald-100 flex items-center justify-center shrink-0">
                        <Handshake className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Partners</span>
                        <span className="text-slate-900 font-black text-sm block mt-0.5">
                          {project.partners}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* PROJECT TIMELINE SIDEBAR CARD */}
              <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-md space-y-4">
                <h3 className="text-xl font-black text-slate-900">
                  Project Timeline
                </h3>

                <div className="p-4 rounded-2xl bg-[#ebf5ee] border border-emerald-200 flex items-center gap-3.5">
                  <div className="relative flex h-3.5 w-3.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#10b981]"></span>
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-slate-900 font-black text-base leading-snug">
                      {project.status || 'Ongoing'}
                    </p>
                    <p className="text-slate-600 text-xs font-semibold">
                      {project.status === 'Completed'
                        ? 'Project completed successfully'
                        : 'Project currently active and ongoing in field'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Next Project Preview Link Card */}
              {nextProject && (
                <div className="bg-gradient-to-br from-[#ebf5ee] to-white rounded-3xl p-7 border border-emerald-200/90 shadow-sm space-y-4">
                  <span className="text-[10px] font-black text-[#00684a] uppercase tracking-wider block">
                    Explore Next Project
                  </span>

                  <div className="space-y-2">
                    <h4 className="text-base font-black text-slate-900 leading-snug line-clamp-2">
                      {nextProject.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-2">
                      {nextProject.aboutThisProject || nextProject.overview || nextProject.description}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(`/projects/${nextProjectTarget}`)}
                    className="w-full py-3 px-4 rounded-2xl bg-[#00684a] hover:bg-[#043927] text-white text-xs font-black transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span>View Next Initiative</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Nav Bar */}
          <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-700 hover:text-[#00684a] transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Projects Overview</span>
            </Link>

            <span className="text-xs font-bold text-slate-500">
              Integrated Development Association (IDEA) Sri Lanka • Est. 1990
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProjectDetailPage;
