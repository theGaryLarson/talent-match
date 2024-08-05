import React, { MouseEventHandler } from 'react';
import { Button } from 'flowbite-react';
import { MdClose } from "react-icons/md";
import InputTextWithLabel from '../components/InputTextWithLabel';

const classNamePrefix = "profile-creation-project-experience-group-";
const classTitle = "title";
const classProjectRole = "project-role";
const classStartingDate = "starting-date";
const classCompletionDate = "completion-date";
const classReferenceUrl = "reference-url";
const classDescription = "description";
const classTeamSize = "team-size";
const classSkillsStack = "skills-stack";

export interface ProjectExperienceGroupData {
  "uid": number,
  [classTitle]: string,
  [classProjectRole]: string,
  [classStartingDate]: string,
  [classCompletionDate]: string,
  [classReferenceUrl]: string,
  [classDescription]: string,
  [classTeamSize]: number | null,
  [classSkillsStack]: string,
}

let uniqueListID = 0;
export function defaultProjectExperienceGroupData() {
  return {
    "uid": uniqueListID++,
    [classTitle]: "",
    [classProjectRole]: "",
    [classStartingDate]: "",
    [classCompletionDate]: "",
    [classReferenceUrl]: "",
    [classDescription]: "",
    [classTeamSize]: null,
    [classSkillsStack]: "",
  }
}

export function extractProjectExperienceGroups(formData:[string, FormDataEntryValue][]) : [{[name:string]:string|number|boolean}[],[string, FormDataEntryValue][]] {
  const projectExperienceModel : {[name:string] : any} = defaultProjectExperienceGroupData();
  const validProjectExperienceFieldNames:string[] = Object.keys(projectExperienceModel);
  validProjectExperienceFieldNames.splice(validProjectExperienceFieldNames.indexOf('uid'), 1);
  const projectExperienceGroups:{[name:string]: {[name:string]: string | number | boolean}} = {};
  const unrelatedFormData:[string, FormDataEntryValue][] = [];

  for (let [fieldName, fieldValue] of formData) {
    if (fieldName.indexOf(classNamePrefix) !== -1) {
      const fieldNameParsed = fieldName.substring(classNamePrefix.length);
      const firstDashIndex = fieldNameParsed.indexOf('-');
      const [groupUID, projectExperienceKey] = [fieldNameParsed.substring(0, firstDashIndex), fieldNameParsed.substring(firstDashIndex + 1)];

      if (!projectExperienceGroups.hasOwnProperty(groupUID)) {
        projectExperienceGroups[groupUID] = {};
      }

      // Ensure you pull this field value once, and that it is a valid field
      if (!projectExperienceGroups[groupUID].hasOwnProperty(projectExperienceKey)
          && validProjectExperienceFieldNames.includes(projectExperienceKey)) {

        // Ensure the value string is converted into the correct data type
        if (typeof projectExperienceModel[projectExperienceKey] === "string") {
          projectExperienceGroups[groupUID][projectExperienceKey] = String(fieldValue);
        }
        else if (typeof projectExperienceModel[projectExperienceKey] === "number") {
          projectExperienceGroups[groupUID][projectExperienceKey] = Number(fieldValue);
        }
        else if (typeof projectExperienceModel[projectExperienceKey] === "boolean") {
          projectExperienceGroups[groupUID][projectExperienceKey] = Boolean(fieldValue);
        }
      }
    }
    else {
      unrelatedFormData.push([fieldName, fieldValue]);
    }
  }

  return [Object.values(projectExperienceGroups), unrelatedFormData];
}

interface Props {
  groupData: ProjectExperienceGroupData,
  onRemove: MouseEventHandler<HTMLButtonElement>,
}

export default function ProjectExperienceGroup({
  groupData,
  onRemove,
}:Props) {
  return (
    <fieldset>
      <legend className="w-full flex justify-between">
        <h3>Project Experience</h3>
        <Button onClick={onRemove} size="xs" color="dark" outline pill><MdClose className="h-5 w-5" /></Button>
      </legend>
      <InputTextWithLabel
        id={classNamePrefix + groupData.uid + "-" + classTitle}
        className="w-full"
        placeholder="Ex: Microsoft certified network associate security"
        required
        defaultValue={groupData[classTitle]}
      >
        Title *
      </InputTextWithLabel>
      <InputTextWithLabel
        id={classNamePrefix + groupData.uid + "-" + classProjectRole}
        className="w-full"
        placeholder="Ex: Microsoft"
        required
        defaultValue={groupData[classProjectRole]}
      >
        Project role *
      </InputTextWithLabel>
      <div className="flex">
        <InputTextWithLabel
          type="month"
          id={classNamePrefix + groupData.uid + "-" + classStartingDate}
          className="w-1/2"
          required
          defaultValue={groupData[classStartingDate]}
        >
          Starting date *
        </InputTextWithLabel>
        <InputTextWithLabel
          type="month"
          id={classNamePrefix + groupData.uid + "-" + classCompletionDate}
          className="w-1/2"
          required
          defaultValue={groupData[classCompletionDate]}
        >
          Completion date *
        </InputTextWithLabel>
      </div>
      <InputTextWithLabel
        id={classNamePrefix + groupData.uid + "-" + classReferenceUrl}
        className="w-1/2"
        defaultValue={groupData[classReferenceUrl]}
      >
        Reference url
      </InputTextWithLabel>
      <InputTextWithLabel
        id={classNamePrefix + groupData.uid + "-" + classDescription}
        className="w-1/2"
        defaultValue={groupData[classDescription]}
      >
        Description/Problem solved
      </InputTextWithLabel>
      <InputTextWithLabel
        type="number"
        id={classNamePrefix + groupData.uid + "-" + classTeamSize}
        className="w-1/2"
        defaultValue={groupData[classTeamSize]}
      >
        Team Size
      </InputTextWithLabel>
      <InputTextWithLabel
        id={classNamePrefix + groupData.uid + "-" + classSkillsStack}
        className="w-1/2"
        defaultValue={groupData[classSkillsStack]}
      >
        Skills/Tech stack
      </InputTextWithLabel>
    </fieldset>
  );
}