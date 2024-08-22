'use client';

import React, {useCallback, useState} from 'react';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import {MdAdd} from "react-icons/md";
import {Button} from "flowbite-react";
import {
    CertDTO,
    HighestDegreeType,
    EduProgramType,
    EducationInfoDTO,
    JsEducationDTO,
    ProjectExpDTO,
    PreAEduSystem,
    CollegeDegreeType
} from "@/data/dtos/JobSeekerProfileCreationDTOs";
import {v4 as uuidv4} from 'uuid';
import {SkillDTO} from "@/data/dtos/SkillDTO";
import {useRouter} from "next/navigation";

import Educations, {defaultEducationData, EducationData} from '@/app/ui/form-field-groups/Educations';
import Licenses, {defaultLicenseData, LicenseData} from '@/app/ui/form-field-groups/Licenses';
import ProjectExperiences, {
    defaultProjectExperienceData,
    ProjectExperienceData
} from '@/app/ui/form-field-groups/ProjectExperiences';

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
    const router = useRouter();

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

    function removeLicense(byUid: string) {
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

    function removeProjectExperience(byUid: string) {
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

    function removeEducation(byUid: string) {
        setData({
            ...data,
            educations: data.educations.filter(({uid}) => (uid !== byUid))
        });
    }

    const handleUpdate = useCallback((key: string, value: any) => {
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
        console.log("ARRAY: ", Array.from(formDataObj.entries()));

        const startDateWithDay = `${startDate}-01`
        const completionDateWithDay = `${completionDate}-01`
        console.log('Date:', new Date('2024-12-1').toISOString());

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

        const educations: EducationInfoDTO[] = data.educations.map((ed: EducationData) => ({
            jobseekerEdId: ed.uid,
            eduProviderId: ed.edInstitutionId || '',
            edProgram: ed.edProgram,
            edProviderName: ed.institutionName || '',
            isEnrolled: ed.isEnrolled,
            startDate: ed.startDate,
            gradDate: ed.gradDate,
            degreeType: ed.degreeType || undefined,
            collegeProgram: ed.collegeProgram || null,
            // isTechnicalDegree: ed.isTechnicalDegree || false, // TODO: Add isTechnicalDegree to Educations.tsx so we can filter by completed Technical Degrees
            major: ed.major || null,
            minor: ed.minor || null,
            gpa: ed.gpa || null,
            gradeLevel: ed.schoolGradeLevel || null,
            preALevel: ed.preALevel || null,
            edSystem: ed.edSystem || null,
            description: ed.description || null,
        }));

        const certifications: CertDTO[] = data.licenses.map((cert: LicenseData) => ({
            certId: cert.uid,
            name: cert.name,
            logoUrl: undefined,
            issuingOrg: cert["issuing-org"],
            credentialId: cert["credential-id"],
            credentialUrl: cert["credential-url"],
            issueDate: cert["issue-date"],
            expiryDate: cert["expiration-date"],
            description: undefined,
        }));

        //TODO: Get projects and skills loading correctly

        // const projects: ProjectExpDTO  = data.projectExperiences.map((proj: ProjectExperienceData) => ({
        //     projectId: proj.uid,
        //     projTitle: proj.title,
        //     projectRole: proj["project-role"],
        //     startDate: proj["starting-date"],
        //     completionDate: proj["completion-date"],
        //     teamSize: proj["team-size"],
        //     repoUrl: proj["reference-url"],
        //     demoUrl: undefined,
        //     skills: proj["skills-stack"]
        //
        // }))

        const formData: JsEducationDTO = {
            userId: '87E52D83-CC98-46AF-B62A-58124ABEBBDC', // fixme: access user id from nextauth session
            highestLevelOfStudy: form['profile-creation-education-highest-completed'].value,
            educations: educations,
            certifications: certifications,
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
        <main className="flex justify-center">
            <aside className="profile-form-aside">
            </aside>
            <section className="profile-form-section">
                <ProgressBarFlat progress={2 / 6 * 100} size="sm"/>
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
                            options={(Object.values(HighestDegreeType) as string[]).filter(
                                value => (value !== "Certification")
                            ).map(
                                value => ({label: value, value})
                            )}
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
                        <Educations data={data.educations} onUpdate={handleUpdate} onRemove={removeEducation}/>
                        <Button pill color="gray" onClick={addNewEducation}>
                            <MdAdd className="mr-2 h-5 w-5"/>
                            Add education
                        </Button>
                    </fieldset>
                    <fieldset className="license-groups">
                        <legend><h2>Licenses &amp; certificates</h2></legend>
                        <Licenses data={data.licenses} onUpdate={handleUpdate} onRemove={removeLicense}/>
                        <Button pill color="gray" onClick={addNewLicense}>
                            <MdAdd className="mr-2 h-5 w-5"/>
                            Add license
                        </Button>
                    </fieldset>
                    <fieldset className="project-experience-groups">
                        <legend><h2>Project experience</h2></legend>
                        <ProjectExperiences data={data.projectExperiences} onUpdate={handleUpdate}
                                            onRemove={removeProjectExperience}/>
                        <Button pill color="gray" onClick={addNewProjectExperience}>
                            <MdAdd className="mr-2 h-5 w-5"/>
                            Add project experience
                        </Button>
                    </fieldset>
                    <div className="flex">
                        <Button pill color="gray" onClick={() => {
                            router.push("/create-profile/jobseeker/intro")
                        }}>Previous </Button>
                        <Button pill type="submit">Save and continue</Button>
                    </div>
                </form>
            </section>
        </main>
    );
}