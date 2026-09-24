import React from 'react';

export function MissionBanner() {
  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-24 bg-emerald-950 text-white">
      {/* Background Image Layer with Hands / Community Planning Visual */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105 filter brightness-75 transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />

      {/* Deep Forest Green Semi-Transparent Tint Overlay matching screenshot */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-emerald-950/90 via-emerald-900/85 to-emerald-950/90 backdrop-blur-[1px]" />

      {/* Subtle Grid Ambient Texture */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>

      {/* Centered Mission Statement Banner Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-8 text-center">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-medium text-white leading-relaxed sm:leading-snug tracking-tight max-w-4xl mx-auto drop-shadow-md">
          Join IDEA SRI LANKA in our mission to create lasting environmental impact through innovative sustainable development projects.
        </h2>
      </div>
    </section>
  );
}

export default MissionBanner;
