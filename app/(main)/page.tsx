import RoundedButton from "../ui/components/RoundedButton";
import Image from "next/image";
import TrainingProviderMembers from "../ui/components/TrainingProviderMembers";
import { Link } from "@mui/material";

//entire TWC landing page
export const metadata = {
  title: "Tech Workforce Coalition",
};

export default function Page() {
  return (
    <div>
      <div className="py-8 mx-0 tablet:mx-8 laptop:mx-16 font-['Roboto']">
        {/* Header */}
        <div className="w-full py-10 px-8 laptop:px-24 rounded-3xl flex-col justify-center items-center gap-5 inline-flex">
          <div className="text-4xl sm-tablet:text-7xl self-stretch text-center text-sky-900 font-normal font-['Roboto'] capitalize ">
            Washington Tech Workforce Coalition
          </div>
          <div className="text-2xl sm-tablet:text-5xl leading-none mt-4 self-stretch text-center text-sky-900 font-normal font-['Roboto'] leading-10">
            Employers, Educators, & Community Shaping the Future of Tech
          </div>
          <div className="mt-10 justify-start items-start gap-5 inline-flex">
            <RoundedButton
              content={"Join the Coalition"}
              link={"/join"}
              invertColor={true}
            ></RoundedButton>
          </div>
        </div>

        {/* Header image */}
        <div className="w-full relative inline-flex justify-center items-center">
          <Image
            src="/images/landing/banner.jpg"
            width={4096}
            height={2213}
            alt="Stock photo"
            className="w-11/12 tablet:w-3/4 z-50 rounded-3xl shadow-xs"
          />
          {/* Top rounded background rectangle */}
          <div className="w-full h-[40rem] z-0 absolute top-1/2 inline-flex h-72 bg-blue-200 rounded-tl-3xl rounded-tr-3xl" />
        </div>
        {/* Content */}
        <div className="w-full relative justify-center items-center z-1 bg-blue-200">
          <div className="mt-8 px-4 laptop:px-24 flex-col justify-start items-center gap-5 inline-flex">
            <div className="p-4 flex-col justify-start items-center flex">
              {/* About */}
              <div className="justify-center items-center gap-12 mt-10 mb-20 flex-col laptop:flex-row laptop:inline-flex">
                <div className="flex-col justify-center items-center gap-6 flex">
                  <div className="w-full mb-6 h-36 flex justify-center items-center">
                    <Image
                      src="/images/landing/TWC-logo.svg"
                      width={242}
                      height={155}
                      alt="TWC logo"
                      className="w-1/2 sm-tablet:w-1/4 laptop:w-full"
                    />
                  </div>
                  <div className="text-center text-sky-900 text-5xl font-normal font-['Roboto'] leading-10">
                    About TWC
                  </div>
                </div>
                {/* divider */}
                <div className="h-56 w-px hidden laptop:flex flex-col justify-start items-start inline-flex">
                  <div className="w-px h-px relative" />
                  <div className="w-56 shrink origin-top-left rotate-90 border border-cyan-700"></div>
                </div>
                {/* about text */}
                <div className="mt-12 laptop:mt-0 grow shrink basis-0">
                  <span className="text-gray-900 text-xl font-normal font-['Roboto'] leading-loose">
                    The{" "}
                  </span>
                  <span className="text-cyan-700 text-xl font-semibold font-['Roboto'] leading-loose">
                    Washington Tech Workforce Coalition
                  </span>
                  <span className="text-gray-900 text-xl font-normal font-['Roboto'] leading-loose">
                    {" "}
                    is committed to diversifying the IT and cybersecurity sector
                    by bridging the skills gap for underrepresented communities.
                    We&apos;re actively expanding access to tech job
                    opportunities and providing targeted training and mentorship
                    programs. By fostering partnerships between industry
                    leaders, education providers, and community organizations,
                    we&apos;re creating a more inclusive and equitable tech
                    ecosystem where everyone can thrive.
                  </span>
                </div>
              </div>

              {/* Launching soon talent portal */}
              <div className="w-full desktop:w-3/4 pt-8 pb-0 laptop:pb-8 pl-8 pr-8 laptop:pr-0 bg-sky-950 rounded-3xl justify-start items-center gap-20">
                <div className="w-full laptop:grid laptop:grid-cols-2 justify-center items-start gap-2.5">
                  <div className="">
                    <div className="mb-8 self-stretch text-white/70 text-xl font-semibold font-['Roboto'] capitalize leading-snug tracking-widest">
                      LAUNCHING SOON...
                    </div>
                    <div className="text-4xl sm-tablet:text-6xl leading-none mb-4 sm-tablet:mb-12 self-stretch text-neutral-100 font-normal font-['Roboto'] capitalize leading-10">
                      Talent Portal
                    </div>
                    <div className="text-2xl sm-tablet:text-5xl mb-8 self-stretch text-sky-200 font-normal font-['Roboto'] capitalize leading-10">
                      Hire Qualified Candidates
                    </div>
                    <div className="self-stretch text-neutral-100 text-xl font-normal font-['Roboto'] leading-loose">
                      Members of the Coalition have access to our soon to be
                      launched Talent Finder Portal. Our searchable database
                      will quickly connect you with local talent that meets your
                      specific needs.
                    </div>
                    <div className="flex-col justify-start items-start flex">
                      <div className="w-px h-2.5 relative" />
                    </div>
                    <div className="justify-start items-start gap-5 inline-flex">
                      <RoundedButton
                        content={"Join the Coalition"}
                        link={"/join"}
                        invertColor={true}
                      ></RoundedButton>
                    </div>
                  </div>
                  <Image
                    src="/images/landing/my-dashboard.png"
                    width={2356}
                    height={2316}
                    alt="Dashboard preview"
                    className="hidden laptop:block h-full object-cover object-left rounded-tl-3xl rounded-bl-3xl"
                  />
                </div>
                <Image
                  src="/images/landing/my-dashboard.png"
                  width={2356}
                  height={2316}
                  alt="Dashboard preview"
                  className="laptop:hidden mt-10 w-full aspect-square sm-tablet:aspect-auto sm-tablet:h-[36rem] object-cover object-left-top rounded-tl-3xl rounded-tr-3xl"
                />
              </div>
            </div>
            {/* Our goal */}
            <div className="mt-4 laptop:mt-10 h-72 flex-col justify-center items-center gap-2.5 flex">
              <div className="sm-tablet:mb-8 self-stretch text-center text-neutral-700 text-base sm-tablet:text-xl font-semibold font-['Roboto'] capitalize leading-snug tracking-widest">
                OUR GOAL
              </div>
              <div className="sm-tablet:mb-8 leading-none self-stretch text-center text-cyan-700 text-4xl sm-tablet:text-6xl tablet:text-8xl font-normal font-['Roboto']">
                1,000 Job Candidates
              </div>
              <div className="sm-tablet:mb-4 self-stretch text-center text-neutral-700 text-2xl sm-tablet:text-5xl font-normal font-['Roboto'] capitalize leading-10">
                {" "}
                In Tech roles by 2025
              </div>
            </div>
            {/* What we do */}
            <div className="mt-4 laptop:mt-10 mx-4 self-stretch justify-center items-center gap-12 inline-flex">
              <div className="w-full laptop:w-2/3 flex-col justify-center items-start gap-2.5 inline-flex">
                <Image
                  src="/images/landing/what-we-do.jpg"
                  width={4096}
                  height={2731}
                  alt="What we do"
                  className="laptop:hidden mb-4 w-full aspect-square rounded-3xl shadow-xs object-cover"
                />
                <div className="self-stretch text-sky-900 text-xl font-semibold font-['Roboto'] capitalize leading-snug tracking-widest">
                  WHAT WE DO
                </div>
                <div className="text-4xl sm-tablet:text-6xl leading-none self-stretch text-cyan-700 font-normal font-['Roboto'] capitalize leading-10">
                  Build a Workforce for the Future
                </div>
                <div className="self-stretch text-neutral-700 text-xl font-normal font-['Roboto'] leading-loose">
                  Our mission is to meet the rapidly evolving IT/Cybersecurity
                  needs of employers while connecting highly-qualified
                  candidates with in-demand Tech jobs. The advanced training
                  offered by Coalition partners assists candidates in
                  accelerated productivity and a foundation for growth. Build
                  quality through contributors with diverse backgrounds. Help
                  evolve education and training at the speed of technology.
                </div>
                <RoundedButton
                  content={"Join the Coalition"}
                  link={"/join"}
                  invertColor={true}
                ></RoundedButton>
                <div className="self-stretch text-neutral-700 text-xl font-normal font-['Roboto'] leading-loose">
                  <Link href="/services/training-providers">
                    Check out our education and training partners as well.
                  </Link>
                </div>
                <div className="flex-col justify-start items-start flex">
                  <div className="w-px h-7 relative" />
                </div>
              </div>
              <Image
                src="/images/landing/what-we-do.jpg"
                width={4096}
                height={2731}
                alt="What we do"
                className="hidden laptop:block w-96 h-96 rounded-3xl shadow-xs object-cover"
              />
            </div>
          </div>
        </div>
        {/* round off the bottom of the background rectangle */}
        <div className="w-full mt-0 h-12 bg-blue-200 rounded-bl-3xl rounded-br-3xl" />
      </div>

      <div className="w-full mt-20 laptop:mt-40 px-8 laptop:px-24 flex-col justify-start items-center gap-3.5 inline-flex">
        {/* For employers */}
        <div className="self-stretch justify-center items-start gap-12 inline-flex">
          <div className="hidden laptop:block justify-center items-center gap-24 flex">
            <div className="w-96 h-96 relative">
              <div className="w-96 h-96 left-[0.58px] top-[-0px] absolute">
                <Image
                  src="/images/landing/for-employers.jpg"
                  width={1911}
                  height={1505}
                  alt="Stock photo of job candidate"
                  className="hidden laptop:block w-96 shadow-none"
                />
              </div>
            </div>
          </div>
          <div className="w-full laptop:w-1/2 flex-col justify-center items-start gap-2.5 inline-flex">
            <div className="px-4 py-2 bg-blue-200 rounded-2xl justify-start items-center gap-2.5 inline-flex">
              <div className="text-sky-900 text-xl font-semibold font-['Roboto'] capitalize leading-snug tracking-widest">
                FOR EMPLOYERS
              </div>
            </div>
            <Image
              src="/images/landing/for-employers.jpg"
              width={1911}
              height={1505}
              alt="Stock photo of job candidate"
              className="laptop:hidden w-full shadow-none"
            />
            <div className="mt-4 self-stretch text-cyan-700 text-5xl font-normal font-['Roboto'] capitalize leading-10">
              Meet your hiring needs
            </div>
            <div className="mt-4 self-stretch text-neutral-700 text-xl font-normal font-['Roboto'] leading-loose">
              We connect small and medium-sized businesses with skilled local
              candidates in Software, IT/Cloud Support, Cybersecurity, and Data
              Analytics. All candidates are vetted and curated, saving you time
              and money on hiring.
            </div>
            <div className="mt-4 justify-start items-start gap-5 inline-flex">
              <RoundedButton
                content={"Discover Local Talent"}
                link={"/services/talent-search"}
                invertColor={true}
              ></RoundedButton>
            </div>
          </div>
        </div>
        {/* For educators */}
        <div className="mt-24 laptop:mt-16 w-full self-stretch justify-center items-start gap-12 inline-flex">
          <div className="w-full laptop:w-1/2 flex-col justify-center items-start gap-2.5 inline-flex">
            <div className="px-4 py-2 bg-blue-200 rounded-2xl justify-start items-center gap-2.5 inline-flex">
              <div className="text-sky-900 text-xl font-semibold font-['Roboto'] capitalize leading-snug tracking-widest">
                FOR EDUCATORS
              </div>
            </div>
            <Image
              src="/images/landing/for-educators.jpg"
              width={4096}
              height={2731}
              alt="Stock photo of student"
              className="laptop:hidden w-full rounded-3xl object-cover"
            />
            <div className="leading-none mt-4 self-stretch text-cyan-700 text-5xl font-normal font-['Roboto'] capitalize leading-10">
              Empower Students with Insights
            </div>
            <div className="mt-4 self-stretch text-neutral-700 text-xl font-normal font-['Roboto'] leading-loose">
              Discover Essential Skills for Tomorrow&apos;s Workforce. Through
              our Coalition, gain valuable insights directly from employers for
              in-demand skills which will help align your curriculum with the
              most current industry standards. Get your students HIRED.
              <br />
              Quarterly meetings: February, May, August, November
            </div>
            <div className="mt-4 justify-start items-start gap-5 inline-flex">
              <RoundedButton
                content={"Join the Coalition"}
                link={"/join"}
                invertColor={true}
              ></RoundedButton>
            </div>
          </div>
          <Image
            src="/images/landing/for-educators.jpg"
            width={4096}
            height={2731}
            alt="Stock photo of student"
            className="hidden laptop:block w-96 h-96 rounded-3xl object-cover"
          />
        </div>
        {/* For job candidates */}
        <div className="mt-24 laptop:mt-16 self-stretch justify-center items-start gap-12 inline-flex">
          <Image
            src="/images/landing/for-job-candidates.jpg"
            width={1751}
            height={1297}
            alt="Stock photo of job candidate"
            className="hidden laptop:block w-96"
          />
          <div className="w-full laptop:w-1/2 flex-col justify-center items-start gap-2.5 inline-flex">
            <div className="px-4 py-2 bg-blue-200 rounded-2xl justify-start items-center gap-2.5 inline-flex">
              <div className="text-sky-900 text-xl font-semibold font-['Roboto'] capitalize leading-snug tracking-widest">
                FOR JOB CANDIDATES
              </div>
            </div>
            <Image
              src="/images/landing/for-job-candidates.jpg"
              width={1751}
              height={1297}
              alt="Stock photo of job candidate"
              className="laptop:hidden w-full shadow-none"
            />
            <div className="mt-4 self-stretch text-cyan-700 text-5xl font-normal font-['Roboto'] capitalize leading-10">
              standout from the crowd{" "}
            </div>
            <div className="mt-4 self-stretch">
              <span className="text-neutral-700 text-xl font-normal font-['Roboto'] leading-loose">
                Join our Talent Portal and let employers find
              </span>
              <span className="text-cyan-700 text-xl font-semibold font-['Roboto'] leading-loose">
                {" "}
                you
              </span>
              <span className="text-neutral-700 text-xl font-normal font-['Roboto'] leading-loose">
                . Showcase your skills, connect directly with employers, and
                access exclusive career development resources. Create your
                profile today and take the next step toward your dream tech
                role.
              </span>
            </div>
            <div className="mt-4 justify-start items-start gap-5 inline-flex">
              <RoundedButton
                content={"Showcase Your Skills"}
                link={"/services/jobseekers"}
                invertColor={true}
              ></RoundedButton>
            </div>
          </div>
        </div>
      </div>

      {/* footer - join the team of coalition members bg-neutral-100 */}
      <div className="mt-40 px-8 laptop:px-24">
        <TrainingProviderMembers></TrainingProviderMembers>
      </div>
    </div>
  );
}
