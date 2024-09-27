import { Box, LinearProgress, Grid2, Typography } from "@mui/material";
import { IRelatedData } from "../../lib/data";

export default function EmploymentDetails({
  occupation,
  regionId,
}: {
  occupation: IRelatedData;
  regionId: string;
}) {
  let index = occupation.cfa_jobpostingsregionalbreakdown_Occupation.findIndex((item: any) => item.cfa_jobpostingsregionalbreakdownid == regionId);
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12, md: 6 }}>
        <Box sx={{ color: 'primary.main' }}>
          <Typography variant="h6">Average Monthly Job Postings</Typography>
          <LinearProgress
            variant="determinate"
            value={
              (Number(occupation.cfa_jobpostingsregionalbreakdown_Occupation[index].cfa_aug2023july2024) /
                (Number(occupation.cfa_jobpostingsregionalbreakdown_Occupation[index].cfa_aug2023july2024) + 100)) *
              100
            }
          />
          <Typography>{occupation.cfa_jobpostingsregionalbreakdown_Occupation[index].cfa_aug2023july2024}</Typography>
          {/*<Typography variant="h6">Entry Level Salary</Typography>
          <LinearProgress
            variant="determinate"
            value={
              (Number(occupation.entrySalary) /
                (Number(occupation.entrySalary) + 5000)) *
              100
            }
          />
          <Typography>${occupation.entrySalary}</Typography>
          <Typography variant="h6">Median Salary</Typography>
          <LinearProgress
            variant="determinate"
            value={
              (Number(occupation.medianSalary) /
                (Number(occupation.medianSalary) + 15000)) *
              100
            }
          />
          <Typography>${occupation.medianSalary}</Typography>
        </Box>
      </Grid2>
      <Grid2 xs={12} md={6}>
        <Box sx={{ color: "#014260" }}>
          <Typography variant="h6">Currently Employed</Typography>
          <LinearProgress
            variant="determinate"
            value={
              (Number(occupation.currentlyEmployed) /
                (Number(occupation.currentlyEmployed) + 2500)) *
              100
            }
          />
          <Typography>{occupation.currentlyEmployed}</Typography>
          <Typography variant="h6">Number of Job Ads</Typography>
          <LinearProgress
            variant="determinate"
            value={
              (Number(occupation.numberOfJobAds) /
                (Number(occupation.numberOfJobAds) + 1500)) *
              100
            }
          />
          <Typography>{occupation.numberOfJobAds}</Typography>
          <Typography variant="h6">Projected Annual Growth</Typography>
          <LinearProgress
            variant="determinate"
            value={
              (Number(occupation.projectedGrowth) /
                (Number(occupation.projectedGrowth) + 3)) *
              100
            }
          />
          <Typography>{occupation.projectedGrowth}%</Typography>*/}
        </Box>
      </Grid2>
    </Grid2>
  );
}
