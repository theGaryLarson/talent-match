'use client'
import JobSeekerCardView from '@/app/ui/components/JobSeekerCardView';
import { JobSeekerCardViewDTO } from "@/data/dtos/JobSeekerCardViewDTO";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import TagsWithAutocomplete from '@/app/ui/components/mui/TagsWithAutocomplete';
import { SkillDTO } from '@/data/dtos/SkillDTO';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import SortDropdown from '@/app/ui/components/mui/SortDropdown';
import Pagination from '@mui/material/Pagination';
import SingleSelectFilter from '@/app/ui/components/mui/SingleSelectFilter';
import { IndustrySectorDropdownDTO } from '@/data/dtos/IndustrySectorDropdownDTO';
import MultipleSelectFilterAutoload from '@/app/ui/components/mui/MultiSelectFilterAutoload';
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const resultsPerPage = 50;

async function fetchFilteredJobSeekerCardView(
  skills: string[] = [],
  industry: string[] = [],
  eduLevel: string = "",
  yearsWorkExp: string = "0",
  zipCode: string = "",
  sortBy: string = "newest",
  maxResults: number = resultsPerPage,
  page: number = 1,
): Promise<JobSeekerCardViewDTO[]> {

  // Hacky convert the strings to numbers for the request
  var workExp = 0;
  var zip = null;
  var pageNum = 1;
  if (yearsWorkExp != "") workExp = Number.parseInt(yearsWorkExp);
  if (zipCode != "") zip = Number.parseInt(zipCode);
  if (page != 0) pageNum = page; // if page=0, no GET param set for page, and we actually call this page 1

  // Make the request
  const response = await fetch('/api/jobseekers/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ skills, industry, eduLevel, workExp, zip, sortBy, maxResults, pageNum })
  });
  if (!response.ok) {
    // TODO: display error
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
  const [eduLevel, setEduLevel] = useState<string>();
  const [yearsExp, setYearsExp] = useState<string>();
  const [zipCode, setZipCode] = useState<string>();

  // Sorting and pagination
  const [sortBy, setSortBy] = useState<string>();
  const [page, setPage] = useState<number>();
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setQueryParam('page', encodeURIComponent(value.toString()));
    setPage(value);
  };

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
    if (retrievedParam != null && retrievedParam.length > 0)
      result = decodeURIComponent(retrievedParam).split(",");
    return result;
  }

  // Execute query function
  const execQuery = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchFilteredJobSeekerCardView(skillsList, industry, eduLevel, yearsExp, zipCode, sortBy, resultsPerPage, page);
      setJobSeekers(data);
    } catch (error) {
      console.error('Error fetching job seekers:', error);
      // TODO: add error UI
    } finally {
      setLoading(false);
    }
  }, [skillsList, industry, eduLevel, yearsExp, zipCode, sortBy, page]);

  useEffect(() => {
    // on initial page load, get the params from URL if they exist
    if (skillsList == undefined && industry == undefined && eduLevel == undefined &&
      yearsExp == undefined && zipCode == undefined && sortBy == undefined && page == undefined) {
      setSkillsList(getArrayParam("skills"));
      setIndustry(getArrayParam("industry"));
      setEduLevel(getParam("edulevel"));
      setYearsExp(getParam("yearsexp"));
      setZipCode(getParam("zipcode"));
      setSortBy(getParam("sort") != "" ? getParam("sort") : "newest");
      setPage(+getParam("page")); // parseInt(null) returns NaN but +null returns 0!
    }
    else execQuery(); // any other change after initial load should execute a new query
  }, [skillsList, industry, eduLevel, yearsExp, zipCode, sortBy, page]);

  const newFilterOnChange = (paramName: string, stateSetter: Dispatch<SetStateAction<string[] | undefined>>) => (
    (event: SelectChangeEvent<string[]>) => {
      setQueryParam(paramName, encodeURIComponent((typeof event.target.value === 'string') ? event.target.value : event.target.value.join(",")));
      stateSetter((typeof event.target.value === 'string') ? event.target.value.split(',') : event.target.value);
    }
  );

  return (
    <main className="m-6 p-6 laptop:px-[200px] py-16">
      <h1 className="text-2xl font-bold mb-4">{skillsList?.toString()} Search Results</h1>

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

      {/* Filters */}
      <div className="flex flex-row flex-wrap mt-1 mb-4">

        {/* Industry */}
        <div className="w-1/2 tablet:w-1/4">
          <MultipleSelectFilterAutoload
            id="jobseeker-listview-industry"
            label="Industry"
            apiAutoloadRoute="/api/employers/industry-sectors" // TODO: two requests are happening?
            value={getArrayParam("industry")}
            onChange={(event) => {
              newFilterOnChange("industry", setIndustry);
            }}
            getOptionLabel={(option: IndustrySectorDropdownDTO) => option.sector_title}
          />
        </div>

        {/* Education Level */}
        <div className="w-1/2 tablet:w-1/4">
          <SingleSelectFilter
            id="jobseeker-listview-edulevel"
            label="Education Level"
            value={getArrayParam("edulevel")}
            onChange={(event) => {
              setQueryParam('edulevel', encodeURIComponent(event.target.value.toString()));
              setEduLevel(event.target.value as string);
            }}
            options={[
              { label: "Any", value: "Any" },
              { label: "Doctorate", value: "Doctorate" },
              { label: "Master's Degree", value: "Masters" },
              { label: "Bachelor's Degree", value: "Bachelors" },
              { label: "Associate's Degree", value: "Associates" },
              { label: "Vocational Qualification / Certification", value: "VocationalQualification" },
              { label: "High School Diploma", value: "HighSchool" },
              { label: "GED", value: "GED" },
              { label: "Primary Education", value: "PrimaryEducation" },
              { label: "No Formal Education", value: "NoFormalEducation" },
            ]}
          ></SingleSelectFilter>
        </div>

        {/* Years of Experience */}
        <div className="w-1/2 tablet:w-1/4">
          <SingleSelectFilter
            id="jobseeker-listview-yearsexp"
            label="Years of Experience"
            value={getArrayParam("yearsexp")}
            onChange={(event) => {
              setQueryParam('yearsexp', encodeURIComponent(event.target.value.toString()));
              setYearsExp(event.target.value as string);
            }}
            options={[ // TODO: sync with design on how to do this, re-implement route
              { label: "Any", value: "0" },
              { label: "Less than a year", value: "1" },
              { label: "1-2 years", value: "2" },
              { label: "3-4 years", value: "3" },
              { label: "5 or more years", value: "4" },
            ]}
          ></SingleSelectFilter>
        </div>

        {/* Zip Code */}
        <div className="w-1/2 tablet:w-1/4">
          <TextField
            autoComplete='off'
            label="Full/Partial Zip Code"
            defaultValue={getParam("zipcode")}
            size="small"
            onChange={(event) => {
              if (!isNaN(Number(event.target.value))) { // is it purely numeric chars?
                if (event.target.value.length <= 5) { // and not longer than 5 chars?
                  setQueryParam('zipcode', event.target.value);
                  setZipCode(event.target.value);
                }
                else { // truncate
                  event.target.value = Number.parseInt(event.target.value.slice(0, 5)).toString();
                }
              }
              else { // erase non-numeric chars
                const closestInt = Number.parseInt(event.target.value);
                event.target.value = (isNaN(closestInt) ? "" : closestInt.toString());
              }
            }}
            sx={{
              padding: "0px 2px",
              width: "100%",
              "& .MuiInputBase-root": {
                borderRadius: "9999px",
                height: "1.75rem",
              },
              "& .MuiInputBase-input": {
                boxShadow: "none",
                '&:focus': {
                  boxShadow: "none",
                },
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                top: "15px",
                left: "2px",
                position: "relative",
              },
            }}
          />
        </div>
      </div>

      {/* Sorting */}
      <div className="w-full flex flex-row-reverse pb-4 mt-0">
        <SortDropdown
          id="jobseeker-listview-sort"
          label="Sort by:"
          value={getParam("sort")}
          onChange={(event) => {
            setQueryParam('sort', event.target.value);
            setSortBy(event.target.value);
          }}
          options={[ // TODO: design to advise on best sorting options, then implement in route
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

      <div className="flex justify-center">
        {/* TODO: Would be nice to have a "Showing 1-100 of 4,321 results" blurb here */}
        <Pagination count={Math.ceil(jobseekers.length / resultsPerPage)} page={getParam("page") != "" ? +getParam("page") : 1} onChange={handlePageChange} />
      </div>
    </main>
  );
}
