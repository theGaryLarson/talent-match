'use client';

import React from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import DividerWithText from '@/app/ui/components/DividerWithText';
import { Button, Label, List, ListItem, TextInput } from "flowbite-react";
import { MdOutlineFileUpload } from "react-icons/md";
import TagsWithAutocomplete from '@/app/ui/components/mui/TagsWithAutocomplete';


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
            <TagsWithAutocomplete
              apiSearchRoute="/api/skills?q="
              fieldLabel="Select your skills *"
              id="profile-creation-showcase-skills"
              searchingText="Searching..."
              noResultsText="No skills found..."
              onChange={function(ev, val){ console.log(val); }}
              searchPlaceholder="Skill (ex: Java)"
            />
            <p>Select your top 5 skills from your skills list</p>

            <Label htmlFor="profile-creation-showcase-portfolio" value="Portfolio" />
            <TextInput id="profile-creation-showcase-portfolio" name="profile-creation-showcase-portfolio" type="text" placeholder="Url" />

            <Label htmlFor="profile-creation-showcase-password" value="Password if it is applicable" />
            <TextInput id="profile-creation-showcase-password" name="profile-creation-showcase-password" type="password" placeholder="Password" />
          </fieldset>
          <fieldset>
            <legend>
              <h2>Video</h2>
            </legend>
            <p>Employers are tired of the same old paper trail. They want to see the real YOU! So, apart from uploading your resume, creating a dynamic video introduction that gets you noticed.</p>
            <p>Here&apos;s what to dish in your video:</p>
            <List>
              <ListItem><b>Your Story:</b> Take viewers on a journey through your experience and learning path. Where did you start? What challenges did you conquer?</ListItem>
              <ListItem><b>Your Superpowers:</b> Flex your strengths! Show off your skills and what makes you a unique asset. Think problem-solving, communication, or maybe you&apos;re a coding whiz!</ListItem>
              <ListItem><b>Your Dream Gig:</b> Paint a picture of what excites you! What kind of role are you looking for? Let employers know why YOU&apos;RE the missing piece to their puzzle.</ListItem>
            </List>

            {/*
            TODO: If we change our minds and want to implement video uploads, the button needs upload function added
            <Button pill color="gray">
              <MdOutlineFileUpload className="mr-2 h-5 w-5"/>
              Upload your video
            </Button>

            <DividerWithText>or</DividerWithText>
            */}

            <TextInput id="profile-creation-showcase-video" name="profile-creation-showcase-video" placeholder="Upload your video url" />
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