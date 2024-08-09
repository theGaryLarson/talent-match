import React, { memo, useCallback } from 'react';
import { Button, Checkbox, Label } from 'flowbite-react';
import { MdClose } from "react-icons/md";
import InputTextWithLabel from '../components/InputTextWithLabel';
import TextareaWithLabel from '../components/TextareaWithLabel';

const classNamePrefix = "profile-creation-internship-experience-group-";
const classCompany = "company";
const classTitle = "title";
const classStarts = "starts";
const classEnds = "ends";
const classCurrent = "current";
const classExperience = "experience";

export interface InternshipExperienceData {
  uid: number,
  [classCompany]: string,
  [classTitle]: string,
  [classStarts]: string,
  [classEnds]: string,
  [classCurrent]: boolean,
  [classExperience]: string,
}

let uniqueListID = 0;
export function defaultInternshipExperienceData() {
  return {
    uid: uniqueListID++,
    [classCompany]: "",
    [classTitle]: "",
    [classStarts]: "",
    [classEnds]: "",
    [classCurrent]: false,
    [classExperience]: "",
  }
}

interface Props {
  data: InternshipExperienceData[],
  onRemove: (uid:number) => void,
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
        <div className="flex">
          <InputTextWithLabel
            type="month"
            id={classNamePrefix + internshipExperience.uid + "-" + classStarts}
            className="w-1/2"
            onChange={(e) => handleChange(index, classStarts, e.target.value)}
            required
            value={internshipExperience[classStarts]}
          >
            Starts *
          </InputTextWithLabel>
          <InputTextWithLabel
            type="month"
            id={classNamePrefix + internshipExperience.uid + "-" + classEnds}
            className="w-1/2"
            onChange={(e) => handleChange(index, classEnds, e.target.value)}
            required={(internshipExperience[classCurrent])?false:true}
            disabled={(internshipExperience[classCurrent])?true:false}
            value={internshipExperience[classEnds]}
          >
            Ends *
          </InputTextWithLabel>
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
        <TextareaWithLabel
          id={classNamePrefix + internshipExperience.uid + "-" + classExperience}
          placeholder="Your specific experience"
          onChange={(e: { target: { value: any; }; }) => handleChange(index, classExperience, e.target.value)}
          required
          value={internshipExperience[classExperience]}
        >
          Experience *
        </TextareaWithLabel>
      </fieldset>
    ))
  );
});