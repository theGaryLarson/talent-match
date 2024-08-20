'use client';

import React, {useState} from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import SelectWithLabel from '@/app/ui/components/mui/SelectWithLabel';
import { Button, Label, List, ListItem, Checkbox } from "flowbite-react";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import {JsDisclosuresPostDTO} from "@/data/dtos/JobSeekerProfileCreationDTOs";
import { useRouter} from "next/navigation";

export default function CreateJobseekerProfileDisclosuresPage(){
  const [veteranStatus, setVeteranStatus] = useState('')
  const [disabilityStatus, setDisabilityStatus] = useState('');
  const [gender, setGender] = useState('');
  const [race, setRace] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData: JsDisclosuresPostDTO = {
      userId: '87E52D83-CC98-46AF-B62A-58124ABEBBDC', // TODO pull user id from nextauth session data
      isVeteran: veteranStatus,
      hasDisability: disabilityStatus,
      gender: gender,
      race: race,
      hasReadTerms: termsAccepted,
    }

    try {
      const response = await fetch('/api/jobseekers/account/disclosures/upsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      router.push('/create-profile/jobseeker/preferences');
    } catch (e: any) {
      // error handling
    }
  }
  return(
    <main className="flex">
      <aside className="hidden lg:w-2/5 lg:block">
      </aside>
      <section className="w-full lg:w-3/5">
        <ProgressBarFlat progress={6/6 * 100} size="sm" color="dark" className="lg:hidden"/>
        <p>Step 6/6</p>
        <h1>Voluntary Disclosures</h1>
        <p>* Indicates a required field</p>
        <form onSubmit={handleSubmit}>
          <p>
            You are invited to provide information to assist us in meeting these government reporting requirements.
            Completion of this form is completely voluntary. If you choose not to answer, you will not be subject to adverse effects. However, we encourage you to answer each question and assure you that this information is confidential. 
          </p>
          <fieldset>
            {/* REVIEW: These options are from dynamics, but may be deprecated? */}
            <SelectWithLabel
              id="profile-creation-disclosures-gender"
              fullWidth
              label="Gender"
              value={gender}
              onChange={(event)=>{setGender(event.target.value)}}
              options={[
                {label:"Male", value:"male"},
                {label:"Female", value:"female"},
                {label:"Non-binary", value:"non-binary"},
                {label:"Other", value:"other"},
                {label:"I prefer not to say", value:"undisclosed"},
              ]}
              placeholder="Please select"
              required
            />
            <SelectWithLabel
              id="profile-creation-disclosures-veterans"
              fullWidth
              label="Veterans"
              value={veteranStatus}
              onChange={(event)=>{setVeteranStatus(event.target.value)}}
              options={[
                {label:"Yes", value:"yes"},
                {label:"No", value:"no"},
                {label:"I prefer not to say", value:"undisclosed"},
              ]}
              placeholder="Please select"
              required
            />
            <SelectWithLabel
              id="profile-creation-disclosures-ethnicity"
              fullWidth
              label="Ethnicity"
              value={race}
              onChange={(event)=>{setRace(event.target.value)}}
              options={[
                {label:"I am a person of Hispanic origin", value:"hispanic origin"},
                {label:"I am NOT Hispanic", value:"not hispanic"},
                {label:"I prefer not to say", value:"undisclosed"},
              ]}
              placeholder="Please select"
              required
            />
          </fieldset>
          <fieldset>
            <legend>
              <h2>How do you know if you have a disability?</h2>
            </legend>
            <p>
              A disability is a condition that substantially limits one or more of your “major life activities.” If you have or have ever had such a condition, you are a person with a disability. Disabilities include, but are not limited to:
            </p>

            {/* TODO: the li bullets are missing */}
            <ul>
              <li>Alcohol or other substance use disorder (not currently using drugs illegally)</li>
              <li>Autoimmune disorder, for example, lupus, fibromyalgia, rheumatoid arthritis, HIV/AIDS</li>
              <li>Blind or low vision</li>
              <li>Cancer (past or present)</li>
              <li>Cardiovascular or heart disease</li>
              <li>Celiac disease</li>
              <li>Cerebral palsy</li>
              <li>Deaf or serious difficulty hearing</li>
              <li>Diabetes</li>
              <li>Disfigurement, for example, disfigurement caused by burns, wounds, accidents, or congenital disorders</li>
              <li>Epilepsy or other seizure disorder</li>
              <li>Gastrointestinal disorders, for example, Crohn&apos;s Disease, irritable bowel syndrome</li>
              <li>Intellectual or developmental disability</li>
              <li>Mental health conditions, for example, depression, bipolar disorder, anxiety disorder, schizophrenia, PTSD</li>
              <li>Missing limbs or partially missing limbs</li>
              <li>Mobility impairment, benefiting from the use of a wheelchair, scooter, walker, leg brace(s) and/or other supports</li>
              <li>Nervous system condition, for example, migraine headaches, Parkinson&apos;s disease, multiple sclerosis (MS)</li>
              <li>Neurodivergence, for example, attention-deficit/hyperactivity disorder (ADHD), autism spectrum disorder, dyslexia, dyspraxia, other learning disabilities</li>
              <li>Partial or complete paralysis (any cause)</li>
              <li>Pulmonary or respiratory conditions, for example, tuberculosis, asthma, emphysema</li>
              <li>Short stature (dwarfism)</li>
              <li>Traumatic brain injury</li>
            </ul>
            
            {/* REVIEW: on the figma this was checkboxes, but has been built as radio instead; comment made on figma to double-check */}
            <FormControl component="fieldset">
              <FormLabel id="profile-creation-disclosures-require-disability-label" component="legend" sx={{color:"#000000ff"}}>Please select one of the options below: *</FormLabel>
              <RadioGroup
                aria-labelledby="profile-creation-disclosures-require-disability-label"
                defaultValue="female"
                value={disabilityStatus}
                onChange={(event) => setDisabilityStatus(event.target.value)}
                name="profile-creation-disclosures-require-disability"
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes, I have a disability, or have had one in the past" />
                <FormControlLabel value="no" control={<Radio />} label="No, I do not have a disability and have not had one in the past" />
                <FormControlLabel value="undisclosed" control={<Radio />} label="I do not want to answer" />
              </RadioGroup>
            </FormControl>
          </fieldset>
          <fieldset>
            <legend>
              <h2>Terms</h2>
            </legend>
            <Label className="block">
              <Checkbox
                  name="profile-creation-disclosures-require-terms"
                  checked={termsAccepted}
                  onChange={(event) => setTermsAccepted(event.target.checked)}
                  required
              /> Yes, I have read and consent to the terms and conditions*
            </Label>

          </fieldset>
          <div className="flex">
            <Button pill color="gray">Previous</Button>
            <Button pill type="submit">Save and continue</Button>
          </div>
        </form>
      </section>
    </main>
  );
}