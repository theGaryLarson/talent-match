import {
  Grid2,
  Card,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
  Stack,
  Divider,
  TypographyProps,
} from "@mui/material";
import { ArrowCircleRightOutlined } from "@mui/icons-material";
import Link from "next/link";
import { JobListingCardViewDTO } from "@/data/dtos/JobListingCardViewDTO";
import { JobStatus } from "@/app/lib/jobseekerJobTracking";
import PillButton from "../PillButton";

type StatusConfigType = {
  [K in JobStatus]: {
    color: TypographyProps["color"];
  };
};

const statusConfig: StatusConfigType = {
  [JobStatus.Applied]: {
    color: "success",
  },
  [JobStatus.Screened]: {
    color: "secondary",
  },
  [JobStatus.Interviewing]: {
    color: "primary",
  },
  [JobStatus.Negotiating]: {
    color: "secondary",
  },
  [JobStatus.Accepted]: {
    color: "success",
  },
  [JobStatus.IWithdrew]: {
    color: "error",
  },
  [JobStatus.NotSelected]: {
    color: "error",
  },
  [JobStatus.NoResponse]: {
    color: "default",
  },
};

const getStatusStyle = (status: string) => {
  const defaultStyle = {
    color: "default" as TypographyProps["color"],
  };

  return statusConfig[status as JobStatus] || defaultStyle;
};

export default async function Applications({
  jobs,
}: {
  jobs: JobListingCardViewDTO[] | undefined;
}) {
  if (!jobs) {
    return (
      <>
        <div className="text-xl font-medium text-black/90">
          Application Status
        </div>
        <div>No applications found.</div>
      </>
    );
  }

  return (
    <Grid2 container rowSpacing={2} columns={1}>
      <Grid2
        container
        spacing={1}
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
          Application Status
        </Typography>
        <PillButton
          href="/services/joblistings"
          disableElevation
          sx={{
            backgroundColor: "neutral.100",
            color: "secondary.main",
          }}
        >
          Search Jobs
        </PillButton>
      </Grid2>
      <Grid2 size={1}>
        <Card variant="outlined" sx={{ display: { xs: "none", sm: "block" } }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ color: "secondary.main", fontWeight: "500" }}
                  >
                    Job Title
                  </TableCell>
                  <TableCell
                    sx={{ color: "secondary.main", fontWeight: "500" }}
                  >
                    Company Name
                  </TableCell>
                  <TableCell
                    sx={{ color: "secondary.main", fontWeight: "500" }}
                  >
                    Deadline
                  </TableCell>
                  <TableCell
                    sx={{ color: "secondary.main", fontWeight: "500" }}
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow
                    key={job.job_posting_id}
                    sx={{
                      "&:last-child td": {
                        borderBottom: 0,
                      },
                    }}
                  >
                    <TableCell
                      sx={{ color: "secondary.main", fontWeight: "500" }}
                    >
                      {job.job_title}
                    </TableCell>
                    <TableCell sx={{ color: "secondary.main" }}>
                      {job.companies.company_name}
                    </TableCell>
                    <TableCell sx={{ color: "neutral.700" }}>
                      {job.unpublish_date?.toLocaleString(undefined, {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography color={getStatusStyle(job.jobStatus).color}>
                        {job.jobStatus}
                      </Typography>
                      <Link
                        target="_blank"
                        href={"/services/joblistings/" + job.job_posting_id}
                      >
                        <ArrowCircleRightOutlined color="action" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        <Card variant="outlined" sx={{ display: { xs: "block", sm: "none" } }}>
          <Stack spacing={1} direction={"column"} sx={{ pt: 1 }}>
            {jobs.map((job, index) => (
              <Box key={job.job_posting_id + "sm"} sx={{ px: 2 }}>
                <Typography>{job.job_title}</Typography>
                <Typography>{job.companies.company_name}</Typography>
                <Typography sx={{ color: "neutral.700" }}>
                  {job.unpublish_date?.toLocaleString(undefined, {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
                <Typography color={getStatusStyle(job.jobStatus).color}>
                  {job.jobStatus}
                </Typography>
                <Link
                  target="_blank"
                  href={"/services/joblistings/" + job.job_posting_id}
                >
                  <Typography sx={{ textAlign: "end", mb: 1 }}>
                    <ArrowCircleRightOutlined />
                  </Typography>
                </Link>
                {index !== jobs.length - 1 && (
                  <Divider variant="middle" orientation="horizontal" />
                )}
              </Box>
            ))}
          </Stack>
        </Card>
      </Grid2>
    </Grid2>
  );
}
