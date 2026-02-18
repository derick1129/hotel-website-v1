import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { bookingsApi } from '../api';
import { PageLoader } from '../components/LoadingSpinner';
import { Button } from '../components/Button';
import type { Booking } from '../types';

const ConfirmationPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId) return;

      try {
        const data = await bookingsApi.getById(bookingId);
        setBooking(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (isLoading) {
    return <PageLoader />;
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-serif text-stone-900 mb-4">Booking Confirmed!</h1>
        <p className="text-stone-500 mb-8">
          Thank you for choosing Seasons. Your reservation has been confirmed and a confirmation
          email has been sent to your registered email address.
        </p>

        {booking && (
          <div className="bg-white p-8 shadow-lg text-left mb-8">
            <h2 className="text-lg font-serif text-stone-900 mb-6 text-center">
              Reservation Details
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-stone-100">
                <span className="text-stone-500">Confirmation Number</span>
                <span className="text-stone-900 font-mono text-sm">{booking._id}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-stone-100">
                <span className="text-stone-500">Check-in</span>
                <span className="text-stone-900">{formatDate(booking.checkIn)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-stone-100">
                <span className="text-stone-500">Check-out</span>
                <span className="text-stone-900">{formatDate(booking.checkOut)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-stone-100">
                <span className="text-stone-500">Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded">
                  {booking.status}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-stone-500">Total Paid</span>
                <span className="text-gold-600 font-serif text-xl">
                  ₹{booking.totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
          <Link to="/hotels">
            <Button variant="primary">Browse More Hotels</Button>
          </Link>
        </div>

        <p className="text-stone-400 text-sm mt-12">
          Need help? Contact us at{' '}
          <a href="mailto:support@seasons-hotels.com" className="text-gold-600 hover:underline">
            support@seasons-hotels.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
