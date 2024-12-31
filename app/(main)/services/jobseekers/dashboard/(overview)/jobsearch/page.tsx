'use client';
import JobListingCardView from '@/app/ui/components/JobListingCardView';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import TagsWithAutocomplete from '@/app/ui/components/mui/TagsWithAutocomplete';
import { SkillDTO } from '@/data/dtos/SkillDTO';
import SortDropdown from '@/app/ui/components/mui/SortDropdown';
import { TextField } from '@mui/material';
import MultipleSelectFilterAutoload from '@/app/ui/components/mui/MultiSelectFilterAutoload';
import { IndustrySectorDropdownDTO } from '@/data/dtos/IndustrySectorDropdownDTO';
import { JobListingCardViewDTO } from '@/data/dtos/JobListingCardViewDTO';

const resultsPerPage = 50;

interface JobListingQueryResult {
  filteredJobPostings: JobListingCardViewDTO[];
  totalCount: number;
}

async function fetchJobPosts(
  jobTitle: string = '',
  skills: string[] = [],
  industrySector: string[] = [],
  zipCode: string = '',
  sortBy: string = 'publish_date',
  maxResults: number = resultsPerPage,
  page: number = 1,
): Promise<JobListingQueryResult> {
  const response = await fetch('/api/joblistings/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jobTitle,
      skills,
      industrySector,
      zipCode,
      sortBy,
      maxResults,
      page,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

async function fetchBookmarkedJobs(): Promise<any> {
  const response = await fetch('/api/jobseekers/joblistings/get', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

export default function Page() {
  // Listview data
  const [joblistings, setJobListings] = useState<JobListingCardViewDTO[]>([]);
  const [myBookMarkedJobs, setMyBookmarkedJobs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Query data
  const [jobTitle, setJobTitle] = useState<string>();
  const [skillsList, setSkillsList] = useState<string[]>();
  const [industry, setIndustry] = useState<string[]>();
  const [paid, setPaid] = useState<boolean>();
  const [zipCode, setZipCode] = useState<string>();

  // Sorting and pagination
  const [sortBy, setSortBy] = useState<string>();
  const [totalResults, setTotalResults] = useState<number>();
  const [page, setPage] = useState<number>();

  const pathname = usePathname();
  const router = useRouter();
  const queryParams = useSearchParams();
  const setQueryParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(queryParams.toString());
      if (params.get(name) != value) {
        if (value == '') params.delete(name);
        else params.set(name, value);
        router.push(pathname + '?' + params.toString());
      }
      return;
    },
    [queryParams, pathname, router],
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setQueryParam('page', encodeURIComponent(value.toString()));
    setPage(value);
  };

  function getParam(param: string) {
    const retrievedParam: string | null = queryParams.get(param);
    var result: string = '';
    if (retrievedParam != null) result = decodeURIComponent(retrievedParam);
    return result;
  }

  function getArrayParam(param: string) {
    const retrievedParam: string | null = queryParams.get(param);
    var result: string[] = [];
    if (retrievedParam != null && retrievedParam.length > 0)
      result = decodeURIComponent(retrievedParam).split(',');
    return result;
  }

  const execQuery = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchJobPosts(
        jobTitle,
        skillsList,
        industry,
        zipCode,
        sortBy,
        resultsPerPage,
        page,
      );
      setJobListings(data.filteredJobPostings);
      setTotalResults(data.totalCount);
    } catch (error) {
      setError(true);
      console.error('Error fetching job listings:', error);
    } finally {
      setLoading(false);
    }
  }, [page, industry, jobTitle, skillsList, zipCode, sortBy]);

  useEffect(() => {
    const fetchBookmarked = async () => {
      try {
        const bookmarkedJobs = await fetchBookmarkedJobs();
        const jobPostIds = bookmarkedJobs.map((item: any) => item.jobPostId);
        setMyBookmarkedJobs(jobPostIds);
      } catch (error) {
        console.error('Error fetching bookmarked jobs:', error);
      }
    };

    fetchBookmarked();
  }, []);

  useEffect(() => {
    // 1. Initial Load: Set state from URL params (only once)
    const initializeStateFromParams = () => {
      setJobTitle(getParam('jobTitle'));
      setSkillsList(getArrayParam('skills'));
      setIndustry(getArrayParam('industry'));
      setZipCode(getParam('zipcode'));
      setSortBy(getParam('sort') != '' ? getParam('sort') : 'publish_date');
      setPage(+getParam('page') == 0 ? 1 : +getParam('page'));
    };

    // Check if state has already been initialized from params
    if (
      jobTitle === undefined &&
      skillsList === undefined &&
      industry === undefined &&
      zipCode === undefined &&
      sortBy === undefined &&
      page === undefined
    ) {
      initializeStateFromParams();
    }
  });

  useEffect(() => {
    // 2. Subsequent Updates: Execute query (debounced) whenever relevant state changes
    if (
      jobTitle !== undefined &&
      skillsList !== undefined &&
      industry !== undefined &&
      zipCode !== undefined &&
      sortBy !== undefined &&
      page !== undefined
    ) {
      // Check that they are defined
      const timeoutId = setTimeout(() => {
        execQuery();
      }, 500); // simple 0.5sec debounce to avoid rapid queries that could return out of order
      return () => clearTimeout(timeoutId);
    }
  }, [jobTitle, skillsList, industry, zipCode, sortBy, page, execQuery]);

  const isBookmarked = (jobId: string) => {
    return myBookMarkedJobs.includes(jobId);
  };

  return (
    <main className="mb-0 pt-8 phone:m-4 phone:p-6 sm-tablet:m-6 laptop:px-[200px]">
      <h1 className="mb-4 text-2xl font-bold">Job Listings</h1>

      {/* Job Title Search Bar */}
      <TextField
        autoComplete="off"
        label="Full/Partial Job Title"
        fullWidth
        defaultValue={getParam('jobTitle')}
        onChange={(event) => {
          setQueryParam('jobTitle', event.target.value);
          setJobTitle(event.target.value);
        }}
        sx={{ mb: 3 }}
      />

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
        initialTags={getArrayParam('skills')}
      />

      {/* Filters */}
      <div className="mb-0 mt-1 flex flex-row flex-wrap">
        {/* Industry */}
        <div className="w-1/2 tablet:w-1/3">
          <MultipleSelectFilterAutoload
            id="jobseeker-listview-industry"
            label="Industry"
            apiAutoloadRoute="/api/employers/industry-sectors" // TODO: two requests are happening?
            value={getArrayParam('industry')}
            onChange={(event) => {
              setQueryParam(
                'industry',
                encodeURIComponent(event.target.value.toString()),
              );
              if (typeof event.target.value === 'string')
                setIndustry([event.target.value]);
              else setIndustry(event.target.value);
            }}
            getOptionLabel={(option: IndustrySectorDropdownDTO) =>
              option.sector_title
            }
          />
        </div>

        {/* Zip Code */}
        {/* Design has agreed to a text field until we have a better distance measurement system in place */}
        <div className="w-1/2 tablet:w-1/3">
          <TextField
            autoComplete="off"
            label="Full/Partial Zip Code"
            defaultValue={getParam('zipcode')}
            size="small"
            onChange={(event) => {
              if (!isNaN(Number(event.target.value))) {
                // is it purely numeric chars?
                if (event.target.value.length <= 5) {
                  // and not longer than 5 chars?
                  setQueryParam('zipcode', event.target.value);
                  setZipCode(event.target.value);
                } else {
                  // truncate
                  event.target.value = Number.parseInt(
                    event.target.value.slice(0, 5),
                  ).toString();
                }
              } else {
                // erase non-numeric chars
                const closestInt = Number.parseInt(event.target.value);
                event.target.value = isNaN(closestInt)
                  ? ''
                  : closestInt.toString();
              }
            }}
            sx={{
              padding: '0px 2px',
              width: '100%',
              '& .MuiInputBase-root': {
                borderRadius: '9999px',
                height: '1.75rem',
              },
              '& .MuiInputBase-input': {
                boxShadow: 'none',
                '&:focus': { boxShadow: 'none' },
              },
              '& .MuiInputLabel-root': {
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                top: '15px',
                left: '2px',
                position: 'relative',
              },
            }}
          />
        </div>
        <div className="float-left w-1/2 items-center px-4 tablet:w-1/3">
          <div className="w-full flow-root pb-4 mt-2">
            {/* Sorting */}
            <div className="float-right mt-6">
              <SortDropdown
                id="jobseeker-listview-sort"
                label="Sort by:"
                value={getParam('sort') == '' ? 'publish_date' : getParam('sort')}
                onChange={(event) => {
                  setQueryParam('sort', event.target.value);
                  setSortBy(event.target.value);
                }}
                options={[
                  // TODO: future preference for sorting by distance, currently achieved by searching with partial zip code
                  { label: 'Newest', value: 'publish_date' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="h-full w-full text-center">
          <CircularProgress />
        </div>
      ) : (
        ''
      )}

      {/* Error */}
      {!loading && error ? (
        <div className="h-full w-full text-center text-3xl">
          Error: Invalid Query
        </div>
      ) : (
        ''
      )}

      {/* else, Display Results */}
      {!loading && !error ? (
        <div className="space-y-4">
          {joblistings?.map((joblisting: any) => (
            <JobListingCardView
              joblisting={joblisting}
              isBookmarked={isBookmarked(joblisting.job_posting_id)}
              key={joblisting.job_posting_id}
            />
          ))}
        </div>
      ) : (
        ''
      )}

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        {!loading && !error ? (
          <div>
            Showing{' '}
            {totalResults == 0
              ? 0
              : resultsPerPage * (page ?? 1) - resultsPerPage + 1}{' '}
            - {Math.min(resultsPerPage * (page ?? 1), totalResults ?? 1)} of{' '}
            {totalResults} total results
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="mb-4 mt-2 flex justify-center phone:mb-0">
        {!loading ? (
          <Pagination
            variant="outlined"
            shape="rounded"
            count={Math.ceil((totalResults ?? 1) / resultsPerPage)}
            page={getParam('page') != '' ? +getParam('page') : 1}
            onChange={handlePageChange}
          />
        ) : (
          ''
        )}
      </div>
    </main>
  );
}
