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
import {
  PostCompanyInfoDTO,
  ReadCompanyInfoDTO,
} from '@/data/dtos/EmployerProfileCreationDTOs';
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
  const [year_founded, setYearFounded] = useState<Dayjs | null>(
    companyData.yearFounded === '' ? null : dayjs(companyData.yearFounded),
  );
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
      console.log(session);
      if (status === 'authenticated' && session?.user) {
        if (_.isEqual(companyStoreData, initialState.company)) {
          const { id, companyId, employerId } = session.user;

          console.log('fetching fresh');
          if (companyId) {
            try {
              const response = await fetch(
                '/api/employers/account/company-info/get/' + companyId,
              );

              if (!response.ok) {
                const errorData = await response.json();
                // dispatch(
                //   submitFormFailure(errorData.error || 'Failed to submit the form'),
                // );
              } else {
                let fetchedData: ReadCompanyInfoDTO = (await response.json())
                  .result.loadIntroPage;
                console.log(fetchedData);
                // REVIEW: update session properties, to pass in company id which we currently are not getting, should go in handlesubmit so it will be updated on next load

                // Set all normal input data here with fetched data
                companyData.userId = id ?? '';
                companyData.employerId = employerId ?? '';
                companyData.companyId = fetchedData.companyId; //
                companyData.industrySectorId = fetchedData.industrySectorId; //
                companyData.industrySectorTitle =
                  fetchedData.industrySectorTitle;
                companyData.companyName = fetchedData.companyName; //
                // companyData.companyAddresses = fetchedData.companyAddresses;
                companyData.logoUrl = fetchedData.logoUrl; //
                companyData.aboutUs = fetchedData.aboutUs;
                companyData.companyEmail = fetchedData.companyEmail; //
                companyData.yearFounded = fetchedData.yearFounded ?? ''; //
                companyData.websiteUrl = fetchedData.websiteUrl; //companyWebsite
                companyData.videoUrl = fetchedData.videoUrl;
                companyData.phoneCountryCode = fetchedData.phoneCountryCode;
                companyData.companyPhone = fetchedData.companyPhone;
                companyData.mission = fetchedData.mission;
                companyData.vision = fetchedData.vision;
                companyData.size = fetchedData.employeeCount; //companySize
                companyData.estimatedAnnualHires =
                  fetchedData.estimatedAnnualHires; //predictedHires
                setCompanyObject({
                  companyId: fetchedData.companyId,
                  companyName: fetchedData.companyName,
                  companyLogoUrl: fetchedData.logoUrl ?? '',
                  industrySectorId: fetchedData.industrySectorId ?? '',
                  companyWebsite: fetchedData.websiteUrl ?? '',
                  companyEmail: fetchedData.companyEmail,
                  companyPhone: fetchedData.companyPhone ?? '',
                  yearFounded:
                    fetchedData.yearFounded?.length !== 0
                      ? parseInt(fetchedData.yearFounded)
                      : null,
                  companySize: fetchedData.employeeCount,
                  predictedHires: fetchedData.estimatedAnnualHires,
                });
              }
            } catch (error) {
              // dispatch(submitFormFailure('Failed to submit the form'));
            }
          } else {
            companyData.userId = id ?? '';
            companyData.employerId = employerId ?? '';
            companyData.companyId = companyId ?? '';
          }
          setCompanyData({ ...companyData });
        } else {
          console.log('fetching from redux store');
        }

        // Manually set input data here
        setYearFounded(
          typeof companyData.yearFounded === 'string' &&
            companyData.yearFounded.length !== 0
            ? dayjs(companyData.yearFounded)
            : null,
        );
        setLogoUrl(companyData.logoUrl ?? null);
      }
    };
    initializeFormFields();

    // REVIEW: This portion uses companyObject (companyDropdownDTO), if company exists/selected from dropdown below fields
    // yearfounded, logourl, companyname, companysize
    // TODO: lines 139-150 need to be reviewed and refactored, left off here
    if (companyData.companyId !== '') {
      // Company is an object, use existing companyId
      setCompanyId(companyData.companyId);
    } else {
      // If company is a string (new company), generate a new company ID
      const generatedId = uuidv4();
      setCompanyId(generatedId);
    }

    if (companyData.employerId !== '') {
      setEmployerId(companyData.employerId);
    } else {
      setEmployerId(uuidv4());
    }
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

    if (typeof companyObject !== 'string') {
      companyData.companyId = companyObject.companyId;
      companyData.companyName = companyObject.companyName;
    } else {
      companyData.companyId = companyId!;
      companyData.companyName = companyObject;
    }

    // companyData.companyId = companyId!;
    companyData.employerId = employerId!;
    if (industry) {
      companyData.industrySectorId = industry.industry_sector_id;
      companyData.industrySectorTitle = industry.sector_title;
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
                  : (logoUrl ?? '') // fixme: use placeholder image for logo
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
                value={
                  (typeof companyObject === 'object'
                    ? companyObject.companyWebsite
                    : companyData.websiteUrl) ?? ''
                }
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
                value={
                  (typeof companyObject === 'object'
                    ? companyObject.companyEmail
                    : companyData.companyEmail) ?? ''
                }
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
                value={
                  (typeof companyObject === 'object'
                    ? companyObject.companyPhone
                    : companyData.companyPhone) ?? ''
                }
                disabled={typeof companyObject === 'object'}
                required
              >
                Company Phone Number *
              </InputTextWithLabel>
              <DatePicker
                label={'Year Founded *'}
                views={['year']}
                value={
                  typeof companyObject === 'object' &&
                  companyObject !== null &&
                  companyObject.yearFounded
                    ? dayjs().year(companyObject.yearFounded) // Convert to Dayjs object
                    : year_founded
                }
                onChange={setYearFounded}
                className="year-picker"
                disabled={typeof companyObject === 'object'}
              />

              {/* <InputTextWithLabel id="profile-creation-company-size" placeholder="5,000+" onChange={handleFieldChange} value={fields.find(f => f.id === 'profile-creation-company-size')?.value || ''} required>Company Size *</InputTextWithLabel> */}
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
                value={
                  (typeof companyObject === 'object'
                    ? companyObject.companySize
                    : companyData.size) ?? ''
                }
                disabled={typeof companyObject === 'object'}
              >
                Company Size *
              </SelectOptionsWithLabel>
              <InputTextWithLabel
                id="profile-creation-company-estimatedAnnualHires"
                placeholder="100"
                onChange={handleFieldChange}
                value={
                  (typeof companyObject === 'object'
                    ? companyObject.predictedHires
                    : companyData.estimatedAnnualHires) ?? ''
                }
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
