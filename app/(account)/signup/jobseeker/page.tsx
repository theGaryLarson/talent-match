import DividerWithText from '@/app/ui/components/DividerWithText';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import Link from 'next/link';
import {Button} from '@/app/ui/button';
import CFASignupPrompt from '@/app/ui/components/CFASignupPrompt';
import Image from 'next/image';
import CFAFooter from '@/app/ui/CFAFooter';
import CFASignupHeader from '@/app/ui/CFASignupHeader';

export default function JobseekerSignupPage(){
    return(
      <>
      <CFASignupHeader className='laptop:hidden'/>

      <main className="max-w-screen-sm-tablet mx-auto laptop:flex laptop:flex-row laptop:gap-8 laptop:max-w-full">
        <CFASignupPrompt/>
        <section className="px-8 w-full laptop:pt-24">
          <Button className='w-full'>GitHub Sign-in Placeholder</Button>
          <DividerWithText className='py-8'>or</DividerWithText>
          <div className='text-center flex flex-col gap-2'>
            <p>Already have a CFA account?</p>
            <Link className='text-blue-500' href="/login">Login</Link>
          </div>
          
        </section>
        <Image src='/cfa_images/signup/jobseeker-vector.png' width={1092} height={1040} className='pt-16 h-1/2 hidden sm-tablet:block laptop:hidden' alt='Art of jobseeker'/>
      </main>
      
      <footer className='absolute w-full bottom-0 sm-tablet:hidden'><CFAFooter></CFAFooter></footer>
      </>
    );
}