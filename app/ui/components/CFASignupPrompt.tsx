'use client'
import Link from 'next/link';
import Image from 'next/image';

interface Props {
    className?: string,
}

export default function CFASignupFooter ({className = ''}:Props) {
    return (
        <section className={"flex flex-col justify-between px-8 w-full h-full laptop:h-screen laptop:text-center laptop:bg-gray-50 laptop:pt-28" + className}>
            <div className='flex flex-col gap-4 py-4 mx-auto laptop:max-w-[390px] laptop:gap-6'>
                <h1 className='text-[34px] leading-[42px] text-center'>Create a CFA account</h1>
                <p className=''>Create a free CFA account to access job guides, 1:1 webinars, jobs & opportunities. (Placeholder)</p>
                <div className="hidden py-4 laptop:block">
                    <p>Not ready to log in?</p>
                    <p>
                    <Link href="/" className='underline text-blue-400'>
                        Learn how CFA works
                    </Link>
                    </p>
                </div>
            </div>
            <Image src='/cfa_images/signup/jobseeker-vector.png' width={1092} height={1040} className='hidden laptop:block h-1/2 w-full object-contain my-auto' alt='Art of jobseeker'/>
        </section>
    );
}