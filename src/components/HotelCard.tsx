import React from 'react';
import { Link } from 'react-router-dom';
import type { Hotel } from '../types';

interface HotelCardProps {
  hotel: Hotel;
}

const defaultImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80';

export const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const image = hotel.images?.[0] || defaultImage;

  return (
    <Link to={`/hotels/${hotel._id}`} className="group block">
      <div className="bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={image}
            alt={hotel.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-stone-500 text-sm">{hotel.location}</span>
          </div>
          <h3 className="text-2xl font-serif text-stone-900 mb-2 group-hover:text-gold-600 transition-colors">
            {hotel.name}
          </h3>
          {hotel.description && (
            <p className="text-stone-600 text-sm line-clamp-2 mb-4">
              {hotel.description}
            </p>
          )}
          {hotel.amenities && hotel.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {hotel.amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded"
                >
                  {amenity}
                </span>
              ))}
              {hotel.amenities.length > 3 && (
                <span className="text-xs px-2 py-1 text-stone-400">
                  +{hotel.amenities.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
