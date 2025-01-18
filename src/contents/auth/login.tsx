'use client';

import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useAuthUserStore } from '@/store/auth-user.store';

export const LoginContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('return-to');

  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    email: '',
    password: '',
  };

  const {
    resetField,
    setError,
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm({
    defaultValues,
    mode: 'onSubmit',
  });

  const { login } = useAuthUserStore();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login(data);
      router.push(returnTo ?? '/dashboard');
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.data?.code === 'VALIDATION_ERROR') {
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
      resetField('password');
    }
  });

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-3">
            Login to your account
          </h1>
          <div className="flex justify-between gap-4">
            <Link
              href="/api/auth/google"
              className="text-white w-full flex justify-center items-center gap-1 border border-white focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center dark:border-white"
            >
              <IconBrandGoogle size="20" />
              Google
            </Link>
            <Link
              href="/api/auth/facebook"
              className="text-white w-full flex justify-center items-center gap-1 border border-white focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center dark:border-white"
            >
              <IconBrandFacebook size="20" />
              Facebook
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <hr className="flex-1 border-t border-gray-300 dark:border-gray-500" />
            <span className="mx-3 text-gray-200 dark:text-gray-500">OR</span>
            <hr className="flex-1 border-t border-gray-300 dark:border-gray-500" />
          </div>
          <form className="space-y-4" onSubmit={onSubmit}>
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
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="example@email.com"
                {...register('email')}
              />
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
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register('password')}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <span>{isSubmitting ? 'Loading...' : 'Login'}</span>
            </button>
            <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
              Don&apos;t have an account yet?{' '}
              <Link
                href="/auth/register"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
