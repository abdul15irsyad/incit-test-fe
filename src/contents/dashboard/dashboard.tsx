'use client';

import { IconCircleCheck } from '@tabler/icons-react';
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
          <div className="px-4 pt-4 pb-6">
            {user ? (
              <>
                <div className="text-center mb-4">
                  <div className="py-2">
                    <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                      {user?.name}
                    </h3>
                    <div className="flex justify-center items-center gap-1">
                      {user?.emailVerifiedAt && (
                        <div className="relative group">
                          <IconCircleCheck
                            size={18}
                            className="text-green-300 mt-0.5"
                          />
                          <div className="absolute hidden px-2 py-1 text-xs text-gray-300 bg-gray-800 border dark:border-gray-700 rounded group-hover:block">
                            verified
                          </div>
                        </div>
                      )}
                      <span className="dark:text-gray-500">{user?.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-2">
                  <Link
                    href="/dashboard/profile/update"
                    className="text-sm rounded-lg justify-center items-center gap-1 dark:bg-blue-600 dark:hover:bg-blue-700 text-black dark:text-white px-5 py-2.5 text-center"
                  >
                    Update Profile
                  </Link>
                  <Link
                    href="/dashboard/profile/update-password"
                    className="text-sm rounded-lg justify-center items-center gap-1 dark:bg-blue-600 dark:hover:bg-blue-700 text-black dark:text-white px-5 py-2.5 text-center"
                  >
                    {user?.isHavePassword ? 'Update' : 'Set'} Password
                  </Link>
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
