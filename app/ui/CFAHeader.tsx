import Link from 'next/link';
import NavLinks from '@/app/ui/employer-dashboard/nav-links';
import AcmeLogo from '@/app/ui/cfa-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function CFAHeader() {
  return (
    <div className="flex h-full flex-row px-3 py-4 md:px-2">
      <Link
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>

      <div className="flex flex-grow justify-end items-center space-x-4 md:space-x-2">
        <NavLinks/>
        
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-12 items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
