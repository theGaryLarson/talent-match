'use client';

import React, {useState} from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';

// REVIEW: testing redux
import type { RootState } from '@/lib/store';
// import { useSelector, useDispatch } from 'react-redux';
// import { addField, updateField } from '@/lib/features/profileCreation/formSlice';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useRouter } from 'next/navigation';
import {JsPreferencesDTO} from "@/data/dtos/JobSeekerProfileCreationDTOs";


export default function CreateJobseekerProfilePreferencesPage(){
  // const { fields } = useSelector((state: RootState) => state.form);
  // const dispatch = useDispatch();
  const [employmentType, setEmploymentType] = useState('');
  const [pathway, setPathway] = useState('');

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData: JsPreferencesDTO = {
      userId: '87E52D83-CC98-46AF-B62A-58124ABEBBDC', // TODO: grab user.id from nextauth session
      targetedPathwayId: null,
      targetedPathway: pathway,
      preferredEmploymentType: employmentType,

    }

    try {
      const response = await fetch('/api/jobseekers/account/preferences/upsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(JSON.stringify(result, null ,2 ));
      router.push('/create-profile/jobseeker/preferences');
    } catch (e: any) {
      //error handling
    }
  }
  return(
    <main className="flex">
      <aside className="hidden lg:w-2/5 lg:block">
      </aside>
      <section className="w-full lg:w-3/5">
        {/* TODO: Comment/Uncomment test script below for viewing */}
        {/* <h1>Data on Another Page</h1>
        <pre>{JSON.stringify(fields, null, 2)}</pre> */}
        <ProgressBarFlat progress={5/6 * 100} size="sm" color="dark" className="lg:hidden"/>
        <p>Step 5/6</p>
        <h1>Your preferences</h1>
        <p>* Indicates a required field</p>
        <form onSubmit={ handleSubmit }>
          <fieldset>
            <legend>
              <h2>Your Preferences</h2>
            </legend>
            <div>
              <fieldset>
                <legend>What are you looking for?</legend>
                {/* TODO: Pills need function to select */}
                <div className="flex">
                  <Button
                      variant="outlined"
                      onClick={ (e) => { setEmploymentType('Full-time job')} }
                  >
                    Full-time job
                  </Button>
                  <Button
                      variant="outlined"
                      onClick={ (e) => { setEmploymentType('Part-time job')} }
                  >
                    Part-time job
                  </Button>
                  <Button
                      variant="outlined"
                      onClick={ (e) => { setEmploymentType('Internship')} }
                  >
                    Internship
                  </Button>
                  <Button
                      variant="outlined"
                      onClick={ (e) => { setEmploymentType('On-campus job')} }
                  >
                    On-campus job
                  </Button>
                </div>
              </fieldset>
              <FormControl component="fieldset">
                <FormLabel id="profile-creation-preferences-require-role" component="legend" sx={{color:"#000000ff"}}>What is your tech role/targeted pathway?</FormLabel>
                <RadioGroup
                  aria-labelledby="profile-creation-preferences-require-role"
                  defaultValue="female"
                  name="profile-creation-preferences-require-role"
                  value={ pathway }
                  onChange = { (e) => { setPathway(e.target.value) } }
                >
                  <FormControlLabel value="Software Developer" control={<Radio />} label="Software Developer" />
                  <FormControlLabel value="Web Developer" control={<Radio />} label="Web Developer" />
                  <FormControlLabel value="Software Quality Assurance Analyst and Tester" control={<Radio />} label="Software Quality Assurance Analyst and Tester" />
                  <FormControlLabel value="Network and Computer Systems Administrator" control={<Radio />} label="Network and Computer Systems Administrator" />
                  <FormControlLabel value="Computer User Support Specialist" control={<Radio />} label="Computer User Support Specialist" />
                  <FormControlLabel value="Graphic Designer" control={<Radio />} label="Graphic Designer" />
                </RadioGroup>
              </FormControl>
            </div>
          </fieldset>

          <div className="flex">
            <Button variant="outlined">Previous</Button>
            <Button variant="contained" type="submit">Save and continue</Button>
          </div>
        </form>
      </section>
    </main>
  );
}