import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { format, differenceInDays, addDays } from 'date-fns';
import toast from 'react-hot-toast';
import { roomsApi, hotelsApi, bookingsApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { PageLoader, LoadingSpinner } from '../components/LoadingSpinner';
import type { Room, Hotel, CreateBookingRequest } from '../types';

interface BookingFormData {
  checkIn: string;
  checkOut: string;
}

const BookingPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [searchParams] = useSearchParams();
  const hotelId = searchParams.get('hotelId');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [room, setRoom] = useState<Room | null>(null);
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const today = format(new Date(), 'yyyy-MM-dd');
  const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      checkIn: today,
      checkOut: tomorrow,
    },
  });

  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');

  useEffect(() => {
    const fetchData = async () => {
      if (!roomId || !hotelId) return;

      try {
        const [roomData, hotelData] = await Promise.all([
          roomsApi.getById(roomId),
          hotelsApi.getById(hotelId),
        ]);
        setRoom(roomData);
        setHotel(hotelData);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load room details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [roomId, hotelId]);

  useEffect(() => {
    if (room && checkIn && checkOut) {
      const nights = differenceInDays(new Date(checkOut), new Date(checkIn));
      if (nights > 0) {
        setTotalPrice(nights * room.pricePerNight);
      } else {
        setTotalPrice(0);
      }
    }
  }, [room, checkIn, checkOut]);

  const onSubmit = async (data: BookingFormData) => {
    if (!isAuthenticated) {
      toast.error('Please login to make a booking');
      navigate('/login', { state: { from: { pathname: window.location.pathname + window.location.search } } });
      return;
    }

    if (!roomId) return;

    setIsSubmitting(true);
    try {
      const bookingData: CreateBookingRequest = {
        roomId,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
      };

      const booking = await bookingsApi.create(bookingData);
      toast.success('Booking created! Proceeding to payment...');
      navigate(`/payment/${booking._id}`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (!room || !hotel) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Room not found</p>
          <Link to="/hotels" className="text-gold-600 hover:text-gold-700 underline">
            Browse Hotels
          </Link>
        </div>
      </div>
    );
  }

  const nights = differenceInDays(new Date(checkOut), new Date(checkIn));

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-stone-900 text-white py-12 px-6">
        <div className="container mx-auto">
          <Link
            to={`/hotels/${hotelId}`}
            className="text-gold-400 text-sm uppercase tracking-widest hover:text-gold-300 transition-colors"
          >
            ← Back to {hotel.name}
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif mt-4">Book Your Stay</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 shadow-lg">
              <h2 className="text-2xl font-serif text-stone-900 mb-6">Select Your Dates</h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Input
                    label="Check-in Date"
                    type="date"
                    min={today}
                    error={errors.checkIn?.message}
                    {...register('checkIn', {
                      required: 'Check-in date is required',
                    })}
                  />
                  <Input
                    label="Check-out Date"
                    type="date"
                    min={checkIn || today}
                    error={errors.checkOut?.message}
                    {...register('checkOut', {
                      required: 'Check-out date is required',
                      validate: (value) => {
                        if (new Date(value) <= new Date(checkIn)) {
                          return 'Check-out must be after check-in';
                        }
                        return true;
                      },
                    })}
                  />
                </div>

                {nights > 0 && (
                  <div className="bg-stone-50 p-4 mb-6 text-sm text-stone-600">
                    <p>
                      <strong>{nights}</strong> night{nights > 1 ? 's' : ''} •{' '}
                      {format(new Date(checkIn), 'MMM d, yyyy')} →{' '}
                      {format(new Date(checkOut), 'MMM d, yyyy')}
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  disabled={isSubmitting || nights <= 0}
                >
                  {isSubmitting ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    `Proceed to Payment • ₹${totalPrice.toLocaleString()}`
                  )}
                </Button>

                {!isAuthenticated && (
                  <p className="text-center text-stone-500 text-sm mt-4">
                    You'll need to{' '}
                    <Link to="/login" className="text-gold-600 hover:text-gold-700">
                      sign in
                    </Link>{' '}
                    to complete your booking
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Room Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 shadow-lg sticky top-6">
              <h3 className="text-lg font-serif text-stone-900 mb-4">Booking Summary</h3>

              {room.images?.[0] && (
                <img
                  src={room.images[0]}
                  alt={room.roomType}
                  className="w-full aspect-video object-cover mb-4"
                />
              )}

              <div className="border-b border-stone-200 pb-4 mb-4">
                <p className="text-stone-500 text-sm">{hotel.name}</p>
                <h4 className="text-xl font-serif text-stone-900">{room.roomType}</h4>
                <p className="text-stone-500 text-sm mt-1">
                  Up to {room.maxGuests} guests
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">Price per night</span>
                  <span className="text-stone-900">₹{room.pricePerNight.toLocaleString()}</span>
                </div>
                {nights > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Number of nights</span>
                      <span className="text-stone-900">{nights}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-stone-200 font-medium">
                      <span className="text-stone-900">Total</span>
                      <span className="text-gold-600 text-lg">₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
