import Link from 'next/link';
import Avatar from './Avatar';
import Pill from './Pill';
import RoundedButton from './RoundedButton';
import { SkillDTO } from '@/data/dtos/SkillDTO';
import { BookmarkIcon, ShareIcon } from '@heroicons/react/24/outline';
import { JobseekerSkillDTO } from '@/data/dtos/JobseekerSkillDTO';
import { JobSeekerCardViewDTO } from '@/data/dtos/JobSeekerCardViewDTO';

export default function JobSeekerCardViewSmall({
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
    <div className="min-h-[280px] w-[350px] space-y-3 rounded-lg border p-2 hover:bg-gray-100">
      <Link className="space-y-3" href={'/services/jobseekers/'+id}>
        <div className="flex items-center space-x-4">
          <Avatar imgsrc={pfpPicSrc} />
          <h3 className="text-lg font-bold">{name}</h3>
        </div>

        <p className="text-xs">{'"' + aboutMe?.substring(0, 100) + '..."'}</p>
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
            grayscale={false}
          />
        ))}
      </div>
    </div>
  );
}
