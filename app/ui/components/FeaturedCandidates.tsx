import JobSeekerCardViewSmall from "./JobSeekerCardViewSmall";
import { getAllJobSeekerCardView } from '@/app/lib/prisma';
import JobSeekerCardView from "@/app/ui/components/JobSeekerCardView";

export default async function FeaturedCandidates({ maxCandidates }: { maxCandidates: number | null }) {
  let jobSeekers = await getAllJobSeekerCardView();

  if (jobSeekers && maxCandidates != null && jobSeekers.length > maxCandidates) {
    jobSeekers = jobSeekers.slice(0, maxCandidates);
  }

  return (
    <div>
      <h2 className="text-lg font-bold py-5">Featured Candidates</h2>
      <div className="grid laptop:grid-cols-3 gap-2">
        {jobSeekers.map((jobSeeker: any) => (
          <JobSeekerCardViewSmall
            key={jobSeeker?.jobseeker_id}
            name={jobSeeker?.users?.first_name + ' ' + jobSeeker.users.last_name}
            school={jobSeeker?.jobseeker_education?.eduProviders?.name}
            pathway={jobSeeker?.pathways?.pathway_title ?? ''}
            skillsList={jobSeeker?.jobseeker_has_skills?.skills}
            pfpPicSrc={jobSeeker?.users?.photo_url}
            aboutMe={jobSeeker?.intro_headline}
            id={jobSeeker?.jobseeker_id}
            />
        ))}

      </div>
    </div>
  )
}