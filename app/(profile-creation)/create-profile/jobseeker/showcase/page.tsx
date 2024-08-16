'use client';

import React, {useState} from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import { Button } from "flowbite-react";
import TagsWithAutocomplete from '@/app/ui/components/mui/TagsWithAutocomplete';
import TextFieldWithSeparatedLabel from '@/app/ui/components/mui/TextFieldWithSeparatedLabel';
import TextFieldWithNoLabel from '@/app/ui/components/mui/TextFieldWithNoLabel';
import { SkillDTO } from '@/data/dtos/SkillDTO';


export default function CreateJobseekerProfileShowcasePage(){
  const [skills, setSkills] = useState<SkillDTO[]>([]);

  return(
    <main className="flex">
      <aside className="profile-form-aside">
      </aside>
      <section className="profile-form-section">
        <ProgressBarFlat progress={4/6 * 100} size="sm" className="xl:hidden"/>
        <p>Step 4/6</p>
        <h1>Showcase</h1>
        <p className='subtitle'>* Indicates a required field</p>
        <form>
          <fieldset>
            <legend>
              <h2>Skills</h2>
            </legend>
            <div className="profile-form-grid">
              <TagsWithAutocomplete
                apiSearchRoute="/api/skills/search/"
                fieldLabel="Select your skills *"
                id="profile-creation-showcase-skills"
                maxTags={5}
                searchingText="Searching..."
                noResultsText="No skills found..."
                onChange={function(ev, val){ setSkills(val) }}
                searchPlaceholder="Skill (ex: Java)"
                getOptionLabel={(option:SkillDTO) => option.skill_name}
              />
              <p>Select your top 5 skills from your skills list</p>


              <TextFieldWithSeparatedLabel
                id="profile-creation-showcase-portfolio"
                label="Portfolio"
                placeholder="Url"
                fullWidth
              />


              <TextFieldWithSeparatedLabel
                id="profile-creation-showcase-password"
                label="Password if it is applicable"
                placeholder="Password"
                type="password"
                fullWidth
              />
            </div>
          </fieldset>
          <fieldset>
          <div className="profile-form-grid">
            <legend>
              <h2>Video</h2>
            </legend>
            <p>Employers are tired of the same old paper trail. They want to see the real YOU! So, apart from uploading your resume, creating a dynamic video introduction that gets you noticed.</p>
            <p>Here&apos;s what to dish in your video:</p>
            <ul className='list-disc list-inside'>
              <li><b>Your Story:</b> Take viewers on a journey through your experience and learning path. Where did you start? What challenges did you conquer?</li>
              <li><b>Your Superpowers:</b> Flex your strengths! Show off your skills and what makes you a unique asset. Think problem-solving, communication, or maybe you&apos;re a coding whiz!</li>
              <li><b>Your Dream Gig:</b> Paint a picture of what excites you! What kind of role are you looking for? Let employers know why YOU&apos;RE the missing piece to their puzzle.</li>
            </ul>

            {/*
            TODO: If we change our minds and want to implement video uploads, the button needs upload function added
            <Button pill className="custom-outline-btn">
              <MdOutlineFileUpload className="mr-2 h-5 w-5"/>
              Upload your video
            </Button>

            <DividerWithText>or</DividerWithText>
            */}

            <TextFieldWithNoLabel
              id="profile-creation-showcase-video"
              placeholder="Upload your video url"
              fullWidth
            />
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