'use client';

import React, {useState} from 'react';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import {MdAdd} from "react-icons/md";
import {Button, Label, Radio} from "flowbite-react";
import {
    CertDTO,
    CurrentGrade,
    DegreeType,
    EdProgram,
    EducationInfoDTO,
    JsEducationDTO,
    ProjectExpDTO
} from "@/data/dtos/JobSeekerProfileCreationDTOs";
import {v4 as uuidv4} from 'uuid';
import {SkillDTO} from "@/data/dtos/SkillDTO";


import LicenseGroup, { defaultLicenseGroupData, extractLicenseGroups } from '@/app/ui/form-field-groups/LicenseGroup';
import ProjectExperienceGroup, { defaultProjectExperienceGroupData, extractProjectExperienceGroups } from '@/app/ui/form-field-groups/ProjectExperienceGroup';

type LicenseGroupsTuple = [React.ReactNode, number];
type ProjectExperienceGroupsTuple = [React.ReactNode, number];
export default function CreateJobseekerProfileEducationPage() {
    const [eduProgram, setEduProgram] = useState("");
    const [licenseGroups, setLicenseGroups] = useState<LicenseGroupsTuple[]>([]);
    const [projectExperienceGroups, setProjectExperienceGroups] = useState<ProjectExperienceGroupsTuple[]>([]);
    const [startDate, setStartDate] = useState("");
    const [completionDate, setCompletionDate] = useState("");
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);


  function addNewLicenseGroup() {
    const newGroupData = defaultLicenseGroupData();
    setLicenseGroups((prevGroups) => [
      ...prevGroups,
      [
        <LicenseGroup key={newGroupData.uid} groupData={newGroupData} onRemove={()=>removeLicenseGroup(newGroupData.uid)} />,
        newGroupData.uid
      ]
    ]);
  }

  function removeLicenseGroup(byUid : number) {
    setLicenseGroups((prevGroups) => {
      const updatedGroups = prevGroups.filter(([, uid]) => (uid !== byUid));
      return updatedGroups;
    })
  }

  function addNewProjectExperienceGroup() {
    const newGroupData = defaultProjectExperienceGroupData();
    setProjectExperienceGroups((prevGroups) => [
      ...prevGroups,
      [
        <ProjectExperienceGroup key={newGroupData.uid} groupData={newGroupData} onRemove={()=>removeProjectExperienceGroup(newGroupData.uid)} />,
        newGroupData.uid
      ]
    ]);
  }

  function removeProjectExperienceGroup(byUid : number) {
    setProjectExperienceGroups((prevGroups) => {
      const updatedGroups = prevGroups.filter(([, uid]) => (uid !== byUid));
      return updatedGroups;
    })
  }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        
        const formDataObj = new FormData(form);
        const [extractedLicenseData, remainingFormData] = extractLicenseGroups(Array.from(formDataObj.entries()));
        const [extractedProjectExperienceData, remainingFormData2] = extractProjectExperienceGroups(remainingFormData);
        console.log(extractedLicenseData);
        console.log(extractedProjectExperienceData);
        console.log(remainingFormData2);
        
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
                jobSeekerId: debugJobSeekerId,
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
                jobseekerId: debugJobSeekerId,
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
            currentEdProgram: EdProgram.College,
            highestLevelOfStudy: form['profile-creation-education-highest-completed'].value,
            currentGrade: CurrentGrade.Junior,
            isEnrolledEdProgram: EdProgram.College === eduProgram || EdProgram.HighSchool === eduProgram,
            schools: mockSchools,
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
    const setFieldOfStudy = (currentEdProgram: string, form: HTMLFormElement) => {
        if (eduProgram === 'None' || eduProgram === 'High School') {
            return undefined
        }
        return form[`profile-creation-education-${currentEdProgram.toLowerCase().trim()}-program`].value
    }
    const setHighestLevelOfStudy = (eduProgram: string, form: HTMLFormElement) => {

    }

    return (
        <main className="flex">
            <aside className="hidden lg:w-2/5 lg:block">
            </aside>
            <section className="w-full lg:w-3/5">
                <ProgressBarFlat progress={2 / 6 * 100} size="sm" color="dark" className="lg:hidden"/>
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
                            <h2>Current educations</h2>
                        </legend>
                        <div>
                            What is your currently enrolled in Ed program? *
                            <Label className="block">
                                <Radio
                                    name="profile-creation-education-currently-enrolled"
                                    onClick={() => setEduProgram("None")}
                                    required
                                />
                                None
                            </Label>
                            <Label className="block">
                                <Radio
                                    name="profile-creation-education-currently-enrolled"
                                    onClick={() => setEduProgram("High school")}
                                    required
                                />
                                High school
                            </Label>
                            <Label className="block">
                                <Radio
                                    name="profile-creation-education-currently-enrolled"
                                    onClick={() => setEduProgram("College")}
                                    required
                                />
                                College
                            </Label>
                            <Label className="block">
                                <Radio
                                    name="profile-creation-education-currently-enrolled"
                                    onClick={() => setEduProgram("Training program/bootcamp")}
                                    required
                                />
                                Training program/bootcamp
                            </Label>
                            <Label className="block">
                                <Radio
                                    name="profile-creation-education-currently-enrolled"
                                    onClick={() => setEduProgram("Pre-apprenticeship")}
                                    required
                                />
                                Pre-apprenticeship
                            </Label>
                            <Label className="block">
                                <Radio
                                    name="profile-creation-education-currently-enrolled"
                                    onClick={() => setEduProgram("Other")}
                                    required
                                />
                                Other
                            </Label>
                        </div>
                        {
                            (eduProgram !== "High school") ? "" :
                                <div id="profile-creation-education-high-school-fields">
                                    <SelectOptionsWithLabel
                                        id="profile-creation-education-high-school-name"
                                        className="w-full"
                                        options={[
                                            {label: "School A", value: "School A"},
                                            {label: "School B", value: "School B"},
                                            {label: "School C", value: "School C"},
                                        ]}
                                        placeholder="School name"
                                        required
                                    >
                                        What is your school? *
                                    </SelectOptionsWithLabel>
                                    <div className="flex">
                                        <InputTextWithLabel
                                            type="month"
                                            id="profile-creation-education-high-school-starting-date"
                                            className="w-1/2"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            required
                                        >
                                            Starting date *
                                        </InputTextWithLabel>
                                        <InputTextWithLabel
                                            type="month"
                                            id="profile-creation-education-high-school-completion-date"
                                            className="w-1/2"
                                            value={completionDate}
                                            onChange={(e) => setCompletionDate(e.target.value)}
                                            required
                                        >
                                            Completion date *
                                        </InputTextWithLabel>
                                    </div>
                                    <SelectOptionsWithLabel
                                        id="profile-creation-education-high-school-grade"
                                        className="w-full"
                                        options={[
                                            {label: "Freshman", value: "Freshman"},
                                            {label: "Sophomore", value: "Sophomore"},
                                            {label: "Junior", value: "Junior"},
                                            {label: "Senior", value: "Senior"},
                                        ]}
                                        placeholder="Please select your current grade"
                                        required
                                    >
                                        What is your grade? *
                                    </SelectOptionsWithLabel>
                                    <InputTextWithLabel
                                        type="number"
                                        id="profile-creation-education-high-school-gpa"
                                        className="w-full"
                                        required
                                    >
                                        What is your cumulative GPA? *
                                    </InputTextWithLabel>
                                </div>
                        }
                        {
                            (eduProgram !== "College") ? "" :
                                <div id="profile-creation-education-college-fields">
                                    <SelectOptionsWithLabel
                                        id="profile-creation-education-college-name"
                                        className="w-full"
                                        options={[
                                            {label: "School A", value: "School A"},
                                            {label: "School B", value: "School B"},
                                            {label: "School C", value: "School C"},
                                        ]}
                                        placeholder="School name"
                                        required
                                    >
                                        What is your school? *
                                    </SelectOptionsWithLabel>
                                    <SelectOptionsWithLabel
                                        id="profile-creation-education-college-program"
                                        className="w-full"
                                        options={[
                                            {label: "Program A", value: "Program A"},
                                            {label: "Program B", value: "Program B"},
                                            {label: "Program C", value: "Program C"},
                                        ]}
                                        placeholder="Program"
                                        required
                                    >
                                        What is your program? *
                                    </SelectOptionsWithLabel>
                                    <SelectOptionsWithLabel
                                        id="profile-creation-education-college-degree"
                                        className="w-full"
                                        options={[
                                            {label: "Degree A", value: "Degree A"},
                                            {label: "Degree B", value: "Degree B"},
                                            {label: "Degree C", value: "Degree C"},
                                        ]}
                                        placeholder="Degree type"
                                        required
                                    >
                                        What is your degree type? *
                                    </SelectOptionsWithLabel>
                                    <div className="flex">
                                        <InputTextWithLabel
                                            type="month"
                                            id="profile-creation-education-college-starting-date"
                                            className="w-1/2"
                                            value={startDate}
                                            onChange={(e) => {
                                                const newValue = e.target.value;
                                                setStartDate(newValue);
                                            }}
                                            required
                                        >
                                            Starting date *
                                        </InputTextWithLabel>
                                        <InputTextWithLabel
                                            type="month"
                                            id="profile-creation-education-college-completion-date"
                                            className="w-1/2"
                                            value={completionDate}
                                            onChange={(e) =>
                                                setCompletionDate(e.target.value)}
                                            required
                                        >
                                            Completion date *
                                        </InputTextWithLabel>
                                    </div>
                                    <SelectOptionsWithLabel
                                        id="profile-creation-education-college-grade"
                                        className="w-full"
                                        options={[
                                            {label: "Freshman", value: "Freshman"},
                                            {label: "Sophomore", value: "Sophomore"},
                                            {label: "Junior", value: "Junior"},
                                            {label: "Senior", value: "Senior"},
                                        ]}
                                        placeholder="Please select your current grade"
                                        required
                                    >
                                        What is your grade? *
                                    </SelectOptionsWithLabel>
                                    <InputTextWithLabel
                                        type="number"
                                        id="profile-creation-education-college-gpa"
                                        className="w-full"
                                        required
                                    >
                                        What is your cumulative GPA? *
                                    </InputTextWithLabel>
                                </div>
                        }
                        {
                            (eduProgram !== "Training program/bootcamp") ? "" :
                                <div id="profile-creation-education-training-program-fields">
                                    <InputTextWithLabel
                                        id="profile-creation-education-training-program-name"
                                        placeholder="Training program name"
                                        className="w-full"
                                        required
                                    >
                                        What is your Training program *
                                    </InputTextWithLabel>
                                    <div className="flex">
                                        <InputTextWithLabel
                                            type="month"
                                            id="profile-creation-education-training-program-starting-date"
                                            className="w-1/2"
                                            required
                                        >
                                            Starting date *
                                        </InputTextWithLabel>
                                        <InputTextWithLabel
                                            type="month"
                                            id="profile-creation-education-training-program-completion-date"
                                            className="w-1/2"
                                            required
                                        >
                                            Completion date *
                                        </InputTextWithLabel>
                                    </div>
                                </div>
                        }
                        {
                            (eduProgram !== "Pre-apprenticeship") ? "" :
                                <div id="profile-creation-education-preapprenticeship-fields">
                                    <SelectOptionsWithLabel
                                        id="profile-creation-education-preapprenticeship-system"
                                        className="w-full"
                                        options={[
                                            {label: "System A", value: "System A"},
                                            {label: "System B", value: "System B"},
                                            {label: "System C", value: "System C"},
                                        ]}
                                        placeholder="Education system"
                                        required
                                    >
                                        What is your education system? *
                                    </SelectOptionsWithLabel>
                                    <SelectOptionsWithLabel
                                        id="profile-creation-education-preapprenticeship-program"
                                        className="w-full"
                                        options={[
                                            {label: "Program A", value: "Program A"},
                                            {label: "Program B", value: "Program B"},
                                            {label: "Program C", value: "Program C"},
                                        ]}
                                        placeholder="Program"
                                        required
                                    >
                                        What is your program? *
                                    </SelectOptionsWithLabel>
                                    <div className="flex">
                                        <InputTextWithLabel
                                            type="month"
                                            id="profile-creation-education-preapprenticeship-starting-date"
                                            className="w-1/2"
                                            required
                                        >
                                            Starting date *
                                        </InputTextWithLabel>
                                        <InputTextWithLabel
                                            type="month"
                                            id="profile-creation-education-preapprenticeship-completion-date"
                                            className="w-1/2"
                                            required
                                        >
                                            Completion date *
                                        </InputTextWithLabel>
                                    </div>
                                    <SelectOptionsWithLabel
                                        id="profile-creation-education-preapprenticeship-grade"
                                        className="w-full"
                                        options={[
                                            {label: "Grade 1", value: "Grade 1"},
                                            {label: "Grade 2", value: "Grade 2"},
                                            {label: "Grade 3", value: "Grade 3"},
                                            {label: "Grade 4", value: "Grade 4"},
                                        ]}
                                        placeholder="Please select your current grade"
                                        required
                                    >
                                        What is your grade? *
                                    </SelectOptionsWithLabel>
                                </div>
                        }
                        {
                            (eduProgram !== "Other") ? "" :
                                <div id="profile-creation-education-other-fields">
                                    <InputTextWithLabel
                                        id="profile-creation-education-other-name"
                                        className="w-full"
                                        placeholder="e.g., Not enrolled"
                                        required
                                    >
                                        If education program is other, specify *
                                    </InputTextWithLabel>
                                    <InputTextWithLabel
                                        id="profile-creation-education-other-recent-school"
                                        className="w-full"
                                        placeholder="School name"
                                        required
                                    >
                                        What is your recent school? *
                                    </InputTextWithLabel>
                                    <SelectOptionsWithLabel
                                        id="profile-creation-education-other-degree-type"
                                        className="w-full"
                                        options={[
                                            {label: "Degree type A", value: "Degree type A"},
                                            {label: "Degree type B", value: "Degree type B"},
                                            {label: "Degree type C", value: "Degree type C"},
                                        ]}
                                        placeholder="Degree type"
                                        required
                                    >
                                        What is your degree type? *
                                    </SelectOptionsWithLabel>
                                    <div className="flex">
                                        <InputTextWithLabel
                                            type="month"
                                            id="profile-creation-education-other-starting-date"
                                            className="w-1/2"
                                            required
                                        >
                                            Starting date *
                                        </InputTextWithLabel>
                                        <InputTextWithLabel
                                            type="month"
                                            id="profile-creation-education-other-completion-date"
                                            className="w-1/2"
                                            required
                                        >
                                            Completion date *
                                        </InputTextWithLabel>
                                    </div>
                                </div>
                        }
                    </fieldset>
          <style jsx global>{`
            .license-groups {
              counter-reset: work-group-item;
            }
            
            .license-groups fieldset h3::after {
              counter-increment: work-group-item;
              content: " " counter(work-group-item);
            }
              
            .project-experience-groups {
              counter-reset: work-group-item;
            }
            
            .project-experience-groups fieldset h3::after {
              counter-increment: work-group-item;
              content: " " counter(work-group-item);
            }
          `}</style>
          <fieldset className="license-groups">
                        <legend><h2>Licenses &amp; certificates</h2></legend>
            {
              licenseGroups.map(([group]) => group)
            }
            <Button pill color="gray" onClick={addNewLicenseGroup}>
                            <MdAdd className="mr-2 h-5 w-5"/>
                            Add license
                        </Button>
                    </fieldset>
          <fieldset className="project-experience-groups">
                        <legend><h2>Project experience</h2></legend>
            {
              projectExperienceGroups.map(([group]) => group)
            }
            <Button pill color="gray" onClick={addNewProjectExperienceGroup}>
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