import DividerWithText from '@/app/ui/components/DividerWithText';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import Link from 'next/link';
import {Button} from '@/app/ui/button';
import CFASignupPrompt from '@/app/ui/components/CFASignupPrompt';

export default function JobseekerSignupPage(){
    return(
      <main className="max-w-screen-sm-tablet mx-auto laptop:flex laptop:flex-row laptop:gap-8 laptop:max-w-full">
        <CFASignupPrompt/>
        <section className="px-8 w-full laptop:pt-24">
          <Button className='w-full'>Google Sign-in Placeholder</Button>
          <DividerWithText className='py-8'>or</DividerWithText>
          <div className='text-center flex flex-col gap-2'>
            <p>Already have a CFA account?</p>
            <Link className='text-blue-500' href="/login">Login</Link>
          </div>
        </section>
      </main>
    );
}