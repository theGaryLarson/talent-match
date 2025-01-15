'use client';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import {
  Typography,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  Box,
  Container,
  Grid2,
  FormGroup,
  Snackbar,
  Alert,
  AlertColor,
} from '@mui/material';
import PillButton from '@/app/ui/components/PillButton';
import { JSX } from 'react/jsx-runtime';

interface FormData {
  memberRoles: string[];
  firstName: string;
  lastName: string;
  jobTitle: string;
  organization: string;
  email: string;
  interests: string[];
}

interface SubmitStatus {
  open: boolean;
  severity: AlertColor;
  message: string;
}

interface PayloadData {
  'Member role': string;
  Firstname: string;
  Lastname: string;
  JobTitle: string;
  Organization: string;
  Email: string;
  'Area of Interest': string;
  'Form Name': string;
  Notification: string;
}

export default function Page(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    memberRoles: [],
    firstName: '',
    lastName: '',
    jobTitle: '',
    organization: '',
    email: '',
    interests: [],
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    open: false,
    severity: 'success',
    message: '',
  });

  const memberRoles: string[] = [
    'Employers or Tech Industry Professionals',
    'Educators',
    'Community Organization/Nonprofit Professionals',
    'Workforce or Government Professionals',
  ];

  const interestOptions: string[] = [
    'Recruiting',
    'Employee skill development',
    'Tech curriculum improvement',
    'Internship programs',
    'Apprenticeship programs',
    'Career Launch programs',
    'Student job placement assistance',
    'Educational program support',
    'Other',
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (formData.memberRoles.length === 0) {
      setSubmitStatus({
        open: true,
        severity: 'error',
        message: 'Please select at least one member type',
      });
      return;
    }

    setIsSubmitting(true);

    const payload: PayloadData = {
      'Member role': formData.memberRoles.join(', '),
      Firstname: formData.firstName,
      Lastname: formData.lastName,
      JobTitle: formData.jobTitle,
      Organization: formData.organization,
      Email: formData.email,
      'Area of Interest': formData.interests.join(', '),
      'Form Name': 'Membership Form (universal) V3',
      Notification:
        'This is a notification that a contact form was submitted on your website (Washington Tech Workforce Coalition)',
    };

    try {
      const response = await fetch(
        'https://prod-25.westus.logic.azure.com:443/workflows/b1c10acdf2324ab097420749954854e9/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=X297QuDQs7HctPalrTQIJ9Nh7-5TDUHhdnS51R1eb54',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitStatus({
        open: true,
        severity: 'success',
        message: 'Form submitted successfully!',
      });

      setFormData({
        memberRoles: [],
        firstName: '',
        lastName: '',
        jobTitle: '',
        organization: '',
        email: '',
        interests: [],
      });
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({
        open: true,
        severity: 'error',
        message: 'Failed to submit form. Please try again.',
      });
    }

    setIsSubmitting(false);
  };

  const handleMemberTypeToggle = (type: string): void => {
    setFormData((prev) => ({
      ...prev,
      memberRoles: prev.memberRoles.includes(type)
        ? prev.memberRoles.filter((t) => t !== type)
        : [...prev.memberRoles, type],
    }));
  };

  const handleInterestToggle = (interest: string): void => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleCloseSnackbar = (): void => {
    setSubmitStatus((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Join the Coalition
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
            Membership is FREE. Join us in building a workforce that evolves at
            the rate of technology advancement.
          </Typography>
          <FormControl fullWidth sx={{ mb: 4 }}>
            <FormLabel required>
              I would like to receive information relevant to:
            </FormLabel>
            <FormGroup>
              {memberRoles.map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      checked={formData.memberRoles.includes(type)}
                      onChange={() => handleMemberTypeToggle(type)}
                    />
                  }
                  label={type}
                />
              ))}
            </FormGroup>
          </FormControl>

          <Grid2 container spacing={2} sx={{ mb: 4 }}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <TextField
                required
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </Grid2>
          </Grid2>

          <TextField
            fullWidth
            label="Job Title"
            value={formData.jobTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, jobTitle: e.target.value })
            }
            sx={{ mb: 4 }}
          />

          <TextField
            required
            fullWidth
            label="Organization Name"
            value={formData.organization}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, organization: e.target.value })
            }
            sx={{ mb: 4 }}
          />

          <TextField
            required
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, email: e.target.value })
            }
            sx={{ mb: 4 }}
          />

          <FormControl component="fieldset" fullWidth sx={{ mb: 4 }}>
            <FormLabel component="legend">I am interested in:</FormLabel>
            <FormGroup>
              {interestOptions.map((interest) => (
                <FormControlLabel
                  key={interest}
                  control={
                    <Checkbox
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestToggle(interest)}
                    />
                  }
                  label={interest}
                />
              ))}
            </FormGroup>
          </FormControl>

          <PillButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </PillButton>
        </Box>

        <Snackbar
          open={submitStatus.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={submitStatus.severity}
            sx={{ width: '100%' }}
          >
            {submitStatus.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}
