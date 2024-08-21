import Link from 'next/link';
import Avatar from './Avatar';
import Pill from './Pill';
import RoundedButton from './RoundedButton';
import { SkillDTO } from '@/data/dtos/SkillDTO';
import { BookmarkIcon, ShareIcon } from '@heroicons/react/24/outline';
import { JobseekerSkillDTO } from '@/data/dtos/JobseekerSkillDTO';
import { JobSeekerCardViewDTO } from '@/data/dtos/JobSeekerCardViewDTO';

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
  const firstNSkills: SkillDTO[] = skillsList
    .slice(0, 5)
    .map((item: JobseekerSkillDTO) => item.skills);
  // TODO: compute + display extra skills count

  return (
    <div className="relative w-fit gap-10 rounded-lg border p-6">

      {/* picture and name */}
      <div className="flex-col items-start space-y-2">
        <div className="flex justify-start items-start"><Avatar imgsrc={pfpPicSrc} /></div>
        <div><span className="text-wrap font-bold">{name}</span></div>
      </div>

      {/* description and skills */}
      <div>
        <div className="pt-4 space-y-2">
          <h3><span className="font-bold">{pathway}</span></h3>
          <h4>{school} test school</h4>
          <p>{aboutMe}</p>
        </div>
        <div className="pt-4 space-x-2">
          {firstNSkills.map((pill) => (
            <Pill
              key={pill?.skill_id}
              text={pill?.skill_name}
              href={pill?.skill_info_url}
            />
          ))}
          {/* TODO: add +N-5 skills link here */}

          {/* view profile */}
          {forceSmall ?
            <div className="absolute top-20 right-6 w-fit">
              <RoundedButton
                content={'View Profile'}
                link={'/services/jobseekers/' + id}
                invertColor={false}
              />
            </div>
            :
            <div className="absolute top-20 right-6 tablet:static tablet:flex tablet:pt-2 tablet:justify-end">
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
      <div className="absolute top-6 right-6 gap-4">
        <div className="flex flex-row space-x-6 text-cyan-600">
          <ShareIcon className="h-10 w-10" />
          <BookmarkIcon className="h-10 w-10" />
        </div>
      </div>

    </div>
  );

}
