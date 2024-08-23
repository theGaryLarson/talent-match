import Avatar from './Avatar';
import RoundedButton from './RoundedButton';
import Skills from './Skills';
import { SkillDTO } from '@/data/dtos/SkillDTO';
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { JobseekerSkillDTO } from '@/data/dtos/JobseekerSkillDTO';
import { JobSeekerCardViewDTO } from '@/data/dtos/JobSeekerCardViewDTO';
import ShareButton from './ShareButton';

export default function JobSeekerCardView({
  name,
  school,
  pathway,
  skillsList,
  pfpPicSrc,
  aboutMe,
  id,
  forceSmall
}: {
  name: string | null;
  school: string | null;
  pathway: string | null;
  skillsList: JobSeekerCardViewDTO['jobseeker_has_skills'];
  pfpPicSrc?: string | null;
  aboutMe: string | null;
  id: string;
  forceSmall: boolean | null;
}) {
  // Extract the first few skills from the jobseeker_has_skills array
  const skills: SkillDTO[] = skillsList.map((item: JobseekerSkillDTO) => item.skills);

  return (
    <div className="relative w-fit rounded-lg border border-2 border-cyan-600 p-4 sm-tablet:p-6">

      {/* picture and name */}
      <div className="flex-col items-start space-y-2">
        <div className="flex justify-start items-start"><Avatar imgsrc={pfpPicSrc} /></div>
        <div><span className="text-wrap font-bold">{name}</span></div>
      </div>

      {/* description */}
      <div>
        <div className="pt-4 space-y-2">
          <h3><span className="font-bold">{pathway}</span></h3>
          <h4 className="REPLACE-BEFORE-RELEASE">{school}Test School</h4>
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
              <RoundedButton
                content={'View Profile'}
                link={'/services/jobseekers/' + id}
                invertColor={false}
              />
            </div>
            :
            <div className="absolute top-20 right-2 tablet:static tablet:flex tablet:pt-2 tablet:justify-end">
              <RoundedButton
                content={'View Profile'}
                link={'/services/jobseekers/' + id}
                invertColor={false}
              />
            </div>
          }

        </div>
      </div>

      {/* share and bookmark */}
      <div className="absolute top-5 right-5">
        <div className="flex flex-row space-x-6 text-cyan-600">
          <ShareButton href={'/services/jobseekers/' + id} />
          <div className="p-2 rounded-full hover:bg-slate-200">
            <BookmarkIcon className="h-10 w-10 stroke-2 REPLACE-BEFORE-RELEASE" />
          </div>
        </div>
      </div>

    </div>
  );

}
