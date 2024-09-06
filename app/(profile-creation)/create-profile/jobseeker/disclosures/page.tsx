'use client';

import React, { useEffect, useState } from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import SelectWithLabel from '@/app/ui/components/mui/SelectWithLabel';
import { JsDisclosuresPostDTO } from '@/data/dtos/JobSeekerProfileCreationDTOs';
import { useRouter } from 'next/navigation';
import { Button, Label, List, ListItem } from 'flowbite-react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
} from '@mui/material';
import { useSession } from 'next-auth/react';

export default function CreateJobseekerProfileDisclosuresPage() {
  const [veteranStatus, setVeteranStatus] = useState('');
  const [disabilityStatus, setDisabilityStatus] = useState('');
  const [gender, setGender] = useState('');
  const [race, setRace] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [sessionData, setSessionData] = useState(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!session || !session.user?.id) {
      console.error('User session is not available.');
      return;
    }
    const formData: JsDisclosuresPostDTO = {
      userId: session.user.id,
      isVeteran: veteranStatus,
      hasDisability: disabilityStatus,
      gender: gender,
      race: race,
      hasReadTerms: termsAccepted,
    };

    try {
      const response = await fetch(
        '/api/jobseekers/account/disclosures/upsert',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      router.push('/create-profile/jobseeker/congratulations');
    } catch (e: any) {
      // error handling
    }
  }
  return (
    <main className="flex justify-center">
      <aside className="profile-form-aside"></aside>
      <section className="profile-form-section">
        <ProgressBarFlat progress={(6 / 6) * 100} size="sm" />
        <p>Step 6/6</p>
        <h1>Voluntary Disclosures</h1>
        <p className="subtitle">* Indicates a required field</p>
        <p>* Indicates a required field</p>
        <form onSubmit={handleSubmit}>
          <p>
            You are invited to provide information to assist us in meeting these
            government reporting requirements. Completion of this form is
            completely voluntary. If you choose not to answer, you will not be
            subject to adverse effects. However, we encourage you to answer each
            question and assure you that this information is confidential. 
          </p>
          <fieldset>
            <div className="profile-form-grid">
              <SelectWithLabel
                id="profile-creation-disclosures-gender"
                fullWidth
                label="Gender"
                value={gender}
                onChange={(event) => {
                  setGender(event.target.value);
                }}
                options={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                  { label: 'Non-binary', value: 'non-binary' },
                  { label: 'Other', value: 'other' },
                  { label: 'I prefer not to say', value: 'undisclosed' },
                ]}
                placeholder="Please select"
                required
              />
              <SelectWithLabel
                id="profile-creation-disclosures-veterans"
                fullWidth
                label="Veterans"
                value={veteranStatus}
                onChange={(event) => {
                  setVeteranStatus(event.target.value);
                }}
                options={[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' },
                  { label: 'I prefer not to say', value: 'undisclosed' },
                ]}
                placeholder="Please select"
                required
              />
              <SelectWithLabel
                id="profile-creation-disclosures-ethnicity"
                fullWidth
                label="Ethnicity"
                value={race}
                onChange={(event) => {
                  setRace(event.target.value);
                }}
                options={[
                  {
                    label: 'I am a person of Hispanic origin',
                    value: 'hispanic origin',
                  },
                  { label: 'I am NOT Hispanic', value: 'not hispanic' },
                  { label: 'I prefer not to say', value: 'undisclosed' },
                ]}
                placeholder="Please select"
                required
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <h2>How do you know if you have a disability?</h2>
            </legend>
            <p>
              A disability is a condition that substantially limits one or more
              of your “major life activities.” If you have or have ever had such
              a condition, you are a person with a disability. Disabilities
              include, but are not limited to:
            </p>

            <ul className="list-inside list-disc">
              <li>
                Alcohol or other substance use disorder (not currently using
                drugs illegally)
              </li>
              <li>
                Autoimmune disorder, for example, lupus, fibromyalgia,
                rheumatoid arthritis, HIV/AIDS
              </li>
              <li>Blind or low vision</li>
              <li>Cancer (past or present)</li>
              <li>Cardiovascular or heart disease</li>
              <li>Celiac disease</li>
              <li>Cerebral palsy</li>
              <li>Deaf or serious difficulty hearing</li>
              <li>Diabetes</li>
              <li>
                Disfigurement, for example, disfigurement caused by burns,
                wounds, accidents, or congenital disorders
              </li>
              <li>Epilepsy or other seizure disorder</li>
              <li>
                Gastrointestinal disorders, for example, Crohn&apos;s Disease,
                irritable bowel syndrome
              </li>
              <li>Intellectual or developmental disability</li>
              <li>
                Mental health conditions, for example, depression, bipolar
                disorder, anxiety disorder, schizophrenia, PTSD
              </li>
              <li>Missing limbs or partially missing limbs</li>
              <li>
                Mobility impairment, benefiting from the use of a wheelchair,
                scooter, walker, leg brace(s) and/or other supports
              </li>
              <li>
                Nervous system condition, for example, migraine headaches,
                Parkinson&apos;s disease, multiple sclerosis (MS)
              </li>
              <li>
                Neurodivergence, for example, attention-deficit/hyperactivity
                disorder (ADHD), autism spectrum disorder, dyslexia, dyspraxia,
                other learning disabilities
              </li>
              <li>Partial or complete paralysis (any cause)</li>
              <li>
                Pulmonary or respiratory conditions, for example, tuberculosis,
                asthma, emphysema
              </li>
              <li>Short stature (dwarfism)</li>
              <li>Traumatic brain injury</li>
            </ul>

            <FormControl component="fieldset">
              <FormLabel
                className="mb-2 mt-5"
                id="profile-creation-disclosures-require-disability-label"
                component="legend"
                sx={{ color: '#000000ff' }}
              >
                Please select one of the options below: *
              </FormLabel>
              <RadioGroup
                aria-labelledby="profile-creation-disclosures-require-disability-label"
                defaultValue="female"
                value={disabilityStatus}
                onChange={(event) => setDisabilityStatus(event.target.value)}
                name="profile-creation-disclosures-require-disability"
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="Yes, I have a disability, or have had one in the past"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio />}
                  label="No, I do not have a disability and have not had one in the past"
                />
                <FormControlLabel
                  value="undisclosed"
                  control={<Radio />}
                  label="I do not want to answer"
                />
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
              />{' '}
              Yes, I have read and consent to the terms and conditions*
            </Label>
          </fieldset>
          <div className="profile-form-progress-btn-group">
            <Button pill className="custom-outline-btn">
              Previous
            </Button>
            <Button pill type="submit">
              Submit
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
