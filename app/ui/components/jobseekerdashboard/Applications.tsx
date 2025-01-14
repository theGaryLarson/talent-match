import {
  Grid2,
  Card,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  ChipProps,
} from '@mui/material';
import { Button } from 'flowbite-react';
import { ArrowCircleRightOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { JobListingCardViewDTO } from '@/data/dtos/JobListingCardViewDTO';
import { JobStatus } from '@/app/lib/jobseekerJobTracking';

type StatusConfigType = {
  [K in JobStatus]: {
    color: ChipProps['color'];
    variant: ChipProps['variant'];
  };
};

const statusConfig: StatusConfigType = {
  [JobStatus.Applied]: {
    color: 'info',
    variant: 'outlined',
  },
  [JobStatus.Interviewing]: {
    color: 'primary',
    variant: 'filled',
  },
  [JobStatus.Negotiating]: {
    color: 'warning',
    variant: 'filled',
  },
  [JobStatus.Accepted]: {
    color: 'success',
    variant: 'filled',
  },
  [JobStatus.IWithdrew]: {
    color: 'error',
    variant: 'filled',
  },
  [JobStatus.NotSelected]: {
    color: 'error',
    variant: 'outlined',
  },
  [JobStatus.NoResponse]: {
    color: 'default',
    variant: 'outlined',
  },
};

const getStatusStyle = (status: string) => {
  const defaultStyle = {
    color: 'default' as ChipProps['color'],
    variant: 'outlined' as ChipProps['variant'],
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
      <Grid2 container size={1} sx={{ justifyContent: 'space-between' }}>
        <p className="self-center text-xl font-medium text-black/90">
          Application Status
        </p>
        <Button pill outline href="/services/joblistings">
          Search Jobs
        </Button>
      </Grid2>
      <Grid2 size={1}>
        <Card variant="outlined" sx={{ p: 1 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Deadline</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow
                    key={job.job_posting_id}
                    sx={{
                      '&:last-child td': {
                        borderBottom: 0,
                      },
                    }}
                  >
                    <TableCell>{job.job_title}</TableCell>
                    <TableCell>{job.companies.company_name}</TableCell>
                    <TableCell>{job.unpublish_date?.toDateString()}</TableCell>
                    <TableCell
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Chip
                        label={job.jobStatus}
                        color={getStatusStyle(job.jobStatus).color}
                        variant={getStatusStyle(job.jobStatus).variant}
                        size="small"
                      />
                      <Link
                        target="_blank"
                        href={'/services/joblistings/' + job.job_posting_id}
                      >
                        <ArrowCircleRightOutlined />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid2>
    </Grid2>
  );
}
