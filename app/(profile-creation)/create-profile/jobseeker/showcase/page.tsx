'use client';

import React, {useState} from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import { Button } from "flowbite-react";
import TagsWithAutocomplete from '@/app/ui/components/mui/TagsWithAutocomplete';
import TextFieldWithSeparatedLabel from '@/app/ui/components/mui/TextFieldWithSeparatedLabel';
import TextFieldWithNoLabel from '@/app/ui/components/mui/TextFieldWithNoLabel';
import { SkillDTO } from '@/data/dtos/SkillDTO';
import {JsShowcaseDTO} from "@/data/dtos/JobSeekerProfileCreationDTOs";
import { useRouter } from 'next/navigation';



export default function CreateJobseekerProfileShowcasePage(){
  const [skills, setSkills] = useState<SkillDTO[]>([]);
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [portfolioPassword, setPortfolioPassword] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData: JsShowcaseDTO = {
      userId: '87E52D83-CC98-46AF-B62A-58124ABEBBDC',
      skills: skills,
      portfolioUrl: portfolioUrl,
      portfolioPassword: portfolioPassword,
      video_url: videoUrl,
    }

    try {
      const response = await fetch('/api/jobseekers/account/showcase/upsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage: string = await response.text();  // Get the error message from the response
        setError(`Failed to save data: ${errorMessage}`);
        return;  // Exit the function if the response is not ok
      }

      const result = await response.json();
      console.log(JSON.stringify(result, null ,2 ));
      router.push('/create-profile/jobseeker/preferences');
    } catch (e: any) {
      //error handling
    }
  }

  return(
    <main className="flex justify-center">
      <aside className="profile-form-aside">
      </aside>
      <section className="profile-form-section">
        <ProgressBarFlat progress={4/6 * 100} size="sm"/>
        <p>Step 4/6</p>
        <h1>Showcase</h1>
        <p className='subtitle'>* Indicates a required field</p>
        <form onSubmit={ handleSubmit }>
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
                onChange={function(ev, val){ if (val.every(skill => typeof skill !== "string")) { setSkills(val as SkillDTO[]) } }}
                searchPlaceholder="Skill (ex: Java)"
                getTagLabel={(option:SkillDTO) => option.skill_name}
                getTagLink={(option:SkillDTO) => option.skill_info_url}
              />
              <p>Select your top 5 skills from your skills list</p>

            <TextFieldWithSeparatedLabel
              id="profile-creation-showcase-portfolio"
              label="Portfolio"
              placeholder="Url"
              fullWidth
              value={ portfolioUrl }
              onChange={(e) => { setPortfolioUrl(e.target.value) }}
            />
            <TextFieldWithSeparatedLabel
              id="profile-creation-showcase-password"
              label="Password if it is applicable"
              placeholder="Password"
              type="password"
              fullWidth
              value={ portfolioPassword }
              onChange={(e) => { setPortfolioPassword(e.target.value) }}
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
              value={ videoUrl }
              onChange={(e) => { setVideoUrl(e.target.value) }}
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