'use client';

import React, {useState} from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';


// REVIEW: testing redux
// import type { RootState } from '@/lib/store';
// import { useSelector, useDispatch } from 'react-redux';
// import { addField, updateField } from '@/lib/features/profileCreation/formSlice';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Button } from "flowbite-react";
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
      router.push('/create-profile/jobseeker/disclosures');
    } catch (e: any) {
      //error handling
    }
  }
  return(
    <main className="flex">
      <aside className="profile-form-aside">
      </aside>
      <section className="profile-form-section">
        {/* TODO: Comment/Uncomment test script below for viewing */}
        {/* <h1>Data on Another Page</h1>
        <pre>{JSON.stringify(fields, null, 2)}</pre> */}
        <ProgressBarFlat progress={5/6 * 100} size="sm" className="laptop:hidden"/>
        <p>Step 5/6</p>
        <h1>Your preferences</h1>

        <p className='subtitle'>* Indicates a required field</p>
        <form onSubmit={ handleSubmit }>

          <fieldset>
            <div>
              <fieldset>
                <legend>What are you looking for?</legend>
                <div className="container">
                  <Button
                      className="custom-outline-btn inline-block m-2"
                      // variant="outlined"
                      onClick={ () => { setEmploymentType('Full-time job')} }
                  >
                    Full-time job
                  </Button>
                  <Button
                      className="custom-outline-btn inline-block m-2"
                      // variant="outlined"
                      onClick={ () => { setEmploymentType('Part-time job')} }
                  >
                    Part-time job
                  </Button>
                  <Button
                      className="custom-outline-btn inline-block m-2"
                      // variant="outlined"
                      onClick={ () => { setEmploymentType('Internship')} }
                  >
                    Internship
                  </Button>
                  <Button
                      className="custom-outline-btn inline-block m-2"
                      // variant="outlined"
                      onClick={ () => { setEmploymentType('On-campus job')} }
                  >
                    On-campus job
                  </Button>
                  <Button
                      className="custom-outline-btn inline-block m-2"
                      // variant="outlined"
                      onClick={ () => { setEmploymentType('Contract')} }
                  >
                    Contract
                  </Button>
                </div>
              </fieldset>
              <FormControl component="fieldset">
                <FormLabel id="profile-creation-preferences-require-role" className="mt-7" component="legend" sx={{color:"#000000ff"}}>What is your tech role/targeted pathway?</FormLabel>
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

          <div className="profile-form-progress-btn-group">
            <Button pill className="custom-outline-btn">Previous</Button>
            <Button pill type="submit">Save and continue</Button>
          </div>
          
        </form>
      </section>
    </main>
  );
}