import DividerWithText from '@/app/ui/components/DividerWithText';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import Link from 'next/link';
import {Button} from '@/app/ui/button';
import CFASignupPrompt from '@/app/ui/components/CFASignupPrompt';
import Image from 'next/image';
import CFAFooter from '@/app/ui/CFAFooter';
import CFASignupHeader from '@/app/ui/CFASignupHeader';

export default function JobseekerSignupFinishPage(){
    return(
      <>
      <CFASignupHeader/>

      <main className="max-w-screen-sm-tablet mx-auto laptop:flex laptop:flex-row laptop:gap-8 laptop:max-w-full">
        <CFASignupPrompt/>
        <section className="px-8 mx-auto w-full laptop:pt-24 ">
          <form className='flex flex-col gap-4 laptop:max-w-screen-sm-tablet mx-auto'>
            <fieldset className='flex flex-col gap-4'>
              <legend>What best describes you currently?</legend>
              <div>
                <label><input type="radio" value="a"/> Label</label>
              </div>
              <div>
                <label><input type="radio" value="b"/> Label</label>
              </div>
              <div>
                <label><input type="radio" value="c"/> Label</label>
              </div>
            </fieldset>
            <fieldset className='flex flex-col gap-4'>
              <legend>Notification</legend>
              <div>
                <label><input type="checkbox" value="a" defaultChecked/> Receive new job posting notifications</label>
              </div>
              <div>
                <label><input type="checkbox" value="b"/> Hear more about career opportunities</label>
              </div>
              <div>
                <label><input type="checkbox" value="c"/> By signing up you agree to our <Link className='text-red-600 underline' href="/">terms of use</Link>,
                                                          and acknowledge you have read the <Link className='text-red-600 underline' href="/">privacy notice</Link> 
                                                          and <Link className='text-red-600 underline' href="/">data sharing agreement</Link>.</label>
              </div>
            </fieldset>
            <Button type="submit" className='mx-auto my-8 rounded-full'>Create account</Button>
            <DividerWithText className='py-8'>or</DividerWithText>
            <div className='text-center flex flex-col gap-2'>
              <p>Already have a CFA account?</p>
              <Link className='text-blue-500' href="/login">Login</Link>
            </div>
          </form>
          
        </section>
        <Image src='/cfa_images/signup/jobseeker-vector.png' width={1092} height={1040} className='pt-16 h-1/2 hidden sm-tablet:block laptop:hidden' alt='Art of jobseeker'/>
      </main>
      
      <footer className='pt-8 sm-tablet:hidden'><CFAFooter></CFAFooter></footer>
      </>
    );
}