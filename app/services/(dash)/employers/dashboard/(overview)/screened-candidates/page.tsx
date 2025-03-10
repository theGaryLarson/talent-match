import { getMyJobListings } from "@/app/lib/joblistings";
import {
  getJobseekerBookmarkByCompany,
  searchLocations,
} from "@/app/lib/prisma";
import EmployerRecentJobPosts from "@/app/ui/components/employerdashboard/EmployerRecentJobPosts";
import { JobPostCreationDTO } from "@/data/dtos/JobListingDTO";
import { Box, Grid2 } from "@mui/material";

async function processJobs(
  jobs: JobPostCreationDTO[],
): Promise<JobPostCreationDTO[]> {
  await Promise.all(
    jobs.map(async (job) => {
      const processJobZip = async () => {
        if (job.zip) {
          const results = await searchLocations(job.zip, "zip");
          if (results?.length) {
            job.postalGeoData = results[0];
          }
        }
      };
      const processApplications = async () => {
        await Promise.all(
          job.jobApplications.map(async (application) => {
            if (application.Jobseekers.users.zip) {
              const results = await searchLocations(
                application.Jobseekers.users.zip,
                "zip",
              );
              if (results?.length) {
                application.postalGeoData = results[0];
              }
            }
          }),
        );
      };

      await Promise.all([processJobZip(), processApplications()]);
    }),
  );

  return jobs;
}

export const metadata = {
  title: "Pre-screened Candidates",
};

export default async function Page() {
  const jobsWithApplicants = (await getMyJobListings()).filter(
    (job) => job.jobApplications.length > 0,
  );
  const bookmarkedJobseekers = await getJobseekerBookmarkByCompany();
  const jobsWithLocations = await processJobs(jobsWithApplicants);

  return (
    <Box sx={{ mb: 12, mx: { xs: 3, md: 6.25 } }}>
      <Grid2 size={1}>
        <EmployerRecentJobPosts
          jobs={jobsWithLocations}
          bookmarkedJobseekers={bookmarkedJobseekers}
        />
      </Grid2>
    </Box>
  );
}
