"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  Divider,
  Grid2,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
  TypographyProps,
} from "@mui/material";
import Link from "next/link";
import { ArrowCircleRightOutlined } from "@mui/icons-material";
import { JobStatus } from "@/app/lib/jobseekerJobTracking";
import { JobListingCardViewDTO } from "@/data/dtos/JobListingCardViewDTO";

type StatusConfigType = {
  [K in JobStatus]: {
    color: TypographyProps["color"];
  };
};

const statusConfig: StatusConfigType = {
  [JobStatus.Applied]: { color: "success" },
  [JobStatus.Screened]: { color: "secondary" },
  [JobStatus.Interviewing]: { color: "primary" },
  [JobStatus.Negotiating]: { color: "secondary" },
  [JobStatus.Accepted]: { color: "success" },
  [JobStatus.IWithdrew]: { color: "error" },
  [JobStatus.NotSelected]: { color: "error" },
  [JobStatus.NoResponse]: { color: "default" },
};

const getStatusStyle = (status: string) => {
  const defaultStyle = {
    color: "default" as TypographyProps["color"],
  };
  return statusConfig[status as JobStatus] || defaultStyle;
};
// ---

interface JobApplicationsProps {
  activeJobs: JobListingCardViewDTO[];
  nonActiveJobs: JobListingCardViewDTO[];
}

export default function MyJobApplications({
  activeJobs,
  nonActiveJobs,
}: JobApplicationsProps) {
  // 0 = Active, 1 = Archive
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const jobsToDisplay = tabIndex === 0 ? activeJobs : nonActiveJobs;

  return (
    <Stack direction="column" spacing={4}>
      <Typography variant="h3" sx={{ color: "secondary.main" }}>
        Applications
      </Typography>
      <Box sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="Active or Archived Applications"
        >
          <Tab id="tab-0" label="Active" />
          <Tab id="tab-1" label="Archive" />
        </Tabs>
      </Box>

      <Grid2 container rowSpacing={2} columns={1}>
        <Grid2 size={12}>
          {/* Desktop view */}
          <Card
            variant="outlined"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {/*<TableCell
                      sx={{ color: "secondary.main", fontWeight: "500" }}
                    >
                      Action
                    </TableCell>*/}
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
                  {jobsToDisplay?.map((job) => (
                    <TableRow
                      key={job.job_posting_id}
                      sx={{
                        "&:last-child td": { borderBottom: 0 },
                      }}
                    >
                      {/*<TableCell sx={{ color: "secondary.main" }}>
                        <Chip
                          clickable
                          size="small"
                          icon={<Clear />}
                          color="error"
                          label="Withdraw"
                        />
                      </TableCell>*/}
                      <TableCell sx={{ fontWeight: "500" }}>
                        {job.job_title}
                      </TableCell>
                      <TableCell>{job.companies.company_name}</TableCell>
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
                          href={`/services/joblistings/${job.job_posting_id}`}
                        >
                          <ArrowCircleRightOutlined
                            fontSize="large"
                            color="action"
                          />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* Mobile view */}
          <Card
            variant="outlined"
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <Stack spacing={1} direction="column" sx={{ pt: 1 }}>
              {jobsToDisplay.map((job, index) => (
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
                    href={`/services/joblistings/${job.job_posting_id}`}
                  >
                    <Typography sx={{ textAlign: "end", mb: 1 }}>
                      <ArrowCircleRightOutlined
                        fontSize="large"
                        color="action"
                      />
                    </Typography>
                  </Link>
                  {index !== jobsToDisplay.length - 1 && (
                    <Divider variant="middle" orientation="horizontal" />
                  )}
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid2>
      </Grid2>
    </Stack>
  );
}
