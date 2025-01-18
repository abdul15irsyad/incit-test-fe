'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { updatePassword } from '@/utils/profile';
import { strongPasswordRegex } from '@/utils/string';

export const UpdateProfilePasswordContent = () => {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const schema = useMemo(
    () =>
      z
        .object({
          oldPassword: z.string().min(1, 'Old Password is required'),
          newPassword: z
            .string()
            .min(8, 'Password must be at least 8 characters long')
            .regex(
              strongPasswordRegex,
              'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
            ),
          confirmPassword: z.string(),
        })
        .refine((data) => data.newPassword === data.confirmPassword, {
          message: "Confirm Password doesn't match",
          path: ['confirmPassword'],
        }),
    [],
  );

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onSubmit',
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updatePassword(data);
      router.push('/dashboard');
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
            Update Password
          </h1>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="oldPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                className={`bg-gray-50 border ${errors.oldPassword ? 'border-red-500 ' : 'border-gray-300 dark:border-gray-600'} focus:outline-none text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white`}
                placeholder="••••••••"
                {...register('oldPassword')}
              />
              {errors.oldPassword && (
                <p className="text-red-500 text-xs mt-1 ms-1">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className={`bg-gray-50 border ${errors.newPassword ? 'border-red-500 ' : 'border-gray-300 dark:border-gray-600'} focus:outline-none text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white`}
                placeholder="••••••••"
                {...register('newPassword')}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1 ms-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="••••••••"
                className={`bg-gray-50 border ${errors.confirmPassword ? 'border-red-500 ' : 'border-gray-300 dark:border-gray-600'} focus:outline-none text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white`}
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 ms-1">
                  {errors.confirmPassword.message}
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
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
