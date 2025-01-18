'use client';

import React, { ReactNode, useEffect } from 'react';

import { useAuthUserStore } from '@/store/auth-user.store';

export default ({ children }: { children: ReactNode }) => {
  const { init } = useAuthUserStore();
  useEffect(() => {
    init();
  }, [init]);
  return <>{children}</>;
};
