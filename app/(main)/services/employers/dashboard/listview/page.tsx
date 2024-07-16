'use client'
import JobSeekerCardView from '@/app/ui/components/JobSeekerCardView';
import SearchBar from '@/app/ui/components/SearchBar';
import {getFilteredJobSeekerCardView} from "@/app/lib/prisma";
import {JobSeekerCardViewDTO} from "@/data/dtos/JobSeekerCardViewDTO";
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation';


export default function page() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search')//this is the search term 
  //beacuse this need to be a client component we can use the prisma client directly and we need an api route to hit 
    //const filteredView = await getFilteredJobSeekerCardView(['']);
    return (
        <main className="space-y-8 px-[200px] py-16">
            <h1 className="text-2xl">Search Results</h1>
              <SearchBar />
            {/* {filteredView.map((jobSeeker: JobSeekerCardViewDTO) => (
        <JobSeekerCardView
                key={jobSeeker.jobseeker_id}
                isLarge={true}
                name={jobSeeker.contacts.first_name + ' ' + jobSeeker.contacts.last_name}
                school={jobSeeker?.edu_institutions?.name ?? ''}
                pathway={jobSeeker?.pathways?.pathway_title ?? ''}
                skillsList={jobSeeker?.jobseeker_has_skills}
                pfpPicSrc={jobSeeker?.contacts?.photo_url ?? null}
                aboutMe={jobSeeker?.intro_headline} id={jobSeeker?.jobseeker_id} />
      ))} */}
    </main>
  );
}
