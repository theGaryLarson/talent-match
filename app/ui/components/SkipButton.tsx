'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function SkipButton() {
  const currentPath = usePathname(); //returns full path ie: /edit-profile/jobseeker/introduction
  // Early return if currentPath is null or undefined
  if (!currentPath) {
    return null;
  }
  let pageSequence: string[] = [];
  let userPrefix: string = '';
  if (currentPath.includes('/edit-profile/jobseeker')) {
    pageSequence = [
      'introduction',
      'education',
      'work-experience',
      'showcase',
      'preferences',
      'disclosures',
    ];
    userPrefix = 'jobseeker';
  } else if (currentPath.includes('/edit-profile/employer')) {
    pageSequence = [
      'personal',
      'company',
      'about',
      'mission',
      'video',
      'disclosures',
    ];
    userPrefix = 'employer';
  }
  const lastSegment = currentPath.split('/').pop() || ''; //returns last segment ie: introduction
  const currentIndex = pageSequence.indexOf(lastSegment);

  const nextPage =
    currentIndex >= 0 && currentIndex < pageSequence.length - 1
      ? `/edit-profile/${userPrefix}/${pageSequence[currentIndex + 1]}`
      : null;
  return nextPage ? (
    <Link
      href={nextPage}
      className="mt-1 inline-block h-fit rounded-full bg-cyan-700 px-4 py-2 text-white hover:bg-red-800"
    >
      Skip
    </Link>
  ) : null;
}

export default SkipButton;
