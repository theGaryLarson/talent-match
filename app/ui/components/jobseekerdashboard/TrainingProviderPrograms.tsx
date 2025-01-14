import { Grid2 } from '@mui/material';
import { ReadEduProviderProgramCardDTO } from '@/app/lib/eduProviders';
import TrainingProgramCard from '@/app/ui/components/career/TrainingProgramCard';
import { Button } from 'flowbite-react';

export default async function TrainingProviderPrograms({
  programs,
}: {
  programs: ReadEduProviderProgramCardDTO[];
}) {
  return (
    <Grid2 container rowSpacing={2} columns={1}>
      <Grid2 container size={1} sx={{ justifyContent: 'space-between' }}>
        <p className="self-center text-xl font-medium text-black/90">
          Coalition Training Provider Programs
        </p>
        <Button pill outline href="/services/training-providers">
          See More
        </Button>
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
    </Grid2>
  );
}
