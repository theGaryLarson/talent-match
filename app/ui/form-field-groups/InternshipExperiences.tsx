import React, { memo, useCallback } from 'react';
import { Button, Label } from 'flowbite-react';
import { Checkbox } from '@mui/material';
import { MdClose } from 'react-icons/md';
import InputTextWithLabel from '../components/InputTextWithLabel';
import TextareaWithLabel from '../components/TextareaWithLabel';
import { v4 as uuidv4 } from 'uuid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { IndustrySectorDropdownDTO } from '@/data/dtos/IndustrySectorDropdownDTO';
import { TechnologyAreaDropdownDTO } from '@/data/dtos/TechnologyAreaDropdownDTO';
import RequiredTooltip from '../components/mui/RequiredTooltip';

const classNamePrefix = 'profile-creation-internship-experience-group-';
const classCompany = 'company';
const classCompanyIndustry = 'sectorObject';
const classCompanyTechArea = 'techAreaObject';
const classTitle = 'jobTitle';
const classStarts = 'startDate';
const classEnds = 'endDate';
const classCurrent = 'isCurrentJob';
const classExperience = 'responsibilities';

export interface InternshipExperienceData {
  workId: string;
  [classCompany]: string;
  [classCompanyIndustry]: IndustrySectorDropdownDTO;
  [classCompanyTechArea]: TechnologyAreaDropdownDTO;
  [classTitle]: string;
  [classStarts]: Dayjs | null;
  [classEnds]: Dayjs | null;
  [classCurrent]: boolean;
  [classExperience]: string;
}

export function defaultInternshipExperienceData(): InternshipExperienceData {
  return {
    workId: uuidv4(),
    [classCompany]: '',
    [classCompanyIndustry]: { industry_sector_id: '', sector_title: '' },
    [classCompanyTechArea]: { id: '', title: '' },
    [classTitle]: '',
    [classStarts]: null,
    [classEnds]: null,
    [classCurrent]: false,
    [classExperience]: '',
  };
}

interface Props {
  data: InternshipExperienceData[];
  hasUnmetRequired: string;
  onRemove: (uid: string) => void;
  onUpdate: (key: string, value: any) => void;
}

export default memo(function InternshipExperiences({
  data,
  hasUnmetRequired,
  onRemove,
  onUpdate,
}: Props) {
  const handleChange = useCallback(
    <K extends keyof InternshipExperienceData>(
      index: number,
      key: K,
      value: any,
    ) => {
      const changedInternshipExperiences: InternshipExperienceData[] = [
        ...data,
      ];
      const updatedInternshipExperience = changedInternshipExperiences[index];
      updatedInternshipExperience[key] = value;
      onUpdate('internshipExperiences', changedInternshipExperiences);
    },
    [data, onUpdate],
  );

  return data.map((internshipExperience, index) => (
    <fieldset key={classNamePrefix + internshipExperience.workId + '-key'}>
      <legend className="flex w-full justify-between">
        <h3>Experience {index + 1}</h3>
        <Button
          onClick={() => onRemove(internshipExperience.workId)}
          size="xs"
          color="dark"
          outline
          pill
        >
          <MdClose className="h-5 w-5" />
        </Button>
      </legend>
      <div className="profile-form-grid">
        <InputTextWithLabel
          id={
            classNamePrefix + internshipExperience.workId + '-' + classCompany
          }
          className="w-full"
          placeholder="Your company name"
          onChange={(e) => handleChange(index, classCompany, e.target.value)}
          required
          value={internshipExperience[classCompany]}
        >
          Company *
        </InputTextWithLabel>
        <InputTextWithLabel
          id={classNamePrefix + internshipExperience.workId + '-' + classTitle}
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
        <RequiredTooltip
          open={
            hasUnmetRequired ===
              `${internshipExperience.workId}-${classStarts}` &&
            !Boolean(internshipExperience[classStarts])
          }
          errorMessage="A start date is required"
        >
          <DatePicker
            label={'Starts *'}
            views={['month', 'year']}
            value={internshipExperience[classStarts] || null}
            onChange={(val) => handleChange(index, classStarts, val)}
          />
        </RequiredTooltip>
        <RequiredTooltip
          open={
            hasUnmetRequired ===
              `${internshipExperience.workId}-${classEnds}` &&
            !Boolean(internshipExperience[classEnds])
          }
          errorMessage="An end date is required"
        >
          <DatePicker
            label={'Ends *'}
            views={['month', 'year']}
            value={internshipExperience[classEnds] || null}
            onChange={(val) => handleChange(index, classEnds, val)}
          />
        </RequiredTooltip>
      </div>
      <Label>
        <Checkbox
          id={
            classNamePrefix + internshipExperience.workId + '-' + classCurrent
          }
          name={
            classNamePrefix + internshipExperience.workId + '-' + classCurrent
          }
          checked={internshipExperience[classCurrent]}
          onChange={(e) => handleChange(index, classCurrent, e.target.checked)}
        />
        Current
      </Label>
      <div className="profile-form-grid">
        <TextareaWithLabel
          id={
            classNamePrefix +
            internshipExperience.workId +
            '-' +
            classExperience
          }
          placeholder="Your specific experience"
          onChange={(e: { target: { value: any } }) =>
            handleChange(index, classExperience, e.target.value)
          }
          required
          value={internshipExperience[classExperience]}
        >
          Experience *
        </TextareaWithLabel>
      </div>
    </fieldset>
  ));
});
