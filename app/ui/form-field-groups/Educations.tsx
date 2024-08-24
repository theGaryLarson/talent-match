import React, {memo, useCallback, useState} from 'react';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import {Button, Label} from "flowbite-react";
import {Radio, Checkbox} from "@mui/material";
import {MdClose} from "react-icons/md";
import {
    CollegeDegreeType,
    HighSchoolDegreeType,
    EduProgramType,
    PreAEduSystem,
    EducationInfoDTO,
    GradePointAverage
} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import {edu_providers, educators, provider_programs} from '@prisma/client';
import TextFieldWithAutocomplete from '../components/mui/TextFieldWithAutocomplete';
import {EducationProviderDTO} from '@/data/dtos/EducationProviderDTO';
import {GeneralProgramDTO} from '@/data/dtos/GeneralProgramDTO';
import {v4 as uuidv4} from 'uuid';

const classNamePrefix = "profile-creation-education-group-";

const classProgramType = "edProgram";
const classInstitution = "edInstitution"; // fixme edProviderObject
const classInstitutionId = "edProviderId";
const classInstitutionName = "edProviderName";
const classCurrent = "isEnrolled";
const classStartDate = "startDate";
const classEndDate = "gradDate";
const classDegreeType = "degreeType";
// const classGradeLevel = "schoolGradeLevel"; no longer needed as an input
const classPreALevel = "preALevel";
const classInstitutionProgram = "institutionProgram";  // fixme: rename to programId
const classInstitutionProgramName = "institutionProgramName";
const classInstitutionProgramId = "institutionProgramId";
const classMajor = "major";
const classMinor = "minor";
const classEdSystem = "edSystem";
const classDescription = "description";
const classGPA = "gpa";
const classIsTechDegree = "isTechDegree";

export interface EducationData {
    "uid": string,
    [classProgramType]: EduProgramType,
    [classInstitutionName]: string,
    [classCurrent]: boolean,
    [classStartDate]: string,
    [classEndDate]: string,
    // [classGradeLevel]: string,
    [classInstitution]?: EducationProviderDTO | null,
    [classInstitutionId]?: string | null,
    [classDegreeType]?: CollegeDegreeType | HighSchoolDegreeType | null,
    [classInstitutionProgram]?: GeneralProgramDTO | null,
    [classInstitutionProgramName]?: string | null,
    [classInstitutionProgramId]?: string | null,
    // [classMajor]?: string | null, //TODO:  replaced with college program
    // [classMinor]?: string | null,
    [classEdSystem]?: PreAEduSystem | null,
    [classDescription]?: string | null,
    [classGPA]?: GradePointAverage | null,
    [classIsTechDegree]?: boolean,
}

export function defaultEducationData() {
    return {
        "uid": uuidv4(),
        [classProgramType]: EduProgramType.Unselected,
        [classInstitution]: null,
        [classInstitutionId]: null,
        [classInstitutionName]: "",
        [classCurrent]: false,
        [classStartDate]: "",
        [classEndDate]: "",
        [classDegreeType]: null,
        // [classGradeLevel]: null,
        // [classPreALevel]: null,
        [classInstitutionProgram]: null,
        [classInstitutionProgramId]: null,
        [classInstitutionProgramName]: null,
        // [classMajor]: "",
        // [classMinor]: "",
        [classEdSystem]: null,
        [classDescription]: "",
        [classGPA]: null,
        [classIsTechDegree]: undefined,
    }
}

interface Props {
    data: EducationData[],
    onRemove: (uid: string) => void,
    onUpdate: (key: string, value: any) => void,
}

export default memo(function Educations({
                                            data,
                                            onRemove,
                                            onUpdate,
                                        }: Props) {
    const handleChange = useCallback(<K extends keyof EducationData>(index: number, key: K, value: any) => {
        const changedEducations: EducationData[] = [...data];
        const updatedEducation = changedEducations[index];
        updatedEducation[key] = value;
        if (key === classInstitution) {
            if (typeof value === "string") {
                updatedEducation[classInstitutionName] = value;
                updatedEducation[classInstitutionId] = uuidv4();
            } else if (value) {
                updatedEducation[classInstitutionName] = value.name;
                updatedEducation[classInstitutionId] = value.edu_institution_id;
            }
        } else if (key === classInstitutionProgram) {
            if (typeof value === "string") {
                updatedEducation[classInstitutionProgramName] = value;
                updatedEducation[classInstitutionProgramId] = uuidv4();
            } else if (value) {
                updatedEducation[classInstitutionProgramName] = value.edu_provider_program_name;
                updatedEducation[classInstitutionProgramId] = value.edu_provider_program_id;
            }
        }
        onUpdate('educations', changedEducations);
    }, [data, onUpdate]);

    return (
        data.map((education, index) => (
            <fieldset key={classNamePrefix + education.uid + "-key"}>
                <legend className="w-full flex justify-between">
                    <h3>Education {index + 1}</h3>
                    <Button onClick={() => onRemove(education.uid)} size="xs" color="dark" outline pill><MdClose
                        className="h-5 w-5"/></Button>
                </legend>

                <div>
                    What type of program is this education? *
                    <Label className="block">
                        <Radio
                            name="profile-creation-education-currently-enrolled"
                            checked={education[classProgramType] === EduProgramType.HighSchool}
                            onChange={(e) => handleChange(index, classProgramType, e.target.value)}
                            required
                            value={EduProgramType.HighSchool}
                        />
                        High school
                    </Label>
                    <Label className="block">
                        <Radio
                            name="profile-creation-education-currently-enrolled"
                            checked={education[classProgramType] === EduProgramType.College}
                            onChange={(e) => handleChange(index, classProgramType, e.target.value)}
                            required
                            value={EduProgramType.College}
                        />
                        College
                    </Label>
                    <Label className="block">
                        <Radio
                            name="profile-creation-education-currently-enrolled"
                            checked={education[classProgramType] === EduProgramType.TrainingProgram}
                            onChange={(e) => handleChange(index, classProgramType, e.target.value)}
                            required
                            value={EduProgramType.TrainingProgram}
                        />
                        Training program / Bootcamp
                    </Label>
                    <Label className="block">
                        <Radio
                            name="profile-creation-education-currently-enrolled"
                            checked={education[classProgramType] === EduProgramType.PreApprenticeship}
                            onChange={(e) => handleChange(index, classProgramType, e.target.value)}
                            required
                            value={EduProgramType.PreApprenticeship}
                        />
                        Pre-apprenticeship
                    </Label>
                    <Label className="block">
                        <Radio
                            name="profile-creation-education-currently-enrolled"
                            checked={education[classProgramType] === EduProgramType.Other}
                            onChange={(e) => handleChange(index, classProgramType, e.target.value)}
                            required
                            value={EduProgramType.Other}
                        />
                        Other
                    </Label>
                </div>
                {
                    (education[classProgramType] !== EduProgramType.HighSchool) ? "" :
                        <div id="profile-creation-education-high-school-fields">
                            <div className="profile-form-grid">
                                <TextFieldWithAutocomplete
                                    apiSearchRoute="/api/edu-providers/search/"
                                    fieldLabel="What is your high school? *"
                                    id="profile-creation-education-high-school-name"
                                    searchingText="Searching..."
                                    noResultsText="No education providers found..."
                                    value={education[classInstitution] ?? ""}
                                    onChange={(e, val) => handleChange(index, classInstitution, val)}
                                    searchPlaceholder="High school name"
                                    getOptionLabel={(option: EducationProviderDTO) => option.name ?? ''}
                                />
                                <TextFieldWithAutocomplete
                                    apiSearchRoute="/api/edu-providers/programs/high-school/search/"
                                    fieldLabel="What is your program? *"
                                    id="profile-creation-education-high-school-program"
                                    searchingText="Searching..."
                                    noResultsText="No education provider programs found..."
                                    value={education[classInstitutionProgram] ?? ""}
                                    onChange={(e, val) => handleChange(index, classInstitutionProgram, val)}
                                    searchPlaceholder="Program name"
                                    getOptionLabel={(option: GeneralProgramDTO) => option.title ?? ''}
                                />
                                <SelectOptionsWithLabel
                                    id="profile-creation-education-high-school-degree"
                                    className="w-full"
                                    options={(Object.values(HighSchoolDegreeType) as string[]).map(
                                        value => ({label: value, value})
                                    )}
                                    placeholder="Degree type"
                                    onChange={(e) => handleChange(index, classDegreeType, e.target.value)}
                                    required
                                    value={education[classDegreeType] as string}
                                >
                                    What is your degree type? *
                                </SelectOptionsWithLabel>
                            </div>
                            <div className="profile-form-grid md:grid-cols-2">
                                <InputTextWithLabel
                                    type="month"
                                    id="profile-creation-education-high-school-starting-date"
                                    value={education[classStartDate]}
                                    onChange={(e) => handleChange(index, classStartDate, e.target.value)}
                                    required
                                >
                                    Starting date *
                                </InputTextWithLabel>
                                <InputTextWithLabel
                                    type="month"
                                    id="profile-creation-education-high-school-completion-date"
                                    value={education[classEndDate]}
                                    onChange={(e) => handleChange(index, classEndDate, e.target.value)}
                                    required
                                >
                                    Completion date *
                                </InputTextWithLabel>
                            </div>
                            <Label>
                                <Checkbox
                                    id={classNamePrefix + education.uid + "-" + classCurrent}
                                    name={classNamePrefix + education.uid + "-" + classCurrent}
                                    checked={education[classCurrent]}
                                    onChange={(e) => handleChange(index, classCurrent, e.target.checked)}
                                />
                                Current
                            </Label>
                            <div className="profile-form-grid">
                                <SelectOptionsWithLabel
                                    id="profile-creation-education-high-school-gpa"
                                    className="w-full"
                                    options={(Object.values(GradePointAverage) as string[]).map(
                                        value => ({label: value, value})
                                    )}
                                    placeholder="Choose nearest grade"
                                    onChange={(e) => handleChange(index, classGPA, e.target.value)}
                                    value={education[classGPA] as string}
                                >
                                    What is your grade?
                                </SelectOptionsWithLabel>
                            </div>
                        </div>
                }
                {
                    (education[classProgramType] !== EduProgramType.College) ? "" :
                        <div id="profile-creation-education-college-fields">
                            <div className="profile-form-grid">
                                <TextFieldWithAutocomplete
                                    apiSearchRoute="/api/edu-providers/search/"
                                    fieldLabel="What is your college? *"
                                    id="profile-creation-education-college-name"
                                    searchingText="Searching..."
                                    noResultsText="No education providers found..."
                                    value={education[classInstitution] ?? ""}
                                    onChange={(e, val) => handleChange(index, classInstitution, val)}
                                    searchPlaceholder="College name"
                                    getOptionLabel={(option: EducationProviderDTO) => option.name ?? ''}
                                />
                                <TextFieldWithAutocomplete
                                    apiSearchRoute="/api/edu-providers/programs/college/search/"
                                    fieldLabel="What is your program? *"
                                    id="profile-creation-education-college-program"
                                    searchingText="Searching..."
                                    noResultsText="No education provider programs found..."
                                    value={education[classInstitutionProgram] ?? ""}
                                    onChange={(e, val) => handleChange(index, classInstitutionProgram, val)}
                                    searchPlaceholder="Program name"
                                    getOptionLabel={(option: GeneralProgramDTO) => option.title ?? ''}
                                />
                                <SelectOptionsWithLabel
                                    id="profile-creation-education-college-degree"
                                    className="w-full"
                                    options={(Object.values(CollegeDegreeType) as string[]).map(
                                        value => ({label: value, value})
                                    )}
                                    placeholder="Degree type"
                                    onChange={(e) => handleChange(index, classDegreeType, e.target.value)}
                                    required
                                    value={education[classDegreeType] as string}
                                >
                                    What is your degree type? *
                                </SelectOptionsWithLabel>
                            </div>
                            <div className="profile-form-grid md:grid-cols-2">
                                <InputTextWithLabel
                                    type="month"
                                    id="profile-creation-education-college-starting-date"
                                    value={education[classStartDate]}
                                    onChange={(e) => handleChange(index, classStartDate, e.target.value)}
                                    required
                                >
                                    Starting date *
                                </InputTextWithLabel>
                                <InputTextWithLabel
                                    type="month"
                                    id="profile-creation-education-college-completion-date"
                                    value={education[classEndDate]}
                                    onChange={(e) => handleChange(index, classEndDate, e.target.value)}
                                    required
                                >
                                    Completion date *
                                </InputTextWithLabel>
                            </div>
                            <Label>
                                <Checkbox
                                    id={classNamePrefix + education.uid + "-" + classCurrent}
                                    name={classNamePrefix + education.uid + "-" + classCurrent}
                                    checked={education[classCurrent]}
                                    onChange={(e) => handleChange(index, classCurrent, e.target.checked)}
                                />
                                Current
                            </Label>
                            <div className="profile-form-grid">
                                <SelectOptionsWithLabel
                                    id="profile-creation-education-college-gpa"
                                    className="w-full"
                                    options={(Object.values(GradePointAverage) as string[]).map(
                                        value => ({label: value, value})
                                    )}
                                    placeholder="Choose nearest grade"
                                    onChange={(e) => handleChange(index, classGPA, e.target.value)}
                                    value={education[classGPA] as string}
                                >
                                    What is your grade?
                                </SelectOptionsWithLabel>
                            </div>
                        </div>
                }
                {
                    (education[classProgramType] !== EduProgramType.TrainingProgram) ? "" :
                        <div id="profile-creation-education-training-program-fields">
                            <div className="profile-form-grid">
                                <TextFieldWithAutocomplete
                                    apiSearchRoute="/api/edu-providers/search/"
                                    fieldLabel="What is your training program? *"
                                    id="profile-creation-education-training-program-name"
                                    searchingText="Searching..."
                                    noResultsText="No education providers found..."
                                    value={education[classInstitution] ?? ""}
                                    onChange={(e, val) => handleChange(index, classInstitution, val)}
                                    searchPlaceholder="Training program name"
                                    getOptionLabel={(option: EducationProviderDTO) => option.name ?? ''}
                                />
                            </div>
                            <div className="profile-form-grid md:grid-cols-2">
                                <InputTextWithLabel
                                    type="month"
                                    id="profile-creation-education-training-program-starting-date"
                                    value={education[classStartDate]}
                                    onChange={(e) => handleChange(index, classStartDate, e.target.value)}
                                    required
                                >
                                    Starting date *
                                </InputTextWithLabel>
                                <InputTextWithLabel
                                    type="month"
                                    id="profile-creation-education-training-program-completion-date"
                                    value={education[classEndDate]}
                                    onChange={(e) => handleChange(index, classEndDate, e.target.value)}
                                    required
                                >
                                    Completion date *
                                </InputTextWithLabel>
                            </div>
                            <Label>
                                <Checkbox
                                    id={classNamePrefix + education.uid + "-" + classCurrent}
                                    name={classNamePrefix + education.uid + "-" + classCurrent}
                                    checked={education[classCurrent]}
                                    onChange={(e) => handleChange(index, classCurrent, e.target.checked)}
                                />
                                Current
                            </Label>
                            <div className="profile-form-grid">
                                <SelectOptionsWithLabel
                                    id="profile-creation-education-training-program-gpa"
                                    className="w-full"
                                    options={(Object.values(GradePointAverage) as string[]).map(
                                        value => ({label: value, value})
                                    )}
                                    placeholder="Choose nearest grade"
                                    onChange={(e) => handleChange(index, classGPA, e.target.value)}
                                    value={education[classGPA] as string}
                                >
                                    What is your grade?
                                </SelectOptionsWithLabel>
                            </div>
                        </div>
                }
                {
                    (education[classProgramType] !== EduProgramType.PreApprenticeship) ? "" :
                        <div id="profile-creation-education-preapprenticeship-fields">
                            <div className="profile-form-grid">
                                <TextFieldWithAutocomplete
                                    apiSearchRoute="/api/edu-providers/search/"
                                    fieldLabel="What is your pre-apprenticeship provider? *"
                                    id="profile-creation-education-preapprenticeship-name"
                                    searchingText="Searching..."
                                    noResultsText="No education providers found..."
                                    value={education[classInstitution] ?? ""}
                                    onChange={(e, val) => handleChange(index, classInstitution, val)}
                                    searchPlaceholder="Pre-apprenticeship name (e.g.: Computing for All)"
                                    getOptionLabel={(option: EducationProviderDTO) => option.name ?? ''}
                                />
                                <SelectOptionsWithLabel
                                    id="profile-creation-education-preapprenticeship-system"
                                    className="w-full"
                                    options={(Object.values(PreAEduSystem) as string[]).map(
                                        value => ({label: value, value})
                                    )}
                                    placeholder="Education system"
                                    onChange={(e) => handleChange(index, classEdSystem, e.target.value)}
                                    required
                                    value={education[classEdSystem]?.toString()}
                                >
                                    What is your education system? *
                                </SelectOptionsWithLabel>
                                <TextFieldWithAutocomplete
                                    apiSearchRoute="/api/edu-providers/programs/pre-apprenticeship/search/"
                                    fieldLabel="What is your program? *"
                                    id="profile-creation-education-preapprenticeship-program"
                                    searchingText="Searching..."
                                    noResultsText="No education provider programs found..."
                                    value={education[classInstitutionProgram] ?? ""}
                                    onChange={(e, val) => handleChange(index, classInstitutionProgram, val)}
                                    searchPlaceholder="Program name"
                                    getOptionLabel={(option: GeneralProgramDTO) => option.title ?? ''}
                                />
                            </div>
                            <div className="profile-form-grid md:grid-cols-2">
                                <InputTextWithLabel
                                    type="month"
                                    id="profile-creation-education-preapprenticeship-starting-date"
                                    value={education[classStartDate]}
                                    onChange={(e) => handleChange(index, classStartDate, e.target.value)}
                                    required
                                >
                                    Starting date *
                                </InputTextWithLabel>
                                <InputTextWithLabel
                                    type="month"
                                    id="profile-creation-education-preapprenticeship-completion-date"
                                    value={education[classEndDate]}
                                    onChange={(e) => handleChange(index, classEndDate, e.target.value)}
                                    required
                                >
                                    Completion date *
                                </InputTextWithLabel>
                            </div>
                            <Label>
                                <Checkbox
                                    id={classNamePrefix + education.uid + "-" + classCurrent}
                                    name={classNamePrefix + education.uid + "-" + classCurrent}
                                    checked={education[classCurrent]}
                                    onChange={(e) => handleChange(index, classCurrent, e.target.checked)}
                                />
                                Current
                            </Label>
                            <div className="profile-form-grid">
                                <SelectOptionsWithLabel
                                    id="profile-creation-education-preapprenticeship-gpa"
                                    className="w-full"
                                    options={(Object.values(GradePointAverage) as string[]).map(
                                        value => ({label: value, value})
                                    )}
                                    placeholder="Choose nearest grade"
                                    onChange={(e) => handleChange(index, classGPA, e.target.value)}
                                    value={education[classGPA] as string}
                                >
                                    What is your grade? *
                                </SelectOptionsWithLabel>
                            </div>
                        </div>
                }
                {
                    (education[classProgramType] !== EduProgramType.Other) ? "" :
                        <div id="profile-creation-education-other-fields">
                            <div className="profile-form-grid">
                                <TextFieldWithAutocomplete
                                    apiSearchRoute="/api/edu-providers/search/"
                                    fieldLabel="If education program is other, specify"
                                    id="profile-creation-education-other-recent-school"
                                    searchingText="Searching..."
                                    noResultsText="No education providers found..."
                                    value={education[classInstitution] ?? ""}
                                    onChange={(e, val) => handleChange(index, classInstitution, val)}
                                    searchPlaceholder="School name"
                                    getOptionLabel={(option: EducationProviderDTO) => option.name ?? ''}
                                />
                            </div>
                            <div className="profile-form-grid md:grid-cols-2">
                                <InputTextWithLabel
                                    type="month"
                                    id="profile-creation-education-other-starting-date"
                                    value={education[classStartDate]}
                                    onChange={(e) => handleChange(index, classStartDate, e.target.value)}
                                    required
                                >
                                    Starting date *
                                </InputTextWithLabel>
                                <InputTextWithLabel
                                    type="month"
                                    id="profile-creation-education-other-completion-date"
                                    value={education[classEndDate]}
                                    onChange={(e) => handleChange(index, classEndDate, e.target.value)}
                                    required
                                >
                                    Completion date *
                                </InputTextWithLabel>
                            </div>
                            <Label>
                                <Checkbox
                                    id={classNamePrefix + education.uid + "-" + classCurrent}
                                    name={classNamePrefix + education.uid + "-" + classCurrent}
                                    checked={education[classCurrent]}
                                    onChange={(e) => handleChange(index, classCurrent, e.target.checked)}
                                />
                                Current
                            </Label>
                            <div className="profile-form-grid">
                                <SelectOptionsWithLabel
                                    id="profile-creation-education-other-gpa"
                                    className="w-full"
                                    options={(Object.values(GradePointAverage) as string[]).map(
                                        value => ({label: value, value})
                                    )}
                                    placeholder="Choose nearest grade"
                                    onChange={(e) => handleChange(index, classGPA, e.target.value)}
                                    value={education[classGPA] as string}
                                >
                                    What is your grade?
                                </SelectOptionsWithLabel>
                            </div>
                        </div>
                }
            </fieldset>
        ))
    );
});