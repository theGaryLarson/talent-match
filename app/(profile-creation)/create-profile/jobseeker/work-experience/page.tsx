'use client';

import React, { useCallback, useState } from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import { MdAdd } from "react-icons/md";
import { Button, Label } from "flowbite-react";
import { Radio, RadioGroup } from '@mui/material';
import InputTextWithLabel from '../../../../ui/components/InputTextWithLabel';
import WorkExperiences, { defaultWorkExperienceData, WorkExperienceData } from '@/app/ui/form-field-groups/WorkExperiences';
import InternshipExperiences, { defaultInternshipExperienceData, InternshipExperienceData } from '@/app/ui/form-field-groups/InternshipExperiences';
import {JsWorkExpDTO} from "@/data/dtos/JobSeekerProfileCreationDTOs";
import { useRouter } from 'next/navigation';


interface Data {
  yearsWorkExperience: string | number,
  monthsInternshipExperience: string | number,
  workExperiences: WorkExperienceData[],
  internshipExperiences: WorkExperienceData[],
  isAuthorizedToWorkUsa?: boolean,
  requiresSponsorship?: boolean,
}

export default function CreateJobseekerProfileWorkExperiencePage() {
  const [data, setData] = useState<Data>({
    yearsWorkExperience: '',
    monthsInternshipExperience: '',
    workExperiences: [],
    internshipExperiences: [],
    isAuthorizedToWorkUsa: true,
    requiresSponsorship: false,
  });
  const router = useRouter();

  function addNewWorkExperience() {
    const newWorkExperienceData = defaultWorkExperienceData();
    setData({
      ...data,
      workExperiences: [...data.workExperiences, newWorkExperienceData],
    });
  }

  function removeWorkExperience(byUid : string) {
    setData({
      ...data,
      workExperiences: data.workExperiences.filter(({ uid }) => uid !== byUid),
    });
  }

  function addNewInternshipExperience() {
    const newInternshipExperienceData = defaultWorkExperienceData();
    setData({
      ...data,
      internshipExperiences: [
        ...data.internshipExperiences,
        newInternshipExperienceData,
      ],
    });
  }

  function removeInternshipExperience(byUid : string) {
    setData({
      ...data,
      internshipExperiences: data.internshipExperiences.filter(
        ({ uid }) => uid !== byUid,
      ),
    });
  }

  const handleUpdate = useCallback((key: string, value: any) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  }, []);

  const handleInputUpdate = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: type === 'radio' ? value === 'yes' : value,  // setting boolean values for radio type
    }));
  }, []);


  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const workExperiences = data.workExperiences?.map(workExp => ({
      workId: workExp.uid,
      jobseekerId: 'A5505276-65F4-40F9-BD1B-E063B8C6B6D0', // TODO: jobseeker_id should be pulled from nextauth session data
      techAreaId: null, // This should be chosen from a drop down TODO: add drop down to choose tech area (i.e. Cloud Computing, Database Management, Cybersecurity, etc.)
      sectorId: null,  // This should be chosen from a dr op down TODO: add drop down to choose sector (i.e. Retail, Healthcare, Finance, etc.)
      company: workExp.company,
      isInternship: false,
      jobTitle: workExp.title,
      isCurrentJob: workExp.current,
      startDate: new Date(workExp.starts.toISOString()),
      endDate: workExp.current ? null : new Date(workExp.ends.toISOString()),
      responsibilities: workExp.experience,
    }));

    const internshipExperiences = data.internshipExperiences?.map(internshipExp => ({
      workId: internshipExp.uid,
      jobseekerId: '98efbb19-2f8b-4e08-b179-d1a287ccf710'.toUpperCase(), // TODO: jobseeker_id should be pulled from nextauth session data
      techAreaId: null, // This should be chosen from a drop down TODO: add drop down to choose sector
      sectorId: null,  // This should be chosen from a dr op down TODO: add drop down to choose sector (i.e. Retail, Healthcare, Finance, etc.)
      company: internshipExp.company,
      isInternship: true,
      jobTitle: internshipExp.title,
      isCurrentJob: internshipExp.current,
      startDate: new Date(internshipExp.starts.toISOString()),
      endDate: internshipExp.current ? null : new Date(internshipExp.ends.toISOString()),
      responsibilities: internshipExp.experience,
    }));
    const formData: JsWorkExpDTO = {
      userId: '87E52D83-CC98-46AF-B62A-58124ABEBBDC', // TODO: user.id should be pulled from nextauth session data
      yearsWorkExperience: data.yearsWorkExperience.toString(), // Replace with actual calculation
      monthsInternshipExperience: data.monthsInternshipExperience.toString(), // Replace with actual calculation
      isAuthorizedToWorkUsa: data.isAuthorizedToWorkUsa,
      requiresSponsorship: data.requiresSponsorship,
      workExperiences: [...workExperiences, ...internshipExperiences]
    };

    try {
      const response = await fetch('/api/jobseekers/account/work-info/upsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      router.push('/create-profile/jobseeker/showcase');
    } catch (error) {
      console.error('Error submitting form:', error);
      // TODO: Handle error, e.g., display an error message
    }
  }


  return(
    <main className="flex justify-center">
      <aside className="profile-form-aside">
      </aside>
      <section className="profile-form-section">
        <ProgressBarFlat progress={3/6 * 100} size="sm"/>
        <p>Step 3/6</p>
        <h1>Work experience</h1>
        <p className='subtitle'>* Indicates a required field</p>
        <form onSubmit={handleSubmit}>
          <fieldset className="work-experience-groups">
            <legend>
              <h2>Work experience</h2>
            </legend>
            {
              (data.workExperiences.length === 0)?
                ""
              :
              <div className="profile-form-grid">
                <InputTextWithLabel
                  type="number"
                  id="profile-creation-experience-work-fulltime-years"
                  name="yearsWorkExperience"
                  value={data.yearsWorkExperience}
                  onChange={handleInputUpdate}
                >
                  How many years of full-time work experience do you have (not
                  including internship)?
                </InputTextWithLabel>
              </div>
            }
            <WorkExperiences data={data.workExperiences} onUpdate={handleUpdate} onRemove={removeWorkExperience} />
            <Button
              pill
              className="custom-outline-btn"
              onClick={addNewWorkExperience}
            >
              <MdAdd className="mr-2 h-5 w-5" />
              Add work experience
            </Button>
          </fieldset>
          <fieldset className="internship-experience-groups">
            <legend>
              <h2>Internship experience</h2>
            </legend>
            {
              (data.internshipExperiences.length === 0)?
                ""
              :
              <div className="profile-form-grid">
                <InputTextWithLabel
                  type="number"
                  id="profile-creation-experience-internship-months"
                  name="monthsInternshipExperience"
                  onChange={handleInputUpdate}
                  value={data.monthsInternshipExperience}
                >
                  How many months of internship work experience do you have?
                </InputTextWithLabel>
              </div>
            }
            <InternshipExperiences data={data.internshipExperiences} onUpdate={handleUpdate} onRemove={removeInternshipExperience} />
            <Button
              pill
              className="custom-outline-btn"
              onClick={addNewInternshipExperience}
            >
              <MdAdd className="mr-2 h-5 w-5" />
              Add internship experience
            </Button>
          </fieldset>
          <fieldset>
            <legend>
              <h2>Authentication</h2>
            </legend>
            <p>
              Note: All work authentication information you provide will only be
              used for the purpose of verifying your qualifications for this job
              application and will not be disclosed to public view or any third
              parties without your express consent.
            </p>
            <div>
              <div className='mt-3'>Are you authorized to work in the U.S.? *</div>
              <RadioGroup>
                <Label className="block">
                  <Radio
                      name="isAuthorizedToWorkUsa"
                      value="yes"
                      onChange={handleInputUpdate}
                      required
                  /> Yes
                </Label>
                <Label className="block">
                  <Radio
                      name="isAuthorizedToWorkUsa"
                      value="no"
                      onChange={handleInputUpdate}
                      required
                  /> No
                </Label>
              </RadioGroup>
            </div>
            <div>
              <h3 className='alert-title'>United States of America</h3>
              <p>Will you, now or in the future, require sponsorship for employment visa status? *</p>
              <RadioGroup>
                <Label className="block">
                  <Radio
                      name="requiresSponsorship"
                      value="yes"
                      onChange={handleInputUpdate}
                      required
                  /> Yes
                </Label>
                <Label className="block">
                  <Radio
                      name="requiresSponsorship"
                      value="no"
                      onChange={handleInputUpdate}
                      required
                  /> No
                </Label>
              </RadioGroup>
            </div>
          </fieldset>
          <div className="profile-form-progress-btn-group">
            <Button pill className="custom-outline-btn">Previous</Button>
            <Button pill type="submit">Save and continue</Button>
          </div>
        </form>
      </section>
    </main>
  );
}
