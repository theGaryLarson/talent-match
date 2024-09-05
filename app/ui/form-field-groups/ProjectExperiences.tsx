import React, { memo, useCallback } from 'react';
import { Button } from 'flowbite-react';
import { MdClose } from "react-icons/md";
import InputTextWithLabel from '../components/InputTextWithLabel';
import TagsWithAutocomplete from '../components/mui/TagsWithAutocomplete';
import { SkillDTO } from '@/data/dtos/SkillDTO';
import { v4 as uuidv4 } from "uuid";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

const classNamePrefix = "profile-creation-project-experience-group-";
const classTitle = "title";
const classProjectRole = "project-role";
const classStartingDate = "starting-date";
const classCompletionDate = "completion-date";
const classReferenceUrl = "reference-url";
const classDescription = "description";
const classTeamSize = "team-size";
const classSkillsStack = "skills-stack";

export interface ProjectExperienceData {
  "uid": string,
  [classTitle]: string,
  [classProjectRole]: string,
  [classStartingDate]: Dayjs | null,
  [classCompletionDate]: Dayjs | null,
  [classReferenceUrl]: string,
  [classDescription]: string,
  [classTeamSize]: number | string,
  [classSkillsStack]: SkillDTO[],
}

export function defaultProjectExperienceData() {
  return {
    "uid": uuidv4(),
    [classTitle]: "",
    [classProjectRole]: "",
    [classStartingDate]: null,
    [classCompletionDate]: null,
    [classReferenceUrl]: "",
    [classDescription]: "",
    [classTeamSize]: "",
    [classSkillsStack]: [],
  }
}

interface Props {
  data: ProjectExperienceData[],
  onRemove: (uid:string) => void,
  onUpdate: (key: string, value: any) => void,
}

export default memo(function ProjectExperiences({
  data,
  onRemove,
  onUpdate,
}:Props) {
  const handleChange = useCallback(<K extends keyof ProjectExperienceData>(index:number, key:K, value:any) => {
    const changedProjectExperiences:ProjectExperienceData[] = [...data];
    const updatedProjectExperience = changedProjectExperiences[index];
    updatedProjectExperience[key] = value;
    onUpdate('projectExperiences', changedProjectExperiences);
  }, [data, onUpdate]);

  return (
    data.map((projectExperience, index) => (
      <fieldset key={classNamePrefix + projectExperience.uid + "-key"}>
        <legend className="w-full flex justify-between">
          <h3>Project Experience {index + 1}</h3>
          <Button onClick={() => onRemove(projectExperience.uid)} size="xs" color="dark" outline pill><MdClose className="h-5 w-5" /></Button>
        </legend>
        <div className="profile-form-grid">
          <InputTextWithLabel
            id={classNamePrefix + projectExperience.uid + "-" + classTitle}
            className="w-full"
            placeholder="Ex: Microsoft certified network associate security"
            onChange={(e) => handleChange(index, classTitle, e.target.value)}
            required
            value={projectExperience[classTitle]}
          >
            Title *
          </InputTextWithLabel>
          <InputTextWithLabel
            id={classNamePrefix + projectExperience.uid + "-" + classProjectRole}
            className="w-full"
            placeholder="Ex: Microsoft"
            onChange={(e) => handleChange(index, classProjectRole, e.target.value)}
            required
            value={projectExperience[classProjectRole]}
          >
            Project role *
          </InputTextWithLabel>
          <InputTextWithLabel
            id={classNamePrefix + projectExperience.uid + "-" + classReferenceUrl}
            onChange={(e) => handleChange(index, classReferenceUrl, e.target.value)}
            value={projectExperience[classReferenceUrl]}
          >
            Reference url
          </InputTextWithLabel>
          <InputTextWithLabel
            id={classNamePrefix + projectExperience.uid + "-" + classDescription}
            onChange={(e) => handleChange(index, classDescription, e.target.value)}
            value={projectExperience[classDescription]}
          >
            Description/Problem solved
          </InputTextWithLabel>
          <InputTextWithLabel
            type="number"
            id={classNamePrefix + projectExperience.uid + "-" + classTeamSize}
            onChange={(e) => handleChange(index, classTeamSize, e.target.value)}
            value={projectExperience[classTeamSize]}
          >
            Team Size
          </InputTextWithLabel>
        </div>
        <div className="profile-form-grid">
          <TagsWithAutocomplete
            apiSearchRoute="/api/skills/search/"
            fieldLabel="Skills/Tech stack"
            id={classNamePrefix + projectExperience.uid + "-" + classSkillsStack}
            maxTags={10}
            searchingText="Searching..."
            noResultsText="No skills/tech stack found..."
            onChange={function(ev, val){ handleChange(index, classSkillsStack, val) }}
            searchPlaceholder="Skill (ex: Java)"
            getTagLabel={(option:SkillDTO) => option.skill_name}
          />
        </div>
        <div className="profile-form-grid md:grid-cols-2">
          <DatePicker
              label={'Starting date *'}
              views={['month', 'year']}
              value={projectExperience[classStartingDate] || null}
              onChange={(val) => handleChange(index, classStartingDate, val)}
          />
          <DatePicker
              label={'Completion date *'}
              views={['month', 'year']}
              value={projectExperience[classCompletionDate] || null}
              onChange={(val) => handleChange(index, classCompletionDate, val)}
          />
          {/*These were duplicated but wasn't sure if there were subtle changes that the dev wanted to look at*/}
          {/*<InputTextWithLabel*/}
          {/*  id={classNamePrefix + projectExperience.uid + "-" + classReferenceUrl}*/}
          {/*  onChange={(e) => handleChange(index, classReferenceUrl, e.target.value)}*/}
          {/*  value={projectExperience[classReferenceUrl]}*/}
          {/*>*/}
          {/*  Reference url*/}
          {/*</InputTextWithLabel>*/}
          {/*<InputTextWithLabel*/}
          {/*  id={classNamePrefix + projectExperience.uid + "-" + classDescription}*/}
          {/*  onChange={(e) => handleChange(index, classDescription, e.target.value)}*/}
          {/*  value={projectExperience[classDescription]}*/}
          {/*>*/}
          {/*  Description/Problem solved*/}
          {/*</InputTextWithLabel>*/}
          {/*<InputTextWithLabel*/}
          {/*  type="number"*/}
          {/*  id={classNamePrefix + projectExperience.uid + "-" + classTeamSize}*/}
          {/*  onChange={(e) => handleChange(index, classTeamSize, e.target.value)}*/}
          {/*  value={projectExperience[classTeamSize]}*/}
          {/*>*/}
          {/*  Team Size*/}
          {/*</InputTextWithLabel>*/}
        </div>
        {/*<div className="profile-form-grid">*/}
        {/*  <TagsWithAutocomplete<SkillDTO>*/}
        {/*    apiSearchRoute="/api/skills/search/"*/}
        {/*    fieldLabel="Skills/Tech stack"*/}
        {/*    id={classNamePrefix + projectExperience.uid + "-" + classSkillsStack}*/}
        {/*    maxTags={10}*/}
        {/*    searchingText="Searching..."*/}
        {/*    noResultsText="No skills/tech stack found..."*/}
        {/*    onChange={function(ev, val){ handleChange(index, classSkillsStack, val) }}*/}
        {/*    searchPlaceholder="Skill (ex: Java)"*/}
        {/*    getTagLabel={(option:SkillDTO) => option.skill_name}*/}
        {/*    getTagLink={(option:SkillDTO) => option.skill_info_url}*/}
        {/*  />*/}
        {/*</div>*/}
      </fieldset>
    ))
  );
});