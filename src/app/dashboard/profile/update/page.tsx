import { Metadata } from 'next';
import React from 'react';

import { UpdateProfileContent } from '@/contents/dashboard/update-profile';

export const metadata: Metadata = {
  title: 'Update Profile - INCIT Test',
};

export default () => {
  return <UpdateProfileContent />;
};
