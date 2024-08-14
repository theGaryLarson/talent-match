'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { RootState } from '@/lib/store';
import { useSelector, useDispatch } from 'react-redux';
import { addField, updateField, submitForm, submitFormSuccess, submitFormFailure, FormState } from '@/lib/features/profileCreation/formSlice';
import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
import InputFileDropzone from '@/app/ui/components/InputFileDropzone';
import { Avatar, Button, Progress } from "flowbite-react";
import {formatPhoneE164} from "@/app/lib/utils";
import parsePhoneNumberFromString from "libphonenumber-js";

export default function CreateJobseekerProfileIntroPage(){
  const { fields, isSubmitting, error } : FormState = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch();
  const router = useRouter();

  const [newFieldId, setNewFieldId] = useState('');
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState<'text' | 'email' | 'number' | 'select' | 'radio'>('text');
  const [newFieldValue, setNewFieldValue] = useState('');
  const [newFieldOptions, setNewFieldOptions] = useState<{ value: string | number; label: string }[]>([]);
  
  const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    const field = fields.find((field) => field.id === name);
    if (field) {
      const parsedValue = field.type === 'number' ? parseInt(value, 10) : value;
      dispatch(updateField({ id: field.id, value: parsedValue }));
    } else {
      dispatch(addField({
        id: e.target.id,
        label: newFieldLabel,
        value: e.target.value,
        type: newFieldType,
        options: newFieldOptions,
    }));
    }
  };

  const handleAddField = () => {
    if (newFieldLabel) {
      dispatch(addField(
        { id: newFieldId, label: newFieldLabel, value: newFieldValue, type: newFieldType, options: newFieldType === 'select' || newFieldType === 'radio' ? newFieldOptions : undefined }));
      setNewFieldId('');
      setNewFieldLabel('');
      setNewFieldType('text');
      setNewFieldValue('');
      setNewFieldOptions([]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(submitForm());

    const birthDateValue = fields.find(f => f.id === 'profile-creation-intro-birth-date')?.value || null;
    const birthDateISO = birthDateValue ? new Date(birthDateValue).toISOString() : null;

    const countryCode = fields.find(f => f.id === 'profile-creation-intro-country-phone-code')?.value || null;
    const ph = fields.find(f => f.id === 'profile-creation-intro-phone-number')?.value || null;
     const formattedPhone = formatPhoneE164(countryCode?.toString(), ph?.toString())

    // TODO: get email from oauth and check db for existing user with that email. If they exist load the data into the form.
    //  Store userId and relevant IDs in auth session storage using ReadUserInfoDTO
    const formData = {
          userId: 'USER_ID_FROM_SESSION_OR_AUTH',
          photoUrl: fields.find(f => f.id === 'profile-creation-intro-avatar')?.value || null,
          firstName: fields.find(f => f.id === 'profile-creation-intro-first-name')?.value || null,
          lastName: fields.find(f => f.id === 'profile-creation-intro-last-name')?.value || null,
          birthDate: birthDateISO,
          phoneCountryCode: formattedPhone ? parsePhoneNumberFromString(formattedPhone)?.countryCallingCode : null,
          phone: formattedPhone,
          zipCode: fields.find(f => f.id === 'profile-creation-intro-zip-code')?.value || null,
          state: fields.find(f => f.id === 'profile-creation-intro-state')?.value || null,
          city: '',
          county: '',
          email: 'USER_EMAIL_FROM_SESSION_OR_AUTH',
          introHeadline: fields.find(f => f.id === 'profile-creation-intro-headlines')?.value || null,
          currentJobTitle: fields.find(f => f.id === 'profile-creation-intro-current-position')?.value || null,
          resumeUrl: fields.find(f => f.id === 'profile-creation-intro-resume')?.value || null,
      };

      try {
          const response = await fetch('/api/jobseekers/account/introduction/upsert', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });

          if (response.ok) {
              const result = await response.json();
              dispatch(submitFormSuccess());
              router.push('/create-profile/jobseeker/education');
          } else {
              const errorData = await response.json();
              dispatch(submitFormFailure(errorData.error || 'Failed to submit the form'));
          }
      } catch (error) {
          dispatch(submitFormFailure('Failed to submit the form'));
      }
  };

  return(
    <main className="flex">
      <aside className="hidden lg:w-2/5 lg:block">
      </aside>
      <section className="w-full lg:w-3/5">
        <ProgressBarFlat progress={1/6 * 100} size="sm" color="dark" className="lg:hidden"/>
        <p>Step 1/6</p>
        <h1>Intro</h1>
        <p>* Indicates a required field</p>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              <h2>Avatar</h2>
            </legend>
            <label className="flex">
              <Avatar rounded />
              <input type="file" accept=".svg,.png,.jpg,.jpeg,.gif,.webp" className="sr-only"/>
              <div>
                Upload Image
                <p>File types: SVG, PNG, JPG, GIF, or WEBP (max. TBD MB)</p>
              </div>
            </label>
          </fieldset>
          <fieldset>
            <legend>
              <h2>Basic info</h2>
            </legend>
            <InputTextWithLabel id="profile-creation-intro-first-name" placeholder="Your first name" onChange={handleFieldChange} required>First Name *</InputTextWithLabel>
            <InputTextWithLabel id="profile-creation-intro-last-name" placeholder="Your last name" onChange={handleFieldChange} required>Last Name *</InputTextWithLabel>
            <InputTextWithLabel type="date" id="profile-creation-intro-birth-date" onChange={handleFieldChange} required>Birth Date *</InputTextWithLabel>
            <div className="flex">
              <InputTextWithLabel id="profile-creation-intro-zip-code" className="w-1/2" placeholder="Zipcode" onChange={handleFieldChange} required pattern="\d{5}(-\d{4})?">Zip Code *</InputTextWithLabel>
              <SelectOptionsWithLabel
                id="profile-creation-intro-state"
                className="w-1/2"
                onChange={handleFieldChange}
                options={[
                  {label:"Alabama", value:"AL"},
                  {label:"Alaska", value:"AK"},
                  {label:"Arizona", value:"AZ"},
                  {label:"Arkansas", value:"AR"},
                  {label:"California", value:"CA"},
                  {label:"Colorado", value:"CO"},
                  {label:"Connecticut", value:"CT"},
                  {label:"Delaware", value:"DE"},
                  {label:"District of Columbia", value:"DC"},
                  {label:"Florida", value:"FL"},
                  {label:"Georgia", value:"GA"},
                  {label:"Hawaii", value:"HI"},
                  {label:"Idaho", value:"ID"},
                  {label:"Illinois", value:"IL"},
                  {label:"Indiana", value:"IN"},
                  {label:"Iowa", value:"IA"},
                  {label:"Kansas", value:"KS"},
                  {label:"Kentucky", value:"KY"},
                  {label:"Louisiana", value:"LA"},
                  {label:"Maine", value:"ME"},
                  {label:"Maryland", value:"MD"},
                  {label:"Massachusetts", value:"MA"},
                  {label:"Michigan", value:"MI"},
                  {label:"Minnesota", value:"MN"},
                  {label:"Mississippi", value:"MS"},
                  {label:"Missouri", value:"MO"},
                  {label:"Montana", value:"MT"},
                  {label:"Nebraska", value:"NE"},
                  {label:"Nevada", value:"NV"},
                  {label:"New Hampshire", value:"NH"},
                  {label:"New Jersey", value:"NJ"},
                  {label:"New Mexico", value:"NM"},
                  {label:"New York", value:"NY"},
                  {label:"North Carolina", value:"NC"},
                  {label:"North Dakota", value:"ND"},
                  {label:"Ohio", value:"OH"},
                  {label:"Oklahoma", value:"OK"},
                  {label:"Oregon", value:"OR"},
                  {label:"Pennsylvania", value:"PA"},
                  {label:"Rhode Island", value:"RI"},
                  {label:"South Carolina", value:"SC"},
                  {label:"South Dakota", value:"SD"},
                  {label:"Tennessee", value:"TN"},
                  {label:"Texas", value:"TX"},
                  {label:"Utah", value:"UT"},
                  {label:"Vermont", value:"VT"},
                  {label:"Virginia", value:"VA"},
                  {label:"Washington", value:"WA"},
                  {label:"West Virginia", value:"WV"},
                  {label:"Wisconsin", value:"WI"},
                  {label:"Wyoming", value:"WY"},
                ]}
                placeholder="Please select"
              >
                State
              </SelectOptionsWithLabel>
            </div>
            <div className="flex">
              <SelectOptionsWithLabel
                id="profile-creation-intro-country-phone-code"
                className="w-1/2"
                onChange={handleFieldChange}
                options={[
                  {label:"Afghanistan +93", value:"Afghanistan +93"},
                  {label:"Albania +355", value:"Albania +355"},
                  {label:"Algeria +213", value:"Algeria +213"},
                  {label:"American Samoa +1-684", value:"American Samoa +1-684"},
                  {label:"Andorra +376", value:"Andorra +376"},
                  {label:"Angola +244", value:"Angola +244"},
                  {label:"Anguilla +1-264", value:"Anguilla +1-264"},
                  {label:"Antarctica +672", value:"Antarctica +672"},
                  {label:"Antigua and Barbuda +1-268", value:"Antigua and Barbuda +1-268"},
                  {label:"Argentina +54", value:"Argentina +54"},
                  {label:"Armenia +374", value:"Armenia +374"},
                  {label:"Aruba +297", value:"Aruba +297"},
                  {label:"Australia +61", value:"Australia +61"},
                  {label:"Austria +43", value:"Austria +43"},
                  {label:"Azerbaijan +994", value:"Azerbaijan +994"},
                  {label:"Bahamas +1-242", value:"Bahamas +1-242"},
                  {label:"Bahrain +973", value:"Bahrain +973"},
                  {label:"Bangladesh +880", value:"Bangladesh +880"},
                  {label:"Barbados +1-246", value:"Barbados +1-246"},
                  {label:"Belarus +375", value:"Belarus +375"},
                  {label:"Belgium +32", value:"Belgium +32"},
                  {label:"Belize +501", value:"Belize +501"},
                  {label:"Benin +229", value:"Benin +229"},
                  {label:"Bermuda +1-441", value:"Bermuda +1-441"},
                  {label:"Bhutan +975", value:"Bhutan +975"},
                  {label:"Bolivia +591", value:"Bolivia +591"},
                  {label:"Bosnia and Herzegovina +387", value:"Bosnia and Herzegovina +387"},
                  {label:"Botswana +267", value:"Botswana +267"},
                  {label:"Brazil +55", value:"Brazil +55"},
                  {label:"British Indian Ocean Territory +246", value:"British Indian Ocean Territory +246"},
                  {label:"British Virgin Islands +1-284", value:"British Virgin Islands +1-284"},
                  {label:"Brunei +673", value:"Brunei +673"},
                  {label:"Bulgaria +359", value:"Bulgaria +359"},
                  {label:"Burkina Faso +226", value:"Burkina Faso +226"},
                  {label:"Burundi +257", value:"Burundi +257"},
                  {label:"Cambodia +855", value:"Cambodia +855"},
                  {label:"Cameroon +237", value:"Cameroon +237"},
                  {label:"Canada +1", value:"Canada +1"},
                  {label:"Cape Verde +238", value:"Cape Verde +238"},
                  {label:"Cayman Islands +1-345", value:"Cayman Islands +1-345"},
                  {label:"Central African Republic +236", value:"Central African Republic +236"},
                  {label:"Chad +235", value:"Chad +235"},
                  {label:"Chile +56", value:"Chile +56"},
                  {label:"China +86", value:"China +86"},
                  {label:"Christmas Island +61", value:"Christmas Island +61"},
                  {label:"Cocos Islands +61", value:"Cocos Islands +61"},
                  {label:"Colombia +57", value:"Colombia +57"},
                  {label:"Comoros +269", value:"Comoros +269"},
                  {label:"Cook Islands +682", value:"Cook Islands +682"},
                  {label:"Costa Rica +506", value:"Costa Rica +506"},
                  {label:"Croatia +385", value:"Croatia +385"},
                  {label:"Cuba +53", value:"Cuba +53"},
                  {label:"Curacao +599", value:"Curacao +599"},
                  {label:"Cyprus +357", value:"Cyprus +357"},
                  {label:"Czech Republic +420", value:"Czech Republic +420"},
                  {label:"Democratic Republic of the Congo +243", value:"Democratic Republic of the Congo +243"},
                  {label:"Denmark +45", value:"Denmark +45"},
                  {label:"Djibouti +253", value:"Djibouti +253"},
                  {label:"Dominica +1-767", value:"Dominica +1-767"},
                  {label:"Dominican Republic +1-809", value:"Dominican Republic +1-809"},
                  {label:"Dominican Republic +1-829", value:"Dominican Republic +1-829"},
                  {label:"Dominican Republic +1-849", value:"Dominican Republic +1-849"},
                  {label:"East Timor +670", value:"East Timor +670"},
                  {label:"Ecuador +593", value:"Ecuador +593"},
                  {label:"Egypt +20", value:"Egypt +20"},
                  {label:"El Salvador +503", value:"El Salvador +503"},
                  {label:"Equatorial Guinea +240", value:"Equatorial Guinea +240"},
                  {label:"Eritrea +291", value:"Eritrea +291"},
                  {label:"Estonia +372", value:"Estonia +372"},
                  {label:"Ethiopia +251", value:"Ethiopia +251"},
                  {label:"Falkland Islands +500", value:"Falkland Islands +500"},
                  {label:"Faroe Islands +298", value:"Faroe Islands +298"},
                  {label:"Fiji +679", value:"Fiji +679"},
                  {label:"Finland +358", value:"Finland +358"},
                  {label:"France +33", value:"France +33"},
                  {label:"French Polynesia +689", value:"French Polynesia +689"},
                  {label:"Gabon +241", value:"Gabon +241"},
                  {label:"Gambia +220", value:"Gambia +220"},
                  {label:"Georgia +995", value:"Georgia +995"},
                  {label:"Germany +49", value:"Germany +49"},
                  {label:"Ghana +233", value:"Ghana +233"},
                  {label:"Gibraltar +350", value:"Gibraltar +350"},
                  {label:"Greece +30", value:"Greece +30"},
                  {label:"Greenland +299", value:"Greenland +299"},
                  {label:"Grenada +1-473", value:"Grenada +1-473"},
                  {label:"Guam +1-671", value:"Guam +1-671"},
                  {label:"Guatemala +502", value:"Guatemala +502"},
                  {label:"Guernsey +44-1481", value:"Guernsey +44-1481"},
                  {label:"Guinea +224", value:"Guinea +224"},
                  {label:"Guinea-Bissau +245", value:"Guinea-Bissau +245"},
                  {label:"Guyana +592", value:"Guyana +592"},
                  {label:"Haiti +509", value:"Haiti +509"},
                  {label:"Honduras +504", value:"Honduras +504"},
                  {label:"Hong Kong +852", value:"Hong Kong +852"},
                  {label:"Hungary +36", value:"Hungary +36"},
                  {label:"Iceland +354", value:"Iceland +354"},
                  {label:"India +91", value:"India +91"},
                  {label:"Indonesia +62", value:"Indonesia +62"},
                  {label:"Iran +98", value:"Iran +98"},
                  {label:"Iraq +964", value:"Iraq +964"},
                  {label:"Ireland +353", value:"Ireland +353"},
                  {label:"Isle of Man +44-1624", value:"Isle of Man +44-1624"},
                  {label:"Israel +972", value:"Israel +972"},
                  {label:"Italy +39", value:"Italy +39"},
                  {label:"Ivory Coast +225", value:"Ivory Coast +225"},
                  {label:"Jamaica +1-876", value:"Jamaica +1-876"},
                  {label:"Japan +81", value:"Japan +81"},
                  {label:"Jersey +44-1534", value:"Jersey +44-1534"},
                  {label:"Jordan +962", value:"Jordan +962"},
                  {label:"Kazakhstan +7", value:"Kazakhstan +7"},
                  {label:"Kenya +254", value:"Kenya +254"},
                  {label:"Kiribati +686", value:"Kiribati +686"},
                  {label:"Kosovo +383", value:"Kosovo +383"},
                  {label:"Kuwait +965", value:"Kuwait +965"},
                  {label:"Kyrgyzstan +996", value:"Kyrgyzstan +996"},
                  {label:"Laos +856", value:"Laos +856"},
                  {label:"Latvia +371", value:"Latvia +371"},
                  {label:"Lebanon +961", value:"Lebanon +961"},
                  {label:"Lesotho +266", value:"Lesotho +266"},
                  {label:"Liberia +231", value:"Liberia +231"},
                  {label:"Libya +218", value:"Libya +218"},
                  {label:"Liechtenstein +423", value:"Liechtenstein +423"},
                  {label:"Lithuania +370", value:"Lithuania +370"},
                  {label:"Luxembourg +352", value:"Luxembourg +352"},
                  {label:"Macau +853", value:"Macau +853"},
                  {label:"Macedonia +389", value:"Macedonia +389"},
                  {label:"Madagascar +261", value:"Madagascar +261"},
                  {label:"Malawi +265", value:"Malawi +265"},
                  {label:"Malaysia +60", value:"Malaysia +60"},
                  {label:"Maldives +960", value:"Maldives +960"},
                  {label:"Mali +223", value:"Mali +223"},
                  {label:"Malta +356", value:"Malta +356"},
                  {label:"Marshall Islands +692", value:"Marshall Islands +692"},
                  {label:"Mauritania +222", value:"Mauritania +222"},
                  {label:"Mauritius +230", value:"Mauritius +230"},
                  {label:"Mayotte +262", value:"Mayotte +262"},
                  {label:"Mexico +52", value:"Mexico +52"},
                  {label:"Micronesia +691", value:"Micronesia +691"},
                  {label:"Moldova +373", value:"Moldova +373"},
                  {label:"Monaco +377", value:"Monaco +377"},
                  {label:"Mongolia +976", value:"Mongolia +976"},
                  {label:"Montenegro +382", value:"Montenegro +382"},
                  {label:"Montserrat +1-664", value:"Montserrat +1-664"},
                  {label:"Morocco +212", value:"Morocco +212"},
                  {label:"Mozambique +258", value:"Mozambique +258"},
                  {label:"Myanmar +95", value:"Myanmar +95"},
                  {label:"Namibia +264", value:"Namibia +264"},
                  {label:"Nauru +674", value:"Nauru +674"},
                  {label:"Nepal +977", value:"Nepal +977"},
                  {label:"Netherlands +31", value:"Netherlands +31"},
                  {label:"Netherlands Antilles +599", value:"Netherlands Antilles +599"},
                  {label:"New Caledonia +687", value:"New Caledonia +687"},
                  {label:"New Zealand +64", value:"New Zealand +64"},
                  {label:"Nicaragua +505", value:"Nicaragua +505"},
                  {label:"Niger +227", value:"Niger +227"},
                  {label:"Nigeria +234", value:"Nigeria +234"},
                  {label:"Niue +683", value:"Niue +683"},
                  {label:"North Korea +850", value:"North Korea +850"},
                  {label:"Northern Mariana Islands +1-670", value:"Northern Mariana Islands +1-670"},
                  {label:"Norway +47", value:"Norway +47"},
                  {label:"Oman +968", value:"Oman +968"},
                  {label:"Pakistan +92", value:"Pakistan +92"},
                  {label:"Palau +680", value:"Palau +680"},
                  {label:"Palestine +970", value:"Palestine +970"},
                  {label:"Panama +507", value:"Panama +507"},
                  {label:"Papua New Guinea +675", value:"Papua New Guinea +675"},
                  {label:"Paraguay +595", value:"Paraguay +595"},
                  {label:"Peru +51", value:"Peru +51"},
                  {label:"Philippines +63", value:"Philippines +63"},
                  {label:"Pitcairn +64", value:"Pitcairn +64"},
                  {label:"Poland +48", value:"Poland +48"},
                  {label:"Portugal +351", value:"Portugal +351"},
                  {label:"Puerto Rico +1-787", value:"Puerto Rico +1-787"},
                  {label:"Puerto Rico +1-939", value:"Puerto Rico +1-939"},
                  {label:"Qatar +974", value:"Qatar +974"},
                  {label:"Republic of the Congo +242", value:"Republic of the Congo +242"},
                  {label:"Reunion +262", value:"Reunion +262"},
                  {label:"Romania +40", value:"Romania +40"},
                  {label:"Russia +7", value:"Russia +7"},
                  {label:"Rwanda +250", value:"Rwanda +250"},
                  {label:"Saint Barthelemy +590", value:"Saint Barthelemy +590"},
                  {label:"Saint Helena +290", value:"Saint Helena +290"},
                  {label:"Saint Kitts and Nevis +1-869", value:"Saint Kitts and Nevis +1-869"},
                  {label:"Saint Lucia +1-758", value:"Saint Lucia +1-758"},
                  {label:"Saint Martin +590", value:"Saint Martin +590"},
                  {label:"Saint Pierre and Miquelon +508", value:"Saint Pierre and Miquelon +508"},
                  {label:"Saint Vincent and the Grenadines +1-784", value:"Saint Vincent and the Grenadines +1-784"},
                  {label:"Samoa +685", value:"Samoa +685"},
                  {label:"San Marino +378", value:"San Marino +378"},
                  {label:"Sao Tome and Principe +239", value:"Sao Tome and Principe +239"},
                  {label:"Saudi Arabia +966", value:"Saudi Arabia +966"},
                  {label:"Senegal +221", value:"Senegal +221"},
                  {label:"Serbia +381", value:"Serbia +381"},
                  {label:"Seychelles +248", value:"Seychelles +248"},
                  {label:"Sierra Leone +232", value:"Sierra Leone +232"},
                  {label:"Singapore +65", value:"Singapore +65"},
                  {label:"Sint Maarten +1-721", value:"Sint Maarten +1-721"},
                  {label:"Slovakia +421", value:"Slovakia +421"},
                  {label:"Slovenia +386", value:"Slovenia +386"},
                  {label:"Solomon Islands +677", value:"Solomon Islands +677"},
                  {label:"Somalia +252", value:"Somalia +252"},
                  {label:"South Africa +27", value:"South Africa +27"},
                  {label:"South Korea +82", value:"South Korea +82"},
                  {label:"South Sudan +211", value:"South Sudan +211"},
                  {label:"Spain +34", value:"Spain +34"},
                  {label:"Sri Lanka +94", value:"Sri Lanka +94"},
                  {label:"Sudan +249", value:"Sudan +249"},
                  {label:"Suriname +597", value:"Suriname +597"},
                  {label:"Svalbard and Jan Mayen +47", value:"Svalbard and Jan Mayen +47"},
                  {label:"Swaziland +268", value:"Swaziland +268"},
                  {label:"Sweden +46", value:"Sweden +46"},
                  {label:"Switzerland +41", value:"Switzerland +41"},
                  {label:"Syria +963", value:"Syria +963"},
                  {label:"Taiwan +886", value:"Taiwan +886"},
                  {label:"Tajikistan +992", value:"Tajikistan +992"},
                  {label:"Tanzania +255", value:"Tanzania +255"},
                  {label:"Thailand +66", value:"Thailand +66"},
                  {label:"Togo +228", value:"Togo +228"},
                  {label:"Tokelau +690", value:"Tokelau +690"},
                  {label:"Tonga +676", value:"Tonga +676"},
                  {label:"Trinidad and Tobago +1-868", value:"Trinidad and Tobago +1-868"},
                  {label:"Tunisia +216", value:"Tunisia +216"},
                  {label:"Turkey +90", value:"Turkey +90"},
                  {label:"Turkmenistan +993", value:"Turkmenistan +993"},
                  {label:"Turks and Caicos Islands +1-649", value:"Turks and Caicos Islands +1-649"},
                  {label:"Tuvalu +688", value:"Tuvalu +688"},
                  {label:"U.S. Virgin Islands +1-340", value:"U.S. Virgin Islands +1-340"},
                  {label:"Uganda +256", value:"Uganda +256"},
                  {label:"Ukraine +380", value:"Ukraine +380"},
                  {label:"United Arab Emirates +971", value:"United Arab Emirates +971"},
                  {label:"United Kingdom +44", value:"United Kingdom +44"},
                  {label:"United States +1", value:"United States +1"},
                  {label:"Uruguay +598", value:"Uruguay +598"},
                  {label:"Uzbekistan +998", value:"Uzbekistan +998"},
                  {label:"Vanuatu +678", value:"Vanuatu +678"},
                  {label:"Vatican +379", value:"Vatican +379"},
                  {label:"Venezuela +58", value:"Venezuela +58"},
                  {label:"Vietnam +84", value:"Vietnam +84"},
                  {label:"Wallis and Futuna +681", value:"Wallis and Futuna +681"},
                  {label:"Western Sahara +212", value:"Western Sahara +212"},
                  {label:"Yemen +967", value:"Yemen +967"},
                  {label:"Zambia +260", value:"Zambia +260"},
                  {label:"Zimbabwe +263", value:"Zimbabwe +263"},
                ]}
                // defaultOption="United States +1"
              >
                Country Phone Code *
              </SelectOptionsWithLabel>
              <InputTextWithLabel id="profile-creation-intro-phone-number" className="w-1/2" type="tel" placeholder="Phone number" onChange={handleFieldChange} required>Phone Number *</InputTextWithLabel>
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <h2>Intro</h2>
            </legend>
            <InputTextWithLabel id="profile-creation-intro-headlines" onChange={handleFieldChange} placeholder="Type here">Headlines</InputTextWithLabel>
            <InputTextWithLabel id="profile-creation-intro-current-or-graduated-school" onChange={handleFieldChange} placeholder="Type here" required>Current School / Graduated School *</InputTextWithLabel>
            <InputTextWithLabel id="profile-creation-intro-current-position" onChange={handleFieldChange} placeholder="e.g., Software Developer">Current Position</InputTextWithLabel>
            <div>
              Resume *
              <InputFileDropzone
                id="profile-creation-intro-resume"
                fileTypeText="PDF, DOC, DOCX, TXT or RTF (max. TBD MB)"
                accept=".pdf,.doc,.docx,.txt,.rtf"
              />
            </div>
          </fieldset>
          <div className="flex">
            <Button pill color="gray">Previous</Button>
            <Button pill type="submit">Save and continue</Button>
          </div>
        </form>
      </section>
    </main>
  );
}