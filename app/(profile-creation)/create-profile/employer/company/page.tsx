'use client';

import React, {ChangeEvent, FormEvent, SyntheticEvent, useEffect, useMemo, useRef, useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import type { RootState } from '@/lib/employerStore';
import { v4 as uuidv4 } from 'uuid';
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
  const [selectedWorkLocation, setSelectedWorkLocation] = useState<PostAddressDTO>({
    city:'',
    state: '',
    stateCode: '',
    zip: '',
    county: '',
  } as PostAddressDTO);

  const pathname = usePathname();
  // using to track whether selectCompanyDropDownData is a string or object. In this way I can prevent Basic Info section
  // from resetting when retyping or correcting Company name.
  const prevSelectCompanyDropdownData = useRef<typeof selectCompanyDropdownData>();

  useEffect(() => {
    if (!session?.user?.id) return;
    devLog(session)
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
            .filter((addr): addr is ReadAddressDTO => addr?.zip !== undefined)  // Filter out addresses with undefined zipCode
            .map(addr => ({ city: addr?.city, stateCode: addr?.stateCode, zip: addr?.zip! }));
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
          companySize: fetchedData.employeeCount || '',
          estimatedAnnualHires: fetchedData.estimatedAnnualHires || ''
        };
        devLog('updatedCompanyData', updatedCompanyData);
        setCompanyData(prevState => ({
          ...prevState,
          ...updatedCompanyData,
        }));
        devLog('setCompanyData', companyData)
        setYearFounded(fetchedData.yearFounded ? dayjs().year(parseInt(fetchedData.yearFounded)) : null);
        setSelectCompanyDropdownData({
          companyId: fetchedData.companyId,
          companyName: fetchedData.companyName,
          logoUrl: fetchedData.logoUrl || undefined,
          industrySectorId: fetchedData.industrySectorId || undefined,
          websiteUrl: fetchedData.websiteUrl || '',
          yearFounded: fetchedData.yearFounded ? parseInt(fetchedData.yearFounded) : null,
          companyEmail: fetchedData.companyEmail || '',
          companyPhone: fetchedData.companyPhone || '',
          companySize: fetchedData.employeeCount || '',
          estimatedAnnualHires: fetchedData.estimatedAnnualHires || '',
          approvedCompany: fetchedData.isApproved ?? false,
          createdBy: fetchedData.createdBy
        });

        setIndustry({
          industry_sector_id: fetchedData.industrySectorId??'',
          sector_title: fetchedData.industrySectorTitle || ''
        });

      } catch (error) {
        console.warn('Error fetching company data. Using initialized fields.');
      }
    };

    const initializeFormFields = () => {
      // if no company data for the employer (companyStoreData contains redux store init values)
      if (_.isEqual(companyStoreData, initialState.company)) {
        if (session?.user?.companyId) {
          devLog('session.user.companyId: ', session.user.companyId)
          fetchCompanyData(session.user.companyId);
        } else {
          // No company data exists; generate a new companyId
          const newCompanyId = uuidv4();
          setCompanyId(newCompanyId);
          setCompanyData((prevState) => ({
            ...prevState,
            ...initialState.company,
            employerId: session.user.employerId!,
            companyId: newCompanyId,

          }));

        }

      } else { // redux store contains company data
        setCompanyData(companyStoreData);
        setYearFounded(companyData.yearFounded ? dayjs(companyData.yearFounded) : null);
        setLogoUrl(companyData.logoUrl ?? null);
      }
    };

    initializeFormFields();
  }, [session?.user.id, pathname]);

  useEffect(() => {
    if (
        typeof selectCompanyDropdownData === 'object' &&
        selectCompanyDropdownData !== null
    ) {
      // Company selected from dropdown
      const companyObj = selectCompanyDropdownData;
      setYearFounded(
          companyObj.yearFounded ? dayjs().year(companyObj.yearFounded) : null
      );
      setCompanyData({
        ...companyData,
        companyId: companyObj.companyId,
        companyName: companyObj.companyName,
        yearFounded: companyObj.yearFounded?.toString() || '',
        websiteUrl: companyObj.websiteUrl,
      });
      setIndustry({
        industry_sector_id: companyObj.industrySectorId ?? '',
        sector_title: '', // Not needed; only ID is required
      });
      setCompanyId(companyObj.companyId);
    } else {
      // selectCompanyDropdownData is a string (new company name)
      // Check if previous value was an object
      if (
          !companyData.companyId ||
          (typeof prevSelectCompanyDropdownData.current === 'object' &&
              prevSelectCompanyDropdownData.current !== null)
      ) {
        // Transitioned from object to string - reset inputs
        const newCompanyId = uuidv4();
        setCompanyData({
          ...initialState.company,
          companyId: newCompanyId,
          employerId: session?.user.employerId!,
          companyName: selectCompanyDropdownData as string,
        });
        setCompanyId(newCompanyId);
        setYearFounded(null);
        setIndustry({
          industry_sector_id: '',
          sector_title: '',
        });
      } else {
        // Continuing to type a new company name - update companyName only
        setCompanyData({
          ...companyData,
          companyName: selectCompanyDropdownData as string,
        });
      }
    }

    // Update the previous value
    prevSelectCompanyDropdownData.current = selectCompanyDropdownData;
  }, [selectCompanyDropdownData, pathname]);

  const handleFieldChange = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    console.log(name, value)
    const fieldName = name.substring(formNamePrefix.length);
    console.log(fieldName)
    if (companyData.hasOwnProperty(fieldName)) {
      setCompanyData(prevState => ({
        ...companyData,
        [fieldName]: value
      }));
    }

    // added for editing existing
    if (typeof selectCompanyDropdownData === 'object' && selectCompanyDropdownData?.hasOwnProperty(fieldName)) {
      setSelectCompanyDropdownData({
        ...selectCompanyDropdownData,
        [fieldName]: value
      });
    }
  };

  // Handle address selection from autocomplete
  // Handle address selection from autocomplete
  const handleAddressSelection = (
      e: SyntheticEvent<Element, Event>,
      val: string | ReadAddressDTO | null
  ) => {
    console.log('handleAddressSelection')
    if (val && typeof val === 'object' && 'zip' in val) {
      setSelectedWorkLocation((prevState) => ({
        ...prevState,
        zip: val.zip!,
      }));
      const selectedZipCode = val.zip; // Only extract the zipCode
      // Append the selected zipCode to companyAddresses if it's not already there
      setCompanyData((prevData) => {
        const alreadyExists = prevData.companyAddresses?.some(
            (location) => location.zip === selectedZipCode
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

  const handleImageUpload = (url: string) => {
    // Update companyData.logoUrl in all cases
    setCompanyData((prevState) => ({
      ...prevState,
      logoUrl: url,
    }));

    // If selectCompanyDropdownData is an object, update its logoUrl
    if (
        typeof selectCompanyDropdownData === 'object' &&
        selectCompanyDropdownData !== null
    ) {
      setSelectCompanyDropdownData({
        ...selectCompanyDropdownData,
        logoUrl: url,
      });
    }

    // Update logoUrl state
    setLogoUrl(url);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    devLog('yearFounded', yearFounded);  // Ensure that year_founded is correctly updated
    if (!session || !session.user) {
      console.error('User session is not available.');
      return;
    }

    const chosenCompanyData: PostCompanyInfoDTO = { ...companyData };

    chosenCompanyData.employerId = session?.user.employerId!;

    // company exists in selection
    if (typeof selectCompanyDropdownData !== 'string') {
      chosenCompanyData.employerId = session.user.employerId!;
      chosenCompanyData.companyId = selectCompanyDropdownData.companyId;
      chosenCompanyData.companyName = selectCompanyDropdownData.companyName;
      chosenCompanyData.industrySectorId = selectCompanyDropdownData.industrySectorId;
      chosenCompanyData.logoUrl = selectCompanyDropdownData.logoUrl;
      chosenCompanyData.websiteUrl = selectCompanyDropdownData.websiteUrl;
      chosenCompanyData.companyEmail = selectCompanyDropdownData.companyEmail;
      chosenCompanyData.companyPhone = selectCompanyDropdownData.companyPhone;
      chosenCompanyData.yearFounded = selectCompanyDropdownData.yearFounded ? selectCompanyDropdownData.yearFounded.toString() : '';
      chosenCompanyData.companySize = selectCompanyDropdownData.companySize;
      chosenCompanyData.estimatedAnnualHires = selectCompanyDropdownData.estimatedAnnualHires;
      devLog(chosenCompanyData)
      // new company: values stored in companyData from page inputs
    } else {
      chosenCompanyData.companyId = companyData.companyId; // newCompanyId is created for a new company
      chosenCompanyData.companyName = selectCompanyDropdownData; // string data type because company doesn't exist in db
      chosenCompanyData.industrySectorId = industry?.industry_sector_id
      chosenCompanyData.logoUrl = companyData.logoUrl;
      chosenCompanyData.websiteUrl = companyData.websiteUrl;
      chosenCompanyData.companyEmail = companyData.companyEmail;
      chosenCompanyData.companyPhone = companyData.companyPhone;
      // chosenCompanyData.yearFounded = yearFounded?.toString()!;
      // chosenCompanyData.companySize = companyData.companySize;
      chosenCompanyData.estimatedAnnualHires = companyData.estimatedAnnualHires;
    }

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
          // company selection from drop-down exists. use the dropdown object data
          await updateSessionProperties({
            companyId: selectCompanyDropdownData.companyId,
            companyIsApproved: selectCompanyDropdownData.approvedCompany,
          });
        } else {
          //company drop down selection doesn't exist. use generated companyId instead
          await updateSessionProperties({
            companyId: chosenCompanyData.companyId, // new uuidv4() generated above
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
                    // logic predominately handled in useEffect
                    // Always update the dropdown value whether an existing company (object) or new company (string)
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
                    selectCompanyDropdownData.logoUrl
                        ? selectCompanyDropdownData.logoUrl
                        : (logoUrl ?? '') // fixme: use placeholder image for logo instead of empty string ''
                  }
                  disabled={session?.user?.employeeIsApproved || session?.user?.employerId === (selectCompanyDropdownData as CompanyDropdownDTO ).createdBy}
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
                            ? selectCompanyDropdownData.websiteUrl
                            : companyData.websiteUrl) ?? ''
                    }
                    disabled={session?.user?.employeeIsApproved}
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
                    disabled={session?.user?.employeeIsApproved}
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
                    disabled={session?.user?.employeeIsApproved}
                    required
                >
                  Company Phone Number *
                </InputTextWithLabel>
                <DatePicker
                    label={'Year Founded *'}
                    views={['year']}
                    value={yearFounded}
                    onChange={(newValue) => {
                      setYearFounded(newValue);
                      setCompanyData({
                        ...companyData,
                        yearFounded: newValue?.year().toString() || '',
                      });
                    }}
                    className="year-picker"
                    disabled={session?.user?.employeeIsApproved}
                />

                {/* <InputTextWithLabel id="profile-creation-company-size" placeholder="5,000+" onChange={handleFieldChange} value={fields.find(f => f.id === 'profile-creation-company-size')?.value || ''} required>Company Size *</InputTextWithLabel> */}
                <SelectOptionsWithLabel
                    id="profile-creation-company-companySize"
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
                            : companyData.companySize) ?? ''
                    }
                    disabled={session?.user?.employeeIsApproved}
                >
                  Company Size *
                </SelectOptionsWithLabel>
                <InputTextWithLabel
                    id="profile-creation-company-estimatedAnnualHires"
                    name="profile-creation-company-estimatedAnnualHires"
                    placeholder="100"
                    onChange={handleFieldChange}
                    value={
                        (typeof selectCompanyDropdownData === 'object'
                            ? selectCompanyDropdownData.estimatedAnnualHires
                            : companyData.estimatedAnnualHires) || ''
                    }
                    
                    disabled={session?.user?.employeeIsApproved}
                >
                  Estimated Annual Hires *
                </InputTextWithLabel>
                <TextFieldWithAutocomplete
                    apiSearchRoute={`/api/postal-geo-data/zip/search/`} // Use generic search API
                    fieldLabel="Company Location*"
                    id="profile-creation-company-companyAddresses"
                    searchingText="Searching..."
                    noResultsText="No postal code found..."
                    value={selectedWorkLocation?.zip ?? ''} // Control the value via searchTerm, similar to selectCompanyDropdownData for company name
                    onChange={(e, val) => {
                      // Handle the selected address and set the searchTerm
                      devLog('val', val);
                      handleAddressSelection(e, val)
                    }}
                    searchPlaceholder="Company Location Postal Code"
                    getOptionLabel={(option: ReadAddressDTO) =>
                        `${option?.city}, ${option?.stateCode} ${option?.zip}`
                    }
                />
                {/* Display the selected addresses below */}
                <div className="selected-locations">
                  {companyData?.companyAddresses?.map((location, index) => (
                      <div key={index} className="location-tag">
                        {location?.city}, {location?.stateCode} {location?.zip}
                      </div>
                  ))}
                </div>
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
