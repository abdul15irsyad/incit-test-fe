import { Metadata } from 'next';
import React from 'react';

import { DashboardContent } from '@/contents/dashboard/dashboard';

export const metadata: Metadata = {
  title: 'Dashboard - INCIT Test',
};

export default () => {
  return <DashboardContent />;
};
