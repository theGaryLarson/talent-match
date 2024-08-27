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

export default function CreateJobseekerProfileIntroPage(){
  const { fields, isSubmitting, error } : FormState = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  const router = useRouter();

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
          
          about_us: fields.find(f => f.id === 'profile-creation-company-about')?.value || null,
          // company_video_url: // on video page
          // company_mission: // on mission page
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
              router.push('/create-profile/jobseeker/education');
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
        <ProgressBarFlat progress={3/6 * 100} size="sm"/>
        <p>Step 3/6</p>
        <h1>About Us</h1>
        <p className='subtitle'>* Indicates a required field</p>

        <form onSubmit={handleSubmit}>
        Tell us about your company *
        <div className="profile-form-grid md:grid-cols-2">

        <fieldset>
          <TextareaWithLabel
              id="profile-creation-company-about"
              placeholder="At Microsoft we are dedicated to advancing human and organizational achievement."
              rows="16"
              required
              value={fields.find(f => f.id === 'profile-creation-company-about')?.value || ''}
              >
              {/* Tell us about your company * */}
            </TextareaWithLabel>
        </fieldset>
        </div>
          
          <div className="profile-form-progress-btn-group">
            <Button pill className="custom-outline-btn">Cancel</Button>
            <Button pill type="submit">Save and continue</Button>
          </div>
        </form>
      </section>
    </main>
  );
}