'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuthUserStore } from '@/store/auth-user.store';
import { updateProfile } from '@/utils/profile';

export const UpdateProfileContent = () => {
  const router = useRouter();
  const { user, setUser } = useAuthUserStore();

  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    name: user?.name ?? '',
  };

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(1, 'Name is required'),
      }),
    [],
  );
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onSubmit',
  });

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await updateProfile(data);
      setUser({ ...user!, ...data! });
      router.push('/dashboard');
      enqueueSnackbar({
        variant: 'success',
        message: response?.data?.message,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data?.code === 'VALIDATION_ERROR') {
          error.response?.data?.errors?.forEach((error: any) =>
            setError?.(error?.property, {
              type: 'value',
              message: Object.values(error.constraints)[0] as string,
            }),
          );
        } else {
          enqueueSnackbar({
            variant: 'error',
            message: error?.response?.data?.message ?? error?.message,
          });
        }
      }
    }
  });

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-3">
            Update Profile
          </h1>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className={`bg-gray-50 border ${errors.name ? 'border-red-500 ' : 'border-gray-300 dark:border-gray-600'} focus:outline-none text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white`}
                placeholder="your name"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 ms-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Link
                type="button"
                href="/dashboard"
                className="text-white dark:bg-none hover:bg-gray-700 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                <span>Cancel</span>
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-white bg-blue-600 hover:bg-blue-700 dark:disabled:bg-gray-700 dark:disabled:text-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <span>{isSubmitting ? 'Loading...' : 'Save'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
