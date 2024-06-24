'use client';

import React from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import { MdAdd } from "react-icons/md";
import { Button, Label, Progress, Radio } from "flowbite-react";

export default function CreateJobseekerProfileWorkExperiencePage(){
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
            <Button pill color="gray">
              <MdAdd className="mr-2 h-5 w-5"/>
              Add work experience
            </Button>
          </fieldset>
          <fieldset>
            <legend>
              <h2>Internship experience</h2>
            </legend>
            <Button pill color="gray">
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