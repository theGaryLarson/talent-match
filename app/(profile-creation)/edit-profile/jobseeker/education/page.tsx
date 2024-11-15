'use client';

import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import { MdAdd } from 'react-icons/md';
import { Button } from 'flowbite-react';
import {
  CertDTO,
  HighestCompletedEducationLevel,
  EducationLevel,
  JsEducationInfoDTO,
  JsEducationPageDTO,
  ProjectExpDTO,
  PreAEduSystem,
  CollegeDegreeType,
  HighSchoolDegreeType,
} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import { v4 as uuidv4 } from 'uuid';
import { SkillDTO } from '@/data/dtos/SkillDTO';
import { useRouter } from 'next/navigation';

import Educations, {
  defaultEducationData,
  EducationData,
} from './form-field-groups/Educations';
import Licenses, {
  defaultLicenseData,
  LicenseData,
} from './form-field-groups/Licenses';
import ProjectExperiences, {
  defaultProjectExperienceData,
  ProjectExperienceData,
} from './form-field-groups/ProjectExperiences';
import { devLog, mapToEnum, mapToEnumOrThrow } from '@/app/lib/utils';
import { getSession, useSession } from 'next-auth/react';
import { useUpdateSession } from '@/app/lib/auth/useUpdateSession';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/jobseekerStore';
import {
  initialState,
  setEducation,
} from '@/lib/features/profileCreation/jobseekerSlice';
import {
  setPageDirty,
  setPageSaved,
} from '@/lib/features/profileCreation/saveSlice';
import dayjs, { Dayjs } from 'dayjs';
import _ from 'lodash';

interface Data {
  projectExperiences: ProjectExperienceData[];
  licenses: LicenseData[];
  educations: EducationData[];
}

export default function CreateJobseekerProfileEducationPage() {
  const router = useRouter();
  const { data: session, update, status } = useSession(); // Use useSession hook and destructure update
  const updateSessionProperties = useUpdateSession();
  const dispatch = useDispatch();
  const educationStoreData = useSelector(
    (state: RootState) => state.jobseeker.education,
  );
  let educationData = { ...educationStoreData };
  const [error, setError] = useState<string | null>(null);

  const [highestLevelOfStudy, setHighestLevelOfStudy] = useState(
    educationData.highestLevelOfStudy,
  );
  const [data, setData] = useState<Data>({
    projectExperiences: educationData.projects.map(
      (project): ProjectExperienceData => ({
        projectId: project.projectId,
        projectTitle: project.projTitle,
        projectRole: project.projectRole,
        startDate: dayjs(project.startDate),
        completionDate: dayjs(project.completionDate),
        reference: project.repoUrl ?? '',
        problemSolvedDescription: project.problemSolvedDescription,
        teamSize: project.teamSize,
        skills: project.skills,
        fetchedSkills: project.skills,
      }),
    ),
    licenses: educationData.certifications.map(
      (cert): LicenseData => ({
        certId: cert.certId,
        name: cert.name,
        issuingOrg: cert.issuingOrg,
        credentialId: cert.credentialId ?? '',
        credentialUrl: cert.credentialUrl ?? '',
        issueDate: dayjs(cert.issueDate),
        expiryDate: dayjs(cert.expiryDate),
      }),
    ),
    educations: educationData.educations.map(
      (education: JsEducationInfoDTO): EducationData => ({
        id: education.id,
        edLevel: education.edLevel ?? EducationLevel.Unselected,
        edProviderObject: {
          id: education.edProviderId ?? '',
          name: education.edProviderName ?? '',
        },
        edProviderId: education.edProviderId,
        edProviderName: education.edProviderName ?? '',
        isEnrolled: education.isEnrolled,
        enrollmentStatus: education.enrollmentStatus,
        startDate: dayjs(education.startDate),
        gradDate: dayjs(education.gradDate),
        degreeType:
          mapToEnum(education.degreeType ?? null, HighSchoolDegreeType) ??
          mapToEnumOrThrow(education.degreeType ?? null, CollegeDegreeType),
        programObject: {
          id: education.programId,
          title: education.programName,
        },
        programName: education.programName,
        programId: education.programId,
        preAppEdSystem: education.preAppEdSystem,
        description: education.description,
        gpa: education.gpa,
        isTechDegree: undefined,
      }),
    ),
  });

  function handleLevelOfStudy(event: ChangeEvent<HTMLSelectElement>) {
    setHighestLevelOfStudy(
      mapToEnumOrThrow(event.target.value, HighestCompletedEducationLevel),
    );
    dispatch(setPageDirty('education'));
  }

  function addNewLicense() {
    const newLicenseData = defaultLicenseData();
    setData({
      ...data,
      licenses: [...data.licenses, newLicenseData],
    });
    dispatch(setPageDirty('education'));
  }

  function removeLicense(byUid: string) {
    setData({
      ...data,
      licenses: data.licenses.filter(({ certId: uid }) => uid !== byUid),
    });
    dispatch(setPageDirty('education'));
  }

  function addNewProjectExperience() {
    const newProjectExperienceData = defaultProjectExperienceData();
    setData({
      ...data,
      projectExperiences: [
        ...data.projectExperiences,
        newProjectExperienceData,
      ],
    });
    dispatch(setPageDirty('education'));
  }

  function removeProjectExperience(byUid: string) {
    setData({
      ...data,
      projectExperiences: data.projectExperiences.filter(
        ({ projectId: uid }) => uid !== byUid,
      ),
    });
    dispatch(setPageDirty('education'));
  }

  function addNewEducation() {
    const newEducationData = defaultEducationData();
    setData({
      ...data,
      educations: [...data.educations, newEducationData],
    });
    dispatch(setPageDirty('education'));
  }

  function removeEducation(byUid: string) {
    setData({
      ...data,
      educations: data.educations.filter(({ id: uid }) => uid !== byUid),
    });
    dispatch(setPageDirty('education'));
  }

  const handleUpdate = useCallback((key: string, value: any) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
    dispatch(setPageDirty('education'));
  }, []);

  useEffect(() => {
    if (session?.user?.id && status === 'authenticated') {
      const initializeFormFields = async () => {
        if (_.isEqual(educationStoreData, initialState.education)) {
          const { id, jobseekerId } = session.user;

          try {
            devLog('fetching fresh');
            const response = await fetch(
              '/api/jobseekers/account/edu-info/get/' + id,
            );

            if (!response.ok) {
              educationData.userId = id!;
              educationData.jobseekerId = jobseekerId!;
            } else {
              let fetchedData: JsEducationPageDTO = (await response.json())
                .result;
              educationData.userId = id!;
              educationData.jobseekerId = jobseekerId!;
              if (fetchedData.highestLevelOfStudy) {
                educationData.highestLevelOfStudy =
                  fetchedData.highestLevelOfStudy;
                setHighestLevelOfStudy(educationData.highestLevelOfStudy);
              }
              if (fetchedData.educations?.length !== 0) {
                educationData.educations = fetchedData.educations;
              }
              if (fetchedData.projects?.length !== 0) {
                educationData.projects = fetchedData.projects;
              }
              if (fetchedData.certifications?.length !== 0) {
                educationData.certifications = fetchedData.certifications;
              }

              setData({
                ...data,
                educations: [
                  ...data.educations,
                  ...educationData.educations.map(
                    (education): EducationData => ({
                      id: education.id,
                      edLevel: education.edLevel ?? EducationLevel.Unselected,
                      edProviderObject: {
                        id: education.edProviderId ?? '',
                        name: education.edProviderName ?? '',
                      },
                      edProviderId: education.edProviderId,
                      edProviderName: education.edProviderName ?? '',
                      isEnrolled: education.isEnrolled,
                      enrollmentStatus: education.enrollmentStatus,
                      startDate: dayjs(education.startDate),
                      gradDate: dayjs(education.gradDate),
                      degreeType:
                        mapToEnum(
                          education.degreeType ?? null,
                          HighSchoolDegreeType,
                        ) ??
                        mapToEnumOrThrow(
                          education.degreeType ?? null,
                          CollegeDegreeType,
                        ),
                      programObject: {
                        id: education.programId,
                        title: education.programName,
                      },
                      programName: education.programName,
                      programId: education.programId,
                      preAppEdSystem: education.preAppEdSystem,
                      description: education.description,
                      gpa: education.gpa,
                      isTechDegree: undefined,
                    }),
                  ),
                ],
                projectExperiences: [
                  ...data.projectExperiences,
                  ...educationData.projects.map(
                    (project): ProjectExperienceData => ({
                      projectId: project.projectId,
                      projectTitle: project.projTitle,
                      projectRole: project.projectRole,
                      startDate: dayjs(project.startDate),
                      completionDate: dayjs(project.completionDate),
                      reference: project.repoUrl ?? '',
                      problemSolvedDescription:
                        project.problemSolvedDescription,
                      teamSize: project.teamSize,
                      skills: project.skills,
                      fetchedSkills: project.skills,
                    }),
                  ),
                ],
                licenses: [
                  ...data.licenses,
                  ...educationData.certifications.map(
                    (cert): LicenseData => ({
                      certId: cert.certId,
                      name: cert.name,
                      issuingOrg: cert.issuingOrg,
                      credentialId: cert.credentialId ?? '',
                      credentialUrl: cert.credentialUrl ?? '',
                      issueDate: dayjs(cert.issueDate),
                      expiryDate: dayjs(cert.expiryDate),
                    }),
                  ),
                ],
              });
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          devLog('fetching from store');
        }
      };
      dispatch(setPageSaved('education'));
      initializeFormFields();
    }
  }, [session?.user?.id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!session?.user?.id) {
      console.error('User session is not available.');
      return;
    }

    const userId = session.user.id;
    const form = event.currentTarget as HTMLFormElement;

    const educations: JsEducationInfoDTO[] = data.educations.map(
      (ed: EducationData) => ({
        id: ed.id,
        edProviderId: ed?.edProviderObject?.id || ed?.edProviderId!,
        edLevel: ed.edLevel,
        edProviderName: ed?.edProviderObject?.name || ed?.edProviderName,
        isEnrolled: ed.isEnrolled,
        enrollmentStatus: ed.enrollmentStatus ?? undefined,
        startDate: ed.startDate?.toISOString() ?? '',
        gradDate: ed.gradDate?.toISOString() ?? '',
        degreeType: ed.degreeType || undefined,
        programId: ed?.programObject?.id || ed?.programId!, // Note: no rel with provider_programs pulled from a separate programs table.
        programName: ed?.programObject?.title || ed.programName,
        gpa: ed?.gpa,
        preAppEdSystem: ed.preAppEdSystem || null,
        description: ed.description || null,
        isTechnicalDegree: ed.isTechDegree || false,
      }),
    );

    const certifications: CertDTO[] = data.licenses.map(
      (cert: LicenseData) => ({
        certId: cert.certId,
        name: cert.name,
        logoUrl: undefined,
        issuingOrg: cert.issuingOrg,
        credentialId: cert.credentialId,
        credentialUrl: cert.credentialUrl,
        issueDate: cert.issueDate?.toISOString() ?? '',
        expiryDate: cert.expiryDate?.toISOString() ?? '',
        description: undefined,
      }),
    );

    const projects: ProjectExpDTO[] = data.projectExperiences.map(
      (proj: ProjectExperienceData) => ({
        projectId: proj.projectId,
        projTitle: proj.projectTitle,
        projectRole: proj.projectRole,
        startDate: proj.startDate?.toISOString() ?? '',
        completionDate: proj.completionDate?.toISOString() ?? '',
        problemSolvedDescription: proj.problemSolvedDescription,
        teamSize: proj.teamSize,
        repoUrl: proj.reference,
        videoDemoUrl: undefined,
        skills: proj.skills,
      }),
    );

    educationData = {
      ...educationData,
      userId: userId,
      highestLevelOfStudy: highestLevelOfStudy,
      educations: educations,
      certifications: certifications,
      projects: projects,
    };

    await handleApiCall(educationData);
  };

  const handleApiCall = async (educationData: JsEducationPageDTO) => {
    try {
      const response = await fetch('/api/jobseekers/account/edu-info/upsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(educationData),
      });

      if (response.ok) {
        const data = await response.json();
        devLog(JSON.stringify(data, null, 2));

        dispatch(setPageSaved('education'));
        dispatch(setEducation(educationData));

        router.push('/edit-profile/jobseeker/work-experience');
      } else {
        const errorMessage = await response.text(); // Get the error message from the response
        setError(`Failed to save data:\n${errorMessage}`);
      }
    } catch (e: any) {
      setError(`An unexpected error occurred: ${e.message}`);
    }
  };

  return (
    <main className="flex justify-center">
      <aside className="profile-form-aside"></aside>
      <section className="profile-form-section">
        <ProgressBarFlat progress={(2 / 6) * 100} size="sm" />
        <p>Step 2/6</p>
        <h1>Education</h1>
        <p className="subtitle">* Indicates a required field</p>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              <h2>Highest Education</h2>
            </legend>
            <SelectOptionsWithLabel
              id="profile-creation-education-highest-completed"
              className="w-full"
              options={(
                Object.values(HighestCompletedEducationLevel) as string[]
              )
                .filter(
                  (value) => value !== 'Certificate (less than two years)', // TODO: review to see if needs included for WJI grant reporting.
                )
                .map((value) => ({ label: value, value }))}
              placeholder="Please select"
              onChange={handleLevelOfStudy}
              value={highestLevelOfStudy}
              required
            >
              What is your highest completed level of study? *
            </SelectOptionsWithLabel>
          </fieldset>
          <fieldset>
            <legend>
              <h2>Educations</h2>
            </legend>
            <Educations
              data={data.educations}
              onUpdate={handleUpdate}
              onRemove={removeEducation}
            />
            <Button pill color="gray" onClick={addNewEducation}>
              <MdAdd className="mr-2 h-5 w-5" />
              Add education
            </Button>
          </fieldset>
          <fieldset className="license-groups">
            <legend>
              <h2>Licenses &amp; certificates</h2>
            </legend>
            <Licenses
              data={data.licenses}
              onUpdate={handleUpdate}
              onRemove={removeLicense}
            />
            <Button pill color="gray" onClick={addNewLicense}>
              <MdAdd className="mr-2 h-5 w-5" />
              Add license
            </Button>
          </fieldset>
          <fieldset className="project-experience-groups">
            <legend>
              <h2>Project experience</h2>
            </legend>
            <ProjectExperiences
              data={data.projectExperiences}
              onUpdate={handleUpdate}
              onRemove={removeProjectExperience}
            />
            <Button pill color="gray" onClick={addNewProjectExperience}>
              <MdAdd className="mr-2 h-5 w-5" />
              Add project experience
            </Button>
          </fieldset>
          <div className="profile-form-progress-btn-group flex">
            <Button
              pill
              color="gray"
              onClick={() => {
                router.push('/edit-profile/jobseeker/introduction');
              }}
            >
              Previous{' '}
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
