'use client';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TagsWithAutocomplete from '@/app/ui/components/mui/TagsWithAutocomplete';
import { SkillDTO } from '@/data/dtos/SkillDTO';
import { companies, industry_sectors, technology_areas } from '@prisma/client';
import { JobPostCreationDTO } from '@/data/dtos/JobListingDTO';


export default function Page() {
  const router = useRouter();
  const [skills, setSkills] = useState<SkillDTO[]>();
  const [fetchLoadedTags, setFetchLoadedTags] = useState<SkillDTO[]>([]);
  const [companies, setCompanies] = useState<companies[]>();
  const [techAres, setTechAreas] = useState<technology_areas[]>();
  const [industrySectors, setIndustrySectors] = useState<industry_sectors[]>();
 
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const submitButton = event.currentTarget.querySelector(
      'button[type="submit"]',
    ) as HTMLButtonElement;
    if (submitButton) submitButton.disabled = true;
    const companyData = {
      company_name: formData.get('company_name') as string,

    };
    try {
      const response = await fetch('/api/joblistings/add', {
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
  useEffect(()=>{
    fetch('/api/companies/getall').then((res)=>{
      return res.json();
    }).then((jsonData)=>{
      setCompanies(jsonData);
    });

    fetch('/api/joblistings/sectors').then((res)=>{
      return res.json();
    }).then((jsonData)=>{
      setIndustrySectors(jsonData)
    });
    
    fetch('/api/joblistings/techarea').then((res)=>{
      return res.json();
    }).then((jsonData)=>{
      setTechAreas(jsonData);
    });

  },[])
  return (
    <form onSubmit={onSubmit} className='space-y-3'>
      
      {/* Job Title */}
      <div className="grid grid-cols-1">
        <label htmlFor="company_name">Company name</label>
        <input type="text" name="company_name" required />
      </div>


{/**workline */}





      {/* Job Description */}
      <div className="grid grid-cols-1">
        <label htmlFor="job_description">Job Description</label>
        <textarea name="job_description" required />
      </div>


      {/*tech Sector*/}
      <div className="grid grid-cols-1">
        <label htmlFor="sector">What Tech Sector does this job fall under?</label>
        <select name='sector' id='sector' required>
          <option value={''}>--Please Select a Sector--</option>
          { 
            industrySectors?.map((sector)=> <option value={sector.industry_sector_id}>{sector.sector_title}</option>)
          } 
        </select>
      </div>
      {/*Tech Area*/}
      <div className="grid grid-cols-1">
        <label htmlFor="area">What Tech Area Best Discribes This Job?</label>
        <select name='area' id='area' required>
          <option value={''}>--Please Select an Area--</option>
          { 
            techAres?.map((area)=> <option value={area.id}>{area.title}</option>)
          } 
        </select>
      </div>

      {/* Internship */}
      <div>
        <label>Is this an internship?</label>
        <div>
          <label>
            <input type="radio" name="is_internship" value="yes" required />
            Yes
          </label>
          <label>
            <input type="radio" name="is_internship" value="no" required />
            No
          </label>
        </div>
      </div>

      {/* Paid */}
      <div>
        <label>Is this a paid position?</label>
        <div>
          <label>
            <input type="radio" name="is_paid" value="yes" required />
            Yes
          </label>
          <label>
            <input type="radio" name="is_paid" value="no" required />
            No
          </label>
        </div>
      </div>

      {/* Employment Type */}
      <div>
        <label htmlFor="employment_type">Employment Type</label>
        <select name="employment_type" defaultValue="full-time">
          <option value="full-time">Full-Time</option>
          <option value="part-time">Part-Time</option>
          <option value="contract">Contract</option>
        </select>
      </div>

      {/* Location */}
      <div>
        <label>Location</label>
        <div>
          <label>
            <input type="radio" name="location" value="remote" required />
            Remote
          </label>
        </div>
        <div>
          <label>
            <input type="radio" name="location" value="on-site" />
            On-Site
          </label>
        </div>
        <div>
          <label>
            <input type="radio" name="location" value="hybrid" />
            Hybrid
          </label>
        </div>
      </div>

      {/* Salary Range */}
      <div className="grid grid-cols-1">
        <label htmlFor="salary_range">Salary Range</label>
        <input type="text" name="salary_range" required />
      </div>

      {/* County */}

      {/* ZIP Code */}
      <div className="grid grid-cols-1">
        <label htmlFor="zip" >ZIP Code</label>
        <input type="text" name="zip" required />
      </div>
      {/* Unpublish Date */}
      <div className="grid grid-cols-1">
        <label htmlFor="unpublish_date">Unpublish Date</label>
        <input type="date" name="unpublish_date" min={new Date().toISOString().split("T")[0]}/>
      </div>

      {/* Job Post URL */}
      <div className="grid grid-cols-1">
        <label htmlFor="job_post_url">Job Post URL</label>
        <input type="text" name="job_post_url" />
      </div>

      {/* Assessment URL */}
      <div >
        <label htmlFor="assessment_url">Assessment URL</label>
        <input type="text" name="assessment_url" />
      </div>

      {/* Skills */}
      <div>
        <label htmlFor="job-listing-skills">What skills are needed for this role?</label>
      <TagsWithAutocomplete
        apiSearchRoute="/api/skills/search/"
        fieldLabel="Select the top 5 skills"
        id="job-listing-skills"
        maxTags={5}
        searchingText="Searching..."
        noResultsText="No skills found..."
        onChange={function (ev, val) {
          if (val.every((skill) => typeof skill !== 'string')) {
            setSkills(val as SkillDTO[]);
          }
        }}
        searchPlaceholder="Skill (ex: Java)"
        addNewTags={fetchLoadedTags}
        getTagLabel={(option: SkillDTO) => option.skill_name}
        getTagLink={(option: SkillDTO) => option.skill_info_url}
      />
      <p>Select your top 5 skills from your skills list</p>
</div>
      {/* Submit Button */}
      <div>
        <button type="submit">Create Job Listing</button>
      </div>
    </form>
  );
}
