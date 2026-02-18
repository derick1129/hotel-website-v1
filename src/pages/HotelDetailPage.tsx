import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { hotelsApi, roomsApi } from '../api';
import { RoomCard } from '../components/RoomCard';
import { PageLoader } from '../components/LoadingSpinner';
import type { Hotel, Room } from '../types';

const defaultImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800&q=80';

const HotelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const [hotelData, roomsData] = await Promise.all([
          hotelsApi.getById(id),
          roomsApi.getByHotel(id),
        ]);
        setHotel(hotelData);
        setRooms(roomsData);
      } catch (err) {
        setError('Failed to load hotel details. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Hotel not found'}</p>
          <Link to="/hotels" className="text-gold-600 hover:text-gold-700 underline">
            Back to Hotels
          </Link>
        </div>
      </div>
    );
  }

  const heroImage = hotel.images?.[0] || defaultImage;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={heroImage}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container mx-auto">
            <Link
              to="/hotels"
              className="text-gold-400 text-sm uppercase tracking-widest hover:text-gold-300 transition-colors"
            >
              ← All Hotels
            </Link>
            <h1 className="text-4xl md:text-6xl font-serif text-white mt-4 mb-2">
              {hotel.name}
            </h1>
            <div className="flex items-center gap-2 text-stone-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{hotel.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Description */}
        {hotel.description && (
          <div className="max-w-3xl mb-16">
            <h2 className="text-2xl font-serif text-stone-900 mb-4">About This Hotel</h2>
            <p className="text-stone-600 leading-relaxed">{hotel.description}</p>
          </div>
        )}

        {/* Amenities */}
        {hotel.amenities && hotel.amenities.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-serif text-stone-900 mb-6">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {hotel.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white border border-stone-200"
                >
                  <svg
                    className="w-5 h-5 text-gold-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-stone-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rooms */}
        <div>
          <h2 className="text-2xl font-serif text-stone-900 mb-6">Available Rooms</h2>
          {rooms.length === 0 ? (
            <p className="text-stone-500">No rooms available at the moment.</p>
          ) : (
            <div className="space-y-6">
              {rooms.map((room) => (
                <RoomCard key={room._id} room={room} hotelId={hotel._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelDetailPage;
