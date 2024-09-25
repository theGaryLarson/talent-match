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
import { useSession } from 'next-auth/react';
import { useUpdateSession } from '@/app/lib/auth/useUpdateSession';
import { mapToEnumOrThrow } from '@/app/lib/utils';
import { Role } from '@/data/dtos/UserInfoDTO';

export default function EmployerSignUpFinish() {
  let [termsAgree, setTermsAgree] = useState(false);
  let vectorImgSrc = '/images/signup/employer-vector.png';
  const { data: session, status, update } = useSession();
  const updateSessionProperties = useUpdateSession();
  const router = useRouter();
  return (
    <>
      <SignupHeader />

      <main className="mx-auto max-w-screen-sm-tablet overflow-hidden laptop:mx-0 laptop:flex laptop:max-w-full laptop:flex-row laptop:gap-8">
        <SignupPrompt
          vectorImgSrc={vectorImgSrc}
          prompt="It's free to set up your company with WTWC. We work for YOU - providing customized solutions built within your budget to match your unique business needs. (placeholder)"
        />
        <section className="mx-auto w-full px-8 laptop:pt-24 ">
          <form className="mx-auto flex flex-col gap-6 laptop:max-w-screen-sm-tablet">
            <fieldset className="flex flex-col gap-3 disabled:text-gray-400">
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
                    role: Role.EMPLOYER,
                  }),
                });
                // console.log('response:', response);
                if (response.ok) {
                  let rolesArray = [mapToEnumOrThrow(Role.EMPLOYER, Role)] as Role[];
                  await updateSessionProperties({
                    roles: rolesArray,
                  });
                  router.push('/create-profile/employer/personal');
              }
            }}
              className="mx-auto my-8 rounded-full focus:ring-0"
              disabled={!termsAgree}
            >
              Create account
            </Button>
            {/* <DividerWithText className="py-8">or</DividerWithText>
            <div className="flex flex-col gap-2 text-center">
              <p>Already have a WTWC account?</p>
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
