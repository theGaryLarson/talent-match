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
  PostAddressDTO,
  PostCompanyInfoDTO,
  ReadCompanyInfoDTO,
} from '@/data/dtos/EmployerProfileCreationDTOs';
import {
  setCompany,
  initialState,
} from '@/lib/features/profileCreation/employerSlice';
import _ from 'lodash';
import {devLog} from "@/app/lib/utils";

const formNamePrefix = 'profile-creation-company-';

export default function CreateEmployerCompanyInfoPage() {
  const companyStoreData = useSelector(
    (state: RootState) => state.employer.company,
  );
  const [companyData, setCompanyData] = useState<PostCompanyInfoDTO>({
    ...companyStoreData,
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const [year_founded, setYearFounded] = useState<Dayjs | null>(
    companyData.yearFounded === '' ? null : dayjs(companyData.yearFounded),
  );
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const { data: session, update, status } = useSession(); // Use useSession hook to get session and status
  const updateSessionProperties = useUpdateSession(); // TODO: update session with companyId and isApproved value if company exists

  const [selectCompanyDropdown, setSelectCompanyDropdown] = useState<
    CompanyDropdownDTO | string
  >('');
  const [companyId, setCompanyId] = useState<string | null>(null); // State for companyId
  const [industry, setIndustry] = useState<IndustrySectorDropdownDTO | null>(
    null,
  );

  useEffect(() => {
    if (!session?.user?.id) return;
    const initializeFormFields = async () => {
      console.log(session);
      if (status === 'authenticated') {
        if (_.isEqual(companyStoreData, initialState.company)) {
          const { id, companyId, employerId } = session.user;

          console.log('fetching fresh');
          // if companyId exists on session.user fetch all the data
          if (companyId) {
            try {
              const response = await fetch(
                `/api/employers/account/company-info/get/${session.user.companyId}`,
              );

              if (!response.ok) {
                const errorData = await response.json();
                console.log('response', JSON.stringify(response, null, 2));
                // dispatch(
                //   submitFormFailure(errorData.error || 'Failed to submit the form'),
                // );
              } else {
                let fetchedData: ReadCompanyInfoDTO = (await response.json())
                  .result.loadIntroPage;
                console.log(fetchedData);
                // REVIEW: update session properties, to pass in company id which we currently are not getting, should go in handlesubmit so it will be updated on next load
                const companyZips: PostAddressDTO[] | null = fetchedData?.companyAddresses?.map ( addr => ({
                  zipCode: addr!.zipCode
                } )) || null
                // Set all normal input data here with fetched data
                setCompanyData({
                  ...companyData,
                  userId: session.user?.id!,
                  employerId: companyData.employerId = employerId ?? '',
                  companyId: companyData.companyId = fetchedData.companyId,
                  industrySectorId:  fetchedData.industrySectorId,
                  industrySectorTitle: fetchedData.industrySectorTitle,
                  companyName: fetchedData.companyName,
                  companyAddresses: companyZips ?? undefined,
                  logoUrl: fetchedData.logoUrl,
                  aboutUs: fetchedData.aboutUs,
                  companyEmail: fetchedData.companyEmail,
                  yearFounded: fetchedData.yearFounded ?? '',
                  websiteUrl: fetchedData.websiteUrl, //companyWebsite
                  videoUrl: fetchedData.videoUrl,
                  phoneCountryCode: fetchedData.phoneCountryCode,
                  companyPhone: fetchedData.companyPhone,
                  mission: fetchedData.mission,
                  vision: fetchedData.vision,
                  size: fetchedData.employeeCount ?? '', //companySize
                  estimatedAnnualHires:
                      fetchedData.estimatedAnnualHires ?? '', //predictedHires
                })

                setSelectCompanyDropdown({
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
                  companySize: fetchedData.employeeCount ?? '',
                  predictedHires: fetchedData.estimatedAnnualHires ?? '',
                  approvedCompany: fetchedData.isApproved ?? false,
                });
                setIndustry({
                  industry_sector_id: fetchedData.industrySectorId!,
                  sector_title: fetchedData.industrySectorTitle!,
                })
              }
            } catch (error) {
              // dispatch(submitFormFailure('Failed to submit the form'));
            }
          } else {
            // if company does not exist set the required fields
            setCompanyData({
              ...companyData,
              userId: session.user.id!,
              employerId: session.user.employerId!,
              companyId: undefined, // not set because it does not yet exist
            })

          }
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
    if (companyData.companyId) {
      // Company is an object, use existing companyId
      setCompanyId(companyData.companyId ?? null);
    } else {
      // If company is a string (new company), generate a new company ID
      const generatedId = uuidv4();
      setCompanyId(generatedId);
    }
    // REVIEW: Gary removed employerId/setEmployerId assuming not using anymore, but should still be reviewed with Gary
    // if (companyData.employerId !== '') {
    //   setEmployerId(companyData.employerId);
    // } else {
    //   setEmployerId(uuidv4());
    // }
  }, [session?.user.id]);

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const fieldName = name.substring(formNamePrefix.length);
    if (companyData.hasOwnProperty(fieldName)) {

      setCompanyData({ ...companyData,
        [fieldName]: value
      });
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

    const chosenCompanyData: PostCompanyInfoDTO = { ...companyData };
    if (typeof selectCompanyDropdown !== 'string') {
      chosenCompanyData.companyId = selectCompanyDropdown.companyId;
      chosenCompanyData.companyName = selectCompanyDropdown.companyName;
    } else {
      chosenCompanyData.companyId = companyId!;
      chosenCompanyData.companyName = selectCompanyDropdown; // string data type because company doesn't exist in db
    }

    chosenCompanyData.employerId = session?.user.employerId!;

    if (industry?.industry_sector_id) {
      chosenCompanyData.industrySectorId = industry.industry_sector_id;
      chosenCompanyData.industrySectorTitle = industry.sector_title;
    }
    chosenCompanyData.yearFounded = year_founded?.toISOString() ?? '';
    chosenCompanyData.logoUrl = logoUrl;

    try {
      console.log(chosenCompanyData);
      const response = await fetch(
        '/api/employers/account/company-info/upsert',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...chosenCompanyData,
            userId: session.user.id,
          }),
        },
      );

      if (response.ok) {
        dispatch(setCompany(chosenCompanyData));
        if (typeof selectCompanyDropdown !== 'string') {
          await updateSessionProperties({
            companyId: companyId,
            companyIsApproved: selectCompanyDropdown.approvedCompany,
          });
        } else {
          await updateSessionProperties({
            companyId: companyId,
            companyIsApproved: false,
          });
        }

        if (typeof selectCompanyDropdown === 'object') {
          router.push('/create-profile/employer/disclosures');
        } else {
          router.push('/create-profile/employer/about');
        }
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
              noResultsText="No company found..."
              value={selectCompanyDropdown ?? ''}
              onChange={(e, val) => setSelectCompanyDropdown(val ?? '')}
              searchPlaceholder="Company name"
              getOptionLabel={(option: CompanyDropdownDTO) =>
                option.companyName ?? ''
              }
            />

            {typeof selectCompanyDropdown === 'string' &&
              selectCompanyDropdown.trim() !== '' && (
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
                typeof selectCompanyDropdown === 'object' &&
                selectCompanyDropdown !== null &&
                selectCompanyDropdown.companyLogoUrl
                  ? selectCompanyDropdown.companyLogoUrl
                  : (logoUrl ?? '') // fixme: use placeholder image for logo
              }
              disabled={typeof selectCompanyDropdown === 'object'}
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
                  (typeof selectCompanyDropdown === 'object'
                    ? selectCompanyDropdown.companyWebsite
                    : companyData.websiteUrl) ?? ''
                }
                disabled={typeof selectCompanyDropdown === 'object'}
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
                  (typeof selectCompanyDropdown === 'object'
                    ? selectCompanyDropdown.companyEmail
                    : companyData.companyEmail) ?? ''
                }
                disabled={typeof selectCompanyDropdown === 'object'}
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
                  (typeof selectCompanyDropdown === 'object'
                    ? selectCompanyDropdown.companyPhone
                    : companyData.companyPhone) ?? ''
                }
                disabled={typeof selectCompanyDropdown === 'object'}
                required
              >
                Company Phone Number *
              </InputTextWithLabel>
              <DatePicker
                label={'Year Founded *'}
                views={['year']}
                value={
                  typeof selectCompanyDropdown === 'object' &&
                  selectCompanyDropdown !== null &&
                  selectCompanyDropdown.yearFounded
                    ? dayjs().year(selectCompanyDropdown.yearFounded) // Convert to Dayjs object
                    : year_founded
                }
                onChange={setYearFounded}
                className="year-picker"
                disabled={typeof selectCompanyDropdown === 'object'}
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
                  (typeof selectCompanyDropdown === 'object'
                    ? selectCompanyDropdown.companySize
                    : companyData.size) ?? ''
                }
                disabled={typeof selectCompanyDropdown === 'object'}
              >
                Company Size *
              </SelectOptionsWithLabel>
              <InputTextWithLabel
                id="profile-creation-company-estimatedAnnualHires"
                placeholder="100"
                onChange={handleFieldChange}
                value={
                  (typeof selectCompanyDropdown === 'object'
                    ? selectCompanyDropdown.predictedHires
                    : companyData.estimatedAnnualHires) ?? ''
                }
                required
                disabled={typeof selectCompanyDropdown === 'object'}
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
