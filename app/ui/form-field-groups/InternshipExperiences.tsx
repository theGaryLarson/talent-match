import React, { memo, useCallback } from 'react';
import { Button, Label } from 'flowbite-react';
import { Checkbox } from '@mui/material';
import { MdClose } from "react-icons/md";
import InputTextWithLabel from '../components/InputTextWithLabel';
import TextareaWithLabel from '../components/TextareaWithLabel';
import { v4 as uuidv4 } from 'uuid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

const classNamePrefix = "profile-creation-internship-experience-group-";
const classCompany = "company";
const classTitle = "title";
const classStarts = "starts";
const classEnds = "ends";
const classCurrent = "current";
const classExperience = "experience";

export interface InternshipExperienceData {
  uid: string,
  [classCompany]: string,
  [classTitle]: string,
  [classStarts]: Dayjs | null,
  [classEnds]: Dayjs | null,
  [classCurrent]: boolean,
  [classExperience]: string,
}

export function defaultInternshipExperienceData() {
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
  data: InternshipExperienceData[],
  onRemove: (uid:string) => void,
  onUpdate: (key: string, value: any) => void,
}

export default memo(function InternshipExperiences({
  data,
  onRemove,
  onUpdate,
}:Props){
  const handleChange = useCallback(<K extends keyof InternshipExperienceData>(index:number, key:K, value:any) => {
    const changedInternshipExperiences:InternshipExperienceData[] = [...data];
    const updatedInternshipExperience = changedInternshipExperiences[index];
    updatedInternshipExperience[key] = value;
    onUpdate('internshipExperiences', changedInternshipExperiences);
  }, [data, onUpdate]);

  return (
    data.map((internshipExperience, index) => (
      <fieldset key={classNamePrefix + internshipExperience.uid + "-key"}>
        <legend className="w-full flex justify-between">
          <h3>Experience {index + 1}</h3>
          <Button onClick={() => onRemove(internshipExperience.uid)} size="xs" color="dark" outline pill><MdClose className="h-5 w-5" /></Button>
        </legend>
        <div className="profile-form-grid">
          <InputTextWithLabel
            id={classNamePrefix + internshipExperience.uid + "-" + classCompany}
            className="w-full"
            placeholder="Your company name"
            onChange={(e) => handleChange(index, classCompany, e.target.value)}
            required
            value={internshipExperience[classCompany]}
          >
            Company *
          </InputTextWithLabel>
          <InputTextWithLabel
            id={classNamePrefix + internshipExperience.uid + "-" + classTitle}
            className="w-full"
            placeholder="Your title"
            onChange={(e) => handleChange(index, classTitle, e.target.value)}
            required
            value={internshipExperience[classTitle]}
          >
            Title *
          </InputTextWithLabel>
        </div>
        <div className="profile-form-grid md:grid-cols-2">
          <DatePicker
              label={'Starts *'}
              views={['month', 'year']}
              value={internshipExperience[classStarts] || null}
              onChange={(val) => handleChange(index, classStarts, val)}
          />
          <DatePicker
              label={'Ends *'}
              views={['month', 'year']}
              value={internshipExperience[classEnds] || null}
              onChange={(val) => handleChange(index, classEnds, val)}
          />
        </div>
        <Label>
          <Checkbox
            id={classNamePrefix + internshipExperience.uid + "-" + classCurrent}
            name={classNamePrefix + internshipExperience.uid + "-" + classCurrent}
            checked={internshipExperience[classCurrent]}
            onChange={(e) => handleChange(index, classCurrent, e.target.checked)}
          />
          Current
        </Label>
        <div className="profile-form-grid">
          <TextareaWithLabel
            id={classNamePrefix + internshipExperience.uid + "-" + classExperience}
            placeholder="Your specific experience"
            onChange={(e: { target: { value: any; }; }) => handleChange(index, classExperience, e.target.value)}
            required
            value={internshipExperience[classExperience]}
          >
            Experience *
          </TextareaWithLabel>
        </div>
      </fieldset>
    ))
  );
});