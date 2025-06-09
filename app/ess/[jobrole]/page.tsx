import { getJobRole, getRecommendedJobSeekersByJobRole } from "@/app/lib/ict";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Grid,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";

export default async function Page(props: {
  params: Promise<{ jobrole: string }>;
}) {
  const params = await props.params;
  const jobRole = await getJobRole(params.jobrole);
  const jobseekers = await getRecommendedJobSeekersByJobRole(params.jobrole);

  if (!jobRole) {
    return (
      <Container maxWidth="xl">
        <Box mb={2}>
          <Button sx={{ my: 2 }} variant="contained" href="/ess">
            See other Job Roles
          </Button>
          <Typography>No Job Role Found</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box mb={2}>
        <Button sx={{ my: 2 }} variant="contained" href="/ess">
          See other Job Roles
        </Button>
        <Typography
          variant="h2"
          component="h2"
          fontWeight="bold"
          sx={{ wordBreak: "break-word" }}
        >
          {jobRole?.title}
        </Typography>
        <Card sx={{ p: 2, mb: 2, mt: 2 }}>
          <CardContent component={Stack} spacing={2}>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Description
              </Typography>
              <List disablePadding>
                {jobRole.jobDescription
                  ?.split(".")
                  .filter((point: string) => point.trim() !== "")
                  .map((point: string, index: number) => (
                    <ListItem disableGutters key={index}>
                      <ListItemText>{point.trim()}</ListItemText>
                    </ListItem>
                  ))}
              </List>
            </Box>

            <Typography variant="h5" fontWeight="bold">
              AI Impact
            </Typography>
            <Typography>{jobRole.aiImpact}</Typography>

            <Typography variant="h5" fontWeight="bold">
              AI Transformation Potential
            </Typography>
            <Typography>{jobRole.aiTransformation}</Typography>
          </CardContent>
        </Card>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: "grow" }}>
            <Card>
              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                  Key Insights
                </Typography>
                <List disablePadding>
                  {jobRole.keyInsights
                    ?.split("~")
                    .filter((point: string) => point.trim() !== "")
                    .map((point: string, index: number) => (
                      <ListItem disableGutters key={index}>
                        <ListItemText>{point.trim()}</ListItemText>
                      </ListItem>
                    ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: "grow" }}>
            <Card>
              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                  Principal Tasks
                </Typography>
                <List disablePadding>
                  {jobRole.principalTasks
                    ?.split("~")
                    .filter((point: string) => point.trim() !== "")
                    .map((point: string, index: number) => (
                      <ListItem disableGutters key={index}>
                        <ListItemText>{point.trim()}</ListItemText>
                      </ListItem>
                    ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: "grow" }}>
            <Card>
              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                  Principal Skills
                </Typography>
                <List disablePadding>
                  {jobRole.principalSkills
                    ?.split("~")
                    .filter((point: string) => point.trim() !== "")
                    .map((point: string, index: number) => (
                      <ListItem disableGutters key={index}>
                        <ListItemText>{point.trim()}</ListItemText>
                      </ListItem>
                    ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Card>
          <CardContent>
            <Typography variant="h5" fontWeight="bold">
              Job Seeker Matches
            </Typography>
            <TableContainer sx={{ mt: 1 }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Resume</TableCell>
                    <TableCell align="right">Match Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobseekers?.map((jobseeker) => (
                    <TableRow key={jobseeker.jobseeker_id}>
                      <TableCell>
                        {jobseeker.first_name} {jobseeker.last_name}
                      </TableCell>
                      <TableCell>{jobseeker.email}</TableCell>
                      <TableCell>
                        {jobseeker.hasResume ? "true" : "false"}
                      </TableCell>
                      <TableCell align="right">
                        {jobseeker.final_score}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
