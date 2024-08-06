import React, { MouseEventHandler } from 'react';
import { Button } from 'flowbite-react';
import { MdClose } from "react-icons/md";
import InputTextWithLabel from '../components/InputTextWithLabel';

const classNamePrefix = "profile-creation-license-group-";
const classForName = "name";
const classIssuingOrg = "issuing-org";
const classCredentialId = "credential-id";
const classCredentialUrl = "credential-url";
const classIssueDate = "issue-date";
const classExpirationDate = "expiration-date";

export interface LicenseGroupData {
  "uid": number,
  [classForName]: string,
  [classIssuingOrg]: string,
  [classCredentialId]: string,
  [classCredentialUrl]: string,
  [classIssueDate]: string,
  [classExpirationDate]: string,
}

let uniqueListID = 0;
export function defaultLicenseGroupData() {
  return {
    "uid": uniqueListID++,
    [classForName]: "",
    [classIssuingOrg]: "",
    [classCredentialId]: "",
    [classCredentialUrl]: "",
    [classIssueDate]: "",
    [classExpirationDate]: "",
  }
}

export function extractLicenseGroups(formData:[string, FormDataEntryValue][]) : [{[name:string]:string|number|boolean}[],[string, FormDataEntryValue][]] {
  const licenseModel : {[name:string] : any} = defaultLicenseGroupData();
  const validLicenseFieldNames:string[] = Object.keys(licenseModel);
  validLicenseFieldNames.splice(validLicenseFieldNames.indexOf('uid'), 1);
  const licenseGroups:{[name:string]: {[name:string]: string | number | boolean}} = {};
  const unrelatedFormData:[string, FormDataEntryValue][] = [];

  for (let [fieldName, fieldValue] of formData) {
    if (fieldName.indexOf(classNamePrefix) !== -1) {
      const fieldNameParsed = fieldName.substring(classNamePrefix.length);
      const firstDashIndex = fieldNameParsed.indexOf('-');
      const [groupUID, licenseKey] = [fieldNameParsed.substring(0, firstDashIndex), fieldNameParsed.substring(firstDashIndex + 1)];

      if (!licenseGroups.hasOwnProperty(groupUID)) {
        licenseGroups[groupUID] = {};
      }

      // Ensure you pull this field value once, and that it is a valid field
      if (!licenseGroups[groupUID].hasOwnProperty(licenseKey)
          && validLicenseFieldNames.includes(licenseKey)) {

        // Ensure the value string is converted into the correct data type
        if (typeof licenseModel[licenseKey] === "string") {
          licenseGroups[groupUID][licenseKey] = String(fieldValue);
        }
        else if (typeof licenseModel[licenseKey] === "number") {
          licenseGroups[groupUID][licenseKey] = Number(fieldValue);
        }
        else if (typeof licenseModel[licenseKey] === "boolean") {
          licenseGroups[groupUID][licenseKey] = Boolean(fieldValue);
        }
      }
    }
    else {
      unrelatedFormData.push([fieldName, fieldValue]);
    }
  }

  return [Object.values(licenseGroups), unrelatedFormData];
}

interface Props {
  groupData: LicenseGroupData,
  onRemove: MouseEventHandler<HTMLButtonElement>,
}

export default function LicenseGroup({
  groupData,
  onRemove,
}:Props) {
  return (
    <fieldset>
      <legend className="w-full flex justify-between">
        <h3>License</h3>
        <Button onClick={onRemove} size="xs" color="dark" outline pill><MdClose className="h-5 w-5" /></Button>
      </legend>
      <InputTextWithLabel
        id={classNamePrefix + groupData.uid + "-" + classForName}
        className="w-full"
        placeholder="Ex: Microsoft certified network associate security"
        required
        defaultValue={groupData[classForName]}
      >
        Name *
      </InputTextWithLabel>
      <InputTextWithLabel
        id={classNamePrefix + groupData.uid + "-" + classIssuingOrg}
        className="w-full"
        placeholder="Ex: Microsoft"
        required
        defaultValue={groupData[classIssuingOrg]}
      >
        Issuing organization *
      </InputTextWithLabel>
      <InputTextWithLabel
        id={classNamePrefix + groupData.uid + "-" + classCredentialId}
        className="w-1/2"
        defaultValue={groupData[classCredentialId]}
      >
        Credential ID
      </InputTextWithLabel>
      <InputTextWithLabel
        id={classNamePrefix + groupData.uid + "-" + classCredentialUrl}
        className="w-1/2"
        defaultValue={groupData[classCredentialUrl]}
      >
        Credential URL
      </InputTextWithLabel>
      <InputTextWithLabel
        type="month"
        id={classNamePrefix + groupData.uid + "-" + classIssueDate}
        className="w-1/2"
        defaultValue={groupData[classIssueDate]}
      >
        Issue date
      </InputTextWithLabel>
      <InputTextWithLabel
        type="month"
        id={classNamePrefix + groupData.uid + "-" + classExpirationDate}
        className="w-1/2"
        defaultValue={groupData[classExpirationDate]}
      >
        Expiration date
      </InputTextWithLabel>
    </fieldset>
  );
}