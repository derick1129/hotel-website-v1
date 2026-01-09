import React from 'react';
import { Button } from './Button';

interface CardProps {
  title: string;
  description: string;
  image: string;
  subtitle: string;
  reverse?: boolean;
}

export const Card: React.FC<CardProps> = ({ title, description, image, subtitle, reverse = false }) => {
  return (
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24 mb-24 lg:mb-32 group`}>
      {/* Image Side */}
      <div className="w-full lg:w-3/5 overflow-hidden shadow-2xl relative aspect-[16/9] lg:aspect-[4/3]">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 border-[1px] border-white/20 m-4 pointer-events-none transition-all duration-500 group-hover:m-2"></div>
      </div>

      {/* Text Side */}
      <div className="w-full lg:w-2/5 text-center lg:text-left">
        <span className="text-gold-500 text-xs font-bold tracking-[0.2em] uppercase block mb-4">
          {subtitle}
        </span>
        <h3 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6 leading-tight">
          {title}
        </h3>
        <p className="text-stone-600 leading-relaxed mb-8 font-light text-lg">
          {description}
        </p>
        <Button variant="outline">Discover More</Button>
      </div>
    </div>
  );
};

export const CompactCard: React.FC<Omit<CardProps, 'reverse'>> = ({ title, description, image, subtitle }) => {
    return (
        <div className="group cursor-pointer">
            <div className="relative overflow-hidden aspect-[3/4] mb-6">
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500 z-10"></div>
                 <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>
            <div className="text-center">
                 <span className="text-gold-600 text-[10px] font-bold tracking-[0.2em] uppercase block mb-2">
                    {subtitle}
                </span>
                <h3 className="text-2xl font-serif text-stone-900 mb-3 group-hover:text-gold-600 transition-colors">
                    {title}
                </h3>
                <p className="text-stone-500 font-light text-sm line-clamp-2 px-4">
                    {description}
                </p>
            </div>
        </div>
    )
}