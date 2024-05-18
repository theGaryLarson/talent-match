'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { boolean } from 'zod';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Features', href: '/careers'},
  {
    name: 'Marketplace',
    href: '/todo'
  },
  {
    name: 'Company',
    href: '/todo'
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
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
    </>
  );
}
