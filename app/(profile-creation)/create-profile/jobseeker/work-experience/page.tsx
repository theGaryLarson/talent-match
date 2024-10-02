'use client';

import React, { useCallback, useEffect, useState } from 'react';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import { MdAdd } from 'react-icons/md';
import { Button, Label } from 'flowbite-react';
import { Radio, RadioGroup } from '@mui/material';
import InputTextWithLabel from '../../../../ui/components/InputTextWithLabel';
import WorkExperiences, {
  defaultWorkExperienceData,
  WorkExperienceData,
} from '@/app/ui/form-field-groups/WorkExperiences';
import InternshipExperiences, {
  defaultInternshipExperienceData,
  InternshipExperienceData,
} from '@/app/ui/form-field-groups/InternshipExperiences';
import { JsWorkExpDTO } from '@/data/dtos/JobSeekerProfileCreationDTOs';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/jobseekerStore';
import {
  initialState,
  setWorkExperience,
} from '@/lib/features/profileCreation/jobseekerSlice';
import dayjs, { Dayjs } from 'dayjs';
import _ from 'lodash';
import { devLog } from '@/app/lib/utils';

interface Data {
  yearsWorkExperience: string | number;
  monthsInternshipExperience: string | number;
  workExperiences: WorkExperienceData[];
  internshipExperiences: WorkExperienceData[];
  isAuthorizedToWorkUsa?: boolean;
  requiresSponsorship?: boolean;
}

export default function CreateJobseekerProfileWorkExperiencePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const workExperienceStoreData = useSelector(
    (state: RootState) => state.jobseeker.workExperience,
  );
  let workExperienceData = { ...workExperienceStoreData };
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState<Data>({
    yearsWorkExperience: workExperienceData.yearsWorkExperience,
    monthsInternshipExperience:
      workExperienceData.monthsInternshipExperience ?? '',
    workExperiences:
      workExperienceData.workExperiences
        ?.filter((exp) => !exp.isInternship)
        .map(
          (exp): WorkExperienceData => ({
            workId: exp.workId,
            company: exp.company,
            sectorObject: {
              industry_sector_id: exp.sectorId ?? '',
              sector_title: '',
            },
            techAreaObject: { id: exp.techAreaId ?? '', title: '' },
            jobTitle: exp.jobTitle,
            startDate: dayjs(exp.startDate),
            endDate: dayjs(exp.endDate),
            isCurrentJob: exp.isCurrentJob,
            responsibilities: exp.responsibilities,
          }),
        ) ?? [],
    internshipExperiences:
      workExperienceData.workExperiences
        ?.filter((exp) => exp.isInternship)
        .map(
          (exp): WorkExperienceData => ({
            workId: exp.workId,
            company: exp.company,
            sectorObject: {
              industry_sector_id: exp.sectorId ?? '',
              sector_title: '',
            },
            techAreaObject: { id: exp.techAreaId ?? '', title: '' },
            jobTitle: exp.jobTitle,
            startDate: dayjs(exp.startDate),
            endDate: dayjs(exp.endDate),
            isCurrentJob: exp.isCurrentJob,
            responsibilities: exp.responsibilities,
          }),
        ) ?? [],
    isAuthorizedToWorkUsa: workExperienceData.isAuthorizedToWorkUsa,
    requiresSponsorship: workExperienceData.requiresSponsorship,
  });

  function addNewWorkExperience() {
    const newWorkExperienceData = defaultWorkExperienceData();
    setData({
      ...data,
      workExperiences: [...data.workExperiences, newWorkExperienceData],
    });
  }

  function removeWorkExperience(byUid: string) {
    setData({
      ...data,
      workExperiences: data.workExperiences.filter(
        ({ workId: uid }) => uid !== byUid,
      ),
    });
  }

  function addNewInternshipExperience() {
    const newInternshipExperienceData = defaultWorkExperienceData();
    setData({
      ...data,
      internshipExperiences: [
        ...data.internshipExperiences,
        newInternshipExperienceData,
      ],
    });
  }

  function removeInternshipExperience(byUid: string) {
    setData({
      ...data,
      internshipExperiences: data.internshipExperiences.filter(
        ({ workId: uid }) => uid !== byUid,
      ),
    });
  }

  const handleUpdate = useCallback((key: string, value: any) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  }, []);

  const handleInputUpdate = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type } = event.target;
      setData((prevData) => ({
        ...prevData,
        [name]: type === 'radio' ? value === 'yes' : value, // setting boolean values for radio type
      }));
    },
    [],
  );

  useEffect(() => {
    if (session?.user?.id && status === 'authenticated') {
      const initializeFormFields = async () => {
        if (_.isEqual(workExperienceStoreData, initialState.workExperience)) {
          const { id } = session.user;

          try {
            devLog('fetching fresh');
            const response = await fetch(
              '/api/jobseekers/account/work-info/get/' + id,
            );

            if (!response.ok) {
              workExperienceData.userId = id!;
            } else {
              let fetchedData: JsWorkExpDTO = (await response.json()).result;
              workExperienceData = {
                ...fetchedData,
              };
            }

            setData({
              yearsWorkExperience: workExperienceData.yearsWorkExperience,
              monthsInternshipExperience:
                workExperienceData.monthsInternshipExperience ?? '',
              workExperiences:
                workExperienceData.workExperiences
                  ?.filter((exp) => !exp.isInternship)
                  .map(
                    (exp): WorkExperienceData => ({
                      workId: exp.workId,
                      company: exp.company,
                      sectorObject: {
                        industry_sector_id: exp.sectorId ?? '',
                        sector_title: '',
                      },
                      techAreaObject: { id: exp.techAreaId ?? '', title: '' },
                      jobTitle: exp.jobTitle,
                      startDate: dayjs(exp.startDate),
                      endDate: exp.endDate ? dayjs(exp.endDate) : null,
                      isCurrentJob: exp.isCurrentJob,
                      responsibilities: exp.responsibilities,
                    }),
                  ) ?? [],
              internshipExperiences:
                workExperienceData.workExperiences
                  ?.filter((exp) => exp.isInternship)
                  .map(
                    (exp): WorkExperienceData => ({
                      workId: exp.workId,
                      company: exp.company,
                      sectorObject: {
                        industry_sector_id: exp.sectorId ?? '',
                        sector_title: '',
                      },
                      techAreaObject: { id: exp.techAreaId ?? '', title: '' },
                      jobTitle: exp.jobTitle,
                      startDate: dayjs(exp.startDate),
                      endDate: exp.endDate ? dayjs(exp.endDate) : null,
                      isCurrentJob: exp.isCurrentJob,
                      responsibilities: exp.responsibilities,
                    }),
                  ) ?? [],
              isAuthorizedToWorkUsa: workExperienceData.isAuthorizedToWorkUsa,
              requiresSponsorship: workExperienceData.requiresSponsorship,
            });
          } catch (error) {
            console.error(error);
          }
        } else {
          devLog('fetching from store');
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

    const userId = session.user.id!;
    const jobseekerId = session.user.jobseekerId!;
    devLog(data.workExperiences);
    // TODO: industry sector and tech-area look ups being set with redux store values
    const workExperiences = data.workExperiences?.map((workExp) => ({
      workId: workExp.workId, //fixme: generate uuid on the backend or is this fine?
      jobseekerId: jobseekerId,
      techAreaId: workExp.techAreaObject.id,
      sectorId: workExp.sectorObject.industry_sector_id,
      company: workExp.company,
      isInternship: false,
      jobTitle: workExp.jobTitle,
      isCurrentJob: workExp.isCurrentJob,
      startDate: new Date(workExp.startDate!.toISOString()),
      endDate: workExp.endDate
        ? new Date(workExp.endDate?.toISOString())
        : null,
      responsibilities: workExp.responsibilities,
    }));

    const internshipExperiences = data.internshipExperiences?.map(
      (internshipExp) => ({
        workId: internshipExp.workId,
        jobseekerId: jobseekerId,
        techAreaId: internshipExp.techAreaObject.id,
        sectorId: internshipExp.sectorObject.industry_sector_id,
        company: internshipExp.company,
        isInternship: true,
        jobTitle: internshipExp.jobTitle,
        isCurrentJob: internshipExp.isCurrentJob,
        startDate: new Date(internshipExp.startDate!.toISOString()),
        endDate: internshipExp.endDate
          ? new Date(internshipExp.endDate?.toISOString())
          : null,
        responsibilities: internshipExp.responsibilities,
      }),
    );

    workExperienceData.userId = userId;
    workExperienceData.yearsWorkExperience =
      data.yearsWorkExperience.toString(); // Replace with actual calculation
    workExperienceData.monthsInternshipExperience =
      data.monthsInternshipExperience.toString(); // Replace with actual calculation
    workExperienceData.isAuthorizedToWorkUsa = data.isAuthorizedToWorkUsa;
    workExperienceData.requiresSponsorship = data.requiresSponsorship;
    workExperienceData.workExperiences = [
      ...workExperiences,
      ...internshipExperiences,
    ];

    try {
      const response = await fetch('/api/jobseekers/account/work-info/upsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workExperienceData),
      });

      if (response.ok) {
        dispatch(setWorkExperience(workExperienceData));
      } else {
        const errorMessage = `Failed to submit work experiences. Status: ${response.status} - ${response.statusText}`;
        setError(errorMessage);
      }

      const result = await response.json();
      router.push('/create-profile/jobseeker/showcase');
    } catch (e: any) {
      setError(`An unexpected error occurred: ${e.message}`);
    }
  }

  return (
    <main className="flex justify-center">
      <aside className="profile-form-aside"></aside>
      <section className="profile-form-section">
        <ProgressBarFlat progress={(3 / 6) * 100} size="sm" />
        <p>Step 3/6</p>
        <h1>Work experience</h1>
        <p className="subtitle">* Indicates a required field</p>
        <form onSubmit={handleSubmit}>
          <fieldset className="work-experience-groups">
            <legend>
              <h2>Work experience</h2>
            </legend>
            {data.workExperiences.length === 0 ? (
              ''
            ) : (
              <div className="profile-form-grid">
                <InputTextWithLabel
                  type="number"
                  id="profile-creation-experience-work-fulltime-years"
                  name="yearsWorkExperience"
                  value={data.yearsWorkExperience + ''}
                  onChange={handleInputUpdate}
                >
                  How many years of full-time work experience do you have (not
                  including internship)?
                </InputTextWithLabel>
              </div>
            )}
            <WorkExperiences
              data={data.workExperiences}
              onUpdate={handleUpdate}
              onRemove={removeWorkExperience}
            />
            <Button
              pill
              className="custom-outline-btn"
              onClick={addNewWorkExperience}
            >
              <MdAdd className="mr-2 h-5 w-5" />
              Add work experience
            </Button>
          </fieldset>
          <fieldset className="internship-experience-groups">
            <legend>
              <h2>Internship experience</h2>
            </legend>
            {data.internshipExperiences.length === 0 ? (
              ''
            ) : (
              <div className="profile-form-grid">
                <InputTextWithLabel
                  type="number"
                  id="profile-creation-experience-internship-months"
                  name="monthsInternshipExperience"
                  onChange={handleInputUpdate}
                  value={data.monthsInternshipExperience + ''}
                >
                  How many months of internship work experience do you have?
                </InputTextWithLabel>
              </div>
            )}
            <InternshipExperiences
              data={data.internshipExperiences as InternshipExperienceData[]}
              onUpdate={handleUpdate}
              onRemove={removeInternshipExperience}
            />
            <Button
              pill
              className="custom-outline-btn"
              onClick={addNewInternshipExperience}
            >
              <MdAdd className="mr-2 h-5 w-5" />
              Add internship experience
            </Button>
          </fieldset>
          <fieldset>
            <legend>
              <h2>Authentication</h2>
            </legend>
            <p>
              Note: All work authentication information you provide will only be
              used for the purpose of verifying your qualifications for this job
              application and will not be disclosed to public view or any third
              parties without your express consent.
            </p>
            <div>
              <div className="mt-3">
                Are you authorized to work in the U.S.? *
              </div>
              <RadioGroup>
                <Label className="block">
                  <Radio
                    name="isAuthorizedToWorkUsa"
                    value="yes"
                    onChange={handleInputUpdate}
                    checked={
                      typeof data.isAuthorizedToWorkUsa === 'boolean'
                        ? data.isAuthorizedToWorkUsa
                        : false
                    }
                    required
                  />{' '}
                  Yes
                </Label>
                <Label className="block">
                  <Radio
                    name="isAuthorizedToWorkUsa"
                    value="no"
                    onChange={handleInputUpdate}
                    checked={
                      typeof data.isAuthorizedToWorkUsa === 'boolean'
                        ? !data.isAuthorizedToWorkUsa
                        : false
                    }
                    required
                  />{' '}
                  No
                </Label>
              </RadioGroup>
            </div>
            <div>
              <h3 className="alert-title">United States of America</h3>
              <p>
                Will you, now or in the future, require sponsorship for
                employment visa status? *
              </p>
              <RadioGroup>
                <Label className="block">
                  <Radio
                    name="requiresSponsorship"
                    value="yes"
                    onChange={handleInputUpdate}
                    checked={
                      typeof data.requiresSponsorship === 'boolean'
                        ? data.requiresSponsorship
                        : false
                    }
                    required
                  />{' '}
                  Yes
                </Label>
                <Label className="block">
                  <Radio
                    name="requiresSponsorship"
                    value="no"
                    onChange={handleInputUpdate}
                    checked={
                      typeof data.requiresSponsorship === 'boolean'
                        ? !data.requiresSponsorship
                        : false
                    }
                    required
                  />{' '}
                  No
                </Label>
              </RadioGroup>
            </div>
          </fieldset>
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
