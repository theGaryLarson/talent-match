import JobSeekerCardView from "./JobSeekerCardView";
import { getJobSeekerCardView } from '@/app/lib/prisma';
import {JobSeekerCardViewDTO} from "@/data/dtos/JobSeekerCardViewDTO";
export default async function FeaturedCanidates(){
  const jobSeekers = await getJobSeekerCardView();
    return(
    <div>
    <h2 className="text-lg font-bold py-5">Featured candidates</h2>
      <div className="flex flex-wrap gap-5">
      {jobSeekers.map((jobSeeker: JobSeekerCardViewDTO) => (
        <JobSeekerCardView
          key={jobSeeker.jobseeker_id}
          isLarge={false}
          name={jobSeeker.contacts.first_name + ' ' + jobSeeker.contacts.last_name}
          school={jobSeeker?.edu_institutions?.name ?? ''}
          pathway={jobSeeker?.pathways?.pathway_title ?? ''}
          skillsList={jobSeeker?.jobseeker_has_skills}
          // pfpPicSrc={jobSeeker?.contacts?.photo_url??null}
          aboutMe={jobSeeker?.intro_headline} id={jobSeeker?.jobseeker_id}        />
      ))}
        
      </div>
    </div>
)}