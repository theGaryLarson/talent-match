import JobSeekerCardView from "./JobSeekerCardView";
import { getAllJobSeekerCardView } from '@/app/lib/prisma';
import { JobSeekerCardViewDTO } from "@/data/dtos/JobSeekerCardViewDTO";
import jobseekerSlice from "@/lib/features/profileCreation/jobseekerSlice";

export default async function FeaturedCandidates({ maxCandidates }: { maxCandidates: number | null}) {
  var jobSeekers = await getAllJobSeekerCardView();
  
  if(maxCandidates != null && jobSeekers.length > maxCandidates){
    jobSeekers = jobSeekers.slice(0, maxCandidates);
  }

  return (
    <div>
      <h2 className="text-lg font-bold py-5">Featured candidates</h2>
      <div className="grid laptop:grid-cols-3 gap-2">
        {jobSeekers.map((jobSeeker) => (
          <JobSeekerCardView
            key={jobSeeker.jobseeker_id}
            name={jobSeeker.users.first_name + ' ' + jobSeeker.users.last_name}
            school={''} // TODO: needs fixed to align with array
            pathway={jobSeeker?.pathways?.pathway_title ?? ''}
            skillsList={jobSeeker?.jobseeker_has_skills}
            pfpPicSrc={jobSeeker?.users?.photo_url}
            aboutMe={jobSeeker?.intro_headline}
            id={jobSeeker?.jobseeker_id} 
            forceSmall={true} />
        ))}

      </div>
    </div>
  )
}