'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

import { useAuthUserStore } from '@/store/auth-user.store';

export const DashboardContent = () => {
  const router = useRouter();
  const { user, logout } = useAuthUserStore();

  const handleLogout = useCallback(async () => {
    await logout();
    router.push('/auth/login');
  }, [logout, router]);

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <div className="flex items-center justify-center md:h-screen">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="px-4 py-4">
            {user ? (
              <>
                <div className="text-center mb-4">
                  <div className="py-2">
                    <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                      {user?.name}
                    </h3>
                    <span className="dark:text-gray-500">{user?.email}</span>
                  </div>
                </div>
                <div className="flex justify-center gap-2">
                  <Link
                    href="/dashboard/profile/update-password"
                    className="text-sm rounded-lg justify-center items-center gap-1 dark:bg-blue-600 dark:hover:bg-blue-700 text-black dark:text-white px-5 py-2.5 text-center"
                  >
                    Update Profile
                  </Link>
                  {user.isHavePassword ? (
                    <Link
                      href="/dashboard/profile/update-password"
                      className="text-sm rounded-lg justify-center items-center gap-1 dark:bg-blue-600 dark:hover:bg-blue-700 text-black dark:text-white px-5 py-2.5 text-center"
                    >
                      Update Password
                    </Link>
                  ) : (
                    <Link
                      href="/dashboard/profile/set-password"
                      className="text-sm rounded-lg justify-center items-center gap-1 dark:bg-blue-600 dark:hover:bg-blue-700 text-black dark:text-white px-5 py-2.5 text-center"
                    >
                      Set Password
                    </Link>
                  )}
                  <button
                    className="text-sm rounded-lg justify-center items-center gap-1 dark:hover:border-gray-500 dark:hover:bg-gray-500  text-black dark:text-white px-5 py-2.5 text-center"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center text-white">
                Loading...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
