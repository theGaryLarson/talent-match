import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import Header from '@/app/ui/Header';
import Footer from '@/app/ui/Footer';
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

          {/* adding this flex stuff so the footer is always at the bottom of the screen */}
          <div className="flex flex-col h-screen">          
            <Header />
            
            <div className="flex-grow">
              {children}
            </div>

            <Footer />
          </div>

        </SessionProvider>
      </body>
    </html >
  );
}
