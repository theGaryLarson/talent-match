'use client'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import TagsWithAutocomplete from '@/app/ui/components/mui/TagsWithAutocomplete';
import { SkillDTO } from '@/data/dtos/SkillDTO';
export default function Page() {
  const router = useRouter()
  const [skills, setSkills] = useState<SkillDTO[]>();
  const [fetchLoadedTags, setFetchLoadedTags] = useState<SkillDTO[]>([]);
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      
    const formData = new FormData(event.currentTarget);
    const submitButton = event.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement;;
    if (submitButton) submitButton.disabled = true;
    // Convert FormData to a JobListingDTO object
    const jobListingData = {
      //location_id: formData.get('location_id') as string,
      //employer_id: formData.get('employer_id') as string,
      job_title: formData.get('job_title') as string,
      job_description: formData.get('job_description') as string,
      is_internship: formData.get('is_internship') === 'yes', // Radio is yes or no
      is_paid: formData.get('is_paid') === 'yes',
      employment_type: formData.get('employment_type') as string,
      location: formData.get('location') as string,
      salary_range: formData.get('salary_range') as string,
      zip: formData.get('zip') as string,
      unpublish_date: formData.get('unpublish_date') ? new Date(formData.get('unpublish_date') as string) : undefined,
      job_post_url: formData.get('job_post_url') as string,
      assessment_url: formData.get('assessment_url') as string,
      skillIds: skills?.map((v)=> v.skill_id)
    };
//console.log("look here: ", jobListingData)
    try {
      // Send job listing data to server
      
      const response = await fetch('/api/joblistings/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobListingData), // Send as JSON
      });

      if (!response.ok) {
        // If response is not OK, handle error
        console.error('Failed to create job listing');
        return;
      }else{
        // Await the response JSON
      const data = await response.json();
      //console.log('Job listing created:', data);
      router.push('/services/joblistings/'+data.job_posting_id)
      }
    } catch (error) {
      console.error('Error creating job listing:', error);
    }
  }
    
    
   
    return  (
        <form onSubmit={onSubmit}>
    
          {/* Job Title */}
          <div>
            <label htmlFor="job_title">Job Title</label>
            <input type="text" name="job_title" required />
          </div>
    
          {/* Job Description */}
          <div className='flex'>
            <label htmlFor="job_description">Job Description</label>
            <textarea name="job_description" required />
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
          <div>
            <label htmlFor="salary_range">Salary Range</label>
            <input type="text" name="salary_range" required />
          </div>
    
          {/* County */}
    
          {/* ZIP Code */}
          <div>
            <label htmlFor="zip">ZIP Code</label>
            <input type="text" name="zip" required />
          </div>
          {/* Unpublish Date */}
          <div>
            <label htmlFor="unpublish_date">Unpublish Date</label>
            <input type="date" name="unpublish_date" />
          </div>
    
          {/* Job Post URL */}
          <div>
            <label htmlFor="job_post_url">Job Post URL</label>
            <input type="text" name="job_post_url" />
          </div>
    
          {/* Assessment URL */}
          <div>
            <label htmlFor="assessment_url">Assessment URL</label>
            <input type="text" name="assessment_url" />
          </div>
    
          {/* Skills */}
          <TagsWithAutocomplete
                apiSearchRoute="/api/skills/search/"
                fieldLabel="Select your skills *"
                id="profile-creation-showcase-skills"
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

    
          {/* Submit Button */}
          <div>
            <button type="submit">Create Job Listing</button>
          </div>
        </form>
    )
  }