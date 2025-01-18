'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuthUserStore } from '@/store/auth-user.store';
import { strongPasswordRegex } from '@/utils/string';

const schema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        strongPasswordRegex,
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character',
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password doesn't match",
    path: ['confirmPassword'],
  });

export const RegisterContent = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

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

  const { register: doRegister } = useAuthUserStore();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await doRegister(data);
      router.push('/auth/login');
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
            Register
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
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className={`bg-gray-50 border ${errors.email ? 'border-red-500 ' : 'border-gray-300 dark:border-gray-600'} focus:outline-none text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white`}
                placeholder="example@email.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 ms-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className={`bg-gray-50 border ${errors.password ? 'border-red-500 ' : 'border-gray-300 dark:border-gray-600'} focus:outline-none text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white`}
                {...register('password')}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 ms-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
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
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <span>{isSubmitting ? 'Loading...' : 'Register'}</span>
            </button>
            <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
