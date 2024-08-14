import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import '@/app/ui/global.css';
import '@/app/ui/profile-creation.css';
import { inter } from '@/app/ui/fonts';
import CFAProfileCreationHeader from '@/app/ui/CFAProfileCreationHeader';

// REVIEW: You can locate the store in the layout component if all the routes using that layout need the store. 
import StoreProvider from '../StoreProvider';

export default function ProfileCreationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AppRouterCacheProvider>
          <CFAProfileCreationHeader/>
          <StoreProvider>
            {children}
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
