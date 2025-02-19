import { Grid2, Stack, Typography } from "@mui/material";
import { ReadEduProviderProgramCardDTO } from "@/app/lib/eduProviders";
import TrainingProgramCard from "@/app/ui/components/career/TrainingProgramCard";
import PillButton from "../PillButton";

export default async function TrainingProviderPrograms({
  programs,
}: {
  programs: ReadEduProviderProgramCardDTO[];
}) {
  return (
    <Stack direction={"column"} gap={2}>
      <Grid2 gap={1} container sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{
            color: "secondary.main",
            alignSelf: "center",
          }}
        >
          Coalition Training Provider Programs
        </Typography>
        <PillButton
          href="/services/training-providers"
          disableElevation
          sx={{
            backgroundColor: "neutral.100",
            color: "secondary.main",
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
