import { Metadata } from 'next';
import React from 'react';

import { VerifyEmailContent } from '@/contents/verify-email';

export const metadata: Metadata = {
  title: 'Verify Email - INCIT Test',
};

export default () => {
  return <VerifyEmailContent />;
};
