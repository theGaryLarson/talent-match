import Link from 'next/link';
import CFALogo from './CFALogo';
import Image from 'next/image';
export default function CFAFooter() {
  return (
    <div className="w-full bg-primary-600 px-6 py-2 text-white">
      <div className="flex flex-col items-center">
        <Link href={'/#'}>
          <Image
            src="/cfa_images/CFA logo.svg"
            alt={'CFA Logo'}
            width={150}
            height={75}
          />
        </Link>
       
        <div className="flex items-center gap-2">
          <p>Follow Us:</p>
          <a
            href={'https://www.linkedin.com/company/digitalskillsforall/'}
            target="_blank"
          >
            <img
              src={'/cfa_images/stock/LI-In-Bug.png'}
              alt={'Linkedin Link'}
              width={40}
            ></img>
          </a>
        </div>
        <p className="p-4 text-center text-sm">
          <Link className='text-red-600' href={'/underconstruction'}>Get Support</Link> |{' '}
          <Link href={'/#'}>About CFA</Link> |{' '}
          <Link className='text-red-600' href={'/underconstruction'}>Partner Orgs</Link>{' '}
        </p>
      </div>
      <hr />
      <p className="p-4 text-center text-sm">
        <Link className='text-red-600' href={'/underconstruction'}>Terms of Services</Link> |{' '}
        <Link className='text-red-600' href={'/underconstruction'}>Privacy Policy</Link> |{' '}
        <Link className='text-red-600' href={'/underconstruction'}>Cookie Settings</Link>{' '}
      </p>
    </div>
  );
}
