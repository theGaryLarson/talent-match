'use client';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Radio from '@mui/material/Radio';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button, FormControlLabel, FormLabel, RadioGroup, TextField } from '@mui/material';
import Router from 'next/router';
import JobStatusDropDown from './JobStatusDropDown';
import { JobStatus } from '@/app/lib/jobseekerJobTracking';

interface JobApplication {
  id: string;
  jobPostId: string;
  jobseekerId: string;
  jobStatus: string;
  isBookmarked: boolean | null;
  savedAt: Date;
  appliedDate: Date | null;
  followUpDate: Date | null;
  Jobseekers: {
    jobseeker_id: string;
    assignedPool: string | null;
    user_id: string;
    intro_headline: string | null;
    years_work_exp: number | null;
    users: {
      first_name: string | null;
      last_name: string | null;
    };
  };
}

interface JobPosting {
  job_posting_id: string;
  company_id: string;
  location_id: string;
  employer_id: string | null;
  tech_area_id: string | null;
  sector_id: string | null;
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
  job_post_url: string | null;
  assessment_url: string | null;
  jobApplications: JobApplication[];
  companies: {
    company_name: string;
  };
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
        <TableCell>{row.companies.company_name}</TableCell>
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
                      <TableCell>
                        <Link href={'/services/jobseekers/' + app.jobseekerId} className='LINK' target='_blank'>
                          {app.Jobseekers.users.first_name} {app.Jobseekers.users.last_name}
                        </Link>
                      </TableCell>
                      <TableCell><JobStatusDropDown currentJobStatus={app.jobStatus as JobStatus} jobAppId={app.id}/></TableCell>
                      <TableCell>{app.Jobseekers.assignedPool}</TableCell>
                      <TableCell>{app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : ''}</TableCell>
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
  const [filter, setFilter] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  // Filter the job postings based on job title, company name, or location
  const filteredData = data.filter(item => 
    item.job_title.toLowerCase().includes(filter.toLowerCase()) ||
    item.companies.company_name.toLowerCase().includes(filter.toLowerCase()) ||
    item.location.toLowerCase().includes(filter.toLowerCase())
  ).filter(item =>
    item.location.toLowerCase().includes(location)
  );

  return (
    <Box sx={{ padding: 2 }}>
      {/* Search Filter */}
      <TextField
        label="Filter by Job Title, Company, or Location"
        variant="outlined"
        fullWidth
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <div>
       <RadioGroup
    aria-labelledby="demo-controlled-radio-buttons-group"
    name="controlled-radio-buttons-group"
    value={location}
    onChange={(e)=>setLocation(e.target.value)}
  >
    <FormLabel id="demo-radio-buttons-group-label">Location Type</FormLabel>
    <FormControlLabel value="remote" control={<Radio />} label="Remote" />
    <FormControlLabel value="hybrid" control={<Radio />} label="Hybrid" />
    <FormControlLabel value="on-site" control={<Radio />} label="On-Site" />
    <FormControlLabel value="" control={<Radio />} label="Any" />
  </RadioGroup>
  </div>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Job Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Employment Type</TableCell>
              <TableCell>Salary Range</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <Row key={item.job_posting_id} row={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
