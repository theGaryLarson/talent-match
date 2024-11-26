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
  // PostEmployerWorkDTO,
  PostAddressDTO,
  ReadAddressDTO,
  ReadCompanyInfoDTO, //for company dropdown
  PostProfileDTO,
  ReadProfileDTO,
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

const formNamePrefix = 'profile-creation-profile-';

export default function CreateEmployerProfilePage() {
  const profileStoreData = useSelector(
    (state: RootState) => state.employer.profile,
  );
  devLog(profileStoreData);
  const [profileData, setProfileData] = useState<PostProfileDTO>({
    ...profileStoreData,
  });

  // NOTE: rename ref then remove this
  const [companyData, setCompanyData] = useState<PostProfileDTO>({
    ...profileStoreData,
  });

  // REVIEW: removing this?
  const [selectCompanyDropdownData, setSelectCompanyDropdownData] = useState<
    ReadCompanyInfoDTO | string
  >('');
  // const [industry, setIndustry] = useState<IndustrySectorDropdownDTO | null>(
  //   null,
  // );
  const [selectedWorkLocation, setSelectedWorkLocation] =
    useState<PostAddressDTO>({
      city: '',
      state: '',
      stateCode: '',
      zip: '',
      county: '',
    } as PostAddressDTO);

  // using to track whether selectCompanyDropDownData is a string or object. In this way I can prevent Basic Info section
  // from resetting when retyping or correcting Company name.
  const prevSelectCompanyDropdownData =
    useRef<typeof selectCompanyDropdownData>();

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const { data: session, update, status } = useSession();
  const updateSessionProperties = useUpdateSession();
  const pathname = usePathname();

  // const [termsAccepted, setTermsAccepted] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [isCompanySelected, setIsCompanySelected] = useState<boolean>(false);

  const openSnackbar = () => {
    setOpen(true);
  };

  const [companyName, setCompanyName] = useState<string>('');
  const [workAddress, setWorkAddress] = useState<ReadAddressDTO>(null);

  useEffect(() => {
    const initializeFormFields = async () => {
      if (!session?.user) return;
      if (status === 'authenticated') {
        if (_.isEqual(profileStoreData, initialState.profile)) {
          const {
            id,
            firstName,
            lastName,
            email,
            image,
            companyId,
            employerId,
          } = session.user;
          devLog('session user', session.user);

          try {
            const response = await fetch(
              `/api/companies/name/get/${profileStoreData.companyId}`,
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
              console.log('else response ok');
              let { result } = await response.json();
              setCompanyName(result.company_name);
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
    devLog(profileData);
  }, [session?.user?.id, pathname]);

  // used to manage changes on selectCompanyDropDownData depending on its type (object or string).
  useEffect(() => {
    console.log(
      'Updated selectCompanyDropdownData:',
      selectCompanyDropdownData,
    );
    if (
      selectCompanyDropdownData &&
      typeof selectCompanyDropdownData === 'object' &&
      selectCompanyDropdownData.companyId
    ) {
      openSnackbar();
      setIsCompanySelected(true);
      setProfileData((prevState) => ({
        ...prevState,
        companyId: selectCompanyDropdownData.companyId,
        companyName: selectCompanyDropdownData.companyName,
        yearFounded: selectCompanyDropdownData.yearFounded?.toString() || '',
        websiteUrl: selectCompanyDropdownData.websiteUrl,
      }));

      // setYearFounded(
      //   companyObj.yearFounded
      //     ? dayjs().year(parseInt(companyObj.yearFounded, 10))
      //     : null,
      // );

      // setIndustry({
      //   // do this inside of companyData object rather than separate state. First ensure companyDataObject has been transformed to a PostCompanyInfoDTO
      //   industry_sector_id: companyObj.industrySectorId ?? '',
      //   sector_title: '', // Not needed; only ID is required
      // });
    } else {
      console.log('false');
      setIsCompanySelected(false);
    }
  }, [selectCompanyDropdownData]);

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    devLog(name, value);
    dispatch(setPageDirty('disclosures')); //FIXME: Review with Gage disclosures change to profile
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

  // Handle address selection from autocomplete
  const handleAddressSelection = (
    e: SyntheticEvent<Element, Event>,
    val: string | ReadAddressDTO | null,
  ) => {
    dispatch(setPageDirty('company'));
    console.log('handleAddressSelection');
    if (val && typeof val === 'object' && 'zip' in val) {
      setSelectedWorkLocation((prevState) => ({
        ...prevState,
        zip: val.zip!,
      }));
      const selectedZipCode = val.zip; // Only extract the zipCode
      // Append the selected zipCode to companyAddresses if it's not already there
      setCompanyData((prevData) => {
        const alreadyExists = prevData.companyAddresses?.some(
          (location) => location.zip === selectedZipCode,
        );

        if (!alreadyExists) {
          const updatedAddresses = prevData.companyAddresses
            ? [...prevData.companyAddresses, val]
            : [val];

          return {
            ...prevData,
            companyAddresses: updatedAddresses,
          };
        }

        return prevData; // Return unchanged if already exists
      });
    }
  };

  const handleAvatarUpload = (url: string) => {
    updateSessionProperties({
      image: url,
    })
      .then(() => {
        dispatch(setPageDirty('personal')); //FIXME: Check with Gage if anything needed here to change personal to profile
        setAvatarUrl(url);
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

    // setProfileData( prevState => ({
    //   ...prevState,
    //   hasAgreedTerms: termsAccepted,
    // }));

    devLog('profileData', profileData);

    // setOpen(true);

    try {
      const response = await fetch(
        `/api/employers/account/disclosures/update/${session?.user?.employerId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...profileData,
          }),
        },
      );

      if (response.ok) {
        const result = await response.json();
        dispatch(setPageSaved('disclosures'));
        dispatch(setProfile(profileData));
        router.push('/edit-profile/employer/congratulations');
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
        {/* <ProgressBarFlat progress={(3 / 3) * 100} size="sm" /> */}

        {/* <p>Step 3/3</p> */}
        <h1>Employer Profile {profileStoreData.companyId}</h1>
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
                  selectCompanyDropdownData || companyData.companyName || ''
                }
                onChange={(e, val) => {
                  // logic predominately handled in useEffect
                  // Always update the dropdown value whether an existing company (object) or new company (string)
                  console.log('logging val', val);
                  setSelectCompanyDropdownData(
                    typeof val === 'object' && val !== null ? { ...val } : '',
                  );
                }}
                searchPlaceholder="Company name"
                getOptionLabel={(option: ReadCompanyInfoDTO) =>
                  option.companyName ?? ''
                }
              />
              {/* REVIEW: Removed industry sector below */}
              {/* {typeof selectCompanyDropdownData === 'string' &&
                selectCompanyDropdownData.trim() !== '' && (
                  <SelectAutoload
                    id="profile-creation-profile-industrySectorTitle"
                    apiAutoloadRoute="/api/employers/industry-sectors"
                    label="Industry Sector *"
                    className="select-autoload"
                    value={industry}
                    onChange={(val) => {
                      setIndustry(val);
                      setCompanyData({
                        ...companyData,
                        industrySectorId: val?.industry_sector_id!,
                        industrySectorTitle: val?.sector_title,
                      });
                    }}
                    placeholder="Your company's industry sector"
                    loadingText="Retrieving industry sectors..."
                    getOptionLabel={(option: IndustrySectorDropdownDTO) =>
                      option.sector_title
                    }
                    getOptionId={(option: IndustrySectorDropdownDTO) =>
                      option.industry_sector_id ?? ''
                    }
                    getOptionFromId={(
                      options: IndustrySectorDropdownDTO[],
                      id: string,
                    ) =>
                      options.find((item) => item.industry_sector_id === id) ||
                      null
                    }
                    required
                  />
                )} */}
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
                  {!isCompanySelected ? (
                    // status === 'loading' ? (
                    <CircularProgress /> // Show a loader until the session is loaded
                  ) : (
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
                  )}
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

          <div className="profile-form-progress-btn-group">
            <Button
              pill
              className="custom-outline-btn"
              onClick={() => router.push('/edit-profile/employer/company')}
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
