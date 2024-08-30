'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { RootState } from '@/lib/store';
import { useSelector, useDispatch } from 'react-redux';
import { addField, updateField, submitForm, submitFormSuccess, submitFormFailure, FormState } from '@/lib/features/profileCreation/formSlice';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import SelectWithLabel from '@/app/ui/components/mui/SelectWithLabel';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import InputFileDropzone from '@/app/ui/components/InputFileDropzone';
import AvatarUpload from '@/app/ui/components/AvatarUpload';
import { Button, Progress } from "flowbite-react";
import {formatPhoneE164} from "@/app/lib/utils";
import parsePhoneNumberFromString from "libphonenumber-js";
import { DatePicker, DateView } from '@mui/x-date-pickers';
import { Snackbar, SnackbarContent, Typography, IconButton } from '@mui/material';
import SnackbarWithIcon from '@/app/ui/components/SnackbarWithIcon';
import dayjs, { Dayjs } from 'dayjs';


export default function CreateJobseekerProfileIntroPage(){
  const { fields, isSubmitting, error } : FormState = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  const router = useRouter();
  const [year_founded, setYearFounded] = useState<Dayjs | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [gender, setGender] = useState('');
  const [race, setRace] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);



  const [newFieldId, setNewFieldId] = useState('');
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState<'text' | 'email' | 'number' | 'select' | 'radio'>('text');
  const [newFieldValue, setNewFieldValue] = useState('');
  const [newFieldOptions, setNewFieldOptions] = useState<{ value: string | number; label: string }[]>([]);
  
  const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    const field = fields.find((field) => field.id === name);
    if (field) {
      const parsedValue = field.type === 'number' ? parseInt(value, 10) : value;
      dispatch(updateField({ id: field.id, value: parsedValue }));
    } else {
      dispatch(addField({
        id: e.target.id,
        label: newFieldLabel,
        value: e.target.value,
        type: newFieldType,
        options: newFieldOptions,
    }));
    }
  };

  const handleAddField = () => {
    if (newFieldLabel) {
      dispatch(addField(
        { id: newFieldId, label: newFieldLabel, value: newFieldValue, type: newFieldType, options: newFieldType === 'select' || newFieldType === 'radio' ? newFieldOptions : undefined }));
      setNewFieldId('');
      setNewFieldLabel('');
      setNewFieldType('text');
      setNewFieldValue('');
      setNewFieldOptions([]);
    }
  };


    const handleImageUpload = (url: string) => {
        // Update the local state with the uploaded image URL
        setLogoUrl(url);
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(submitForm());


    const countryCode = fields.find(f => f.id === 'profile-creation-company-country-phone-code')?.value || null;
    const ph = fields.find(f => f.id === 'profile-creation-company-phone-number')?.value || null;
    const formattedPhone = formatPhoneE164(countryCode?.toString(), ph?.toString())

    // TODO: get email from oauth and check db for existing user with that email. If they exist load the data into the form.
    //  Store userId and relevant IDs in auth session storage using ReadUserInfoDTO as a ref
    const formData = {
         //TODO: assign existing userId if exists if not create new with uuidv4().
          userId: '87E52D83-CC98-46AF-B62A-58124ABEBBDC',
          
          // company_id: true,
          // industry_sector_id: true,
          industry_sector: fields.find(f => f.id === 'profile-creation-company-industry')?.value || null,
          company_name: fields.find(f => f.id === 'profile-creation-company-name')?.value || null,
          company_logo_url: logoUrl,
          // about_us: // on about page
          company_email: fields.find(f => f.id === 'profile-creation-company-email')?.value || '',
          year_founded: year_founded,
          company_website_url: fields.find(f => f.id === 'profile-creation-company-website')?.value || null,
          // company_video_url: // on video page
          compnay_phone: formattedPhone,
          // company_mission: // on mission page
          // company_vision: // REVIEW: MISSING?
          size: fields.find(f => f.id === 'profile-creation-company-size')?.value || '',
          estimated_annual_hires: fields.find(f => f.id === 'profile-creation-company-annual-hire')?.value || '',
          // is_approved: // REVIEW: MISSING?
          // company_addresses: // REVIEW: MISSING?
      };

      try {
          const response = await fetch('/api/employers/account/company-info/upsert', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });

          if (response.ok) {
              const result = await response.json();
              dispatch(submitFormSuccess());
              router.push('/create-profile/employer/about');
          } else {
              const errorData = await response.json();
              dispatch(submitFormFailure(errorData.error || 'Failed to submit the form'));
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
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return(
    <main className="flex justify-center">
      <aside className="profile-form-aside">
      </aside>
      <section className="profile-form-section">
        <ProgressBarFlat progress={2/6 * 100} size="sm"/>
        <p>Step 2/6</p>
        <h1>Company Info</h1>
        <p className='subtitle'>* Indicates a required field</p>
        
        {/* TODO: Snackbar needs to be tied to autofill function, can be shown below */}
        {/* <Button onClick={handleClick}>Test Button Open Snackbar</Button> */}
        <SnackbarWithIcon
          open={open}
          onClose={handleClose}
          variant="success"
          message={
            <div>
              <Typography variant="body1">
                Autofill completed!
              </Typography>
              <Typography variant="body2">
                All changes have been saved.
              </Typography>
            </div>
          }
        />

        <form onSubmit={handleSubmit}>
          <div className="profile-form-grid md:grid-cols-2">
          <SelectOptionsWithLabel
                id="profile-creation-company-name"
                onChange={handleFieldChange}
                options={[
                  {label:"Amazon", value:"Amazon"},
                  {label:"Google", value:"Google"},
                  {label:"Microsoft", value:"Microsoft"},
                ]}
                placeholder="Please select"
                value={fields.find(f => f.id === 'profile-creation-company-name')?.value}
              >
                Company Name *
            </SelectOptionsWithLabel>

            <SelectOptionsWithLabel
                id="profile-creation-company-industry"
                onChange={handleFieldChange}
                options={[
                  {label:"Finance", value:"Finance"},
                  {label:"Healthcare", value:"Healthcare"},
                  {label:"Technology", value:"Technology"},
                ]}
                placeholder="Please select"
                value={fields.find(f => f.id === 'profile-creation-company-industry')?.value}
              >
                Industry Sector *
            </SelectOptionsWithLabel>
          </div>
          
          <fieldset>
            <legend>
              <h2>Logo <span className="subtitle-optional">(optional)</span></h2>
            </legend>
            <AvatarUpload 
              id="profile-creation-company-logo-upload"
              fileTypeText="File types: SVG, PNG, JPG, GIF, or WEBP"
              accept=".svg,.png,.jpg,.jpeg,.gif,.webp"
              maxSizeMB={5}
              userId='99E52D83-CC98-46AF-B62A-58124ABEBBDC' // use companyId here
              onImageUpload={handleImageUpload}
            />
          </fieldset>
          <fieldset>
          <h2>Basic Info</h2>
          <div className="profile-form-grid tablet:grid-cols-2">
            <InputTextWithLabel id="profile-creation-company-website" placeholder="www.company.com" onChange={handleFieldChange} value={fields.find(f => f.id === 'profile-creation-company-website')?.value || ''} required>Company Website *</InputTextWithLabel>
            <InputTextWithLabel type="email" id="profile-creation-company-email" placeholder="hello@company.com" onChange={handleFieldChange} value={fields.find(f => f.id === 'profile-creation-company-email')?.value || ''} required>Company Email *</InputTextWithLabel>
            <InputTextWithLabel type="tel" id="profile-creation-company-phone" onChange={handleFieldChange} placeholder="(555) 123-4567" value={fields.find(f => f.id === 'profile-creation-company-phone')?.value || ''} required>Company Phone Number *</InputTextWithLabel>
            <DatePicker label={"Year Founded *"} views={['year']} onChange={setYearFounded} className="year-picker" />
          </div>

          <div className="profile-form-grid tablet:grid-cols-2">
            {/* <InputTextWithLabel id="profile-creation-company-size" placeholder="5,000+" onChange={handleFieldChange} value={fields.find(f => f.id === 'profile-creation-company-size')?.value || ''} required>Company Size *</InputTextWithLabel> */}
            <SelectOptionsWithLabel
                id="profile-creation-company-size"
                onChange={handleFieldChange}
                options={[
                  // {label:"1-10", value:"1-10"},
                  // {label:"11-50", value:"11-50"},
                  // {label:"51-200", value:"51-200"},
                  // {label:"201-500", value:"201-500"},
                  // {label:"501-1000", value:"501-1000"},
                  // {label:"1001-5000", value:"1001-5000"},
                  // {label:"5000+", value:"5000+"},
                ]}
                placeholder="Please select"
                value={fields.find(f => f.id === 'profile-creation-company-size')?.value}
              >
                Company Size *
            </SelectOptionsWithLabel>
            <InputTextWithLabel id="profile-creation-company-annual-hire" placeholder="100" onChange={handleFieldChange} value={fields.find(f => f.id === 'profile-creation-company-annual-hire')?.value || ''} required>Predicted Annual Hire *</InputTextWithLabel>
          </div>

          </fieldset>
          
          <div className="profile-form-progress-btn-group">
            <Button pill className="custom-outline-btn">Cancel</Button>
            <Button pill type="submit">Save and continue</Button>
          </div>
        </form>
      </section>
    </main>
  );
}