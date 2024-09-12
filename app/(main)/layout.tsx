import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import CFAHeader from '@/app/ui/CFAHeader';
import CFAFooter from '@/app/ui/CFAFooter';
import { SessionProvider } from 'next-auth/react';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>
          <CFAHeader />
          {children}
          <CFAFooter />
        </SessionProvider>
      </body>
    </html>
  );
}
