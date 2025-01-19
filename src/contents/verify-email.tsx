'use client';

import { IconCircleCheck, IconCircleX } from '@tabler/icons-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export const VerifyEmailContent = () => {
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0">
      <div className="w-full flex justify-between items-center bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 p-5">
        <div className="flex gap-1 text-white">
          {searchParams.get('status') === 'success' ? (
            <>
              <IconCircleCheck size={20} className="text-green-300 mt-0.5" />
              <h4>{searchParams.get('message')}</h4>
            </>
          ) : (
            <>
              <IconCircleX size={20} className="text-red-300 mt-0.5" />
              <h4>{searchParams.get('message')}</h4>
            </>
          )}
        </div>
        <Link
          href="/dashboard"
          className="text-white bg-blue-600 hover:bg-blue-700 dark:disabled:bg-gray-700 dark:disabled:text-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
};
