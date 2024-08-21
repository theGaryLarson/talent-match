import React, { memo, useCallback } from 'react';
import { Button } from 'flowbite-react';
import { MdClose } from "react-icons/md";
import InputTextWithLabel from '../components/InputTextWithLabel';
import { v4 as uuidv4 } from "uuid";

const classNamePrefix = "profile-creation-license-group-";
const classForName = "name";
const classIssuingOrg = "issuing-org";
const classCredentialId = "credential-id";
const classCredentialUrl = "credential-url";
const classIssueDate = "issue-date";
const classExpirationDate = "expiration-date";

export interface LicenseData {
  "uid": string,
  [classForName]: string,
  [classIssuingOrg]: string,
  [classCredentialId]: string,
  [classCredentialUrl]: string,
  [classIssueDate]: string,
  [classExpirationDate]: string,
}

let uniqueListID = 0;
export function defaultLicenseData() {
  return {
    "uid": uuidv4(),
    [classForName]: "",
    [classIssuingOrg]: "",
    [classCredentialId]: "",
    [classCredentialUrl]: "",
    [classIssueDate]: "",
    [classExpirationDate]: "",
  }
}

interface Props {
  data: LicenseData[],
  onRemove: (uid:string) => void,
  onUpdate: (key: string, value: any) => void,
}

export default memo(function Licenses({
  data,
  onRemove,
  onUpdate,
}:Props) {
  const handleChange = useCallback(<K extends keyof LicenseData>(index:number, key:K, value:any) => {
    const changedLicenses:LicenseData[] = [...data];
    const updatedLicense = changedLicenses[index];
    updatedLicense[key] = value;
    onUpdate('licenses', changedLicenses);
  }, [data, onUpdate]);


  return (
    data.map((license, index) => (
      <fieldset key={classNamePrefix + license.uid + "-key"}>
        <legend className="w-full flex justify-between">
          <h3>License {index + 1}</h3>
          <Button onClick={() => onRemove(license.uid)} size="xs" color="dark" outline pill><MdClose className="h-5 w-5" /></Button>
        </legend>
        <div className="profile-form-grid">
          <InputTextWithLabel
            id={classNamePrefix + license.uid + "-" + classForName}
            className="w-full"
            placeholder="Ex: Microsoft certified network associate security"
            onChange={(e) => handleChange(index, classForName, e.target.value)}
            required
            value={license[classForName]}
          >
            Name *
          </InputTextWithLabel>
          <InputTextWithLabel
            id={classNamePrefix + license.uid + "-" + classIssuingOrg}
            className="w-full"
            placeholder="Ex: Microsoft"
            onChange={(e) => handleChange(index, classIssuingOrg, e.target.value)}
            required
            value={license[classIssuingOrg]}
          >
            Issuing organization *
          </InputTextWithLabel>
        </div>
        <div className="profile-form-grid md:grid-cols-2">
          <InputTextWithLabel
            id={classNamePrefix + license.uid + "-" + classCredentialId}
            onChange={(e) => handleChange(index, classCredentialId, e.target.value)}
            value={license[classCredentialId]}
          >
            Credential ID
          </InputTextWithLabel>
          <InputTextWithLabel
            id={classNamePrefix + license.uid + "-" + classCredentialUrl}
            onChange={(e) => handleChange(index, classCredentialUrl, e.target.value)}
            value={license[classCredentialUrl]}
          >
            Credential URL
          </InputTextWithLabel>
          <InputTextWithLabel
            type="month"
            id={classNamePrefix + license.uid + "-" + classIssueDate}
            onChange={(e) => handleChange(index, classIssueDate, e.target.value)}
            value={license[classIssueDate]}
          >
            Issue date
          </InputTextWithLabel>
          <InputTextWithLabel
            type="month"
            id={classNamePrefix + license.uid + "-" + classExpirationDate}
            onChange={(e) => handleChange(index, classExpirationDate, e.target.value)}
            value={license[classExpirationDate]}
          >
            Expiration date
          </InputTextWithLabel>
        </div>
      </fieldset>
    ))
  );
});