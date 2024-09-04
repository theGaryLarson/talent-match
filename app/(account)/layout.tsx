import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import CFASignupHeader from '@/app/ui/CFASignupHeader';


export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}><CFASignupHeader/>{children}</body>
    </html>
  );
}
