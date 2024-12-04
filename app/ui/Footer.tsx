'use client';

import Link from 'next/link';
import Image from 'next/image';
import generatedGitInfo from '../generatedGitInfo.json';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'

export default function Footer() {

  const pathname = usePathname();
  const baseIssueURL = "https://github.com/Computing-For-All/nextjs-issue-tracker/issues/new?assignees=&labels=uat&projects=Computing-For-All%2Fnextjs-issue-tracker&template=application.yml";
  const [issueURL, setIssueURL] = useState<string>(baseIssueURL);
  useEffect(() => { // window is accessible here.
    setIssueURL(baseIssueURL.concat("&issue_url=" + encodeURI(window.location.toString())));
  }, [pathname]);
  
  return (
    <div className="flex w-full flex-col flex-wrap items-center bg-primary-600 px-[16px] py-[16px] font-['Roboto'] text-white sm-tablet:grid sm-tablet:grid-cols-3">
      <Link href="/">
        <span className="sr-only">Tech Workforce Coalition</span>
        <Image
          src="/images/TWC logo_White.svg"
          alt="Tech Workforce Coalition"
          width={75}
          height={31.8}
        />
      </Link>
      <a
        className="flex items-center gap-2 justify-self-center"
        href="https://www.linkedin.com/company/washington-tech-workforce-coalition"
        target="_blank"
      >
        <p>Follow Us:</p>
        <Image
          src={'/images/stock/LI-In-Bug.png'}
          alt={'Linkedin Link'}
          width={40}
          height={40}
        />
      </a>
      <div className="text-center sm-tablet:text-right">
        <Link href='/policies/terms-of-service' className=" text-white underline">Terms of Service</Link>
        <p className="text-white">© Copyright 2024. All rights reserved.</p>
        <div className="git-info">
          <p><a href={issueURL + "&version=" + generatedGitInfo.gitCommitHash} target="_blank"><code>{generatedGitInfo.gitCommitHash}</code></a></p>
        </div>
      </div>
    </div>
  );
}
