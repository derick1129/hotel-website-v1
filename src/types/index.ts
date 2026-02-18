// UI types
export interface NavItem {
  label: string;
  href?: string;
  to?: string;
  children?: NavItem[];
}

// User types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'guest' | 'admin';
}

export interface AuthResponse {
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

// Hotel types
export interface Hotel {
  _id: string;
  name: string;
  location: string;
  description?: string;
  amenities?: string[];
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

// Room types
export interface Room {
  _id: string;
  hotelId: string;
  roomType: string;
  pricePerNight: number;
  maxGuests: number;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

// Booking types
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export interface Booking {
  _id: string;
  userId: string;
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: BookingStatus;
}

export interface CreateBookingRequest {
  roomId: string;
  checkIn: string;
  checkOut: string;
}

// Payment types
export interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  key: string;
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  bookingId: string;
}

// Razorpay types
export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
  };
  theme?: {
    color?: string;
  };
}

export interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

// API Response wrapper
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
