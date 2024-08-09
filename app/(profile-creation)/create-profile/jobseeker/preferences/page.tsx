'use client';

import React from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';

// REVIEW: testing redux
import type { RootState } from '../../../../../lib/store';
import { useSelector, useDispatch } from 'react-redux';
import { addField, updateField } from '../../../../../lib/features/profileCreation/formSlice';
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';


export default function CreateJobseekerProfilePreferencesPage(){
  const { fields } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
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
        <form>
          <fieldset>
            <legend>
              <h2>Your Preferences</h2>
            </legend>
            <div>
              <fieldset>
                <legend>What are you looking for?</legend>
                {/* TODO: Pills need function to select */}
                <div className="flex">
                  <Button variant="outlined">Full-time job</Button>
                  <Button variant="outlined">Part-time job</Button>
                  <Button variant="outlined">Internship</Button>
                  <Button variant="outlined">On-campus job</Button>
                </div>
              </fieldset>
              <FormControl component="fieldset">
                <FormLabel id="profile-creation-preferences-require-role" component="legend" sx={{color:"#000000ff"}}>What is your tech role/pathway targeted?</FormLabel>
                <RadioGroup
                  aria-labelledby="profile-creation-preferences-require-role"
                  defaultValue="female"
                  name="profile-creation-preferences-require-role"
                >
                  <FormControlLabel value="Software Development" control={<Radio />} label="Software Development" />
                  <FormControlLabel value="Cloud Computing" control={<Radio />} label="Cloud Computing" />
                  <FormControlLabel value="Data analytics" control={<Radio />} label="Data analytics" />
                </RadioGroup>
              </FormControl>
            </div>
          </fieldset>

          <div className="flex">
            <Button variant="outlined">Previous</Button>
            <Button variant="contained">Save and continue</Button>
          </div>
        </form>
      </section>
    </main>
  );
}