import React, { useEffect, useState } from 'react';
import { Button } from './Button';

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simple delay to trigger fade-in animation
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with slight scale animation */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
          alt="Luxury Hotel Room"
          className="w-full h-full object-cover animate-[kenburns_20s_infinite_alternate]"
          style={{ animationDuration: '30s' }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/30 to-stone-900/80"></div>
      </div>

      {/* Hero Content */}
      <div className={`relative z-10 text-center px-4 max-w-4xl mx-auto transition-all duration-1000 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <p className="text-gold-400 uppercase tracking-[0.3em] text-sm md:text-base mb-6 font-medium">
          Experience the Extraordinary
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white font-medium mb-8 leading-tight">
          Welcome to Seasons
        </h1>
        <p className="text-stone-200 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 tracking-wide leading-relaxed">
          Timeless luxury. Exceptional hospitality. Discover a world where every detail is curated for your comfort.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button variant="text" className="w-full sm:w-auto min-w-[200px]">
            Explore Hotels
          </Button>
          <Button variant="primary" className="w-full sm:w-auto min-w-[200px] border-transparent  text-stone-900 hover:bg-gold-500 hover:text-white">
            Book Your Stay
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <svg className="w-6 h-6 text-white/50" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;