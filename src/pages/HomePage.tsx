import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import { Card, CompactCard } from '../components/Card';

const HomePage: React.FC = () => (
  <div className="bg-stone-50 min-h-screen">
    <Hero />

    {/* About Section */}
    <section id="about" className="py-24 md:py-32 px-6 container mx-auto">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-stone-400 text-xs font-bold tracking-[0.25em] uppercase block mb-6">
          Our Philosophy
        </span>
        <h2 className="text-4xl md:text-6xl font-serif text-stone-900 mb-10 leading-tight">
          Redefining luxury through effortless elegance and personalized service.
        </h2>
        <p className="text-stone-600 text-lg leading-loose font-light mb-12">
          At Seasons, we believe that true luxury lies in the details. From the moment you arrive,
          you are enveloped in an atmosphere of sophistication and warmth. Our properties are
          more than just hotels; they are curated experiences designed to inspire and rejuvenate.
        </p>
        <div className="w-24 h-px bg-gold-400 mx-auto"></div>
      </div>
    </section>

    {/* Featured Hotels Section */}
    <section id="hotels" className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-20 text-center">
          <h2 className="text-5xl font-serif text-stone-900 mb-4">Our Destinations</h2>
          <p className="text-stone-500 italic font-serif text-lg">Sanctuaries of style and serenity</p>
        </div>

        <div className="flex flex-col items-center mb-16">
          <Link to="/hotels" className="inline-block">
            <button className="px-8 py-3 uppercase tracking-widest text-xs font-semibold bg-stone-900 text-white border border-stone-900 hover:bg-gold-500 hover:border-gold-500 transition-all duration-300">
              Browse All Hotels
            </button>
          </Link>
        </div>

        <Card
          title="Seasons Grand"
          subtitle="The Crown Jewel"
          description="Located in the heart of the metropolis, Seasons Grand offers an urban oasis of unmatched grandeur. Featuring panoramic skyline views, a world-class spa, and architectural excellence that stands as a testament to modern luxury."
          image="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
        />

        <Card
          title="Seasons Beach Resort"
          subtitle="Coastal Paradise"
          description="Wake up to the sound of waves and golden sunrises. Our exclusive beach resort blends tropical tranquility with refined comfort, offering private villas, pristine white sands, and endless ocean horizons."
          image="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
          reverse={true}
        />

        <Card
          title="Seasons Mountain Retreat"
          subtitle="Alpine Serenity"
          description="Nestled among towering peaks, this retreat is a haven for those seeking silence and majestic nature. Enjoy ski-in access, roaring fireplaces, and warm thermal pools under the starry night sky."
          image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
        />
      </div>
    </section>

    {/* Dining Section */}
    <section id="dining" className="py-24 px-6 bg-stone-100">
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">Culinary Excellence</h2>
          <p className="text-stone-500 max-w-xl font-light">Taste the extraordinary at our award-winning venues, where locally sourced ingredients meet culinary artistry.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CompactCard
            title="Seasons Fine Dine"
            subtitle="Michelin Star Experience"
            description="An avant-garde gastronomic journey featuring a tasting menu that evolves with the seasons."
            image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80"
          />
          <CompactCard
            title="Seasons Café"
            subtitle="Artisanal & Cozy"
            description="The perfect spot for artisanal coffee, delicate pastries, and light gourmet lunches in a relaxed setting."
            image="https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80"
          />
          <CompactCard
            title="Seasons Rooftop Bar"
            subtitle="Sky High Cocktails"
            description="Expert mixology meets breathtaking views. The ultimate destination for sunset drinks and evening elegance."
            image="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80"
          />
        </div>
      </div>
    </section>

    {/* Quote / Break Section */}
    <section className="py-32 px-6 relative bg-stone-900 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600&q=80" className="w-full h-full object-cover grayscale" alt="Texture" />
      </div>
      <div className="relative z-10 max-w-3xl text-center">
        <p className="text-3xl md:text-5xl font-serif text-white italic leading-tight mb-8">
          "Hospitality is not just our business, it is our craft. We curate moments that become memories."
        </p>
        <span className="text-gold-500 tracking-widest uppercase text-sm font-semibold">The Seasons Promise</span>
      </div>
    </section>
  </div>
);

export default HomePage;
