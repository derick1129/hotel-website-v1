import apiClient from './client';
import type { Hotel } from '../types';

export const hotelsApi = {
  getAll: async (): Promise<Hotel[]> => {
    const response = await apiClient.get<Hotel[]>('/hotels');
    return response.data;
  },

  getById: async (id: string): Promise<Hotel> => {
    const response = await apiClient.get<Hotel>(`/hotels/${id}`);
    return response.data;
  },
};

export default hotelsApi;
