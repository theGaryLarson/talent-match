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
  PostCompanyInfoDTO, ReadAddressDTO,
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
  const [yearFounded, setYearFounded] = useState<Dayjs | null>(
    companyData.yearFounded === '' ? null : dayjs(companyData.yearFounded),
  );
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const { data: session, update, status } = useSession(); // Use useSession hook to get session and status
  const updateSessionProperties = useUpdateSession(); // TODO: update session with companyId and isApproved value if company exists

  const [selectCompanyDropdownData, setSelectCompanyDropdownData] = useState<
    CompanyDropdownDTO | string
  >('');
  const [companyId, setCompanyId] = useState<string | null>(null); // State for companyId
  const [industry, setIndustry] = useState<IndustrySectorDropdownDTO | null>(
    null,
  );

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchCompanyData = async (companyId: string) => {
      try {
        const response = await fetch(`/api/employers/account/company-info/get/${companyId}`);

        if (!response.ok) {
          console.warn('Data fetching failed. Using initialized fields.');
          return; // Skip updating if fetching fails
        }

        const fetchedData: ReadCompanyInfoDTO = (await response.json()).result;
        devLog('fetchedData', fetchedData)
        const companyZips: PostAddressDTO[] = (fetchedData?.companyAddresses || [])
            .filter((addr): addr is ReadAddressDTO => addr?.zipCode !== undefined)  // Filter out addresses with undefined zipCode
            .map(addr => ({ zipCode: addr?.zipCode! }));
        devLog('companyZips', companyZips)
        const updatedCompanyData: PostCompanyInfoDTO = {
          userId: session?.user?.id!,
          employerId: session?.user?.employerId || undefined,
          companyId: fetchedData.companyId || undefined,
          industrySectorId: fetchedData.industrySectorId || undefined,
          industrySectorTitle: fetchedData.industrySectorTitle || undefined,
          companyName: fetchedData.companyName,
          companyAddresses: companyZips,
          logoUrl: fetchedData.logoUrl || undefined,
          aboutUs: fetchedData.aboutUs || undefined,
          companyEmail: fetchedData.companyEmail || '',
          yearFounded: fetchedData.yearFounded || '',
          websiteUrl: fetchedData.websiteUrl || undefined,
          videoUrl: fetchedData.videoUrl || undefined,
          phoneCountryCode: fetchedData.phoneCountryCode || undefined,
          companyPhone: fetchedData.companyPhone || undefined,
          mission: fetchedData.mission || undefined,
          vision: fetchedData.vision || undefined,
          size: fetchedData.employeeCount || '',
          estimatedAnnualHires: fetchedData.estimatedAnnualHires || ''
        };
        devLog('updatedCompanyData', updatedCompanyData);
        setCompanyData(prevState => ({
          ...prevState,
          ...updatedCompanyData
        }));
        devLog('setCompanyData', companyData)
        setYearFounded(fetchedData.yearFounded ? dayjs().year(parseInt(fetchedData.yearFounded)) : null);
        setSelectCompanyDropdownData({
          companyId: fetchedData.companyId,
          companyName: fetchedData.companyName,
          companyLogoUrl: fetchedData.logoUrl || undefined,
          industrySectorId: fetchedData.industrySectorId || undefined,
          companyWebsite: fetchedData.websiteUrl || '',
          yearFounded: fetchedData.yearFounded ? parseInt(fetchedData.yearFounded) : null,
          companyEmail: fetchedData.companyEmail || '',
          companyPhone: fetchedData.companyPhone || '',
          companySize: fetchedData.employeeCount || '',
          predictedHires: fetchedData.estimatedAnnualHires || '',
          approvedCompany: fetchedData.isApproved ?? false
        });

        setIndustry({
          industry_sector_id: fetchedData.industrySectorId || '',
          sector_title: fetchedData.industrySectorTitle || ''
        });

      } catch (error) {
        console.warn('Error fetching company data. Using initialized fields.');
      }
    };

    const initializeFormFields = () => {
      if (_.isEqual(companyStoreData, initialState.company)) {
        if (session?.user?.companyId) {
          devLog('session.user.companyId: ', session.user.companyId)
          fetchCompanyData(session.user.companyId);
        } else {
          setCompanyId(uuidv4());
        }
      } else {
        setCompanyData(companyStoreData);
        setYearFounded(companyData.yearFounded ? dayjs(companyData.yearFounded) : null);
        setLogoUrl(companyData.logoUrl ?? null);
      }
    };

    initializeFormFields();
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
    if (typeof selectCompanyDropdownData === 'object' && selectCompanyDropdownData !== null) {
      setSelectCompanyDropdownData({
        ...selectCompanyDropdownData,
        companyLogoUrl: url,
      });
    }

    setLogoUrl(url);
    updateSessionProperties( {
      ...session,
      image: url,
    })
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    devLog('yearFounded', yearFounded);  // Ensure that year_founded is correctly updated
    if (!session || !session.user) {
      console.error('User session is not available.');
      return;
    }

    const chosenCompanyData: PostCompanyInfoDTO = { ...companyData };
    // company exists in selection
    if (typeof selectCompanyDropdownData !== 'string') {
      chosenCompanyData.companyId = selectCompanyDropdownData.companyId;
      chosenCompanyData.companyName = selectCompanyDropdownData.companyName;
      //fix: added the rest of the values that are set from the company drop down object
      chosenCompanyData.logoUrl = selectCompanyDropdownData.companyLogoUrl;
      chosenCompanyData.industrySectorId = selectCompanyDropdownData.industrySectorId;
      chosenCompanyData.websiteUrl = selectCompanyDropdownData.companyWebsite;
      chosenCompanyData.companyEmail = selectCompanyDropdownData.companyEmail;
      chosenCompanyData.companyPhone = selectCompanyDropdownData.companyPhone;
      chosenCompanyData.yearFounded = selectCompanyDropdownData.yearFounded ? selectCompanyDropdownData.yearFounded.toString() : '';
      chosenCompanyData.size = selectCompanyDropdownData.companySize;
      chosenCompanyData.estimatedAnnualHires = selectCompanyDropdownData.predictedHires;
      devLog(chosenCompanyData)
    // company doesn't exist in selection
    } else {
      chosenCompanyData.companyId = companyId!; // newCompanyId is created for a new company
      chosenCompanyData.companyName = selectCompanyDropdownData; // string data type because company doesn't exist in db
    }

    chosenCompanyData.employerId = session?.user.employerId!;

    if (industry) {
      chosenCompanyData.industrySectorId = industry.industry_sector_id;
      chosenCompanyData.industrySectorTitle = industry.sector_title;
    }
    chosenCompanyData.yearFounded = yearFounded?.toISOString() ?? '';
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
            employerId: session.user.employerId,
            logoUrl: chosenCompanyData.logoUrl || companyData.logoUrl || logoUrl, // couldn't find why this isn't passed. Hack fix to ensure its set...

          }),
        },
      );

      if (response.ok) {
        dispatch(setCompany(chosenCompanyData));
        if (typeof selectCompanyDropdownData !== 'string') {
          await updateSessionProperties({
            companyId: companyId,
            companyIsApproved: selectCompanyDropdownData.approvedCompany,
          });
        } else {
          await updateSessionProperties({
            companyId: companyId,
            companyIsApproved: false,
          });
        }

        if (typeof selectCompanyDropdownData === 'object') {
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
              value={selectCompanyDropdownData ?? ''}
              onChange={(e, val) => {
                // Check if val is of type CompanyDropdownDTO by checking for a known property
                if (val !== null && typeof val === 'object' && 'companyId' in val) {
                  // Now we know val is of type CompanyDropdownDTO
                  devLog('CompanyDropdownDTO object:', val);
                  setYearFounded(val.yearFounded ? dayjs().year(val.yearFounded) : null);
                }

                // Always update the dropdown value
                setSelectCompanyDropdownData(val ?? '');
              }}
              searchPlaceholder="Company name"
              getOptionLabel={(option: CompanyDropdownDTO) =>
                option.companyName ?? ''
              }
            />

            {typeof selectCompanyDropdownData === 'string' &&
              selectCompanyDropdownData.trim() !== '' && (
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
                typeof selectCompanyDropdownData === 'object' &&
                selectCompanyDropdownData !== null &&
                selectCompanyDropdownData.companyLogoUrl
                  ? selectCompanyDropdownData.companyLogoUrl
                  : logoUrl ?? '' // fixme: use placeholder image for logo instead of empty string ''
              }
              disabled={typeof selectCompanyDropdownData === 'object'}
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
                  (typeof selectCompanyDropdownData === 'object'
                    ? selectCompanyDropdownData.companyWebsite
                    : companyData.websiteUrl) ?? ''
                }
                disabled={typeof selectCompanyDropdownData === 'object'}
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
                  (typeof selectCompanyDropdownData === 'object'
                    ? selectCompanyDropdownData.companyEmail
                    : companyData.companyEmail) ?? ''
                }
                disabled={typeof selectCompanyDropdownData === 'object'}
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
                  (typeof selectCompanyDropdownData === 'object'
                    ? selectCompanyDropdownData.companyPhone
                    : companyData.companyPhone) ?? ''
                }
                disabled={typeof selectCompanyDropdownData === 'object'}
                required
              >
                Company Phone Number *
              </InputTextWithLabel>
              <DatePicker
                label={'Year Founded *'}
                views={['year']}
                value={
                  typeof selectCompanyDropdownData === 'object' &&
                  selectCompanyDropdownData !== null &&
                  selectCompanyDropdownData.yearFounded
                    ? dayjs().year(selectCompanyDropdownData.yearFounded) // Convert to Dayjs object
                    : yearFounded
                }
                onChange={setYearFounded}
                className="year-picker"
                disabled={typeof selectCompanyDropdownData === 'object'}
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
                  (typeof selectCompanyDropdownData === 'object'
                    ? selectCompanyDropdownData.companySize
                    : companyData.size) ?? ''
                }
                disabled={typeof selectCompanyDropdownData === 'object'}
              >
                Company Size *
              </SelectOptionsWithLabel>
              <InputTextWithLabel
                id="profile-creation-company-estimatedAnnualHires"
                placeholder="100"
                onChange={handleFieldChange}
                value={
                  (typeof selectCompanyDropdownData === 'object'
                    ? selectCompanyDropdownData.predictedHires
                    : companyData.estimatedAnnualHires) ?? ''
                }
                required
                disabled={typeof selectCompanyDropdownData === 'object'}
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
