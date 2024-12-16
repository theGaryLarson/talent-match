'use client';

import React, {
  ChangeEvent,
  FormEvent,
  SyntheticEvent,
  useEffect,
  useState,
  useRef,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { RootState } from '@/lib/employerStore';
import { useSelector, useDispatch } from 'react-redux';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';

import { Button, Progress } from 'flowbite-react';
import { Typography } from '@mui/material';
import SnackbarWithIcon from '@/app/ui/components/SnackbarWithIcon';
import SelectAutoload from '@/app/ui/components/mui/SelectAutoload';
import { useSession } from 'next-auth/react';
import { useUpdateSession } from '@/app/lib/auth/useUpdateSession';
import {
  PostAddressDTO,
  ReadAddressDTO,
  ReadCompanyInfoDTO,
  PostEmployerProfileDTO,
} from '@/data/dtos/EmployerProfileCreationDTOs';
import {
  setProfile,
  initialState,
} from '@/lib/features/profileCreation/employerSlice';
import {
  setPageDirty,
  setPageSaved,
} from '@/lib/features/profileCreation/saveSlice';
import _ from 'lodash';
import { devLog } from '@/app/lib/utils';
import CircularProgress from '@mui/material/CircularProgress';

import AvatarUpload from '@/app/ui/components/AvatarUpload';
import TextFieldWithAutocomplete from '@/app/ui/components/mui/TextFieldWithAutocomplete';
import { SelectAllRounded } from '@mui/icons-material';

const formNamePrefix = 'profile-creation-profile-';

export default function CreateEmployerProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: session, update, status } = useSession();
  const updateSessionProperties = useUpdateSession();
  const pathname = usePathname();

  // const [termsAccepted, setTermsAccepted] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

  const profileStoreData = useSelector(
    (state: RootState) => state.employer.profile,
  );

  const [profileData, setProfileData] = useState<PostEmployerProfileDTO>({
    ...profileStoreData,
  });

  const [selectCompanyDropdownData, setSelectCompanyDropdownData] = useState<
    ReadCompanyInfoDTO | string
  >(profileStoreData.companyId ? ({
    companyId: profileStoreData.companyId,
    companyName: profileStoreData.companyName,
    companyEmail: profileStoreData.companyEmail,
    yearFounded: profileStoreData.yearFounded,
    companyAddresses: profileStoreData.companyAddresses as ReadAddressDTO[],
  }) : (profileStoreData.companyName ?? ''));

  const [isCompanySelected, setIsCompanySelected] = useState<boolean>(Boolean(profileStoreData.companyId));

  const [workAddress, setWorkAddress] = useState<ReadAddressDTO>(profileStoreData.companyAddresses?.find(address => address.addressId === profileStoreData.workAddressId) as ReadAddressDTO ?? (profileStoreData.workAddressId ? ({
    addressId: profileStoreData.workAddressId,
    city: '',
    state: '',
    stateCode: '',
    zip: '',
    county: ''
  }) : null));

  useEffect(() => {
    const initializeFormFields = async () => {
      if (!session?.user) return;
      if (status === 'authenticated') {
        if (_.isEqual(profileStoreData, initialState.profile)) {

          devLog('fetching fresh from database');

          const {
            id,
            firstName,
            lastName,
            image,
          } = session.user;

          try {
            const response = await fetch(
              `/api/employers/account/professional-info/get/${id}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            );

            if (!response.ok) {
              setProfileData((prevState) => ({
                ...prevState,
                userId: id ?? '',
                firstName: firstName ?? '',
                lastName: lastName ?? '',
                photoUrl: image,
              }));
              throw new Error(
                `Error: ${response.status} ${response.statusText}`,
              );
            } else {
              let { result } = await response.json();

              setSelectCompanyDropdownData(result.companyId ? ({
                companyId: result.companyId,
                companyName: result.companyName,
                companyEmail: result.companyEmail,
                yearFounded: result.yearFounded,
              }) : (result.companyName ?? ''));

              setWorkAddress(result.companyAddress ? { ...result.companyAddress } : '');

              setIsCompanySelected(Boolean(result.companyId));

              setProfileData({
                ...profileData,
                userId: id!,

                //PERSONAL Section
                // birthDate: result.birthDate ?? '',
                // email: email!,
                firstName: firstName ?? '',
                lastName: lastName ?? '',
                // phone: result.phone,
                // phoneCountryCode: result.phoneCountryCode,
                photoUrl: image,

                // COMPANY Section

                companyId: result.companyId ?? undefined,
                companyName: result.companyName,
                currentJobTitle: result.currentJobTitle ?? '',
                linkedInUrl: result.linkedInUrl ?? '',
                workAddressId: result.companyAddress?.addressId ?? undefined,
              });
            }
          } catch (error) {}
        } else {
          devLog('fetching from redux store');
        }
      }
    };
    initializeFormFields();
    dispatch(setPageSaved('employer-profile'));
    devLog(profileData);
  }, [session?.user?.id, pathname]);

  const openSnackbar = () => {
    setOpen(true);
  };

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    devLog(name, value);
    dispatch(setPageDirty('employer-profile')); //FIXME: Review with Gage disclosures change to profile
    const fieldName = name.substring(formNamePrefix.length);

    let updatedValue: any = value; // Declare a flexible type for the updated value

    // Check for specific fields to parse or cast values appropriately
    if (fieldName === 'hasAgreedTerms') {
      updatedValue = value; // For checkboxes or boolean fields
    }

    if (profileData.hasOwnProperty(fieldName)) {
      setProfileData((prevState) => ({
        ...prevState,
        [fieldName]: updatedValue, // Assign the correctly parsed or casted value
      }));
    }
  };

  const handleAvatarUpload = (url: string) => {
    updateSessionProperties({
      image: url,
    })
      .then(() => {
        dispatch(setPageDirty('employer-profile')); //FIXME: Check with Gage if anything needed here to change personal to profile
        setProfileData((prevPersonalData) => ({
          ...prevPersonalData,
          photoUrl: url,
        }));
      })
      .catch((error) =>
        console.error('Failed to update session image:', error),
      );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!session || !session.user) {
      console.error('User session is not available.');
      return;
    }

    const updatedProfileData = {
      ...profileData,
      companyId: typeof selectCompanyDropdownData !== 'string' ? selectCompanyDropdownData.companyId : '',
      companyName: typeof selectCompanyDropdownData !== 'string' ? selectCompanyDropdownData.companyName : selectCompanyDropdownData,
      workAddressId: workAddress ? workAddress.addressId : undefined
    };
    setProfileData(updatedProfileData);

    try {
      const response = await fetch(`/api/employers/account/profile/upsert`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfileData),
      });

      if (response.ok) {
        const result = await response.json();
        dispatch(setPageSaved('employer-profile'));
        dispatch(setProfile(updatedProfileData));

        // Update session properties using the custom hook
        await updateSessionProperties({
          firstName: updatedProfileData.firstName,
          lastName: updatedProfileData.lastName,
          image: updatedProfileData.photoUrl,
        });

        devLog('profileData submit ok', updatedProfileData);
        router.push('/edit-profile/employer/congratulations');
      } else {
        const errorData = await response.json();
        devLog('profileData submit error', updatedProfileData);
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
        {/* <ProgressBarFlat progress={(3 / 3) * 100} size="sm" /> */}

        {/* <p>Step 3/3</p> */}
        <h1>Employer Profile</h1>
        <p className="subtitle">* Indicates a required field</p>

        <SnackbarWithIcon
          open={open}
          onClose={handleClose}
          variant="success"
          message={
            <div>
              <Typography variant="body1">Autofill completed!</Typography>
              <Typography variant="body2">
                Company info has been loaded.
              </Typography>
            </div>
          }
        />

        {/* REVIEW: 2nd Snackbar for terms */}
        {/* <SnackbarWithIcon
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
        /> */}

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              <h2>
                Your Photo <span className="subtitle-optional">(optional)</span>
              </h2>
            </legend>
            <AvatarUpload
              id="profile-creation-profile-photoUrl"
              fileTypeText="File types: SVG, PNG, JPG, GIF, or WEBP"
              accept=".svg,.png,.jpg,.jpeg,.gif,.webp"
              maxSizeMB={5}
              userId={session?.user.id!}
              onImageUpload={handleAvatarUpload}
              initialImageUrl={session?.user?.image!}
            />
          </fieldset>

          <fieldset>
            <div className="profile-form-grid tablet:grid-cols-2">
              <InputTextWithLabel
                id="profile-creation-profile-firstName"
                placeholder="First name"
                onChange={handleFieldChange}
                value={profileData.firstName}
                required
              >
                First Name *
              </InputTextWithLabel>
              <InputTextWithLabel
                id="profile-creation-profile-lastName"
                placeholder="Last name"
                onChange={handleFieldChange}
                value={profileData.lastName}
                required
              >
                Last Name *
              </InputTextWithLabel>
            </div>
          </fieldset>

          <fieldset>
            <div className="profile-form-grid md:grid-cols-2">
              <TextFieldWithAutocomplete
                apiSearchRoute="/api/companies/search/"
                fieldLabel="Company Name *"
                id="profile-creation-profile-companyName"
                className="text-field-autocomplete"
                searchingText="Searching..."
                noResultsText="No company found, existing company required. Please contact administrator."
                allowNewOption={false}
                value={
                  selectCompanyDropdownData ?? ''
                }
                onChange={(e, val) => {
                  setWorkAddress(null);
                  setProfileData(prevState => ({
                    ...prevState,
                    workAddressId: undefined
                  }));

                  const newDropdownData = typeof val === 'object' && val !== null ? { ...val } : '';
                  setSelectCompanyDropdownData(newDropdownData);

                  if (
                    newDropdownData &&
                    typeof newDropdownData === 'object' &&
                    newDropdownData.companyId
                  ) {
                    openSnackbar();
                    setIsCompanySelected(true);
                    setProfileData((prevState) => ({
                      ...prevState,
                      companyId: newDropdownData.companyId,
                      companyName: newDropdownData.companyName,
                      yearFounded: newDropdownData.yearFounded,
                      websiteUrl: newDropdownData.websiteUrl,
                    }));
                  } else {
                    setIsCompanySelected(false);
                  }
                }}
                searchPlaceholder="Company name"
                getOptionLabel={(option: ReadCompanyInfoDTO) =>
                  option.companyName ?? ''
                }
              />
            </div>
          </fieldset>

          <fieldset>
            <div className="profile-form-grid">
              {/* This field will be automated */}
              {/* <InputTextWithLabel
                id="profile-creation-profile-name"
                placeholder="Automated"
                value={profileStoreData.companyName}
                disabled={!!profileStoreData.companyName}
                required
              >
                Company Name
              </InputTextWithLabel> */}
              <InputTextWithLabel
                id={`${formNamePrefix}currentJobTitle`}
                placeholder="Job Title"
                onChange={handleFieldChange}
                value={profileData.currentJobTitle}
                required
              >
                Job Title *
              </InputTextWithLabel>
              {isCompanySelected && (
                <div>
                  <SelectAutoload
                    id={`${formNamePrefix}workAddressId`}
                    className="select-autoload"
                    apiAutoloadRoute={`/api/companies/locations/get/${profileData.companyId}`}
                    label="Work Location *"
                    value={workAddress}
                    onChange={(val) => {
                      setWorkAddress(val);
                    }}
                    placeholder="Your work location"
                    loadingText="Retrieving work locations..."
                    getOptionLabel={(option: ReadAddressDTO) =>
                      `${option?.city}, ${option?.stateCode} ${option?.zip}`
                    }
                    getOptionId={(option: ReadAddressDTO) =>
                      option?.addressId!
                    }
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
                </div>
              )}

              <InputTextWithLabel
                id={`${formNamePrefix}linkedInUrl`}
                placeholder="www.linkedin.com/username"
                onChange={handleFieldChange}
                value={profileData.linkedInUrl}
                required
              >
                LinkedIn URL *
              </InputTextWithLabel>
            </div>
          </fieldset>
          {/*<legend>*/}
          {/*  <h2>Terms</h2>*/}
          {/*</legend>*/}
          {/*<Label className="block">*/}
          {/*  <Checkbox*/}
          {/*    name={`${formNamePrefix}hasAgreedTerms`}*/}
          {/*    checked={termsAccepted}*/}
          {/*    onChange={(event) => setTermsAccepted(event.target.checked)}*/}
          {/*  />{' '}*/}
          {/*  By signing up you agree to our terms of use. **/}
          {/*</Label>*/}

          <div className="profile-form-progress-btn-single-end">
            {/* <Button
              pill
              className="custom-outline-btn"
              onClick={() => router.push('/edit-profile/employer/company')}
            >
              Cancel
            </Button> */}
            <Button pill type="submit">
              Submit
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
