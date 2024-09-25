'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Divider from '@mui/material/Divider';
import { Button } from 'flowbite-react';

export default function SignupHeader({ className }: { className?: string }) {
  return (
    <header className={'mx-8 bg-white ' + className}>
      <nav
        className="max-w-screen-lg mx-auto flex items-center justify-between py-6 laptop:px-8"
        aria-label="Global"
      >
        <div className="w-1/2">
          <Link href="/">
            <span className="sr-only">Tech Workforce Coalition</span>
            <Image
              src="/images/TWC_75x50_2024.svg"
              alt="Tech Workforce Coalition"
              width={75}
              height={50}
              priority
            />
          </Link>
        </div>
      </nav>
      <Divider className="hidden sm-tablet:block" />
    </header>
  );
}
