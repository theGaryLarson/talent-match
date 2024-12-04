'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Transition,
} from '@headlessui/react';
import {
  Bars3Icon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import AccountMenu from './components/mui/AccountMenu';

// const forStudentsDropDownInfo = [
//   { name: 'Pre-Apprenticeship Program', description: 'Learn Web Development', href: '/pre-apprenticeship', icon: CursorArrowRaysIcon },
//   { name: 'Project Factory', description: 'Build Projects with guidance from mentors Coming Soon', href: '/underconstruction', icon: FingerPrintIcon }
// ]

type LinkItem = {
  name: string;
  href: string;
  target?: string;
  rel?: string;
};

const TopLevelLinks: LinkItem[] = [
  { name: 'Talent Showcase', href: '/services/talent-search' },
  { name: 'For Employers', href: '/services/employers' },
  { name: 'For Job Seekers', href: '/services/jobseekers' },
  { name: 'Careers', href: '/services/careers' },
  /*{
    name: 'Find a Job',
    href: 'https://cfajobs.powerappsportals.com/',
    target: '_blank',
    rel: 'oopener noreferrer',
  },
  {
    name: 'Join Our Community',
    href: 'https://forum.watechwfcoalition.org/',
    target: '_blank',
    rel: 'oopener noreferrer',
  },*/
  { name: 'About Us', href: '/about-us' },
  // { name: 'Explore', href: '/underconstruction' },
  // {
  //   name: "Contact Us",
  //   href: "/underconstruction"
  // }
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerTW, setHeaderTW] = useState('');
  const pathname = usePathname();
  useEffect(() => {
    // Do something here...
    setMobileMenuOpen(false);
    if (
      pathname == '/services/jobseekers' ||
      pathname == '/services/employers'
    ) {
      setHeaderTW('w-full z-10 absolute text-white');
    } else if (pathname.startsWith('/services/training-programs/')) {
      setHeaderTW('bg-[#003350] text-white')
    } else {
      setHeaderTW('bg-white');
    }
  }, [pathname]);

  return (
    <header className={headerTW}>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet"
      ></link>
      <nav
        className="mx-auto flex items-center justify-between p-4 laptop:px-8"
        aria-label="Global"
      >
        <div className="flex shrink">
          {pathname == '/services/jobseekers' ||
          pathname == '/services/employers' ||
          pathname.startsWith('/services/training-programs/') ? (
            <Link href="/">
              <span className="sr-only">Tech Workforce Coalition</span>
              <Image
                src="/images/TWC logo_White.svg"
                alt="Tech Workforce Coalition"
                width={75}
                height={31.8}
              />
            </Link>
          ) : (
            <Link href="/">
              <span className="sr-only">Tech Workforce Coalition</span>
              <Image
                src="/images/TWC_75x50_2024.svg"
                alt="Tech Workforce Coalition"
                width={75}
                height={31.8}
              />
            </Link>
          )}
        </div>

        <PopoverGroup className="hidden items-center tablet:flex tablet:gap-x-12">
          {/* <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6">
              For Students
              <ChevronDownIcon className="h-5 w-5 flex-none" aria-hidden="true" />
            </PopoverButton>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                {({ close }) => (
                  <><div className="p-4" onMouseLeave={() => { close() }}>
                    {forStudentsDropDownInfo.map((item) => (
                      <Link key={item.name} href={item.href} className="block font-semibold  text-black" onClick={() => { close() }}>
                        <div

                          className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                        >
                          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                            <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                          </div>
                          <div className="flex-auto">

                            {item.name}

                            <p className="mt-1 text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  </>
                )}

              </PopoverPanel>
            </Transition>
          </Popover> */}

          {TopLevelLinks.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold leading-6  "
                target={link.target || '_self'}
                rel={link.rel || ''}
              >
                {link.name}
              </Link>
            );
          })}
        </PopoverGroup>

        {/* account menu */}
        <div className="flex shrink justify-end space-x-2">
          <AccountMenu />

          {/* mobile view Hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 tablet:hidden"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <Dialog
        className="laptop:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 phone:max-w-sm phone:ring-1 phone:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Tech Workforce Coalition</span>
              <Image
                width={50}
                height={50}
                className="h-8 w-auto"
                src="/images/TWC_75x50_2024.svg"
                alt=""
              />
            </Link>

            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {TopLevelLinks.map((link) => {
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7   hover:bg-gray-50"
                      target={link.target || '_self'}
                      rel={link.rel || ''}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
