"use client";

import { FormEvent, useEffect, useState } from "react";
import { devLog } from "@/app/lib/utils";
import {
  companies,
  industry_sectors,
  job_postings,
  skills,
  technology_areas,
} from "@prisma/client";
import { SkillDTO } from "@/data/dtos/SkillDTO";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Button } from "@mui/material";
import { ArrowCircleRightOutlined } from "@mui/icons-material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import TagsWithAutocomplete from "../mui/TagsWithAutocomplete";

import { JobPostCreationDTO } from "@/data/dtos/JobListingDTO";
//blank initail form data
//selected onchange update data to new selecteds current data
//onsubmit update list with new values submitted to avoid extra network calls
export default function UpdateJobListingForm() {
  const [joblistings, setJobListings] = useState<
    (job_postings & { skills: skills[] })[]
  >([]);
  const [selectedJob, setSelectedJob] = useState<string>("");
  const { quill, quillRef } = useQuill();
  const [skills, setSkills] = useState<SkillDTO[]>([]);
  const [companies, setCompanies] = useState<companies[]>();
  const [techAreas, setTechAreas] = useState<technology_areas[]>([]);
  const [industrySectors, setIndustrySectors] = useState<industry_sectors[]>(
    [],
  );
  const [formData, setFormData] = useState<JobPostCreationDTO>({
    job_title: "",
    is_internship: false,
    is_paid: true,
    is_apprenticeship: false,
    employment_type: "full-time",
    location: "remote",
    salary_range: "",
    zip: "",
    job_post_url: "",
    assessment_url: "",
    tech_area_id: "",
    sector_id: "",
    company_id: "",
    relocation_services: false,
    visa_sponsership: false,
    job_description: "",
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    // Check if 'checked' exists before using it
    const checked = "checked" in e.target ? e.target.checked : undefined;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submitData: JobPostCreationDTO = {
      ...formData,
      skillIds: skills.map((v) => v.skill_id),
      job_posting_id: selectedJob,
    };
    console.log(submitData);
    try {
      const response = await fetch("/api/joblistings/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });
      if (response.ok) {
        const data = await response.json();
        alert(`Job: ${submitData.job_title} sucsessfully updated `);
      } else {
        console.error("Failed to update job listing");
      }
    } catch (error) {
      console.error("Error updating job listing:", error);
    }
  }
  useEffect(() => {
    const Jl = joblistings.find((j) => j.job_posting_id === selectedJob);
    if (!Jl) return;
    setFormData({
      job_title: Jl.job_title,
      is_internship: Jl.is_internship,
      is_paid: Jl.is_paid,
      is_apprenticeship: Jl.is_apprenticeship,
      employment_type: Jl.employment_type,
      location: Jl.location,
      salary_range: Jl.salary_range,
      zip: Jl.zip,
      unpublish_date: Jl.unpublish_date,
      job_post_url: Jl.job_post_url ?? undefined,
      assessment_url: Jl.assessment_url ?? undefined,
      tech_area_id: Jl.tech_area_id ?? undefined,
      sector_id: Jl.sector_id ?? undefined,
      company_id: Jl.company_id,
      relocation_services: Jl.relocation_services_available,
      visa_sponsership: Jl.offer_visa_sponsorship,
      job_description: Jl.job_description,
    });
    setSkills(Jl.skills);
    if (quill) quill.clipboard.dangerouslyPasteHTML(Jl.job_description);
  }, [selectedJob]);
  useEffect(() => {
    fetch("/api/joblistings/getall")
      .then((r) => {
        return r.json();
      })
      .then((res) => {
        setJobListings(res);
        devLog(joblistings); // just logged this so its complete if conflict remove this line.
      });
  }, []);
  useEffect(() => {
    fetch("/api/joblistings/getall")
      .then((res) => res.json())
      .then(setJobListings);
    fetch("/api/companies/getall")
      .then((res) => res.json())
      .then(setCompanies);
    fetch("/api/joblistings/sectors")
      .then((res) => res.json())
      .then(setIndustrySectors);
    fetch("/api/joblistings/techarea")
      .then((res) => res.json())
      .then(setTechAreas);
  }, []);
  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(formData.job_description);
      quill.on("text-change", () => {
        setFormData((prev) => ({
          ...prev,
          job_description: quill.root.innerHTML,
        }));
      });
    }
  }, [quill]);
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
              {job.job_title} @{" "}
              {
                companies?.find((c) => c.company_id == job.company_id)
                  ?.company_name
              }
            </option>
          ))}
        </select>
      </div>
      {selectedJob && (
        <form onSubmit={onSubmit} className="space-y-3">
          {/* Company (For use on admin page, would need to be added to api and the fetch request) */}
          <div className="grid grid-cols-1">
            <label htmlFor="company">
              What Company Does this listing belong to?
            </label>
            <select
              name="company"
              id="company"
              required
              value={formData.company_id}
              onChange={handleChange}
            >
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
            <input
              type="text"
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Job Description */}
          <div className="grid grid-cols-1">
            <label htmlFor="job_description">Job Description</label>
            <div ref={quillRef} style={{ minHeight: "200px" }} />
          </div>

          {/*tech Sector*/}
          <div className="grid grid-cols-1">
            <label htmlFor="sector">Tech Sector</label>
            <select
              name="sector_id"
              value={formData.sector_id}
              onChange={handleChange}
              required
            >
              <option value={""}>--Please Select a Sector--</option>
              {industrySectors.map((sector) => (
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
            <label htmlFor="area">Tech Area</label>
            <select
              name="tech_area_id"
              value={formData.tech_area_id}
              onChange={handleChange}
              required
            >
              <option value={""}>--Please Select an Area--</option>
              {techAreas.map((area) => (
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
                <input
                  type="radio"
                  name="is_internship"
                  value="yes"
                  required
                  checked={formData.is_internship}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="is_internship"
                  value="no"
                  required
                  checked={!formData.is_internship}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div>
          {/* Apprentaceship */}
          <div>
            <label>Is this an apprenticeship?</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="is_apprenticeship"
                  value="yes"
                  required
                  checked={formData.is_apprenticeship}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="is_apprenticeship"
                  value="no"
                  required
                  checked={!formData.is_apprenticeship}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div>

          {/* Paid */}
          <div>
            <label>Is this a paid position?</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="is_paid"
                  value="yes"
                  required
                  checked={formData.is_paid}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="is_paid"
                  value="no"
                  required
                  checked={!formData.is_paid}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div>
          <div>
            <label>Does This Position Offer Relocation Services?</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="relocation"
                  value="yes"
                  required
                  checked={formData.relocation_services}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="relocation"
                  value="no"
                  required
                  checked={!formData.relocation_services}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div>
          <div>
            <label>Is Position willing to sponsor H1B visas</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="visas"
                  value="yes"
                  required
                  checked={formData.visa_sponsership}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="visas"
                  value="no"
                  required
                  checked={!formData.visa_sponsership}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div>

          {/* Employment Type */}
          <div>
            <label htmlFor="employment_type">Employment Type</label>
            <select
              name="employment_type"
              defaultValue={formData.employment_type}
              onChange={handleChange}
            >
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
                <input
                  type="radio"
                  name="location"
                  value="remote"
                  required
                  checked={formData.location == "remote"}
                  onChange={handleChange}
                />
                Remote
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="location"
                  value="on-site"
                  checked={formData.location == "on-site"}
                  onChange={handleChange}
                />
                On-Site
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="location"
                  value="hybrid"
                  checked={formData.location == "hybrid"}
                  onChange={handleChange}
                />
                Hybrid
              </label>
            </div>
          </div>

          {/* Salary Range */}
          <div className="grid grid-cols-1">
            <label htmlFor="salary_range">Salary Range</label>
            <input
              type="text"
              name="salary_range"
              required
              value={formData.salary_range}
              onChange={handleChange}
            />
          </div>

          {/* County */}

          {/* ZIP Code */}
          <div className="grid grid-cols-1">
            <label htmlFor="zip">ZIP Code</label>
            <input
              type="text"
              name="zip"
              required
              value={formData.zip}
              onChange={handleChange}
            />
          </div>
          {/* Unpublish Date */}
          <div className="grid grid-cols-1">
            <label htmlFor="unpublish_date">Application Deadline</label>
            <input
              type="date"
              name="unpublish_date"
              min={new Date().toISOString().split("T")[0]}
              //value={formData.unpublish_date}
            />
          </div>

          {/* Job Post URL */}
          <div className="grid grid-cols-1">
            <label htmlFor="job_post_url">Job Post URL</label>
            <input
              type="text"
              name="job_post_url"
              value={formData.job_post_url}
              onChange={handleChange}
            />
          </div>

          {/* Assessment URL */}
          <div>
            <label htmlFor="assessment_url">Assessment URL</label>
            <input
              type="text"
              name="assessment_url"
              value={formData.assessment_url}
              onChange={handleChange}
            />
          </div>

          {/* Skills */}
          <div>
            <label htmlFor="job-listing-skills">
              What skills are needed for this role?
            </label>
            <TagsWithAutocomplete
              apiSearchRoute="/api/skills/search/"
              fieldLabel="Select the top 5 skills"
              id={"skills" + selectedJob}
              maxTags={5}
              addNewTags={skills}
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
              Update Job Listing
            </Button>
          </div>
        </form>
      )}
    </main>
  );
}
