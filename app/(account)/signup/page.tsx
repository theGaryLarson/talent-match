'use client';

import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import Link from 'next/link';
import DividerWithText from '@/app/ui/components/DividerWithText';

export default function SignupPage() {
  const [choice, setChoice] = useState("");

  return (
    <main>
      <h1>Create account</h1>
      <fieldset>
        <legend>Select your role first</legend>
        <label className="cursor-pointer">
          An employer
          <input
            type="radio"
            name="account-role"
            onClick={()=>setChoice("employer")}
          />
        </label>
        <label className="cursor-pointer">
          A job seeker
          <input
            type="radio"
            name="account-role"
            onClick={()=>setChoice("jobseeker")}
          />
        </label>
      </fieldset>
      {
        ((choice === "employer")?
          <Button as={Link} href="/signup/employer" className="inline">Continue</Button>
        :
          ((choice === "jobseeker")?
            <Button as={Link} href="/signup/jobseeker" className="inline">Continue</Button>
          :
            <Button disabled>Continue</Button>
          )
        )
      }
      <DividerWithText>or</DividerWithText>
      <div>
        <p>Already have a CFA account?</p>
        <Link href="/login">Login</Link>
      </div>
    </main>
  );
};
