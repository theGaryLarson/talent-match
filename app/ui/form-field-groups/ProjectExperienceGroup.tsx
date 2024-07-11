import React, { MouseEventHandler } from 'react';
import { Button } from 'flowbite-react';
import { MdClose } from "react-icons/md";
import InputTextWithLabel from '../components/InputTextWithLabel';
import { ZodNullableDef } from 'zod';

export interface ProjectExperienceGroupData {
  uid: number,
  title: string,
  projectRole: string,
  startingDate: string,
  completionDate: string,
  referenceUrl: string,
  description: string,
  teamSize: number | null,
  skillStack: string,
}

let uniqueListID = 0;
export function defaultProjectExperienceGroupData() {
  return {
    uid: uniqueListID++,
    title: "",
    projectRole: "",
    startingDate: "",
    completionDate: "",
    referenceUrl: "",
    description: "",
    teamSize: null,
    skillStack: "",
  }
}

interface Props {
  groupData: ProjectExperienceGroupData,
  onRemove: MouseEventHandler<HTMLButtonElement>,
}

const classNamePrefix = "profile-creation-project-experience-group-";
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
        id={classNamePrefix + groupData.uid + "-title"}
        className="w-full"
        placeholder="Ex: Microsoft certified network associate security"
        required
        defaultValue={groupData.title}
      >
        Title *
      </InputTextWithLabel>
      <InputTextWithLabel
        id={classNamePrefix + groupData.uid + "-project-role"}
        className="w-full"
        placeholder="Ex: Microsoft"
        required
        defaultValue={groupData.projectRole}
      >
        Project role *
      </InputTextWithLabel>
      <div className="flex">
        <InputTextWithLabel
          type="month"
          id={classNamePrefix + groupData.uid + "-starting-date"}
          className="w-1/2"
          required
          defaultValue={groupData.startingDate}
        >
          Starting date *
        </InputTextWithLabel>
        <InputTextWithLabel
          type="month"
          id={classNamePrefix + groupData.uid + "-completion-date"}
          className="w-1/2"
          required
          defaultValue={groupData.completionDate}
        >
          Completion date *
        </InputTextWithLabel>
      </div>
      <InputTextWithLabel
        id={classNamePrefix + groupData.uid + "-reference-url"}
        className="w-1/2"
        defaultValue={groupData.referenceUrl}
      >
        Reference url
      </InputTextWithLabel>
      <InputTextWithLabel
        id={classNamePrefix + groupData.uid + "-description"}
        className="w-1/2"
        defaultValue={groupData.description}
      >
        Description/Problem solved
      </InputTextWithLabel>
      <InputTextWithLabel
        type="number"
        id={classNamePrefix + groupData.uid + "-team-size"}
        className="w-1/2"
        defaultValue={groupData.teamSize}
      >
        Team Size
      </InputTextWithLabel>
      <InputTextWithLabel
        id={classNamePrefix + groupData.uid + "-skills-stack"}
        className="w-1/2"
        defaultValue={groupData.skillStack}
      >
        Skills/Tech stack
      </InputTextWithLabel>
    </fieldset>
  );
}