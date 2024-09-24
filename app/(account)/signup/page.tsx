'use client';

import React, { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import Link from 'next/link';
import DividerWithText from '@/app/ui/components/DividerWithText';
import Image from 'next/image';
import CFAFooter from '@/app/ui/CFAFooter';
import CFASignupHeader from '@/app/ui/CFASignupHeader';
import { useSession } from 'next-auth/react';
import { useUpdateSession } from '@/app/lib/auth/useUpdateSession';
import { useRouter } from 'next/navigation';
import { Role } from '@/data/dtos/UserInfoDTO';
import { mapToEnumOrThrow } from '@/app/lib/utils';

// interface Data {
//   userId: string;
//   role: string;
// }

export default function SignupPage() {
  const [choice, setChoice] = useState('');
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const checkIcon = (
    <Image
      src="/cfa_images/signup/check-mark.png"
      width={22}
      height={22}
      alt="Green checkmark"
      className="mr-2 inline"
    />
  );
  const updateSessionProperties = useUpdateSession();

  useEffect(() => {
    // Prefetch the potential pages when the component mounts
    router.prefetch('/signup/jobseeker');
    router.prefetch('/signup/employer');
  }, [router]);

  let handleSubmit = async () => {
    let newRole = choice === 'employer' ? Role.EMPLOYER : Role.JOBSEEKER;
    if (session) {
      let response = await fetch('/api/users/role/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          role: newRole,
        }),
      });
      console.log('response:', response);
      if (response.ok) {
        let rolesArray = [mapToEnumOrThrow(newRole, Role)] as Role[];
        await updateSessionProperties({
          roles: rolesArray,
        });
        if (newRole === Role.JOBSEEKER) router.push(`/signup/jobseeker`);
        if (newRole === Role.EMPLOYER) router.push(`/signup/employer`);
      }
    }
  };

  return (
    <>
      <CFASignupHeader />
      <main className="flex flex-col gap-9 py-8">
        <h1 className="text-center text-4xl">Create account</h1>
        <fieldset className="flex flex-col items-center justify-center gap-8 sm-tablet:flex-row">
          <legend className="pb-4 w-full text-center">Select your role first</legend>
          <div>
            <input
              type="radio"
              name="account-role"
              id="account-employer"
              onClick={() => setChoice('employer')}
              className="peer hidden"
            />
            <label
              htmlFor="account-employer"
              className="relative block h-[180px] w-[200px] cursor-pointer rounded-md border-2 bg-white hover:bg-gray-100 peer-checked:border-primary-500 peer-checked:bg-primary-25"
            >
              <Image
                src="/cfa_images/signup/icon-employer.png"
                width={80}
                height={80}
                alt="Icon of a briefcase to represent employers."
                className="mx-auto py-6"
              />
              <p className="text-center">
                {choice === 'employer' && checkIcon}An employer
              </p>
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="account-role"
              id="account-jobseeker"
              onClick={() => setChoice('jobseeker')}
              className="peer hidden"
            />
            <label
              htmlFor="account-jobseeker"
              className="relative block h-[180px] w-[200px] cursor-pointer rounded-md border-2 bg-white hover:bg-gray-100 peer-checked:border-primary-500 peer-checked:bg-primary-25"
            >
              <Image
                src="/cfa_images/signup/icon-jobseeker.png"
                width={80}
                height={80}
                alt="Icon of a magnifying class to represent jobseekers."
                className="mx-auto py-6"
              />
              <p className="text-center">
                {choice === 'jobseeker' && checkIcon}A job candidate
              </p>
            </label>
          </div>
        </fieldset>
        <Button
          disabled={choice === ''}
          onClick={handleSubmit}
          className="mx-auto mt-4 w-fit rounded-3xl focus:ring-0"
        >
          Continue
        </Button>

      </main>
      <footer className="mt-auto">
        <CFAFooter />
      </footer>
    </>
  );
}
