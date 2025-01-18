import axios from 'axios';

import { IUser } from '@/store/auth-user.store';

export const login = async (data: { email: string; password: string }) => {
  return await axios.post(`/api/auth/login`, data);
};

export const logout = async () => {
  return await axios.get(`/api/auth/logout`);
};

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  message: string;
  data: IUser;
}

export const register = async (data: RegisterInput) => {
  return await axios.post<RegisterResponse>(`/api/auth/register`, data);
};
