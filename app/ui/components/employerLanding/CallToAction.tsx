import { Box, Grid, Stack, Typography } from "@mui/material";
import meeting from "./meeting.jpg";
import whiteboard from "./whiteboard.jpg";
import PillButton from "../PillButton";
import Image from "next/image";

export default async function CallToAction() {
  return (
    <Box
      sx={{
        backgroundColor: "#EBF1F4",
        py: { sm: 10, md: 15 },
        px: { xs: 1, md: 5, lg: 10 },
      }}
    >
      <Typography
        variant="h1"
        color="secondary"
        sx={{ fontWeight: 500, mb: 9, textAlign: "right" }}
      >
        Ready to Start?
      </Typography>
      <Grid container spacing={5}>
        <Stack size={{ xs: 12, md: 6 }} spacing={4} component={Grid}>
          <Grid
            container
            direction={"row"}
            sx={{ justifyContent: "space-between" }}
          >
            <Typography variant="h3" sx={{ fontWeight: 500 }}>
              Planning Ahead
            </Typography>
            <PillButton
              href="/join"
              color="inherit"
              size="small"
              variant="outlined"
              sx={{ color: "neutral.black" }}
            >
              Join The Coalition
            </PillButton>
          </Grid>
          <Image
            style={{
              maxWidth: "auto",
              height: "240px",
              objectFit: "cover",
              borderRadius: "25px",
            }}
            src={whiteboard}
            alt="Kanban board having tasks added to it"
          />
        </Stack>
        <Stack size={{ xs: 12, md: 6 }} spacing={4} component={Grid}>
          <Grid
            container
            direction={"row"}
            sx={{ justifyContent: "space-between" }}
          >
            <Typography variant="h3" sx={{ fontWeight: 500 }}>
              Hiring Now
            </Typography>
            <PillButton
              href={"mailto:susanne.mata@computingforall.org"}
              size="small"
            >
              Get In Touch
            </PillButton>
          </Grid>
          <Image
            style={{
              maxWidth: "auto",
              height: "240px",
              objectFit: "cover",
              borderRadius: "25px",
            }}
            src={meeting}
            alt="Kanban board having tasks added to it"
          />
        </Stack>
      </Grid>
    </Box>
  );
}
