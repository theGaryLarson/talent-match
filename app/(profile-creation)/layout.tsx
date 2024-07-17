import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import CFAProfileCreationHeader from '@/app/ui/CFAProfileCreationHeader';


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
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
