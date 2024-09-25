// 'use client';
//
// import React, { ChangeEvent, FormEvent, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import type { RootState } from '@/lib/employerStore';
// import { useSelector, useDispatch } from 'react-redux';
// // import { addField, updateField, submitForm, submitFormSuccess, submitFormFailure, FormState } from '@/lib/features/profileCreation/formSlice';
// import InputTextWithLabel from '@/app/ui/components/InputTextWithLabel';
// import SelectOptionsWithLabel from '@/app/ui/components/SelectOptionsWithLabel';
// import SelectWithLabel from '@/app/ui/components/mui/SelectWithLabel';
// import ProgressBarFlat from '@/app/ui/components/ProgressBarFlat';
// import { Button, Progress } from 'flowbite-react';
// import TextareaWithLabel from '@/app/ui/components/TextareaWithLabel';
// import { useSession } from 'next-auth/react';
// import { getFieldValue } from '@/app/lib/utils';
//
// export default function CreateEmployerCompanyInfoMissionPage() {
//   const { fields, isSubmitting, error }: FormState = useSelector(
//     (state: RootState) => state.form,
//   );
//   const dispatch = useDispatch();
//   const router = useRouter();
//
//   const [newFieldLabel, setNewFieldLabel] = useState('');
//   const [newFieldType, setNewFieldType] = useState<
//     'text' | 'email' | 'number' | 'select' | 'radio'
//   >('text');
//   const [newFieldOptions, setNewFieldOptions] = useState<
//     { value: string | number; label: string }[]
//   >([]);
//   const { data: session, update, status } = useSession();
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
//     dispatch(submitForm());
//
//     const formData = {
//       companyId: session?.user?.companyId,
//       mission: getFieldValue(fields, 'profile-creation-company-mission', ''),
//     };
//     console.log(JSON.stringify(formData, null, 2));
//     try {
//       const response = await fetch('/api/companies/mission/update/', {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//
//       if (response.ok) {
//         const result = await response.json();
//         dispatch(submitFormSuccess());
//         router.push('/create-profile/employer/video');
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
//   return (
//     <main className="flex justify-center">
//       <aside className="profile-form-aside"></aside>
//       <section className="profile-form-section">
//         <ProgressBarFlat progress={(4 / 6) * 100} size="sm" />
//         <p>Step 4/6</p>
//         <h1>Company Info</h1>
//         <p className="subtitle">* Indicates a required field</p>
//         <h2>Mission</h2>
//
//         <form onSubmit={handleSubmit}>
//           What is your company mission *
//           <div className="profile-form-grid">
//             <fieldset>
//               <TextareaWithLabel
//                 id="profile-creation-company-mission"
//                 placeholder="Tell your company mission"
//                 rows="16"
//                 required
//                 onChange={handleFieldChange}
//                 value={getFieldValue(
//                   fields,
//                   'profile-creation-company-mission',
//                   '',
//                 )}
//               ></TextareaWithLabel>
//             </fieldset>
//           </div>
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
