import { auth } from "@/auth";
import {
  getPoolWithSession,
  getCareerPrepAssementStatus,
} from "@/app/lib/jobseeker";
import { getJobSeekerEmployerView } from "@/app/lib/prisma";
import { getJobSeekerAppliedJobs } from "@/app/lib/joblistings";
import { getCareerPrepStatus } from "@/app/lib/admin/careerPrep";
import { getProviderProgramCardView } from "@/app/lib/eduProviders";
import { Stack, Typography } from "@mui/material";
import CareerPrep from "@/app/ui/components/jobseekerdashboard/CareerPrep";
import Applications from "@/app/ui/components/jobseekerdashboard/Applications";
import EventsList from "@/app/ui/components/EventsList";
import TrainingProviderPrograms from "@/app/ui/components/jobseekerdashboard/TrainingProviderPrograms";
import PillButton from "@/app/ui/components/PillButton";

export const metadata = {
  title: "My Dashboard",
};

export default async function Page() {
  const session = await auth();
  const pool = await getPoolWithSession(); // eslint-disable-line @typescript-eslint/no-unused-vars

  const [AssementInfo, jobseekerData, appliedJobs, carrerPrepEnrollment] =
    await Promise.all([
      getCareerPrepAssementStatus(),
      getJobSeekerEmployerView(session?.user.jobseekerId || ""),
      getJobSeekerAppliedJobs(),
      getCareerPrepStatus(session?.user.jobseekerId ?? ""),
    ]);

  let providerPrograms;
  if (jobseekerData && jobseekerData.pathways) {
    providerPrograms = (
      await getProviderProgramCardView(
        jobseekerData?.pathways?.pathway_title || "",
      )
    ).splice(0, 3);
  }
  const slicedAppliedJobs = appliedJobs?.slice(0, 3);

  const hasTakenTest = // eslint-disable-line @typescript-eslint/no-unused-vars
    AssementInfo != undefined && AssementInfo.CareerPrepAssessment.length > 0;

  return (
    <Stack
      direction={"column"}
      spacing={4}
      sx={{ mb: 12, mx: { xs: 3, md: 6 } }}
    >
      {/*hasTakenTest ? (
        ''
      ) : (
        <CallTOActionBanner pool={pool?.assignedPool as PoolCategories} />
      )*/}
      <Stack
        direction={"row"}
        spacing={2}
        sx={{
          mb: "0.25rem",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "stretch",
        }}
      >
        <PillButton disableElevation>Dashboard</PillButton>
        <Typography
          variant="h4"
          sx={{ fontSize: "24px", textAlign: "center", fontWeight: 400 }}
        >
          |
        </Typography>
        <PillButton
          disableElevation
          href={"/services/jobseekers/" + session?.user.jobseekerId}
          sx={{
            backgroundColor: "neutral.100",
            color: "secondary.main",
          }}
        >
          Showcase
        </PillButton>
      </Stack>
      <Typography variant={"h4"} sx={{ color: "secondary.main" }}>
        Welcome back, {session?.user.firstName}
      </Typography>
      <CareerPrep
        enrollmentStatus={carrerPrepEnrollment?.enrollment}
        track={carrerPrepEnrollment?.AssignedTrack}
        jobseekerId={session?.user.jobseekerId ?? ""}
        caseManager={`${carrerPrepEnrollment?.CaseManger?.first_name ?? "Our"} ${carrerPrepEnrollment?.CaseManger?.last_name ?? "Carrer Navigator"}`}
      />
      <Applications jobs={slicedAppliedJobs} />
      <EventsList
        headerText={"Registered Events"}
        showOnlyRegisteredEvents={true}
        showMeetingLinks={true}
      ></EventsList>
      {providerPrograms && (
        <TrainingProviderPrograms programs={providerPrograms} />
      )}
    </Stack>
  );
}
