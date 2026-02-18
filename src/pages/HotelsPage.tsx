import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { hotelsApi } from '../api';
import { HotelCard } from '../components/HotelCard';
import { PageLoader } from '../components/LoadingSpinner';
import type { Hotel } from '../types';

const HotelsPage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await hotelsApi.getAll();
        setHotels(data);
      } catch (err) {
        setError('Failed to load hotels. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-stone-900 text-white py-20 px-6">
        <div className="container mx-auto">
          <Link to="/" className="text-gold-400 text-sm uppercase tracking-widest hover:text-gold-300 transition-colors">
            ← Back to Home
          </Link>
          <h1 className="text-5xl md:text-6xl font-serif mt-6 mb-4">Our Hotels</h1>
          <p className="text-stone-300 text-lg max-w-xl">
            Discover our collection of exceptional properties, each offering a unique blend of luxury and local character.
          </p>
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="container mx-auto px-6 py-16">
        {error ? (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-gold-600 hover:text-gold-700 underline"
            >
              Try again
            </button>
          </div>
        ) : hotels.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-stone-500 text-lg">No hotels available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelsPage;
