import React, { memo, MouseEventHandler, useCallback } from 'react';
import { Button, Label } from 'flowbite-react';
import { Checkbox } from '@mui/material';
import { MdClose } from 'react-icons/md';
import InputTextWithLabel from '../components/InputTextWithLabel';
import TextareaWithLabel from '../components/TextareaWithLabel';
import { v4 as uuidv4 } from 'uuid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import SelectAutoload from '../components/mui/SelectAutoload';
import { IndustrySectorDropdownDTO } from '@/data/dtos/IndustrySectorDropdownDTO';
import { TechnologyAreaDropdownDTO } from '@/data/dtos/TechnologyAreaDropdownDTO';
import RequiredTooltip from '../components/mui/RequiredTooltip';

const classNamePrefix = 'profile-creation-work-experience-group-';
const classCompany = 'company';
const classCompanyIndustry = 'sectorObject';
const classCompanyTechArea = 'techAreaObject';
const classTitle = 'jobTitle';
const classStarts = 'startDate';
const classEnds = 'endDate';
const classCurrent = 'isCurrentJob';
const classExperience = 'responsibilities';

export interface WorkExperienceData {
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

export function defaultWorkExperienceData(): WorkExperienceData {
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
  data: WorkExperienceData[];
  hasUnmetRequired: string;
  onRemove: (uid: string) => void;
  onUpdate: (key: string, value: any) => void;
}

export default memo(function WorkExperiences({
  data,
  hasUnmetRequired,
  onRemove,
  onUpdate,
}: Props) {
  const handleChange = useCallback(
    <K extends keyof WorkExperienceData>(index: number, key: K, value: any) => {
      const changedWorkExperiences: WorkExperienceData[] = [...data];
      const updatedWorkExperience = changedWorkExperiences[index];
      updatedWorkExperience[key] = value;
      onUpdate('workExperiences', changedWorkExperiences);
    },
    [data, onUpdate],
  );

  return data.map((workExperience, index) => (
    <fieldset key={classNamePrefix + workExperience.workId + '-key'}>
      <legend className="flex w-full justify-between">
        <h3>Experience {index + 1}</h3>
        <Button
          onClick={() => onRemove(workExperience.workId)}
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
          id={classNamePrefix + workExperience.workId + '-' + classCompany}
          className="w-full"
          placeholder="Your company name"
          onChange={(e) => handleChange(index, classCompany, e.target.value)}
          required
          value={workExperience[classCompany]}
        >
          Company *
        </InputTextWithLabel>
        <SelectAutoload
          id={
            classNamePrefix + workExperience.workId + '-' + classCompanyIndustry
          }
          apiAutoloadRoute="/api/employers/industry-sectors"
          label="Industry Sector"
          getOptionLabel={(option: IndustrySectorDropdownDTO) =>
            option.sector_title
          }
          getOptionId={(option: IndustrySectorDropdownDTO) =>
            option.industry_sector_id
          }
          getOptionFromId={(options: IndustrySectorDropdownDTO[], id: string) =>
            options.find((item) => item.industry_sector_id === id) || null
          }
          placeholder="Your company's industry sector"
          onChange={(val) => handleChange(index, classCompanyIndustry, val)}
          value={workExperience[classCompanyIndustry]}
          loadingText="Retrieving industry sectors..."
        />
        <SelectAutoload
          id={
            classNamePrefix + workExperience.workId + '-' + classCompanyTechArea
          }
          apiAutoloadRoute="/api/employers/technology-areas"
          label="Technical Expertise"
          getOptionLabel={(option: TechnologyAreaDropdownDTO) => option.title}
          getOptionId={(option: TechnologyAreaDropdownDTO) => option.id}
          getOptionFromId={(options: TechnologyAreaDropdownDTO[], id: string) =>
            options.find((item) => item.id === id) || null
          }
          placeholder="Your job role's area of technical expertise"
          onChange={(val) => handleChange(index, classCompanyTechArea, val)}
          value={workExperience[classCompanyTechArea]}
          loadingText="Retrieving technology areas..."
        />
        <InputTextWithLabel
          id={classNamePrefix + workExperience.workId + '-' + classTitle}
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
        <RequiredTooltip
          open={
            hasUnmetRequired === `${workExperience.workId}-${classStarts}` &&
            !Boolean(workExperience[classStarts])
          }
          errorMessage="A start date is required"
        >
          <DatePicker
            label={'Starts *'}
            views={['month', 'year']}
            value={
              workExperience[classStarts]?.isValid()
                ? workExperience[classStarts]
                : null
            }
            onChange={(val) => handleChange(index, classStarts, val)}
          />
        </RequiredTooltip>
        <RequiredTooltip
          open={
            hasUnmetRequired === `${workExperience.workId}-${classEnds}` &&
            !Boolean(workExperience[classEnds]) &&
            !Boolean(workExperience[classCurrent])
          }
          errorMessage="An end date is required if you're no longer working here"
        >
          <DatePicker
            label={'Ends'}
            views={['month', 'year']}
            value={
              workExperience[classEnds]?.isValid()
                ? workExperience[classEnds]
                : null
            }
            onChange={(val) => handleChange(index, classEnds, val)}
          />
        </RequiredTooltip>
      </div>
      <Label>
        <Checkbox
          id={classNamePrefix + workExperience.workId + '-' + classCurrent}
          name={classNamePrefix + workExperience.workId + '-' + classCurrent}
          checked={workExperience[classCurrent]}
          onChange={(e) => handleChange(index, classCurrent, e.target.checked)}
        />
        Current
      </Label>
      <div className="profile-form-grid">
        <TextareaWithLabel
          id={classNamePrefix + workExperience.workId + '-' + classExperience}
          placeholder="Your specific experience"
          onChange={(e: { target: { value: any } }) =>
            handleChange(index, classExperience, e.target.value)
          }
          required
          value={workExperience[classExperience]}
        >
          Experience *
        </TextareaWithLabel>
      </div>
    </fieldset>
  ));
});
