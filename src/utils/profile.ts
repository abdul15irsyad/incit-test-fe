import axios from 'axios';

import { IUser } from '@/store/auth-user.store';

export interface ProfileResponse {
  message: string;
  data: IUser;
}

export const profile = async () => {
  return await axios.get<ProfileResponse>('/api/profile', {
    withCredentials: true,
  });
};

export interface UpdatePasswordProps {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const updatePassword = async (data: UpdatePasswordProps) => {
  return await axios.post('/api/profile/update-password', data, {
    withCredentials: true,
  });
};
