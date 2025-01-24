import { auth } from '@/auth';
import {
  getPoolWithSession,
  getCareerPrepAssementStatus,
} from '@/app/lib/jobseeker';
import { getJobSeekerEmployerView } from '@/app/lib/prisma';
import { getJobSeekerAppliedJobs } from '@/app/lib/joblistings';
import { getCareerPrepStatus } from '@/app/lib/admin/careerPrep';
import { getProviderProgramCardView } from '@/app/lib/eduProviders';
import { Stack, Typography } from '@mui/material';
import CareerPrep from '@/app/ui/components/jobseekerdashboard/CareerPrep';
import Applications from '@/app/ui/components/jobseekerdashboard/Applications';
import Events from '@/app/ui/components/jobseekerdashboard/Events';
import TrainingProviderPrograms from '@/app/ui/components/jobseekerdashboard/TrainingProviderPrograms';
import CallToActionBanner from '@/app/ui/components/jobseekerdashboard/CallToActionBanner';
import PillButton from '@/app/ui/components/PillButton';

export const metadata = {
  title: 'My Dashboard',
};

export default async function Page() {
  const session = await auth();
  const pool = await getPoolWithSession();

  const [AssementInfo, jobseekerData, appliedJobs, carrerPrepEnrollment] =
    await Promise.all([
      getCareerPrepAssementStatus(),
      getJobSeekerEmployerView(session?.user.jobseekerId || ''),
      getJobSeekerAppliedJobs(),
      getCareerPrepStatus(session?.user.jobseekerId ?? ''),
    ]);

  const providerPrograms = (
    await getProviderProgramCardView(
      jobseekerData?.pathways?.pathway_title || '',
    )
  ).splice(0, 3);
  const slicedAppliedJobs = appliedJobs?.slice(0, 3);

  const hasTakenTest =
    AssementInfo != undefined && AssementInfo.CareerPrepAssessment.length > 0;

  return (
    <Stack
      direction={'column'}
      spacing={4}
      sx={{ mt: '25px', mb: 12, mx: { xs: 3, md: 6 } }}
    >
      {/*hasTakenTest ? (
        ''
      ) : (
        <CallTOActionBanner pool={pool?.assignedPool as PoolCategories} />
      )*/}
      <Stack
        direction={'row'}
        spacing={2}
        sx={{
          mb: '0.25rem',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'stretch',
        }}
      >
        <PillButton href="#">
          Dashboard
        </PillButton>
        <Typography
          variant="h4"
          sx={{ fontSize: '24px', textAlign: 'center', fontWeight: 400 }}
        >
          |
        </Typography>
        <PillButton
          disableElevation
          href={'/services/jobseekers/' + session?.user.jobseekerId}
          sx={{
            backgroundColor: '#f6f6f6',
            color: '#014260',
          }}
        >
          Showcase
        </PillButton>
      </Stack>
      <h1 className="text-[32px] text-button-secondary-idle-text">
        Welcome back, {session?.user.firstName}
      </h1>
      <CareerPrep
        enrollmentStatus={carrerPrepEnrollment?.enrollment}
        track={carrerPrepEnrollment?.AssignedTrack}
        jobseekerId={session?.user.jobseekerId ?? ''}
        caseManager={`${carrerPrepEnrollment?.CaseManger?.first_name ?? 'Our'} ${carrerPrepEnrollment?.CaseManger?.last_name ?? 'Carrer Navigator'}`}
      />
      <Applications jobs={slicedAppliedJobs} />
      <Events />
      <TrainingProviderPrograms programs={providerPrograms} />
    </Stack>
  );
}
