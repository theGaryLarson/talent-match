'use client';
import { FormEvent } from 'react';
import { CompanyAdminCreationDTO } from '@/data/dtos/CompanyAdminCreationDTO';


export default function Page() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const submitButton = event.currentTarget.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    if (submitButton) submitButton.disabled = true;
    const companyData:CompanyAdminCreationDTO = {
        companyName: formData.get('company_name') as string,
        aboutUs: formData.get('about_company') as string,
        companyEmail: formData.get('company_email') as string,
        yearFounded:  parseInt(formData.get('year_founded') as string, 10),
        size: formData.get('size') as string,
        isApproved: true
    };
    try {
      const response = await fetch('/api/companies/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyData), // Send as JSON
      });

      if (!response.ok) {
        // If response is not OK, handle error
        console.error('Failed to create company');
        return;
      } else {
        // Await the response JSON
        const data = await response.json();
        console.log("company created: ", data)
       
      }
    } catch (error) {
      console.error('Error creating job listing:', error);
    }
  }
  return (
    <form onSubmit={onSubmit} className='space-y-3'>
      
      {/* Job Title */}
      <div className="grid grid-cols-1">
        <label htmlFor="company_name">Company name</label>
        <input type="text" name="company_name" required />
      </div>


      {/* Job Description */}
      <div className="grid grid-cols-1">
        <label htmlFor="about_company">About Company</label>
        <textarea name="about_company" required />
      </div>



      {/*company email */}
      <div className="grid grid-cols-1">
        <label htmlFor="company_email">Company Email</label>
        <textarea name="company_email" required />
      </div>

      {/* year founded */}
      <div className="grid grid-cols-1">
        <label htmlFor="year_founded">Year Founded</label>
        <input type="number" name="year_founded"/>
      </div>

      <div className="grid grid-cols-1">
        <label htmlFor="size">Number Of Employes</label>
        <input type="number" name="size"/>
      </div>

      {/* Submit Button */}
      <div>
        <button type="submit">Create Company</button>
      </div>
    </form>
  );
}
