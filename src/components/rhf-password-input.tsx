import React, { InputHTMLAttributes, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export const RHFPasswordInput = ({
  name,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <Controller
      name={name!}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <div className="relative w-full max-w-sm">
            <input
              {...field}
              autoComplete="off"
              type={showPassword ? 'text' : 'password'}
              className={`bg-gray-50 border ${error ? 'border-red-500 ' : 'border-gray-300 dark:border-gray-600'} focus:outline-none text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-500 dark:text-white`}
              placeholder="••••••••"
              {...props}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              <svg
                id="eye-icon"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {!showPassword ? (
                  <>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.886 2.514-3.021 4.686-5.73 5.687a8.717 8.717 0 01-3.812.813c-4.478 0-8.268-2.943-9.542-7z"
                    />
                  </>
                ) : (
                  <>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.886 2.514-3.021 4.686-5.73 5.687a8.717 8.717 0 01-3.812.813c-4.478 0-8.268-2.943-9.542-7z"
                    />
                    <line
                      x1="3"
                      y1="21"
                      x2="21"
                      y2="3"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-width="2"
                    />
                  </>
                )}
              </svg>
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-xs mt-1 ms-1">{error.message}</p>
          )}
        </>
      )}
    />
  );
};
