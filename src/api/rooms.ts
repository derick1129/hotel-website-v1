import apiClient from './client';
import type { Room } from '../types';

export const roomsApi = {
  getByHotel: async (hotelId: string): Promise<Room[]> => {
    const response = await apiClient.get<Room[]>(`/rooms/${hotelId}`);
    return response.data;
  },

  getById: async (roomId: string): Promise<Room> => {
    const response = await apiClient.get<Room>(`/rooms/room/${roomId}`);
    return response.data;
  },
};

export default roomsApi;
