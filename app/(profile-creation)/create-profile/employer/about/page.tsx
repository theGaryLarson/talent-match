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
} from '@/lib/features/profileCreation/formSlice';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import SelectWithLabel from '@/app/ui/components/mui/SelectWithLabel';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import InputFileDropzone from '@/app/ui/components/InputFileDropzone';
import AvatarUpload from '@/app/ui/components/AvatarUpload';
import { Button, Progress } from 'flowbite-react';
import { formatPhoneE164 } from '@/app/lib/utils';
import parsePhoneNumberFromString from 'libphonenumber-js';
import TextareaWithLabel from '@/app/ui/components/TextareaWithLabel';
import { useSession } from 'next-auth/react';
import { useUpdateSession } from '@/app/lib/auth/useUpdateSession';

export default function CreateJobseekerProfileIntroPage() {
  const { fields, isSubmitting, error }: FormState = useSelector(
    (state: RootState) => state.form,
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const [newFieldId, setNewFieldId] = useState('');
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState<
    'text' | 'email' | 'number' | 'select' | 'radio'
  >('text');
  const [newFieldValue, setNewFieldValue] = useState('');
  const [newFieldOptions, setNewFieldOptions] = useState<
    { value: string | number; label: string }[]
  >([]);
  const { data: session, update, status } = useSession();
  const updateSessionProperties = useUpdateSession();

  useEffect(() => {
    const updateSession = async () => {
      if (!session?.user?.id) return; // Prevent running if session.user.id is undefined

      try {
        const response = await fetch(
          `/api/employers/account/professional-info/get/${session.user.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const { success, result } = await response.json(); // Destructure response

        if (success && result) {
          const {
            employerId,
            companyId,
            isVerifiedEmployee,
            isVerifiedCompany,
          } = result;
          await updateSessionProperties({
            employerId,
            companyId,
            companyIsApproved: isVerifiedCompany,
            employeeIsApproved: isVerifiedEmployee,
          });
        } else {
          console.error('Failed to fetch professional info:', result);
        }
      } catch (e) {
        console.error('Error updating session:', e);
      }
    };

    if (session && status === 'authenticated') {
      updateSession();
    }
  }, [session?.user?.id]);
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

  const handleAddField = () => {
    if (newFieldLabel) {
      dispatch(
        addField({
          id: newFieldId,
          label: newFieldLabel,
          value: newFieldValue,
          type: newFieldType,
          options:
            newFieldType === 'select' || newFieldType === 'radio'
              ? newFieldOptions
              : undefined,
        }),
      );
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

    const formData = {
      userId: session?.user.id,
      about_us:
        fields.find((f) => f.id === 'profile-creation-company-about')?.value ||
        null,
      // company_video_url: // on video page
      // company_mission: // on mission page
    };

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
        const result = await response.json();
        dispatch(submitFormSuccess());
        router.push('/create-profile/employer/mission');
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

  return (
    <main className="flex justify-center">
      <aside className="profile-form-aside"></aside>
      <section className="profile-form-section">
        <ProgressBarFlat progress={(3 / 6) * 100} size="sm" />
        <p>Step 3/6</p>
        <h1>Company Info</h1>
        <p className="subtitle">* Indicates a required field</p>

        <h2>About</h2>
        <form onSubmit={handleSubmit}>
          Tell us about your company *
          <div className="profile-form-grid">
            <fieldset>
              <TextareaWithLabel
                id="profile-creation-company-about"
                placeholder="About your company"
                rows="16"
                onChange={handleFieldChange}
                required
                value={
                  fields.find((f) => f.id === 'profile-creation-company-about')
                    ?.value || ''
                }
              >
                {/* Tell us about your company * */}
              </TextareaWithLabel>
            </fieldset>
          </div>
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
