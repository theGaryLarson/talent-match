'use client';

import React, { useEffect, useState } from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';

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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/jobseekerStore';
import {
  initialState,
  setPreferences,
} from '@/lib/features/profileCreation/jobseekerSlice';
import _ from 'lodash';
import { devLog } from '@/app/lib/utils';

export default function CreateJobseekerProfilePreferencesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const preferencesStoreData = useSelector(
    (state: RootState) => state.jobseeker.preferences,
  );
  const preferencesData = { ...preferencesStoreData };
  const [error, setError] = useState<string | null>(null);

  const [employmentType, setEmploymentType] = useState(
    preferencesData.preferredEmploymentType ?? '',
  );
  const [pathway, setPathway] = useState(preferencesData.targetedPathway ?? '');
  const [pathwayId, setPathwayId] = useState(
    preferencesData.targetedPathwayId ?? '',
  );

  useEffect(() => {
    if (session?.user?.id && status === 'authenticated') {
      const initializeFormFields = async () => {
        if (_.isEqual(preferencesStoreData, initialState.preferences)) {
          const { id } = session.user;

          try {
            devLog('fetching fresh');
            const response = await fetch(
              '/api/jobseekers/account/preferences/get/' + id,
            );

            if (!response.ok) {
              preferencesData.userId = id!;
            } else {
              let fetchedData: JsPreferencesDTO = (await response.json())
                .result;
              preferencesData.userId = id!;
              if (fetchedData.preferredEmploymentType) {
                preferencesData.preferredEmploymentType =
                  fetchedData.preferredEmploymentType;
                setEmploymentType(preferencesData.preferredEmploymentType);
              }
              if (fetchedData.targetedPathway) {
                preferencesData.targetedPathway = fetchedData.targetedPathway;
                setPathway(preferencesData.targetedPathway);
              }
              if (fetchedData.targetedPathwayId) {
                preferencesData.targetedPathwayId =
                  fetchedData.targetedPathwayId;
                setPathwayId(preferencesData.targetedPathwayId);
              }
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          devLog('fetching from store');
        }
      };

      initializeFormFields();
    }
  }, [session?.user?.id]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!session?.user?.id) {
      console.error('User session is not available.');
      return;
    }

    preferencesData.userId = session.user.id;
    preferencesData.targetedPathwayId = pathwayId;
    preferencesData.targetedPathway = pathway;
    preferencesData.preferredEmploymentType = employmentType;

    try {
      const response = await fetch(
        '/api/jobseekers/account/preferences/upsert',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(preferencesData),
        },
      );

      if (response.ok) {
        const result = await response.json();
        devLog(JSON.stringify(result, null, 2));

        dispatch(setPreferences(preferencesData));

        router.push('/create-profile/jobseeker/disclosures');
      } else {
        const errorMessage = `Failed to submit preferences. Status: ${response.status} - ${response.statusText}`;
        setError(errorMessage);
      }
    } catch (e: any) {
      setError(`An unexpected error occurred: ${e.message}`);
    }
  }

  return (
    <main className="flex justify-center">
      <aside className="profile-form-aside"></aside>
      <section className="profile-form-section">
        {/* TODO: Comment/Uncomment test script below for viewing */}
        {/* <h1>Data on Another Page</h1>
        <pre>{JSON.stringify(fields, null, 2)}</pre> */}
        <ProgressBarFlat progress={(5 / 6) * 100} size="sm" />
        <p>Step 5/6</p>
        <h1>Your preferences</h1>

        <p className="subtitle">* Indicates a required field</p>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div>
              <fieldset>
                <legend>What are you looking for?</legend>
                <div className="container">
                  <Button
                    pill
                    className={`custom-outline-btn m-2 inline-block ${
                      employmentType !== 'Full-time' ? '' : 'selected'
                    }`}
                    // variant="outlined"
                    onClick={() => {
                      setEmploymentType('Full-time');
                    }}
                  >
                    Full-time job
                  </Button>
                  <Button
                    pill
                    className={`custom-outline-btn m-2 inline-block ${
                      employmentType !== 'Part-time' ? '' : 'selected'
                    }`}
                    // variant="outlined"
                    onClick={() => {
                      setEmploymentType('Part-time');
                    }}
                  >
                    Part-time job
                  </Button>
                  <Button
                    pill
                    className={`custom-outline-btn m-2 inline-block ${
                      employmentType !== 'Internship' ? '' : 'selected'
                    }`}
                    // variant="outlined"
                    onClick={() => {
                      setEmploymentType('Internship');
                    }}
                  >
                    Internship
                  </Button>
                  <Button
                    pill
                    className={`custom-outline-btn m-2 inline-block ${
                      employmentType !== 'On-campus' ? '' : 'selected'
                    }`}
                    // variant="outlined"
                    onClick={() => {
                      setEmploymentType('On-campus');
                    }}
                  >
                    On-campus job
                  </Button>
                </div>
              </fieldset>
              <FormControl component="fieldset">
                <FormLabel
                  id="profile-creation-preferences-require-role"
                  className="mt-7"
                  component="legend"
                  sx={{ color: '#000000ff' }}
                >
                  What is your tech role/targeted pathway?
                </FormLabel>
                <RadioGroup
                  aria-labelledby="profile-creation-preferences-require-role"
                  defaultValue="female"
                  name="profile-creation-preferences-require-role"
                  value={pathway}
                  onChange={(e) => {
                    setPathway(e.target.value);
                  }}
                >
                  <FormControlLabel
                    value="Software Development"
                    control={<Radio />}
                    label="Software Development"
                  />
                  <FormControlLabel
                    value="IT & Cloud Computing"
                    control={<Radio />}
                    label="IT & Cloud Computing"
                  />
                  <FormControlLabel
                    value="Cybersecurity"
                    control={<Radio />}
                    label="Cybersecurity"
                  />
                  <FormControlLabel
                    value="Data Analytics"
                    control={<Radio />}
                    label="Data Analytics"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </fieldset>

          <div className="profile-form-progress-btn-group">
            <Button
              pill
              className="custom-outline-btn"
              onClick={() => {
                router.push('/create-profile/jobseeker/showcase');
              }}
            >
              Previous
            </Button>
            <Button pill type="submit">
              Save and continue
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
