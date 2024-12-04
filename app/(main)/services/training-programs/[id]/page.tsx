import { getProviderProgramDetailView, ReadEduProviderProgramDetailDTO } from '@/app/lib/eduProviders';
import { getEduProviderLogo } from '@/app/lib/services/azureBlobService';
import { auth } from '@/auth';

export default async function page({ params }: { params: { id: string } }) {
  const session = await auth();
  let trainingProgramDetails: ReadEduProviderProgramDetailDTO = await getProviderProgramDetailView(params.id);

  let logoURL = await getEduProviderLogo(trainingProgramDetails.eduProviderId);
  let logoJSX = logoURL ? <img className="h-64" src={logoURL} /> : ""; // only render if logo is not null

  return (
    <div className="w-full bg-white flex-col justify-start items-start inline-flex">
      <div className="self-stretch px-24 py-8 bg-gradient-to-b from-[#003350] to-[#006682] justify-start items-center gap-2.5 inline-flex">
        <div className="w-2/3 p-6 rounded-2xl flex-col justify-end items-start inline-flex">
          <div className="flex-col justify-center items-start gap-2.5 flex">
            {/* Edu Provider Logo */}
            {logoJSX}

            <div className="flex-col justify-start items-start flex">
              <div className="w-px h-10 relative" />
            </div>
            <div className="text-neutral-100 text-5xl font-medium font-['Roboto'] leading-10">
              {trainingProgramDetails.programName}
            </div>
            <div className="text-sky-200 text-3xl font-normal font-['Roboto'] capitalize leading-10">
              {trainingProgramDetails.eduProviderName}
            </div>
            <div className="flex-col justify-start items-start flex">
              <div className="w-px h-10 relative" />
            </div>
            {trainingProgramDetails.locations.map(function (loc) {
              return <div className="px-4 py-2.5 bg-cyan-700 rounded-full justify-center items-center gap-1 inline-flex">
                <div className="w-4 h-4 relative">
                  <img className="w-4 h-4 left-0 top-0 absolute" src="/images/careers/marker-pin-01.svg" />
                </div>
                <div className="text-center text-white text-sm font-medium font-['Roboto'] capitalize leading-tight tracking-tight">{loc}</div>
              </div>;
            })}
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
            <div className="self-stretch">
              <span className="text-zinc-900 text-base font-normal font-['Roboto'] leading-tight">
                {trainingProgramDetails.about}
              </span>
            </div>
          </div>
          <div className="flex-col justify-start items-start flex">
            <div className="w-px h-2.5 relative" />
          </div>

          {/* FAQ's */}
          <div className="self-stretch flex-col justify-center items-start flex">
            <div className="text-sky-900 text-3xl font-medium font-['Roboto'] leading-10">FAQ’s</div>

            {trainingProgramDetails.faq.map(function (faq) {
              return <div className="self-stretch h-48 pt-4 rounded-3xl flex-col justify-start items-start gap-2 flex">
                <div className="self-stretch p-5 bg-sky-200 rounded-lg justify-between items-center inline-flex">
                  <div className="text-sky-900 text-base font-medium font-['Roboto'] leading-none">
                    {faq.question}
                  </div>
                  <div className="w-5 h-5 relative">
                    <div className="w-5 h-5 left-0 top-0 absolute" />
                  </div>
                </div>
                <div className="self-stretch h-28 px-11 py-5 bg-neutral-100 rounded-lg flex-col justify-center items-start gap-4 flex">
                  <div className="self-stretch text-zinc-900 text-base font-normal font-['Roboto'] leading-snug">
                    {faq.answer}
                  </div>
                </div>
              </div>;
            })}
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
          <div className="self-stretch"><span className="text-neutral-100 text-base font-semibold font-['Roboto'] leading-snug">Tuition: </span>
            <span className="text-neutral-100 text-base font-normal font-['Roboto'] leading-snug">
              {trainingProgramDetails.tuition}
            </span></div>
          <div className="self-stretch"><span className="text-neutral-100 text-base font-semibold font-['Roboto'] leading-snug">Fees: </span>
            <span className="text-neutral-100 text-base font-normal font-['Roboto'] leading-snug">
              {trainingProgramDetails.fees}
            </span></div>
          <div className="self-stretch">
            <span className="text-neutral-100 text-base font-normal font-['Roboto'] leading-snug">
              {trainingProgramDetails.costSummary}
            </span></div>
          <div className="flex-col justify-start items-start flex">
            <div className="w-px h-2.5 relative" />
          </div>
          <div className="text-sky-200 text-base font-semibold font-['Roboto'] uppercase leading-none tracking-wider">type of instruction</div>
          <div className="self-stretch text-neutral-100 text-base font-normal font-['Roboto'] leading-snug">
            {trainingProgramDetails.locationType}
          </div>
        </div>
        <div className="flex-col justify-start items-start flex">
          <div className="w-px h-5 relative" />
        </div>
        <div className="px-5 py-3 bg-neutral-100 rounded-full justify-center items-center gap-1.5 inline-flex">
          <div className="text-center text-sky-900 text-base font-medium font-['Roboto'] capitalize leading-tight tracking-tight">
            <a href={trainingProgramDetails.getStartedUrl} target="_blank">Get Started</a>
          </div>
        </div>
      </div>
    </div>
  );
}