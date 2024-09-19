'use client';

import DividerWithText from '@/app/ui/components/DividerWithText';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import Link from 'next/link';
import { Button } from 'flowbite-react';
import CFASignupPrompt from '@/app/ui/components/CFASignupPrompt';
import Image from 'next/image';
import CFAFooter from '@/app/ui/CFAFooter';
import CFASignupHeader from '@/app/ui/CFASignupHeader';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const vectorImgSrc = '/cfa_images/signup/jobseeker-vector.png';

export default function JobseekerSignupFinishPage() {
  let [resident, setResident] = useState(false);
  let [education, setEducation] = useState(false);
  let [termsAgree, setTermsAgree] = useState(false);
  const router = useRouter();
  return (
    <>
      <CFASignupHeader />

      <main className="mx-auto max-w-screen-sm-tablet overflow-hidden laptop:mx-0 laptop:flex laptop:max-w-full laptop:flex-row laptop:gap-8">
        <CFASignupPrompt
          vectorImgSrc={vectorImgSrc}
          prompt={
            'Create a free CFA account to access job guides, 1:1 webinars, jobs & opportunities. (Placeholder)'
          }
        />
        <section className="mx-auto w-full px-8 laptop:pt-24 ">
          <form className="mx-auto flex flex-col gap-6 laptop:max-w-screen-sm-tablet">
            <fieldset className="flex flex-col gap-3">
              <div className="inline">
                <p className="inline">Are you a Washington State resident? </p>
                <p className="inline text-gray-400">(required)</p>
              </div>
              <label>
                <input
                  type="radio"
                  name="resident"
                  value="yes"
                  onClick={() => setResident(true)}
                />{' '}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="resident"
                  value="no"
                  onClick={() => setResident(false)}
                />{' '}
                No
              </label>
            </fieldset>
            <fieldset
              className="flex flex-col gap-3 disabled:text-gray-400"
              disabled={!resident}
            >
              <div className="inline">
                <p className="inline">Education or Training Status </p>
                <p className="inline text-gray-400">(required)</p>
              </div>
              <label>
                <input
                  type="radio"
                  name="education"
                  value="completed"
                  onClick={() => setEducation(true)}
                />{' '}
                Completed college or technical training within the past 5 years.
              </label>
              <label>
                <input
                  type="radio"
                  name="education"
                  value="nearCompletion"
                  onClick={() => setEducation(true)}
                />{' '}
                Will complete college or technical training program within 1
                year.
              </label>
              <label>
                <input
                  type="radio"
                  name="education"
                  value="neither"
                  onClick={() => setEducation(false)}
                />{' '}
                Neither applies
              </label>
            </fieldset>
            <fieldset
              className="flex flex-col gap-3 disabled:text-gray-400"
              disabled={!(resident && education)}
            >
              <p>Notification</p>
              <div>
                <input type="checkbox" id="jobNotifications" defaultChecked />
                <label htmlFor="jobNotifications">
                  {' '}
                  Receive new job posting notifications
                </label>
              </div>
              <div>
                <input type="checkbox" id="opportunities" />
                <label htmlFor="opportunities">
                  {' '}
                  Hear more about career opportunities
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAgree}
                  onChange={() => setTermsAgree(!termsAgree)}
                />
                <label htmlFor="terms">
                  {' '}
                  By signing up you agree to our{' '}
                  <Link
                    className="text-red-600 underline"
                    href="/underconstruction"
                  >
                    terms of use
                  </Link>
                  , and acknowledge you have read the{' '}
                  <Link
                    className="text-red-600 underline"
                    href="/underconstruction"
                  >
                    privacy notice
                  </Link>
                  and{' '}
                  <Link
                    className="text-red-600 underline"
                    href="/underconstruction"
                  >
                    data sharing agreement
                  </Link>
                  .
                </label>
              </div>
            </fieldset>
            <Button
              type="submit"
              onClick={() =>
                router.push('/create-profile/jobseeker/introduction')
              }
              className="mx-auto my-8 rounded-full focus:ring-0"
              disabled={!(education && resident && termsAgree)}
            >
              Create account
            </Button>
            <DividerWithText className="py-8">or</DividerWithText>
            <div className="flex flex-col gap-2 text-center">
              <p>Already have a CFA account?</p>
              <Link className="text-blue-500" href="/signin">
                Sign in
              </Link>
            </div>
          </form>
        </section>
        <Image
          src={vectorImgSrc}
          width={1092}
          height={1040}
          className="hidden h-1/2 pt-16 sm-tablet:block laptop:hidden"
          alt="Art of jobseeker"
        />
      </main>

      <footer className="mt-auto pt-8 sm-tablet:hidden">
        <CFAFooter />
      </footer>
    </>
  );
}
