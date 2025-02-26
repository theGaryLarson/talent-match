import EmployerNameTitleTag from "@/app/ui/components/employerdashboard/EmployerNameTitleTag";
import ScoreCard from "@/app/ui/components/ScoreCard";
import DeletionFlag from "@/app/ui/components/DeletionFlag";
import { getCompanyById, getEmployerById } from "@/app/lib/prisma";
import EmployerTeamMembers from "@/app/ui/components/employerdashboard/EmployerTeamMembers";
import { auth } from "@/auth";
import EmployerRecentJobPosts from "@/app/ui/components/employerdashboard/EmployerRecentJobPosts";
import Link from "next/link";
import { Box, Button, Card, Grid2, Stack, Typography } from "@mui/material";
import NewJobFormButton from "@/app/ui/components/jobManagement/NewJobFormButton";
import PillButton from "@/app/ui/components/PillButton";
import { SearchOutlined } from "@mui/icons-material";
import JobListingsTable from "@/app/ui/components/jobManagement/JobListingsTable";
import { getMyJobListings } from "@/app/lib/joblistings";
//employer dashboard
export const metadata = {
  title: "My Dashboard",
};
export default async function Page() {
  const session = await auth();

  const proInfo = await getEmployerById(session?.user.employerId ?? "");
  const company = await getCompanyById(proInfo?.company_id ?? "");
  const jobs = (await getMyJobListings()).splice(0, 3);
  if (!proInfo || company == undefined) {
    return (
      <div>
        <h1 className="text-2xl">
          There has been an error finding your info please try logging out and
          logging back in
        </h1>
      </div>
    );
  }
  return (
    <Box sx={{ mb: 12, mx: { xs: 3, md: 6.25 } }}>
      <DeletionFlag deletionDate={undefined} />
      {!session?.user.companyId ? (
        <div className="bg-red-700 py-1 items-center flex text-center justify-center">
          <h1 className="text-md capitalize text-white">
            Some Functions May be limited Please Log out and Log back in to gain
            full functionality
          </h1>
        </div>
      ) : (
        ""
      )}
      <Typography variant={"h4"} sx={{ color: "secondary.main", mb: 7 }}>
        Welcome back, {session?.user.firstName}
      </Typography>
      <Grid2 container direction={"row"}>
        <Box sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
          <EmployerTeamMembers companyid={company.company_id} />
        </Box>
        <Grid2 size={"grow"}>
          <Grid2
            container
            size={"grow"}
            spacing={4.5}
            sx={{ justifyContent: "center", mb: 7 }}
          >
            <div>
              <NewJobFormButton size="large" />
            </div>
            <div>
              <PillButton
                size="large"
                color="secondary"
                startIcon={<SearchOutlined />}
                href="/services/talent-search"
              >
                Search for Candidates
              </PillButton>
            </div>
          </Grid2>
          <Grid2 container spacing={2} sx={{ justifyContent: "center", mb: 7 }}>
            <Grid2 size={{ xs: 12, md: 4, xl: 3 }}>
              <Link href="/services/employers/dashboard/myjobposts">
                <ScoreCard
                  title="Your active jobs"
                  val={proInfo.job_postings.length}
                />
              </Link>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4, xl: 3 }}>
              <Link href="/services/employers/dashboard/savedcandidates">
                <ScoreCard
                  title="Pre-screened candidates"
                  val={proInfo.BookmarkedJobseeker.length}
                />
              </Link>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4, xl: 3 }}>
              <Link href="/services/employers/dashboard/savedcandidates">
                <ScoreCard
                  title="Saved candidates"
                  val={proInfo.BookmarkedJobseeker.length}
                />
              </Link>
            </Grid2>
          </Grid2>
          <Grid2 container rowSpacing={2} columns={1}>
            <Grid2
              container
              spacing={1}
              size={1}
              sx={{ justifyContent: "space-between", mb: 4 }}
            >
              <Typography
                variant="h6"
                color="secondary"
                sx={{ alignSelf: "center" }}
              >
                Recommended pre-screened candidate
              </Typography>
              <PillButton
                color="inherit"
                href="/services/joblistings"
                startIcon={<SearchOutlined />}
                sx={{ color: "secondary.main" }}
              >
                Search for Candidates
              </PillButton>
            </Grid2>
            <Grid2 size={1}>
              <JobListingsTable jobs={jobs} />
            </Grid2>
            <Grid2 size={1} sx={{ display: { xs: "flex", md: "none" } }}>
              <EmployerTeamMembers companyid={company.company_id} />
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  );
}
