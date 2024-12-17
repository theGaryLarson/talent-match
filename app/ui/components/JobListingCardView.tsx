'use client';
import { useState, useEffect } from 'react';
import Avatar from './Avatar';
import Skills from './Skills';
import ShareButton from './ShareButton';
import { useSession } from 'next-auth/react';
import { Role } from '@/data/dtos/UserInfoDTO';
import Bookmark from './Bookmark';
import { ShareIcon } from '@heroicons/react/24/outline';
import { Button, Modal } from 'flowbite-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function JobListingCardView({
  joblisting,
}: {
  joblisting: any;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sessionJobseekerId = session?.user?.jobseekerId;

  const name: string = joblisting?.job_title;
  //const pfpPicSrc: string = jobseeker?.users?.photo_url ?? '';
  const employment_type: string = joblisting?.employment_type;
  const aboutMe: string = joblisting?.job_description ?? '';
  const id: string = joblisting?.job_posting_id;
  const location: string =
    joblisting?.location + ', ' + joblisting?.county + ', ' + joblisting?.zip;
  let isBookmarked: boolean = false;
  const [openModal, setOpenModal] = useState(false);

  // are they bookmarked?
  /*if (jobseeker.BookmarkedJobseeker != undefined) {
    // we get back all bookmarks related to this jobseeker, so filter by company/employer ID
    for (let i = 0; i < jobseeker.BookmarkedJobseeker?.length; i++) {
      if (jobseeker.BookmarkedJobseeker[i].companyId == session?.user.companyId &&
        jobseeker.BookmarkedJobseeker[i].employerId == session.user.employerId)
        isBookmarked = true;
      break;
    }
  }*/

  const showBookmarks = session?.user.roles.includes(Role.JOBSEEKER);

  // Function to update the query parameter
  const updateQueryParam = (jobId: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (jobId) {
      newSearchParams.set('job', jobId);
    } else {
      newSearchParams.delete('job');
    }
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    const jobIdFromQuery = searchParams.get('job');
    if (jobIdFromQuery === id) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [searchParams, id]);

  // Function to handle modal open state change
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
      <div className="w-full rounded-lg border border-2 border-cyan-600 p-2 phone:p-4">
        {/* top row */}
        <div className="flex flex-row items-center">
          {/* picture */}
          <div className="shrink-0">{/*<Avatar imgsrc={pfpPicSrc} /> */}</div>

          {/* name and info */}
          <div className="grow pl-2 sm-tablet:pl-4">
            <p className="text-wrap font-bold">{name}</p>
            <p className="text-wrap text-sm sm-tablet:text-base">
              {employment_type}
            </p>
            {/* <p className="text-wrap text-slate-400 text-sm">{yearsExp}, highest degree: {highestDegree}</p> */}
            <p className="text-wrap text-sm text-slate-400 sm-tablet:text-base">
              {location}
            </p>
          </div>

          {/* view and share */}
          <div className="flex flex-col">
            <div className="h-min w-max">
              <Button
                onClick={() => handleModalChange(true)}
                className="inline-block w-fit rounded-full border border-2 border-cyan-600 bg-white px-2 py-2 text-sm text-cyan-600 hover:bg-gray-200 tablet:px-4 tablet:text-base laptop:px-6 laptop:text-lg"
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
              <ShareButton href={'/services/joblistings/' + id}>
                <ShareIcon className="h-10 w-10 stroke-2" />
              </ShareButton>
            </div>
          </div>
        </div>

        {/* bottom row */}
        <div className="mt-2">
          {/* about me */}
          <p className="line-clamp-3">{aboutMe}</p>

          {/* school */}
          <h4 className="mt-2 text-sm italic text-slate-400">school</h4>

          {/* skills */}
          <div className="mt-2 flex grow text-sm tablet:text-base">
            <Skills skillsList={[]} maxNumSkills={5} jobseekerID={id} />
          </div>
        </div>
      </div>
      <Modal
        show={openModal}
        size="5xl"
        onClose={() => handleModalChange(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 p-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {joblisting.job_title}
            </h3>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {joblisting.job_description}
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
