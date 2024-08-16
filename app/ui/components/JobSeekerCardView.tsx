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
  id
}: {
  name: string | null;
  school: string | null;
  pathway: string | null;
  skillsList: JobSeekerCardViewDTO['jobseeker_has_skills'];
  pfpPicSrc?: string | null;
  aboutMe: string | null;
  id:string;
}) {
  // Extract the first three skills from the jobseeker_has_skills array
  const firstNSkills: SkillDTO[] = skillsList
    .slice(0, 5)
    .map((item: JobseekerSkillDTO) => item.skills);

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
            <h4>{school}</h4>
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
            link={'/services/jobseekers/'+id}
            invertColor={false}
          />
        </div>
      </div>
    );

  
}
