
import JobSeekerCardView from '@/app/ui/components/JobSeekerCardView';
import SearchBar from '@/app/ui/components/SearchBar';
import { getJobSeekerCardView } from '@/app/lib/prisma';
import {JobSeekerCardViewDTO} from "@/data/dtos/JobSeekerCardViewDTO";
import { Key } from 'react';


export default async function page() {
    const jobSeekers = await getJobSeekerCardView();
    return (
        <main className="space-y-8 px-[200px] py-16">
            <h1 className="text-2xl">Search Results</h1>
            <SearchBar/>
            {jobSeekers.map((jobSeeker: JobSeekerCardViewDTO, index: Key) => (
        <JobSeekerCardView
          key={index}
          isLarge={true}
          name={jobSeeker.contacts.first_name + ' ' + jobSeeker.contacts.last_name}
          school={jobSeeker?.edu_institutions?.name??''}
          pathway={jobSeeker?.pathways?.pathway_title??''}
          skillsList={jobSeeker?.jobseeker_has_skills}
          pfpPicSrc={jobSeeker?.contacts?.photo_url??null}
          aboutMe={jobSeeker?.intro_headline}
        />
      ))}
    </main>
  );
}
