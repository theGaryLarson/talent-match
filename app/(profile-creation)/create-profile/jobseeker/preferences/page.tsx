'use client';

import React from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';

import type { RootState } from '../../../../../lib/store';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Button } from "flowbite-react";


export default function CreateJobseekerProfilePreferencesPage(){
  const { fields } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  return(
    <main className="flex">
      <aside className="profile-form-aside">
      </aside>
      <section className="profile-form-section">
        {/* TODO: Comment/Uncomment test script below for viewing */}
        {/* <h1>Data on Another Page</h1>
        <pre>{JSON.stringify(fields, null, 2)}</pre> */}
        <ProgressBarFlat progress={5/6 * 100} size="sm" className="xl:hidden"/>
        <p>Step 5/6</p>
        <h1>Your preferences</h1>
        <p className='subtitle'>* Indicates a required field</p>
        <form>
          <fieldset>
            <div>
              <fieldset>
                <legend>What are you looking for?</legend>
                {/* TODO: Pills need function to select */}
                <div className="container">
                  <Button pill className="custom-outline-btn inline-block m-2">Full-time job</Button>
                  <Button pill className="custom-outline-btn inline-block m-2">Part-time job</Button>
                  <Button pill className="custom-outline-btn inline-block m-2">Internship</Button>
                  <Button pill className="custom-outline-btn inline-block m-2">On-campus job</Button>
                </div>
              </fieldset>
              <FormControl component="fieldset">
                <FormLabel id="profile-creation-preferences-require-role" className="mt-7" component="legend" sx={{color:"#000000ff"}}>What is your tech role/pathway targeted?</FormLabel>
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

          <div className="profile-form-progress-btn-group">
            <Button pill className="custom-outline-btn">Previous</Button>
            <Button pill>Save and continue</Button>
          </div>
        </form>
      </section>
    </main>
  );
}