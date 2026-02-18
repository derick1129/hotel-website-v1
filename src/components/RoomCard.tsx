import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import type { Room } from '../types';

interface RoomCardProps {
  room: Room;
  hotelId: string;
}

const defaultImage = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80';

export const RoomCard: React.FC<RoomCardProps> = ({ room, hotelId }) => {
  const image = room.images?.[0] || defaultImage;

  return (
    <div className="bg-white border border-stone-200 overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-1/3 aspect-video md:aspect-auto overflow-hidden">
        <img
          src={image}
          alt={room.roomType}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-serif text-stone-900 mb-2">{room.roomType}</h3>
          <div className="flex items-center gap-4 text-sm text-stone-500 mb-4">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Up to {room.maxGuests} guests
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <div>
            <span className="text-2xl font-serif text-stone-900">₹{room.pricePerNight.toLocaleString()}</span>
            <span className="text-stone-500 text-sm"> / night</span>
          </div>
          <Link to={`/booking/${room._id}?hotelId=${hotelId}`}>
            <Button variant="primary">Book Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
