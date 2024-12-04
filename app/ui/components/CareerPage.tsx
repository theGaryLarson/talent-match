export default function CareerPage({
    title, subtitle, img, altCareerNames, avgSalary, trainingLength, prepLevel,
    description, whatYoullDo, skillsYoullNeed, whyItMatters,
    tableAvgSalary, tableEduLevel, tableExpReq, tableJobGrowth,
    trainingPrograms }: {
    title: string, subtitle: string, img: string, altCareerNames: string, avgSalary: string, trainingLength: string, prepLevel: string,
    description: string, whatYoullDo: string, skillsYoullNeed: string, whyItMatters: string,
    tableAvgSalary: string, tableEduLevel: string, tableExpReq: string, tableJobGrowth: string,
    trainingPrograms: string }) {
    return (
        <div className="bg-neutral-100 flex-col justify-start items-center inline-flex">
            <div className="self-stretch px-24 py-8 bg-white flex-col justify-start items-start gap-2.5 flex">
                <div className="self-stretch bg-sky-900 rounded-2xl justify-start items-center inline-flex">
                    <img className="grow shrink basis-0 h-96 rounded-tl-2xl rounded-bl-2xl" src={img} />
                    <div className="grow shrink basis-0 self-stretch p-6 flex-col justify-center items-start gap-2.5 inline-flex">
                        <div className="self-stretch text-neutral-100 text-5xl font-medium font-['Roboto'] leading-10">{title}</div>
                        <div className="self-stretch text-sky-200 text-3xl font-normal font-['Roboto'] capitalize leading-10">{subtitle}</div>
                        <div className="flex-col justify-start items-start flex">
                            <div className="w-px h-10 relative" />
                        </div>
                        <div className="text-white text-base font-semibold font-['Roboto'] uppercase leading-none tracking-wider">Alternative career names</div>
                        <div className="self-stretch text-white/70 text-base font-normal font-['Roboto'] leading-snug">{altCareerNames}</div>
                    </div>
                </div>
            </div>
            <div className="self-stretch py-8 justify-center items-start gap-2.5 inline-flex">
                <div className="px-5 py-4 bg-sky-200 rounded-2xl flex-col justify-start items-center gap-2.5 inline-flex">
                    <div className="self-stretch justify-center items-center gap-2 inline-flex">
                        <div className="w-7 h-7 relative">
                            <img src="\images\careers\currency-dollar-circle.svg" alt="Dollar sign" className="w-7 h-7 left-0 top-0 absolute"></img>
                        </div>
                        <div className="text-sky-900 text-xl font-normal font-['Roboto'] capitalize leading-loose">{avgSalary}</div>
                    </div>
                    <div className="text-cyan-700 text-base font-semibold font-['Roboto'] uppercase leading-none tracking-wider">Average Salary</div>
                </div>
                <div className="px-5 py-4 bg-sky-200 rounded-2xl flex-col justify-start items-center gap-2.5 inline-flex">
                    <div className="self-stretch justify-center items-center gap-2 inline-flex">
                        <div className="w-7 h-7 relative">
                            <img src="\images\careers\clock-check.svg" alt="Clock symbol" className="w-7 h-7 left-0 top-0 absolute"></img>
                        </div>
                        <div className="text-sky-900 text-xl font-normal font-['Roboto'] capitalize leading-loose">{trainingLength}</div>
                    </div>
                    <div className="text-cyan-700 text-base font-semibold font-['Roboto'] uppercase leading-none tracking-wider">Training Program</div>
                </div>
                <div className="px-5 py-4 bg-sky-200 rounded-2xl flex-col justify-start items-center gap-2.5 inline-flex">
                    <div className="self-stretch justify-center items-center gap-2 inline-flex">
                        <div className="w-7 h-7 relative">
                            <img src="\images\careers\file-06.svg" alt="File symbol" className="w-7 h-7 left-0 top-0 absolute"></img>
                        </div>
                        <div className="text-sky-900 text-xl font-normal font-['Roboto'] capitalize leading-loose">{prepLevel}</div>
                    </div>
                    <div className="text-cyan-700 text-base font-semibold font-['Roboto'] uppercase leading-none tracking-wider">Preparation level</div>
                </div>
            </div>
            <div className="self-stretch px-32 bg-white flex-col justify-start items-center gap-2.5 flex">
                <div className="flex-col justify-start items-start flex">
                    <div className="w-px h-10 relative" />
                </div>
                <div className="self-stretch h-64 flex-col justify-center items-center gap-2.5 flex">
                    <div className="self-stretch text-sky-900 text-3xl font-normal font-['Roboto'] leading-10">{description}</div>
                    <div className="flex-col justify-start items-start flex">
                        <div className="w-px h-10 relative" />
                    </div>
                    <div className="justify-center items-start gap-2.5 inline-flex">
                        <div className="w-96 flex-col justify-start items-center gap-2.5 inline-flex">
                            <div className="text-center text-cyan-600 text-base font-semibold font-['Roboto'] uppercase leading-none tracking-wider">WHAT you’ll do</div>
                            <div className="self-stretch text-center text-zinc-900 text-base font-normal font-['Roboto'] leading-snug">{whatYoullDo}</div>
                        </div>
                        <div className="w-96 flex-col justify-start items-center gap-2.5 inline-flex">
                            <div className="text-center text-cyan-600 text-base font-semibold font-['Roboto'] uppercase leading-none tracking-wider">Skills you’ll need</div>
                            <div className="self-stretch text-center text-zinc-900 text-base font-normal font-['Roboto'] leading-snug">{skillsYoullNeed}</div>
                        </div>
                        <div className="w-96 flex-col justify-start items-center gap-2.5 inline-flex">
                            <div className="text-center text-cyan-600 text-base font-semibold font-['Roboto'] uppercase leading-none tracking-wider">Why it matters</div>
                            <div className="self-stretch text-center text-zinc-900 text-base font-normal font-['Roboto'] leading-snug">{whyItMatters}</div>
                        </div>
                    </div>
                </div>
                <div className="flex-col justify-start items-start flex">
                    <div className="w-px h-10 relative" />
                </div>
                {/*<div className="self-stretch h-96 px-24 py-4 rounded-3xl flex-col justify-center items-start gap-2.5 flex">*/}
                {/*    <div className="self-stretch text-sky-900 text-3xl font-medium font-['Roboto'] leading-10">Local Wage Data</div>*/}
                {/*    <div className="self-stretch justify-start items-center inline-flex">*/}
                {/*        <div className="w-72 py-4 rounded-tl-3xl rounded-bl-3xl flex-col justify-start items-start gap-2 inline-flex">*/}
                {/*            <div className="self-stretch p-5 bg-sky-200 rounded-tl-lg rounded-bl-lg justify-center items-center gap-4 inline-flex">*/}
                {/*                <div className="text-sky-900 text-base font-semibold font-['Roboto'] uppercase leading-none tracking-wider">key data points</div>*/}
                {/*            </div>*/}
                {/*            <div className="self-stretch p-5 bg-neutral-100 rounded-tl-lg rounded-bl-lg justify-start items-center gap-4 inline-flex">*/}
                {/*                <div className="text-cyan-700 text-base font-normal font-['Roboto'] leading-snug">Average Salary</div>*/}
                {/*            </div>*/}
                {/*            <div className="self-stretch p-5 bg-neutral-100 rounded-tl-lg rounded-bl-lg justify-start items-center gap-4 inline-flex">*/}
                {/*                <div className="text-cyan-700 text-base font-normal font-['Roboto'] leading-snug">Education Level</div>*/}
                {/*            </div>*/}
                {/*            <div className="self-stretch p-5 bg-neutral-100 rounded-tl-lg rounded-bl-lg justify-start items-center gap-4 inline-flex">*/}
                {/*                <div className="text-cyan-700 text-base font-normal font-['Roboto'] leading-snug">Experience Requirements</div>*/}
                {/*            </div>*/}
                {/*            <div className="self-stretch p-5 bg-neutral-100 rounded-tl-lg rounded-bl-lg justify-start items-center gap-4 inline-flex">*/}
                {/*                <div className="text-cyan-700 text-base font-normal font-['Roboto'] leading-snug">Job Growth Rate</div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="grow shrink basis-0 py-4 rounded-tr-3xl rounded-br-3xl flex-col justify-start items-start gap-2 inline-flex">*/}
                {/*            <div className="self-stretch p-5 bg-sky-200 rounded-tr-lg rounded-br-lg justify-center items-center gap-4 inline-flex">*/}
                {/*                <div className="text-sky-900 text-base font-semibold font-['Roboto'] uppercase leading-none tracking-wider">DETAILS</div>*/}
                {/*            </div>*/}
                {/*            <div className="self-stretch p-5 bg-neutral-100 rounded-tr-lg rounded-br-lg justify-start items-center gap-4 inline-flex">*/}
                {/*                <div className="text-zinc-900 text-base font-normal font-['Roboto'] leading-snug">{tableAvgSalary}</div>*/}
                {/*            </div>*/}
                {/*            <div className="self-stretch p-5 bg-neutral-100 rounded-tr-lg rounded-br-lg justify-start items-center gap-4 inline-flex">*/}
                {/*                <div className="text-zinc-900 text-base font-normal font-['Roboto'] leading-snug">{tableEduLevel}</div>*/}
                {/*            </div>*/}
                {/*            <div className="self-stretch p-5 bg-neutral-100 rounded-tr-lg rounded-br-lg justify-start items-center gap-4 inline-flex">*/}
                {/*                <div className="text-zinc-900 text-base font-normal font-['Roboto'] leading-snug">{tableExpReq}</div>*/}
                {/*            </div>*/}
                {/*            <div className="self-stretch p-5 bg-neutral-100 rounded-tr-lg rounded-br-lg justify-start items-center gap-4 inline-flex">*/}
                {/*                <div className="text-zinc-900 text-base font-normal font-['Roboto'] leading-snug">{tableJobGrowth}</div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="flex-col justify-start items-start flex">*/}
                {/*        <div className="w-px h-10 relative" />*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="self-stretch px-24 flex-col justify-center items-start gap-2.5 flex">
                    <div className="text-sky-900 text-3xl font-medium font-['Roboto'] leading-10">Coalition Provider Training Programs</div>
                    <div className="self-stretch text-zinc-900 text-base font-normal font-['Roboto'] leading-tight">Jumpstart your journey with hands-on, industry-aligned training. These partner programs offer the skills, mentorship, and credentials you need to succeed in your chosen tech career.</div>
                    {/* <div className="self-stretch justify-end items-start gap-2.5 inline-flex">
                        <div className="px-5 py-3 bg-neutral-100 rounded-full justify-center items-center gap-1.5 flex">
                            <div className="text-center text-sky-900 text-base font-medium font-['Roboto'] capitalize leading-tight tracking-tight">See More</div>
                        </div>
                    </div> */}
                    <div className="flex-col justify-start items-start flex">
                        <div className="w-px h-2.5 relative" />
                    </div>
                    <div className="w-96 justify-start items-start gap-4 inline-flex">
                        <div className="flex-col justify-start items-start inline-flex">
                            <div className="flex-col justify-start items-start flex">
                                <div className="w-80 h-80 rounded-3xl flex-col justify-start items-start flex">
                                    <div className="self-stretch grow shrink basis-0 px-7 py-4 bg-neutral-100 rounded-3xl flex-col justify-start items-start gap-2.5 flex">
                                        <div className="self-stretch h-72 flex-col justify-start items-start gap-2.5 flex">
                                            <div className="self-stretch justify-between items-start inline-flex">
                                                <img className="w-36 h-36" src="https://via.placeholder.com/150x150" />
                                                <div className="px-4 py-2.5 bg-cyan-700 rounded-full justify-center items-center gap-1 flex">
                                                    <div className="text-center text-white text-sm font-medium font-['Roboto'] capitalize leading-tight tracking-tight">K12</div>
                                                </div>
                                            </div>
                                            <div className="self-stretch text-sky-900 text-3xl font-normal font-['Roboto'] leading-10">Software Engineering</div>
                                            <div className="self-stretch h-4 justify-start items-start gap-2.5 inline-flex">
                                                <div className="text-cyan-700 text-base font-semibold font-['Roboto'] uppercase leading-none tracking-wider">PER SCHOLAS | esd 112</div>
                                            </div>
                                            <div className="self-stretch h-4 justify-start items-start gap-2.5 inline-flex">
                                                <div className="text-zinc-900/60 text-base font-normal font-['Roboto'] uppercase leading-none tracking-wider">9 Months | no cost</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-col justify-start items-start inline-flex">
                            <div className="flex-col justify-start items-start flex">
                                <div className="w-80 h-80 rounded-3xl flex-col justify-start items-start flex">
                                    <div className="self-stretch grow shrink basis-0 px-7 py-4 bg-neutral-100 rounded-3xl flex-col justify-start items-start gap-2.5 flex">
                                        <div className="self-stretch h-64 flex-col justify-start items-start gap-2.5 flex">
                                            <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                                                <img className="w-36 h-36" src="https://via.placeholder.com/150x150" />
                                            </div>
                                            <div className="self-stretch text-sky-900 text-3xl font-normal font-['Roboto'] leading-10">General : IT Training</div>
                                            <div className="self-stretch h-4 justify-start items-start gap-2.5 inline-flex">
                                                <div className="text-cyan-700 text-base font-semibold font-['Roboto'] uppercase leading-none tracking-wider">Per scholas | remote</div>
                                            </div>
                                            <div className="self-stretch h-4 justify-start items-start gap-2.5 inline-flex">
                                                <div className="text-zinc-900/60 text-base font-normal font-['Roboto'] uppercase leading-none tracking-wider">3-4 Months | No cost</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-col justify-start items-start inline-flex">
                            <div className="flex-col justify-start items-start flex">
                                <div className="w-80 h-80 rounded-3xl flex-col justify-start items-start flex">
                                    <div className="self-stretch grow shrink basis-0 px-7 py-4 bg-neutral-100 rounded-3xl flex-col justify-start items-start gap-2.5 flex">
                                        <div className="self-stretch h-72 flex-col justify-start items-start gap-2.5 flex">
                                            <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
                                                <img className="w-36 h-36" src="https://via.placeholder.com/150x150" />
                                            </div>
                                            <div className="self-stretch text-sky-900 text-3xl font-normal font-['Roboto'] leading-10">Tech Talent Boost Washington</div>
                                            <div className="self-stretch h-4 justify-start items-start gap-2.5 inline-flex">
                                                <div className="text-cyan-700 text-base font-semibold font-['Roboto'] uppercase leading-none tracking-wider">RiiPEN | North seattle c.c.</div>
                                            </div>
                                            <div className="self-stretch h-4 justify-start items-start gap-2.5 inline-flex">
                                                <div className="text-zinc-900/60 text-base font-normal font-['Roboto'] uppercase leading-none tracking-wider">4 weeks | no cost</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-col justify-start items-start inline-flex">
                            <div className="flex-col justify-start items-start flex">
                                <div className="w-80 h-80 rounded-3xl flex-col justify-start items-start flex">
                                    <div className="self-stretch grow shrink basis-0 px-7 py-4 bg-neutral-100 rounded-3xl flex-col justify-start items-start gap-2.5 flex">
                                        <div className="self-stretch h-72 flex-col justify-start items-start gap-2.5 flex">
                                            <div className="self-stretch justify-between items-start inline-flex">
                                                <img className="w-36 h-36" src="https://via.placeholder.com/150x150" />
                                                <div className="px-4 py-2.5 bg-cyan-700 rounded-full justify-center items-center gap-1 flex">
                                                    <div className="text-center text-white text-sm font-medium font-['Roboto'] capitalize leading-tight tracking-tight">COLLEGE</div>
                                                </div>
                                            </div>
                                            <div className="self-stretch text-sky-900 text-3xl font-normal font-['Roboto'] leading-10">Cloud Application Development</div>
                                            <div className="self-stretch h-4 justify-start items-start gap-2.5 inline-flex">
                                                <div className="text-cyan-700 text-base font-semibold font-['Roboto'] uppercase leading-none tracking-wider">Vets to Tech (WAV2T) </div>
                                            </div>
                                            <div className="self-stretch h-4 justify-start items-start gap-2.5 inline-flex">
                                                <div className="text-zinc-900/60 text-base font-normal font-['Roboto'] uppercase leading-none tracking-wider">4 MONTHS | $22,450+$880 FEE</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-col justify-start items-start flex">
                    <div className="w-px h-20 relative" />
                </div>
            </div>
        </div>
    );
}