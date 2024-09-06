"use client";

import DividerWithText from '@/app/ui/components/DividerWithText';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import Link from 'next/link';
import { Button } from 'flowbite-react';
import CFASignupPrompt from '@/app/ui/components/CFASignupPrompt';
import Image from 'next/image';
import CFAFooter from '@/app/ui/CFAFooter';
import CFASignupHeader from '@/app/ui/CFASignupHeader';
import { useState } from 'react';

export default function JobseekerSignupFinishPage(){
    let [resident, setResident] = useState(false);
    let [education, setEducation] = useState(false);
    let [termsAgree, setTermsAgree] = useState(false);
    return(
      <>
      <CFASignupHeader/>

      <main className="max-w-screen-sm-tablet mx-auto laptop:flex laptop:flex-row laptop:gap-8 laptop:max-w-full">
        <CFASignupPrompt/>
        <section className="px-8 mx-auto w-full laptop:pt-24 ">
          <form className='flex flex-col gap-6 laptop:max-w-screen-sm-tablet mx-auto'>
            <fieldset className='flex flex-col gap-3'>
              <div className='inline'>
                <p className='inline'>Are you a Washington State resident? </p>
                <p className='inline text-gray-400'>(required)</p>
              </div>
              <label><input type="radio" name="resident" value="yes" onClick={()=> setResident(true)}/> Yes</label>
              <label><input type="radio" name="resident" value="no" onClick={()=> setResident(false)}/> No</label>
            </fieldset>
            <fieldset className='flex flex-col gap-3 disabled:text-gray-400' disabled={!resident}>
              <div className='inline'>
                <p className='inline'>Education or Training Status </p>
                <p className='inline text-gray-400'>(required)</p>
              </div>
              <label><input type="radio" name="education" value="completed" onClick={()=> setEducation(true)}/> Completed college or technical training within the past 5 years.</label>
              <label><input type="radio" name="education" value="nearCompletion" onClick={()=> setEducation(true)}/> Will complete college or technical training program within 1 year.</label>
              <label><input type="radio" name="education" value="neither" onClick={()=> setEducation(false)}/> Neither applies</label>
            </fieldset>
            <fieldset className='flex flex-col gap-3 disabled:text-gray-400' disabled={!(resident && education)}>
              <p>Notification</p>
              <div>
                <input type="checkbox" id="jobNotifications" defaultChecked/>
                <label htmlFor="jobNotifications"> Receive new job posting notifications</label>
              </div>
              <div>
                <input type="checkbox" id="opportunities"/>
                <label htmlFor='opportunities'> Hear more about career opportunities</label>
              </div>
              <div>
                <input type="checkbox" id="terms" checked={termsAgree} onChange={()=> setTermsAgree(!termsAgree)}/>
                <label htmlFor='terms'> By signing up you agree to our <Link className='text-red-600 underline' href="/">terms of use</Link>,
                  and acknowledge you have read the <Link className='text-red-600 underline' href="/">privacy notice</Link> 
                  and <Link className='text-red-600 underline' href="/">data sharing agreement</Link>.</label>
              </div>
            </fieldset>
            <Button type="submit" className='mx-auto my-8 rounded-full' disabled={!(education && resident && termsAgree)}>Create account</Button>
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