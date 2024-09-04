'use client';

import CFAFooter from '@/app/ui/CFAFooter';
import CfaLogo from '@/app/ui/CFALogo';
import LoginForm from '@/app/ui/login-form';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center tablet:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 tablet:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 tablet:h-36">
          <div className="w-32 text-white tablet:w-36">
            <CfaLogo />
          </div>
        </div>
        <LoginForm />
      </div>
      
      <footer className='absolute bottom-0 w-full laptop:hidden'><CFAFooter></CFAFooter></footer>
    </main>
  );
}
