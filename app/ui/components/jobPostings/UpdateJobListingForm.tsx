"use client";

import { useEffect, useState } from "react";
import { devLog } from "@/app/lib/utils";
import { companies, industry_sectors, job_postings, technology_areas } from "@prisma/client";
import { SkillDTO } from "@/data/dtos/SkillDTO";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Button } from "@mui/material";
import { ArrowCircleRightOutlined } from "@mui/icons-material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import TagsWithAutocomplete from "../mui/TagsWithAutocomplete";
export default function UpdateJobListingForm() {
  const [joblistings, setJobListings] = useState<job_postings[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>('');
    const { quill, quillRef } = useQuill();
    const [skills, setSkills] = useState<SkillDTO[]>();
    const [companies, setCompanies] = useState<companies[]>();
    const [techAres, setTechAreas] = useState<technology_areas[]>();
    const [industrySectors, setIndustrySectors] = useState<industry_sectors[]>();
    const [jobDescription, setJobDescription] = useState("");
    const onSubmit = ()=>{}
  useEffect(() => {
    fetch("/api/joblistings/getall")
      .then((r) => {
        return r.json();
      })
      .then((res) => {
        setJobListings(res);
        devLog(joblistings); // just logged this so its complete if conflict remove this line.
      });
  });
  useEffect(() => {
    fetch("/api/companies/getall")
      .then((res) => {
        return res.json();
      })
      .then((jsonData) => {
        setCompanies(jsonData);
      });

    fetch("/api/joblistings/sectors")
      .then((res) => {
        return res.json();
      })
      .then((jsonData) => {
        setIndustrySectors(jsonData);
      });

    fetch("/api/joblistings/techarea")
      .then((res) => {
        return res.json();
      })
      .then((jsonData) => {
        setTechAreas(jsonData);
      });
  }, []);
  return (
  <main>
    <div className="grid grid-cols-1">
        <label htmlFor="company">Select Job Listing</label>
        <select
          name="job"
          id="job"
          required
          onChange={(e) => setSelectedJob(e.target.value)}
        >
          <option value={""}>--Please Select a Joblisting--</option>
          {joblistings.map((job) => (
            <option key={job.job_posting_id} value={job.job_posting_id}>
              {job.job_title} @ {job.company_id}
            </option>
          ))}
        </select>
      </div>
  {
    selectedJob && (
      <form onSubmit={onSubmit} className="space-y-3">
      {/* Company (For use on admin page, would need to be added to api and the fetch request) */}
      <div className="grid grid-cols-1">
        <label htmlFor="company">
          What Company Does this listing belong to?
        </label>
        <select name="company" id="company" required>
          <option value={""}>--Please Select a Company--</option>
          {companies?.map((comp) => (
            <option key={comp.company_id} value={comp.company_id}>
              {comp.company_name}
            </option>
          ))}
        </select>
      </div>

      {/* Job Title */}
      <div className="grid grid-cols-1">
        <label htmlFor="job_title">Job Title</label>
        <input type="text" name="job_title" required />
      </div>

      {/* Job Description */}
      <div className="grid grid-cols-1">
        <label htmlFor="job_description">Job Description</label>
        <div ref={quillRef} style={{ minHeight: "200px" }} />
      </div>

      {/*tech Sector*/}
      <div className="grid grid-cols-1">
        <label htmlFor="sector">
          What Tech Sector does this job fall under?
        </label>
        <select name="sector" id="sector" required>
          <option value={""}>--Please Select a Sector--</option>
          {industrySectors?.map((sector) => (
            <option
              key={sector.industry_sector_id}
              value={sector.industry_sector_id}
            >
              {sector.sector_title}
            </option>
          ))}
        </select>
      </div>
      {/*Tech Area*/}
      <div className="grid grid-cols-1">
        <label htmlFor="area">What Tech Area Best Describes This Job?</label>
        <select name="area" id="area" required>
          <option value={""}>--Please Select an Area--</option>
          {techAres?.map((area) => (
            <option key={area.id} value={area.id}>
              {area.title}
            </option>
          ))}
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
      {/* Apprentaceship */}
      <div>
        <label>Is this an apprenticeship?</label>
        <div>
          <label>
            <input type="radio" name="is_apprenticeship" value="yes" required />
            Yes
          </label>
          <label>
            <input type="radio" name="is_apprenticeship" value="no" required />
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
      <div>
        <label>Does This Position Offer Relocation Services?</label>
        <div>
          <label>
            <input type="radio" name="relocation" value="yes" required />
            Yes
          </label>
          <label>
            <input type="radio" name="relocation" value="no" required />
            No
          </label>
        </div>
      </div>
      <div>
        <label>Is Position willing to sponsor H1B visas</label>
        <div>
          <label>
            <input type="radio" name="visas" value="yes" required />
            Yes
          </label>
          <label>
            <input type="radio" name="visas" value="no" required />
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
        <label htmlFor="zip">ZIP Code</label>
        <input type="text" name="zip" required />
      </div>
      {/* Unpublish Date */}
      <div className="grid grid-cols-1">
        <label htmlFor="unpublish_date">Application Deadline</label>
        <input
          type="date"
          name="unpublish_date"
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      {/* Job Post URL */}
      <div className="grid grid-cols-1">
        <label htmlFor="job_post_url">Job Post URL</label>
        <input type="text" name="job_post_url" />
      </div>

      {/* Assessment URL */}
      <div>
        <label htmlFor="assessment_url">Assessment URL</label>
        <input type="text" name="assessment_url" />
      </div>

      {/* Skills */}
      <div>
        <label htmlFor="job-listing-skills">
          What skills are needed for this role?
        </label>
        <TagsWithAutocomplete
          apiSearchRoute="/api/skills/search/"
          fieldLabel="Select the top 5 skills"
          id="job-listing-skills"
          maxTags={5}
          searchingText="Searching..."
          noResultsText="No skills found..."
          onChange={function (ev, val) {
            if (val.every((skill) => typeof skill !== "string")) {
              setSkills(val as SkillDTO[]);
            }
          }}
          searchPlaceholder="Skill (ex: Java)"
          getTagLabel={(option: SkillDTO) => option.skill_name}
          getTagLink={(option: SkillDTO) => option.skill_info_url}
        />
        <p>Select your top 5 skills from your skills list</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          type="reset"
          variant="outlined"
          startIcon={<HighlightOffOutlinedIcon />}
        >
          Reset Form
        </Button>
        <Button
          type="submit"
          endIcon={<ArrowCircleRightOutlined />}
          variant="contained"
        >
          Create Job Listing
        </Button>
      </div>
    </form>
    )
  }
  </main>);
}
