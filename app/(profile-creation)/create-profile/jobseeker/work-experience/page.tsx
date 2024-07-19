'use client';

import React, { useState } from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import { MdAdd } from "react-icons/md";
import { Button, Label, Radio } from "flowbite-react";
import InputTextWithLabel from '../../../../ui/components/InputTextWithLabel';
import WorkExperienceGroup, { defaultWorkExperienceGroupData, extractWorkExperienceGroups } from '@/app/ui/form-field-groups/WorkExperienceGroup';
import InternshipExperienceGroup, { defaultInternshipExperienceGroupData, extractInternshipExperienceGroups } from '@/app/ui/form-field-groups/InternshipExperienceGroup';

type WorkExperienceGroupsTuple = [React.ReactNode, number];
type InternshipExperienceGroupsTuple = [React.ReactNode, number];
export default function CreateJobseekerProfileWorkExperiencePage(){
  const [workExperienceGroups, setWorkExperienceGroups] = useState<WorkExperienceGroupsTuple[]>([]);
  const [internshipExperienceGroups, setInternshipExperienceGroups] = useState<InternshipExperienceGroupsTuple[]>([]);

  function addNewWorkExperienceGroup() {
    const newGroupData = defaultWorkExperienceGroupData();
    setWorkExperienceGroups((prevGroups) => [
      ...prevGroups,
      [
        <WorkExperienceGroup key={newGroupData.uid} groupData={newGroupData} onRemove={()=>removeWorkExperienceGroup(newGroupData.uid)} />,
        newGroupData.uid
      ]
    ]);
  }

  function removeWorkExperienceGroup(byUid : number) {
    setWorkExperienceGroups((prevGroups) => {
      const updatedGroups = prevGroups.filter(([, uid]) => (uid !== byUid));
      return updatedGroups;
    })
  }

  function addNewInternshipExperienceGroup() {
    const newGroupData = defaultInternshipExperienceGroupData();
    setInternshipExperienceGroups((prevGroups) => [
      ...prevGroups,
      [
        <InternshipExperienceGroup key={newGroupData.uid} groupData={newGroupData} onRemove={()=>removeInternshipExperienceGroup(newGroupData.uid)} />,
        newGroupData.uid
      ]
    ]);
  }

  function removeInternshipExperienceGroup(byUid : number) {
    setInternshipExperienceGroups((prevGroups) => {
      const updatedGroups = prevGroups.filter(([, uid]) => (uid !== byUid));
      return updatedGroups;
    })
  }

  return(
    <main className="flex">
      <aside className="hidden lg:w-2/5 lg:block">
      </aside>
      <section className="w-full lg:w-3/5">
        <ProgressBarFlat progress={3/6 * 100} size="sm" color="dark" className="lg:hidden"/>
        <p>Step 3/6</p>
        <h1>Work experience</h1>
        <p>* Indicates a required field</p>
        <form onSubmit={(e)=>{
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const [extractedWorkExperienceData, remainingFormData] = extractWorkExperienceGroups(Array.from(formData.entries()));
          const [extractedInternshipExperienceData, remainingFormData2] = extractInternshipExperienceGroups(remainingFormData);
          console.log(extractedWorkExperienceData);
          console.log(extractedInternshipExperienceData);
          console.log(remainingFormData2);
        }}>
          <style jsx global>{`
            .work-experience-groups {
              counter-reset: work-group-item;
            }
            
            .work-experience-groups fieldset h3::after {
              counter-increment: work-group-item;
              content: " " counter(work-group-item);
            }

            .internship-experience-groups {
              counter-reset: internship-group-item;
            }

            .internship-experience-groups fieldset h3::after {
              counter-increment: internship-group-item;
              content: " " counter(internship-group-item);
            }
          `}</style>
          <fieldset className="work-experience-groups">
            <legend>
              <h2>Work experience</h2>
            </legend>
            {
              (workExperienceGroups.length === 0)?
                ""
              :
                <InputTextWithLabel
                  type="number"
                  id="profile-creation-experience-work-fulltime-years"
                >
                  How many years of full-time work experience do you have (not including internship)?
                </InputTextWithLabel>
            }
            {
              workExperienceGroups.map(([group]) => group)
            }
            <Button
              pill
              color="gray"
              onClick={addNewWorkExperienceGroup}
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
              (internshipExperienceGroups.length === 0)?
                ""
              :
                <InputTextWithLabel
                  type="number"
                  id="profile-creation-experience-internship-years"
                >
                  How many years of internship work experience do you have?
                </InputTextWithLabel>
            }
            {
              internshipExperienceGroups.map(([group]) => group)
            }
            <Button
              pill
              color="gray"
              onClick={addNewInternshipExperienceGroup}
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
              Are you authorized to work in the U.S.? *
              <Label className="block"><Radio name="profile-creation-authentication-us-authorized" value="yes" required/> Yes</Label>
              <Label className="block"><Radio name="profile-creation-authentication-us-authorized" value="no" required/> No</Label>
            </div>
            <div>
              <h3>United States of America</h3>
              <p>Will you, now or in the future, require sponsorship for employment visa status? *</p>
              <Label className="block"><Radio name="profile-creation-authentication-require-sponsor" value="yes" required/> Yes</Label>
              <Label className="block"><Radio name="profile-creation-authentication-require-sponsor" value="no" required/> No</Label>
            </div>
          </fieldset>
          <div className="flex">
            <Button pill color="gray">Previous</Button>
            <Button pill type="submit">Save and continue</Button>
          </div>
        </form>
      </section>
    </main>
  );
}