import React, { memo, MouseEventHandler, useCallback } from 'react';
import { Button, Label } from 'flowbite-react';
import { Checkbox } from '@mui/material';
import { MdClose } from "react-icons/md";
import InputTextWithLabel from '../components/InputTextWithLabel';
import TextareaWithLabel from '../components/TextareaWithLabel';
import {v4 as uuidv4} from 'uuid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

const classNamePrefix = "profile-creation-work-experience-group-";
const classCompany = "company";
const classTitle = "title";
const classStarts = "starts";
const classEnds = "ends";
const classCurrent = "current";
const classExperience = "experience";

export interface WorkExperienceData {
  uid: string,
  [classCompany]: string,
  [classTitle]: string,
  [classStarts]: Dayjs,
  [classEnds]: Dayjs,
  [classCurrent]: boolean,
  [classExperience]: string,
}

export function defaultWorkExperienceData() : WorkExperienceData {
  return {
    uid: uuidv4(),
    [classCompany]: "",
    [classTitle]: "",
    [classStarts]: null,
    [classEnds]: null,
    [classCurrent]: false,
    [classExperience]: "",
  }
}

interface Props {
  data: WorkExperienceData[],
  onRemove: (uid:string) => void,
  onUpdate: (key: string, value: any) => void,
}

export default memo(function WorkExperiences({
  data,
  onRemove,
  onUpdate,
}:Props) {
  const handleChange = useCallback(<K extends keyof WorkExperienceData>(index:number, key:K, value:any) => {
    const changedWorkExperiences:WorkExperienceData[] = [...data];
    const updatedWorkExperience = changedWorkExperiences[index];
    updatedWorkExperience[key] = value;
    onUpdate('workExperiences', changedWorkExperiences);
  }, [data, onUpdate]);

  return (
    data.map((workExperience, index) => (
      <fieldset key={classNamePrefix + workExperience.uid + "-key"}>
        <legend className="w-full flex justify-between">
          <h3>Experience {index + 1}</h3>
          <Button onClick={() => onRemove(workExperience.uid)} size="xs" color="dark" outline pill><MdClose className="h-5 w-5" /></Button>
        </legend>
        <div className="profile-form-grid">
          <InputTextWithLabel
            id={classNamePrefix + workExperience.uid + "-" + classCompany}
            className="w-full"
            placeholder="Your company name"
            onChange={(e) => handleChange(index, classCompany, e.target.value)}
            required
            value={workExperience[classCompany]}
          >
            Company *
          </InputTextWithLabel>
          <InputTextWithLabel
            id={classNamePrefix + workExperience.uid + "-" + classTitle}
            className="w-full"
            placeholder="Your title"
            onChange={(e) => handleChange(index, classTitle, e.target.value)}
            required
            value={workExperience[classTitle]}
          >
            Title *
          </InputTextWithLabel>
        </div>
        <div className="profile-form-grid md:grid-cols-2">
          <DatePicker
              label={'Starts *'}
              views={['month', 'year']}
              value={workExperience[classStarts] || null}
              onChange={(val) => handleChange(index, classStarts, val)}
          />
          <DatePicker
              label={'Ends *'}
              views={['month', 'year']}
              value={workExperience[classEnds] || null}
              onChange={(val) => handleChange(index, classEnds, val)}
          />
        </div>
        <Label>
          <Checkbox
            id={classNamePrefix + workExperience.uid + "-" + classCurrent}
            name={classNamePrefix + workExperience.uid + "-" + classCurrent}
            checked={workExperience[classCurrent]}
            onChange={(e) => handleChange(index, classCurrent, e.target.checked)}
          />
          Current
        </Label>
        <div className="profile-form-grid">
          <TextareaWithLabel
            id={classNamePrefix + workExperience.uid + "-" + classExperience}
            placeholder="Your specific experience"
            onChange={(e: { target: { value: any; }; }) => handleChange(index, classExperience, e.target.value)}
            required
            value={workExperience[classExperience]}
          >
            Experience *
          </TextareaWithLabel>
        </div>
      </fieldset>
    ))
  );
});