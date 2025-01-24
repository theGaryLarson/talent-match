"use client";

import { JobStatus } from "@/app/lib/jobseekerJobTracking";
import Bookmark from "@/app/ui/components/Bookmark";
import ApplyToJobButton from "@/app/ui/components/jobPostings/ApplyToJobButton";
import DeleteJobPostingButton from "@/app/ui/components/jobPostings/DeleteJobPostingButton";
import Skills from "@/app/ui/components/Skills";
import { SkillDTO } from "@/data/dtos/SkillDTO";
import { Role } from "@/data/dtos/UserInfoDTO";
import { Button } from "flowbite-react";
import Avatar from "@/app/ui/components/Avatar";
import { useState } from "react";
import { JobListingCardViewDTO } from "@/data/dtos/JobListingCardViewDTO";
import { useSession } from "next-auth/react";
import { calculateDaysAway } from "@/app/lib/utils";

function daysAwayToString(date:Date) :string {
    const daysAway = calculateDaysAway(date);
    if (daysAway === 0) {
        return "today";
    } else {
        const plural = (Math.abs(daysAway) === 1) ? '' : 's';
        if (daysAway < 0) {
            return `${Math.abs(daysAway)} day${plural} ago`;
        } else {
            return `in ${daysAway} day${plural}`;
        }
    }
}

interface Props {
    joblisting:any;
    params:any;
}

export default function JobPostingPage({
    joblisting,
    params,
}:Props) {
    const { data: session } = useSession();

    const job_title: string = joblisting?.job_title ?? '';
    const employment_type: string = joblisting?.employment_type ?? '';
    const company_name: string = joblisting?.companies.company_name ?? '';
    const company_image: string = joblisting?.companies.company_logo_url ?? '';
    const industry: string = joblisting?.industry_sectors?.sector_title ?? '';
    const skills: SkillDTO[] = joblisting?.skills ?? [];
    const salary_range: string = joblisting?.salary_range ?? '';
    const description: string = joblisting?.job_description ?? '';
    const location: string = joblisting?.location + ', ' + joblisting?.company_addresses?.locationData?.city + ', ' + joblisting?.zip;
    const isJobseeker = session?.user.roles.includes(Role.JOBSEEKER);

    return (
        <main className="space-y-4 mb-8 mx-4">
            {/* Job Title & Company */}
            <div className="block tablet:flex tablet:flex-wrap">
                <div className="flex items-center space-x-4 mb-4">
                    {company_image && (
                        <div className="min-w-[85px]">
                            <Avatar imgsrc={company_image ?? undefined} scale={1} />
                        </div>
                    )}
                    <div>
                        <h4 className="text-lg font-semibold">
                            {job_title}
                        </h4>
                        <p>
                            {company_name}
                        </p>
                        <p className="capitalize sm-tablet:text-bas text-wrap text-sm text-gray-500 dark:text-gray-400">
                            {location}
                        </p>
                    </div>
                    <div className="self-start">
                        {
                            session && session.user.jobseekerId
                                ?   <Bookmark
                                        bookmarked={
                                            joblisting?.jobApplications.find(
                                                (app:any) => (
                                                    app.jobPostId === params.id
                                                    && app.jobseekerId === session.user.jobseekerId
                                                )
                                            )?.isBookmarked
                                            ?? false
                                        }
                                        addUrl={`/api/joblistings/bookmark/add/${joblisting?.job_posting_id}`}
                                        removeUrl={`/api/joblistings/bookmark/remove/${joblisting?.job_posting_id}`}
                                    />
                                :   ""
                        }
                        {
                            session && joblisting && (session.user.companyId === joblisting.company_id || session.user.roles.includes(Role.ADMIN))
                                ?   <DeleteJobPostingButton id={params.id}/>
                                :   ""
                        }
                    </div>
                </div>
                {
                    joblisting &&
                    <div className="grow self-center mb-8 mr-4 text-left tablet:text-right text-gray-500 dark:text-gray-400">
                        <p className="text-sm">Posted {daysAwayToString(joblisting.publish_date)} @ {joblisting.publish_date.toLocaleString('en-us', { timeZoneName:'short', month: 'numeric', day: 'numeric', year: 'numeric', /*hour: 'numeric', minute: 'numeric'*/ })}</p>
                        <p className="text-sm">Closing {daysAwayToString(joblisting.unpublish_date)} @ {joblisting.unpublish_date.toLocaleString('en-us', { timeZoneName:'short', month: 'numeric', day: 'numeric', year: 'numeric', /*hour: 'numeric', minute: 'numeric'*/ })}</p>
                    </div>
                }
            </div>

            {/* Job Details */}
            <div className="sm-tablet:grid-cols-3 grid grid-cols-1 gap-4">
                <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-200">
                        Employment Type:
                    </p>
                    <p className="capitalize text-gray-500 dark:text-gray-400">
                        {employment_type}
                    </p>
                </div>
                <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-200">
                        Salary:
                    </p>
                    <p className="capitalize text-gray-500 dark:text-gray-400">
                        {salary_range}
                    </p>
                </div>
                <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-200">
                        Industry:
                    </p>
                    <p className="capitalize text-gray-500 dark:text-gray-400">
                        {industry}
                    </p>
                </div>
            </div>

            {/* Job Description */}
            <div>
                <p className="font-semibold text-gray-700 dark:text-gray-200">
                    Description:
                </p>
                <p className="break-words text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {description}
                </p>
            </div>

            {/* Skills */}
            {skills.length > 0 && (
            <div>
                <p className="font-semibold text-gray-700 dark:text-gray-200">
                    Skills:
                </p>
                <div className="mt-2 flex grow text-sm tablet:text-base">
                    <Skills
                        skillsList={skills}
                        maxNumSkills={5}
                        jobseekerID={undefined}
                    />
                </div>
            </div>
            )}

            {/* Company Information */}
            <div className="space-y-4 p-2 bg-gray-bg rounded-md">
          {joblisting?.companies.about_us && <div>
            <p className="font-semibold text-gray-700 dark:text-gray-200">
              About {company_name}:
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {joblisting?.companies.about_us}
            </p>
          </div>}
                {joblisting?.companies.company_mission && <div>
                    <p className="font-semibold text-gray-700 dark:text-gray-200">
                        Our Mission:
                    </p>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {joblisting?.companies.company_mission}
                    </p>
                </div>}
              {joblisting?.companies.company_vision && <div>
                <p className="font-semibold text-gray-700 dark:text-gray-200">
                  Our Vision:
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {joblisting?.companies.company_vision}
                </p>
              </div>}
            </div>
            {(isJobseeker || !session?.user) && (
                <div>
                    <ApplyToJobButton id={params.id} appliedStatus={joblisting.jobStatus}/>
                </div>
            )}
        </main>
    );
}