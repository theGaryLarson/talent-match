'use client';

import React, { useEffect, useState } from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import SelectWithLabel from '@/app/ui/components/mui/SelectWithLabel';
import {
  JsDisclosuresDTO,
  JsDisclosuresPostDTO,
} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import { useRouter } from 'next/navigation';
import { Button, Label, List, ListItem } from 'flowbite-react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Snackbar,
  SnackbarContent,
  Typography,
  IconButton,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import SnackbarWithIcon from '@/app/ui/components/SnackbarWithIcon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/jobseekerStore';
import {
  initialState,
  setDisclosures,
} from '@/lib/features/profileCreation/jobseekerSlice';
import {
  setPageDirty,
  setPageSaved,
} from '@/lib/features/profileCreation/saveSlice';
import _ from 'lodash';
import { devLog } from '@/app/lib/utils';

export default function CreateJobseekerProfileDisclosuresPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const disclosuresStoreData = useSelector(
    (state: RootState) => state.jobseeker.disclosures,
  );
  const disclosuresData = { ...disclosuresStoreData };
  const [error, setError] = useState<{ error: string | null }>({ error: null });

  const [veteranStatus, setVeteranStatus] = useState(disclosuresData.isVeteran);
  const [disabilityStatus, setDisabilityStatus] = useState(
    disclosuresData.disabilityStatus,
  );
  const [disabilityType, setDisabilityType] = useState(
    disclosuresData.disability,
  );
  const [gender, setGender] = useState(disclosuresData.gender);
  const [race, setRace] = useState(disclosuresData.race);
  const [ethnicity, setEthnicity] = useState(disclosuresData.ethnicity);
  const [termsAccepted, setTermsAccepted] = useState(
    disclosuresData.hasReadTerms,
  );
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (session?.user?.id && status === 'authenticated') {
      const initializeFormFields = async () => {
        if (_.isEqual(disclosuresStoreData, initialState.disclosures)) {
          const { id } = session.user;

          try {
            devLog('fetching fresh');
            const response = await fetch(
              '/api/jobseekers/account/disclosures/get/' + id,
            );

            if (!response.ok) {
              disclosuresData.userId = id!;
            } else {
              let fetchedData: JsDisclosuresDTO = (await response.json())
                .result;
              disclosuresData.userId = id!;
              if (fetchedData.gender) {
                disclosuresData.gender = fetchedData.gender;
                setGender(disclosuresData.gender);
              }
              if (fetchedData.disabilityStatus) {
                disclosuresData.disabilityStatus = fetchedData.disabilityStatus;
                setDisabilityStatus(disclosuresData.disabilityStatus);
              }
              if (fetchedData.disability) {
                disclosuresData.disability = fetchedData.disability;
                setDisabilityType(disclosuresData.disability);
              }
              if (fetchedData.isVeteran) {
                disclosuresData.isVeteran = fetchedData.isVeteran;
                setVeteranStatus(disclosuresData.isVeteran);
              }
              if (fetchedData.ethnicity) {
                disclosuresData.ethnicity = fetchedData.ethnicity;
                setEthnicity(disclosuresData.ethnicity);
              }
              if (fetchedData.race) {
                disclosuresData.race = fetchedData.race;
                setRace(disclosuresData.race);
              }
              disclosuresData.hasReadTerms = fetchedData.hasReadTerms;
              setTermsAccepted(disclosuresData.hasReadTerms);
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          devLog('fetching from store');
        }
      };

      dispatch(setPageSaved('disclosures'));
      initializeFormFields();
    }
  }, [session?.user?.id]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!session?.user?.id) {
      console.error('User session is not available.');
      return;
    }

    if (!termsAccepted) {
      setOpen(true);
      return;
    }

    disclosuresData.userId = session.user.id;
    disclosuresData.isVeteran = veteranStatus;
    disclosuresData.disabilityStatus = disabilityStatus;
    disclosuresData.disability = disabilityType;
    disclosuresData.gender = gender;
    disclosuresData.race = race;
    disclosuresData.ethnicity = ethnicity;
    disclosuresData.hasReadTerms = termsAccepted;

    try {
      const response = await fetch(
        '/api/jobseekers/account/disclosures/upsert',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(disclosuresData),
        },
      );
      if (response.ok) {
        dispatch(setPageSaved('disclosures'));
        dispatch(setDisclosures(disclosuresData));
      } else {
        const errorMessage = `Failed to submit disclosure info. Status: ${response.status} - ${response.statusText}`;
        setError({ error: errorMessage });
      }
      router.push('/edit-profile/jobseeker/congratulations');
    } catch (e: any) {
      setError({ error: `An unexpected error occurred: ${e.message}` });
    }
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <main className="flex justify-center">
      <aside className="profile-form-aside"></aside>
      <section className="profile-form-section">
        <ProgressBarFlat progress={(6 / 6) * 100} size="sm" />
        <p>Step 6/6</p>

        <SnackbarWithIcon
          open={open}
          onClose={handleClose}
          variant="alert"
          message={
            <div>
              <Typography variant="body1">Must agree to terms!</Typography>
              <Typography variant="body2">
                To finish creating your profile, you must agree to the terms.
              </Typography>
            </div>
          }
        />

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
                  dispatch(setPageDirty('disclosures'));
                  setGender(event.target.value);
                }}
                options={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                  {
                    label: 'Do not identify as male or female',
                    value: 'Do not identify as male or female',
                  },
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
                  dispatch(setPageDirty('disclosures'));
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
                value={ethnicity}
                onChange={(event) => {
                  dispatch(setPageDirty('disclosures'));
                  setEthnicity(event.target.value);
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
              <SelectWithLabel
                id="profile-creation-disclosures-race"
                fullWidth
                label="Race"
                value={race}
                onChange={(event) => {
                  dispatch(setPageDirty('disclosures'));
                  setRace(event.target.value);
                }}
                options={[
                  { label: 'Asian', value: 'Asian' },
                  {
                    label: 'Black or African American',
                    value: 'Black or African American',
                  },
                  { label: 'White / Caucasian', value: 'White / Caucasian' },
                  {
                    label: 'Native Hawaiian or Pacific Islander',
                    value: 'Native Hawaiian or Pacific Islander',
                  },
                  { label: 'Hispanic', value: 'Hispanic' },
                  {
                    label: 'American Indian or Alaska Native',
                    value: 'American Indian or Alaska Native',
                  },
                  { label: 'Multi-race', value: 'Multi-race' },
                  {
                    label: 'Not Elsewhere Classified / Other',
                    value: 'Not Elsewhere Classified / Other',
                  },
                  {
                    label: 'Not Specified / Unknown',
                    value: 'Not Specified / Unknown',
                  },
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
                defaultValue="undisclosed"
                value={disabilityStatus}
                onChange={(event) => {
                  setDisabilityStatus(event.target.value);
                  if (event.target.value !== 'yes') {
                    dispatch(setPageDirty('disclosures'));
                    setDisabilityType(event.target.value);
                  }
                }}
                name="profile-creation-disclosures-require-disability"
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="Yes, I have a disability, or have had one in the past"
                />
                <FormControlLabel
                  value="none"
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
            {disabilityStatus === 'yes' && (
              <div className="mb-2 mt-5">
                <SelectWithLabel
                  id="profile-creation-disclosures-require-disability-label"
                  fullWidth
                  label="Please specify: *"
                  value={disabilityType}
                  onChange={(event) => {
                    dispatch(setPageDirty('disclosures'));
                    setDisabilityType(event.target.value);
                  }}
                  options={[
                    { label: 'I prefer not to say', value: 'undisclosed' },
                    { label: 'Cognitive', value: 'cognitive' },
                    { label: 'Emotional', value: 'emotional' },
                    { label: 'Hearing', value: 'hearing' },
                    { label: 'Mental', value: 'mental' },
                    { label: 'Physical', value: 'physical' },
                    { label: 'Visual', value: 'visual' },
                    { label: 'Other', value: 'other' },
                  ]}
                  placeholder="Please select"
                  required
                />
              </div>
            )}
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
              />{' '}
              Yes, I have read and consent to the terms and conditions*
            </Label>
          </fieldset>
          <div className="profile-form-progress-btn-group">
            <Button
              pill
              className="custom-outline-btn"
              onClick={() => {
                router.push('/edit-profile/jobseeker/preferences');
              }}
            >
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
