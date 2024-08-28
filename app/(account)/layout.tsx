import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import CFASignupHeader from '@/app/ui/CFASignupHeader';
import CFASignupFooter from '../ui/components/CFASignupFooter';


export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}><CFASignupHeader className='laptop:hidden'/>{children} <CFASignupFooter className='sm-tablet:hidden'/></body>
    </html>
  );
}
