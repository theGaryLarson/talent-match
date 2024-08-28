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
import TextareaWithLabel from '@/app/ui/components/TextareaWithLabel';
import { Label } from "flowbite-react";
import { Checkbox } from '@mui/material';

export default function CreateJobseekerProfileIntroPage(){
  const { fields, isSubmitting, error } : FormState = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  const router = useRouter();
  const [termsAccepted, setTermsAccepted] = useState(false);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(submitForm());


    // TODO: get email from oauth and check db for existing user with that email. If they exist load the data into the form.
    //  Store userId and relevant IDs in auth session storage using ReadUserInfoDTO as a ref
    const formData = {
         //TODO: assign existing userId if exists if not create new with uuidv4().
          userId: '87E52D83-CC98-46AF-B62A-58124ABEBBDC',

          job_title: fields.find(f => f.id === 'profile-creation-company-job-title')?.value || null,
          linkedin_url: fields.find(f => f.id === 'profile-creation-company-linkedin')?.value || null,
          
          // NOTE: These may not be in the DTO? work-location the correct endpoint?
          company_name: fields.find(f => f.id === 'profile-creation-company-name')?.value || null,
          work_location: fields.find(f => f.id === 'profile-creation-company-work-location')?.value || null,
          hasReadTerms: termsAccepted,
      };

      try {
          const response = await fetch('/api/employers/account/work-location/upsert', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });

          if (response.ok) {
              const result = await response.json();
              dispatch(submitFormSuccess());
              router.push('/create-profile/employer/congratulations');
          } else {
              const errorData = await response.json();
              dispatch(submitFormFailure(errorData.error || 'Failed to submit the form'));
          }
      } catch (error) {
          dispatch(submitFormFailure('Failed to submit the form'));
      }
  };

  return(
    <main className="flex justify-center">
      <aside className="profile-form-aside">
      </aside>
      <section className="profile-form-section">
        <ProgressBarFlat progress={6/6 * 100} size="sm"/>


        <p>Step 6/6</p>
        <h1>Professional Info and Disclosures</h1>
        <p className='subtitle'>* Indicates a required field</p>

        <form onSubmit={handleSubmit}>

        <fieldset>
        <div className="profile-form-grid">
          <InputTextWithLabel id="profile-creation-company-name" placeholder="Microsoft" onChange={handleFieldChange} value={fields.find(f => f.id === 'profile-creation-company-name')?.value || ''} required>Company Name</InputTextWithLabel>
          <h2>Last thing...</h2>
          <InputTextWithLabel id="profile-creation-company-job-title" placeholder="Job Title" onChange={handleFieldChange} value={fields.find(f => f.id === 'profile-creation-company-job-title')?.value || ''} required>Job Title *</InputTextWithLabel>
          <InputTextWithLabel id="profile-creation-company-work-location" placeholder="Work Location" onChange={handleFieldChange} value={fields.find(f => f.id === 'profile-creation-company-work-location')?.value || ''} required>Work Location *</InputTextWithLabel>
          <InputTextWithLabel id="profile-creation-company-linkedin" placeholder="www.linkedin.com/username" onChange={handleFieldChange} value={fields.find(f => f.id === 'profile-creation-company-linkedin')?.value || ''} required>LinkedIn URL *</InputTextWithLabel>
        </div>
        </fieldset>

        <legend>
          <h2>Terms</h2>
        </legend>
          <Label className="block">
            <Checkbox
                name="profile-creation-disclosures-require-terms"
                checked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.target.checked)}
                required
            /> Yes, I have read and consent to the terms and conditions*
          </Label>
          
          <div className="profile-form-progress-btn-group">
            <Button pill className="custom-outline-btn">Cancel</Button>
            <Button pill type="submit">Save and continue</Button>
          </div>
        </form>
      </section>
    </main>
  );
}