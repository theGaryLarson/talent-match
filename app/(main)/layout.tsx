import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import Header from '@/app/ui/Header';
import Footer from '@/app/ui/Footer';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/mui.theme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SessionProvider>
          {/* <ThemeProvider theme={theme}>
            <CssBaseline /> */}
          {/* adding this flex stuff so the footer is always at the bottom of the screen */}

          <div className="flex h-screen flex-col">
            <Header />

            <div className="flex-grow">{children}</div>

            <Footer />
          </div>
          {/* </ThemeProvider> */}
        </SessionProvider>
      </body>
    </html>
  );
}
