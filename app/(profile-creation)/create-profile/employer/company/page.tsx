'use client';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { RootState } from '@/lib/employerStore';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4
import { useSelector, useDispatch } from 'react-redux';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import AvatarUpload from '@/app/ui/components/AvatarUpload';
import { Button } from 'flowbite-react';
import { DatePicker } from '@mui/x-date-pickers';
import { Typography } from '@mui/material';
import SnackbarWithIcon from '@/app/ui/components/SnackbarWithIcon';
import dayjs, { Dayjs } from 'dayjs';
import TextFieldWithAutocomplete from '@/app/ui/components/mui/TextFieldWithAutocomplete';
import { CompanyDropdownDTO } from '@/data/dtos/CompanyDropdownDTO';
import SelectAutoload from '@/app/ui/components/mui/SelectAutoload';
import { IndustrySectorDropdownDTO } from '@/data/dtos/IndustrySectorDropdownDTO';
import { useSession } from 'next-auth/react';
import { useUpdateSession } from '@/app/lib/auth/useUpdateSession';
import { PostCompanyInfoDTO } from '@/data/dtos/EmployerProfileCreationDTOs';
import {
  setCompany,
  initialState,
} from '@/lib/features/profileCreation/employerSlice';
import _ from 'lodash';

const formNamePrefix = 'profile-creation-company-';

export default function CreateEmployerCompanyInfoPage() {
  const companyStoreData = useSelector(
    (state: RootState) => state.employer.company,
  );
  const [companyData, setCompanyData] = useState({ ...companyStoreData });
  const dispatch = useDispatch();
  const router = useRouter();
  const [year_founded, setYearFounded] = useState<Dayjs | null>(companyData.yearFounded === '' ? null : dayjs(companyData.yearFounded));
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const { data: session, update, status } = useSession(); // Use useSession hook to get session and status
  const updateSessionProperties = useUpdateSession();

  const [companyObject, setCompanyObject] = useState<
    CompanyDropdownDTO | string
  >('');
  const [companyId, setCompanyId] = useState<string | null>(null); // State for companyId
  const [employerId, setEmployerId] = useState<string>(uuidv4());
  const [industry, setIndustry] = useState<IndustrySectorDropdownDTO | null>(
    null,
  );

  useEffect(() => {
    const initializeFormFields = async () => {
      if (status === 'authenticated' && session?.user) {
        if (_.isEqual(companyStoreData, initialState.personal)) {
          const { id, firstName, lastName, email, image } = session.user;

          companyData.userId = id ?? '';
          console.log('fetching fresh');

          try {
            const response = await fetch(
              '/api/employers/account/personal-info/get/' + id,
            );

            if (!response.ok) {
              const errorData = await response.json();
              // dispatch(
              //   submitFormFailure(errorData.error || 'Failed to submit the form'),
              // );
            } else {
              let fetchedData: PostEmployerPersonalDTO = (await response.json()).result
                .loadIntroPage;
              console.log(firstName, lastName, email, image);
              console.log(fetchedData);
              companyData.birthDate = fetchedData.birthDate ?? '';
              companyData.email =
                fetchedData.email.length !== 0
                  ? fetchedData.email
                  : (email ?? '');
              companyData.firstName =
                typeof fetchedData.firstName === 'string' &&
                fetchedData.firstName?.length !== 0
                  ? fetchedData.firstName
                  : (firstName ?? '');
              companyData.lastName =
                typeof fetchedData.lastName === 'string' &&
                fetchedData.lastName?.length !== 0
                  ? fetchedData.lastName
                  : (lastName ?? '');
              companyData.phone = fetchedData.phone;
              companyData.phoneCountryCode = fetchedData.phoneCountryCode;
              companyData.photoUrl =
                typeof fetchedData.photoUrl === 'string' &&
                fetchedData.photoUrl?.length !== 0
                  ? fetchedData.photoUrl
                  : (image ?? '');

              setCompanyData({ ...companyData });
            }
          } catch (error) {
            // dispatch(submitFormFailure('Failed to submit the form'));
          }
        } else {
          console.log('fetching from redux store');
        }

        setBirthdate(
          typeof companyData.birthDate === 'string' &&
            companyData.birthDate.length !== 0
            ? dayjs(companyData.birthDate)
            : null,
        );
        setAvatarUrl(companyData.photoUrl ?? null);
      }
    };
    initializeFormFields();
    // if (typeof companyObject !== 'string' && companyObject) {
    //   // Company is an object, use existing companyId
    //   setCompanyId(companyObject.companyId);
    //   // Only run this if company is a valid object (not a string)
    //   dispatch(
    //     updateField({
    //       id: 'profile-creation-company-name',
    //       value: companyObject.companyName,
    //     }),
    //   );
    //   dispatch(
    //     updateField({
    //       id: 'profile-creation-company-size',
    //       value: companyObject.companySize as string,
    //     }),
    //   );
      setYearFounded(
        typeof companyData.yearFounded === 'string' &&
        companyData.yearFounded.length !== 0
        ? dayjs(companyData.yearFounded)
        : null,
      );
      setLogoUrl(companyData.logoUrl);
    // } else if (
    //   typeof companyObject === 'string' &&
    //   companyObject.trim() !== ''
    // ) {
    //   // If company is a string (new company), generate a new company ID
    //   const generatedId = uuidv4();
    //   setCompanyId(generatedId);
    // }
    // setEmployerId(uuidv4());
  }, [session]);

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const fieldName = name.substring(formNamePrefix.length);
    if (companyData.hasOwnProperty(fieldName)) {
      companyData[fieldName as keyof PostCompanyInfoDTO] = value;
      setCompanyData({ ...companyData });
    }
  };


  const handleImageUpload = (url: string) => {
    // Update the local state with the uploaded image URL
    setLogoUrl(url);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!session || !session.user) {
      console.error('User session is not available.');
      return;
    }


    companyData.yearFounded = year_founded?.toISOString() ?? '';
    companyData.logoUrl = logoUrl;
    dispatch(setCompany(companyData));


    try {
      const response = await fetch(
        '/api/employers/account/company-info/upsert',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(companyData),
        },
      );

      if (response.ok) {
        const result = await response.json();
        router.push('/create-profile/employer/about');
      } else {
        const errorData = await response.json();
      }
    } catch (error) {}
  };

  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(true);
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
        <ProgressBarFlat progress={(2 / 6) * 100} size="sm" />
        <p>Step 2/6</p>
        <h1>Company Info</h1>
        <p className="subtitle">* Indicates a required field</p>

        {/* TODO: Snackbar needs to be tied to autofill function, can be shown below */}
        {/* <Button onClick={handleClick}>Test Button Open Snackbar</Button> */}
        <SnackbarWithIcon
          open={open}
          onClose={handleClose}
          variant="success"
          message={
            <div>
              <Typography variant="body1">Autofill completed!</Typography>
              <Typography variant="body2">
                All changes have been saved.
              </Typography>
            </div>
          }
        />

        <form onSubmit={handleSubmit}>
          <div className="profile-form-grid md:grid-cols-2">
            <TextFieldWithAutocomplete
              apiSearchRoute="/api/companies/search/"
              fieldLabel="Company Name *"
              id="profile-creation-company-companyName"
              searchingText="Searching..."
              noResultsText="No companies found..."
              //REVIEW: value={companyData.companyName}?
              value={companyObject ?? ''}
              onChange={(e, val) => setCompanyObject(val ?? '')}
              searchPlaceholder="Company name"
              getOptionLabel={(option: CompanyDropdownDTO) =>
                option.companyName ?? ''
              }
            />

            {typeof companyObject === 'string' &&
              companyObject.trim() !== '' && (
                <SelectAutoload
                  id="profile-creation-company-industrySectorTitle"
                  apiAutoloadRoute="/api/employers/industry-sectors"
                  label="Industry Sector *"
                  getOptionLabel={(option: IndustrySectorDropdownDTO) =>
                    option.sector_title
                  }
                  getOptionFromLabel={(
                    options: IndustrySectorDropdownDTO[],
                    label: string,
                  ) =>
                    options.find((item) => item.sector_title === label) || {
                      industry_sector_id: '',
                      sector_title: '',
                    }
                  }
                  placeholder="Your company's industry sector"
                  //REVIEW: value={companyData.industrySectorTitle}?
                  value={industry}
                  onChange={(val) => setIndustry(val)}
                  required
                  loadingText="Retrieving industry sectors..."
                />
              )}
          </div>

          <fieldset>
            <legend>
              <h2>
                Logo <span className="subtitle-optional">(optional)</span>
              </h2>
            </legend>
            <AvatarUpload
              id="profile-creation-company-logoUrl"
              fileTypeText="File types: SVG, PNG, JPG, GIF, or WEBP"
              accept=".svg,.png,.jpg,.jpeg,.gif,.webp"
              maxSizeMB={5}
              userId={companyId!}
              onImageUpload={handleImageUpload}
              initialImageUrl={
                typeof companyObject === 'object' &&
                companyObject !== null &&
                companyObject.companyLogoUrl
                  ? companyObject.companyLogoUrl
                  : logoUrl ?? '' // fixme: use placeholder image for logo
              }
              disabled={typeof companyObject === 'object'}
            />
          </fieldset>
          <fieldset>
            <h2>Basic Info</h2>
            <div className="profile-form-grid tablet:grid-cols-2">
              <InputTextWithLabel
                id="profile-creation-company-websiteUrl"
                placeholder="www.company.com"
                onChange={handleFieldChange}
                value={companyData.websiteUrl}
                disabled={typeof companyObject === 'object'}
                required
              >
                Company Website *
              </InputTextWithLabel>
              <InputTextWithLabel
                type="email"
                id="profile-creation-company-companyEmail"
                placeholder="hello@company.com"
                onChange={handleFieldChange}
                value={companyData.companyEmail}
                disabled={typeof companyObject === 'object'}
                required
              >
                Company Email *
              </InputTextWithLabel>
              <InputTextWithLabel
                type="tel"
                id="profile-creation-company-companyPhone"
                onChange={handleFieldChange}
                placeholder="(555) 123-4567"
                value={companyData.companyPhone}
                disabled={typeof companyObject === 'object'}
                required
              >
                Company Phone Number *
              </InputTextWithLabel>
              <DatePicker
                label={'Year Founded *'}
                views={['year']}
                //TODO: UPDATE VALUE USING SET YEAR FOUNDED
                value={
                  typeof companyObject === 'object' &&
                  companyObject !== null &&
                  companyObject.yearFounded
                    ? dayjs().year(companyObject.yearFounded) // Convert to Dayjs object
                    : null
                }
                onChange={setYearFounded}
                className="year-picker"
                disabled={typeof companyObject === 'object'}
              />

              {/* <InputTextWithLabel id="profile-creation-company-size" placeholder="5,000+" onChange={handleFieldChange} value={fields.find(f => f.id === 'profile-creation-company-size')?.value || ''} required>Company Size *</InputTextWithLabel> */}
              {/* REVIEW: May swap to number input instead of dropdown with ranges */}
              <SelectOptionsWithLabel
                id="profile-creation-company-size"
                onChange={handleFieldChange}
                options={[
                  { label: '1-10', value: '1-10' },
                  { label: '11-50', value: '11-50' },
                  { label: '51-200', value: '51-200' },
                  { label: '201-500', value: '201-500' },
                  { label: '501-1000', value: '501-1000' },
                  { label: '1001-5000', value: '1001-5000' },
                  { label: '5000+', value: '5000+' },
                ]}
                placeholder="Please select"
                value={companyData.state ?? ''}
                disabled={typeof companyObject === 'object'}
              >
                Company Size *
              </SelectOptionsWithLabel>
              <InputTextWithLabel
                id="profile-creation-company-estimatedAnnualHires"
                placeholder="100"
                onChange={handleFieldChange}
                value={companyData.estimatedAnnualHires}
                required
                disabled={typeof companyObject === 'object'}
              >
                Predicted Annual Hire *
              </InputTextWithLabel>
            </div>
          </fieldset>

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
