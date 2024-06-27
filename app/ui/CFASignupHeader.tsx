'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image';

export default function CFASignupHeader() {
  return (
    <header className="bg-white">
      <nav className="mx-auto flex items-center justify-between p-6 max-w-screen-lg lg:px-8" aria-label="Global">
        <div className="w-1/2">
          <Link href="/">
            <span className="sr-only">Computing For All</span>
            <Image src="/cfa_images/cfaLogoWithName.jpg" alt="Computing For All" width={110} height={31.8} />
          </Link>
        </div>
      </nav>
    </header>
  )
}
