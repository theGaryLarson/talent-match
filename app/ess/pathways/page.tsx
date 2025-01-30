import { Container, Box, Typography } from "@mui/material";
import { Grid2 } from "@mui/material";
import Pathways from "../ui/pathways";
import { CategoryCardSkeleton } from "../ui/skeletons";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Container maxWidth="xl" sx={{ marginBottom: 4 }}>
      <Box marginBottom={3}>
        <Typography
          variant="h1"
          component="h1"
          fontSize="3rem"
          fontWeight={800}
        >
          Discover Pathways
        </Typography>
        <Typography variant="body1" maxWidth="sm">
          A pathway may have several occupations associated with it. To start,
          you can select a pathway that sounds interesting to you.
        </Typography>
      </Box>
      <Grid2 container spacing={4}>
        <Suspense fallback={<CategoryCardSkeleton />}>
          <Pathways />
        </Suspense>
      </Grid2>
    </Container>
  );
}
