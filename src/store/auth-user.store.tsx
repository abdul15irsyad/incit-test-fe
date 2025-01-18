import { AxiosResponse } from 'axios';
import { create } from 'zustand';

import {
  login,
  logout,
  register,
  RegisterInput,
  RegisterResponse,
} from '@/utils/auth';
import { profile } from '@/utils/profile';

export interface IUser {
  id: string;
  name: string;
  email: string;
  isHavePassword: boolean;
}

export interface IAuthUser {
  user?: IUser;
  setUser: (user: IUser) => void;
  init: () => void;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (
    data: RegisterInput,
  ) => Promise<AxiosResponse<RegisterResponse, any>>;
  logout: () => Promise<void>;
}

export const useAuthUserStore = create<IAuthUser>((set) => {
  const init = async () => {
    const response = await profile();
    set({ user: response.data.data });
  };
  return {
    user: undefined,
    setUser: (user) => set({ user }),
    init,
    login: async (data) => {
      await login(data);
      await init();
    },
    register,
    logout: async () => {
      await logout();
      set({ user: undefined });
    },
  };
});
