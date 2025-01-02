'use client';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function SignOutPage() {
  useEffect(() => {
    signOut({redirectTo: '/'});
  }, []);
  return <></>;
}
