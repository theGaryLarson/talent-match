"use client";

import { Button } from "@mui/material";
import { JobRole, JobRoleSkill } from "@prisma/client";
import { useState } from "react";
interface EmployerFeedbackFormProps {
  jobroles: (JobRole & {
    skills: (JobRoleSkill & {
      skill: {
        skill_name: string;
      };
    })[];
  })[];
}
export default function EmployerFeedbackForm({
  jobroles,
}: EmployerFeedbackFormProps) {
  //fetch all ict roles
  // select a role
  //check if employer has already submitted for job role (potenally allow them to update it)
  //once job is selected load the skills assocoiteted with that job
  //give each skill a rating of importance of 1-5
  //collect number of potentail hires in the next 3 years

  const [selectedJobRole, setSelectedJobRole] = useState<
    | (JobRole & {
        skills: (JobRoleSkill & {
          skill: {
            skill_name: string;
          };
        })[];
      })
    | null
  >(null);
  const [skillRatings, setSkillRatings] = useState<{
    [skillId: string]: number;
  }>({});
  const [projectedHires, setProjectedHires] = useState<number>(0);

  // Handle job role selection
  const handleJobRoleChange = (roleId: string) => {
    const selectedRole = jobroles.find((role) => role.id === roleId) || null;
    setSelectedJobRole(selectedRole);
    setSkillRatings({});
  };

  // Handle skill rating change
  const handleSkillRatingChange = (skillId: string, rating: number) => {
    setSkillRatings((prev) => ({
      ...prev,
      [skillId]: rating,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      jobRoleId: selectedJobRole?.id,
      skillRatings,
      projectedHires,
    };
    console.log("Submitting feedback:", payload);
    try {
      const response = await fetch("/api/employer-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Handle non-2xx responses
        const errorData = await response.json();
        console.error("Error:", errorData.message);
        alert("Failed to submit feedback. Please try again.");
      } else {
        const data = await response.json();
        console.log("Success:", data.message);
        alert("Feedback submitted successfully!");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("An error occurred while submitting feedback. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-7">
      {/* Job Role Selection */}
      <div>
        <label className="block font-medium text-gray-700">
          Select Job Role:
        </label>
        <select
          className="w-full mt-2 p-2 border rounded-md"
          value={selectedJobRole?.id || ""}
          onChange={(e) => handleJobRoleChange(e.target.value)}
        >
          <option value="" disabled>
            Select a Job Role
          </option>
          {jobroles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.title}
            </option>
          ))}
        </select>
      </div>

      {/* Skill Ratings */}
      {selectedJobRole && (
        <div>
          <h3 className="font-semibold text-gray-800">
            Rate the importance of each skill (1-5):
          </h3>
          {selectedJobRole.skills.map((skill) => (
            <div key={skill.skillId} className="grid grid-cols-2  my-2">
              <label>{skill.skill.skill_name}</label>
              <select
                className="p-2 border rounded-md"
                value={skillRatings[skill.skillId] || ""}
                onChange={(e) =>
                  handleSkillRatingChange(
                    skill.skillId,
                    parseInt(e.target.value),
                  )
                }
              >
                <option value="" disabled>
                  Select a rating
                </option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      {/* Projected Hires */}
      {selectedJobRole && (
        <div>
          <label className="block font-medium text-gray-700">
            Projected Hires in the Next 3 Years:
          </label>
          <input
            type="number"
            min="0"
            className="w-full mt-2 p-2 border rounded-md"
            value={projectedHires || ""}
            onChange={(e) => setProjectedHires(parseInt(e.target.value) || 0)}
          />
        </div>
      )}

      {/* Submit Button */}
      <Button type="submit" disabled={!selectedJobRole}>
        Submit Feedback
      </Button>
    </form>
  );
}
