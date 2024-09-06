'use client';

import React, { useState } from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import Confetti from '@/app/ui/components/Confetti';

// REVIEW: testing redux
// import type { RootState } from '@/lib/store';
// import { useSelector, useDispatch } from 'react-redux';
// import { addField, updateField } from '@/lib/features/profileCreation/formSlice';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { JsPreferencesDTO } from '@/data/dtos/JobSeekerProfileCreationDTOs';
import { useSession } from 'next-auth/react';

export default function CreateJobseekerProfilePreferencesPage() {
  // const { fields } = useSelector((state: RootState) => state.form);
  // const dispatch = useDispatch();
  const [employmentType, setEmploymentType] = useState('');
  const [pathway, setPathway] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  function handleClick() {
    router.push(`/services/jobseekers/${session?.user.jobseekerId!}`);
  }
  const firstName = session?.user?.firstName;
  return (
    <main className="flex justify-center">
      <aside className="profile-form-aside"></aside>
      <section className="profile-form-section main-content">
        <Confetti />
        <h1>Congrats on completing your profile, {firstName}!</h1>

        <p className="subtitle-congrats">{`Let's kickstart your career journey!`}</p>
        <Button pill onClick={handleClick}>
          Get Started
        </Button>
      </section>
    </main>
  );
}
