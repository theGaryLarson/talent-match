'use client';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { RootState } from '@/lib/employerStore';
import { useSelector, useDispatch } from 'react-redux';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';

import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import { Button, Progress } from 'flowbite-react';
import { Label } from 'flowbite-react';
import { Checkbox, Typography } from '@mui/material';
import SnackbarWithIcon from '@/app/ui/components/SnackbarWithIcon';
import SelectAutoload from '@/app/ui/components/mui/SelectAutoload';
import { CompanyAddressDropdownDTO } from '@/data/dtos/CompanyAddressDropdownDTO';
import { useSession } from 'next-auth/react';
import { useUpdateSession } from '@/app/lib/auth/useUpdateSession';
import { PostEmployerWorkDTO } from '@/data/dtos/EmployerProfileCreationDTOs';
import {
  setDisclosures,
  initialState,
} from '@/lib/features/profileCreation/employerSlice';
import _ from 'lodash';
import { devLog } from '@/app/lib/utils';

const formNamePrefix = 'profile-creation-company-';

export default function CreateEmployerCompanyInfoDisclosurePage() {
  const disclosuresStoreData = useSelector(
    (state: RootState) => state.employer.disclosures,
  );
  const [disclosuresData, setDisclosuresData] = useState<PostEmployerWorkDTO>({
    ...disclosuresStoreData,
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const { data: session, update, status } = useSession();
  const updateSessionProperties = useUpdateSession();

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

  const [companyName, setCompanyName] = useState<string>('');
  const [workAddress, setWorkAddress] =
    useState<CompanyAddressDropdownDTO | null>(null);

  useEffect(() => {
    const initializeFormFields = async () => {
      console.log('session', session);
      if (!session?.user?.companyId) return;
      if (status === 'authenticated') {
        if (_.isEqual(disclosuresStoreData, initialState.disclosures)) {
          const { id, companyId, employerId } = session.user;

          try {
            // NOTE: @Gary it seems you were using a different route than disclosures get? I'm leaving this the same here as I'm not too sure about creating a disclosures get route
            const response = await fetch(
              `/api/companies/name/get/${session.user.companyId}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            );

            if (!response.ok) {
              throw new Error(
                `Error: ${response.status} ${response.statusText}`,
              );
            } else {
              let { result } = await response.json();
              //   setCompanyName(result.company_name);
              // REVIEW: @Gary this section might not align correctly with the above /api/companies/name/get
              setDisclosuresData({
                ...disclosuresData,
                userId: id!,
                // companyId: result.companyId,
                currentJobTitle: result.currentJobTitle ?? '',
                linkedInUrl: result.linkedInUrl ?? '',
                workAddressId: result.workAddressId ?? '',
              });
            }
          } catch (error) {}
        } else {
          console.log('fetching from redux store');
        }
      }
    };
    initializeFormFields();
    devLog(disclosuresData);
  }, [session?.user?.id]);

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    const fieldName = name.substring(formNamePrefix.length);
    if (disclosuresData.hasOwnProperty(fieldName)) {
      disclosuresData[fieldName as keyof PostEmployerWorkDTO] = value;
      setDisclosuresData({ ...disclosuresData });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setOpen(true);
    }

    if (!session || !session.user) {
      console.error('User session is not available.');
      return;
    }
    setDisclosuresData({ ...disclosuresData });
    devLog('disclosuresData', disclosuresData);

    try {
      const response = await fetch(
        `/api/employers/account/disclosures/update/${session?.user?.employerId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(disclosuresData),
        },
      );

      if (response.ok) {
        const result = await response.json();
        dispatch(setDisclosures(disclosuresData));
        router.push('/create-profile/employer/congratulations');
      } else {
        const errorData = await response.json();
      }
    } catch (error) {}
  };

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
        <h1>Professional Info and Disclosures</h1>
        <p className="subtitle">* Indicates a required field</p>

        <SnackbarWithIcon
          open={open}
          onClose={handleClose}
          variant="alert"
          message={
            <div>
              <Typography variant="body1">Must agree to terms!</Typography>
              <Typography variant="body2">
                To finish creating your company profile, you must agree to the
                terms.
              </Typography>
            </div>
          }
        />

        <form onSubmit={handleSubmit}>
          <fieldset>
            <div className="profile-form-grid">
              {/* This field will be automated */}
              <InputTextWithLabel
                id="profile-creation-company-name"
                placeholder="Automated"
                onChange={handleFieldChange}
                value={companyName}
                disabled={!!companyName}
                required
              >
                Company Name
              </InputTextWithLabel>
              <h2>Last thing...</h2>
              <InputTextWithLabel
                id="profile-creation-company-currentJobTitle"
                placeholder="Job Title"
                onChange={handleFieldChange}
                value={disclosuresData.currentJobTitle}
                required
              >
                Job Title *
              </InputTextWithLabel>
              <SelectAutoload
                id="profile-creation-workAddressId"
                apiAutoloadRoute={`/api/companies/locations/get/${session?.user?.companyId}`}
                label="Work Address *"
                getOptionLabel={(option: CompanyAddressDropdownDTO) =>
                  `${option.city}, ${option.stateCode} ${option.zipCode}`
                }
                getOptionFromLabel={(
                  options: CompanyAddressDropdownDTO[],
                  label: string,
                ) => {
                  // Match based on the label (formatted) or a unique identifier like companyAddressId
                  // For simplicity, we map by `companyAddressId` or any unique identifier instead of label
                  const matchedOption = options.find(
                    (item) =>
                      `${item.city}, ${item.stateCode} ${item.zipCode}` ===
                      label,
                  );
                  return (
                    matchedOption || {
                      companyAddressId: '',
                      city: '',
                      stateCode: '',
                      zipCode: '',
                    }
                  );
                }}
                placeholder="Your work location"
                value={workAddress}
                onChange={(val) => setWorkAddress(val)}
                required
                loadingText="Retrieving work addresses..."
              />
              {/*<InputTextWithLabel*/}
              {/*  id="profile-creation-company-work-location"*/}
              {/*  placeholder="98362"*/}
              {/*  onChange={handleFieldChange}*/}
              {/*  value={getFieldValue(*/}
              {/*    fields,*/}
              {/*    'profile-creation-company-work-location',*/}
              {/*    '',*/}
              {/*  )}*/}
              {/*  required*/}
              {/*>*/}
              {/*  Work Location Zip Code **/}
              {/*</InputTextWithLabel>*/}
              <InputTextWithLabel
                id="profile-creation-company-linkedInUrl"
                placeholder="www.linkedin.com/username"
                onChange={handleFieldChange}
                value={disclosuresData.linkedInUrl}
                required
              >
                LinkedIn URL *
              </InputTextWithLabel>
            </div>
          </fieldset>

          <legend>
            <h2>Terms</h2>
          </legend>
          <Label className="block">
            <Checkbox
              name="profile-creation-disclosures-require-terms"
              checked={termsAccepted}
              onChange={(event) => setTermsAccepted(event.target.checked)}
            />{' '}
            By signing up you agree to our terms of use. *
          </Label>

          <div className="profile-form-progress-btn-group">
            <Button pill className="custom-outline-btn">
              Cancel
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
