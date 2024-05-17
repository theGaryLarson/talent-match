import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import CFAHeader from './ui/CFAHeader';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}><CFAHeader/>{children}</body>
    </html>
  );
}
