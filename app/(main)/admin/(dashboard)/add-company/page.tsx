'use client';
import { FormEvent, useEffect, useState } from 'react';
import { CompanyAdminCreationDTO } from '@/data/dtos/CompanyAdminCreationDTO';
import { industry_sectors } from '@prisma/client';
//TODO: Add ability to add a company logo
//TODO: add phone number input 
//TODO: add company Website url

export default function Page() {
  const [industrySectors, setIndustrySectors] = useState<industry_sectors[]>();
  useEffect(()=>{
    fetch('/api/joblistings/sectors').then((res)=>{
      return res.json();
    }).then((jsonData)=>{
      setIndustrySectors(jsonData)
    });

  },[])
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
        isApproved: true,
        companyMission: formData.get('company_mission') as string,
        estimatedAnnualHires: parseInt(formData.get("hires") as string, 10),
        industrySectorId: formData.get('sector') as string,

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

      }
    } catch (error) {
      console.error('Error creating job listing:', error);
    }
  }
  return (
    <form onSubmit={onSubmit} className='space-y-3'>
      
      {/* Job Title */}
      <div className="grid grid-cols-1">
        <label htmlFor="company_name">Company name *</label>
        <input type="text" name="company_name" required />
      </div>
      
      <div className="grid grid-cols-1">
        <label htmlFor="sector">What Tech Sector does this Company fall under?</label>
        <select name='sector' id='sector' required>
          <option value={''}>--Please Select a Sector--</option>
          { 
            industrySectors?.map((sector)=> <option key={sector.industry_sector_id} value={sector.industry_sector_id}>{sector.sector_title}</option>)
          } 
        </select>
      </div>

      {/* Job Description */}
      <div className="grid grid-cols-1">
        <label htmlFor="about_company">About Company *</label>
        <textarea name="about_company" required />
      </div>
  {/* Job Description */}
  <div className="grid grid-cols-1">
        <label htmlFor="company_mission">Company Mission</label>
        <textarea name="company_mission" />
      </div>



      {/*company email */}
      <div className="grid grid-cols-1">
        <label htmlFor="company_email">Company Email *</label>
        <input type='email' name="company_email" required />
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

      <div className="grid grid-cols-1">
        <label htmlFor="hires">Estimated Annual Hires</label>
        <input type="number" name="hires"/>
      </div>

      {/* Submit Button */}
      <div>
        <button type="submit">Create Company</button>
      </div>
    </form>
  );
}


