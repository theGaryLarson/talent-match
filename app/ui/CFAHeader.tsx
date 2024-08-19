'use client'
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverGroup, PopoverPanel, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon} from '@heroicons/react/20/solid'
import Image from 'next/image';
const forStudentsDropDownInfo = [
{ name: 'Pre-Apprenticeship Program', description: 'Learn Web Development', href: '/pre-apprenticeship', icon: CursorArrowRaysIcon },
{ name: 'Project Factory', description: 'Build Projects with guidance from mentors Coming Soon', href: '#', icon: FingerPrintIcon }


]

const TopLevelLinks = [
  { name: 'Talent Showcase', href: '/services'},
  { name: 'For Employers', href: '/services/employers'},
  { name: 'For JobSeekers', href: '/services/jobseekers'},
    { name: 'Explore', href: '/todo'},
    {
      name:"Contact Us",
      href:"/todo"
    }
  ];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function CFAHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  useEffect(() => {
    // Do something here...
  }, [pathname])


  return (
    <header className="bg-white" >
      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"></link>
      <nav className="mx-auto flex items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/">
            <span className="sr-only">Computing For All</span>
            <Image src="/cfa_images/TWC_75x50_2024.svg" alt="Computing For All" width={75} height={31.8} />
          </Link>
        </div>

        {/* moble view Hamburger menu toggle */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
    
        <PopoverGroup className="hidden lg:flex lg:gap-x-12" >
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 ">
              For Students
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
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
                <><div className="p-4" onMouseLeave={()=>{close()}}>
                    {forStudentsDropDownInfo.map((item) => (
                    <Link key={item.name} href={item.href} className="block font-semibold text-gray-900" onClick={()=>{close()}}>
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
          </Popover>
          
        {TopLevelLinks.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
          {link.name}
          </Link>
        );
      })}


        </PopoverGroup>
        

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="/services/employers/dashboard" className="text-sm font-semibold leading-6 text-gray-900">
            My Dashboard 
          </Link>
        </div>
      </nav>






      <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
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
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        For Students
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        {[...forStudentsDropDownInfo].map((item) => (
                          <DisclosureButton
                            key={item.name}
                            as={Link}
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            onClick={()=>{setMobileMenuOpen(false)}}
                          >
                            {item.name}
                          </DisclosureButton>
                        ))}
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
                {
                    TopLevelLinks.map((link)=>{
                        return(
                            <Link
                            key={link.name}
                            href={link.href}
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                            {link.name}
                            </Link>
                        )
                    })
                }
              </div>
              <div className="py-6">
                <Link
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in/Sign up
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
