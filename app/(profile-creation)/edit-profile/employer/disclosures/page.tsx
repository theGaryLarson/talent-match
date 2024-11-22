'use client';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { RootState } from '@/lib/employerStore';
import { useSelector, useDispatch } from 'react-redux';
import { EmployerState } from '@/lib/features/profileCreation/employerSlice';
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
import {
  PostEmployerWorkDTO,
  ReadAddressDTO,
} from '@/data/dtos/EmployerProfileCreationDTOs';
import {
  setDisclosures,
  initialState,
} from '@/lib/features/profileCreation/employerSlice';
import {
  setPageDirty,
  setPageSaved,
} from '@/lib/features/profileCreation/saveSlice';
import _ from 'lodash';
import { devLog } from '@/app/lib/utils';
import CircularProgress from '@mui/material/CircularProgress';

const formNamePrefix = 'profile-creation-disclosures-';

export default function CreateEmployerCompanyInfoDisclosurePage() {
  const disclosuresStoreData = useSelector(
    (state: RootState) => state.employer.disclosures,
  );
  const companyStoreData = useSelector(
    (state: RootState) => state.employer.company,
  );
  devLog(companyStoreData);
  const [disclosuresData, setDisclosuresData] = useState<PostEmployerWorkDTO>({
    ...disclosuresStoreData,
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const { data: session, update, status } = useSession();

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

  const [companyName, setCompanyName] = useState<string>('');
  const [workAddress, setWorkAddress] = useState<ReadAddressDTO>(null);
  const pathname = usePathname();

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
              setCompanyName(result.company_name);
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
    dispatch(setPageSaved('disclosures'));
    devLog(disclosuresData);
  }, [session?.user?.id, pathname]);

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    devLog(name, value);
    dispatch(setPageDirty('disclosures'));
    const fieldName = name.substring(formNamePrefix.length);

    let updatedValue: any = value; // Declare a flexible type for the updated value

    // Check for specific fields to parse or cast values appropriately
    if (fieldName === 'hasAgreedTerms') {
      updatedValue = value; // For checkboxes or boolean fields
    }

    if (disclosuresData.hasOwnProperty(fieldName)) {
      setDisclosuresData((prevState) => ({
        ...prevState,
        [fieldName]: updatedValue, // Assign the correctly parsed or casted value
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!session || !session.user) {
      console.error('User session is not available.');
      return;
    }

    // setDisclosuresData( prevState => ({
    //   ...prevState,
    //   hasAgreedTerms: termsAccepted,
    // }));

    devLog('disclosuresData', disclosuresData);

    if (!termsAccepted) {
      setOpen(true);
    } else {
      try {
        const response = await fetch(
          `/api/employers/account/disclosures/update/${session?.user?.employerId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...disclosuresData,
              hasAgreedTerms: termsAccepted,
            }),
          },
        );

        if (response.ok) {
          const result = await response.json();
          dispatch(setPageSaved('disclosures'));
          dispatch(setDisclosures(disclosuresData));
          router.push('/edit-profile/employer/congratulations');
        } else {
          const errorData = await response.json();
        }
      } catch (error) {}
    }
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
        <ProgressBarFlat progress={(3 / 3) * 100} size="sm" />

        <p>Step 3/3</p>
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
                value={companyStoreData.companyName}
                disabled={!!companyStoreData.companyName}
                required
              >
                Company Name
              </InputTextWithLabel>
              <h2>Last thing...</h2>
              <InputTextWithLabel
                id={`${formNamePrefix}currentJobTitle`}
                placeholder="Job Title"
                onChange={handleFieldChange}
                value={disclosuresData.currentJobTitle}
                required
              >
                Job Title *
              </InputTextWithLabel>
              <div>
                {status === 'loading' ? (
                  <CircularProgress /> // Show a loader until the session is loaded
                ) : (
                  <SelectAutoload
                    id={`${formNamePrefix}workAddressId`}
                    className="select-autoload"
                    apiAutoloadRoute={`/api/companies/locations/get/${session?.user?.companyId}`}
                    label="Work Location *"
                    value={workAddress}
                    onChange={(val) => {
                      setWorkAddress(val);
                      setDisclosuresData((prevState) => ({
                        ...prevState,
                        workAddressId: val?.addressId!,
                      }));
                    }}
                    placeholder="Your work location"
                    loadingText="Retrieving work locations..."
                    getOptionLabel={(option: ReadAddressDTO) =>
                      `${option?.city}, ${option?.stateCode} ${option?.zip}`
                    }
                    getOptionId={(option: ReadAddressDTO) => option?.addressId!}
                    getOptionFromId={(
                      options: ReadAddressDTO[],
                      id: string,
                    ) => {
                      return (
                        options.find((item) => item?.addressId === id) || null
                      );
                    }}
                    required
                  />
                )}
              </div>
              <InputTextWithLabel
                id={`${formNamePrefix}linkedInUrl`}
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
              name={`${formNamePrefix}hasAgreedTerms`}
              checked={termsAccepted}
              onChange={(event) => setTermsAccepted(event.target.checked)}
            />{' '}
            By signing up you agree to our terms of use. *
          </Label>

          <div className="profile-form-progress-btn-group">
            <Button
              pill
              className="custom-outline-btn"
              onClick={() => router.push('/edit-profile/employer/company')}
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
