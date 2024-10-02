import Link from 'next/link';
import Image from 'next/image';
import generatedGitInfo from '../generatedGitInfo.json';
export default function Footer() {
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
        <Link href='/underconstruction' className=" text-white underline REPLACE-BEFORE-RELEASE">Privacy Policy</Link>
        <p className="text-white">© Copyright 2024. All rights reserved.</p>
        <div className="git-info">
          <p><code>{generatedGitInfo.gitCommitHash}</code></p>
        </div>
      </div>
    </div>
  );
}
