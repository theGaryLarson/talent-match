import {ArrowRightIcon} from '@heroicons/react/24/outline';
import {lusitana} from '@/app/ui/fonts';
import Link from 'next/link';
import Image from 'next/image';
import PageBanner from '../ui/components/PageBannner';
import RoundedButtonCard from '../ui/components/RoundedButtonCard';
//entire CFA landing page
export default function Page() {
    return (
        <>
            <PageBanner
                title="Washington Tech Workforce Coalition" bg={'bg-services-hero'}></PageBanner>
            <main className="space-y-3 py-8 mx-4 tablet:mx-[150px] laptop:mx-[200px] font-['Roboto']">
                <h1 className="text-2xl">
                    Computing For All
                </h1>
                <h2 className='text-xl text-primary-600'>
                    CFA is the backbone organization working with the Washington Tech Workforce Coalition, an
                    organization of employers, schools, colleges, and community organizations to prepare diverse
                    jobseekers across the state for careers in tech.
                </h2>
                <p>
                    Welcome Employers and Jobseekers to this initial project of a Department of Commerce funded Green
                    Jobs Challenge grant and the Washington Jobs Initiative.
                </p>
                <p>
                    {`Whether you're just starting out or a seasoned professional, our skills
                        classes, workshops, panels, and soft skills training offer invaluable insights
                        and tools to enhance your skill set and professional development. From honing
                        your communication skills to mastering the art of
                        negotiation, our training programs empower you to succeed in today's competitive job market.`}
                </p>
                <div className="flex flex-wrap justify-evenly gap-10">
                    <RoundedButtonCard
                        title={'Job Seekers'}
                        desc={
                            'Join our unique process for getting you connected with ready-to-hire employers as a job candidate with a showcase of TechReady job skills and achievements. We provide development opportunities in technical proficiency and success strategies for success in the work environment, along with career navigation skills. '
                        }
                        buttonText={'Register'}
                        link={'/signin'}
                        callToAction={
                            'Register for Information session, build your profile'
                        }
                    />
                    <RoundedButtonCard
                        title={'Employers'}
                        desc={
                            "Explore our Unique Talent Showcase. The Tech Talent Finder Portal is designed for small and medium businesses to find quality candidates in our searchable database: Accessing a carefully sourced talent pool built from referrals within the Washington Tech Workforce Coalition. "
                        }
                        buttonText={'Learn More'}
                        link={'/services/employers'}
                        callToAction={'View candidates, create an account '}
                    />
                </div>
            </main>
        </>
    );
}
