'use client';

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { RootState } from '@/lib/employerStore';
import { useSelector, useDispatch } from 'react-redux';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import { Button, Progress } from 'flowbite-react';
import { useSession } from 'next-auth/react';
import { useUpdateSession } from '@/app/lib/auth/useUpdateSession';
import { PostEmployerVideoDTO } from '@/data/dtos/EmployerProfileCreationDTOs';
import {
  setVideo,
  initialState,
} from '@/lib/features/profileCreation/employerSlice';
import {
  setPageDirty,
  setPageSaved,
} from '@/lib/features/profileCreation/saveSlice';
import _ from 'lodash';
import { devLog } from '@/app/lib/utils';

const formNamePrefix = 'profile-creation-company-';

export default function CreateJobseekerProfileIntroPage() {
  const videoStoreData = useSelector(
    (state: RootState) => state.employer.video,
  );
  const [videoData, setVideoData] = useState<PostEmployerVideoDTO>({
    ...videoStoreData,
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const { data: session, update, status } = useSession();
  const updateSessionProperties = useUpdateSession();

  useEffect(() => {
    const initializeFormFields = async () => {
      console.log('session', session);
      if (!session?.user.id) return;
      if (status === 'authenticated') {
        if (_.isEqual(videoStoreData, initialState.video)) {
          const { id, companyId, employerId } = session.user;

          try {
            const response = await fetch(
              `/api/companies/video/get/${session.user.companyId}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            );

            if (!response.ok) {
              const errorData = await response.json();
            } else {
              let { result } = await response.json();

              console.log('fetchedData', result);
              setVideoData({
                ...videoData,
                companyId: result.companyId,
                videoUrl: result.video ?? '',
              });
            }
          } catch (error) {}
        } else {
          console.log('fetching from redux store');
        }
      }
    };
    initializeFormFields();
    dispatch(setPageSaved('video'));
    devLog(videoData);
  }, [session?.user?.id]);

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    dispatch(setPageDirty('video'));
    const fieldName = name.substring(formNamePrefix.length);
    if (videoData.hasOwnProperty(fieldName)) {
      videoData[fieldName as keyof PostEmployerVideoDTO] = value;
      setVideoData({ ...videoData });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!session || !session.user) {
      console.error('User session is not available.');
      return;
    }
    setVideoData({ ...videoData });
    devLog('videoData', videoData);

    try {
      const response = await fetch('/api/companies/video/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(videoData),
      });

      if (response.ok) {
        const result = await response.json();
        dispatch(setPageSaved('video'));
        dispatch(setVideo(videoData));
        router.push('/edit-profile/employer/congratulations');
      } else {
        const errorData = await response.json();
        if (!session?.user?.employeeIsApproved)
          router.push('/edit-profile/employer/congratulations');
      }
    } catch (error) {}
  };

  return (
    <main className="flex justify-center">
      <aside className="profile-form-aside"></aside>
      <section className="profile-form-section">
        <ProgressBarFlat progress={(5 / 5) * 100} size="sm" />

        <p>Step 5/5</p>
        <h1>Company Video</h1>
        <p className="subtitle">* Indicates a required field</p>

        <div className="profile-form-grid">
          <h2>Add a video to your Company Profile</h2>
          <p>
            Adding a company video can make a significant impact on your
            recruitment efforts. By showcasing your unique culture, values, and
            work environment, you can:
          </p>
          <ul className="spaced-lists list-inside list-disc">
            <li>
              <b>Stand out from the competition:</b> A company video helps your
              profile stand out among other employers, making you more memorable
              to potential candidates.
            </li>
            <li>
              <b>Attract top talent:</b> Showcase your company culture and
              values to attract the best candidates who align with your mission
              and vision.
            </li>
            <li>
              <b>Create a positive first impression:</b> A well-crafted video
              can leave a lasting impression on potential employees, making them
              more likely to apply for a job at your company.
            </li>
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="profile-form-grid md:grid-cols-2">
            <fieldset>
              <InputTextWithLabel
                id="profile-creation-company-videoUrl"
                disabled={!session?.user?.employeeIsApproved}
                placeholder="Youtube link url"
                onChange={handleFieldChange}
                value={videoData.videoUrl}
              >
                Youtube Link
              </InputTextWithLabel>
            </fieldset>
          </div>

          <div className="profile-form-progress-btn-group">
            <Button
              pill
              className="custom-outline-btn"
              onClick={() => router.push('/edit-profile/employer/mission')}
            >
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
