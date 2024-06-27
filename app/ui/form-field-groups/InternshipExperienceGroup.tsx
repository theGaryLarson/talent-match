import React, { MouseEventHandler, useState } from 'react';
import { Button, Checkbox, Label } from 'flowbite-react';
import { MdClose } from "react-icons/md";
import InputTextWithLabel from '../components/InputTextWithLabel';
import TextareaWithLabel from '../components/TextareaWithLabel';

export interface InternshipExperienceGroupData {
  uid: number,
  company: string,
  title: string,
  startDate: string,
  endDate: string,
  isCurrent: boolean,
  experienceDetails: string,
}

let uniqueListID = 0;
export function defaultInternshipExperienceGroupData() {
  return {
    uid: uniqueListID++,
    company: "",
    title: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    experienceDetails: "",
  }
}

interface Props {
  groupData: InternshipExperienceGroupData,
  onRemove: MouseEventHandler<HTMLButtonElement>,
}

function InternshipExperienceGroup({
  groupData,
  onRemove,
}:Props){
  const [isCurrent, setCurrent] = useState(groupData.isCurrent);
  return (
    <fieldset>
      <legend className="w-full flex justify-between">
        <h3>Experience</h3>
        <Button onClick={onRemove} size="xs" color="dark" outline pill><MdClose className="h-5 w-5" /></Button>
      </legend>
      <InputTextWithLabel
        id={"profile-creation-internship-experience-group-" + groupData.uid + "-company"}
        className="w-full"
        placeholder="Your company name"
        required
        defaultValue={groupData.company}
      >
        Company *
      </InputTextWithLabel>
      <InputTextWithLabel
        id={"profile-creation-internship-experience-group-" + groupData.uid + "-title"}
        className="w-full"
        placeholder="Your title"
        required
        defaultValue={groupData.title}
      >
        Title *
      </InputTextWithLabel>
      <div className="flex">
        <InputTextWithLabel
          type="month"
          id={"profile-creation-internship-experience-group-" + groupData.uid + "-starts"}
          className="w-1/2"
          required
          defaultValue={groupData.startDate}
        >
          Starts *
        </InputTextWithLabel>
        <InputTextWithLabel
          type="month"
          id={"profile-creation-internship-experience-group-" + groupData.uid + "-ends"}
          className="w-1/2"
          required={(isCurrent)?false:true}
          disabled={(isCurrent)?true:false}
          defaultValue={groupData.endDate}
        >
          Ends *
        </InputTextWithLabel>
      </div>
      <Label>
        <Checkbox
          id={"profile-creation-internship-experience-group-" + groupData.uid + "-current"}
          name={"profile-creation-internship-experience-group-" + groupData.uid + "-current"}
          defaultChecked={groupData.isCurrent}
          onClick={()=>setCurrent(!isCurrent)}
        />
        Current
      </Label>
      <TextareaWithLabel
        id={"profile-creation-internship-experience-group-" + groupData.uid + "-experience"}
        placeholder="Your specific experience"
        required
        defaultValue={groupData.experienceDetails}
      >
        Experience *
      </TextareaWithLabel>
    </fieldset>
  );
}

export default InternshipExperienceGroup;