import RoundedButton from '../ui/components/RoundedButton';

//entire TWC landing page
export const metadata = {
    title: "Tech Workforce Coalition"
};

export default function Page() {
    return (
        <main className="py-8 mx-4 tablet:mx-[150px] laptop:mx-[200px] font-['Roboto']">
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
                {/* Top rounded background rectangle */}
                <div className="w-full h-96 z-0 absolute top-1/2 inline-flex h-72 bg-[#D6F1F7] rounded-tl-3xl rounded-tr-3xl" />
            </div>
            {/* Content */}
            <div className="w-full relative justify-center items-center z-1 bg-[#D6F1F7]">
                <div className="px-24 flex-col justify-start items-center gap-5 inline-flex">
                    <div className="p-4 flex-col justify-start items-center flex">
                        {/* About */}
                        <div className="h-56 justify-center items-center gap-12 mt-10 mb-20 inline-flex">
                            <div className="flex-col justify-start items-center gap-6 inline-flex">
                                <div className="w-full h-36 relative">
                                    <img className="w-full" src="/images/landing/TWC-logo.svg" />
                                </div>
                                <div className="text-center text-sky-900 text-5xl font-normal font-['Roboto'] leading-10">About TWC</div>
                            </div>
                            <div className="grow shrink basis-0"><span className="text-gray-900 text-xl font-normal font-['Roboto'] leading-loose">The </span><span className="text-cyan-700 text-xl font-semibold font-['Roboto'] leading-loose">Washington Tech Workforce Coalition</span><span className="text-gray-900 text-xl font-normal font-['Roboto'] leading-loose"> is committed to diversifying the IT and cybersecurity sector by bridging the skills gap for underrepresented communities. We&apos;re actively expanding access to tech job opportunities and providing targeted training and mentorship programs. By fostering partnerships between industry leaders, education providers, and community organizations, we&apos;re creating a more inclusive and equitable tech ecosystem where everyone can thrive.</span></div>
                        </div>

                        {/* Launching soon talent portal */}
                        <div className="w-full py-8 pl-8 bg-sky-950 rounded-3xl justify-start items-center gap-20">
                            <div className="w-full grid grid-cols-2 justify-center items-start gap-2.5">
                                <div className="">
                                    <div className="mb-4 self-stretch text-white/70 text-xl font-semibold font-['Roboto'] capitalize leading-snug tracking-widest">LAUNCHING SOON...</div>
                                    <div className="mb-8 self-stretch text-neutral-100 text-6xl font-normal font-['Roboto'] capitalize leading-10">Talent Portal</div>
                                    <div className="mb-8 self-stretch text-sky-200 text-5xl font-normal font-['Roboto'] capitalize leading-10">Hire Qualified Candidates</div>
                                    <div className="self-stretch text-neutral-100 text-xl font-normal font-['Roboto'] leading-loose">Members of the Coalition have access to our soon to be launched Talent Finder Portal. Our searchable database will quickly connect you with local talent that meets your specific needs.</div>
                                    <div className="flex-col justify-start items-start flex">
                                        <div className="w-px h-2.5 relative" />
                                    </div>
                                    <div className="justify-start items-start gap-5 inline-flex">
                                        <div className="px-5 py-3 bg-cyan-700 rounded-full justify-center items-center gap-2 flex">
                                            <div className="text-center text-white text-base font-medium font-['Roboto'] leading-tight tracking-tight">Join the Coalition</div>
                                        </div>
                                    </div>
                                </div>
                                <img className="w-full rounded-tl-3xl rounded-bl-3xl" src="/images/landing/my-dashboard.png" />
                            </div>
                        </div>
                    </div>
                    {/* Our goal */}
                    <div className="h-72 flex-col justify-center items-center gap-2.5 flex">
                        <div className="mb-4 self-stretch text-center text-neutral-700 text-xl font-semibold font-['Roboto'] capitalize leading-snug tracking-widest">OUR GOAL</div>
                        <div className="mb-4 self-stretch text-center text-cyan-700 text-8xl font-normal font-['Roboto'] leading-10">1,000 Job Candidates</div>
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
            <div className="w-full mt-0 h-12 bg-[#D6F1F7] rounded-bl-3xl rounded-br-3xl" />
        </main>
    );
}
