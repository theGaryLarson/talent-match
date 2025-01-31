"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
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
} from "@headlessui/react";
import {
  Bars3Icon,
  BuildingOffice2Icon,
  SparklesIcon,
  BriefcaseIcon,
  NewspaperIcon,
  UserGroupIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import AccountMenu from "./components/mui/AccountMenu";

type LinkItem = {
  name: string;
  href: string;
  target?: string;
  rel?: string;
  dropDowns?: DropDownItem[];
};

type DropDownItem = {
  name: string;
  description: string;
  href: string;
  icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  target?: string;
  rel?: string;
};

const TopLevelLinks: LinkItem[] = [
  // {
  //   name: 'DropDown Example',
  //   href: '/',
  //   dropDowns: [
  //     {
  //       name: 'Link 1',
  //       description: 'Learn Web Development',
  //       href: '/underconstruction',
  //       icon: CursorArrowRaysIcon,
  //     },
  //     {
  //       name: 'Link 2',
  //       description: 'Build Projects with guidance from mentors Coming Soon',
  //       href: '/underconstruction',
  //       icon: FingerPrintIcon,
  //     },
  //   ],
  // },
  // { name: 'Talent Showcase', href: '/services/talent-search' },
  // { name: 'For Employers', href: '/services/employers' },
  // { name: 'For Job Seekers', href: '/services/jobseekers' },
  // { name: 'Careers', href: '/services/careers' },
  // /*{
  //   name: 'Find a Job',
  //   href: 'https://cfajobs.powerappsportals.com/',
  //   target: '_blank',
  //   rel: 'noopener noreferrer',
  // },*/
  // {
  //   name: 'Join Our Community',
  //   href: 'https://forum.watechwfcoalition.org/',
  //   target: '_blank',
  //   rel: 'noopener noreferrer',
  {
    name: "For Employers",
    href: "",
    dropDowns: [
      {
        name: "Landing Page",
        description: "Informational page for employers",
        href: "/services/employers",
        icon: BuildingOffice2Icon,
      },
      {
        name: "Talent Showcase",
        description: "Find talent",
        href: "/services/talent-search",
        icon: SparklesIcon,
      },
    ],
  },
  {
    name: "For Jobseekers",
    href: "",
    dropDowns: [
      {
        name: "Landing Page",
        description: "Informational page for job seekers",
        href: "/services/jobseekers",
        icon: BriefcaseIcon,
      },
      {
        name: "Job Listings",
        description: "Find jobs",
        href: "/services/joblistings",
        icon: NewspaperIcon,
      },
    ],
  },
  {
    name: "Our Community",
    href: "",
    dropDowns: [
      {
        name: "Join Our Community",
        description: "Connect with others on our community forum",
        href: "https://forum.watechwfcoalition.org/",
        target: "_blank",
        rel: "noopener noreferrer",
        icon: UsersIcon,
      },
      {
        name: "Careers",
        description: "Learn about different careers in tech",
        href: "/services/careers",
        icon: QuestionMarkCircleIcon,
      },
    ],
  },
  { name: 'Events', href: '/services/events' },
  {
    name: "Coalition",
    href: "",
    dropDowns: [
      {
        name: "Training Providers",
        description: "Learn about the training providers in our coalition",
        href: "/services/training-providers",
        icon: UserGroupIcon,
      },
    ],
  },
  { name: "About Us", href: "/about-us" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerTW, setHeaderTW] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    // Do something here...
    setMobileMenuOpen(false);
    if (
      pathname == "/services/jobseekers" ||
      pathname == "/services/employers"
    ) {
      setHeaderTW("w-full z-10 absolute text-white");
    } else if (pathname.startsWith("/services/training-programs/")) {
      setHeaderTW("bg-[#003350] text-white");
    } else {
      setHeaderTW("bg-white");
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
          {pathname == "/services/jobseekers" ||
            pathname == "/services/employers" ||
            pathname.startsWith("/services/training-programs/") ? (
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
          {TopLevelLinks.map((link) => {
            if (link.dropDowns != undefined && link.dropDowns != null) {
              return (
                <Popover className="relative" key={link.name}>
                  <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6">
                    {link.name}
                    <ChevronDownIcon
                      className="h-5 w-5 flex-none"
                      aria-hidden="true"
                    />
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
                        <>
                          <div
                            className="p-4"
                            onMouseLeave={() => {
                              close();
                            }}
                          >
                            {link.dropDowns?.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className="block font-semibold  text-black"
                                target={item.target || "_self"}
                                rel={item.rel || ""}
                                onClick={() => {
                                  close();
                                }}
                              >
                                <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                    <item.icon
                                      className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <div className="flex-auto">{item.name}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </>
                      )}
                    </PopoverPanel>
                  </Transition>
                </Popover>
              );
            }
            return (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold leading-6  "
                target={link.target || "_self"}
                rel={link.rel || ""}
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
                  if (link.dropDowns != undefined) {
                    return (
                      <Disclosure
                        as="div"
                        className="-mx-3"
                        key={"m" + link.name}
                      >
                        {({ open }) => (
                          <>
                            <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7   hover:bg-gray-50">
                              {link.name}
                              <ChevronDownIcon
                                className={
                                  open
                                    ? "rotate-180 h-5 w-5 flex-none"
                                    : "h-5 w-5 flex-none"
                                }
                                aria-hidden="true"
                              />
                            </DisclosureButton>
                            <DisclosurePanel className="mt-2 space-y-2">
                              {link.dropDowns?.map((item) => (
                                <DisclosureButton
                                  key={"mm" + item.name}
                                  as={Link}
                                  href={item.href}
                                  className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7   hover:bg-gray-50"
                                  target={item.target || "_self"}
                                  rel={item.rel || ""}
                                  onClick={() => {
                                    setMobileMenuOpen(false);
                                  }}
                                >
                                  {item.name}
                                </DisclosureButton>
                              ))}
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>
                    );
                  }
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7   hover:bg-gray-50"
                      target={link.target || "_self"}
                      rel={link.rel || ""}
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
