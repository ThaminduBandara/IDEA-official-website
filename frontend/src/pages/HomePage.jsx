import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ImpactSection } from '../components/home/ImpactSection';
import { VideoShowcaseSection } from '../components/home/VideoShowcaseSection';
import { FeaturedProjectsSection } from '../components/home/FeaturedProjectsSection';
import { LatestNewsSection } from '../components/home/LatestNewsSection';

export function HomePage() {
  return (
    <div className="w-full min-h-screen bg-slate-50">
      {/* 1. High-Impact Sanity-Style Hero Section */}
      <HeroSection />

      {/* 2. Impact Over the Years Statistics Counter Section */}
      <ImpactSection />

      {/* 3. Dedicated Mission in Action Video Showcase Spotlight */}
      <VideoShowcaseSection />

      {/* 4. Featured Projects Interactive Card Grid */}
      <FeaturedProjectsSection />

      {/* 5. Latest News & Events Section */}
      <LatestNewsSection />
    </div>
  );
}

export default HomePage;
