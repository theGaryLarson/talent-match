import JobSeekerCardViewSmall from "./JobSeekerCardViewSmall";
import { getAllJobSeekerCardView } from '@/app/lib/prisma';
import {JobSeekerCardViewDTO} from "@/data/dtos/JobSeekerCardViewDTO";
export default async function FeaturedCandidates(){
  const jobSeekers = await getAllJobSeekerCardView();
    return(
    <div>
    <h2 className="text-lg font-bold py-5">Featured candidates</h2>
      <div className="flex flex-wrap gap-5">
      {jobSeekers.map((jobSeeker) => (
        <JobSeekerCardViewSmall
          key={jobSeeker.jobseeker_id}
          name={jobSeeker.users.first_name + ' ' + jobSeeker.users.last_name}
          school={''} // TODO: needs fixed to align with array
          pathway={jobSeeker?.pathways?.pathway_title ?? ''}
          skillsList={jobSeeker?.jobseeker_has_skills}
          pfpPicSrc={jobSeeker?.users?.photo_url}
          aboutMe={jobSeeker?.intro_headline} id={jobSeeker?.jobseeker_id}        />
      ))}
        
      </div>
    </div>
)}