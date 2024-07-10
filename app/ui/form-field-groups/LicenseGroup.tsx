import React, { MouseEventHandler } from 'react';
import { Button } from 'flowbite-react';
import { MdClose } from "react-icons/md";
import InputTextWithLabel from '../components/InputTextWithLabel';

export interface LicenseGroupData {
  uid: number,
  name: string,
  issuingOrg: string,
  credentialId: string,
  credentialUrl: string,
  issueDate: string,
  expirationDate: string,
}

let uniqueListID = 0;
export function defaultLicenseGroupData() {
  return {
    uid: uniqueListID++,
    name: "",
    issuingOrg: "",
    credentialId: "",
    credentialUrl: "",
    issueDate: "",
    expirationDate: "",
  }
}

interface Props {
  groupData: LicenseGroupData,
  onRemove: MouseEventHandler<HTMLButtonElement>,
}

function LicenseGroup({
  groupData,
  onRemove,
}:Props) {
  return (
    <fieldset className="">
      <legend className="w-full flex justify-between">
        <h3>License</h3>
        <Button onClick={onRemove} size="xs" color="dark" outline pill><MdClose className="h-5 w-5" /></Button>
      </legend>
      <InputTextWithLabel
        id={"profile-creation-license-group-" + groupData.uid + "-name"}
        className="w-full"
        placeholder="Ex: Microsoft certified network associate security"
        required
        defaultValue={groupData.name}
      >
        Name *
      </InputTextWithLabel>
      <InputTextWithLabel
        id={"profile-creation-license-group-" + groupData.uid + "-issuing-org"}
        className="w-full"
        placeholder="Ex: Microsoft"
        required
        defaultValue={groupData.issuingOrg}
      >
        Issuing organization *
      </InputTextWithLabel>
      <InputTextWithLabel
        id={"profile-creation-license-group-" + groupData.uid + "-credential-id"}
        className="w-1/2"
        defaultValue={groupData.credentialId}
      >
        Credential ID
      </InputTextWithLabel>
      <InputTextWithLabel
        id={"profile-creation-license-group-" + groupData.uid + "-credential-url"}
        className="w-1/2"
        defaultValue={groupData.credentialUrl}
      >
        Credential URL
      </InputTextWithLabel>
      <InputTextWithLabel
        type="month"
        id={"profile-creation-license-group-" + groupData.uid + "-issue-date"}
        className="w-1/2"
        defaultValue={groupData.issueDate}
      >
        Issue date
      </InputTextWithLabel>
      <InputTextWithLabel
        type="month"
        id={"profile-creation-license-group-" + groupData.uid + "-expiration-date"}
        className="w-1/2"
        defaultValue={groupData.expirationDate}
      >
        Expiration date
      </InputTextWithLabel>
    </fieldset>
  );
}

export default LicenseGroup;