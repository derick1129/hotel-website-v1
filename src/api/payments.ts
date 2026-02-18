import apiClient from './client';
import type { CreateOrderResponse, VerifyPaymentRequest } from '../types';

export const paymentsApi = {
  createOrder: async (bookingId: string): Promise<CreateOrderResponse> => {
    const response = await apiClient.post<CreateOrderResponse>('/payments/create-order', {
      bookingId,
    });
    return response.data;
  },

  verify: async (paymentData: VerifyPaymentRequest): Promise<{ success: boolean }> => {
    const response = await apiClient.post<{ success: boolean }>('/payments/verify', paymentData);
    return response.data;
  },
};

export default paymentsApi;
