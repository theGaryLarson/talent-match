'use client';

import React, { useCallback, useEffect, useState } from 'react';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import { MdAdd } from 'react-icons/md';
import { Button } from 'flowbite-react';
import {
  CertDTO,
  HighestDegreeType,
  JsEducationInfoDTO,
  JsEducationPageDTO,
  ProjectExpDTO,
} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import { v4 as uuidv4 } from 'uuid';
import { SkillDTO } from '@/data/dtos/SkillDTO';
import { useRouter } from 'next/navigation';

import Educations, {
  defaultEducationData,
  EducationData,
} from '@/app/ui/form-field-groups/Educations';
import Licenses, {
  defaultLicenseData,
  LicenseData,
} from '@/app/ui/form-field-groups/Licenses';
import ProjectExperiences, {
  defaultProjectExperienceData,
  ProjectExperienceData,
} from '@/app/ui/form-field-groups/ProjectExperiences';
import { mapToEnumOrThrow } from '@/app/lib/utils';
import { getSession, useSession } from 'next-auth/react';

import { useUpdateSession } from '@/app/lib/auth/useUpdateSession';

interface Data {
  projectExperiences: ProjectExperienceData[];
  licenses: LicenseData[];
  educations: EducationData[];
}

export default function CreateJobseekerProfileEducationPage() {
  const { data: session, update, status } = useSession(); // Use useSession hook and destructure update
  const [data, setData] = useState<Data>({
    projectExperiences: [],
    licenses: [],
    educations: [],
  });
  const router = useRouter();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const updateSessionProperties = useUpdateSession();
  function addNewLicense() {
    const newLicenseData = defaultLicenseData();
    setData({
      ...data,
      licenses: [...data.licenses, newLicenseData],
    });
  }

  function removeLicense(byUid: string) {
    setData({
      ...data,
      licenses: data.licenses.filter(({ uid }) => uid !== byUid),
    });
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
  }

  function removeProjectExperience(byUid: string) {
    setData({
      ...data,
      projectExperiences: data.projectExperiences.filter(
        ({ uid }) => uid !== byUid,
      ),
    });
  }

  function addNewEducation() {
    const newEducationData = defaultEducationData();
    setData({
      ...data,
      educations: [...data.educations, newEducationData],
    });
  }

  function removeEducation(byUid: string) {
    setData({
      ...data,
      educations: data.educations.filter(({ uid }) => uid !== byUid),
    });
  }

  const handleUpdate = useCallback((key: string, value: any) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!session || !session.user.id) {
      console.error('User session is not available.');
      return;
    }
    const userId = session.user.id;
    const form = event.currentTarget as HTMLFormElement;

    const educations: JsEducationInfoDTO[] = data.educations.map(
      (ed: EducationData) => ({
        id: ed.uid,
        edProviderId: ed?.edProviderObject?.id || ed?.edProviderId!,
        edLevel: ed.edLevel,
        edProviderName: ed?.edProviderObject?.name || ed?.edProviderName,
        isEnrolled: ed.isEnrolled,
        startDate: ed.startDate?.toISOString() || '',
        gradDate: ed.gradDate?.toISOString() || '',
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
        certId: cert.uid,
        name: cert.name,
        logoUrl: undefined,
        issuingOrg: cert['issuing-org'],
        credentialId: cert['credential-id'],
        credentialUrl: cert['credential-url'],
        issueDate: cert['issue-date']?.toISOString() || '',
        expiryDate: cert['expiration-date']?.toISOString() || '',
        description: undefined,
      }),
    );

    const projects: ProjectExpDTO[] = data.projectExperiences.map(
      (proj: ProjectExperienceData) => ({
        projectId: proj.uid,
        projTitle: proj.title,
        projectRole: proj['project-role'],
        startDate: proj['starting-date']?.toISOString() || null,
        completionDate: proj['completion-date']?.toISOString() || null,
        problemSolvedDescription: proj['description'],
        teamSize: proj['team-size'].toString(),
        repoUrl: proj['reference-url'],
        videoDemoUrl: undefined,
        skills: proj['skills-stack'],
      }),
    );

    const formData: JsEducationPageDTO = {
      userId: userId,
      highestLevelOfStudy:
        form['profile-creation-education-highest-completed'].value,
      educations: educations,
      certifications: certifications,
      projects: projects,
    };
    console.log(formData);
    await handleApiCall(formData);
  };
  const handleApiCall = async (formData: JsEducationPageDTO) => {
    try {
      const res = await fetch('/api/jobseekers/account/edu-info/upsert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorMessage = await res.text(); // Get the error message from the response
        setError(`Failed to save data:\n${errorMessage}`);
        return; // Exit the function if the response is not ok
      }

      const data = await res.json();
      setResponse(data);
      console.log(JSON.stringify(data, null, 2));
      // Update session with new jobseekerId
      if (session) {
        await updateSessionProperties({
          jobseekerId: data.result.jobseekerId,
        });
        console.log('Session after update:', await getSession());
      }

      router.push('/create-profile/jobseeker/work-experience');
    } catch (err: any) {
      setError(err.message);
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
              options={(Object.values(HighestDegreeType) as string[])
                .filter(
                  (value) =>
                    value !== 'Vocational Qualification / Certification',
                )
                .map((value) => ({ label: value, value }))}
              placeholder="Please select"
              defaultValue=""
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
          <div className="flex profile-form-progress-btn-group">
            <Button
              pill
              color="gray"
              onClick={() => {
                router.push('/create-profile/jobseeker/introduction');
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
