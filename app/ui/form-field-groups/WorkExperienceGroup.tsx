import React, { MouseEventHandler, useState } from 'react';
import { Button, Checkbox, Label } from 'flowbite-react';
import { MdClose } from "react-icons/md";
import InputTextWithLabel from '../components/InputTextWithLabel';
import TextareaWithLabel from '../components/TextareaWithLabel';

const classNamePrefix = "profile-creation-work-experience-group-";
const classCompany = "company";
const classTitle = "title";
const classStarts = "starts";
const classEnds = "ends";
const classCurrent = "current";
const classExperience = "experience";

export interface WorkExperienceGroupData {
  uid: number,
  [classCompany]: string,
  [classTitle]: string,
  [classStarts]: string,
  [classEnds]: string,
  [classCurrent]: boolean,
  [classExperience]: string,
}

let uniqueListID = 0;
export function defaultWorkExperienceGroupData() {
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

export function extractWorkExperienceGroups(formData:[string, FormDataEntryValue][]) : [{[name:string]:string|number|boolean}[],[string, FormDataEntryValue][]] {
  const workExperienceModel : {[name:string] : any} = defaultWorkExperienceGroupData();
  const validWorkExperienceFieldNames:string[] = Object.keys(workExperienceModel);
  validWorkExperienceFieldNames.splice(validWorkExperienceFieldNames.indexOf('uid'), 1);
  const workExperienceGroups:{[name:string]: {[name:string]: string | number | boolean}} = {};
  const unrelatedFormData:[string, FormDataEntryValue][] = [];

  for (let [fieldName, fieldValue] of formData) {
    if (fieldName.indexOf(classNamePrefix) !== -1) {
      const fieldNameParsed = fieldName.substring(classNamePrefix.length);
      const firstDashIndex = fieldNameParsed.indexOf('-');
      const [groupUID, workExperienceKey] = [fieldNameParsed.substring(0, firstDashIndex), fieldNameParsed.substring(firstDashIndex + 1)];

      if (!workExperienceGroups.hasOwnProperty(groupUID)) {
        workExperienceGroups[groupUID] = {};
      }

      // Ensure you pull this field value once, and that it is a valid field
      if (!workExperienceGroups[groupUID].hasOwnProperty(workExperienceKey)
          && validWorkExperienceFieldNames.includes(workExperienceKey)) {

        // Ensure the value string is converted into the correct data type
        if (typeof workExperienceModel[workExperienceKey] === "string") {
          workExperienceGroups[groupUID][workExperienceKey] = String(fieldValue);
        }
        else if (typeof workExperienceModel[workExperienceKey] === "number") {
          workExperienceGroups[groupUID][workExperienceKey] = Number(fieldValue);
        }
        else if (typeof workExperienceModel[workExperienceKey] === "boolean") {
          workExperienceGroups[groupUID][workExperienceKey] = Boolean(fieldValue);
        }
      }
    }
    else {
      unrelatedFormData.push([fieldName, fieldValue]);
    }
  }

  return [Object.values(workExperienceGroups), unrelatedFormData];
}

interface Props {
  groupData: WorkExperienceGroupData,
  onRemove: MouseEventHandler<HTMLButtonElement>,
}

export default function WorkExperienceGroup({
  groupData,
  onRemove,
}:Props) {
  const [isCurrent, setCurrent] = useState(groupData.current);

  return (
    <fieldset>
      <legend className="w-full flex justify-between">
        <h3>Experience</h3>
        <Button onClick={onRemove} size="xs" color="dark" outline pill><MdClose className="h-5 w-5" /></Button>
      </legend>
      <InputTextWithLabel
        id={classNamePrefix + groupData.uid + "-" + classCompany}
        className="w-full"
        placeholder="Your company name"
        required
        defaultValue={groupData[classCompany]}
      >
        Company *
      </InputTextWithLabel>
      <InputTextWithLabel
        id={classNamePrefix + groupData.uid + "-" + classTitle}
        className="w-full"
        placeholder="Your title"
        required
        defaultValue={groupData[classTitle]}
      >
        Title *
      </InputTextWithLabel>
      <div className="flex">
        <InputTextWithLabel
          type="month"
          id={classNamePrefix + groupData.uid + "-" + classStarts}
          className="w-1/2"
          required
          defaultValue={groupData[classStarts]}
        >
          Starts *
        </InputTextWithLabel>
        <InputTextWithLabel
          type="month"
          id={classNamePrefix + groupData.uid + "-" + classEnds}
          className="w-1/2"
          required={(isCurrent)?false:true}
          disabled={(isCurrent)?true:false}
          defaultValue={groupData[classEnds]}
        >
          Ends *
        </InputTextWithLabel>
      </div>
      <Label>
        <Checkbox
          id={classNamePrefix + groupData.uid + "-" + classCurrent}
          name={classNamePrefix + groupData.uid + "-" + classCurrent}
          defaultChecked={groupData[classCurrent]}
          onClick={()=>setCurrent(!isCurrent)}
        />
        Current
      </Label>
      <TextareaWithLabel
        id={classNamePrefix + groupData.uid + "-" + classExperience}
        placeholder="Your specific experience"
        required
        defaultValue={groupData[classExperience]}
      >
        Experience *
      </TextareaWithLabel>
    </fieldset>
  );
}