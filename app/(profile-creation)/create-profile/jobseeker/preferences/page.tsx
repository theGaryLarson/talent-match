'use client';

import React from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import { PlusIcon } from '@heroicons/react/16/solid';
import { Button, Label, Progress, Radio } from "flowbite-react";

// REVIEW: testing redux
import type { RootState } from '../../../../../lib/store';
import { useSelector, useDispatch } from 'react-redux';
import { addField, updateField } from '../../../../../lib/features/profileCreation/formSlice';


export default function CreateJobseekerProfilePreferencesPage(){
  const { fields } = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  return(
    <main className="flex">
      <aside className="hidden lg:w-2/5 lg:block">
      </aside>
      <section className="w-full lg:w-3/5">
        <h1>Data on Another Page</h1>
        <pre>{JSON.stringify(fields, null, 2)}</pre>
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
              <fieldset>
                <legend>What are you looking for?</legend>
                {/* TODO: Pills need function to select */}
                <div className="flex">
                  <Button color="gray" pill>Full-time job</Button>
                  <Button color="gray" pill>Part-time job</Button>
                  <Button color="gray" pill>Internship</Button>
                  <Button color="gray" pill>On-campus job</Button>
                </div>
              </fieldset>
              <fieldset>
                <legend>What is your tech role/pathway targeted?</legend>
                <Label className="block"><Radio name="profile-creation-preferences-require-role" required/> Software Development</Label>
                <Label className="block"><Radio name="profile-creation-preferences-require-role" required/> Cloud Computing</Label>
                <Label className="block"><Radio name="profile-creation-preferences-require-role" required/> Data analytics</Label>
              </fieldset>
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