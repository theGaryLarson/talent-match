import React, { memo, useCallback, useState } from 'react';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import { Button, Label } from 'flowbite-react';
import { Radio, Checkbox } from '@mui/material';
import { MdClose } from 'react-icons/md';
import {
  CollegeDegreeType,
  HighSchoolDegreeType,
  EducationLevel,
  PreAEduSystem,
  JsEducationInfoDTO,
  ProgramEnrollmentStatus,
} from '@/data/dtos/JobSeekerProfileCreationDTOs';
import { edu_providers, educators, provider_programs } from '@prisma/client';
import TextFieldWithAutocomplete from '../components/mui/TextFieldWithAutocomplete';
import RequiredTooltip from '../components/mui/RequiredTooltip';
import { EducationProviderDTO } from '@/data/dtos/EducationProviderDTO';
import { GeneralProgramDTO } from '@/data/dtos/GeneralProgramDTO';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

const classNamePrefix = 'profile-creation-education-group-';

const classEdLevel = 'edLevel';
const classEdProviderObject = 'edProviderObject'; // fixme edProviderObject
const classEdProviderId = 'edProviderId';
const classEdProviderName = 'edProviderName';
const classIsCurrent = 'isEnrolled';
const classStartDate = 'startDate';
const classEndDate = 'gradDate';
const classDegreeType = 'degreeType';
const classEnrollmentStatus = 'enrollmentStatus';
// const classGradeLevel = "schoolGradeLevel"; no longer needed as an input
// const classPreALevel = "preALevel";
const classProgramObject = 'programObject'; // fixme: rename to programId
const classProgramName = 'programName';
const classProgramId = 'programId';
// const classMajor = "major";
// const classMinor = "minor";
const classPreAppEdSystem = 'preAppEdSystem';
const classDescription = 'description';
const classGPA = 'gpa';
const classIsTechDegree = 'isTechDegree';

export interface EducationData {
  id: string;
  [classEdLevel]: EducationLevel;
  [classEdProviderName]: string;
  [classIsCurrent]: boolean;
  [classStartDate]: Dayjs | null;
  [classEndDate]: Dayjs | null;
  // [classGradeLevel]: string,
  [classEdProviderObject]?: EducationProviderDTO | null;
  [classEdProviderId]?: string | null;
  [classDegreeType]?: CollegeDegreeType | HighSchoolDegreeType | null;
  [classEnrollmentStatus]?: ProgramEnrollmentStatus | null;
  [classProgramObject]?: GeneralProgramDTO | null;
  [classProgramName]: string;
  [classProgramId]?: string | null;
  // [classMajor]?: string | null, //TODO:  replaced with program
  // [classMinor]?: string | null,
  [classPreAppEdSystem]?: PreAEduSystem | null;
  [classDescription]?: string | null;
  [classGPA]?: string | null;
  [classIsTechDegree]?: boolean;
}

export function defaultEducationData() {
  return {
    id: uuidv4(),
    [classEdLevel]: EducationLevel.Unselected,
    [classEdProviderObject]: null,
    [classEdProviderId]: null,
    [classEdProviderName]: '',
    [classIsCurrent]: false,
    [classStartDate]: null,
    [classEndDate]: null,
    [classDegreeType]: null,
    [classEnrollmentStatus]: null,
    // [classGradeLevel]: null,
    // [classPreALevel]: null,
    [classProgramObject]: null,
    [classProgramId]: null,
    [classProgramName]: '',
    // [classMajor]: "",
    // [classMinor]: "",
    [classPreAppEdSystem]: null,
    [classDescription]: '',
    [classGPA]: null,
    [classIsTechDegree]: undefined,
  };
}

interface Props {
  data: EducationData[];
  hasUnmetRequired: string;
  onRemove: (uid: string) => void;
  onUpdate: (key: string, value: any) => void;
}

export default memo(function Educations({
  data,
  hasUnmetRequired,
  onRemove,
  onUpdate,
}: Props) {
  const handleChange = useCallback(
    <K extends keyof EducationData>(index: number, key: K, value: any) => {
      const changedEducations: EducationData[] = [...data];
      const updatedEducation = changedEducations[index];
      updatedEducation[key] = value;
      if (key === classEdProviderObject) {
        if (typeof value === 'string') {
          updatedEducation[classEdProviderName] = value;
          updatedEducation[classEdProviderId] = uuidv4();
        } else if (value) {
          updatedEducation[classEdProviderName] = value.name;
          updatedEducation[classEdProviderId] = value.id;
        }
      } else if (key === classProgramObject) {
        if (typeof value === 'string') {
          updatedEducation[classProgramName] = value;
          updatedEducation[classProgramId] = uuidv4();
        } else if (value) {
          updatedEducation[classProgramName] = value.title;
          updatedEducation[classProgramId] = value.id;
        }
      }
      onUpdate('educations', changedEducations);
    },
    [data, onUpdate],
  );

  return data.map((education, index) => (
    <fieldset key={classNamePrefix + education.id + '-key'}>
      <legend className="flex w-full justify-between">
        <h3>Education {index + 1}</h3>
        <Button
          onClick={() => onRemove(education.id)}
          size="xs"
          color="dark"
          outline
          pill
        >
          <MdClose className="h-5 w-5" />
        </Button>
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
            checked={
              education[classEdLevel] === EducationLevel.PreApprenticeship
            }
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
      {education[classEdLevel] !== EducationLevel.HighSchool ? (
        ''
      ) : (
        <div id="profile-creation-education-high-school-fields">
          <div className="profile-form-grid">
            <RequiredTooltip
              open={
                hasUnmetRequired ===
                  `${education.id}-${classEdProviderObject}` &&
                !Boolean(education[classEdProviderObject])
              }
              errorMessage="A high school name is required"
            >
              <TextFieldWithAutocomplete
                apiSearchRoute="/api/edu-providers/search/"
                fieldLabel="What is your high school? *"
                id="profile-creation-education-high-school-name"
                searchingText="Searching..."
                noResultsText="No education providers found..."
                value={education[classEdProviderObject] ?? ''}
                onChange={(e, val) =>
                  handleChange(index, classEdProviderObject, val)
                }
                searchPlaceholder="High school name"
                getOptionLabel={(option: EducationProviderDTO) =>
                  option.name ?? ''
                }
              />
            </RequiredTooltip>
            <TextFieldWithAutocomplete
              apiSearchRoute="/api/edu-providers/programs/high-school/search/"
              fieldLabel="What is your program?"
              id="profile-creation-education-high-school-program"
              searchingText="Searching..."
              noResultsText="No education provider programs found..."
              value={education[classProgramObject] ?? ''}
              onChange={(e, val) =>
                handleChange(index, classProgramObject, val)
              }
              searchPlaceholder="Program name"
              getOptionLabel={(option: GeneralProgramDTO) => option.title ?? ''}
            />
            <SelectOptionsWithLabel
              id="profile-creation-education-high-school-degree"
              className="w-full"
              options={(Object.values(HighSchoolDegreeType) as string[]).map(
                (value) => ({ label: value, value }),
              )}
              placeholder="Degree type"
              onChange={(e) =>
                handleChange(index, classDegreeType, e.target.value)
              }
              value={education[classDegreeType] as string}
            >
              What is your degree type?
            </SelectOptionsWithLabel>

            {/*added for WJI data collection alignment (Please do not modify data).*/}
            <SelectOptionsWithLabel
              id="profile-creation-education-enrollment-status"
              className="w-full"
              options={(Object.values(ProgramEnrollmentStatus) as string[]).map(
                (value) => ({ label: value, value }),
              )}
              placeholder="Select enrollment status"
              onChange={(e) =>
                handleChange(index, classEnrollmentStatus, e.target.value)
              }
              required
              value={education[classEnrollmentStatus] as string}
            >
              What is your enrollment status? *
            </SelectOptionsWithLabel>
            {/*end add for WJI data collection alignment*/}
          </div>
          <div className="profile-form-grid md:grid-cols-2">
            <RequiredTooltip
              open={
                hasUnmetRequired === `${education.id}-${classStartDate}` &&
                !Boolean(education[classStartDate])
              }
              errorMessage="A starting date is required"
            >
              <DatePicker
                label={'Starting date *'}
                views={['month', 'year']}
                value={education[classStartDate] || null}
                onChange={(val: Dayjs | null) =>
                  handleChange(index, classStartDate, val)
                }
              />
            </RequiredTooltip>
            <RequiredTooltip
              open={
                hasUnmetRequired === `${education.id}-${classEndDate}` &&
                !Boolean(education[classEndDate])
              }
              errorMessage="A completion date is required"
            >
              <div>
                <DatePicker
                  label={'Completion date *'}
                  views={['month', 'year']}
                  value={education[classEndDate] || null}
                  onChange={(val: Dayjs | null) =>
                    handleChange(index, classEndDate, val)
                  }
                />
              </div>
            </RequiredTooltip>
          </div>
          {/*<Label>*/}
          {/*  <Checkbox*/}
          {/*    id={classNamePrefix + education.id + '-' + classIsCurrent}*/}
          {/*    name={classNamePrefix + education.id + '-' + classIsCurrent}*/}
          {/*    checked={education[classIsCurrent]}*/}
          {/*    onChange={(e) =>*/}
          {/*      handleChange(index, classIsCurrent, e.target.checked)*/}
          {/*    }*/}
          {/*  />*/}
          {/*  Current*/}
          {/*</Label>*/}
          <div className="profile-form-grid">
            <InputTextWithLabel
              id={'profile-creation-education-high-school-gpa'}
              type="text"
              className="w-full"
              placeholder="Your GPA (ex: 4.0)"
              onChange={(e) => handleChange(index, classGPA, e.target.value)}
              value={education[classGPA] ?? ''}
            >
              What is your grade?
            </InputTextWithLabel>
          </div>
        </div>
      )}
      {education[classEdLevel] !== EducationLevel.College ? (
        ''
      ) : (
        <div id="profile-creation-education-college-fields">
          <div className="profile-form-grid">
            <RequiredTooltip
              open={
                hasUnmetRequired ===
                  `${education.id}-${classEdProviderObject}` &&
                !Boolean(education[classEdProviderObject])
              }
              errorMessage="A college name is required"
            >
              <TextFieldWithAutocomplete
                apiSearchRoute="/api/edu-providers/search/"
                fieldLabel="What is your college? *"
                id="profile-creation-education-college-name"
                searchingText="Searching..."
                noResultsText="No education providers found..."
                value={education[classEdProviderObject] ?? ''}
                onChange={(e, val) =>
                  handleChange(index, classEdProviderObject, val)
                }
                searchPlaceholder="College name"
                getOptionLabel={(option: EducationProviderDTO) =>
                  option.name ?? ''
                }
              />
            </RequiredTooltip>
            <TextFieldWithAutocomplete
              apiSearchRoute="/api/edu-providers/programs/college/search/"
              fieldLabel="What is your program?"
              id="profile-creation-education-college-program"
              searchingText="Searching..."
              noResultsText="No education provider programs found..."
              value={education[classProgramObject] ?? ''}
              onChange={(e, val) =>
                handleChange(index, classProgramObject, val)
              }
              searchPlaceholder="Program name"
              getOptionLabel={(option: GeneralProgramDTO) => option.title ?? ''}
            />
            <SelectOptionsWithLabel
              id="profile-creation-education-college-degree"
              className="w-full"
              options={(Object.values(CollegeDegreeType) as string[]).map(
                (value) => ({ label: value, value }),
              )}
              placeholder="Degree type"
              onChange={(e) =>
                handleChange(index, classDegreeType, e.target.value)
              }
              value={education[classDegreeType] as string}
            >
              What is your degree type?
            </SelectOptionsWithLabel>
            {/*added for WJI data collection alignment (Please do not modify data).*/}
            <SelectOptionsWithLabel
              id="profile-creation-education-enrollment-status"
              className="w-full"
              options={(Object.values(ProgramEnrollmentStatus) as string[]).map(
                (value) => ({ label: value, value }),
              )}
              placeholder="Select enrollment status"
              onChange={(e) =>
                handleChange(index, classEnrollmentStatus, e.target.value)
              }
              required
              value={education[classEnrollmentStatus] as string}
            >
              What is your enrollment status? *
            </SelectOptionsWithLabel>
            {/*end add for WJI data collection alignment*/}
          </div>
          <div className="profile-form-grid md:grid-cols-2">
            <RequiredTooltip
              open={
                hasUnmetRequired === `${education.id}-${classStartDate}` &&
                !Boolean(education[classStartDate])
              }
              errorMessage="A starting date is required"
            >
              <DatePicker
                label={'Starting date *'}
                views={['month', 'year']}
                value={education[classStartDate] || null}
                onChange={(val: Dayjs | null) =>
                  handleChange(index, classStartDate, val)
                }
              />
            </RequiredTooltip>
            <RequiredTooltip
              open={
                hasUnmetRequired === `${education.id}-${classEndDate}` &&
                !Boolean(education[classEndDate])
              }
              errorMessage="A completion date is required"
            >
              <DatePicker
                label={'Completion date *'}
                views={['month', 'year']}
                value={education[classEndDate] || null}
                onChange={(val: Dayjs | null) =>
                  handleChange(index, classEndDate, val)
                }
              />
            </RequiredTooltip>
          </div>
          {/*<Label>*/}
          {/*  <Checkbox*/}
          {/*    id={classNamePrefix + education.id + '-' + classIsCurrent}*/}
          {/*    name={classNamePrefix + education.id + '-' + classIsCurrent}*/}
          {/*    checked={education[classIsCurrent]}*/}
          {/*    onChange={(e) =>*/}
          {/*      handleChange(index, classIsCurrent, e.target.checked)*/}
          {/*    }*/}
          {/*  />*/}
          {/*  Current*/}
          {/*</Label>*/}
          <div className="profile-form-grid">
            <InputTextWithLabel
              id={'profile-creation-education-college-gpa'}
              type="text"
              className="w-full"
              placeholder="Your GPA (ex: 4.0)"
              onChange={(e) => handleChange(index, classGPA, e.target.value)}
              value={education[classGPA] ?? ''}
            >
              What is your grade?
            </InputTextWithLabel>
          </div>
        </div>
      )}
      {education[classEdLevel] !== EducationLevel.TrainingProgram ? (
        ''
      ) : (
        <div id="profile-creation-education-training-program-fields">
          <div className="profile-form-grid">
            <RequiredTooltip
              open={
                hasUnmetRequired ===
                  `${education.id}-${classEdProviderObject}` &&
                !Boolean(education[classEdProviderObject])
              }
              errorMessage="A training provider name is required"
            >
              <TextFieldWithAutocomplete
                apiSearchRoute="/api/edu-providers/search/"
                fieldLabel="Who is your training provider? *"
                id="profile-creation-education-training-provider-name"
                searchingText="Searching..."
                noResultsText="No education providers found..."
                value={education[classEdProviderObject] ?? ''}
                onChange={(e, val) =>
                  handleChange(index, classEdProviderObject, val)
                }
                searchPlaceholder="Training provider name"
                getOptionLabel={(option: EducationProviderDTO) =>
                  option.name ?? ''
                }
              />
            </RequiredTooltip>
            <TextFieldWithAutocomplete
              apiSearchRoute="/api/edu-providers/programs/training-programs/search/"
              fieldLabel="What is your training program?"
              id="profile-creation-education-training-provider-program-name"
              searchingText="Searching..."
              noResultsText="No education provider programs found..."
              value={education[classProgramObject] ?? ''}
              onChange={(e, val) =>
                handleChange(index, classProgramObject, val)
              }
              searchPlaceholder="Training program name"
              getOptionLabel={(option: GeneralProgramDTO) => option.title ?? ''}
            />
            {/*added for WJI data collection alignment (Please do not modify data).*/}
            <SelectOptionsWithLabel
              id="profile-creation-education-enrollment-status"
              className="w-full"
              options={(Object.values(ProgramEnrollmentStatus) as string[]).map(
                (value) => ({ label: value, value }),
              )}
              placeholder="Select enrollment status"
              onChange={(e) =>
                handleChange(index, classEnrollmentStatus, e.target.value)
              }
              required
              value={education[classEnrollmentStatus] as string}
            >
              What is your enrollment status? *
            </SelectOptionsWithLabel>
            {/*end add for WJI data collection alignment*/}
          </div>
          <div className="profile-form-grid md:grid-cols-2">
            <RequiredTooltip
              open={
                hasUnmetRequired === `${education.id}-${classStartDate}` &&
                !Boolean(education[classStartDate])
              }
              errorMessage="A starting date is required"
            >
              <DatePicker
                label={'Starting date *'}
                views={['month', 'year']}
                value={education[classStartDate] || null}
                onChange={(val: Dayjs | null) =>
                  handleChange(index, classStartDate, val)
                }
              />
            </RequiredTooltip>
            <RequiredTooltip
              open={
                hasUnmetRequired === `${education.id}-${classEndDate}` &&
                !Boolean(education[classEndDate])
              }
              errorMessage="A completion date is required"
            >
              <DatePicker
                label={'Completion date *'}
                views={['month', 'year']}
                value={education[classEndDate] || null}
                onChange={(val: Dayjs | null) =>
                  handleChange(index, classEndDate, val)
                }
              />
            </RequiredTooltip>
          </div>
          {/*<Label>*/}
          {/*  <Checkbox*/}
          {/*    id={classNamePrefix + education.id + '-' + classIsCurrent}*/}
          {/*    name={classNamePrefix + education.id + '-' + classIsCurrent}*/}
          {/*    checked={education[classIsCurrent]}*/}
          {/*    onChange={(e) =>*/}
          {/*      handleChange(index, classIsCurrent, e.target.checked)*/}
          {/*    }*/}
          {/*  />*/}
          {/*  Current*/}
          {/*</Label>*/}
          <div className="profile-form-grid">
            <InputTextWithLabel
              id={'profile-creation-education-training-program-gpa'}
              type="text"
              className="w-full"
              placeholder="Your GPA (ex: 4.0)"
              onChange={(e) => handleChange(index, classGPA, e.target.value)}
              value={education[classGPA] ?? ''}
            >
              What is your grade?
            </InputTextWithLabel>
          </div>
        </div>
      )}
      {education[classEdLevel] !== EducationLevel.PreApprenticeship ? (
        ''
      ) : (
        <div id="profile-creation-education-preapprenticeship-fields">
          <div className="profile-form-grid">
            <RequiredTooltip
              open={
                hasUnmetRequired ===
                  `${education.id}-${classEdProviderObject}` &&
                !Boolean(education[classEdProviderObject])
              }
              errorMessage="A pre-apprenticeship provider name is required"
            >
              <TextFieldWithAutocomplete
                apiSearchRoute="/api/edu-providers/search/"
                fieldLabel="Who is your pre-apprenticeship provider? *"
                id="profile-creation-education-preapprenticeship-name"
                searchingText="Searching..."
                noResultsText="No education providers found..."
                value={education[classEdProviderObject] ?? ''}
                onChange={(e, val) =>
                  handleChange(index, classEdProviderObject, val)
                }
                searchPlaceholder="Pre-apprenticeship name (e.g.: Computing for All)"
                getOptionLabel={(option: EducationProviderDTO) =>
                  option.name ?? ''
                }
              />
            </RequiredTooltip>
            <SelectOptionsWithLabel
              id="profile-creation-education-preapprenticeship-system"
              className="w-full"
              options={(Object.values(PreAEduSystem) as string[]).map(
                (value) => ({ label: value, value }),
              )}
              placeholder="Education system"
              onChange={(e) =>
                handleChange(index, classPreAppEdSystem, e.target.value)
              }
              value={education[classPreAppEdSystem]?.toString() ?? ''}
            >
              What is your education system?
            </SelectOptionsWithLabel>
            <TextFieldWithAutocomplete
              apiSearchRoute="/api/edu-providers/programs/pre-apprenticeship/search/"
              fieldLabel="What is your program?"
              id="profile-creation-education-preapprenticeship-program"
              searchingText="Searching..."
              noResultsText="No education provider programs found..."
              value={education[classProgramObject] ?? ''}
              onChange={(e, val) =>
                handleChange(index, classProgramObject, val)
              }
              searchPlaceholder="Program name"
              getOptionLabel={(option: GeneralProgramDTO) => option.title ?? ''}
            />
            {/*added for WJI data collection alignment (Please do not modify data).*/}
            <SelectOptionsWithLabel
              id="profile-creation-education-enrollment-status"
              className="w-full"
              options={(Object.values(ProgramEnrollmentStatus) as string[]).map(
                (value) => ({ label: value, value }),
              )}
              placeholder="Select enrollment status"
              onChange={(e) =>
                handleChange(index, classEnrollmentStatus, e.target.value)
              }
              required
              value={education[classEnrollmentStatus] as string}
            >
              What is your enrollment status? *
            </SelectOptionsWithLabel>
            {/*end add for WJI data collection alignment*/}
          </div>
          <div className="profile-form-grid md:grid-cols-2">
            <RequiredTooltip
              open={
                hasUnmetRequired === `${education.id}-${classStartDate}` &&
                !Boolean(education[classStartDate])
              }
              errorMessage="A starting date is required"
            >
              <DatePicker
                label={'Starting date *'}
                views={['month', 'year']}
                value={education[classStartDate] || null}
                onChange={(val: Dayjs | null) =>
                  handleChange(index, classStartDate, val)
                }
              />
            </RequiredTooltip>
            <RequiredTooltip
              open={
                hasUnmetRequired === `${education.id}-${classEndDate}` &&
                !Boolean(education[classEndDate])
              }
              errorMessage="A completion date is required"
            >
              <DatePicker
                label={'Completion date *'}
                views={['month', 'year']}
                value={education[classEndDate] || null}
                onChange={(val: Dayjs | null) =>
                  handleChange(index, classEndDate, val)
                }
              />
            </RequiredTooltip>
          </div>
          {/*<Label>*/}
          {/*  <Checkbox*/}
          {/*    id={classNamePrefix + education.id + '-' + classIsCurrent}*/}
          {/*    name={classNamePrefix + education.id + '-' + classIsCurrent}*/}
          {/*    checked={education[classIsCurrent]}*/}
          {/*    onChange={(e) =>*/}
          {/*      handleChange(index, classIsCurrent, e.target.checked)*/}
          {/*    }*/}
          {/*  />*/}
          {/*  Current*/}
          {/*</Label>*/}
          <div className="profile-form-grid">
            <InputTextWithLabel
              id={'profile-creation-education-preapprenticeship-gpa'}
              type="text"
              className="w-full"
              placeholder="Your GPA (ex: 4.0)"
              onChange={(e) => handleChange(index, classGPA, e.target.value)}
              value={education[classGPA] ?? ''}
            >
              What is your grade?
            </InputTextWithLabel>
          </div>
        </div>
      )}
      {education[classEdLevel] !== EducationLevel.Other ? (
        ''
      ) : (
        <div id="profile-creation-education-other-fields">
          <div className="profile-form-grid">
            <RequiredTooltip
              open={
                hasUnmetRequired ===
                  `${education.id}-${classEdProviderObject}` &&
                !Boolean(education[classEdProviderObject])
              }
              errorMessage="An education provider name is required"
            >
              <TextFieldWithAutocomplete
                apiSearchRoute="/api/edu-providers/search/"
                fieldLabel="Who is your education provider? *"
                id="profile-creation-education-other-provider-name"
                searchingText="Searching..."
                noResultsText="No education providers found..."
                value={education[classEdProviderObject] ?? ''}
                onChange={(e, val) =>
                  handleChange(index, classEdProviderObject, val)
                }
                searchPlaceholder="Education provider name"
                getOptionLabel={(option: EducationProviderDTO) =>
                  option.name ?? ''
                }
              />
            </RequiredTooltip>
            <RequiredTooltip
              open={
                hasUnmetRequired === `${education.id}-${classProgramObject}` &&
                !Boolean(education[classProgramObject])
              }
              errorMessage="An education provider program name is required"
            >
              <TextFieldWithAutocomplete
                apiSearchRoute="/api/edu-providers/programs/other/search/"
                fieldLabel="What is your education provider's program? *"
                id="profile-creation-education-other-provider-program-name"
                searchingText="Searching..."
                noResultsText="No education provider programs found..."
                value={education[classProgramObject] ?? ''}
                onChange={(e, val) =>
                  handleChange(index, classProgramObject, val)
                }
                searchPlaceholder="Education provider program name"
                getOptionLabel={(option: GeneralProgramDTO) =>
                  option.title ?? ''
                }
              />
            </RequiredTooltip>
            {/*added for WJI data collection alignment (Please do not modify data).*/}
            <SelectOptionsWithLabel
              id="profile-creation-education-enrollment-status"
              className="w-full"
              options={(Object.values(ProgramEnrollmentStatus) as string[]).map(
                (value) => ({ label: value, value }),
              )}
              placeholder="Select enrollment status"
              onChange={(e) =>
                handleChange(index, classEnrollmentStatus, e.target.value)
              }
              required
              value={education[classEnrollmentStatus] as string}
            >
              What is your enrollment status? *
            </SelectOptionsWithLabel>
            {/*end add for WJI data collection alignment*/}
          </div>
          <div className="profile-form-grid md:grid-cols-2">
            <RequiredTooltip
              open={
                hasUnmetRequired === `${education.id}-${classStartDate}` &&
                !Boolean(education[classStartDate])
              }
              errorMessage="A starting date is required"
            >
              <DatePicker
                label={'Starting date *'}
                views={['month', 'year']}
                value={education[classStartDate] || null}
                onChange={(val: Dayjs | null) =>
                  handleChange(index, classStartDate, val)
                }
              />
            </RequiredTooltip>
            <RequiredTooltip
              open={
                hasUnmetRequired === `${education.id}-${classEndDate}` &&
                !Boolean(education[classEndDate])
              }
              errorMessage="A completion date is required"
            >
              <DatePicker
                label={'Completion date *'}
                views={['month', 'year']}
                value={education[classEndDate] || null}
                onChange={(val: Dayjs | null) =>
                  handleChange(index, classEndDate, val)
                }
              />
            </RequiredTooltip>
          </div>
          {/*<Label>*/}
          {/*  <Checkbox*/}
          {/*    id={classNamePrefix + education.id + '-' + classIsCurrent}*/}
          {/*    name={classNamePrefix + education.id + '-' + classIsCurrent}*/}
          {/*    checked={education[classIsCurrent]}*/}
          {/*    onChange={(e) =>*/}
          {/*      handleChange(index, classIsCurrent, e.target.checked)*/}
          {/*    }*/}
          {/*  />*/}
          {/*  Current*/}
          {/*</Label>*/}
          <div className="profile-form-grid">
            <InputTextWithLabel
              id={'profile-creation-education-other-gpa'}
              type="text"
              className="w-full"
              placeholder="Your GPA (ex: 4.0)"
              onChange={(e) => handleChange(index, classGPA, e.target.value)}
              value={education[classGPA] ?? ''}
            >
              What is your grade?
            </InputTextWithLabel>
          </div>
        </div>
      )}
    </fieldset>
  ));
});
