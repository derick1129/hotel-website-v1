import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { bookingsApi, paymentsApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { PageLoader, LoadingSpinner } from '../components/LoadingSpinner';
import type { Booking, RazorpayResponse } from '../types';

// Load Razorpay script
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const PaymentPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchBooking = async () => {
      if (!bookingId) return;

      try {
        const data = await bookingsApi.getById(bookingId);
        
        if (data.status === 'CONFIRMED') {
          navigate(`/confirmation/${bookingId}`);
          return;
        }
        
        setBooking(data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load booking details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, isAuthenticated, navigate]);

  const handlePayment = useCallback(async () => {
    if (!booking || !bookingId) return;

    setIsProcessing(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load payment gateway');
      }

      // Create order
      const orderData = await paymentsApi.createOrder(bookingId);

      // Open Razorpay checkout
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Seasons Hotels',
        description: 'Hotel Booking Payment',
        order_id: orderData.orderId,
        handler: async (response: RazorpayResponse) => {
          try {
            // Verify payment
            await paymentsApi.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId,
            });

            toast.success('Payment successful!');
            navigate(`/confirmation/${bookingId}`);
          } catch (err) {
            console.error(err);
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: {
          color: '#B8860B',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      toast.error('Failed to initiate payment');
    } finally {
      setIsProcessing(false);
    }
  }, [booking, bookingId, user, navigate]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Booking not found</p>
          <Link to="/hotels" className="text-gold-600 hover:text-gold-700 underline">
            Browse Hotels
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-stone-900 text-white py-12 px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif">Complete Payment</h1>
          <p className="text-stone-400 mt-2">Secure payment powered by Razorpay</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-serif text-stone-900 mb-6">Booking Details</h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b border-stone-100">
                <span className="text-stone-500">Booking ID</span>
                <span className="text-stone-900 font-mono text-sm">{booking._id}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-stone-100">
                <span className="text-stone-500">Check-in</span>
                <span className="text-stone-900">{formatDate(booking.checkIn)}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-stone-100">
                <span className="text-stone-500">Check-out</span>
                <span className="text-stone-900">{formatDate(booking.checkOut)}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-stone-100">
                <span className="text-stone-500">Status</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded">
                  {booking.status}
                </span>
              </div>
              <div className="flex justify-between py-4">
                <span className="text-stone-900 font-medium text-lg">Total Amount</span>
                <span className="text-gold-600 font-serif text-2xl">
                  ₹{booking.totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              variant="primary"
              className="w-full"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <LoadingSpinner size="sm" />
              ) : (
                `Pay ₹${booking.totalPrice.toLocaleString()}`
              )}
            </Button>

            <p className="text-center text-stone-400 text-xs mt-6">
              By proceeding, you agree to our terms and conditions. Your payment is secured with 256-bit encryption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
