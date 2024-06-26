'use client';

import React, { useState } from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import { MdAdd } from "react-icons/md";
import { Button, Checkbox, Label, Radio, Textarea } from "flowbite-react";
import InputTextWithLabel from '../../../../ui/components/InputTextWithLabel';
import TextareaWithLabel from '../../../../ui/components/TextareaWithLabel';

interface WorkExperienceGroupProps {
  groupNumber: number,
}

function WorkExperienceGroup({groupNumber}:WorkExperienceGroupProps){
  const [isCurrent, setCurrent] = useState(false);

  return (
    <div>
      <h3>Experience {groupNumber}</h3>
      <InputTextWithLabel
        id={"profile-creation-work-experience-group-" + groupNumber + "-company"}
        className="w-full"
        placeholder="Your company name"
        required
      >
        Company *
      </InputTextWithLabel>
      <InputTextWithLabel
        id={"profile-creation-work-experience-group-" + groupNumber + "-title"}
        className="w-full"
        placeholder="Your title"
        required
      >
        Title *
      </InputTextWithLabel>
      <div className="flex">
        <InputTextWithLabel
          type="month"
          id={"profile-creation-work-experience-group-" + groupNumber + "-starts"}
          className="w-1/2"
          required={(isCurrent)?false:true}
          disabled={(isCurrent)?true:false}
        >
          Starts *
        </InputTextWithLabel>
        <InputTextWithLabel
          type="month"
          id={"profile-creation-work-experience-group-" + groupNumber + "-ends"}
          className="w-1/2"
          required={(isCurrent)?false:true}
          disabled={(isCurrent)?true:false}
        >
          Ends *
        </InputTextWithLabel>
      </div>
      <Label>
        <Checkbox
          id={"profile-creation-work-experience-group-" + groupNumber + "-current"}
          onClick={()=>setCurrent(!isCurrent)}
        />
        Current
      </Label>
      <TextareaWithLabel
        id={"profile-creation-work-experience-group-" + groupNumber + "-experience"}
        placeholder="Your specific experience"
        required
      >
        Experience *
      </TextareaWithLabel>
    </div>
  );
}

interface InternshipExperienceGroupProps {
  groupNumber: number,
}

function InternshipExperienceGroup({groupNumber}:InternshipExperienceGroupProps){
  const [isCurrent, setCurrent] = useState(false);

  return (
    <div>
      <h3>Experience {groupNumber}</h3>
      <InputTextWithLabel
        id={"profile-creation-internship-experience-group-" + groupNumber + "-company"}
        className="w-full"
        placeholder="Your company name"
        required
      >
        Company *
      </InputTextWithLabel>
      <InputTextWithLabel
        id={"profile-creation-internship-experience-group-" + groupNumber + "-title"}
        className="w-full"
        placeholder="Your title"
        required
      >
        Title *
      </InputTextWithLabel>
      <div className="flex">
        <InputTextWithLabel
          type="month"
          id={"profile-creation-internship-experience-group-" + groupNumber + "-starts"}
          className="w-1/2"
          required={(isCurrent)?false:true}
          disabled={(isCurrent)?true:false}
        >
          Starts *
        </InputTextWithLabel>
        <InputTextWithLabel
          type="month"
          id={"profile-creation-internship-experience-group-" + groupNumber + "-ends"}
          className="w-1/2"
          required={(isCurrent)?false:true}
          disabled={(isCurrent)?true:false}
        >
          Ends *
        </InputTextWithLabel>
      </div>
      <Label>
        <Checkbox
          id={"profile-creation-internship-experience-group-" + groupNumber + "-current"}
          onClick={()=>setCurrent(!isCurrent)}
        />
        Current
      </Label>
      <TextareaWithLabel
        id={"profile-creation-internship-experience-group-" + groupNumber + "-experience"}
        placeholder="Your specific experience"
        required
      >
        Experience *
      </TextareaWithLabel>
    </div>
  );
}

export default function CreateJobseekerProfileWorkExperiencePage(){
  const [workExperienceGroups, setWorkExperienceGroups] = useState<React.ReactNode[]>([]);
  const [internshipExperienceGroups, setInternshipExperienceGroups] = useState<React.ReactNode[]>([]);

  function addNewWorkExperienceGroup() {
    setWorkExperienceGroups((prevGroups) => [
      ...prevGroups,
      <WorkExperienceGroup key={'WorkGroupKey'+(prevGroups.length+1)} groupNumber={prevGroups.length+1}/>
    ])
  }

  function addNewInternshipExperienceGroup() {
    setInternshipExperienceGroups((prevGroups) => [
      ...prevGroups,
      <InternshipExperienceGroup key={'InternshipGroupKey'+(prevGroups.length+1)} groupNumber={prevGroups.length+1}/>
    ])
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
        <form>
          <fieldset>
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
              workExperienceGroups
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
          <fieldset>
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
              internshipExperienceGroups
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
              <Label className="block"><Radio name="profile-creation-authentication-us-authorized" required/> Yes</Label>
              <Label className="block"><Radio name="profile-creation-authentication-us-authorized" required/> No</Label>
            </div>
            <div>
              <h3>United States of America</h3>
              <p>Will you, now or in the future, require sponsorship for employment visa status? *</p>
              <Label className="block"><Radio name="profile-creation-authentication-require-sponsor" required/> Yes</Label>
              <Label className="block"><Radio name="profile-creation-authentication-require-sponsor" required/> No</Label>
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