'use client'
import JobSeekerCardView from '@/app/ui/components/JobSeekerCardView';
import { JobSeekerCardViewDTO } from "@/data/dtos/JobSeekerCardViewDTO";
import { useCallback, useEffect, useState } from 'react'
import TagsWithAutocomplete from '@/app/ui/components/mui/TagsWithAutocomplete';
import { SkillDTO } from '@/data/dtos/SkillDTO';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import SortDropdown from '@/app/ui/components/mui/SortDropdown';
import MultiSelectFilter from '@/app/ui/components/mui/MultiSelectFilter';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';

async function fetchFilteredJobSeekerCardView(
  skills: string[] = [],
  yearsWorkExp: number = 0,
  page: number = 0,
): Promise<JobSeekerCardViewDTO[]> {
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
  // Listview data
  const [jobseekers, setJobSeekers] = useState<JobSeekerCardViewDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Query data
  const [skillsList, setSkillsList] = useState<string[]>();
  const [industry, setIndustry] = useState<string[]>();
  const [eduLevel, setEduLevel] = useState<string[]>();
  const [yearsExp, setYearsExp] = useState<string[]>();
  const [zipCode, setZipCode] = useState<string[]>();

  // Query sorting/limits
  const [sortBy, setSortBy] = useState<string>();
  const [page, setPage] = useState<number>();

  // GET parameter helpers
  const pathname = usePathname();
  const router = useRouter();
  const queryParams = useSearchParams();
  const setQueryParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(queryParams.toString());
      if (params.get(name) != value) {
        if (value == "") params.delete(name);
        else params.set(name, value);
        router.push(pathname + '?' + params.toString());
      }
      return;
    },
    [queryParams]);

  function getParam(param: string) {
    const retrievedParam: string | null = queryParams.get(param);
    var result: string = "";
    if (retrievedParam != null) result = decodeURIComponent(retrievedParam);
    return result;
  }

  function getArrayParam(param: string) {
    const retrievedParam: string | null = queryParams.get(param);
    var result: string[] = [];
    if (retrievedParam != null && retrievedParam.length > 0) result = decodeURIComponent(retrievedParam).split(",");
    return result;
  }

  // Execute query function
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
    // on initial load, get the params from URL
    if (skillsList == undefined) setSkillsList(getArrayParam("skills"));
    if (industry == undefined) setIndustry(getArrayParam("industry"));
    if (eduLevel == undefined) setEduLevel(getArrayParam("edulevel"));
    if (yearsExp == undefined) setYearsExp(getArrayParam("yearsexp"));
    if (zipCode == undefined) setZipCode(getArrayParam("zipcode"));

    if (sortBy == undefined) setSortBy(getParam("sort") != "" ? getParam("sort") : "newest");
    if (page == undefined) setPage(+getParam("page")); // parseInt(null) returns NaN but +null returns 0!

    // any other change after init load should execute a new query
    else execQuery();
  }, [skillsList, industry, eduLevel, yearsExp, zipCode, sortBy, page]);

  return (
    <main className="m-6 space-y-8 p-6 laptop:px-[200px] py-16">
      <h1 className="text-2xl font-bold">{skillsList?.toString()} Search Results</h1>

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
        initialTags={getArrayParam("skills")}
      />

      <div className="flex flex-row flex-wrap">
        {/* Filters */}
        <MultiSelectFilter
          id="jobseeker-listview-industry"
          label="Industry"
          value={getArrayParam("industry")}
          onChange={(event) => { 
            setQueryParam('industry', encodeURIComponent(event.target.value.toString()));
            setIndustry(event.target.value as string[]);
           }}
          options={[ // TODO: grab valid options from database
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Non-binary", value: "non-binary" },
            { label: "Other", value: "other" },
            { label: "I prefer not to say", value: "undisclosed" },
          ]}
        ></MultiSelectFilter>

        <MultiSelectFilter
          id="jobseeker-listview-edulevel"
          label="Education Level"
          value={getArrayParam("edulevel")}
          onChange={(event) => { 
            setQueryParam('edulevel', encodeURIComponent(event.target.value.toString()));
            setEduLevel(event.target.value as string[]);
           }}
          options={[ // TODO: grab valid options from database
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Non-binary", value: "non-binary" },
            { label: "Other", value: "other" },
            { label: "I prefer not to say", value: "undisclosed" },
          ]}
        ></MultiSelectFilter>

        <MultiSelectFilter
          id="jobseeker-listview-yearsexp"
          label="Years Experience"
          value={getArrayParam("yearsexp")}
          onChange={(event) => { 
            setQueryParam('yearsexp', encodeURIComponent(event.target.value.toString()));
            setYearsExp(event.target.value as string[]);
           }}
          options={[ // TODO: grab valid options from database
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Non-binary", value: "non-binary" },
            { label: "Other", value: "other" },
            { label: "I prefer not to say", value: "undisclosed" },
          ]}
        ></MultiSelectFilter>

        <MultiSelectFilter
          id="jobseeker-listview-zipcode"
          label="Zip/Postal Code"
          value={getArrayParam("zipcode")}
          onChange={(event) => { 
            setQueryParam('zipcode', encodeURIComponent(event.target.value.toString()));
            setZipCode(event.target.value as string[]);
           }}
          options={[ // TODO: grab valid options from database
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Non-binary", value: "non-binary" },
            { label: "Other", value: "other" },
            { label: "I prefer not to say", value: "undisclosed" },
          ]}
        ></MultiSelectFilter>

        {/* Sorting */}
        <SortDropdown
        className="float-right"
          id="jobseeker-listview-sort"
          label="Sort by:"
          value={getParam("sort")}
          onChange={(event) => { 
            setQueryParam('sort', event.target.value);
            setSortBy(event.target.value);
          }}
          options={[
            { label: "Newest", value: "newest" },
            { label: "Oldest", value: "oldest" },
          ]}
        />
      </div>

      {/* Loading or display results */}
      {loading ? <div className='w-full h-full text-center text-3xl'>Loading...</div> :
        <div className="space-y-4">{jobseekers.map((jobSeeker: JobSeekerCardViewDTO) => (
          <JobSeekerCardView
            key={jobSeeker.jobseeker_id}
            name={jobSeeker?.users?.first_name + ' ' + jobSeeker?.users?.last_name}
            pathway={jobSeeker?.pathways?.pathway_title ?? ''}
            jobseeker={jobSeeker}
            pfpPicSrc={jobSeeker?.users?.photo_url}
            aboutMe={jobSeeker?.intro_headline}
            id={jobSeeker?.jobseeker_id}
            forceSmall={false} />
        ))}</div>}

        {/* TODO: Add pagination */}
    </main>
  );
}
