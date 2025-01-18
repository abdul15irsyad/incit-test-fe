'use client';

import { SnackbarProvider } from 'notistack';
import React, { ReactNode } from 'react';

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {children}
    </SnackbarProvider>
  );
};
