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
  const [skillsList, setSkillsList] = useState<string[]>();

  const pathname = usePathname();
  const router = useRouter();

  const queryParams = useSearchParams();
  const setQueryParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(queryParams.toString());
      if (params.get(name) != value) {
        params.set(name, value);
        router.push(pathname + '?' + params.toString());
      }
      return;
    },
    [queryParams]);

  function getSkillsParam() {
    const initSkills: string | null = queryParams.get('skills');
    var skills: string[] = [];
    if (initSkills != null && initSkills.length > 0) skills = decodeURIComponent(initSkills).split(",");
    return skills;
  }

  const execQuery = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchFilteredJobSeekerCardView(skillsList, 0);
      setJobSeekers(data);
    } catch (error) {
      console.error('Error fetching job seekers:', error);
      // TODO: add error UI
    } finally {
      setLoading(false);
    }
  }, [skillsList]);

  useEffect(() => {
    if (skillsList == undefined) setSkillsList(getSkillsParam()); // on initial load, get the skills param from URL
    else execQuery(); // subsequent changes should execute a new query
  }, [skillsList]);

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
          const newVal = (val as SkillDTO[]).map((skill) => skill.skill_name);
          setQueryParam('skills', encodeURIComponent(newVal.toString()));
          setSkillsList(newVal);
        }}
        searchPlaceholder="Skill (ex: Java)"
        getTagLabel={(option: SkillDTO) => option.skill_name}
        getTagLink={(option: SkillDTO) => option.skill_info_url}
        initialTags={getSkillsParam()}
      />

      <h1 className="text-2xl font-bold">Search results:</h1>
      {/* Loading or display results */}
      {loading ? <div className='w-full h-full text-center text-3xl'>Loading...</div> :
        <div className="space-y-4">{jobseekers.map((jobSeeker: JobSeekerCardViewDTO) => (
          <JobSeekerCardView
            key={jobSeeker.jobseeker_id}
            name={jobSeeker.users.first_name + ' ' + jobSeeker.users.last_name}
            pathway={jobSeeker?.pathways?.pathway_title ?? ''}
            jobseeker={jobSeeker}
            pfpPicSrc={jobSeeker?.users?.photo_url}
            aboutMe={jobSeeker?.intro_headline}
            id={jobSeeker?.jobseeker_id}
            forceSmall={false} />
        ))}</div>}
    </main>
  );
}
