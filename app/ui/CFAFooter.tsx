import Link from 'next/link';
import Image from 'next/image';
export default function CFAFooter() {
  return (
    <div className="flex w-full flex-col flex-wrap items-center bg-primary-600 px-[16px] py-[32px] font-['Roboto'] text-white sm-tablet:flex-row sm-tablet:justify-between  ">
      <Link href="/">
        <span className="sr-only">Computing For All</span>
        <Image
          src="/cfa_images/TWC logo_White.svg"
          alt="Computing For All"
          width={75}
          height={31.8}
        />
      </Link>
      <a
        className="flex items-center gap-2"
        href="https://www.linkedin.com/company/washington-tech-workforce-coalition"
        target="_blank"
      >
        <p>Follow Us:</p>
        <img
          src={'/cfa_images/stock/LI-In-Bug.png'}
          alt={'Linkedin Link'}
          width={40}
        ></img>
      </a>
      <div className="text-center sm-tablet:text-right">
        <Link href='/underconstruction' className=" text-white underline REPLACE-BEFORE-RELEASE">Privacy Policy</Link>
        <p className="text-white">© Copyright 2024. All rights reserved.</p>
      </div>
    </div>
  );
}
