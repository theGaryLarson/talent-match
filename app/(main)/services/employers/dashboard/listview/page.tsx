'use client'
import JobSeekerCardView from '@/app/ui/components/JobSeekerCardView';
import SearchBar from '@/app/ui/components/SearchBar';
import {JobSeekerCardViewDTO} from "@/data/dtos/JobSeekerCardViewDTO";
import {useCallback, useEffect, useState} from 'react'
import { useSearchParams } from 'next/navigation';

async function fetchFilteredJobSeekerCardView(skills: string[] = [], yearsWorkExp: number = 0): Promise<JobSeekerCardViewDTO[]> {
  const response = await fetch('/api/jobseekers/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ skills, yearsWorkExp })
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}
export default function Page() {
  const [jobseekers, setJobSeekers] = useState<JobSeekerCardViewDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const loadJobSeekers = useCallback(async () => {
    setLoading(true);
    try {
      const skills = search ? search.split(',') : [];
      const data = await fetchFilteredJobSeekerCardView(skills, 0);
      setJobSeekers(data);
    } catch (error) {
      console.error('Error fetching job seekers:', error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    (async () => {
      await loadJobSeekers();
    })();
  }, [loadJobSeekers]);

    return (
        <main className="space-y-8 p-6 tablet:w-full tablet:p-5 laptop:px-[200px] py-16">
            <h1 className="text-2xl">{searchParams.get('search') || ''} Search Results</h1>
              <SearchBar />
              {loading?<div className='w-full h-full text-center text-3xl'>Loading...</div>:        
              <div className="m-6 space-y-2">{jobseekers.map((jobSeeker: JobSeekerCardViewDTO) => (
              <JobSeekerCardView
                key={jobSeeker.jobseeker_id}
                name={jobSeeker.users.first_name + ' ' + jobSeeker.users.last_name}
                school={jobSeeker?.jobseeker_education?.eduProviders?.name ?? ''}
                pathway={jobSeeker?.pathways?.pathway_title ?? ''}
                skillsList={jobSeeker?.jobseeker_has_skills}
                pfpPicSrc={jobSeeker?.users?.photo_url}
                aboutMe={jobSeeker?.intro_headline} 
                id={jobSeeker?.jobseeker_id} 
                forceSmall={false} />
      ))}</div>}
        </main>
  );
}
