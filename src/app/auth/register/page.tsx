import { Metadata } from 'next';
import React from 'react';

import { RegisterContent } from '@/contents/auth/register';

export const metadata: Metadata = {
  title: 'Register - INCIT Test',
};

export default () => {
  return <RegisterContent />;
};
