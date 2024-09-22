'use client';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { RootState } from '@/lib/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  addField,
  updateField,
  submitForm,
  submitFormSuccess,
  submitFormFailure,
  FormState,
  FormField,
} from '@/lib/features/profileCreation/formSlice';
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
import { v4 as uuidv4 } from 'uuid';
import {getFieldValue} from "@/app/lib/utils";

export default function CreateEmployerCompanyInfoPage() {
  const { fields, isSubmitting, error }: FormState = useSelector(
    (state: RootState) => state.form,
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const [year_founded, setYearFounded] = useState<Dayjs | null>(dayjs(null));
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const { data: session, update, status } = useSession(); // Use useSession hook to get session and status
  const updateSessionProperties = useUpdateSession(); // TODO: update session with companyId and isApproved value if company exists

  const [companyObject, setCompanyObject] = useState<
    CompanyDropdownDTO | string
  >('');
  const [companyId, setCompanyId] = useState<string | null>(null); // State for companyId
  const [industry, setIndustry] = useState<IndustrySectorDropdownDTO | null>(
    null,
  );
  const [newFieldId, setNewFieldId] = useState('');
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState<
    'text' | 'email' | 'number' | 'select' | 'radio'
  >('text');
  const [newFieldValue, setNewFieldValue] = useState('');
  const [newFieldOptions, setNewFieldOptions] = useState<
    { value: string | number; label: string }[]
  >([]);

  useEffect(() => {
    if (typeof companyObject !== 'string' && companyObject) {
      // Company is an object, use existing companyId
      setCompanyId(companyObject.companyId);
      // Only run this if company is a valid object (not a string)
      dispatch(
        updateField({
          id: 'profile-creation-company-name',
          value: companyObject.companyName,
        }),
      );
      dispatch(
        updateField({
          id: 'profile-creation-company-website',
          value: companyObject.companyWebsite || '',
        }),
      );
      dispatch(
        updateField({
          id: 'profile-creation-company-email',
          value: companyObject.companyEmail || '',
        }),
      );
      dispatch(
        updateField({
          id: 'profile-creation-company-phone',
          value: companyObject.companyPhone || '',
        }),
      );
      dispatch(
        updateField({
          id: 'profile-creation-company-size',
          value: companyObject.companySize as string,
        }),
      );
      setYearFounded(
        companyObject.yearFounded
          ? dayjs().year(companyObject.yearFounded)
          : null,
      );
      setLogoUrl(companyObject.companyLogoUrl);
    } else {
      setCompanyId(uuidv4())
    }
  }, [companyObject, dispatch]);

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    const field = fields.find((field) => field.id === name);
    if (field) {
      const parsedValue = field.type === 'number' ? parseInt(value, 10) : value;
      dispatch(updateField({ id: field.id, value: parsedValue }));
    } else {
      dispatch(
        addField({
          id: e.target.id,
          label: newFieldLabel,
          value: e.target.value,
          type: newFieldType,
          options: newFieldOptions,
        }),
      );
    }
  };



  const handleImageUpload = (url: string) => {
    // Update the local state with the uploaded image URL
    setLogoUrl(url);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(submitForm());

    let formData: PostCompanyInfoDTO;

    if (typeof companyObject === 'object' && companyObject !== null) {
      // If companyObject is an object, access its properties
      formData = {
        userId: session?.user.id!,
        employerId: session?.user?.employerId || undefined, // new employer record created on backend if undefined
        companyId: companyObject?.companyId || undefined, // new company record created on backend if undefined
        industrySectorId:
          companyObject.industrySectorId ||
          (industry ? industry.industry_sector_id : null),
        industrySectorTitle: industry ? industry.sector_title : null,
        companyName: companyObject.companyName,
        logoUrl: companyObject.companyLogoUrl,
        companyEmail: companyObject.companyEmail || '',
        yearFounded: year_founded?.toISOString()!,
        websiteUrl: companyObject.companyWebsite || null,
        phoneCountryCode: 'United States +1',
        companyPhone: companyObject.companyPhone || null,
        size: companyObject.companySize || '',
        estimatedAnnualHires: companyObject.predictedHires || '',
        aboutUs: undefined,
        mission: undefined,
        vision: null,
        videoUrl: undefined,
        companyAddresses: [], // Provide an empty array or populate as needed
      };
      // update employer session if the company already exists
      await updateSessionProperties({
        companyId: companyId,
        companyIsApproved: companyObject.approvedCompany,
      });
    } else {
      // If companyObject is a string or not set, use alternate properties
      // and set the employer session data on the following page.
      formData = {
        userId: session?.user.id!,
        employerId: undefined, // TODO: fetch this on the following page with updateSessionProperties custom hook.
        companyId: companyId!, // TODO: fetch this on the following page with updateSessionProperties custom hook.
        industrySectorId: industry ? industry.industry_sector_id : null,
        industrySectorTitle: industry ? industry.sector_title : null,
        companyName: companyObject || '',
        logoUrl: logoUrl,
        companyEmail: getFieldValue<string>(
              fields,
          'profile-creation-company-email',
          '',
        ),
        yearFounded: year_founded?.toISOString()!,
        websiteUrl: getFieldValue(fields,'profile-creation-company-website', ''),
        phoneCountryCode: 'United States +1',
        companyPhone: getFieldValue(fields,'profile-creation-company-phone', ''),
        size: getFieldValue<string>(fields,'profile-creation-company-size', ''),
        estimatedAnnualHires: getFieldValue(fields,
          'profile-creation-company-annual-hire',
          '',
        ),
        aboutUs: undefined,
        mission: undefined,
        vision: null,
        videoUrl: undefined,
        companyAddresses: [], // Provide an empty array or populate as needed
      };
    }
    // update employer session if the company already exists
    await updateSessionProperties({
      companyId: companyId,
      companyIsApproved: typeof companyObject === 'object' ? companyObject.approvedCompany : false,
    });

    try {
      const response = await fetch(
        '/api/employers/account/company-info/upsert',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        dispatch(submitFormSuccess());
        if (typeof companyObject === 'object') {
          router.push('/create-profile/employer/disclosures');
        } else{
          router.push('/create-profile/employer/about');
        }
      } else {
        const errorData = await response.json();
        dispatch(
          submitFormFailure(errorData.error || 'Failed to submit the form'),
        );
      }
    } catch (error) {
      dispatch(submitFormFailure('Failed to submit the form'));
    }
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
              id="profile-creation-company-name"
              searchingText="Searching..."
              noResultsText="No company found..."
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
                  id="profile-creation-company-industry"
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
              id="profile-creation-company-logo-upload"
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
                id="profile-creation-company-website"
                placeholder="www.company.com"
                onChange={handleFieldChange}
                value={
                  typeof companyObject === 'object' && companyObject !== null
                    ? companyObject.companyWebsite || ''
                    : getFieldValue(fields,'profile-creation-company-website', '')
                }
                disabled={typeof companyObject === 'object'}
                required
              >
                Company Website *
              </InputTextWithLabel>
              <InputTextWithLabel
                type="email"
                id="profile-creation-company-email"
                placeholder="hello@company.com"
                onChange={handleFieldChange}
                value={
                  typeof companyObject === 'object' && companyObject !== null
                    ? companyObject.companyEmail || ''
                    : getFieldValue(fields,'profile-creation-company-email', '')
                }
                disabled={typeof companyObject === 'object'}
                required
              >
                Company Email *
              </InputTextWithLabel>
              <InputTextWithLabel
                type="tel"
                id="profile-creation-company-phone"
                onChange={handleFieldChange}
                placeholder="(555) 123-4567"
                value={
                  typeof companyObject === 'object' && companyObject !== null
                    ? companyObject.companyPhone || ''
                    : getFieldValue(fields,'profile-creation-company-phone', '')
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
                value={
                  typeof companyObject === 'object' &&
                  companyObject !== null &&
                  companyObject.companySize
                    ? companyObject.companySize
                    : getFieldValue(fields,'profile-creation-company-size', '')
                }
                disabled={typeof companyObject === 'object'}
              >
                Company Size *
              </SelectOptionsWithLabel>
              <InputTextWithLabel
                id="profile-creation-company-annual-hire"
                placeholder="100"
                onChange={handleFieldChange}
                value={
                  typeof companyObject === 'object' &&
                  companyObject !== null &&
                  companyObject.predictedHires
                    ? companyObject.predictedHires
                    : getFieldValue(fields,'profile-creation-company-annual-hire', '')
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
