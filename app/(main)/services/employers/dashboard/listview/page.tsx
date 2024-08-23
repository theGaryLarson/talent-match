'use client'
import JobSeekerCardView from '@/app/ui/components/JobSeekerCardView';
import { JobSeekerCardViewDTO } from "@/data/dtos/JobSeekerCardViewDTO";
import { useCallback, useEffect, useState } from 'react'
import TagsWithAutocomplete from '@/app/ui/components/mui/TagsWithAutocomplete';
import { SkillDTO } from '@/data/dtos/SkillDTO';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

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

  const pathname = usePathname()
  const router = useRouter()

  const queryParams = useSearchParams();
  const setQueryParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(queryParams.toString());
      params.set(name, value);
      router.push(pathname + '?' + params.toString());
      return;
    },
    [queryParams]);

  const execQuery = useCallback(async () => {
    setLoading(true);
    try {
      // Assemble our skills array from URL params
      const skillsParam: string | null = queryParams.get('skills');
      var skills: string[] = [];
      if (skillsParam != null) skills = decodeURIComponent(skillsParam).split(",");

      const data = await fetchFilteredJobSeekerCardView(skills, 0);
      setJobSeekers(data);
    } catch (error) {
      console.error('Error fetching job seekers:', error);
      // TODO: add error UI
    } finally {
      setLoading(false);
    }
  }, []);

  // Load the query once on page load
  useEffect(() => {
    (async () => {
      await execQuery();
    })();
  }, []);

  return (
    <main className="m-6 space-y-8 p-6 laptop:px-[200px] py-16">

      {/* Skill Search Bar */}
      <TagsWithAutocomplete
        apiSearchRoute="/api/skills/search/"
        fieldLabel="Select up to 5 skills to search"
        id="employer-listview-skills"
        maxTags={5}
        searchingText="Searching..."
        noResultsText="No skills found..."
        onChange={function (ev, val) {
          const newSkills = encodeURIComponent(val.map(((skill) => skill.skill_name)).toString() || '');
          if (queryParams.get('skills') == newSkills ){
            // do nothing, synthetic change to init tags
          }
          else {
            setQueryParam('skills', newSkills);
            execQuery();
          }
        }}
        searchPlaceholder="Skill (ex: Java)"
        getOptionLabel={(option: SkillDTO) => option.skill_name}
        initialTags={decodeURIComponent(queryParams.get('skills')?? '').split(",")}
      />

      <h1 className="text-2xl font-bold">Search results:</h1>
      {/* Loading or display results */}
      {loading ? <div className='w-full h-full text-center text-3xl'>Loading...</div> :
        <div className="space-y-4">{jobseekers.map((jobSeeker: JobSeekerCardViewDTO) => (
          <JobSeekerCardView
            key={jobSeeker.jobseeker_id}
            name={jobSeeker.users.first_name + ' ' + jobSeeker.users.last_name}
            school={jobSeeker?.jobseeker_education?.eduInstitutions?.name ?? ''}
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
