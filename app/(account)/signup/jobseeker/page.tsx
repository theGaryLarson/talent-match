'use client';

import DividerWithText from '@/app/ui/components/DividerWithText';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import Link from 'next/link';
import { Button } from 'flowbite-react';
import SignupPrompt from '@/app/ui/components/SignupPrompt';
import Image from 'next/image';
import Footer from '@/app/ui/Footer';
import SignupHeader from '@/app/ui/SignupHeader';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUpdateSession } from '@/app/lib/auth/useUpdateSession';
import { useSession } from 'next-auth/react';
import { Role } from '@/data/dtos/UserInfoDTO';
import { mapToEnumOrThrow } from '@/app/lib/utils';
import { v4 as uuidv4 } from 'uuid';

const vectorImgSrc = '/images/signup/jobseeker-vector.png';

export default function JobseekerSignupFinishPage() {
  let [resident, setResident] = useState(false);
  let [termsAgree, setTermsAgree] = useState(false);
  const { data: session, status, update } = useSession();
  const updateSessionProperties = useUpdateSession();
  const router = useRouter();
  return (
    <>
      <SignupHeader />

      <main className="mx-auto max-w-screen-sm-tablet overflow-hidden laptop:mx-0 laptop:flex laptop:max-w-full laptop:flex-row laptop:gap-8">
        <SignupPrompt
          vectorImgSrc={vectorImgSrc}
          prompt={
            'Create a free TWC account to access job guides, 1:1 webinars, jobs & opportunities. (Placeholder)'
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
              disabled={!(resident)}
            >
              <p>Notifications</p>
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
                    className="REPLACE-BEFORE-RELEASE"
                    href="/underconstruction"
                  >
                    terms of use
                  </Link>
                  , and acknowledge you have read the{' '}
                  <Link
                    className="REPLACE-BEFORE-RELEASE"
                    href="/underconstruction"
                  >
                    privacy notice
                  </Link>
                  and{' '}
                  <Link
                    className="REPLACE-BEFORE-RELEASE"
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
              onClick={async (e: FormEvent) => {
                e.preventDefault();
                let response = await fetch('/api/users/role/update', {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    userId: session?.user.id,
                    role: Role.JOBSEEKER,
                  }),
                });
                if (response.ok) {
                  let rolesArray = session?.user.roles || []
                  rolesArray = rolesArray.filter((role: Role) => role !== Role.GUEST)
                  // Add the new role if it's not already in the roles array
                  if (!rolesArray.includes(Role.JOBSEEKER)) {
                    rolesArray.push(Role.JOBSEEKER);
                  }
                  await updateSessionProperties({
                    jobseekerId: uuidv4(),
                    roles: rolesArray,
                  });
                  router.push('/edit-profile/jobseeker/introduction');
              }
            }}
              className="mx-auto my-8 rounded-full focus:ring-0"
              disabled={!(resident && termsAgree)}
            >
              Create account
            </Button>
            {/* <DividerWithText className="py-8">or</DividerWithText>
            <div className="flex flex-col gap-2 text-center">
              <p>Already have a TWC account?</p>
              <Link className="text-blue-500" href="/signin">
                Sign in
              </Link>
            </div> */}
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
        <Footer />
      </footer>
    </>
  );
}
