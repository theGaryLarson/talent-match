import RoundedButton from '../ui/components/RoundedButton';

//entire TWC landing page
export const metadata = {
    title: "Tech Workforce Coalition"
};

export default function Page() {
    return (
        <div>
            <main className="py-8 mx-4 tablet:mx-[150px] laptop:mx-[200px] font-['Roboto']">
                {/* Header */}
                <div className="w-full py-10 px-24 rounded-3xl flex-col justify-center items-center gap-5 inline-flex">
                    <div className="self-stretch text-center text-sky-900 text-7xl font-normal font-['Roboto'] capitalize ">Washington Tech Workforce Coalition</div>
                    <div className="mt-4 self-stretch text-center text-sky-900 text-5xl font-normal font-['Roboto'] leading-10">Employers, Educators, & Community Shaping the Future of Tech</div>
                    <div className="mt-10 justify-start items-start gap-5 inline-flex">
                        <RoundedButton content={'Join the Coalition'} link={'/join'} invertColor={true}></RoundedButton>
                    </div>
                </div>

                {/* Header image */}
                <div className="w-full relative inline-flex justify-center items-center">
                    <img className="w-3/4 z-50 rounded-3xl shadow" src="/images/landing/banner.jpg" />
                    {/* Top rounded background rectangle */}
                    <div className="w-full h-[40rem] z-0 absolute top-1/2 inline-flex h-72 bg-[#D6F1F7] rounded-tl-3xl rounded-tr-3xl" />
                </div>
                {/* Content */}
                <div className="w-full relative justify-center items-center z-1 bg-[#D6F1F7]">
                    <div className="px-24 flex-col justify-start items-center gap-5 inline-flex">
                        <div className="p-4 flex-col justify-start items-center flex">
                            {/* About */}
                            <div className="h-56 justify-center items-center gap-12 mt-10 mb-20 inline-flex">
                                <div className="flex-col justify-start items-center gap-6 inline-flex">
                                    <div className="w-full mb-6 h-36 relative">
                                        <img className="w-full" src="/images/landing/TWC-logo.svg" />
                                    </div>
                                    <div className="text-center text-sky-900 text-5xl font-normal font-['Roboto'] leading-10">About TWC</div>
                                </div>
                                <div className="grow shrink basis-0">
                                    <span className="text-gray-900 text-xl font-normal font-['Roboto'] leading-loose">The </span><span className="text-cyan-700 text-xl font-semibold font-['Roboto'] leading-loose">Washington Tech Workforce Coalition</span>
                                    <span className="text-gray-900 text-xl font-normal font-['Roboto'] leading-loose"> is committed to diversifying the IT and cybersecurity sector by bridging the skills gap for underrepresented communities. We&apos;re actively expanding access to tech job opportunities and providing targeted training and mentorship programs. By fostering partnerships between industry leaders, education providers, and community organizations, we&apos;re creating a more inclusive and equitable tech ecosystem where everyone can thrive.</span></div>
                            </div>

                            {/* Launching soon talent portal */}
                            <div className="w-full laptop:w-2/3 py-8 pl-8 bg-sky-950 rounded-3xl justify-start items-center gap-20">
                                <div className="w-full grid grid-cols-2 justify-center items-start gap-2.5">
                                    <div className="">
                                        <div className="mb-8 self-stretch text-white/70 text-xl font-semibold font-['Roboto'] capitalize leading-snug tracking-widest">LAUNCHING SOON...</div>
                                        <div className="mb-12 self-stretch text-neutral-100 text-6xl font-normal font-['Roboto'] capitalize leading-10">Talent Portal</div>
                                        <div className="mb-8 self-stretch text-sky-200 text-5xl font-normal font-['Roboto'] capitalize leading-10">Hire Qualified Candidates</div>
                                        <div className="self-stretch text-neutral-100 text-xl font-normal font-['Roboto'] leading-loose">Members of the Coalition have access to our soon to be launched Talent Finder Portal. Our searchable database will quickly connect you with local talent that meets your specific needs.</div>
                                        <div className="flex-col justify-start items-start flex">
                                            <div className="w-px h-2.5 relative" />
                                        </div>
                                        <div className="justify-start items-start gap-5 inline-flex">
                                            <RoundedButton content={'Join the Coalition'} link={'/join'} invertColor={true}></RoundedButton>
                                        </div>
                                    </div>
                                    <img className="h-full object-cover object-left rounded-tl-3xl rounded-bl-3xl" src="/images/landing/my-dashboard.png" />
                                </div>
                            </div>
                        </div>
                        {/* Our goal */}
                        <div className="h-72 flex-col justify-center items-center gap-2.5 flex">
                            <div className="mb-8 self-stretch text-center text-neutral-700 text-xl font-semibold font-['Roboto'] capitalize leading-snug tracking-widest">OUR GOAL</div>
                            <div className="mb-12 self-stretch text-center text-cyan-700 text-8xl font-normal font-['Roboto'] leading-10">1,000 Job Candidates</div>
                            <div className="mb-4 self-stretch text-center text-neutral-700 text-5xl font-normal font-['Roboto'] capitalize leading-10"> In Tech roles by 2025</div>
                        </div>
                        {/* What we do */}
                        <div className="self-stretch justify-center items-center gap-12 inline-flex">
                            <div className="w-2/3 flex-col justify-center items-start gap-2.5 inline-flex">
                                <div className="self-stretch text-sky-900 text-xl font-semibold font-['Roboto'] capitalize leading-snug tracking-widest">WHAT WE DO</div>
                                <div className="leading-none self-stretch text-cyan-700 text-6xl font-normal font-['Roboto'] capitalize leading-10">Build A more inclusive tech future</div>
                                <div className="self-stretch text-neutral-700 text-xl font-normal font-['Roboto'] leading-loose">Our mission is to connect underrepresented candidates with in-demand tech jobs. We offer targeted training programs in IT and cybersecurity, along with personalized career coaching and networking opportunities. By bridging the gap between talent and opportunity, we are working to build a more diverse and innovative tech industry.</div>
                                <div className="flex-col justify-start items-start flex">
                                    <div className="w-px h-7 relative" />
                                </div>
                            </div>
                            <img className="w-96 h-96 rounded-3xl shadow object-cover" src="/images/landing/what-we-do.jpg" />
                        </div>
                    </div>
                </div>
                {/* round off the bottom of the background rectangle */}
                <div className="w-full mt-0 h-12 bg-[#D6F1F7] rounded-bl-3xl rounded-br-3xl" />
            </main>

            <div className="w-full mt-40 px-24 flex-col justify-start items-center gap-3.5 inline-flex">
                {/* For employers */}
                <div className="self-stretch justify-center items-start gap-12 inline-flex">
                    <div className="justify-center items-center gap-24 flex">
                        <div className="w-96 h-96 relative">
                            <div className="w-96 h-96 left-[0.58px] top-[-0px] absolute">
                                <img className="w-96 shadow-none" src="/images/landing/for-employers.jpg" />
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 flex-col justify-center items-start gap-2.5 inline-flex">
                        <div className="px-4 py-2 bg-[#D6F1F7] rounded-2xl justify-start items-center gap-2.5 inline-flex">
                            <div className="text-sky-900 text-xl font-semibold font-['Roboto'] capitalize leading-snug tracking-widest">FOR EMPLOYERS</div>
                        </div>
                        <div className="mt-4 self-stretch text-cyan-700 text-5xl font-normal font-['Roboto'] capitalize leading-10">Meet your hiring needs</div>
                        <div className="mt-4 self-stretch text-neutral-700 text-xl font-normal font-['Roboto'] leading-loose">We connect small and medium-sized businesses with skilled local candidates in Software, IT/Cloud Support, Cybersecurity, and Data Analytics. All candidates are vetted and curated, saving you time and money on hiring.</div>
                        <div className="mt-4 justify-start items-start gap-5 inline-flex">
                            <RoundedButton content={'Discover Local Talent'} link={'/services/talent-search'} invertColor={true}></RoundedButton>
                        </div>
                    </div>
                </div>
                {/* For educators */}
                <div className="mt-16 self-stretch justify-center items-start gap-12 inline-flex">
                    <div className="w-1/2 flex-col justify-center items-start gap-2.5 inline-flex">
                        <div className="px-4 py-2 bg-[#D6F1F7] rounded-2xl justify-start items-center gap-2.5 inline-flex">
                            <div className="text-sky-900 text-xl font-semibold font-['Roboto'] capitalize leading-snug tracking-widest">FOR EDUCATORS</div>
                        </div>
                        <div className="mt-4 self-stretch text-cyan-700 text-5xl font-normal font-['Roboto'] capitalize leading-10">Empower Students with Insights</div>
                        <div className="mt-4 self-stretch text-neutral-700 text-xl font-normal font-['Roboto'] leading-loose">Discover Essential Skills for Tomorrow’s Workforce. Through our Coalition, gain valuable insights directly from employers for in-demand skills which will help align your curriculum with the most current industry standards.</div>
                        <div className="mt-4 justify-start items-start gap-5 inline-flex REPLACE-BEFORE-RELEASE">
                            <RoundedButton content={'Showcase Your Skills'} link={'/underconstruction'} invertColor={true}></RoundedButton>
                        </div>
                    </div>
                    <img className="w-96 h-96 rounded-3xl object-cover" src="/images/landing/for-educators.jpg" />
                </div>
                {/* For job candidates */}
                <div className="mt-16 self-stretch justify-center items-start gap-12 inline-flex">
                    <img className="w-96" src="/images/landing/for-job-candidates.jpg" />
                    <div className="w-1/2 flex-col justify-center items-start gap-2.5 inline-flex">
                        <div className="px-4 py-2 bg-[#D6F1F7] rounded-2xl justify-start items-center gap-2.5 inline-flex">
                            <div className="text-sky-900 text-xl font-semibold font-['Roboto'] capitalize leading-snug tracking-widest">FOR JOB CANDIDATES</div>
                        </div>
                        <div className="mt-4 self-stretch text-cyan-700 text-5xl font-normal font-['Roboto'] capitalize leading-10">standout from the crowd </div>
                        <div className="mt-4 self-stretch"><span className="text-neutral-700 text-xl font-normal font-['Roboto'] leading-loose">Join our Talent Portal and let employers find</span><span className="text-cyan-700 text-xl font-semibold font-['Roboto'] leading-loose"> you</span><span className="text-neutral-700 text-xl font-normal font-['Roboto'] leading-loose">. Showcase your skills, connect directly with local companies, and access exclusive career development resources. Create your profile today and take the next step toward your dream tech role.</span></div>
                        <div className="mt-4 justify-start items-start gap-5 inline-flex">
                            <RoundedButton content={'Showcase Your Skills'} link={'/services/jobseekers'} invertColor={true}></RoundedButton>
                        </div>
                    </div>
                </div>
            </div>

            {/* footer - join the team of coalition members */}
            <div className="mt-40 w-full h-80 px-24 pb-4 bg-neutral-100 flex-col justify-center items-center gap-5 inline-flex">
                <div className="mt-10 self-stretch text-center text-sky-900 text-xl font-semibold font-['Roboto'] uppercase leading-loose tracking-widest">Join the team of Coalition Training Providers</div>
                <div className="REPLACE-BEFORE-RELEASE self-stretch h-48 py-2 justify-center items-center gap-24 inline-flex">
                    <img className="w-32" src="/images/training-providers/riipen.svg" />
                    <img className="w-48" src="/images/training-providers/per-scholas.svg" />
                    <img className="w-36" src="/images/training-providers/codeday.svg" />
                    <img className="w-32" src="/images/training-providers/year-up.svg" />
                    <img className="w-42" src="/images/training-providers/north-seattle-college.svg" />
                </div>
                <div className="REPLACE-BEFORE-RELEASE self-stretch h-48 py-2 justify-center items-center gap-24 inline-flex">
                    <img className="w-32" src="/images/training-providers/WTIA.png" />
                    <img className="w-48" src="/images/training-providers/saint-martins.png" />
                    <img className="w-48" src="/images/training-providers/career-connect-wa.png" />
                </div>
            </div>
        </div>
    );
}
