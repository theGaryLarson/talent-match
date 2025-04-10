import { Grid } from "@mui/material";
import { IRelatedData } from "../../lib/data";
import LinearProgressesWithTitle from "./linear-progresses-with-title";

export default function EducationExperienceDetails({
  occupation,
}: {
  occupation: IRelatedData;
}) {
  const education_items = occupation.cfa_educationbreakdown_Occupation.map(
    (education) => ({
      label: education.cfa_educationlevel,
      value: Number(education.cfa_percentoftotal),
    }),
  );
  const experience_items = occupation.cfa_experiencebreakdown_Occupation.map(
    (experience) => ({
      label: experience.cfa_experience,
      value: Number(experience.cfa_percentoftotal),
    }),
  );
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <LinearProgressesWithTitle
          title="Job openings by degree type"
          items={education_items}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <LinearProgressesWithTitle
          title="Job openings by degree type"
          items={experience_items}
        />
      </Grid>
    </Grid>
  );
}
