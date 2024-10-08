'use client';

import React, { useEffect, useState } from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import { Button } from 'flowbite-react';
import TagsWithAutocomplete from '@/app/ui/components/mui/TagsWithAutocomplete';
import TextFieldWithSeparatedLabel from '@/app/ui/components/mui/TextFieldWithSeparatedLabel';
import TextFieldWithNoLabel from '@/app/ui/components/mui/TextFieldWithNoLabel';
import { SkillDTO } from '@/data/dtos/SkillDTO';
import { JsShowcaseDTO } from '@/data/dtos/JobSeekerProfileCreationDTOs';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/jobseekerStore';
import _ from 'lodash';
import {
  initialState,
  setShowcase,
} from '@/lib/features/profileCreation/jobseekerSlice';
import { devLog } from '@/app/lib/utils';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import InputFileDropzone from '@/app/ui/components/InputFileDropzone';

export default function CreateJobseekerProfileShowcasePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const showcaseStoreData = useSelector(
    (state: RootState) => state.jobseeker.showcase,
  );
  const showcaseData = { ...showcaseStoreData };
  const [error, setError] = useState<string | null>(null);
  const [introduction, setIntroduction] = useState('');
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [currentJobTitle, setCurrentJobTitle] = useState('');

  const [skills, setSkills] = useState<SkillDTO[]>(showcaseData.skills);
  const [portfolioUrl, setPortfolioUrl] = useState(
    showcaseData.portfolioUrl ?? '',
  );
  const [portfolioPassword, setPortfolioPassword] = useState(
    showcaseData.portfolioPassword ?? '',
  );
  const [videoUrl, setVideoUrl] = useState(showcaseData.video_url ?? '');

  useEffect(() => {
    if (session?.user?.id && status === 'authenticated') {
      const initializeFormFields = async () => {
        if (_.isEqual(showcaseStoreData, initialState.preferences)) {
          const { id } = session.user;

          try {
            console.log('fetching fresh');
            const response = await fetch(
              '/api/jobseekers/account/showcase/get/' + id,
            );

            if (!response.ok) {
              showcaseData.userId = id!;
            } else {
              let fetchedData: JsShowcaseDTO = (await response.json()).result;
              showcaseData.userId = id!;
              if (fetchedData.skills) {
                showcaseData.skills = fetchedData.skills;
                setSkills(showcaseData.skills);
              }
              if (fetchedData.portfolioUrl) {
                showcaseData.portfolioUrl = fetchedData.portfolioUrl;
                setPortfolioUrl(showcaseData.portfolioUrl);
              }
              if (fetchedData.portfolioPassword) {
                showcaseData.portfolioPassword = fetchedData.portfolioPassword;
                setPortfolioPassword(showcaseData.portfolioPassword);
              }
              if (fetchedData.video_url) {
                showcaseData.video_url = fetchedData.video_url;
                setVideoUrl(showcaseData.video_url);
              }
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log('fetching from store');
        }
      };

      initializeFormFields();
    }
  }, [session?.user?.id]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!session?.user?.id) {
      console.error('User session is not available.');
      return;
    }

    showcaseData.userId = session.user.id;
    showcaseData.skills = skills;
    showcaseData.portfolioUrl = portfolioUrl;
    showcaseData.portfolioPassword = portfolioPassword;
    showcaseData.video_url = videoUrl;
    showcaseData.introduction = introduction;
    showcaseData.resume_url = resumeUrl;

    try {
      const response = await fetch('/api/jobseekers/account/showcase/upsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(showcaseData),
      });

      if (response.ok) {
        const result = await response.json();
        devLog(JSON.stringify(result, null, 2));

        dispatch(setShowcase(showcaseData));

        router.push('/create-profile/jobseeker/preferences');
      } else {
        const errorMessage = `Failed to submit showcase info. Status: ${response.status} - ${response.statusText}`;
        setError(errorMessage);
      }
    } catch (e: any) {
      setError(`An unexpected error occurred: ${e.message}`);
    }
  }

  const handleResumeUpload = (url: string) => {
    // Update the local state with the uploaded image URL
    setResumeUrl(url);
  };

  return (
    <main className="flex justify-center">
      <aside className="profile-form-aside"></aside>
      <section className="profile-form-section">
        <ProgressBarFlat progress={(4 / 6) * 100} size="sm" />
        <p>Step 4/6</p>
        <h1>Showcase</h1>
        <p className="subtitle">* Indicates a required field</p>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              <h2>Career Introduction</h2>
            </legend>

            <div className="profile-form-grid">
              <InputTextWithLabel
                  id="profile-creation-intro-headlines"
                  onChange={(e) => {
                    setIntroduction(e.target.value);
                  }}
                  placeholder="Type here"
                  value={
                    introduction
                  }
              >
                Introduction
              </InputTextWithLabel>
              {/*<InputTextWithLabel*/}
              {/*  id="profile-creation-intro-current-position"*/}
              {/*  onChange = {(e) => {*/}
              {/*    setCurrentJobTitle(e.target.value);*/}
              {/*  }}*/}
              {/*  placeholder="e.g., Software Developer"*/}
              {/*  value={*/}
              {/*    currentJobTitle*/}
              {/*  }*/}
              {/*>*/}
              {/*  Current Position*/}
              {/*</InputTextWithLabel>*/}
            </div>

          </fieldset>
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
                  onChange={function (ev, val) {
                    if (val.every((skill) => typeof skill !== 'string')) {
                      setSkills(val as SkillDTO[]);
                    }
                  }}
                  searchPlaceholder="Skill (ex: Java)"
                  getTagLabel={(option: SkillDTO) => option.skill_name}
                  getTagLink={(option: SkillDTO) => option.skill_info_url}
              />
              <p>Select your top 5 skills from your skills list</p>

              <TextFieldWithSeparatedLabel
                  id="profile-creation-showcase-portfolio"
                  label="Portfolio"
                  placeholder="Url"
                  fullWidth
                  value={portfolioUrl}
                  onChange={(e) => {
                    setPortfolioUrl(e.target.value);
                  }}
              />
              <TextFieldWithSeparatedLabel
                  id="profile-creation-showcase-password"
                  label="Password if it is applicable"
                  placeholder="Password"
                  type="password"
                  fullWidth
                  value={portfolioPassword}
                  onChange={(e) => {
                    setPortfolioPassword(e.target.value);
                  }}
              />
            </div>

          </fieldset>
          <fieldset>
            <div className="profile-form-grid">
              <legend>
                <h2>Video</h2>
              </legend>
              <p>
                Employers are tired of the same old paper trail. They want to
                see the real YOU! So, apart from uploading your resume, creating
                a dynamic video introduction that gets you noticed.
              </p>
              <p>Here&apos;s what to dish in your video:</p>
              <ul className="list-inside list-disc">
                <li>
                  <b>Your Story:</b> Take viewers on a journey through your
                  experience and learning path. Where did you start? What
                  challenges did you conquer?
                </li>
                <li>
                  <b>Your Superpowers:</b> Flex your strengths! Show off your
                  skills and what makes you a unique asset. Think
                  problem-solving, communication, or maybe you&apos;re a coding
                  whiz!
                </li>
                <li>
                  <b>Your Dream Gig:</b> Paint a picture of what excites you!
                  What kind of role are you looking for? Let employers know why
                  YOU&apos;RE the missing piece to their puzzle.
                </li>
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
                  value={videoUrl}
                  onChange={(e) => {
                    setVideoUrl(e.target.value);
                  }}
              />
            </div>
          </fieldset>
          <div>
            Resume *
            <InputFileDropzone
                id="profile-creation-intro-resume"
                fileTypeText="PDF, DOC, DOCX, TXT or RTF"
                accept=".pdf,.doc,.docx,.txt,.rtf"
                maxSizeMB={5}
                userId="87E52D83-CC98-46AF-B62A-58124ABEBBDC"
                onDocUpload={handleResumeUpload}
            />
          </div>
          <div className="profile-form-progress-btn-group">
            <Button pill className="custom-outline-btn">
              Previous
            </Button>
            <Button pill type="submit">
              Save and continue
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}
