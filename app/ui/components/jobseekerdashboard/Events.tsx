import { Grid2, Typography } from "@mui/material";
import PillButton from "../PillButton";

export default async function Events() {
  return (
    <Grid2 container rowSpacing={2} columns={1}>
      <Grid2
        spacing={1}
        container
        size={1}
        sx={{ justifyContent: "space-between" }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "secondary.main",
            alignSelf: "center",
          }}
        >
          Registered Events
        </Typography>
        <PillButton
          href="/underconstruction"
          disableElevation
          sx={{
            backgroundColor: "#f6f6f6",
            color: "secondary.main",
          }}
        >
          Event Calendar
        </PillButton>
      </Grid2>
      <Grid2 container gap={2} sx={{ width: "100%" }}>
        <div className="mb-2 flex w-full grow items-center rounded-lg border p-4 text-lg shadow">
          <h3>Coming Soon...</h3>
        </div>
      </Grid2>
    </Grid2>
  );
}
