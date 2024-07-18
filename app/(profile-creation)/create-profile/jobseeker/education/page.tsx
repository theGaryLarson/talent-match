'use client';

import React, {useState} from 'react';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import {MdAdd} from "react-icons/md";
import {Button, Label, Progress, Radio} from "flowbite-react";
import {JsEducationDTO} from "@/data/dtos/JobSeekerProfileCreationDTOs";
import {v4 as uuidv4} from 'uuid';

export default function CreateJobseekerProfileEducationPage() {
    const [eduProgram, setEduProgram] = useState("");
    const [startDate, setStartDate] = useState("");
    const [completionDate, setCompletionDate] = useState("");
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;

        const startDateWithDay = `${startDate}-01`
        const completionDateWithDay = `${completionDate}-01`
        console.log(startDateWithDay)

        const formData: JsEducationDTO = {
            userId: '5c1541db-ecae-4bba-a865-0f8d56aa3b39', // fixme: access user id from state management
            highestLevelOfStudy: form['profile-creation-education-highest-completed'].value,
            currentEnrolledEdProgram: eduProgram,
            startDate: new Date(startDateWithDay).toISOString(),
            completionDate: new Date(completionDateWithDay).toISOString(),
            currentGrade: form['profile-creation-education-high-school-grade']?.value || '',
            isEnrolledInCollege: eduProgram === "College"
        };
        console.log(JSON.stringify(formData, null, 2))
        await handleApiCall(formData);
    };

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
                            <h2>Current education</h2>
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
                                            value = {startDate}
                                            onChange= {(e) => {
                                                const newValue = e.target.value;
                                                setStartDate(newValue);
                                                console.log('Start Date:', newValue)
                                            }}
                                            required
                                        >
                                            Starting date *
                                        </InputTextWithLabel>
                                        <InputTextWithLabel
                                            type="month"
                                            id="profile-creation-education-college-completion-date"
                                            className="w-1/2"
                                            value = {completionDate}
                                            onChange= {(e) =>
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
                    <fieldset>
                        <legend><h2>Licenses &amp; certificates</h2></legend>
                        <Button pill color="gray">
                            <MdAdd className="mr-2 h-5 w-5"/>
                            Add license
                        </Button>
                    </fieldset>
                    <fieldset>
                        <legend><h2>Project experience</h2></legend>
                        <Button pill color="gray">
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