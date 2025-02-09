import axiosClient from './axios';
import { IUser } from '@/models/User';

export type UserResponse = Omit<IUser, 'password'>;
import { IWithdrawal } from '@/models/withdrawal';

export type WithdrawalResponse = Omit<IWithdrawal, 'user'>;

export const api = {
  /**
   * Get current user information
   * @returns Promise with user data
   */
  async getMe() {
    const response = await axiosClient.get<UserResponse>('/me');
    return response.data;
  },

  async getTasks (){
    const response = await axiosClient.get('/tasks');
    return response.data;
  }
,

  /**
   * Create a new withdrawal request
   * @param amount
   * @returns
   */
  async withdraw(amount: number , paymentMethod : string , paymentDetails : string) {
    const response = await axiosClient.post<WithdrawalResponse>('/withdraw', { amount , paymentMethod , paymentDetails });
    return response.data;
  }
};
`` 