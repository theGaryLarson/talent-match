'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import '@/app/ui/global.css';
import '@/app/ui/profile-creation.css';
import { inter } from '@/app/ui/fonts';
import ProfileCreationHeader from '@/app/ui/ProfileCreationHeader';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// REVIEW: You can locate the store in the layout component if all the routes using that layout need the store.
import EmployerStoreProvider from '../../../EmployerStoreProvider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { SessionProvider } from 'next-auth/react';

export default function ProfileCreationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
          <AppRouterCacheProvider>
            <SessionProvider>
              <ProfileCreationHeader />
              <EmployerStoreProvider>{children}</EmployerStoreProvider>
            </SessionProvider>
          </AppRouterCacheProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
