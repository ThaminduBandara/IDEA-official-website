import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, Users, Eye, Target, Award, Newspaper, Mail, ArrowUpRight, Compass, Heart, Leaf, Zap, Phone, Briefcase, Sparkles, MapPin } from 'lucide-react';
import ideaLogo from '../assets/logo.png';
import { sanityClient } from '../sanityClient';

const ICON_MAP = {
  Leaf: Leaf,
  Zap: Zap,
  Target: Target,
  Users: Users,
  Heart: Heart,
  Award: Award,
  Compass: Compass,
};

const DEFAULT_AREAS = [
  {
    title: 'Environment & Biodiversity',
    iconName: 'Leaf',
    bgImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    description: 'Addressing environmental and biodiversity issues of specific communities and national importance.'
  },
  {
    title: 'Renewable Energy Technologies',
    iconName: 'Target',
    bgImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80',
    description: 'Development and promotion of renewable energy technologies for sustainable community development.'
  },
  {
    title: 'Social Welfare Programs',
    iconName: 'Users',
    bgImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    description: 'Conducting programs on social welfare and upliftment of lives of rural population across Sri Lanka.'
  },
  {
    title: 'Community Engagement',
    iconName: 'Award',
    bgImage: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80',
    description: 'Influencing NGOs to include environment and household energy issues within their community-based activities.'
  }
];

const DEFAULT_LEADERSHIP = [
  {
    name: 'W.M. Leelasena',
    role: 'Former Director IRDP',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    phones: ['+94 11 2801924', '+94 777485105'],
    email: 'winasamestrileelasena@gmail.com'
  },
  {
    name: 'R.M. Amarasekara',
    role: 'Retired Electrical Engineer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    phones: ['+94 71 8265871', '+94 77 2365871'],
    email: 'amere40@gmail.com'
  },
  {
    name: 'Namiz Mohamed Musafer',
    role: 'Mechanical Engineer & Energy Expert',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    phones: ['+94 71 2748407'],
    email: 'namizm@gmail.com'
  },
  {
    name: 'L.G. Lamasena',
    role: 'Rural Energy Practitioner',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    phones: ['+94 77 9644916'],
    email: 'lglamasena5@gmail.com'
  },
  {
    name: 'R.M. Channa Daminda Amarasekara',
    role: 'Head / Senior General Manager, Emerging Enterprise, Dialog Axiata PLC',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    phones: ['+94 77 7335444'],
    email: 'channa.amara@gmail.com'
  },
  {
    name: 'H.A. Chandima Kumudini Ariyarathna',
    role: 'Senior Lecturer, Department of Botany, University of Peradeniya',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    phones: ['+94 718298401', '+94 812386891'],
    email: 'ckariyarathna@yahoo.com'
  }
];

export function AboutPage() {
  const [aboutData, setAboutData] = useState({
    visionTitle: 'Our Vision',
    visionText: 'A society where every household has access to affordable, sustainable, and integrated development options—empowering people to live with dignity, harmony, and care for the environment.',
    missionTitle: 'Our Mission',
    missionText: 'IDEA strives to promote harmony between people and the environment by enabling all segments of society to access and develop technologies, knowledge, and methods that give them greater control over their lives. We focus on the household as the foundation of sustainability, and support development that is decentralized, inclusive, and sustainable—rooted in the Universal Truth that nothing exists alone.',
    approachTitle: 'Our Approach',
    approachLeadText: 'At IDEA, we begin not with technologies or targets, but with people—their lived realities, daily struggles, and quiet strengths. Our approach is rooted in the Universal Truth that nothing exists alone.',
    approachHighlight: 'Development must be integrated, not divided by sectors.',
    approachClosingText: 'We focus on the household as the unit of transformation, the village as the space of collaboration, and the community as the voice of sustainability.',
    howWeWorkTitle: 'How We Work',
    howWeWorkParagraph1: 'IDEA is a registered non-profit, non-governmental organization based in Kandy which was established in March 1990 with the aim of playing an active role in contributing towards sustainable development efforts in the field of natural resource development, management, and conservation.',
    howWeWorkParagraph2: 'A multi-disciplinary Board consisting of six non-related members manages it voluntarily. The main strength of IDEA lies on the Board of Management which comprises members who are professionally qualified, experienced, and well-known in development circles.',
    howWeWorkImageUrl: null,
    howWeWorkImageCaption: 'IDEA Board of Management & Executive Team in Kandy',
    principalAreasTitle: 'Principal Areas of Interest',
    principalAreasSubtitle: 'IDEA focuses on addressing critical environmental, energy, and biodiversity issues that are of community and national importance.',
    principalAreas: DEFAULT_AREAS,
    leadershipTitle: 'Our Leadership Team',
    leadershipSubtitle: "Meet the dedicated professionals who guide IDEA's mission and vision for sustainable development.",
    leadershipTeam: DEFAULT_LEADERSHIP,
  });

  // Fetch live Vision, Mission, Approach, How We Work, Principal Areas & Leadership from Sanity
  useEffect(() => {
    async function fetchAbout() {
      try {
        const data = await sanityClient.fetch(`*[_type == "aboutInfo"][0]{
          ...,
          "howWeWorkImageUrl": howWeWorkImage.asset->url,
          "principalAreas": principalAreas[]{
            title,
            description,
            iconName,
            "bgImage": bgImage.asset->url
          },
          "leadershipTeam": leadershipTeam[]{
            name,
            role,
            "image": image.asset->url,
            phones,
            email
          }
        }`);
        if (data) {
          setAboutData(prev => ({
            ...prev,
            ...data,
            principalAreas: (data.principalAreas && data.principalAreas.length > 0)
              ? data.principalAreas
              : DEFAULT_AREAS,
            leadershipTeam: (data.leadershipTeam && data.leadershipTeam.length > 0)
              ? data.leadershipTeam
              : DEFAULT_LEADERSHIP
          }));
        }
      } catch (err) {
        console.warn('Using default about info fallback:', err);
      }
    }
    fetchAbout();
  }, []);

  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const quickJumpCards = [
    {
      id: 'vision-mission',
      title: 'Vision & Mission',
      icon: Eye,
      link: '#vision-mission',
      badge: 'Core Purpose',
      badgeBg: 'bg-[#d7f5e8] text-[#00684a] border-[#a3e6c5]',
      gradient: 'from-[#00875a] via-[#00a86b] to-[#00875a]',
      iconBg: 'bg-[#d7f5e8] text-[#00684a] border border-[#a3e6c5]',
      description: 'Explore our core guiding principles & long-term commitment to Sri Lanka.'
    },
    {
      id: 'projects',
      title: 'Our Projects',
      icon: Award,
      link: '/projects',
      badge: '50+ Initiatives',
      badgeBg: 'bg-[#d7f5e8] text-[#00684a] border-[#a3e6c5]',
      gradient: 'from-[#00875a] via-[#00a86b] to-[#00875a]',
      iconBg: 'bg-[#d7f5e8] text-[#00684a] border border-[#a3e6c5]',
      description: 'Discover eco-village, biomass & community water management projects.'
    },
    {
      id: 'news',
      title: 'News & Events',
      icon: Newspaper,
      link: '/news',
      badge: 'Latest Updates',
      badgeBg: 'bg-[#d7f5e8] text-[#00684a] border-[#a3e6c5]',
      gradient: 'from-[#00875a] via-[#00a86b] to-[#00875a]',
      iconBg: 'bg-[#d7f5e8] text-[#00684a] border border-[#a3e6c5]',
      description: 'Stay updated with upcoming workshops, expos & career vacancy announcements.'
    },
    {
      id: 'contact',
      title: 'Contact Us',
      icon: Mail,
      link: '/contact',
      badge: 'Kandy HQ',
      badgeBg: 'bg-[#d7f5e8] text-[#00684a] border-[#a3e6c5]',
      gradient: 'from-[#00875a] via-[#00a86b] to-[#00875a]',
      iconBg: 'bg-[#d7f5e8] text-[#00684a] border border-[#a3e6c5]',
      description: 'Get in touch directly with our Kundasale head office & voluntary staff team.'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#f4f8f5] text-slate-800">
      
      {/* 1. HERO HEADER SECTION WITH FULLY VISIBLE CRISP GREEN ENVIRONMENTAL BACKGROUND IMAGE */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden bg-emerald-950">
        {/* Crisp Unblurred Green Environmental Protection Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=2000&q=80"
            alt="Environmental Protection and Public Welfare Green Background"
            className="w-full h-full object-cover"
          />
          {/* Subtle Dark Gradient Tint Overlay - Zero Blur - Full Image Sharpness */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/65 to-slate-950/45" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
          
          {/* Top Breadcrumb & Status Pill */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <nav className="inline-flex items-center gap-2 text-xs font-bold text-slate-200 bg-slate-900/80 px-4 py-1.5 rounded-full border border-slate-700/80 shadow-xs">
              <Link to="/" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
                <Home className="w-3.5 h-3.5 text-emerald-400" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-emerald-400 font-extrabold">About Us</span>
            </nav>

            <span className="text-xs font-semibold text-slate-300 bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-slate-700/80 shadow-xs">
              You are here: <span className="text-emerald-400 font-extrabold ml-1">• About Us</span>
            </span>
          </div>

          {/* Grid Layout: Left Content + Right Hero Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column (7 cols): Main Hero Header Info */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-950/90 text-emerald-300 text-xs font-extrabold rounded-full border border-emerald-700/80 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Established March 1990 • Kandy, Sri Lanka</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                About IDEA
              </h1>

              <p className="text-slate-200 text-base sm:text-xl font-medium leading-relaxed">
                Integrated Development Association (IDEA) — Contributing to sustainable development, clean energy innovation, and community empowerment in Sri Lanka since 1990.
              </p>

              {/* Key Facts Pill Ribbon */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-extrabold">
                <div className="bg-slate-900/90 text-emerald-300 px-4 py-2 rounded-xl border border-slate-700/80 shadow-xs flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Registered Non-Profit NGO</span>
                </div>
                <div className="bg-slate-900/90 text-slate-200 px-4 py-2 rounded-xl border border-slate-700/80 shadow-xs flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>35+ Years Sustainable Impact</span>
                </div>
                <div className="bg-slate-900/90 text-slate-200 px-4 py-2 rounded-xl border border-slate-700/80 shadow-xs flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <span>Kundasale Head Office, Kandy</span>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Organization Official Logo Showcase Card (Compact Card, Full Logo) */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative rounded-3xl border-2 border-emerald-400/80 shadow-2xl bg-white p-5 sm:p-6 flex flex-col items-center justify-center text-center group hover:border-emerald-300 transition-all duration-300 max-w-sm w-full">
                {/* Subtle Decorative Background Glow */}
                <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-100/60 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-28 h-28 bg-teal-100/60 rounded-full blur-2xl pointer-events-none" />
                
                {/* Organization Official Logo (Preserved Large Size) */}
                <div className="relative z-10 w-56 sm:w-64 transform group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={ideaLogo}
                    alt="Integrated Development Association (IDEA) Official Logo"
                    className="w-full h-auto object-contain drop-shadow-xs"
                  />
                </div>
                
                {/* Official Title & Identity Subtitle */}
                <div className="relative z-10 mt-3 space-y-1">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
                    Integrated Development Association
                  </h3>
                  <p className="text-[11px] sm:text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    OFFICIAL EMBLEM &amp; IDENTITY • EST. 1990
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Organic Wave Cut (Matching Projects Page Hero Border) */}
        <div className="w-full absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none z-20">
          <svg
            className="relative block w-full h-8 sm:h-12 text-[#eef2f5]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,40 L1200,120 L0,120 Z"></path>
          </svg>
        </div>

      </section>

      {/* 2. EXPLORE OUR ORGANIZATION (MINIMALIST CARD GRID MATCHING USER SCREENSHOT) */}
      <section className="py-10 sm:py-14 bg-[#eef2f5] border-y border-slate-300/80 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-1 mb-7 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Explore Our Organization
            </h2>

            <p className="text-slate-500 text-xs sm:text-sm font-medium">
              Learn more about our work and impact
            </p>
          </div>

          {/* Ultra-Clean Minimalist 4-Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto">
            {quickJumpCards.map((card) => {
              const CardIcon = card.icon;
              const isInternalAnchor = card.link.startsWith('#');

              const cardContent = (
                <div className="bg-white border border-slate-200/90 rounded-2xl py-6 px-4 shadow-2xs hover:shadow-md hover:border-[#00684a] transition-all duration-300 flex flex-col items-center justify-center text-center group cursor-pointer h-full">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#00684a] group-hover:scale-110 transition-transform duration-300 mb-2">
                    <CardIcon className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#00684a] transition-colors">
                    {card.title}
                  </h3>
                </div>
              );

              if (isInternalAnchor) {
                return (
                  <a key={card.id} href={card.link}>
                    {cardContent}
                  </a>
                );
              }

              return (
                <Link key={card.id} to={card.link}>
                  {cardContent}
                </Link>
              );
            })}
          </div>

        </div>

      </section>

      {/* 4. VISION, MISSION & APPROACH SECTION (3-COLUMN CARDS WITH LEFT ACCENT BAR) */}
      <section id="vision-mission" className="py-16 sm:py-24 bg-white border-t border-emerald-100/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Card 1: Our Vision */}
            <div className="bg-[#f8fbf9] border border-slate-200/90 border-l-[6px] border-l-emerald-600 rounded-3xl p-7 sm:p-9 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center border border-emerald-200">
                  <Eye className="w-6 h-6 text-emerald-800" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {aboutData.visionTitle || 'Our Vision'}
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  {aboutData.visionText}
                </p>
              </div>
            </div>

            {/* Card 2: Our Mission */}
            <div className="bg-[#f8fbf9] border border-slate-200/90 border-l-[6px] border-l-emerald-600 rounded-3xl p-7 sm:p-9 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center border border-emerald-200">
                  <Compass className="w-6 h-6 text-emerald-800" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {aboutData.missionTitle || 'Our Mission'}
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  {aboutData.missionText}
                </p>
              </div>
            </div>

            {/* Card 3: Our Approach */}
            <div className="bg-[#f8fbf9] border border-slate-200/90 border-l-[6px] border-l-emerald-600 rounded-3xl p-7 sm:p-9 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center border border-emerald-200">
                  <Heart className="w-6 h-6 text-emerald-800" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {aboutData.approachTitle || 'Our Approach'}
                </h3>

                <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    {aboutData.approachLeadText || 'At IDEA, we begin not with technologies or targets, but with people—their lived realities, daily struggles, and quiet strengths. Our approach is rooted in the Universal Truth that nothing exists alone.'}
                  </p>
                  {aboutData.approachHighlight && (
                    <p className="font-semibold text-slate-800">
                      {aboutData.approachHighlight}
                    </p>
                  )}
                  <p>
                    {aboutData.approachClosingText || 'We focus on the household as the unit of transformation, the village as the space of collaboration, and the community as the voice of sustainability.'}
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. HOW WE WORK SECTION */}
      <section className="py-16 sm:py-24 bg-[#f4f8f5] border-t border-emerald-100/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {aboutData.howWeWorkTitle || 'How We Work'}
              </h3>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  {aboutData.howWeWorkParagraph1}
                </p>
                {aboutData.howWeWorkParagraph2 && (
                  <p>
                    {aboutData.howWeWorkParagraph2}
                  </p>
                )}
              </div>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 group">
                <img
                  src={aboutData.howWeWorkImageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"}
                  alt={aboutData.howWeWorkImageCaption || "IDEA Board of Management & Staff Team"}
                  className="w-full h-[320px] sm:h-[380px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-semibold bg-slate-950/70 p-3 rounded-xl backdrop-blur-md border border-white/20">
                  {aboutData.howWeWorkImageCaption || 'IDEA Board of Management & Executive Team in Kandy'}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. PRINCIPAL AREAS OF INTEREST */}
      <section className="py-16 sm:py-24 bg-[#ebf5ee] border-y border-emerald-100/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {aboutData.principalAreasTitle || 'Principal Areas of Interest'}
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              {aboutData.principalAreasSubtitle || 'IDEA focuses on addressing critical environmental, energy, and biodiversity issues that are of community and national importance.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {aboutData.principalAreas.map((area, idx) => {
              const AreaIcon = ICON_MAP[area.iconName] || Leaf;
              return (
                <div
                  key={area.title || idx}
                  className="relative group rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-emerald-200/90 transition-all duration-500 min-h-[240px] flex flex-col justify-end p-7 sm:p-8"
                >
                  {/* Topic-Related Background Image Layer */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={area.bgImage || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"}
                      alt={area.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Dark gradient overlay for high contrast text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/65 to-slate-950/30" />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#d7f5e8] text-[#00684a] border border-[#a3e6c5] flex items-center justify-center shadow-md">
                      <AreaIcon className="w-6 h-6" />
                    </div>

                    <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {area.title}
                    </h4>

                    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-medium">
                      {area.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. THREE DECADES OF IMPACT */}
      <section className="py-14 sm:py-18 bg-white border-b border-emerald-100/80 text-center">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-4">
          <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Three Decades of Impact
          </h3>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
            IDEA has over the years won the confidence of a large number of grassroots level Community Based Organizations (CBOs) seeking technical assistance in rural energy technologies and environment oriented programmes. We take initiatives to demonstrate the importance of household energy and the environment in sustainable development.
          </p>
        </div>
      </section>

      {/* 8. OUR LEADERSHIP TEAM */}
      <section className="py-16 sm:py-24 bg-[#f4f8f5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {aboutData.leadershipTitle || 'Our Leadership Team'}
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              {aboutData.leadershipSubtitle || "Meet the dedicated professionals who guide IDEA's mission and vision for sustainable development."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutData.leadershipTeam.map((member, idx) => (
              <div
                key={member.name || idx}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left Info Column */}
                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-2xl bg-[#d7f5e8] text-[#00684a] flex items-center justify-center border border-[#a3e6c5] shadow-xs">
                      <Users className="w-5 h-5" />
                    </div>

                    <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                      {member.name}
                    </h4>

                    <div className="flex items-start gap-2 text-xs font-semibold text-slate-600">
                      <Briefcase className="w-4 h-4 text-[#00684a] shrink-0 mt-0.5" />
                      <span className="leading-normal">{member.role}</span>
                    </div>
                  </div>

                  {/* Right Side Member Portrait Photo */}
                  <div className="relative shrink-0">
                    <img
                      src={member.imageUrl || member.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"}
                      alt={member.name}
                      className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl object-cover object-center border-2 border-[#a3e6c5]/80 shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  {member.phones && member.phones.map((phone, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 font-medium">
                      <Phone className="w-3.5 h-3.5 text-[#00684a] shrink-0" />
                      <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-[#00684a] transition">
                        {phone}
                      </a>
                    </div>
                  ))}

                  {member.email && (
                    <div className="flex items-center gap-2 font-medium truncate pt-1">
                      <Mail className="w-3.5 h-3.5 text-[#00684a] shrink-0" />
                      <a href={`mailto:${member.email}`} className="hover:text-[#00684a] transition truncate">
                        {member.email}
                      </a>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}

export default AboutPage;


