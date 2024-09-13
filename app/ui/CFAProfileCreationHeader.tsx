'use client'
import Link from 'next/link';
import { signOut } from '@/auth';
import { usePathname, useSearchParams } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverGroup, PopoverPanel, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  XMarkIcon,
  PresentationChartBarIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';
const CareerDropDownInfo = [
  { name: 'Career Services Landing Page', description: 'Learn What Career Services has to Offer', href: '/services', icon: ChartPieIcon },
  { name: 'Employer Landing Page', description: 'Mange your canidate search', href: '/services/employers', icon: ChartPieIcon },
  { name: 'Employer Dashboard', description: 'Mange your canidate search', href: '/services/employers/dashboard', icon: ChartPieIcon },
  { name: 'Job Seeker Dashboard', description: 'Mange your job search', href: '/services/jobseekers/dashboard', icon: CursorArrowRaysIcon },
  { name: 'Upcoming Info Sessions', description: 'Learn more about what we offer', href: '/underconstruction', icon: PresentationChartBarIcon },
  { name: 'Project Factory', description: 'Build Projects with guidance from mentors', href: '/underconstruction', icon: FingerPrintIcon }
]
const callsToAction = [
  { name: 'Call to Action 1', href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', icon: PlayCircleIcon },
  { name: 'Call to Action 2', href: '#', icon: PhoneIcon },
]
const TopLevelLinks = [
    { name: 'Explore', href: '/underconstruction'},
    {
      name: 'News & Events',
      href: '/underconstruction'
    },
    {
      name: 'About Us',
      href: '/underconstruction'
    },{
      name:"Contact Us",
      href:"/underconstruction"
    }
  ];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function CFAProfileCreationHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  useEffect(() => {
    // Do something here...
  }, [pathname])


  return (
    <header className="bg-white">
      <nav className="mx-auto flex items-center justify-between p-6 laptop:px-8" aria-label="Global">
        <div className="flex laptop:flex-1">
          <Link href="/">
            <span className="sr-only">Computing For All</span>
            <Image src="/cfa_images/cfaLogoWithName.jpg" alt="Computing For All" width={110} height={31.8} />
          </Link>
        </div>

        {/* moble view Hamburger menu toggle */}
        <div className="flex laptop:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden laptop:flex laptop:flex-1 laptop:justify-end">
          <Link href="/logout" className="text-sm font-semibold leading-6 text-gray-900">
            Save and Log out
          </Link>
        </div>
      </nav>






      <Dialog className="laptop:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 phone:max-w-sm phone:ring-1 phone:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Computing For All</span>
              <Image
                width={50}
                height={50}
                className="h-8 w-auto"
                src="/cfa_images/cfalogo.jpg"
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
              <div className="py-6">
                <Link
                  href="/logout"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Save and Log out
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
