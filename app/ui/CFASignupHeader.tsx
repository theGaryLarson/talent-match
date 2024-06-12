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
  { name: 'Upcoming Info Sessions', description: 'Learn more about what we offer', href: '#', icon: PresentationChartBarIcon },
  { name: 'Project Factory', description: 'Build Projects with guidance from mentors', href: '#', icon: FingerPrintIcon }
]
const callsToAction = [
  { name: 'Call to Action 1', href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', icon: PlayCircleIcon },
  { name: 'Call to Action 2', href: '#', icon: PhoneIcon },
]
const TopLevelLinks = [
    { name: 'Explore', href: '/todo'},
    {
      name: 'News & Events',
      href: '/todo'
    },
    {
      name: 'About Us',
      href: '/todo'
    },{
      name:"Contact Us",
      href:"/todo"
    }
  ];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function CFASignupHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  useEffect(() => {
    // Do something here...
  }, [pathname])


  return (
    <header className="bg-white">
      <nav className="mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/">
            <span className="sr-only">Computing For All</span>
            <Image src="/cfa_images/cfaLogoWithName.jpg" alt="Computing For All" width={110} height={31.8} />
          </Link>
        </div>
        <div className="flex lg:flex-1 w-full text-right">
          Not ready to log in?{` `}
          <Link href="/">
            Learn how CFA works
          </Link>
        </div>
      </nav>
    </header>
  )
}
