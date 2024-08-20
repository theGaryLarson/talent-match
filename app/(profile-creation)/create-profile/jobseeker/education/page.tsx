'use client';

import React, {useCallback, useState} from 'react';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import {MdAdd} from "react-icons/md";
import {Button, Label, Radio} from "flowbite-react";
import {
    CertDTO,
    SchoolGradeLevel,
    DegreeType,
    EdProgram,
    EducationInfoDTO,
    JsEducationDTO,
    ProjectExpDTO
} from "@/data/dtos/JobSeekerProfileCreationDTOs";
import {v4 as uuidv4} from 'uuid';
import {SkillDTO} from "@/data/dtos/SkillDTO";

import Educations, { defaultEducationData, EducationData } from '@/app/ui/form-field-groups/Educations';
import Licenses, { defaultLicenseData, LicenseData } from '@/app/ui/form-field-groups/Licenses';
import ProjectExperiences, { defaultProjectExperienceData, ProjectExperienceData } from '@/app/ui/form-field-groups/ProjectExperiences';

interface Data {
    projectExperiences: ProjectExperienceData[],
    licenses: LicenseData[],
    educations: EducationData[],
}

export default function CreateJobseekerProfileEducationPage() {
    const [data, setData] = useState<Data>({
      projectExperiences: [],
      licenses: [],
      educations: [],
    });

    const [startDate, setStartDate] = useState("");
    const [completionDate, setCompletionDate] = useState("");
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);


  function addNewLicense() {
    const newLicenseData = defaultLicenseData();
    setData({
      ...data,
      licenses: [...data.licenses, newLicenseData]
    });
  }

  function removeLicense(byUid : number) {
    setData({
      ...data,
      licenses: data.licenses.filter(({uid}) => (uid !== byUid))
    });
  }

  function addNewProjectExperience() {
    const newProjectExperienceData = defaultProjectExperienceData();
    setData({
      ...data,
      projectExperiences: [...data.projectExperiences, newProjectExperienceData]
    });
  }

  function removeProjectExperience(byUid: number) {
    setData({
      ...data,
      projectExperiences: data.projectExperiences.filter(({uid}) => (uid !== byUid))
    });
  }

  function addNewEducation() {
    const newEducationData = defaultEducationData();
    setData({
      ...data,
      educations: [...data.educations, newEducationData]
    });
  }

  function removeEducation(byUid: number) {
    setData({
      ...data,
      educations: data.educations.filter(({uid}) => (uid !== byUid))
    });
  }

  const handleUpdate = useCallback((key:string, value:any) => {
    setData(prevData => ({
      ...prevData,
      [key]: value
    }));
  }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        
        const formDataObj = new FormData(form);
        console.log(data.licenses);
        console.log(data.projectExperiences);
        console.log(Array.from(formDataObj.entries()));
        
        const startDateWithDay = `${startDate}-01`
        const completionDateWithDay = `${completionDate}-01`
        console.log('Date:', new Date('2024-12-1').toISOString());

        const debugUserId = 'ae80e273-2975-4703-a894-f3c1e01428fd' //static
        const debugJobSeekerId = '5e62fbb0-1e3c-4c2c-bb69-672f150e8fe4' //if reseeding needs adjusted

        // Mock data for schools
        const mockSchools: EducationInfoDTO[] = [
            {
                jobseekerEdId: '53d66079-60e2-46a2-9214-e86e2f766734', // not being applied can remove
                edInstitutionId: 'School A',
                institutionName: 'North Seattle College',
                edProgram: EdProgram.College,
                edSystem: undefined,
                isEnrolled: true,
                startDate: new Date('2024-12-1').toISOString(),
                gradDate: new Date('2028-7-1').toISOString(),
                degreeType: DegreeType.BachelorsDegree,
                major: 'Computer Science',
                minor: 'Mathematics',
                description: 'Studied various computer science topics and applied them in practical projects.'
            },
            {
                jobseekerEdId: 'dc9fb674-1e7c-46c3-a3d2-5bc72e5dd4c6', // not being applied can remove
                edInstitutionId: 'School B',
                institutionName: 'CFA PAP',
                edProgram: EdProgram.PreApprenticeship,
                edSystem: 'System ABC',
                isEnrolled: true,
                startDate: new Date('2022-6-1').toISOString(),
                gradDate: new Date('2028-6-1').toISOString(),
                degreeType: DegreeType.None,
                major: undefined,
                minor: undefined,
                description: 'Studied various computer science topics and applied them in practical projects.'
            }
        ];

        // Mock data for certifications
        const mockCertifications: CertDTO[] = [
            {
                certId: '5b97ce22-6f37-4ea1-91c4-9f41e513d8e0',
                name: 'Certified JavaScript Developer',
                logoUrl: '',
                issuingOrg: 'XYZ Institute',
                credentialId: 'CJD-002',
                credentialUrl: 'http://credential.u',
                issueDate: '2023-01-01',
                expiryDate: '2025-01-01',
                description: 'Certification for proficiency in JavaScript programming.'
            }
        ];

        // Mock data for projects
        const mockProjects: ProjectExpDTO[] = [
            {
                projectId: uuidv4(),
                projTitle: 'Web Development Project',
                projectRole: 'backend dev',
                startDate: '2022-01-01',
                completionDate: '2022-06-01',
                problemSolvedDescription: 'Developed a web application using React and Node.js.',
                teamSize: '8',
                demoUrl: 'https:///www.demo.url',
                repoUrl: 'https://www.repo.url',
                skills: [
                    {
                        skill_id: '356e0040-8400-49a0-b772-6f6475776612',
                        skill_name: 'JavaScript',
                        skill_info_url: 'https://lightcast.io/open-skills/skills/KS1200771D9CR9LB4MWW/javascript-programming-language'

                    },
                    {
                        skill_id: '38943cce-679d-408f-9fb1-6d054012e54f',
                        skill_name: '.NET Assemblies',
                        skill_info_url: 'https://lightcast.io/open-skills/skills/KS126XS6CQCFGC3NG79X'
                    }
                ] as SkillDTO[]
            }
        ];

        const formData: JsEducationDTO = {
            userId: debugUserId, // fixme: access user id from state management
            highestLevelOfStudy: form['profile-creation-education-highest-completed'].value,
            educations: mockSchools,
            certifications: mockCertifications,
            projects: mockProjects,
        };
        console.log(formData)
        await handleApiCall(formData);
    };
    const handleApiCall = async (formData: JsEducationDTO) => {
        try {
            const res = await fetch('/api/jobseekers/create-edu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            setResponse(data);
        } catch (err: any) {
            setError(err.message);
        }
    };
    // const setFieldOfStudy = (currentEdProgram: string, form: HTMLFormElement) => {
    //     if (eduProgram === 'None' || eduProgram === 'High School') {
    //         return undefined
    //     }
    //     return form[`profile-creation-education-${currentEdProgram.toLowerCase().trim()}-program`].value
    // }
    // const setHighestLevelOfStudy = (eduProgram: string, form: HTMLFormElement) => {

    // }

    return (
        <main className="flex">
            <aside className="hidden laptop:w-2/5 laptop:block">
            </aside>
            <section className="w-full laptop:w-3/5">
                <ProgressBarFlat progress={2 / 6 * 100} size="sm" color="dark" className="laptop:hidden"/>
                <p>Step 2/6</p>
                <h1>Education</h1>
                <p>* Indicates a required field</p>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>
                            <h2>Highest Education</h2>
                        </legend>
                        <SelectOptionsWithLabel
                            id="profile-creation-education-highest-completed"
                            className="w-full"
                            options={[

                                {label: "High school", value: "High school"},
                                {label: "Associate's degree", value: "Associate's degree"},
                                {label: "Bachelor's degree", value: "Bachelor's degree"},
                                {label: "Master's degree", value: "Master's degree"},
                                {label: "Doctoral degree", value: "Doctoral degree"},
                            ]}
                            placeholder="Please select"
                            required
                        >
                            What is your highest completed level of study? *
                        </SelectOptionsWithLabel>
                    </fieldset>
                    <fieldset>
                        <legend>
                            <h2>Educations</h2>
                        </legend>
                        <Educations data={data.educations} onUpdate={handleUpdate} onRemove={removeEducation} />
                        <Button pill color="gray" onClick={addNewEducation}>
                            <MdAdd className="mr-2 h-5 w-5"/>
                            Add education
                        </Button>
                    </fieldset>
                    <fieldset className="license-groups">
                        <legend><h2>Licenses &amp; certificates</h2></legend>
                        <Licenses data={data.licenses} onUpdate={handleUpdate} onRemove={removeLicense} />
                        <Button pill color="gray" onClick={addNewLicense}>
                            <MdAdd className="mr-2 h-5 w-5"/>
                            Add license
                        </Button>
                    </fieldset>
                    <fieldset className="project-experience-groups">
                        <legend><h2>Project experience</h2></legend>
                        <ProjectExperiences data={data.projectExperiences} onUpdate={handleUpdate} onRemove={removeProjectExperience} />
                        <Button pill color="gray" onClick={addNewProjectExperience}>
                            <MdAdd className="mr-2 h-5 w-5"/>
                            Add project experience
                        </Button>
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