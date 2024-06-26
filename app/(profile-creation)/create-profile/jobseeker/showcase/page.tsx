'use client';

import React from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import { PlusIcon } from '@heroicons/react/16/solid';
import { Button, Label, Progress, Radio, TextInput } from "flowbite-react";
import { MdOutlineFileUpload } from "react-icons/md";


export default function CreateJobseekerProfileShowcasePage(){
  return(
    <main className="flex">
      <aside className="hidden lg:w-2/5 lg:block">
      </aside>
      <section className="w-full lg:w-3/5">
        <ProgressBarFlat progress={4/6 * 100} size="sm" color="dark" className="lg:hidden"/>
        <p>Step 4/6</p>
        <h1>Showcase</h1>
        <p>* Indicates a required field</p>
        <form>
          <fieldset>
            <legend>
              <h2>Skills</h2>
            </legend>
          {/* TODO: skills section will need to update to searchable list with selectable skill "pills" */}
          <InputTextWithLabel className="w-full" id="profile-creation-showcase-skills" placeholder="Skill (ex: Java)" required>Select your skills *</InputTextWithLabel>
          <p>Select your top 5 skills from your skills list</p>
          <InputTextWithLabel className="w-full" id="profile-creation-showcase-portfolio" placeholder="Url" required>Portfolio</InputTextWithLabel>

          {/* REVIEW: first pw is open input field, other is password input type via flowbite */}
          <InputTextWithLabel className="w-full" id="profile-creation-showcase-password" placeholder="Password" required>Password if it is applicable</InputTextWithLabel>

          <Label htmlFor="password" value="Password if it is applicable" />
          <TextInput id="password" type="password" placeholder="Password" />

          <h1>Video</h1>
          <p>Employers are tired of the same old paper trail. They want to see the real YOU! So, apart from uploading your resume, creating a dynamic video introduction that gets you noticed.</p>
          <p>Here's what to dish in your video:</p>
          <ul>
            {/* TODO: li is not rendering on view */}
            <li><b>Your Story:</b> Take viewers on a journey through your experience and learning path. Where did you start? What challenges did you conquer?</li>
            <li><b>Your Superpowers:</b> Flex your strengths! Show off your skills and what makes you a unique asset. Think problem-solving, communication, or maybe you're a coding whiz!</li>
            <li><b>Your Dream Gig:</b> Paint a picture of what excites you! What kind of role are you looking for? Let employers know why YOU'RE the missing piece to their puzzle.</li>
          </ul>

          {/* TODO: button needs upload function added*/}
          <Button pill color="gray">
            <MdOutlineFileUpload className="mr-2 h-5 w-5"/>
            Upload your video
          </Button>

          {/* TODO: remove dashs add line */}
          <p>------- or --------</p>
          <InputTextWithLabel className="w-full" id="profile-creation-showcase-video" placeholder="Upload your video url" required></InputTextWithLabel>



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