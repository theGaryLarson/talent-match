'use client';

import React, {useState} from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import Confetti from '@/app/ui/components/Confetti';


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
  const [error, setError] = useState('');
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
        const errorMessage = `Failed to submit preferences. Status: ${response.status} - ${response.statusText}`;
        setError(errorMessage);
        return;
      }

      const result = await response.json();
      console.log(JSON.stringify(result, null ,2 ));
      router.push('/services/jobseekers');
    } catch (e: any) {
      setError(`An unexpected error occurred: ${e.message}`);
    }
  }
  return(
    <main className="flex justify-center">
      <aside className="profile-form-aside">
      </aside>
      <section className="profile-form-section main-content">
        <Confetti />
        <h1>Congrats on completing your profile, Qian!</h1>

        <p className='subtitle-congrats'>{`Let's kickstart your career journey!`}</p>
        <Button pill type="submit">Get Started</Button>

        {/* <form onSubmit={ handleSubmit }>

          <fieldset>
            <div>
              <fieldset>
                <legend>What are you looking for?</legend>
                <div className="container">
                  <Button
                      pill
                      className="custom-outline-btn inline-block m-2"
                      // variant="outlined"
                      onClick={ () => { setEmploymentType('Full-time job')} }
                  >
                    Full-time job
                  </Button>
                  <Button
                      pill
                      className="custom-outline-btn inline-block m-2"
                      // variant="outlined"
                      onClick={ () => { setEmploymentType('Part-time job')} }
                  >
                    Part-time job
                  </Button>
                  <Button
                      pill
                      className="custom-outline-btn inline-block m-2"
                      // variant="outlined"
                      onClick={ () => { setEmploymentType('Internship')} }
                  >
                    Internship
                  </Button>
                  <Button
                      pill
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
                  <FormControlLabel value="Software Development" control={<Radio />} label="Software Development" />
                  <FormControlLabel value="IT & Cloud Computing" control={<Radio />} label="IT & Cloud Computing" />
                  <FormControlLabel value="Cybersecurity" control={<Radio />} label="Cybersecurity" />
                  <FormControlLabel value="Data Analytics" control={<Radio />} label="Data Analytics" />
                </RadioGroup>
              </FormControl>
            </div>
          </fieldset>

          <div className="profile-form-progress-btn-group">
            <Button pill className="custom-outline-btn">Previous</Button>
            <Button pill type="submit">Save and continue</Button>
          </div>
          
        </form> */}
      </section>
    </main>
  );
}