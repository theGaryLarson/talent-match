import Link from 'next/link';

export default function CFAFooter() {
  return (
    <div className="w-full bg-primary-600 px-6 py-2 text-white">
      <div className="flex flex-col items-center">

        <div className="flex items-center gap-2 REPLACE-BEFORE-RELEASE">
          <p>Follow Us:</p>
          <a href='/underconstruction' target="_blank">
            <img
              src={'/cfa_images/stock/LI-In-Bug.png'}
              alt={'Linkedin Link'}
              width={40}
            ></img>
          </a>
        </div>
        <p className="p-4 text-center text-sm">
          <Link className='REPLACE-BEFORE-RELEASE' href={'/underconstruction'}>Get Support</Link> |{' '}
          <Link href={'/#'}>About WTWC</Link> |{' '}
          <Link className='REPLACE-BEFORE-RELEASE' href={'/underconstruction'}>Partner Orgs</Link>{' '}
        </p>
      </div>
      <hr />
      <p className="p-4 text-center text-sm">
        <Link className='REPLACE-BEFORE-RELEASE' href={'/underconstruction'}>Terms of Services</Link> |{' '}
        <Link className='REPLACE-BEFORE-RELEASE' href={'/underconstruction'}>Privacy Policy</Link>{' '}
        {/* <Link className='REPLACE-BEFORE-RELEASE' href={'/underconstruction'}>Cookie Settings</Link>{' '} */}
      </p>
    </div>
  );
}
