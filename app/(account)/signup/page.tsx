import React from 'react';
import Link from 'next/link';
import DividerWithText from '@/app/ui/components/DividerWithText';
import { Button } from '@/app/ui/button';

export default function SignupPage() {
  return (
    <main>
      <h1>Create account</h1>
      <form>
        <fieldset>
          <legend>Select your role first</legend>
          <label>An employer <input type="radio" name="account-role" value="employer"/></label>
          <label>A job seeker <input type="radio" name="account-role" value="jobseeker"/></label>
        </fieldset>
        <Button type="submit">Continue</Button>
      </form>
      <DividerWithText>or</DividerWithText>
      <div>
        <p>Already have a CFA account?</p>
        <Link href="/">Login</Link>
      </div>
    </main>
  );
};
