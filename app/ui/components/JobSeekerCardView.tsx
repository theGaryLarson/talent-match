import Avatar from './Avatar';
import Skills from './Skills';
import { SkillDTO } from '@/data/dtos/SkillDTO';
// import { BookmarkIcon } from '@heroicons/react/24/outline';
import { JobseekerSkillDTO } from '@/data/dtos/JobseekerSkillDTO';
import { JobSeekerCardViewDTO } from '@/data/dtos/JobSeekerCardViewDTO';
import ShareButton from './ShareButton';
import Link from 'next/link';

export default function JobSeekerCardView({
  name,
  pathway,
  jobseeker,
  pfpPicSrc,
  aboutMe,
  id,
  forceSmall
}: {
  name: string | null;
  pathway: string | null;
  jobseeker: JobSeekerCardViewDTO;
  pfpPicSrc?: string | null;
  aboutMe: string | null;
  id: string;
  forceSmall: boolean | null;
}) {
  // Extract the first few skills from the jobseeker_has_skills array
  const skills: SkillDTO[] = jobseeker["jobseeker_has_skills"].map((item: JobseekerSkillDTO) => item.skills);

  const cardViewClasses = "relative w-fit rounded-lg border border-2 border-cyan-600 p-4 sm-tablet:p-6";
  return (
    <div className={forceSmall ? cardViewClasses : cardViewClasses + " tablet:flex tablet:flex-row"}>

      {/* picture and name */}
      {forceSmall ?
        <div className="w-full flex-col items-start space-y-2">
          <div className="flex justify-start items-start"><Avatar imgsrc={pfpPicSrc} /></div>
          <div><span className="text-wrap font-bold">{name}</span></div>
        </div>
        :
        <div className="w-full flex-col items-start space-y-2 tablet:items-center tablet:justify-center tablet:m-auto">
          <div className="flex justify-start items-start tablet:items-center tablet:justify-center tablet:mb-6"><Avatar imgsrc={pfpPicSrc} /></div>
          <div className="tablet:text-center"><span className="text-wrap font-bold tablet:text-lg">{name}</span></div>
        </div>
      }

      {/* description */}
      <div>
        <div className="pt-4 space-y-2">
          <h3><span className="font-bold">{pathway}</span></h3>

          {/* TODO: parse this information to account for isEnrolled */}
          <h4>{jobseeker?.jobseeker_education[0] ?
            (
              jobseeker.jobseeker_education[0].eduProviders?.name + ' | ' +
              jobseeker.jobseeker_education[0].degreeType +
              (jobseeker.jobseeker_education[0].major ? + ' | ' + jobseeker.jobseeker_education[0].major : '')
            ) : ''
          }</h4>
          <p>{aboutMe}</p>
        </div>
        {/* skills */}
        <div className="pt-4">
          <Skills
            skillsList={skills}
            maxNumSkills={5}
            jobseekerID={id}
          />

          {/* view profile */}
          {forceSmall ?
            <div className="absolute top-20 right-2 w-fit">
              <Link
                href={'/services/jobseekers/' + id}
                className="border border-1 border-cyan-600 inline-block w-fit rounded-full bg-white px-6 py-2 text-lg text-cyan-600 hover:bg-gray-200">
                <strong>{'View Profile'}</strong>
              </Link>
            </div>
            :
            <div className="absolute top-20 right-2 tablet:static tablet:flex tablet:pt-2 tablet:justify-end">
              <Link
                href={'/services/jobseekers/' + id}
                className="border border-1 border-cyan-600 inline-block w-fit rounded-full bg-white px-6 py-2 text-lg text-cyan-600 hover:bg-gray-200">
                <strong>{'View Profile'}</strong>
              </Link>
            </div>
          }

        </div>
      </div>

      {/* share and bookmark */}
      <div className="absolute top-5 right-5">
        <div className="flex flex-row space-x-6 text-cyan-600">
          <ShareButton href={'/services/jobseekers/' + id} />
          {/* <div className="p-2 rounded-full hover:bg-slate-200">
            <BookmarkIcon className="h-10 w-10 stroke-2 REPLACE-BEFORE-RELEASE" />
          </div> */}
        </div>
      </div>

    </div>
  );

}
