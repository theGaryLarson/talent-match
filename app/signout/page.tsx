import { signOut, auth } from '@/auth';
import { redirect } from 'next/dist/server/api-utils';

export default function SignOutPage() {
  return (
    <div>
      <h5>Are you sure you want to sign out?</h5>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
