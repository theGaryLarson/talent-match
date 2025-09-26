import Image from "next/image";
import Step1 from "./StepCard1.png";
import Step2 from "./StepCard2.png";
import Step3 from "./StepCard3.png";
import { Box, Grid, Typography } from "@mui/material";
import PillButton from "../PillButton";

export default async function EmployerSteps() {
  return (
    <Box
      sx={{ backgroundColor: "#EBF1F4", px: { xs: 1, md: 5, lg: 10 }, py: 10 }}
    >
      <Box sx={{ justifyItems: "center" }}>
        <Typography variant="h1" color="secondary" sx={{ fontWeight: 500 }}>
          From Post to Hire.
        </Typography>
        <Typography color="textSecondary" sx={{ pt: 2.5 }}>
          Need talent fast? Get job-ready candidates in 14 days.
        </Typography>
        <Typography color="textSecondary" sx={{ pb: 5 }}>
          Average cost-per-hire (direct + internal) saved: $4,700
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Grid size={{ xs: 12, sm: 4 }} sx={{ justifyItems: "center" }}>
          <Image className="w-[300px]" src={Step1} alt={""} quality={50} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }} sx={{ justifyItems: "center" }}>
          <Image className="w-[300px]" src={Step2} alt="" quality={50} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }} sx={{ justifyItems: "center" }}>
          <Image className="w-[300px]" src={Step3} alt={""} quality={50} />
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 5, justifySelf: "center" }}>
        <PillButton href={"mailto:susanne.mata@computingforall.org"}>
          Get In Touch
        </PillButton>
      </Grid>
    </Box>
  );
}
