import { Metadata } from 'next';
import React from 'react';

import { LoginContent } from '@/contents/auth/login';

export const metadata: Metadata = {
  title: 'Login - INCIT Test',
};

export default () => {
  return <LoginContent />;
};
