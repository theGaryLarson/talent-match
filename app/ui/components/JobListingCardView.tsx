'use client';
import { useState, useEffect } from 'react';
import Avatar from './Avatar';
import Skills from './Skills';
import { useSession } from 'next-auth/react';
import { Role } from '@/data/dtos/UserInfoDTO';
import Bookmark from './Bookmark';
import { Button } from 'flowbite-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import JobListingModalView from './JobListingModalView';
import { SkillDTO } from '@/data/dtos/SkillDTO';
import { JobListingCardViewDTO } from '@/data/dtos/JobListingCardViewDTO';

export default function JobListingCardView({
  joblisting,
}: {
  joblisting: JobListingCardViewDTO;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const job_title: string = joblisting?.job_title;
  const employment_type: string = joblisting.employment_type ?? '';
  const company_name: string = joblisting.companies.company_name;
  const company_image: string = joblisting.companies.company_logo_url ?? '';
  const industry: string = joblisting.industry_sectors?.sector_title ?? '';
  const is_paid: boolean = joblisting.is_paid ?? true;
  const skills: SkillDTO[] = joblisting.skills ?? [];
  const salary_range: string = joblisting?.salary_range ?? '';
  const description: string = joblisting?.job_description ?? '';
  const id: string = joblisting?.job_posting_id ?? '';
  const location: string =
    joblisting?.location + ', ' + joblisting?.county + ', ' + joblisting?.zip;
  const [openModal, setOpenModal] = useState(false);
  const isBookmarked = joblisting?.isBookmarked ?? false;

  const showBookmarks = session?.user.roles.includes(Role.JOBSEEKER);

  const updateQueryParam = (jobId: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (jobId) {
      newSearchParams.set('job', jobId);
    } else {
      newSearchParams.delete('job');
    }
    router.push(`${pathname}?${newSearchParams.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const jobIdFromQuery = searchParams.get('job');
    if (jobIdFromQuery === id) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [searchParams, id]);

  const handleModalChange = (open: boolean) => {
    setOpenModal(open);
    if (open) {
      updateQueryParam(id);
    } else {
      updateQueryParam(null);
    }
  };

  return (
    <>
      <div className="w-full rounded-lg border-2 border-cyan-600 p-2 phone:p-4">
        {/* top row */}
        <div className="flex flex-row items-center">
          {/* picture */}
          <div className="shrink-0">{<Avatar imgsrc={company_image} />}</div>
          {/* name and location */}
          {/* TODO: This should link to the company's page so the jobseeker or whoever can see other postings by that company and other details */}
          <div className="grow pl-2 sm-tablet:pl-4">
            <p className="text-wrap font-bold">{job_title}</p>
            <p className="text-wrap text-sm sm-tablet:text-base">
              {company_name}
            </p>
            <p className="text-wrap text-sm text-slate-400 sm-tablet:text-base">
              {location}
            </p>
          </div>

          {/* view and bookmark */}
          <div className="flex flex-col">
            <div className="h-min w-max">
              <Button
                onClick={() => handleModalChange(true)}
                className="inline-block w-fit rounded-full border-2 border-cyan-600 bg-white px-2 py-2 text-sm text-cyan-600 hover:bg-gray-200 tablet:px-4 tablet:text-base laptop:px-6 laptop:text-lg"
              >
                <strong>View Job</strong>
              </Button>
            </div>
            <div className="mr-2 mt-2 flex flex-row place-self-end text-cyan-600">
              {showBookmarks ? (
                <Bookmark
                  bookmarked={isBookmarked}
                  addUrl={
                    '/api/joblistings/bookmark/add/' + joblisting.job_posting_id
                  }
                  removeUrl={
                    '/api/joblistings/bookmark/remove/' +
                    joblisting.job_posting_id
                  }
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>

        {/* bottom row */}
        <div className="mt-2">
          {/* job description */}
          <p className="line-clamp-3 break-words">{description}</p>

          {/* employment type and salary */}
          <h4 className="mt-2 text-sm italic text-slate-400">
            {employment_type} | {salary_range}
          </h4>

          {/* skills */}
          <div className="mt-2 flex grow text-sm tablet:text-base">
            <Skills
              skillsList={skills}
              maxNumSkills={5}
              jobseekerID={undefined}
            />
          </div>
        </div>
      </div>
      <JobListingModalView
        openModal={openModal}
        handleModalChange={handleModalChange}
        joblisting={joblisting}
      />
    </>
  );
}
