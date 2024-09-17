import Avatar from './Avatar';
import Skills from './Skills';
import { SkillDTO } from '@/data/dtos/SkillDTO';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { JobseekerSkillDTO } from '@/data/dtos/JobseekerSkillDTO';
import { JobSeekerCardViewDTO } from '@/data/dtos/JobSeekerCardViewDTO';
import ShareButton from './ShareButton';
import Link from 'next/link';

export default function JobSeekerCardView({ jobseeker }: { jobseeker: JobSeekerCardViewDTO }) {
  const name: string = jobseeker?.users?.first_name + ' ' + jobseeker?.users?.last_name;
  // const pathway: string = jobseeker?.pathways?.pathway_title ?? '';
  const pfpPicSrc: string = jobseeker?.users?.photo_url ?? '';
  const aboutMe: string = jobseeker?.intro_headline ?? '';
  const id: string = jobseeker?.jobseeker_id;
  const industry: string = [...new Set(jobseeker?.work_experiences?.map(ind => ind.industrySector?.sector_title))].toString().replaceAll(',', ', ') ?? '';
  const location: string = jobseeker?.users?.user_addresses[0].city + ', ' + jobseeker?.users?.user_addresses[0].state + ' ' + jobseeker?.users?.user_addresses[0].zip;

  const yearsExp: string = jobseeker.years_work_exp + ' years work exp';
  const highestDegree: string = jobseeker.highest_level_of_study_completed ?? '';

  const skills: SkillDTO[] = jobseeker?.jobseeker_has_skills ?
    jobseeker?.jobseeker_has_skills.map((item: JobseekerSkillDTO) => item.skills) : [];

  // Decide what school to show
  let school = "";
  if (jobseeker?.jobseeker_education && jobseeker.jobseeker_education.length > 0) {
    // Check if the jobseeker is currently enrolled in any education program
    const enrolledEducation = jobseeker.jobseeker_education.find((edu) => edu.isEnrolled);

    if (enrolledEducation) {
      // If there is an enrolled program, prioritize that
      school = (enrolledEducation.eduProviders?.name || '') + ' | ' +
        (enrolledEducation?.degreeType || '') +
        (enrolledEducation.program?.title ? ' | ' + enrolledEducation?.program?.title : '');
    } else {
      // If no enrolled program is found, show the first available education
      const firstEducation = jobseeker.jobseeker_education[0];
      school = (firstEducation.eduProviders?.name || '') + ' | ' +
        (firstEducation?.degreeType || '') +
        (firstEducation?.program?.title ? ' | ' + firstEducation.program.title : '');
    }
  }

  return (
    <div className="w-full rounded-lg border border-2 border-cyan-600 p-2 phone:p-4">

      {/* top row */}
      <div className="flex flex-row items-center">

        {/* picture */}
        <div className="shrink-0">
          <Avatar imgsrc={pfpPicSrc} />
        </div>

        {/* name and info */}
        <div className="pl-2 sm-tablet:pl-4 grow">
          <p className="text-wrap font-bold">{name}</p>
          <p className="text-wrap text-sm sm-tablet:text-base">{industry}</p>
          {/* <p className="text-wrap text-slate-400 text-sm">{yearsExp}, highest degree: {highestDegree}</p> */}
          <p className="text-wrap text-slate-400 text-sm sm-tablet:text-base">{location}</p>
        </div>

        {/* view and share */}
        <div className="flex flex-col">
          <div className="w-max h-min">
            <Link
              href={'/services/jobseekers/' + id}
              className="border border-2 border-cyan-600 inline-block w-fit rounded-full bg-white py-2 px-2 tablet:px-4 laptop:px-6 text-sm tablet:text-base laptop:text-lg text-cyan-600 hover:bg-gray-200">
              <strong>View Profile</strong>
            </Link>
          </div>
          <div className="w-min mt-2 mr-2 text-cyan-600 place-self-end">
            <ShareButton href={'/services/jobseekers/' + id} />
            {/* <div className="p-2 rounded-full hover:bg-slate-200">
              <BookmarkIcon className="h-10 w-10 stroke-2 REPLACE-BEFORE-RELEASE" />
            </div> */}
          </div>
        </div>
      </div>

      {/* bottom row */}
      <div className="mt-2">

        {/* about me */}
        <p className="line-clamp-3">{aboutMe}</p>

        {/* school */}
        <h4 className="italic text-slate-400 mt-2 text-sm">{school}</h4>

        {/* skills */}
        <div className="mt-2 flex grow text-sm tablet:text-base">
          <Skills skillsList={skills} maxNumSkills={5} jobseekerID={id} />
        </div>
      </div>
    </div>
  );

}
