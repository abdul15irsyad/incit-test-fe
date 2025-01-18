import { Metadata } from 'next';
import React from 'react';

import { UpdateProfilePasswordContent } from '@/contents/dashboard/update-profile-password';

export const metadata: Metadata = {
  title: 'Update Password - INCIT Test',
};

export default () => {
  return <UpdateProfilePasswordContent />;
};
