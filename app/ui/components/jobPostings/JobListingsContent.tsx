"use client";
import JobListingCardView from "@/app/ui/components/jobPostings/JobListingCardView";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import TagsWithAutocomplete from "@/app/ui/components/mui/TagsWithAutocomplete";
import { SkillDTO } from "@/data/dtos/SkillDTO";
import {
  Box,
  Divider,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import MultipleSelectFilterAutoload from "@/app/ui/components/mui/MultiSelectFilterAutoload";
import { IndustrySectorDropdownDTO } from "@/data/dtos/IndustrySectorDropdownDTO";
import { JobListingCardViewDTO } from "@/data/dtos/JobListingCardViewDTO";
import SingleSelectFilterAutoload from "../mui/SingleSelectFilterAutoload";
import { TechnologyAreaDropdownDTO } from "@/data/dtos/TechnologyAreaDropdownDTO";
import MultipleSelectCheckmarks from "../mui/MultiSelectFilter";
import { EmploymentType } from "@/app/lib/admin/jobTracking";

const resultsPerPage = 50;

interface JobListingQueryResult {
  filteredJobPostings: JobListingCardViewDTO[];
  totalCount: number;
}

async function fetchJobPosts(
  jobTitle: string = "",
  bookmarked: boolean = false,
  skills: string[] = [],
  zipCode: string = "",
  profession: string = "",
  industrySector: string[] = [],
  employmentType: string[] = [],
  sortBy: string = "publish_date",
  maxResults: number = resultsPerPage,
  page: number = 1,
): Promise<JobListingQueryResult> {
  const response = await fetch("/api/joblistings/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jobTitle,
      bookmarked,
      skills,
      zipCode,
      profession,
      industrySector,
      employmentType,
      sortBy,
      maxResults,
      page,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

export default function JobListingsContent() {
  // Listview data
  const [value, setValue] = useState(0);
  const [joblistings, setJobListings] = useState<JobListingCardViewDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Query data
  const [jobTitle, setJobTitle] = useState<string>();
  const [skillsList, setSkillsList] = useState<string[]>();
  const [zipCode, setZipCode] = useState<string>();
  const [profession, setProfession] = useState<string>();
  const [industry, setIndustry] = useState<string[]>();
  const [employmentType, setEmploymentType] = useState<string[]>();

  // Sorting and pagination
  const [totalResults, setTotalResults] = useState<number>();
  const [page, setPage] = useState<number>();

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
    [queryParams, pathname, router],
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setQueryParam("page", encodeURIComponent(value.toString()));
    setPage(value);
  };

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

  const execQuery = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchJobPosts(
        jobTitle,
        value === 1,
        skillsList,
        zipCode,
        profession,
        industry,
        employmentType,
        "publish_date",
        resultsPerPage,
        page,
      );
      setJobListings(data.filteredJobPostings);
      setTotalResults(data.totalCount);
    } catch (error) {
      setError(true);
      console.error("Error fetching job listings:", error);
    } finally {
      setLoading(false);
    }
  }, [
    page,
    industry,
    profession,
    employmentType,
    jobTitle,
    skillsList,
    zipCode,
    value,
  ]);

  useEffect(() => {
    // 1. Initial Load: Set state from URL params (only once)
    const initializeStateFromParams = () => {
      setJobTitle(getParam("jobTitle"));
      setSkillsList(getArrayParam("skills"));
      setProfession(getParam("profession"));
      setEmploymentType(getArrayParam("employmentType"));
      setIndustry(getArrayParam("industry"));
      setZipCode(getParam("zipcode"));
      setPage(+getParam("page") == 0 ? 1 : +getParam("page"));
    };

    // Check if state has already been initialized from params
    if (
      jobTitle === undefined &&
      skillsList === undefined &&
      industry === undefined &&
      zipCode === undefined &&
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
      page !== undefined
    ) {
      // Check that they are defined
      const timeoutId = setTimeout(() => {
        execQuery();
      }, 500); // simple 0.5sec debounce to avoid rapid queries that could return out of order
      return () => clearTimeout(timeoutId);
    }
  }, [
    jobTitle,
    skillsList,
    profession,
    employmentType,
    industry,
    zipCode,
    page,
    execQuery,
  ]);

  return (
    <Stack spacing={2.5} sx={{ ml: { xs: 3, md: 6.25 } }}>
      <Typography
        variant="h2"
        sx={{ color: "secondary.main", fontSize: "2.5rem", fontWeight: 400 }}
      >
        Jobs
      </Typography>

      {/* Job Title Search Bar */}
      <TextField
        autoComplete="off"
        label="Full/Partial Job Title"
        fullWidth
        defaultValue={getParam("jobTitle")}
        onChange={(event) => {
          setQueryParam("jobTitle", event.target.value);
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
          setQueryParam("skills", encodeURIComponent(newVal.toString()));
          setSkillsList(newVal);
        }}
        searchPlaceholder="Skill (ex: Java)"
        getTagLabel={(option: SkillDTO) => option.skill_name}
        getTagLink={(option: SkillDTO) => option.skill_info_url}
        initialTags={getArrayParam("skills")}
      />

      {/* Filters */}
      <div className="mb-0 mt-1 flex flex-row flex-wrap">
        {/* Zip Code */}
        <div className="w-1/2 tablet:w-1/4">
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
        {/* Profession */}
        <div className="w-1/2 tablet:w-1/4">
          <SingleSelectFilterAutoload
            id="jobseeker-listview-profession"
            label="Profession"
            apiAutoloadRoute="/api/employers/technology-areas"
            value={getParam("profession")}
            onChange={(event) => {
              setQueryParam(
                "profession",
                encodeURIComponent(event.target.value.toString()),
              );
              setProfession(event.target.value);
            }}
            getOptionLabel={(option: TechnologyAreaDropdownDTO) => option.title}
          />
        </div>
        {/* Industry */}
        <div className="w-1/2 tablet:w-1/4">
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
        {/* Employment Type */}
        <div className="w-1/2 tablet:w-1/4">
          {
            <MultipleSelectCheckmarks
              label="Employment Type"
              value={getArrayParam("employment-type")}
              onChange={(event) => {
                setQueryParam(
                  "employment-type",
                  encodeURIComponent(event.target.value.toString()),
                );
                if (typeof event.target.value === "string")
                  setEmploymentType([event.target.value]);
                else setEmploymentType(event.target.value);
              }}
              options={Object.values(EmploymentType).map((type) => ({
                label: type,
                value: type,
              }))}
            />
          }
        </div>
      </div>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="Job Search or Saved Jobs"
        >
          <Tab id="tab-0" label="Job Search" />
          <Tab id="tab-1" label="Saved Jobs" />
        </Tabs>
      </Box>

      {/* Loading */}
      {loading ? (
        <div className="h-full w-full text-center">
          <CircularProgress />
        </div>
      ) : (
        ""
      )}

      {/* Error */}
      {!loading && error ? (
        <div className="h-full w-full text-center text-3xl">
          Error: Invalid Query
        </div>
      ) : (
        ""
      )}

      {/* else, Display Results */}
      {!loading && !error ? (
        <Stack spacing={2} divider={<Divider />}>
          {joblistings?.map((joblisting: JobListingCardViewDTO) => (
            <JobListingCardView
              joblisting={joblisting}
              key={joblisting.job_posting_id}
            />
          ))}
        </Stack>
      ) : (
        ""
      )}

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
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
      <div className="pb-2 mt-2 flex justify-center phone:pb-8">
        {!loading ? (
          <Pagination
            variant="text"
            color="secondary"
            count={Math.ceil((totalResults ?? 1) / resultsPerPage)}
            page={getParam("page") != "" ? +getParam("page") : 1}
            onChange={handlePageChange}
            sx={{
              "& .MuiPaginationItem-root:not(.Mui-selected):not(.MuiPaginationItem-ellipsis):not(.MuiPaginationItem-previousNext)":
                {
                  bgcolor: "#E5E5E5",
                  "&:hover": { bgcolor: "#f6f6f6" },
                },
              "& .MuiPaginationItem-root:not(.Mui-selected)": {
                color: "secondary.main",
              },
            }}
          />
        ) : (
          ""
        )}
      </div>
    </Stack>
  );
}
