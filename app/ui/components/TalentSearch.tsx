"use client";
import JobSeekerCardView from "@/app/ui/components/JobSeekerCardView";
import { JobSeekerCardViewDTO } from "@/data/dtos/JobSeekerCardViewDTO";
import { useCallback, useEffect, useState } from "react";
import TagsWithAutocomplete from "@/app/ui/components/mui/TagsWithAutocomplete";
import { SkillDTO } from "@/data/dtos/SkillDTO";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import SortDropdown from "@/app/ui/components/mui/SortDropdown";
import Pagination from "@mui/material/Pagination";
import SingleSelectFilter from "@/app/ui/components/mui/SingleSelectFilter";
import { IndustrySectorDropdownDTO } from "@/data/dtos/IndustrySectorDropdownDTO";
import MultipleSelectFilterAutoload from "@/app/ui/components/mui/MultiSelectFilterAutoload";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Slider from "@mui/material/Slider";
import { TrainingProviderDropdownDTO } from "@/data/dtos/TrainingProviderDropdownDTO";
import SingleSelectFilterAutoload from "@/app/ui/components/mui/SingleSelectFilterAutoload";
import { useSession } from "next-auth/react";
import { Role } from "@/data/dtos/UserInfoDTO";

const resultsPerPage = 50;

interface JobSeekerQueryResult {
  filteredJobSeekers: JobSeekerCardViewDTO[];
  totalCount: number;
}

async function fetchFilteredJobSeekerCardView(
  skills: string[] = [],
  industrySector: string[] = [],
  educationLevel: string = "",
  trainingProvider: string = "",
  yearsWorkExpMin: number = 0,
  yearsWorkExpMax: number | undefined = undefined,
  zipCode: string = "",
  sortBy: string = "yearsExp",
  maxResults: number = resultsPerPage,
  page: number = 1,
): Promise<JobSeekerQueryResult> {
  // Filter based on pools
  const pool1 = true,
    pool2 = true,
    pool3 = false;

  if (yearsWorkExpMax == 5) yearsWorkExpMax = undefined; // API expects undefined for max to handle 5+ yearsExp
  const response = await fetch("/api/jobseekers/query", {
    // Make the request
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      skills,
      industrySector,
      educationLevel,
      trainingProvider,
      yearsWorkExpMin,
      yearsWorkExpMax,
      zipCode,
      sortBy,
      maxResults,
      page,
      pool1,
      pool2,
      pool3,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

async function fetchBookmarkedJobseekers(): Promise<any> {
  const response = await fetch("/api/companies/bookmark/getJobseekers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

export default function TalentSearch() {
  const { data: session } = useSession();
  // Listview data
  const [jobseekers, setJobSeekers] = useState<JobSeekerCardViewDTO[]>([]);
  const [bookmarkedJobseekers, setBookmarkedJobseekers] = useState<string[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Query data
  const [skillsList, setSkillsList] = useState<string[]>();
  const [industry, setIndustry] = useState<string[]>();
  const [eduLevel, setEduLevel] = useState<string>();
  const [trainingProvider, setTrainingProvider] = useState<string>();
  const [yearsExpMin, setYearsExpMin] = useState<number>();
  const [yearsExpMax, setYearsExpMax] = useState<number>();
  const [zipCode, setZipCode] = useState<string>();

  // Sorting and pagination
  const [sortBy, setSortBy] = useState<string>();
  const [totalResults, setTotalResults] = useState<number>();
  const [page, setPage] = useState<number>();
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setQueryParam("page", encodeURIComponent(value.toString()));
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
        router.push(pathname + "?" + params.toString());
      }
      return;
    },
    [queryParams],
  );

  function getParam(param: string) {
    const retrievedParam: string | null = queryParams.get(param);
    let result: string = "";
    if (retrievedParam != null) result = decodeURIComponent(retrievedParam);
    return result;
  }

  function getArrayParam(param: string) {
    const retrievedParam: string | null = queryParams.get(param);
    let result: string[] = [];
    if (retrievedParam != null && retrievedParam.length > 0)
      result = decodeURIComponent(retrievedParam).split(",");
    return result;
  }

  // Execute query function
  const execQuery = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchFilteredJobSeekerCardView(
        skillsList,
        industry,
        eduLevel,
        trainingProvider,
        yearsExpMin,
        yearsExpMax,
        zipCode,
        sortBy,
        resultsPerPage,
        page,
      );
      setJobSeekers(data.filteredJobSeekers);
      setTotalResults(data.totalCount);
    } catch (error) {
      setError(true);
      console.error("Error fetching job seekers:", error);
    } finally {
      setLoading(false);
    }
  }, [
    skillsList,
    industry,
    eduLevel,
    trainingProvider,
    yearsExpMin,
    yearsExpMax,
    zipCode,
    sortBy,
    page,
  ]);

  useEffect(() => {
    const fetchBookmarked = async () => {
      try {
        if (session?.user.roles.includes(Role.EMPLOYER)) {
          const bookmarkedJobseekers = await fetchBookmarkedJobseekers();
          const jobseekerIds = bookmarkedJobseekers.map(
            (item: any) => item.jobseekerId,
          );

          setBookmarkedJobseekers(jobseekerIds);
        } else {
          setBookmarkedJobseekers([]);
        }
      } catch (error) {
        console.error("Error fetching bookmarked jobs:", error);
      }
    };
    fetchBookmarked();
  }, []);

  const isBookmarked = (jobseekerId: string) => {
    return bookmarkedJobseekers.includes(jobseekerId);
  };

  useEffect(() => {
    // on initial page load, get the params from URL if they exist
    if (
      skillsList == undefined &&
      industry == undefined &&
      eduLevel == undefined &&
      trainingProvider == undefined &&
      yearsExpMin == undefined &&
      yearsExpMax == undefined &&
      zipCode == undefined &&
      sortBy == undefined &&
      page == undefined
    ) {
      setSkillsList(getArrayParam("skills"));
      setIndustry(getArrayParam("industry"));
      setEduLevel(getParam("eduLevel"));
      setTrainingProvider(getParam("trainingProvider"));
      setYearsExpMin(+getParam("yearsExpMin"));
      setYearsExpMax(
        +getParam("yearsExpMax") == 0 ? 5 : +getParam("yearsExpMax"),
      );
      setZipCode(getParam("zipcode"));
      setSortBy(getParam("sort") != "" ? getParam("sort") : "yearsExp");
      const pageParam = getParam("page");
      const pageNumber = pageParam ? +pageParam : 0;
      setPage(pageNumber || 1);
    } else {
      // any other change after initial load should execute a new query
      const timeoutId = setTimeout(() => {
        execQuery();
      }, 500); // simple 0.5sec debounce to avoid rapid queries that could return out of order
      return () => clearTimeout(timeoutId);
    }
  }, [
    skillsList,
    industry,
    eduLevel,
    trainingProvider,
    yearsExpMin,
    yearsExpMax,
    zipCode,
    sortBy,
    page,
  ]);

  return (
    <main className="m-2 phone:m-4 sm-tablet:m-6 mb-0 phone:p-6 laptop:px-[200px] pt-8 w-full">
      <h1 className="text-2xl font-bold mb-4">
        Search Results for: {skillsList?.toString().replaceAll(",", ", ")}
      </h1>

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
          setQueryParam("skills", encodeURIComponent(newVal.toString()));
          setSkillsList(newVal);
        }}
        searchPlaceholder="Skill (ex: Java)"
        getTagLabel={(option: SkillDTO) => option.skill_name}
        getTagLink={(option: SkillDTO) => option.skill_info_url}
        initialTags={getArrayParam("skills")}
      />

      {/* Filters */}
      <div className="flex flex-row flex-wrap mt-1 mb-0">
        {/* Industry */}
        <div className="w-1/2 tablet:w-1/3">
          <MultipleSelectFilterAutoload
            id="jobseeker-listview-industry"
            label="Industry"
            apiAutoloadRoute="/api/employers/industry-sectors" // TODO: two requests are happening?
            value={getArrayParam("industry")}
            onChange={(event) => {
              setQueryParam(
                "industry",
                encodeURIComponent(event.target.value.toString()),
              );
              if (typeof event.target.value === "string")
                setIndustry([event.target.value]);
              else setIndustry(event.target.value);
            }}
            getOptionLabel={(option: IndustrySectorDropdownDTO) =>
              option.sector_title
            }
          />
        </div>

        {/* Education Level */}
        <div className="w-1/2 tablet:w-1/3">
          <SingleSelectFilter
            id="jobseeker-listview-edulevel"
            label="Highest Degree"
            value={getArrayParam("edulevel")}
            onChange={(event) => {
              setQueryParam(
                "edulevel",
                encodeURIComponent(event.target.value.toString()),
              );
              setEduLevel(event.target.value as string);
            }}
            options={[
              { label: "Any", value: "" },
              { label: "Doctorate", value: "Doctorate" },
              { label: "Master's Degree", value: "Masters" },
              { label: "Bachelor's Degree", value: "Bachelors" },
              { label: "Associate's Degree", value: "Associates" },
              {
                label: "Vocational Qualification / Certification",
                value: "VocationalQualification",
              },
              { label: "High School Diploma", value: "HighSchool" },
              { label: "GED", value: "GED" },
              { label: "Primary Education", value: "PrimaryEducation" },
              { label: "No Formal Education", value: "NoFormalEducation" },
            ]}
          ></SingleSelectFilter>
        </div>

        {/* Zip Code */}
        {/* Design has agreed to a text field until we have a better distance measurement system in place */}
        <div className="w-1/2 tablet:w-1/3">
          <TextField
            autoComplete="off"
            label="Full/Partial Zip Code"
            defaultValue={getParam("zipcode")}
            size="small"
            onChange={(event) => {
              if (!isNaN(Number(event.target.value))) {
                // is it purely numeric chars?
                if (event.target.value.length <= 5) {
                  // and not longer than 5 chars?
                  setQueryParam("zipcode", event.target.value);
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
                  ? ""
                  : closestInt.toString();
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
                "&:focus": { boxShadow: "none" },
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

      {/* Second Filter / Sort row */}
      <div className="w-full flow-root pb-4 mt-2">
        {/* Training Provider */}
        <div className="float-left w-1/2 tablet:w-1/3">
          <SingleSelectFilterAutoload
            id="jobseeker-listview-trainingProvider"
            label="Training Provider"
            apiAutoloadRoute="/api/employers/training-providers"
            value={getParam("trainingProvider")}
            onChange={(event) => {
              setQueryParam(
                "trainingProvider",
                encodeURIComponent(event.target.value.toString()),
              );
              setTrainingProvider(event.target.value as string);
            }}
            getOptionLabel={(option: TrainingProviderDropdownDTO) =>
              option.name
            }
          />
        </div>

        {/* Years of Experience */}
        <div className="float-left items-center px-4 w-1/2 tablet:w-1/3">
          <p className="text-sm text-slate-600 text-center relative top-2">
            Years of Experience
          </p>
          <Slider
            sx={{ color: "#0891b2" }}
            size="small"
            value={[
              +getParam("yearsExpMin"),
              +getParam("yearsExpMax") == 0 ? 5 : +getParam("yearsExpMax"),
            ]}
            onChange={(event: Event, newValue: number | number[]) => {
              if (typeof newValue !== "number") {
                setYearsExpMin(newValue[0]);
                setQueryParam("yearsExpMin", newValue[0].toString());
                setYearsExpMax(newValue[1]);
                setQueryParam("yearsExpMax", newValue[1].toString());
              }
            }}
            valueLabelDisplay="off"
            getAriaLabel={() => "Years of Experience filter range"}
            getAriaValueText={(value: number, index: number) => {
              return index == 0 ? "min: " + value : "max: " + value;
            }}
            step={1}
            marks={[
              { value: 0, label: "0" },
              { value: 1, label: "1" },
              { value: 2, label: "2" },
              { value: 3, label: "3" },
              { value: 4, label: "4" },
              { value: 5, label: "5+" },
            ]}
            min={0}
            max={5}
            disableSwap
          />
        </div>

        {/* Sorting */}
        <div className="float-right mt-6">
          <SortDropdown
            id="jobseeker-listview-sort"
            label="Sort by:"
            value={getParam("sort") == "" ? "yearsExp" : getParam("sort")}
            onChange={(event) => {
              setQueryParam("sort", event.target.value);
              setSortBy(event.target.value);
            }}
            options={[
              // TODO: future preference for sorting by distance, currently achieved by searching with partial zip code
              { label: "Years of Experience", value: "yearsExp" },
              { label: "Highest Degree", value: "highestDegree" },
              { label: "Newest", value: "newest" },
            ]}
          />
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="w-full h-full text-center">
          <CircularProgress />
        </div>
      ) : (
        ""
      )}

      {/* Error */}
      {!loading && error ? (
        <div className="w-full h-full text-center text-3xl">
          Error: Invalid Query
        </div>
      ) : (
        ""
      )}

      {/* else, Display Results */}
      {!loading && !error ? (
        <div className="space-y-4">
          {jobseekers.map((jobSeeker: JobSeekerCardViewDTO) => (
            <JobSeekerCardView
              jobseeker={jobSeeker}
              isBookmarked={isBookmarked(jobSeeker.jobseeker_id)}
              key={jobSeeker.jobseeker_id}
            />
          ))}
        </div>
      ) : (
        ""
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {!loading && !error ? (
          <div>
            Showing{" "}
            {totalResults == 0
              ? 0
              : resultsPerPage * (page ?? 1) - resultsPerPage + 1}{" "}
            - {Math.min(resultsPerPage * (page ?? 1), totalResults ?? 1)} of{" "}
            {totalResults} total results
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex justify-center mt-2 mb-4 phone:mb-0">
        {!loading ? (
          <Pagination
            variant="outlined"
            shape="rounded"
            count={Math.ceil((totalResults ?? 1) / resultsPerPage)}
            page={getParam("page") != "" ? +getParam("page") : 1}
            onChange={handlePageChange}
          />
        ) : (
          ""
        )}
      </div>
    </main>
  );
}
