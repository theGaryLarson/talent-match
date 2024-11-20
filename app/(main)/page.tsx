import RoundedButton from '../ui/components/RoundedButton';

//entire TWC landing page
export const metadata = {
    title: "Tech Workforce Coalition"
};

export default function Page() {
    return (
        <main className="space-y-3 py-8 mx-4 tablet:mx-[150px] laptop:mx-[200px] font-['Roboto']">
            {/* Header */}
            <div className="w-full py-10 px-24 rounded-3xl flex-col justify-center items-center gap-5 inline-flex">
                <div className="self-stretch text-center text-sky-900 text-7xl font-normal font-['Roboto'] capitalize ">Washington Tech Workforce Coalition</div>
                <div className="self-stretch text-center text-sky-900 text-5xl font-normal font-['Roboto'] leading-10">Employers, Educators, & Community Shaping the Future of Tech</div>
                <div className="justify-start items-start gap-5 inline-flex">
                    <RoundedButton content={'Join the Coalition'} link={'/underconstruction'} invertColor={true}></RoundedButton>
                </div>
            </div>

            {/* Header image */}
            <div className="w-full relative inline-flex justify-center items-center">
                <img className="w-3/4 z-50 rounded-3xl shadow" src="/images/landing/banner.jpg" />
                <div className="w-full z-0 absolute top-50 inline-flex h-72 bg-blue-100 rounded-tl-3xl rounded-tr-3xl" />
            </div>
            {/* Content */}
            <div className="">
                <div className="h-96 px-24 bg-blue-100 flex-col justify-start items-center gap-5 inline-flex">
                    <div className="p-4 bg-blue-100 flex-col justify-start items-center flex">
                        {/* About */}
                        <div className="h-56 justify-center items-center gap-12 inline-flex">
                            <div className="flex-col justify-start items-center gap-6 inline-flex">
                                <div className="w-full h-36 relative">
                                    <img className="w-full" src="/images/landing/TWC-logo.svg" />
                                </div>
                                <div className="text-center text-sky-900 text-5xl font-normal font-['Roboto'] leading-10">About TWC</div>
                            </div>
                            <div className="grow shrink basis-0"><span className="text-gray-900 text-xl font-normal font-['Roboto'] leading-loose">The </span><span className="text-cyan-700 text-xl font-semibold font-['Roboto'] leading-loose">Washington Tech Workforce Coalition</span><span className="text-gray-900 text-xl font-normal font-['Roboto'] leading-loose"> is committed to diversifying the IT and cybersecurity sector by bridging the skills gap for underrepresented communities. We&apos;re actively expanding access to tech job opportunities and providing targeted training and mentorship programs. By fostering partnerships between industry leaders, education providers, and community organizations, we&apos;re creating a more inclusive and equitable tech ecosystem where everyone can thrive.</span></div>
                        </div>

                        <div className="flex-col justify-start items-start flex">
                            <div className="w-px h-20 relative" />
                        </div>

                        {/* Launching soon talent portal */}
                        <div className="w-full py-8 px-8 pt-20 pb-20 bg-sky-950 rounded-3xl justify-start items-center gap-20 inline-flex">
                            <div className="w-96 flex-col justify-center items-start gap-2.5 inline-flex">
                                <div className="self-stretch text-white/70 text-xl font-semibold font-['Roboto'] capitalize leading-snug tracking-widest">LAUNCHING SOON...</div>
                                <div className="self-stretch text-neutral-100 text-6xl font-normal font-['Roboto'] capitalize leading-10">Talent Portal</div>
                                <div className="self-stretch text-sky-200 text-5xl font-normal font-['Roboto'] capitalize leading-10">Hire Qualified Candidates</div>
                                <div className="self-stretch text-neutral-100 text-xl font-normal font-['Roboto'] leading-loose">Members of the Coalition have access to our soon to be launched Talent Finder Portal. Our searchable database will quickly connect you with local talent that meets your specific needs.</div>
                                <div className="flex-col justify-start items-start flex">
                                    <div className="w-px h-2.5 relative" />
                                </div>
                                <div className="justify-start items-start gap-5 inline-flex">
                                    <div className="px-5 py-3 bg-cyan-700 rounded-full justify-center items-center gap-2 flex">
                                        <div className="text-center text-white text-base font-medium font-['Roboto'] leading-tight tracking-tight">Join the Coalition</div>
                                    </div>
                                </div>
                                <img className="w-full" src="/images/landing/my-dashboard.png" />
                            </div>
                        </div>
                    </div>
                    {/* Our goal */}
                    <div className="h-72 bg-blue-100 flex-col justify-center items-center gap-2.5 flex">
                        <div className="self-stretch text-center text-neutral-700 text-xl font-semibold font-['Roboto'] capitalize leading-snug tracking-widest">OUR GOAL</div>
                        <div className="self-stretch text-center text-cyan-700 text-8xl font-normal font-['Roboto'] leading-10">1,000 Job Candidates</div>
                        <div className="self-stretch text-center text-neutral-700 text-5xl font-normal font-['Roboto'] capitalize leading-10"> In Tech roles by 2025</div>
                    </div>
                    <div className="flex-col justify-start items-start flex">
                        <div className="w-px h-10 relative" />
                    </div>
                    <div className="self-stretch justify-center items-center gap-12 inline-flex">
                        <div className="w-96 flex-col justify-center items-start gap-2.5 inline-flex">
                            <div className="self-stretch text-sky-900 text-xl font-semibold font-['Roboto'] capitalize leading-snug tracking-widest">WHAT WE DO</div>
                            <div className="self-stretch text-cyan-700 text-6xl font-normal font-['Roboto'] capitalize leading-10">Build A more inclusive tech future</div>
                            <div className="self-stretch text-neutral-700 text-xl font-normal font-['Roboto'] leading-loose">Our mission is to connect underrepresented candidates with in-demand tech jobs. We offer targeted training programs in IT and cybersecurity, along with personalized career coaching and networking opportunities. By bridging the gap between talent and opportunity, we are working to build a more diverse and innovative tech industry.</div>
                            <div className="flex-col justify-start items-start flex">
                                <div className="w-px h-7 relative" />
                            </div>
                        </div>
                        <img className="w-96 h-96 rounded-3xl shadow" src="https://via.placeholder.com/560x540" />
                    </div>
                    <div className="flex-col justify-start items-start flex">
                        <div className="w-px h-20 relative" />
                    </div>
                    <div className="self-stretch h-36 px-4 bg-blue-100 flex-col justify-center items-center gap-2.5 flex">
                        <div className="flex-col justify-start items-start flex">
                            <div className="w-px h-5 relative" />
                        </div>
                        <div className="self-stretch text-center text-sky-900 text-xl font-semibold font-['Roboto'] uppercase leading-loose tracking-widest">employers committed to our mission</div>
                        <div className="self-stretch py-2.5 justify-between items-center inline-flex">
                            <div className="px-10 justify-center items-start flex">
                                <div className="w-40 h-12 relative" />
                            </div>
                            <div className="px-10 justify-center items-start flex">
                                <div className="w-96 h-11 relative">
                                    <div className="w-96 h-10 left-[-0.01px] top-[0.59px] absolute">
                                    </div>
                                </div>
                            </div>
                            <div className="px-10 justify-center items-start flex">
                                <div className="w-64 h-12 relative" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-col justify-start items-start flex">
                        <div className="w-px h-10 relative" />
                    </div>
                </div>
            </div>
        </main>
    );
}
