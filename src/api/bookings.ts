import apiClient from './client';
import type { Booking, CreateBookingRequest } from '../types';

export const bookingsApi = {
  create: async (booking: CreateBookingRequest): Promise<Booking> => {
    const response = await apiClient.post<Booking>('/bookings', booking);
    return response.data;
  },

  getById: async (id: string): Promise<Booking> => {
    const response = await apiClient.get<Booking>(`/bookings/${id}`);
    return response.data;
  },

  getUserBookings: async (): Promise<Booking[]> => {
    const response = await apiClient.get<Booking[]>('/bookings/user');
    return response.data;
  },
};

export default bookingsApi;
