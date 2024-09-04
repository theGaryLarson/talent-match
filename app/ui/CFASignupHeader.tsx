'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image';
import Divider from '@mui/material/Divider';
import { Button } from 'flowbite-react';


export default function CFASignupHeader({className}:{className?:string}) {
  return (
    <header className={"bg-white mx-8 " + className}>
      <nav className="mx-auto py-6 flex items-center justify-between max-w-screen-lg laptop:px-8" aria-label="Global">
        <div className="w-1/2">
          <Link href="/">
            <span className="sr-only">Computing For All</span>
            <Image src='/cfa_images/TWC_75x50_2024.svg' alt="Computing For All" width={75} height={50} priority/>
          </Link>
        </div>
        <Button href={`/login`} className='bg-primary-600 rounded-full'>Sign In</Button>
      </nav>
      <Divider className='hidden sm-tablet:block'/>
    </header>
  )
}
