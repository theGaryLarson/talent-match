import { PopoverButton, Transition, PopoverPanel } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { Popover } from "flowbite-react"
import Link from "next/link"
import { ForwardRefExoticComponent, Fragment, SVGProps } from "react"
import {
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  XMarkIcon,
  PresentationChartBarIcon
} from '@heroicons/react/24/outline'

export default function HeaderDropDownMenu({name, dropDownInfo}:{name:string; dropDownInfo:{name:string,href:string, description:string}[]}){
   return( <Popover className="relative" content={undefined}>
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 ">
              {name}
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
                    {dropDownInfo.map((item) => (
                    <Link key={item.name} href={item.href} className="block font-semibold text-gray-900" onClick={()=>{close()}}>
                      <div
                        
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          
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
);}