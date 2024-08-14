import React, { memo, useCallback, useState } from 'react';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import {Button, Checkbox, Label, Radio} from "flowbite-react";
import { MdClose } from "react-icons/md";
import { DegreeType, EdProgram, EdSystem, EducationInfoDTO, PreALevel, SchoolGradeLevel } from '@/data/dtos/JobSeekerProfileCreationDTOs';

const classNamePrefix = "profile-creation-education-group-";

const classProgramType = "edProgram";
const classInstitutionId = "edInstitutionId";
const classInstitutionName = "institutionName";
const classCurrent = "isEnrolled";
const classStartDate = "startDate";
const classEndDate = "gradDate";
const classDegreeType = "degreeType";
const classGradeLevel = "schoolGradeLevel";
const classPreALevel = "preALevel";
const classCollegeProgram = "collegeProgram";
const classMajor = "major";
const classMinor = "minor";
const classEdSystem = "edSystem";
const classDescription = "description";
const classGPA = "gpa";

export interface EducationData {
  "uid": number,
  [classProgramType]: EdProgram,
  [classInstitutionId]: string,
  [classInstitutionName]?: string,
  [classCurrent]: boolean,
  [classStartDate]: string,
  [classEndDate]: string,
  [classDegreeType]?: DegreeType,
  [classGradeLevel]?: SchoolGradeLevel | null,
  [classPreALevel]?: PreALevel | null,
  [classCollegeProgram]?: string | null,
  [classMajor]?: string | null,
  [classMinor]?: string | null,
  [classEdSystem]?: EdSystem | null,
  [classDescription]?: string | null,
  [classGPA]?: number | null,
}

let uniqueListID = 0;
export function defaultEducationData() {
  return {
    "uid": uniqueListID++,
    [classProgramType]: EdProgram.None,
    [classInstitutionId]: "",
    [classInstitutionName]: "",
    [classCurrent]: false,
    [classStartDate]: "",
    [classEndDate]: "",
    [classDegreeType]: DegreeType.None,
    [classGradeLevel]: null,
    [classPreALevel]: null,
    [classCollegeProgram]: "",
    [classMajor]: "",
    [classMinor]: "",
    [classEdSystem]: null,
    [classDescription]: "",
    [classGPA]: null,
  }
}

interface Props {
  data: EducationData[],
  onRemove: (uid:number) => void,
  onUpdate: (key: string, value: any) => void,
}

export default memo(function Licenses({
  data,
  onRemove,
  onUpdate,
}:Props) {
  const [eduProgram, setEduProgram] = useState("");

  const handleChange = useCallback(<K extends keyof EducationData>(index:number, key:K, value:any) => {
    const changedEducations:EducationData[] = [...data];
    const updatedEducation = changedEducations[index];
    updatedEducation[key] = value;
    onUpdate('educations', changedEducations);
  }, [data, onUpdate]);

  return (
    data.map((education, index) => (
      <fieldset key={classNamePrefix + education.uid + "-key"}>
        <legend className="w-full flex justify-between">
          <h3>Education {index + 1}</h3>
          <Button onClick={() => onRemove(education.uid)} size="xs" color="dark" outline pill><MdClose className="h-5 w-5" /></Button>
        </legend>
        
        <div>
            What type of program is this education? *
            <Label className="block">
                <Radio
                    name="profile-creation-education-currently-enrolled"
                    checked={education[classProgramType] === EdProgram.HighSchool}
                    onChange={(e) => handleChange(index, classProgramType, e.target.value)}
                    required
                    value={EdProgram.HighSchool}
                />
                High school
            </Label>
            <Label className="block">
                <Radio
                    name="profile-creation-education-currently-enrolled"
                    checked={education[classProgramType] === EdProgram.College}
                    onChange={(e) => handleChange(index, classProgramType, e.target.value)}
                    required
                    value={EdProgram.College}
                />
                College
            </Label>
            <Label className="block">
                <Radio
                    name="profile-creation-education-currently-enrolled"
                    checked={education[classProgramType] === EdProgram.TrainingProgram}
                    onChange={(e) => handleChange(index, classProgramType, e.target.value)}
                    required
                    value={EdProgram.TrainingProgram}
                />
                Training program / Bootcamp
            </Label>
            <Label className="block">
                <Radio
                    name="profile-creation-education-currently-enrolled"
                    checked={education[classProgramType] === EdProgram.PreApprenticeship}
                    onChange={(e) => handleChange(index, classProgramType, e.target.value)}
                    required
                    value={EdProgram.PreApprenticeship}
                />
                Pre-apprenticeship
            </Label>
            <Label className="block">
                <Radio
                    name="profile-creation-education-currently-enrolled"
                    checked={education[classProgramType] === EdProgram.Other}
                    onChange={(e) => handleChange(index, classProgramType, e.target.value)}
                    required
                    value={EdProgram.Other}
                />
                Other
            </Label>
        </div>
    {
        (education[classProgramType] !== EdProgram.HighSchool) ? "" :
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
                    onChange={(e) => handleChange(index, classInstitutionName, e.target.value)}
                    required
                    value={education[classInstitutionName]}
                >
                    What is your school? *
                </SelectOptionsWithLabel>
                <div className="flex">
                    <InputTextWithLabel
                        type="month"
                        id="profile-creation-education-high-school-starting-date"
                        className="w-1/2"
                        value={education[classStartDate]}
                        onChange={(e) => handleChange(index, classStartDate, e.target.value)}
                        required
                    >
                        Starting date *
                    </InputTextWithLabel>
                    <InputTextWithLabel
                        type="month"
                        id="profile-creation-education-high-school-completion-date"
                        className="w-1/2"
                        value={education[classEndDate]}
                        onChange={(e) => handleChange(index, classEndDate, e.target.value)}
                        required={(education[classCurrent])?false:true}
                        disabled={(education[classCurrent])?true:false}
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
                    onChange={(e) => handleChange(index, classGradeLevel, e.target.value)}
                    required
                    value={education[classGradeLevel]?.toString()}
                >
                    What is your grade? *
                </SelectOptionsWithLabel>
                <InputTextWithLabel
                    type="number"
                    id="profile-creation-education-high-school-gpa"
                    className="w-full"
                    value={education[classGPA]}
                    onChange={(e) => handleChange(index, classGPA, e.target.value)}
                    required
                >
                    What is your cumulative GPA? *
                </InputTextWithLabel>
            </div>
    }
    {
        (education[classProgramType] !== EdProgram.College) ? "" :
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
                    onChange={(e) => handleChange(index, classInstitutionName, e.target.value)}
                    required
                    value={education[classInstitutionName]}
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
                    onChange={(e) => handleChange(index, classProgramType, e.target.value)}
                    required
                    value={education[classProgramType]}
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
                    onChange={(e) => handleChange(index, classDegreeType, e.target.value)}
                    required
                    value={education[classDegreeType]}
                >
                    What is your degree type? *
                </SelectOptionsWithLabel>
                <div className="flex">
                    <InputTextWithLabel
                        type="month"
                        id="profile-creation-education-college-starting-date"
                        className="w-1/2"
                        value={education[classStartDate]}
                        onChange={(e) => handleChange(index, classStartDate, e.target.value)}
                        required
                    >
                        Starting date *
                    </InputTextWithLabel>
                    <InputTextWithLabel
                        type="month"
                        id="profile-creation-education-college-completion-date"
                        className="w-1/2"
                        value={education[classEndDate]}
                        onChange={(e) => handleChange(index, classEndDate, e.target.value)}
                        required={(education[classCurrent])?false:true}
                        disabled={(education[classCurrent])?true:false}
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
                    onChange={(e) => handleChange(index, classGradeLevel, e.target.value)}
                    required
                    value={education[classGradeLevel]?.toString()}
                >
                    What is your grade? *
                </SelectOptionsWithLabel>
                <InputTextWithLabel
                    type="number"
                    id="profile-creation-education-college-gpa"
                    className="w-full"
                    value={education[classGPA]}
                    onChange={(e) => handleChange(index, classGPA, e.target.value)}
                    required
                >
                    What is your cumulative GPA? *
                </InputTextWithLabel>
            </div>
    }
    {
        (education[classProgramType] !== EdProgram.TrainingProgram) ? "" :
            <div id="profile-creation-education-training-program-fields">
                <InputTextWithLabel
                    id="profile-creation-education-training-program-name"
                    placeholder="Training program name"
                    className="w-full"
                    value={education[classInstitutionName]}
                    onChange={(e) => handleChange(index, classInstitutionName, e.target.value)}
                    required
                >
                    What is your Training program *
                </InputTextWithLabel>
                <div className="flex">
                    <InputTextWithLabel
                        type="month"
                        id="profile-creation-education-training-program-starting-date"
                        className="w-1/2"
                        value={education[classStartDate]}
                        onChange={(e) => handleChange(index, classStartDate, e.target.value)}
                        required
                    >
                        Starting date *
                    </InputTextWithLabel>
                    <InputTextWithLabel
                        type="month"
                        id="profile-creation-education-training-program-completion-date"
                        className="w-1/2"
                        value={education[classEndDate]}
                        onChange={(e) => handleChange(index, classEndDate, e.target.value)}
                        required={(education[classCurrent])?false:true}
                        disabled={(education[classCurrent])?true:false}
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
            </div>
    }
    {
        (education[classProgramType] !== EdProgram.PreApprenticeship) ? "" :
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
                    onChange={(e) => handleChange(index, classEdSystem, e.target.value)}
                    required
                    value={education[classEdSystem]?.toString()}
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
                    onChange={(e) => handleChange(index, classProgramType, e.target.value)}
                    required
                    value={education[classProgramType]}
                >
                    What is your program? *
                </SelectOptionsWithLabel>
                <div className="flex">
                    <InputTextWithLabel
                        type="month"
                        id="profile-creation-education-preapprenticeship-starting-date"
                        className="w-1/2"
                        value={education[classStartDate]}
                        onChange={(e) => handleChange(index, classStartDate, e.target.value)}
                        required
                    >
                        Starting date *
                    </InputTextWithLabel>
                    <InputTextWithLabel
                        type="month"
                        id="profile-creation-education-preapprenticeship-completion-date"
                        className="w-1/2"
                        value={education[classEndDate]}
                        onChange={(e) => handleChange(index, classEndDate, e.target.value)}
                        required={(education[classCurrent])?false:true}
                        disabled={(education[classCurrent])?true:false}
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
                <SelectOptionsWithLabel
                    id="profile-creation-education-preapprenticeship-grade"
                    className="w-full"
                    options={[
                        {label: "Level 1", value: "Level 1"},
                        {label: "Level 2", value: "Level 2"},
                        {label: "Level 3", value: "Level 3"},
                        {label: "Level 4", value: "Level 4"},
                        {label: "Level 5", value: "Level 5"},
                        {label: "Level 6", value: "Level 6"},
                        {label: "Last Mile", value: "Last Mile"},
                    ]}
                    placeholder="Please select your current grade"
                    onChange={(e) => handleChange(index, classPreALevel, e.target.value)}
                    required
                    value={education[classPreALevel]?.toString()}
                >
                    What is your grade? *
                </SelectOptionsWithLabel>
            </div>
    }
    {
        (education[classProgramType] !== EdProgram.Other) ? "" :
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
                        value={education[classStartDate]}
                        onChange={(e) => handleChange(index, classStartDate, e.target.value)}
                        required
                    >
                        Starting date *
                    </InputTextWithLabel>
                    <InputTextWithLabel
                        type="month"
                        id="profile-creation-education-other-completion-date"
                        className="w-1/2"
                        value={education[classEndDate]}
                        onChange={(e) => handleChange(index, classEndDate, e.target.value)}
                        required={(education[classCurrent])?false:true}
                        disabled={(education[classCurrent])?true:false}
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
            </div>
    }
      </fieldset>
    ))
  );
});