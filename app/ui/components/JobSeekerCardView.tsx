import Link from 'next/link';
import Avatar from './Avatar';
import Pill from './Pill';
import RoundedButton from './RoundedButton';
import { SkillDTO } from '@/data/dtos/SkillDTO';
import { BookmarkIcon, ShareIcon } from '@heroicons/react/24/outline';
import { JobseekerSkill } from '@/data/dtos/JobSeekerSkill';
import { JobSeekerCardViewDTO } from '@/data/dtos/JobSeekerCardViewDTO';

export default function JobSeekerCardView({
  isLarge,
  name,
  school,
  pathway,
  skillsList,
  pfpPicSrc,
  aboutMe,
}: {
  isLarge: boolean;
  name: string | null;
  school: string | null | undefined;
  pathway: string | null | undefined;
  skillsList: JobSeekerCardViewDTO['jobseeker_has_skills'];
  pfpPicSrc?: string | null;
  aboutMe: string;
}) {
  // Extract the first three skills from the jobseeker_has_skills array
  const firstNSkills: SkillDTO[] = skillsList
    .slice(0, 3)
    .map((item: JobseekerSkill) => item.skills);
  if (isLarge) {
    return (
      <div className="flex h-[220px] w-full items-center gap-10 rounded-lg border p-6">
        <div className="flex w-[128px] flex-col items-center text-center">
          <Avatar imgsrc={pfpPicSrc} />
          <span className="text-wrap font-bold">{name}</span>
        </div>
        <div className="flex h-full w-3/5 grow flex-col justify-between">
          <div className="space-y-2">
            <h3>
              <span className="font-bold">{pathway}</span>
              {/*|{' '}*/}
              {/*<span>GPA 3.5</span>*/}
            </h3>
            {/*<h4>{school} | Senior</h4>*/}
            <p>{aboutMe}</p>
          </div>
          <div className="space-x-2">
            {firstNSkills.map((pill) => (
              <Pill
                key={pill?.skill_id}
                text={pill?.skill_name}
                href={pill?.skill_info_url}
              />
            ))}
          </div>
        </div>
        <div className="flex h-full flex-col items-end justify-between">
          <div className="flex h-7 w-20 gap-4">
            <ShareIcon />
            <BookmarkIcon />
          </div>
          <RoundedButton
            content={'View Profile'}
            link={'/login'}
            invertColor={false}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-[280px] w-[350px] space-y-3 rounded-lg border p-2 hover:bg-gray-100">
      <Link className="space-y-3" href={'/services/jobseekers/abc123'}>
        <div className="flex items-center space-x-4">
          <Avatar imgsrc={pfpPicSrc} />
          <h3 className="text-lg font-bold">{name}</h3>
        </div>

        <p className="text-xs">{'"' + aboutMe.substring(0, 100) + '..."'}</p>
      </Link>
      {/* note about me needs to be limited and just trimming to main summary would most likely produce incomplete unprofessional summaries */}
      <hr />

      <h3 className="font-bold">{pathway}</h3>
      <h4 className="text-sm">
        <span className="font-bold">School:</span>
        {school}
      </h4>
      <hr />
      <div className="">
        {firstNSkills.map((pill: SkillDTO) => (
          <Pill
            key={pill?.skill_id}
            text={pill?.skill_name}
            href={pill?.skill_info_url}
          />
        ))}
      </div>
    </div>
  );
}
