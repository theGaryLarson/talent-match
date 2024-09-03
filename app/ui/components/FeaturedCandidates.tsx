import JobSeekerCardViewSmall from "./JobSeekerCardViewSmall";
import { getAllJobSeekerCardView } from '@/app/lib/prisma';

export default async function FeaturedCandidates({ maxCandidates }: { maxCandidates: number | null }) {
  var jobSeekers = await getAllJobSeekerCardView();

  if (maxCandidates != null && jobSeekers.length > maxCandidates) {
    jobSeekers = jobSeekers.slice(0, maxCandidates);
  }

  return (
    <div>
      <h2 className="text-lg font-bold py-5">Featured Candidates</h2>
      <div className="grid laptop:grid-cols-3 gap-2">
        {jobSeekers.map((jobSeeker: any) => (
          <JobSeekerCardView
            key={jobSeeker.jobseeker_id}
            name={jobSeeker.users.first_name + ' ' + jobSeeker.users.last_name}
            pathway={jobSeeker?.pathways?.pathway_title ?? ''}
            jobseeker={jobSeeker}
            pfpPicSrc={jobSeeker?.users?.photo_url}
            aboutMe={jobSeeker?.intro_headline}
            id={jobSeeker?.jobseeker_id}
            forceSmall={true} />
        ))}

      </div>
    </div>
  )
}