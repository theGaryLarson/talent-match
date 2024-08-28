import React, { memo, useCallback } from 'react';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import { Button, Label } from "flowbite-react";
import { Radio, Checkbox } from "@mui/material";
import { MdClose } from "react-icons/md";
import {
    CollegeDegreeType,
    HighSchoolDegreeType,
    EducationLevel,
    PreAEduSystem,
    JsEducationInfoDTO,
    GradePointAverage
} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import { edu_providers, educators, provider_programs } from '@prisma/client';
import TextFieldWithAutocomplete from '../components/mui/TextFieldWithAutocomplete';
import { EducationProviderDTO } from '@/data/dtos/EducationProviderDTO';
import { GeneralProgramDTO } from '@/data/dtos/GeneralProgramDTO';
import dayjs, { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import DatePickerDayjs from '../components/mui/DatePickerDayjs';

const classNamePrefix = "profile-creation-education-group-";

const classEdLevel = "edLevel";
const classEdProviderObject = "edProviderObject"; // fixme edProviderObject
const classEdProviderId = "edProviderId";
const classEdProviderName = "edProviderName";
const classIsCurrent = "isEnrolled";
const classStartDate = "startDate";
const classEndDate = "gradDate";
const classDegreeType = "degreeType";
// const classGradeLevel = "schoolGradeLevel"; no longer needed as an input
// const classPreALevel = "preALevel";
const classProgramObject = "programObject";  // fixme: rename to programId
const classProgramName = "programName";
const classProgramId = "programId";
// const classMajor = "major";
// const classMinor = "minor";
const classPreAppEdSystem = "preAppEdSystem";
const classDescription = "description";
const classGPA = "gpa";
const classIsTechDegree = "isTechDegree";

export interface EducationData {
    "uid": string,
    [classEdLevel]: EducationLevel,
    [classEdProviderName]: string,
    [classIsCurrent]: boolean,
    [classStartDate]: Dayjs | null,
    [classEndDate]: Dayjs | null,
    // [classGradeLevel]: string,
    [classEdProviderObject]?: EducationProviderDTO | null,
    [classEdProviderId]?: string | null,
    [classDegreeType]?: CollegeDegreeType | HighSchoolDegreeType | null,
    [classProgramObject]?: GeneralProgramDTO | null,
    [classProgramName]?: string | null,
    [classProgramId]?: string | null,
    // [classMajor]?: string | null, //TODO:  replaced with program
    // [classMinor]?: string | null,
    [classPreAppEdSystem]?: PreAEduSystem | null,
    [classDescription]?: string | null,
    [classGPA]?: GradePointAverage | null,
    [classIsTechDegree]?: boolean,
}

export function defaultEducationData() {
    return {
        "uid": uuidv4(),
        [classEdLevel]: EducationLevel.Unselected,
        [classEdProviderObject]: null,
        [classEdProviderId]: null,
        [classEdProviderName]: "",
        [classIsCurrent]: false,
        [classStartDate]: null,
        [classEndDate]: null,
        [classDegreeType]: null,
        // [classGradeLevel]: null,
        // [classPreALevel]: null,
        [classProgramObject]: null,
        [classProgramId]: null,
        [classProgramName]: null,
        // [classMajor]: "",
        // [classMinor]: "",
        [classPreAppEdSystem]: null,
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
        if (key === classEdProviderObject) {
            if (typeof value === "string") {
                updatedEducation[classEdProviderName] = value;
                updatedEducation[classEdProviderId] = uuidv4();
            } else if (value) {
                updatedEducation[classEdProviderName] = value.name;
                updatedEducation[classEdProviderId] = value.id;
            }
        } else if (key === classProgramObject) {
            if (typeof value === "string") {
                updatedEducation[classProgramName] = value;
                updatedEducation[classProgramId] = uuidv4();
            } else if (value) {
                updatedEducation[classProgramName] = value.title;
                updatedEducation[classProgramId] = value.id;
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
                        className="h-5 w-5" /></Button>
                </legend>

                <div>
                    What type of program is this education? *
                    <Label className="block">
                        <Radio
                            name="profile-creation-education-currently-enrolled"
                            checked={education[classEdLevel] === EducationLevel.HighSchool}
                            onChange={(e) => handleChange(index, classEdLevel, e.target.value)}
                            required
                            value={EducationLevel.HighSchool}
                        />
                        High school
                    </Label>
                    <Label className="block">
                        <Radio
                            name="profile-creation-education-currently-enrolled"
                            checked={education[classEdLevel] === EducationLevel.College}
                            onChange={(e) => handleChange(index, classEdLevel, e.target.value)}
                            required
                            value={EducationLevel.College}
                        />
                        College
                    </Label>
                    <Label className="block">
                        <Radio
                            name="profile-creation-education-currently-enrolled"
                            checked={education[classEdLevel] === EducationLevel.TrainingProgram}
                            onChange={(e) => handleChange(index, classEdLevel, e.target.value)}
                            required
                            value={EducationLevel.TrainingProgram}
                        />
                        Training program / Bootcamp
                    </Label>
                    <Label className="block">
                        <Radio
                            name="profile-creation-education-currently-enrolled"
                            checked={education[classEdLevel] === EducationLevel.PreApprenticeship}
                            onChange={(e) => handleChange(index, classEdLevel, e.target.value)}
                            required
                            value={EducationLevel.PreApprenticeship}
                        />
                        Pre-apprenticeship
                    </Label>
                    <Label className="block">
                        <Radio
                            name="profile-creation-education-currently-enrolled"
                            checked={education[classEdLevel] === EducationLevel.Other}
                            onChange={(e) => handleChange(index, classEdLevel, e.target.value)}
                            required
                            value={EducationLevel.Other}
                        />
                        Other
                    </Label>
                </div>
                {
                    (education[classEdLevel] !== EducationLevel.HighSchool) ? "" :
                        <div id="profile-creation-education-high-school-fields">
                            <div className="profile-form-grid">
                                <TextFieldWithAutocomplete
                                    apiSearchRoute="/api/edu-providers/search/"
                                    fieldLabel="What is your high school? *"
                                    id="profile-creation-education-high-school-name"
                                    searchingText="Searching..."
                                    noResultsText="No education providers found..."
                                    value={education[classEdProviderObject] ?? ""}
                                    onChange={(e, val) => handleChange(index, classEdProviderObject, val)}
                                    searchPlaceholder="High school name"
                                    getOptionLabel={(option: EducationProviderDTO) => option.name ?? ''}
                                />
                                <TextFieldWithAutocomplete
                                    apiSearchRoute="/api/edu-providers/programs/high-school/search/"
                                    fieldLabel="What is your program? *"
                                    id="profile-creation-education-high-school-program"
                                    searchingText="Searching..."
                                    noResultsText="No education provider programs found..."
                                    value={education[classProgramObject] ?? ""}
                                    onChange={(e, val) => handleChange(index, classProgramObject, val)}
                                    searchPlaceholder="Program name"
                                    getOptionLabel={(option: GeneralProgramDTO) => option.title ?? ''}
                                />
                                <SelectOptionsWithLabel
                                    id="profile-creation-education-high-school-degree"
                                    className="w-full"
                                    options={(Object.values(HighSchoolDegreeType) as string[]).map(
                                        value => ({ label: value, value })
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
                                <DatePickerDayjs
                                    label={'Starting date *'}
                                    views={['month', 'year']}
                                    value={education[classStartDate] || null}
                                    onChange={(val: Dayjs | null) => handleChange(index, classStartDate, val)}
                                />
                                <DatePickerDayjs
                                    label={'Completion date *'}
                                    views={['month', 'year']}
                                    value={education[classEndDate] || null}
                                    onChange={(val: Dayjs | null) => handleChange(index, classEndDate, val)}
                                />
                            </div>
                            <Label>
                                <Checkbox
                                    id={classNamePrefix + education.uid + "-" + classIsCurrent}
                                    name={classNamePrefix + education.uid + "-" + classIsCurrent}
                                    checked={education[classIsCurrent]}
                                    onChange={(e) => handleChange(index, classIsCurrent, e.target.checked)}
                                />
                                Current
                            </Label>
                            <div className="profile-form-grid">
                                <InputTextWithLabel
                                    id={"profile-creation-education-high-school-gpa"}
                                    type="number"
                                    className="w-full"
                                    placeholder="Your GPA (ex: 4.0)"
                                    min="1.0"
                                    max="4.0"
                                    step="0.01"
                                    onChange={(e) => handleChange(index, classGPA, e.target.value)}
                                    required
                                    value={education[classGPA]}
                                >
                                    What is your grade?
                                </InputTextWithLabel>
                            </div>
                        </div>
                }
                {
                    (education[classEdLevel] !== EducationLevel.College) ? "" :
                        <div id="profile-creation-education-college-fields">
                            <div className="profile-form-grid">
                                <TextFieldWithAutocomplete
                                    apiSearchRoute="/api/edu-providers/search/"
                                    fieldLabel="What is your college? *"
                                    id="profile-creation-education-college-name"
                                    searchingText="Searching..."
                                    noResultsText="No education providers found..."
                                    value={education[classEdProviderObject] ?? ""}
                                    onChange={(e, val) => handleChange(index, classEdProviderObject, val)}
                                    searchPlaceholder="College name"
                                    getOptionLabel={(option: EducationProviderDTO) => option.name ?? ''}
                                />
                                <TextFieldWithAutocomplete
                                    apiSearchRoute="/api/edu-providers/programs/college/search/"
                                    fieldLabel="What is your program? *"
                                    id="profile-creation-education-college-program"
                                    searchingText="Searching..."
                                    noResultsText="No education provider programs found..."
                                    value={education[classProgramObject] ?? ""}
                                    onChange={(e, val) => handleChange(index, classProgramObject, val)}
                                    searchPlaceholder="Program name"
                                    getOptionLabel={(option: GeneralProgramDTO) => option.title ?? ''}
                                />
                                <SelectOptionsWithLabel
                                    id="profile-creation-education-college-degree"
                                    className="w-full"
                                    options={(Object.values(CollegeDegreeType) as string[]).map(
                                        value => ({ label: value, value })
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
                                <DatePickerDayjs
                                    label={'Starting date *'}
                                    views={['month', 'year']}
                                    value={education[classStartDate] || null}
                                    onChange={(val: Dayjs | null) => handleChange(index, classStartDate, val)}
                                />
                                <DatePickerDayjs
                                    label={'Completion date *'}
                                    views={['month', 'year']}
                                    value={education[classEndDate] || null}
                                    onChange={(val: Dayjs | null) => handleChange(index, classEndDate, val)}
                                />
                            </div>
                            <Label>
                                <Checkbox
                                    id={classNamePrefix + education.uid + "-" + classIsCurrent}
                                    name={classNamePrefix + education.uid + "-" + classIsCurrent}
                                    checked={education[classIsCurrent]}
                                    onChange={(e) => handleChange(index, classIsCurrent, e.target.checked)}
                                />
                                Current
                            </Label>
                            <div className="profile-form-grid">
                                <InputTextWithLabel
                                    id={"profile-creation-education-college-gpa"}
                                    type="number"
                                    className="w-full"
                                    placeholder="Your GPA (ex: 4.0)"
                                    min="1.0"
                                    max="4.0"
                                    step="0.01"
                                    onChange={(e) => handleChange(index, classGPA, e.target.value)}
                                    required
                                    value={education[classGPA]}
                                >
                                    What is your grade?
                                </InputTextWithLabel>
                            </div>
                        </div>
                }
                {
                    (education[classEdLevel] !== EducationLevel.TrainingProgram) ? "" :
                        <div id="profile-creation-education-training-program-fields">
                            <div className="profile-form-grid">
                                <TextFieldWithAutocomplete
                                    apiSearchRoute="/api/edu-providers/search/"
                                    fieldLabel="Who is your training provider? *"
                                    id="profile-creation-education-training-provider-name"
                                    searchingText="Searching..."
                                    noResultsText="No education providers found..."
                                    value={education[classEdProviderObject] ?? ""}
                                    onChange={(e, val) => handleChange(index, classEdProviderObject, val)}
                                    searchPlaceholder="Training provider name"
                                    getOptionLabel={(option: EducationProviderDTO) => option.name ?? ''}
                                />
                                <TextFieldWithAutocomplete
                                    apiSearchRoute="/api/edu-providers/programs/training-programs/search/"
                                    fieldLabel="What is your training program? *"
                                    id="profile-creation-education-training-provider-program-name"
                                    searchingText="Searching..."
                                    noResultsText="No education provider programs found..."
                                    value={education[classProgramObject] ?? ""}
                                    onChange={(e, val) => handleChange(index, classProgramObject, val)}
                                    searchPlaceholder="Training program name"
                                    getOptionLabel={(option: GeneralProgramDTO) => option.title ?? ''}
                                />
                            </div>
                            <div className="profile-form-grid md:grid-cols-2">
                                <DatePickerDayjs
                                    label={'Starting date *'}
                                    views={['month', 'year']}
                                    value={education[classStartDate] || null}
                                    onChange={(val: Dayjs | null) => handleChange(index, classStartDate, val)}
                                />
                                <DatePickerDayjs
                                    label={'Completion date *'}
                                    views={['month', 'year']}
                                    value={education[classEndDate] || null}
                                    onChange={(val: Dayjs | null) => handleChange(index, classEndDate, val)}
                                />
                            </div>
                            <Label>
                                <Checkbox
                                    id={classNamePrefix + education.uid + "-" + classIsCurrent}
                                    name={classNamePrefix + education.uid + "-" + classIsCurrent}
                                    checked={education[classIsCurrent]}
                                    onChange={(e) => handleChange(index, classIsCurrent, e.target.checked)}
                                />
                                Current
                            </Label>
                            <div className="profile-form-grid">
                                <InputTextWithLabel
                                    id={"profile-creation-education-training-program-gpa"}
                                    type="number"
                                    className="w-full"
                                    placeholder="Your GPA (ex: 4.0)"
                                    min="1.0"
                                    max="4.0"
                                    step="0.01"
                                    onChange={(e) => handleChange(index, classGPA, e.target.value)}
                                    required
                                    value={education[classGPA]}
                                >
                                    What is your grade?
                                </InputTextWithLabel>
                            </div>
                        </div>
                }
                {
                    (education[classEdLevel] !== EducationLevel.PreApprenticeship) ? "" :
                        <div id="profile-creation-education-preapprenticeship-fields">
                            <div className="profile-form-grid">
                                <TextFieldWithAutocomplete
                                    apiSearchRoute="/api/edu-providers/search/"
                                    fieldLabel="Who is your pre-apprenticeship provider? *"
                                    id="profile-creation-education-preapprenticeship-name"
                                    searchingText="Searching..."
                                    noResultsText="No education providers found..."
                                    value={education[classEdProviderObject] ?? ""}
                                    onChange={(e, val) => handleChange(index, classEdProviderObject, val)}
                                    searchPlaceholder="Pre-apprenticeship name (e.g.: Computing for All)"
                                    getOptionLabel={(option: EducationProviderDTO) => option.name ?? ''}
                                />
                                <SelectOptionsWithLabel
                                    id="profile-creation-education-preapprenticeship-system"
                                    className="w-full"
                                    options={(Object.values(PreAEduSystem) as string[]).map(
                                        value => ({ label: value, value })
                                    )}
                                    placeholder="Education system"
                                    onChange={(e) => handleChange(index, classPreAppEdSystem, e.target.value)}
                                    required
                                    value={education[classPreAppEdSystem]?.toString()}
                                >
                                    What is your education system? *
                                </SelectOptionsWithLabel>
                                <TextFieldWithAutocomplete
                                    apiSearchRoute="/api/edu-providers/programs/pre-apprenticeship/search/"
                                    fieldLabel="What is your program? *"
                                    id="profile-creation-education-preapprenticeship-program"
                                    searchingText="Searching..."
                                    noResultsText="No education provider programs found..."
                                    value={education[classProgramObject] ?? ""}
                                    onChange={(e, val) => handleChange(index, classProgramObject, val)}
                                    searchPlaceholder="Program name"
                                    getOptionLabel={(option: GeneralProgramDTO) => option.title ?? ''}
                                />
                            </div>
                            <div className="profile-form-grid md:grid-cols-2">
                                <DatePickerDayjs
                                    label={'Starting date *'}
                                    views={['month', 'year']}
                                    value={education[classStartDate] || null}
                                    onChange={(val: Dayjs | null) => handleChange(index, classStartDate, val)}
                                />
                                <DatePickerDayjs
                                    label={'Completion date *'}
                                    views={['month', 'year']}
                                    value={education[classEndDate] || null}
                                    onChange={(val: Dayjs | null) => handleChange(index, classEndDate, val)}
                                />
                            </div>
                            <Label>
                                <Checkbox
                                    id={classNamePrefix + education.uid + "-" + classIsCurrent}
                                    name={classNamePrefix + education.uid + "-" + classIsCurrent}
                                    checked={education[classIsCurrent]}
                                    onChange={(e) => handleChange(index, classIsCurrent, e.target.checked)}
                                />
                                Current
                            </Label>
                            <div className="profile-form-grid">
                                <InputTextWithLabel
                                    id={"profile-creation-education-preapprenticeship-gpa"}
                                    type="number"
                                    className="w-full"
                                    placeholder="Your GPA (ex: 4.0)"
                                    min="1.0"
                                    max="4.0"
                                    step="0.01"
                                    onChange={(e) => handleChange(index, classGPA, e.target.value)}
                                    required
                                    value={education[classGPA]}
                                >
                                    What is your grade?
                                </InputTextWithLabel>
                            </div>
                        </div>
                }
                {
                    (education[classEdLevel] !== EducationLevel.Other) ? "" :
                        <div id="profile-creation-education-other-fields">
                            <div className="profile-form-grid">
                                <TextFieldWithAutocomplete
                                    apiSearchRoute="/api/edu-providers/search/"
                                    fieldLabel="Who is your education provider? *"
                                    id="profile-creation-education-other-provider-name"
                                    searchingText="Searching..."
                                    noResultsText="No education providers found..."
                                    value={education[classEdProviderObject] ?? ""}
                                    onChange={(e, val) => handleChange(index, classEdProviderObject, val)}
                                    searchPlaceholder="Education provider name"
                                    getOptionLabel={(option: EducationProviderDTO) => option.name ?? ''}
                                />
                                <TextFieldWithAutocomplete
                                    apiSearchRoute="/api/edu-providers/programs/other/search/"
                                    fieldLabel="What is your education provider's program? *"
                                    id="profile-creation-education-other-provider-program-name"
                                    searchingText="Searching..."
                                    noResultsText="No education provider programs found..."
                                    value={education[classProgramObject] ?? ""}
                                    onChange={(e, val) => handleChange(index, classProgramObject, val)}
                                    searchPlaceholder="Education provider program name"
                                    getOptionLabel={(option: GeneralProgramDTO) => option.title ?? ''}
                                />
                            </div>
                            <div className="profile-form-grid md:grid-cols-2">
                                <DatePickerDayjs
                                    label={'Starting date *'}
                                    views={['month', 'year']}
                                    value={education[classStartDate] || null}
                                    onChange={(val: Dayjs | null) => handleChange(index, classStartDate, val)}
                                />
                                <DatePickerDayjs
                                    label={'Completion date *'}
                                    views={['month', 'year']}
                                    value={education[classEndDate] || null}
                                    onChange={(val: Dayjs | null) => handleChange(index, classEndDate, val)}
                                />
                            </div>
                            <Label>
                                <Checkbox
                                    id={classNamePrefix + education.uid + "-" + classIsCurrent}
                                    name={classNamePrefix + education.uid + "-" + classIsCurrent}
                                    checked={education[classIsCurrent]}
                                    onChange={(e) => handleChange(index, classIsCurrent, e.target.checked)}
                                />
                                Current
                            </Label>
                            <div className="profile-form-grid">
                                <InputTextWithLabel
                                    id={"profile-creation-education-other-gpa"}
                                    type="number"
                                    className="w-full"
                                    placeholder="Your GPA (ex: 4.0)"
                                    min="1.0"
                                    max="4.0"
                                    step="0.01"
                                    onChange={(e) => handleChange(index, classGPA, e.target.value)}
                                    required
                                    value={education[classGPA]}
                                >
                                    What is your grade?
                                </InputTextWithLabel>
                            </div>
                        </div>
                }
            </fieldset>
        ))
    );
});