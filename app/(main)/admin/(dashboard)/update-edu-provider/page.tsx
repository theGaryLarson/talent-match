'use client';
import React, { useEffect, useState } from 'react';
import { FormEvent } from 'react';
import SingleSelectFilterAutoload from '@/app/ui/components/mui/SingleSelectFilterAutoload';
import AvatarUpload from '@/app/ui/components/AvatarUpload';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import { EducationLevel } from '@/data/dtos/JobSeekerProfileCreationDTOs';
import { ReadEduProviderDTO } from '@/app/lib/eduProviders';
import { TrainingProviderDropdownDTO } from '@/data/dtos/TrainingProviderDropdownDTO';
import { AddTrainingPartnerDTO } from '@/app/lib/admin/eduProviderPartner';

export default function UpdateTrainingProviderPage() {
  const [selectedProviderId, setSelectedProviderId] = useState<string>('');
  const [providerOptions, setProviderOptions] = useState<TrainingProviderDropdownDTO[]>([]);
  const [isLoadingProviders, setIsLoadingProviders] = useState<boolean>(true);

  // State variables for form fields
  const [formData, setFormData] = useState<Partial<AddTrainingPartnerDTO>>({});
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [initialImageUrl, setInitialImageUrl] = useState<string>('');
  const [eduProviderId, setEduProviderId] = useState<string>('');

  // Fetch provider options on mount
  useEffect(() => {
    const fetchProviderOptions = async () => {
      try {
        const response = await fetch('/api/employers/training-providers');
        const data: TrainingProviderDropdownDTO[] = await response.json();
        setProviderOptions(data);
        setIsLoadingProviders(false);
      } catch (error) {
        console.error('Error fetching provider options:', error);
        setIsLoadingProviders(false);
      }
    };

    fetchProviderOptions();
  }, []);

  // Fetch provider data when a provider is selected
  useEffect(() => {
    if (selectedProviderId) {
      const fetchProviderData = async () => {
        try {
          const response = await fetch(`/api/edu-providers/${selectedProviderId}`);
          const data: ReadEduProviderDTO = await response.json();
          setFormData({
            providerName: data.providerName,
            contactName: data.contactName,
            contactEmail: data.contactEmail,
            url: data.url,
            mission: data.mission,
            providerDescription: data.providerDescription,
            setsApartStatement: data.setsApartStatement,
            screeningCriteria: data.screeningCriteria,
            recruitingSources: data.recruitingSources,
            programCount: data.programCount,
            cost: data.cost,
            isCoalitionMember: data.isCoalitionMember,
            eduLevel: data.eduLevel,
          });
          setAvatarUrl(data.logoUrl || '');
          setInitialImageUrl(data.logoUrl || '');
          setEduProviderId(data.eduProviderId);
        } catch (error) {
          console.error('Error fetching provider data:', error);
        }
      };

      fetchProviderData();
    } else {
      // Clear form data if no provider is selected
      setFormData({});
      setAvatarUrl('');
      setInitialImageUrl('');
      setEduProviderId('');
    }
  }, [selectedProviderId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // Check if 'checked' exists before using it
    const checked = 'checked' in e.target ? e.target.checked : undefined;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!eduProviderId) {
      alert('Please select a training provider to update.');
      return;
    }

    const submitButton = event.currentTarget.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    if (submitButton) submitButton.disabled = true;

    const providerData: AddTrainingPartnerDTO = {
      eduProviderId,
      providerName: formData.providerName || '',
      contactName: formData.contactName || '',
      contactEmail: formData.contactEmail || '',
      url: formData.url || '',
      mission: formData.mission || '',
      providerDescription: formData.providerDescription || '',
      setsApartStatement: formData.setsApartStatement || '',
      screeningCriteria: formData.screeningCriteria || '',
      recruitingSources: formData.recruitingSources || '',
      programCount: formData.programCount || '',
      cost: formData.cost || '',
      isCoalitionMember: formData.isCoalitionMember || false,
      eduLevel: formData.eduLevel || EducationLevel.Unselected,
      logoUrl: avatarUrl,
      isAdminReviewed: true,
    };

    try {
      const response = await fetch(`/api/edu-providers/add`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(providerData),
      });

      if (!response.ok) {
        console.error('Failed to update provider');
        if (submitButton) submitButton.disabled = false;
        return;
      } else {
        const data = await response.json();
        console.log('Provider updated: ', data);
        if (submitButton) submitButton.disabled = false;
        alert('Provider updated successfully!');
      }
    } catch (error) {
      console.error('Error updating provider:', error);
      if (submitButton) submitButton.disabled = false;
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Update Training Provider</h1>

      {/* Training Provider Selection */}
      <div className="grid grid-cols-1">
        <label htmlFor="trainingProviderSelect">Select Training Provider</label>
        <SingleSelectFilterAutoload
          id="trainingProviderSelect"
          label="Training Provider"
          apiAutoloadRoute="/api/employers/training-providers"
          value={selectedProviderId}
          onChange={(event: any) => {
            setSelectedProviderId(event.target.value);
          }}
          placeholder="Select a Training Provider"
          getOptionLabel={(option: TrainingProviderDropdownDTO) => option.name}
          options={providerOptions}
        />
      </div>

      {/* Form */}
      {selectedProviderId && (
        <form onSubmit={onSubmit} className="space-y-3">
          {/* Avatar Upload */}
          <div className="grid grid-cols-1">
            <label htmlFor="avatarUpload">Upload Provider Logo</label>
            <AvatarUpload
              id="avatarUpload"
              fileTypeText="PNG or JPG"
              accept=".png,.jpg,.jpeg"
              maxSizeMB={5}
              userId={eduProviderId}
              onImageUpload={(url) => {
                setAvatarUrl(url);
                setInitialImageUrl(url);
              }}
              initialImageUrl={initialImageUrl}
            />
          </div>

          {/* Provider Name */}
          <div className="grid grid-cols-1">
            <label htmlFor="providerName">Provider Name</label>
            <input
              type="text"
              name="providerName"
              value={formData.providerName || ''}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Contact Name */}
          <div className="grid grid-cols-1">
            <label htmlFor="contactName">Contact Name</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName || ''}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Contact Email */}
          <div className="grid grid-cols-1">
            <label htmlFor="contactEmail">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail || ''}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Website URL */}
          <div className="grid grid-cols-1">
            <label htmlFor="url">Website URL</label>
            <input
              type="url"
              name="url"
              value={formData.url || ''}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Education Level */}
          <div className="grid grid-cols-1">
            <SelectOptionsWithLabel
              id="educationLevel"
              options={Object.values(EducationLevel)
                .filter((value) => value !== '')
                .map((value) => ({ label: value, value }))}
              value={formData.eduLevel || ''}
              onChange={handleInputChange}
              placeholder="Select Education Level"
              required
            >
              Education Level
            </SelectOptionsWithLabel>
          </div>

          {/* Mission Statement */}
          <div className="grid grid-cols-1">
            <label htmlFor="mission">Mission Statement</label>
            <textarea
              name="mission"
              value={formData.mission || ''}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Provider Description */}
          <div className="grid grid-cols-1">
            <label htmlFor="providerDescription">Provider Description</label>
            <textarea
              name="providerDescription"
              value={formData.providerDescription || ''}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* What Sets You Apart */}
          <div className="grid grid-cols-1">
            <label htmlFor="setsApartStatement">What Sets You Apart</label>
            <textarea
              name="setsApartStatement"
              value={formData.setsApartStatement || ''}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Screening Criteria */}
          <div className="grid grid-cols-1">
            <label htmlFor="screeningCriteria">Screening Criteria</label>
            <textarea
              name="screeningCriteria"
              value={formData.screeningCriteria || ''}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Recruiting Sources */}
          <div className="grid grid-cols-1">
            <label htmlFor="recruitingSources">Recruiting Sources</label>
            <textarea
              name="recruitingSources"
              value={formData.recruitingSources || ''}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Number of Programs */}
          <div className="grid grid-cols-1">
            <label htmlFor="programCount">Number of Programs</label>
            <input
              type="number"
              name="programCount"
              value={formData.programCount || ''}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Cost */}
          <div className="grid grid-cols-1">
            <label htmlFor="cost">Cost</label>
            <input
              type="text"
              name="cost"
              value={formData.cost || ''}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Is Coalition Member */}
          <div className="grid grid-cols-1">
            <label htmlFor="isCoalitionMember">
              <input
                type="checkbox"
                name="isCoalitionMember"
                checked={formData.isCoalitionMember || false}
                onChange={handleInputChange}
              />{' '}
              Is Coalition Member
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit">Update Provider</button>
          </div>
        </form>
      )}
    </div>
  );
}
