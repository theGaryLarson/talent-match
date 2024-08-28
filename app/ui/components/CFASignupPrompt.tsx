'use client'
import Link from 'next/link';

interface Props {
    className?: string,
}

export default function CFASignupFooter ({className = ''}:Props) {
    return (
        <section className={"px-8 w-full laptop:text-center laptop:bg-gray-50 laptop:h-screen laptop:pt-32" + className}>
            <div className='flex flex-col gap-4 my-4 mx-auto laptop:max-w-[390px] laptop:gap-6'>
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
        </section>
    );
}