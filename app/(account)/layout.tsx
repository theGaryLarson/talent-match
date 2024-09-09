import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import CFASignupHeader from '@/app/ui/CFASignupHeader';
import { SessionProvider } from "next-auth/react"


export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
