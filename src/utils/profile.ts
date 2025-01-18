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

export interface SetPasswordProps {
  newPassword: string;
  confirmPassword: string;
}

export const setPassword = async (data: SetPasswordProps) => {
  return await axios.patch('/api/profile/set-password', data, {
    withCredentials: true,
  });
};

export interface UpdatePasswordProps {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const updatePassword = async (data: UpdatePasswordProps) => {
  return await axios.patch('/api/profile/update-password', data, {
    withCredentials: true,
  });
};

export type UpdateProfileProps = Pick<IUser, 'name'>;

export const updateProfile = async (data: UpdateProfileProps) => {
  return await axios.patch('/api/profile/update', data, {
    withCredentials: true,
  });
};
