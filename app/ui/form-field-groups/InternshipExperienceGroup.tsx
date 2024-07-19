import React, { MouseEventHandler, useState } from 'react';
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

export interface InternshipExperienceGroupData {
  uid: number,
  [classCompany]: string,
  [classTitle]: string,
  [classStarts]: string,
  [classEnds]: string,
  [classCurrent]: boolean,
  [classExperience]: string,
}

let uniqueListID = 0;
export function defaultInternshipExperienceGroupData() {
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

export function extractInternshipExperienceGroups(formData:[string, FormDataEntryValue][]) : [{[name:string]:string|number|boolean}[],[string, FormDataEntryValue][]] {
  const internshipExperienceModel : {[name:string] : any} = defaultInternshipExperienceGroupData();
  const validInternshipExperienceFieldNames:string[] = Object.keys(internshipExperienceModel);
  validInternshipExperienceFieldNames.splice(validInternshipExperienceFieldNames.indexOf('uid'), 1);
  const internshipExperienceGroups:{[name:string]: {[name:string]: string | number | boolean}} = {};
  const unrelatedFormData:[string, FormDataEntryValue][] = [];

  for (let [fieldName, fieldValue] of formData) {
    if (fieldName.indexOf(classNamePrefix) !== -1) {
      const fieldNameParsed = fieldName.substring(classNamePrefix.length);
      const firstDashIndex = fieldNameParsed.indexOf('-');
      const [groupUID, internshipExperienceKey] = [fieldNameParsed.substring(0, firstDashIndex), fieldNameParsed.substring(firstDashIndex + 1)];

      if (!internshipExperienceGroups.hasOwnProperty(groupUID)) {
        internshipExperienceGroups[groupUID] = {};
      }

      // Ensure you pull this field value once, and that it is a valid field
      if (!internshipExperienceGroups[groupUID].hasOwnProperty(internshipExperienceKey)
          && validInternshipExperienceFieldNames.includes(internshipExperienceKey)) {

        // Ensure the value string is converted into the correct data type
        if (typeof internshipExperienceModel[internshipExperienceKey] === "string") {
          internshipExperienceGroups[groupUID][internshipExperienceKey] = String(fieldValue);
        }
        else if (typeof internshipExperienceModel[internshipExperienceKey] === "number") {
          internshipExperienceGroups[groupUID][internshipExperienceKey] = Number(fieldValue);
        }
        else if (typeof internshipExperienceModel[internshipExperienceKey] === "boolean") {
          internshipExperienceGroups[groupUID][internshipExperienceKey] = Boolean(fieldValue);
        }
      }
    }
    else {
      unrelatedFormData.push([fieldName, fieldValue]);
    }
  }

  return [Object.values(internshipExperienceGroups), unrelatedFormData];
}

interface Props {
  groupData: InternshipExperienceGroupData,
  onRemove: MouseEventHandler<HTMLButtonElement>,
}

export default function InternshipExperienceGroup({
  groupData,
  onRemove,
}:Props){
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