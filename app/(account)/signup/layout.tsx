import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import CFASignupHeader from '@/app/ui/CFASignupHeader';
import CFASignupFooter from '@/app/ui/components/CFASignupFooter';
import CFAFooter from '@/app/ui/CFAFooter';


export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <footer className='sm-tablet:absolute sm-tablet:bottom-0 sm-tablet:w-full'><CFAFooter ></CFAFooter></footer>
    </>
  );
}