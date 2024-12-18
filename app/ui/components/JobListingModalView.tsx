import React from 'react';
import { Button, Modal } from 'flowbite-react';
import Avatar from './Avatar';
import Skills from './Skills';
import { SkillDTO } from '@/data/dtos/SkillDTO';
import { JobListingCardViewDTO } from '@/data/dtos/JobListingCardViewDTO';

export default function JobListingModalView({
  openModal,
  handleModalChange,
  joblisting,
}: {
  openModal: boolean;
  handleModalChange: (open: boolean) => void;
  joblisting: JobListingCardViewDTO;
}) {
  const job_title: string = joblisting?.job_title;
  const employment_type: string = joblisting?.employment_type ?? '';
  const company_name: string = joblisting?.companies.company_name;
  const company_image: string = joblisting?.companies.company_logo_url;
  const industry: string = joblisting?.industry_sectors.sector_title;
  const skills: SkillDTO[] = joblisting?.skills ?? [];
  const is_paid: boolean = joblisting?.is_paid ?? true;
  const salary_range: string = joblisting?.salary_range ?? '';
  const description: string = joblisting?.job_description ?? '';
  const id: string = joblisting?.job_posting_id ?? '';
  const location: string =
    joblisting?.location + ', ' + joblisting?.county + ', ' + joblisting?.zip;

  return (
    <Modal
      show={openModal}
      size="6xl"
      onClose={() => handleModalChange(false)}
      dismissible
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-4">
          {/* Job Title & Company */}
          <div className="flex items-center space-x-4">
            {company_image && (
              <Avatar imgsrc={company_image ?? undefined} scale={1} />
            )}
            <div>
              <h4 className="text-lg font-semibold">{job_title}</h4>
              <p>{company_name}</p>
              <p className="text-wrap text-sm text-slate-400 sm-tablet:text-bas">{location}</p>
            </div>
          </div>

          {/* Job Details */}
          <div className="md:grid-cols-2 grid grid-cols-1 gap-4">
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-200">
                Employment Type:
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {employment_type}
              </p>
            </div>
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-200">
                Salary:
              </p>
              <p className="text-gray-500 dark:text-gray-400">{salary_range}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-200">
                Industry:
              </p>
              <p className="text-gray-500 dark:text-gray-400">{industry}</p>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-200">
              Description:
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div>
              <p className="font-medium text-gray-700 dark:text-gray-200">
                Skills:
              </p>
              <div className="mt-2 flex grow text-sm tablet:text-base">
                <Skills skillsList={skills} maxNumSkills={5} jobseekerID={undefined} />
              </div>
            </div>
          )}

          {/* Company Information */}
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-200">
              About {company_name}:
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {joblisting?.companies.about_us}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-200">
              Our Mission:
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {joblisting?.companies.company_mission}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-200">
              Our Vision:
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              {joblisting?.companies.company_vision}
            </p>
          </div>


        </div>
      </Modal.Body>
      <Modal.Footer>{/* Application Links */}
        {joblisting?.job_post_url && (
          <Button
            href={joblisting?.job_post_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            Apply on Company Website
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
