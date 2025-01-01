'use client';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React from 'react';

interface JobApplication {
  id: string;
  jobPostId: string;
  jobseekerId: string;
  jobStatus: string;
  isBookmarked: boolean|null;
  savedAt: Date;
  appliedDate: Date|null;
  followUpDate: Date| null;
  Jobseekers: {
    jobseeker_id: string;
    assignedPool:string|null;
    user_id: string;
    intro_headline: string|null;
    years_work_exp: number|null;
    users:{
        first_name:string|null;
        last_name:string|null;
    }
  };
}

interface JobPosting {
  job_posting_id: string;
  company_id: string;
  location_id: string;
  employer_id: string|null;
  tech_area_id: string|null;
  sector_id: string|null;
  job_title: string;
  job_description: string;
  is_internship: boolean;
  is_paid: boolean;
  employment_type: string;
  location: string;
  salary_range: string;
  county: string;
  zip: string;
  publish_date: Date;
  unpublish_date: Date;
  job_post_url: string|null;
  assessment_url: string|null;
  jobApplications: JobApplication[];
}

interface RowProps {
  row: JobPosting;
}

function Row({ row }: RowProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.job_title}
        </TableCell>
        <TableCell>{row.company_id}</TableCell>
        <TableCell>{row.location}</TableCell>
        <TableCell>{row.employment_type}</TableCell>
        <TableCell>{row.salary_range}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Job Applications
              </Typography>
              <Table size="small" aria-label="applications">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Job Status</TableCell>
                    <TableCell>Assigned Pool</TableCell>
                    <TableCell>Applied Date</TableCell>
                    <TableCell>Follow-Up Date</TableCell>
                    <TableCell>Jobseeker Intro</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.jobApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>{app.Jobseekers.users.first_name} {app.Jobseekers.users.last_name}</TableCell>
                      <TableCell>{app.jobStatus}</TableCell>
                      <TableCell>{app.Jobseekers.assignedPool}</TableCell>
                      <TableCell>{app.appliedDate?new Date(app.appliedDate).toLocaleDateString():''}</TableCell>
                      <TableCell>{app.followUpDate ? new Date(app.followUpDate).toLocaleDateString() : 'N/A'}</TableCell>
                      <TableCell>{app.Jobseekers.intro_headline}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface JobTrackingTableProps {
  data: JobPosting[];
}

export default function JobTrackingTable({ data }: JobTrackingTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Job Title</TableCell>
            <TableCell>Company ID</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Employment Type</TableCell>
            <TableCell>Salary Range</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <Row key={item.job_posting_id} row={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}