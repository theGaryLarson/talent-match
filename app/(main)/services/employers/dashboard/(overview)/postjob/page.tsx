'use client'
import { createJobListingWithSkills } from '@/app/lib/joblistings'
import { JobListingDTO } from '@/data/dtos/JobListingDTO'
import { FormEvent } from 'react'
export default function Page() {
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
   
      const formData = new FormData(event.currentTarget)

    // Convert FormData to a JobListingDTO object
    const jobListingData: JobListingDTO = {
      company_id: formData.get('company_id') as string,
      location_id: formData.get('location_id') as string,
      employer_id: formData.get('employer_id') as string,
      job_title: formData.get('job_title') as string,
      job_description: formData.get('job_description') as string,
      is_internship: formData.get('is_internship') === 'on', // Checkboxes return "on" when checked
      is_paid: formData.get('is_paid') === 'on', // Same for paid
      employment_type: formData.get('employment_type') as string,
      location: formData.get('location') as string,
      salary_range: formData.get('salary_range') as string,
      county: formData.get('county') as string,
      zip: formData.get('zip') as string,
      publish_date: formData.get('publish_date') ? new Date(formData.get('publish_date') as string) : undefined,
      unpublish_date: formData.get('unpublish_date') ? new Date(formData.get('unpublish_date') as string) : undefined,
      job_post_url: formData.get('job_post_url') as string,
      assessment_url: formData.get('assessment_url') as string,
      skillIds: formData.get('skillIds') ? (formData.get('skillIds') as string).split(',') : []
    }

    // Call your server function to create the job listing
    
    }
   
    return  (
        <form onSubmit={onSubmit}>
          {/* Company ID */}
          <div>
            <label htmlFor="company_id">Company ID</label>
            <input type="text" name="company_id" required />
          </div>
    
          {/* Location ID */}
          <div>
            <label htmlFor="location_id">Location ID</label>
            <input type="text" name="location_id" required />
          </div>
    
          {/* Employer ID */}
          <div>
            <label htmlFor="employer_id">Employer ID</label>
            <input type="text" name="employer_id" required />
          </div>
    
          {/* Job Title */}
          <div>
            <label htmlFor="job_title">Job Title</label>
            <input type="text" name="job_title" required />
          </div>
    
          {/* Job Description */}
          <div>
            <label htmlFor="job_description">Job Description</label>
            <textarea name="job_description" required />
          </div>
    
          {/* Internship */}
          <div>
            <label>
              <input type="checkbox" name="is_internship" />
              Is Internship?
            </label>
          </div>
    
          {/* Paid */}
          <div>
            <label>
              <input type="checkbox" name="is_paid" defaultChecked />
              Is Paid?
            </label>
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
            <label htmlFor="location">Location</label>
            <input type="text" name="location" required />
          </div>
    
          {/* Salary Range */}
          <div>
            <label htmlFor="salary_range">Salary Range</label>
            <input type="text" name="salary_range" required />
          </div>
    
          {/* County */}
          <div>
            <label htmlFor="county">County</label>
            <input type="text" name="county" required />
          </div>
    
          {/* ZIP Code */}
          <div>
            <label htmlFor="zip">ZIP Code</label>
            <input type="text" name="zip" required />
          </div>
    
          {/* Publish Date */}
          <div>
            <label htmlFor="publish_date">Publish Date</label>
            <input type="date" name="publish_date" />
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
    
          {/* Skill IDs */}
          <div>
            <label htmlFor="skillIds">Skill IDs (Comma Separated)</label>
            <input type="text" name="skillIds" />
          </div>
    
          {/* Submit Button */}
          <div>
            <button type="submit">Create Job Listing</button>
          </div>
        </form>
    )
  }