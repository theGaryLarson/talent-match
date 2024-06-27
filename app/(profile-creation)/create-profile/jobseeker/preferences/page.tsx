'use client';

import React from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import { PlusIcon } from '@heroicons/react/16/solid';
import { Button, Label, Progress, Radio } from "flowbite-react";

export default function CreateJobseekerProfilePreferencesPage(){
  return(
    <main className="flex">
      <aside className="hidden lg:w-2/5 lg:block">
      </aside>
      <section className="w-full lg:w-3/5">
        <ProgressBarFlat progress={5/6 * 100} size="sm" color="dark" className="lg:hidden"/>
        <p>Step 5/6</p>
        <h1>Your preferences</h1>
        <p>* Indicates a required field</p>
        <form>
          <fieldset>
              <legend>
                <h2>Your Preferences</h2>
              </legend>
            <div>
              <h3>What are you looking for?</h3>
              {/* TODO: Pills need function to select */}
              <div className="flex">
                <Button color="gray" pill>Full-time job</Button>
                <Button color="gray" pill>Part-time job</Button>
                <Button color="gray" pill>Internship</Button>
                <Button color="gray" pill>On-campus job</Button>
              </div>
              <h3>What is your tech role/pathway targeted?</h3>
              <Label className="block"><Radio name="profile-creation-preferences-require-role" required/> Software Development</Label>
              <Label className="block"><Radio name="profile-creation-preferences-require-role" required/> Cloud Computing</Label>
              <Label className="block"><Radio name="profile-creation-preferences-require-role" required/> Data analytics</Label>
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