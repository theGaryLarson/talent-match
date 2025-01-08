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

interface Props {
    joblisting:any;
    params:any;
}

export default function JobPostingPage({
    joblisting,
    params,
}:Props) {
    const { data: session } = useSession();
    const [applied, setApplied] = useState<boolean>(
        joblisting.jobStatus == JobStatus.Accepted ||
        joblisting.jobStatus == JobStatus.Applied ||
        joblisting.jobStatus == JobStatus.Interviewing ||
        joblisting.jobStatus == JobStatus.Negotiating ||
        joblisting.jobStatus == JobStatus.NoResponse ||
        joblisting.jobStatus == JobStatus.NotSelected
    );

    const job_title: string = joblisting?.job_title ?? '';
    const employment_type: string = joblisting?.employment_type ?? '';
    const company_name: string = joblisting?.companies.company_name ?? '';
    const company_image: string = joblisting?.companies.company_logo_url ?? '';
    const industry: string = joblisting?.industry_sectors?.sector_title ?? '';
    const skills: SkillDTO[] = joblisting?.skills ?? [];
    const is_paid: boolean = joblisting?.is_paid ?? true;
    const salary_range: string = joblisting?.salary_range ?? '';
    const description: string = joblisting?.job_description ?? '';
    const id: string = joblisting?.job_posting_id ?? '';
    const location: string =
    joblisting?.location + ', ' + joblisting?.county + ', ' + joblisting?.zip;
    const isJobseeker = session?.user.roles.includes(Role.JOBSEEKER);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!applied) {
            try {
            const response = await fetch(`/api/joblistings/apply/${id}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to update application status');
            }
            setApplied(true);
            } catch (error) {
            console.error('Error updating application:', error);
            }
        } else {
            try {
            const response = await fetch(`/api/joblistings/withdraw/${id}`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to update application status');
            }
            setApplied(false);
            } catch (error) {
            console.error('Error updating application:', error);
            }
        }
    };

    return (
        <>
            <div className="space-y-4 mb-8">
                {/* Job Title & Company */}
                <div className="flex items-center space-x-4">
                {company_image && (
                    <Avatar imgsrc={company_image ?? undefined} scale={1} />
                )}
                <div>
                    <h4 className="text-lg font-semibold">{job_title}</h4>
                    <p>{company_name}</p>
                    <p className="sm-tablet:text-bas text-wrap text-sm text-slate-400">
                    {location}
                    </p>
                </div>
                </div>

                {/* Job Details */}
                <div className="md:grid-cols-2 grid grid-cols-1 gap-4">
                <div>
                    <p className="font-medium text-gray-700 dark:text-gray-200">
                    Employment Type:
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                    {employment_type}
                    </p>
                </div>
                <div>
                    <p className="font-medium text-gray-700 dark:text-gray-200">
                    Salary:
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">{salary_range}</p>
                </div>
                <div>
                    <p className="font-medium text-gray-700 dark:text-gray-200">
                    Industry:
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">{industry}</p>
                </div>
                </div>

                {/* Job Description */}
                <div>
                <p className="font-medium text-gray-700 dark:text-gray-200">
                    Description:
                </p>
                <p className="break-words text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {description}
                </p>
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                <div>
                    <p className="font-medium text-gray-700 dark:text-gray-200">
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
                <div>
                <p className="font-medium text-gray-700 dark:text-gray-200">
                    About {company_name}:
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {joblisting?.companies.about_us}
                </p>
                </div>
                <div>
                <p className="font-medium text-gray-700 dark:text-gray-200">
                    Our Mission:
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {joblisting?.companies.company_mission}
                </p>
                </div>
                <div>
                <p className="font-medium text-gray-700 dark:text-gray-200">
                    Our Vision:
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {joblisting?.companies.company_vision}
                </p>
                </div>
                {isJobseeker && (
                    <div>
                        <ApplyToJobButton id={params.id}/>
                    </div>
                )}
            </div>
        </>
    );
}