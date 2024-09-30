'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Role } from '@/data/dtos/UserInfoDTO';
import { SessionProvider } from 'next-auth/react';

export default function ProfileCreationHeader() {
  const { data: session } = useSession();
  const dashboardLink = session?.user.roles.includes(Role.EMPLOYER)
    ? '/services/employer/dashboard'
    : '/services/jobseekers/dashboard';

  return (
    <SessionProvider session={session}>
      <header className="bg-white">
        <nav
          className="mx-auto flex items-center justify-between p-6 laptop:px-8"
          aria-label="Global"
        >
          <div className="flex laptop:flex-1">
            <Link href="/">
              <span className="sr-only">Tech Workforce Coalition</span>
              <Image
                src="/images/TWC_75x50_2024.svg"
                alt="Tech Workforce Coalition"
                width={75}
                height={31.8}
              />
            </Link>
          </div>

          <div className="flex flex-1 justify-end">
            <Link
              className="mt-1 inline-block h-fit rounded-full bg-cyan-600 px-4 py-2 text-white hover:bg-red-800"
              href={dashboardLink}
              target="_self"
            >
              Skip Profile Setup
            </Link>
          </div>
        </nav>
      </header>
    </SessionProvider>
  );
}
