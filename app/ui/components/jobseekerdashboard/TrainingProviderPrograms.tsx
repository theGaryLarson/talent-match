import { Grid2, Stack } from '@mui/material';
import { ReadEduProviderProgramCardDTO } from '@/app/lib/eduProviders';
import TrainingProgramCard from '@/app/ui/components/career/TrainingProgramCard';
import PillButton from '../PillButton';

export default async function TrainingProviderPrograms({
  programs,
}: {
  programs: ReadEduProviderProgramCardDTO[];
}) {
  return (
    <Stack direction={'column'} gap={2}>
      <Grid2 gap={1} container sx={{ justifyContent: 'space-between' }}>
        <p className="self-center text-xl font-medium text-button-secondary-idle-text">
          Coalition Training Provider Programs
        </p>
        <PillButton
          href="/services/training-providers"
          disableElevation
          sx={{
            backgroundColor: '#f6f6f6',
            color: '#014260',
          }}
        >
          See More
        </PillButton>
      </Grid2>
      <p>
        Kickstart your career with practical, industry-relevant training. These
        partner programs provide the skills, mentorship, and credentials
        essential for success in your tech field.
      </p>
      <Grid2 container gap={2}>
        {programs.map(function (program) {
          return TrainingProgramCard(program);
        })}
      </Grid2>
    </Stack>
  );
}
