import { getProviderProgramDetailView, ReadEduProviderProgramDetailDTO } from '@/app/lib/eduProviders';
import { auth } from '@/auth';

export default async function page({ params }: { params: { id: string } }) {
  const session = await auth();
  // let trainingProgramDetails = await getProviderProgramDetailView(params.id);

  return (
    <div className="w-full bg-white flex-col justify-start items-start inline-flex">
      <div className="self-stretch px-24 py-8 bg-gradient-to-b from-[#003350] to-[#006682] justify-start items-center gap-2.5 inline-flex"> 
        <div className="w-2/3 p-6 rounded-2xl flex-col justify-end items-start inline-flex">
          <div className="flex-col justify-center items-start gap-2.5 flex">
            <img className="w-64 h-64" src="https://via.placeholder.com/255x255" />
            <div className="flex-col justify-start items-start flex">
              <div className="w-px h-10 relative" />
            </div>
            <div className="text-neutral-100 text-5xl font-medium font-['Roboto'] leading-10">Cybersecurity Administration</div>
            <div className="text-sky-200 text-3xl font-normal font-['Roboto'] capitalize leading-10">Vets to Tech (WAV2T) </div>
            <div className="flex-col justify-start items-start flex">
              <div className="w-px h-10 relative" />
            </div>
            <div className="px-4 py-2.5 bg-cyan-700 rounded-full justify-center items-center gap-1 inline-flex">
              <div className="w-4 h-4 relative">
                <img className="w-4 h-4 left-0 top-0 absolute" src="/images/careers/marker-pin-01.svg" />
              </div>
              <div className="text-center text-white text-sm font-medium font-['Roboto'] capitalize leading-tight tracking-tight">St. Martin’s University - Main Campus</div>
            </div>
            <div className="px-4 py-2.5 bg-cyan-700 rounded-full justify-center items-center gap-1 inline-flex">
              <div className="w-4 h-4 relative">
                <img className="w-4 h-4 left-0 top-0 absolute" src="/images/careers/marker-pin-01.svg" />
              </div>
              <div className="text-center text-white text-sm font-medium font-['Roboto'] capitalize leading-tight tracking-tight">Saint Martin's University - JBLM</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3 pl-32 pr-24 bg-white flex-col justify-start items-start gap-2.5 flex">
        <div className="flex-col justify-start items-start flex">
          <div className="w-px h-10 relative" />
        </div>
        <div className="self-stretch flex-col justify-center items-start gap-2.5 flex">

          {/* About Section */}
          <div className="self-stretch flex-col justify-start items-start gap-2.5 flex">
            <div className="text-sky-900 text-3xl font-medium font-['Roboto'] leading-10">About</div>
            <div className="self-stretch"><span className="text-zinc-900 text-base font-normal font-['Roboto'] leading-tight">The Cybersecurity Administration Program from Washington Vets2Tech is a 16-week certificate designed to jumpstart IT careers and tailored for active-duty service members in their final six months, veterans, and military spouses. This hands-on program offers specialized training in advanced networking, ethical hacking, threat intelligence, and web and app security.<br /><br />At the end of the program, participants will:<br /><br /></span><span className="text-zinc-900 text-base font-normal font-['Roboto'] leading-tight">Understand physical security principles, Internet & wireless security<br />Analyze user authentication, permissions, password & audit policies, encryption & malware<br />Create dedicated firewalls, network isolation & protocol security<br />Configure & protect cloud data stores & local databases<br />Conduct security & risk assessments & system audits<br />Create an incident response report<br />Create a risk assessment report on a real world business<br /></span><span className="text-zinc-900 text-base font-normal font-['Roboto'] leading-tight"><br />Future employees gain the critical skills employers are looking for, with courses mapped to CompTIA Security+ and AWS Cloud Practitioner certifications. Graduates from the program step confidently into roles such as Security Engineer, Information Security Analyst, and Penetration Tester.</span></div>
          </div>
          <div className="flex-col justify-start items-start flex">
            <div className="w-px h-2.5 relative" />
          </div>

          {/* FAQ's */}
          <div className="self-stretch flex-col justify-center items-start flex">
            <div className="text-sky-900 text-3xl font-medium font-['Roboto'] leading-10">FAQ’s</div>
            <div className="self-stretch h-48 pt-4 rounded-3xl flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch p-5 bg-sky-200 rounded-lg justify-between items-center inline-flex">
                <div className="text-sky-900 text-base font-medium font-['Roboto'] leading-none">Who is eligible to apply for the Cybersecurity Administration program?</div>
                <div className="w-5 h-5 relative">
                  <div className="w-5 h-5 left-0 top-0 absolute" />
                </div>
              </div>
              <div className="self-stretch h-28 px-11 py-5 bg-neutral-100 rounded-lg flex-col justify-center items-start gap-4 flex">
                <div className="self-stretch text-zinc-900 text-base font-normal font-['Roboto'] leading-snug">Eligible candidates include active-duty service members within six months of transition, veterans with an honorable or general discharge, and spouses of active-duty service members or eligible veterans.</div>
              </div>
            </div>
            <div className="self-stretch h-48 pt-4 rounded-3xl flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch p-5 bg-sky-200 rounded-lg justify-between items-center inline-flex">
                <div className="text-sky-900 text-base font-medium font-['Roboto'] leading-none">When does the program start, and how long does it last?</div>
                <div className="w-5 h-5 relative">
                  <div className="w-5 h-5 left-0 top-0 absolute" />
                </div>
              </div>
              <div className="self-stretch h-28 px-11 py-5 bg-neutral-100 rounded-lg flex-col justify-center items-start gap-4 flex">
                <div className="self-stretch text-zinc-900 text-base font-normal font-['Roboto'] leading-snug">The Cybersecurity Administration program begins three times a year—in August, January, and May—and runs for 16 weeks dedicating around 36-40 hours a week.</div>
              </div>
            </div>
            <div className="self-stretch h-48 pt-4 rounded-3xl flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch p-5 bg-sky-200 rounded-lg justify-between items-center inline-flex">
                <div className="text-sky-900 text-base font-medium font-['Roboto'] leading-none">How is this program tailored to meet industry needs?</div>
                <div className="w-5 h-5 relative">
                  <div className="w-5 h-5 left-0 top-0 absolute" />
                </div>
              </div>
              <div className="self-stretch h-28 px-11 py-5 bg-neutral-100 rounded-lg flex-col justify-center items-start gap-4 flex">
                <div className="self-stretch text-zinc-900 text-base font-normal font-['Roboto'] leading-snug">The curriculum is crafted with current industry standards and employer demands in mind, emphasizing hands-on, practical skills directly applicable to today’s cybersecurity roles.</div>
              </div>
            </div>
            <div className="self-stretch h-48 pt-4 rounded-3xl flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch p-5 bg-sky-200 rounded-lg justify-between items-center inline-flex">
                <div className="text-sky-900 text-base font-medium font-['Roboto'] leading-none">What skills and certifications will graduates of this program possess?</div>
                <div className="w-5 h-5 relative">
                  <div className="w-5 h-5 left-0 top-0 absolute" />
                </div>
              </div>
              <div className="self-stretch h-28 px-11 py-5 bg-neutral-100 rounded-lg flex-col justify-center items-start gap-4 flex">
                <div className="self-stretch text-zinc-900 text-base font-normal font-['Roboto'] leading-snug">Graduates will have advanced skills in networking, ethical hacking, threat intelligence, and web/app security, along with foundational certifications like CompTIA Security+ and AWS Cloud Practitioner.</div>
              </div>
            </div>
            <div className="self-stretch h-48 pt-4 rounded-3xl flex-col justify-start items-start gap-2 flex">
              <div className="self-stretch p-5 bg-sky-200 rounded-lg justify-between items-center inline-flex">
                <div className="text-sky-900 text-base font-medium font-['Roboto'] leading-none">What makes Vets2Tech program graduates a strong fit for employers?</div>
                <div className="w-5 h-5 relative">
                  <div className="w-5 h-5 left-0 top-0 absolute" />
                </div>
              </div>
              <div className="self-stretch h-28 px-11 py-5 bg-neutral-100 rounded-lg flex-col justify-center items-start gap-4 flex">
                <div className="self-stretch text-zinc-900 text-base font-normal font-['Roboto'] leading-snug">Washington Vets2Tech students bring a unique combination of technical training and discipline from military backgrounds, which makes them particularly well-suited for high-stakes, security-critical environments.</div>
              </div>
            </div>
          </div>
          <div className="flex-col justify-start items-start flex">
            <div className="w-px h-2.5 relative" />
          </div>
        </div>
        <div className="flex-col justify-start items-start flex">
          <div className="w-px h-20 relative" />
        </div>
      </div>
      {/* Quick Info */}
      <div className="w-1/3 p-12 mr-8 right-[0px] top-[119px] fixed bg-[#006682] rounded-3xl flex-col justify-center items-center gap-2.5 flex">
        <div className="self-stretch h-12 flex-col justify-start items-center gap-2.5 flex">
          <div className="self-stretch text-neutral-100 text-5xl font-normal font-['Roboto'] leading-10">Quick Information</div>
        </div>
        <div className="flex-col justify-start items-start flex">
          <div className="w-px h-5 relative" />
        </div>
        <div className="self-stretch h-80 flex-col justify-start items-start gap-2.5 flex">
          <div className="text-sky-200 text-base font-semibold font-['Roboto'] uppercase leading-none tracking-wider">Cost</div>
          <div className="self-stretch"><span className="text-neutral-100 text-base font-semibold font-['Roboto'] leading-snug">Tuition:</span><span className="text-neutral-100 text-base font-normal font-['Roboto'] leading-snug"> $22,450 </span></div>
          <div className="self-stretch"><span className="text-neutral-100 text-base font-semibold font-['Roboto'] leading-snug">Fees:</span><span className="text-neutral-100 text-base font-normal font-['Roboto'] leading-snug"> $1,500</span></div>
          <div className="self-stretch"><span className="text-neutral-100 text-base font-semibold font-['Roboto'] leading-snug">Optional on-campus housing</span><span className="text-neutral-100 text-base font-normal font-['Roboto'] leading-snug"> </span><span className="text-white/70 text-base font-normal font-['Roboto'] leading-snug">(Lacey, WA campus only)</span><span className="text-neutral-100 text-base font-normal font-['Roboto'] leading-snug">:      No cost for active duty using GI Bill, or any active duty traveling from overseas, or $2,895.00/four months for veterans and military spouses</span></div>
          <div className="self-stretch text-neutral-100 text-base font-normal font-['Roboto'] leading-snug">Most program costs are covered for students via VA benefits</div>
          <div className="self-stretch text-neutral-100 text-base font-normal font-['Roboto'] leading-snug">Financial Aid is also available</div>
          <div className="flex-col justify-start items-start flex">
            <div className="w-px h-2.5 relative" />
          </div>
          <div className="text-sky-200 text-base font-semibold font-['Roboto'] uppercase leading-none tracking-wider">type of instruction</div>
          <div className="self-stretch text-neutral-100 text-base font-normal font-['Roboto'] leading-snug">In Person </div>
        </div>
        <div className="flex-col justify-start items-start flex">
          <div className="w-px h-5 relative" />
        </div>
        <div className="px-5 py-3 bg-neutral-100 rounded-full justify-center items-center gap-1.5 inline-flex">
          <div className="text-center text-sky-900 text-base font-medium font-['Roboto'] capitalize leading-tight tracking-tight">Get Started</div>
        </div>
      </div>
    </div>
  );
}