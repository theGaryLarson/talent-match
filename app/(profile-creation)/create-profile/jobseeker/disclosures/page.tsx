'use client';

import React from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import { PlusIcon } from '@heroicons/react/16/solid';
import { Button, Label, Progress, Radio, Checkbox } from "flowbite-react";

export default function CreateJobseekerProfileDisclosuresPage(){
  return(
    <main className="flex">
      <aside className="hidden lg:w-2/5 lg:block">
      </aside>
      <section className="w-full lg:w-3/5">
        <ProgressBarFlat progress={6/6 * 100} size="sm" color="dark" className="lg:hidden"/>
        <p>Step 6/6</p>
        <h1>Voluntary Disclosures</h1>
        <p>* Indicates a required field</p>
        <p>
          You are invited to provide information to assist us in meeting these government reporting requirements.
          Completion of this form is completely voluntary. If you choose not to answer, you will not be subject to adverse effects. However, we encourage you to answer each question and assure you that this information is confidential. 
        </p>
        <fieldset>
          {/* REVIEW: These options are from dynamics, but may be deprecated? */}
          <SelectOptionsWithLabel
                id="profile-creation-disclosures-gender"
                className="w-full"
                options={[
                  {label:"Male", value:"Male"},
                  {label:"Female", value:"Female"},
                  {label:"Non-binary", value:"Non-binary"},
                  {label:"Other", value:"Other"},
                  {label:"I prefer not to say", value:"I prefer not to say"},
                ]}
                placeholder="Please select"
                required
              >
              Gender *
            </SelectOptionsWithLabel>
        </fieldset>

        <fieldset>
          <SelectOptionsWithLabel
                id="profile-creation-disclosures-gender"
                className="w-full"
                options={[
                  {label:"Yes", value:"Yes"},
                  {label:"No", value:"No"},
                  {label:"I prefer not to say", value:"I prefer not to say"},
                ]}
                placeholder="Please select"
                required
              >
              Veterans *
            </SelectOptionsWithLabel>
        </fieldset>

        <fieldset>
          <SelectOptionsWithLabel
                id="profile-creation-disclosures-gender"
                className="w-full"
                options={[
                  {label:"I am a person of Hispanic origin", value:"I am a person of Hispanic origin"},
                  {label:"I am NOT Hispanic", value:"I am NOT Hispanic"},
                  {label:"I prefer not to say", value:"I prefer not to say"},
                ]}
                placeholder="Please select"
                required
              >
              Ethnicity *
            </SelectOptionsWithLabel>
        </fieldset>
        <fieldset>
          <h1>How do you know if you have a disability?</h1>
          <p>
          A disability is a condition that substantially limits one or more of your “major life activities.” If you have or have ever had such a condition, you are a person with a disability. Disabilities include, but are not limited to:
          </p>

          {/* TODO: the li bullets are missing */}
          <ul>
            <li>Alcohol or other substance use disorder (not currently using drugs illegally)</li>
            <li>Autoimmune disorder, for example, lupus, fibromyalgia, rheumatoid arthritis, HIV/AIDS</li>
            <li>Blind or low vision</li>
            <li>Cancer (past or present)</li>
            <li>Cardiovascular or heart disease</li>
            <li>Celiac disease</li>
            <li>Cerebral palsy</li>
            <li>Deaf or serious difficulty hearing</li>
            <li>Diabetes</li>
            <li>Disfigurement, for example, disfigurement caused by burns, wounds, accidents, or congenital disorders</li>
            <li>Epilepsy or other seizure disorder</li>
            <li>Gastrointestinal disorders, for example, Crohn's Disease, irritable bowel syndrome</li>
            <li>Intellectual or developmental disability</li>
            <li>Mental health conditions, for example, depression, bipolar disorder, anxiety disorder, schizophrenia, PTSD</li>
            <li>Missing limbs or partially missing limbs</li>
            <li>Mobility impairment, benefiting from the use of a wheelchair, scooter, walker, leg brace(s) and/or other supports</li>
            <li>Nervous system condition, for example, migraine headaches, Parkinson’s disease, multiple sclerosis (MS)</li>
            <li>Neurodivergence, for example, attention-deficit/hyperactivity disorder (ADHD), autism spectrum disorder, dyslexia, dyspraxia, other learning disabilities</li>
            <li>Partial or complete paralysis (any cause)</li>
            <li>Pulmonary or respiratory conditions, for example, tuberculosis, asthma, emphysema</li>
            <li>Short stature (dwarfism)</li>
            <li>Traumatic brain injury</li>
          </ul>
          
          {/* REVIEW: on the figma this was checkboxes, but has been built as radio instead; comment made on figma to double-check */}
          <h3>Please select one of the options below: *</h3>
          <Label className="block"><Radio name="profile-creation-disclosures-require-disability" required/> Yes, I have a disability, or have had one in the past</Label>
          <Label className="block"><Radio name="profile-creation-disclosures-require-disability" required/> No, I do not have a disability and have not had one in the past</Label>
          <Label className="block"><Radio name="profile-creation-disclosures-require-disability" required/> I do not want to answer</Label>
                
          <h3>Terms</h3>
          <Label className="block"><Checkbox name="profile-creation-disclosures-require-terms" required/> Yes, I have read and consent to the terms and conditions*</Label>

        </fieldset>
        <form>
          <div className="flex">
            <Button pill color="gray">Previous</Button>
            <Button pill type="submit">Save and continue</Button>
          </div>
        </form>
      </section>
    </main>
  );
}