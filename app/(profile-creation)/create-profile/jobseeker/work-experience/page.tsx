'use client';

import React, { useCallback, useState } from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import { MdAdd } from "react-icons/md";
import { Button, Label } from "flowbite-react";
import { Radio, RadioGroup } from '@mui/material';
import InputTextWithLabel from '../../../../ui/components/InputTextWithLabel';
import WorkExperiences, { defaultWorkExperienceData, WorkExperienceData } from '@/app/ui/form-field-groups/WorkExperiences';
import InternshipExperiences, { defaultInternshipExperienceData, InternshipExperienceData } from '@/app/ui/form-field-groups/InternshipExperiences';

interface Data {
  workExperiences: WorkExperienceData[],
  internshipExperiences: InternshipExperienceData[],
}

export default function CreateJobseekerProfileWorkExperiencePage(){
  const [data, setData] = useState<Data>({
    workExperiences: [],
    internshipExperiences: [],
  });

  function addNewWorkExperience() {
    const newWorkExperienceData = defaultWorkExperienceData();
    setData({
      ...data,
      workExperiences: [...data.workExperiences, newWorkExperienceData]
    });
  }

  function removeWorkExperience(byUid : number) {
    setData({
      ...data,
      workExperiences: data.workExperiences.filter(({uid}) => (uid !== byUid))
    });
  }

  function addNewInternshipExperience() {
    const newInternshipExperienceData = defaultInternshipExperienceData();
    setData({
      ...data,
      internshipExperiences: [...data.internshipExperiences, newInternshipExperienceData]
    });
  }

  function removeInternshipExperience(byUid : number) {
    setData({
      ...data,
      internshipExperiences: data.internshipExperiences.filter(({uid}) => (uid !== byUid))
    });
  }

  const handleUpdate = useCallback((key:string, value:any) => {
    setData(prevData => ({
      ...prevData,
      [key]: value
    }));
  }, []);

  return(
    <main className="flex">
      <aside className="profile-form-aside">
      </aside>
      <section className="profile-form-section">
        <ProgressBarFlat progress={3/6 * 100} size="sm" color="dark" className="lg:hidden"/>
        <p>Step 3/6</p>
        <h1>Work experience</h1>
        <p>* Indicates a required field</p>
        <form onSubmit={(e)=>{
          e.preventDefault();
          console.log(data.workExperiences);
          console.log(data.internshipExperiences);
        }}>
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
                >
                  How many years of full-time work experience do you have (not including internship)?
                </InputTextWithLabel>
              </div>
            }
            <WorkExperiences data={data.workExperiences} onUpdate={handleUpdate} onRemove={removeWorkExperience} />
            <Button
              pill
              color="gray"
              onClick={addNewWorkExperience}
            >
              <MdAdd className="mr-2 h-5 w-5"/>
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
                  id="profile-creation-experience-internship-years"
                >
                  How many years of internship work experience do you have?
                </InputTextWithLabel>
              </div>
            }
            <InternshipExperiences data={data.internshipExperiences} onUpdate={handleUpdate} onRemove={removeInternshipExperience} />
            <Button
              pill
              color="gray"
              onClick={addNewInternshipExperience}
            >
              <MdAdd className="mr-2 h-5 w-5"/>
              Add internship experience
            </Button>
          </fieldset>
          <fieldset>
            <legend>
              <h2>Authentication</h2>
            </legend>
            <p>Note: All work authentication information you provide will only be used for the purpose of verifying your qualifications for this job application and will not be disclosed to public view or any third parties without your express consent.</p>
            <div>
              <div className='mt-3'>Are you authorized to work in the U.S.? *</div>
              <RadioGroup>
                <Label className="block"><Radio name="profile-creation-authentication-us-authorized" value="yes" required/> Yes</Label>
                <Label className="block"><Radio name="profile-creation-authentication-us-authorized" value="no" required/> No</Label>
              </RadioGroup>
            </div>
            <div>
              <h3 className='alert-title'>United States of America</h3>
              <p>Will you, now or in the future, require sponsorship for employment visa status? *</p>
              <RadioGroup>
                <Label className="block"><Radio name="profile-creation-authentication-require-sponsor" value="yes" required/> Yes</Label>
                <Label className="block"><Radio name="profile-creation-authentication-require-sponsor" value="no" required/> No</Label>
              </RadioGroup>
            </div>
          </fieldset>
          <div className="profile-form-progress-btn-group">
            <Button pill color="gray">Previous</Button>
            <Button pill type="submit">Save and continue</Button>
          </div>
        </form>
      </section>
    </main>
  );
}