// 'use client';
//
// import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import type { RootState } from '@/lib/employerStore';
// import { useSelector, useDispatch } from 'react-redux';
// // import { addField, updateField, submitForm, submitFormSuccess, submitFormFailure, FormState } from '@/lib/features/profileCreation/formSlice';
// import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
//
// import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
// import { Button, Progress } from 'flowbite-react';
// import { Label } from 'flowbite-react';
// import { Checkbox, Typography } from '@mui/material';
// import SnackbarWithIcon from '@/app/ui/components/SnackbarWithIcon';
// import { useSession } from 'next-auth/react';
// import { getFieldValue } from '@/app/lib/utils';
// import SelectAutoload from '@/app/ui/components/mui/SelectAutoload';
// import { CompanyAddressDropdownDTO } from '@/data/dtos/CompanyAddressDropdownDTO';
//
// export default function CreateEmployerCompanyInfoDisclosurePage() {
//   const { fields, isSubmitting, error }: FormState = useSelector(
//     (state: RootState) => state.form,
//   );
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [open, setOpen] = useState<boolean>(false);
//
//   const [newFieldLabel, setNewFieldLabel] = useState('');
//   const [newFieldType, setNewFieldType] = useState<
//     'text' | 'email' | 'number' | 'select' | 'radio'
//   >('text');
//   const [newFieldOptions, setNewFieldOptions] = useState<
//     { value: string | number; label: string }[]
//   >([]);
//   const [companyName, setCompanyName] = useState<string>('');
//   const [workAddress, setWorkAddress] =
//     useState<CompanyAddressDropdownDTO | null>(null);
//   const { data: session, update, status } = useSession();
//
//   useEffect(() => {
//     if (!session?.user?.companyId) return;
//     // work around until redux state is implemented then should be able
//     // to grab company name from store.
//     const populateCompanyName = async () => {
//       try {
//         const response = await fetch(
//           `/api/companies/name/get/${session.user.companyId}`,
//           {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           },
//         );
//
//         if (!response.ok) {
//           throw new Error(`Error: ${response.status} ${response.statusText}`);
//         }
//
//         const { success, result } = await response.json(); // Destructure response
//
//         if (success && result) {
//           const { company_name } = result;
//           setCompanyName(company_name);
//         } else {
//           console.error('Failed to fetch company name.', result);
//         }
//       } catch (e) {
//         console.error('Error fetching company name:', e);
//       }
//     };
//     populateCompanyName();
//   }, [session?.user?.id]);
//
//   const handleFieldChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     const { name, value } = e.target;
//     console.log(name, value);
//     const field = fields.find((field) => field.id === name);
//     if (field) {
//       const parsedValue = field.type === 'number' ? parseInt(value, 10) : value;
//       dispatch(updateField({ id: field.id, value: parsedValue }));
//     } else {
//       dispatch(
//         addField({
//           id: e.target.id,
//           label: newFieldLabel,
//           value: e.target.value,
//           type: newFieldType,
//           options: newFieldOptions,
//         }),
//       );
//     }
//   };
//
//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!termsAccepted) {
//       setOpen(true);
//     }
//     dispatch(submitForm());
//
//     const formData = {
//       employerId: session?.user?.employerId,
//
//       job_title: getFieldValue(
//         fields,
//         'profile-creation-company-job-title',
//         '',
//       ),
//       linkedin_url: getFieldValue(
//         fields,
//         'profile-creation-company-linkedin',
//         '',
//       ),
//
//       // company was already associated with employer at the employer/company page
//       // company_name: getFieldValue(fields, 'profile-creation-company-name', ''),
//       work_address_id: workAddress?.companyAddressId ?? undefined,
//       hasAgreedTerms: termsAccepted,
//     };
//
//     try {
//       const response = await fetch(
//         `/api/employers/account/disclosures/update/${session?.user?.employerId}`,
//         {
//           method: 'PATCH',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//         },
//       );
//
//       if (response.ok) {
//         const result = await response.json();
//         dispatch(submitFormSuccess());
//         router.push('/create-profile/employer/congratulations');
//       } else {
//         const errorData = await response.json();
//         dispatch(
//           submitFormFailure(errorData.error || 'Failed to submit the form'),
//         );
//       }
//     } catch (error) {
//       dispatch(submitFormFailure('Failed to submit the form'));
//     }
//   };
//
//   const handleClose = (
//     event?: React.SyntheticEvent | Event,
//     reason?: string,
//   ) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpen(false);
//   };
//
//   return (
//     <main className="flex justify-center">
//       <aside className="profile-form-aside"></aside>
//       <section className="profile-form-section">
//         <ProgressBarFlat progress={(6 / 6) * 100} size="sm" />
//
//         <p>Step 6/6</p>
//         <h1>Professional Info and Disclosures</h1>
//         <p className="subtitle">* Indicates a required field</p>
//
//         <SnackbarWithIcon
//           open={open}
//           onClose={handleClose}
//           variant="alert"
//           message={
//             <div>
//               <Typography variant="body1">Must agree to terms!</Typography>
//               <Typography variant="body2">
//                 To finish creating your company profile, you must agree to the
//                 terms.
//               </Typography>
//             </div>
//           }
//         />
//
//         <form onSubmit={handleSubmit}>
//           <fieldset>
//             <div className="profile-form-grid">
//               {/* This field will be automated */}
//               <InputTextWithLabel
//                 id="profile-creation-company-name"
//                 placeholder="Automated"
//                 onChange={handleFieldChange}
//                 value={companyName}
//                 disabled={!!companyName}
//                 required
//               >
//                 Company Name
//               </InputTextWithLabel>
//               <h2>Last thing...</h2>
//               <InputTextWithLabel
//                 id="profile-creation-company-job-title"
//                 placeholder="Job Title"
//                 onChange={handleFieldChange}
//                 value={getFieldValue(
//                   fields,
//                   'profile-creation-company-job-title',
//                   '',
//                 )}
//                 required
//               >
//                 Job Title *
//               </InputTextWithLabel>
//               <SelectAutoload
//                 id="profile-creation-work-address"
//                 apiAutoloadRoute={`/api/companies/locations/get/${session?.user?.companyId}`}
//                 label="Work Address *"
//                 getOptionLabel={(option: CompanyAddressDropdownDTO) =>
//                   `${option.city}, ${option.stateCode} ${option.zipCode}`
//                 }
//                 getOptionFromLabel={(
//                   options: CompanyAddressDropdownDTO[],
//                   label: string,
//                 ) => {
//                   // Match based on the label (formatted) or a unique identifier like companyAddressId
//                   // For simplicity, we map by `companyAddressId` or any unique identifier instead of label
//                   const matchedOption = options.find(
//                     (item) =>
//                       `${item.city}, ${item.stateCode} ${item.zipCode}` ===
//                       label,
//                   );
//                   return (
//                     matchedOption || {
//                       companyAddressId: '',
//                       city: '',
//                       stateCode: '',
//                       zipCode: '',
//                     }
//                   );
//                 }}
//                 placeholder="Your work location"
//                 value={workAddress}
//                 onChange={(val) => setWorkAddress(val)}
//                 required
//                 loadingText="Retrieving work addresses..."
//               />
//               {/*<InputTextWithLabel*/}
//               {/*  id="profile-creation-company-work-location"*/}
//               {/*  placeholder="98362"*/}
//               {/*  onChange={handleFieldChange}*/}
//               {/*  value={getFieldValue(*/}
//               {/*    fields,*/}
//               {/*    'profile-creation-company-work-location',*/}
//               {/*    '',*/}
//               {/*  )}*/}
//               {/*  required*/}
//               {/*>*/}
//               {/*  Work Location Zip Code **/}
//               {/*</InputTextWithLabel>*/}
//               <InputTextWithLabel
//                 id="profile-creation-company-linkedin"
//                 placeholder="www.linkedin.com/username"
//                 onChange={handleFieldChange}
//                 value={getFieldValue(
//                   fields,
//                   'profile-creation-company-linkedin',
//                   '',
//                 )}
//                 required
//               >
//                 LinkedIn URL *
//               </InputTextWithLabel>
//             </div>
//           </fieldset>
//
//           <legend>
//             <h2>Terms</h2>
//           </legend>
//           <Label className="block">
//             <Checkbox
//               name="profile-creation-disclosures-require-terms"
//               checked={termsAccepted}
//               onChange={(event) => setTermsAccepted(event.target.checked)}
//             />{' '}
//             By signing up you agree to our terms of use. *
//           </Label>
//
//           <div className="profile-form-progress-btn-group">
//             <Button pill className="custom-outline-btn">
//               Cancel
//             </Button>
//             <Button pill type="submit">
//               Save and continue
//             </Button>
//           </div>
//         </form>
//       </section>
//     </main>
//   );
// }
