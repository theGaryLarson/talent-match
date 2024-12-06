import { getProviderProgramCardView, ReadEduProviderProgramCardDTO } from "@/app/lib/eduProviders";
import { getEduProviderLogo } from "@/app/lib/services/azureBlobService";

export default async function TrainingProgramCard(program: ReadEduProviderProgramCardDTO) {

    // default to TWC if missing edu provider logo
    let logoURL = program.logoUrl || "/images/TWC_75x50_2024.svg";

    return (
        <div className="flex-col justify-start items-start inline-flex">
            <div className="flex-col justify-start items-start flex">
                <div className="w-80 rounded-3xl flex-col justify-start items-start flex">
                    <a href={'/services/training-programs/' + program.programId} className="w-80">
                    <div className="self-stretch grow shrink basis-0 px-7 py-4 bg-neutral-100 hover:bg-sky-900 text-sky-900 hover:text-neutral-100 rounded-3xl flex-col justify-start items-start gap-2.5 flex">
                        <div className="self-stretch flex-col justify-start items-start gap-2.5 flex h-72">
                            <div className="self-stretch justify-between items-start inline-flex">
                                {<img className="h-36 w-36" src={logoURL} />}
                                {program.eduLevel && <div className="ml-4 px-4 py-2.5 bg-cyan-700 rounded-full justify-center items-center gap-1 flex">
                                    <div className="text-center text-white text-sm font-medium font-['Roboto'] capitalize leading-tight tracking-tight">
                                        {program.eduLevel}
                                    </div>
                                </div>}
                            </div>
                            <div className="self-stretch text-3xl font-normal font-['Roboto'] leading-10">
                                {program.programName}
                            </div>
                            <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                                <div className="text-cyan-600 text-base font-semibold font-['Roboto'] uppercase leading-none tracking-wider">
                                    {program.eduProviderName}{program.locationType && " | "}{program.locationType}
                                </div>
                            </div>
                            <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                                <div className="text-base font-normal font-['Roboto'] uppercase leading-none tracking-wider">
                                    {program.programLength}{program.programLength && " | "}{program.tuition}{program.tuition && " | "}{program.fees}{program.fees && " fee"}
                                </div>
                            </div>
                        </div>
                    </div>
                    </a>
                </div>
            </div>
        </div>
    );

}
