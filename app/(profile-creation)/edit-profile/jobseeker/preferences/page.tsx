"use client";

import React, { useEffect, useState } from "react";
import ProgressBarFlat from "@/app/ui/components/ProgressBarFlat";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import PillButton from "@/app/ui/components/PillButton";
import { useRouter } from "next/navigation";
import { JsPreferencesDTO } from "@/data/dtos/JobSeekerProfileCreationDTOs";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/jobseekerStore";
import {
  initialState,
  setPreferences,
} from "@/lib/features/profileCreation/jobseekerSlice";
import {
  setPageDirty,
  setPageSaved,
} from "@/lib/features/profileCreation/saveSlice";
import _ from "lodash";
import { devLog } from "@/app/lib/utils";
import { CareerPrepPathways } from "@/app/lib/admin/careerPrep";
export default function CreateJobseekerProfilePreferencesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const preferencesStoreData = useSelector(
    (state: RootState) => state.jobseeker.preferences,
  );
  const preferencesData = { ...preferencesStoreData };
  const [error, setError] = useState<string | null>(null);

  const [employmentType, setEmploymentType] = useState(
    preferencesData.preferredEmploymentType ?? "",
  );
  const [pathway, setPathway] = useState(preferencesData.targetedPathway ?? "");
  const [pathwayId, setPathwayId] = useState(
    preferencesData.targetedPathwayId ?? "",
  );

  useEffect(() => {
    if (session?.user?.id && status === "authenticated") {
      const initializeFormFields = async () => {
        if (_.isEqual(preferencesStoreData, initialState.preferences)) {
          const { id } = session.user;

          try {
            devLog("fetching fresh");
            const response = await fetch(
              "/api/jobseekers/account/preferences/get/" + id,
            );

            if (!response.ok) {
              preferencesData.userId = id!;
            } else {
              let fetchedData: JsPreferencesDTO = (await response.json())
                .result;
              preferencesData.userId = id!;
              if (fetchedData.preferredEmploymentType) {
                preferencesData.preferredEmploymentType =
                  fetchedData.preferredEmploymentType;
                setEmploymentType(preferencesData.preferredEmploymentType);
              }
              if (fetchedData.targetedPathway) {
                preferencesData.targetedPathway = fetchedData.targetedPathway;
                setPathway(preferencesData.targetedPathway);
              }
              if (fetchedData.targetedPathwayId) {
                preferencesData.targetedPathwayId =
                  fetchedData.targetedPathwayId;
                setPathwayId(preferencesData.targetedPathwayId);
              }
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          devLog("fetching from store");
        }
      };
      dispatch(setPageSaved("preferences"));
      initializeFormFields();
    }
  }, [session?.user?.id]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!session?.user?.id) {
      console.error("User session is not available.");
      return;
    }

    preferencesData.userId = session.user.id;
    preferencesData.targetedPathwayId =
      preferencesData.targetedPathway !== pathway ? undefined : pathwayId;
    preferencesData.targetedPathway = pathway;
    preferencesData.preferredEmploymentType = employmentType;

    try {
      const response = await fetch(
        "/api/jobseekers/account/preferences/upsert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(preferencesData),
        },
      );

      if (response.ok) {
        const result = await response.json();
        devLog(JSON.stringify(result, null, 2));

        dispatch(setPageSaved("preferences"));
        dispatch(setPreferences(preferencesData));

        router.push("/edit-profile/jobseeker/showcase");
      } else {
        const errorMessage = `Failed to submit preferences. Status: ${response.status} - ${response.statusText}`;
        setError(errorMessage);
      }
    } catch (e: any) {
      setError(`An unexpected error occurred: ${e.message}`);
    }
  }

  return (
    <main className="flex justify-center">
      <aside className="profile-form-aside"></aside>
      <section className="profile-form-section">
        {/* TODO: Comment/Uncomment test script below for viewing */}
        {/* <h1>Data on Another Page</h1>
        <pre>{JSON.stringify(fields, null, 2)}</pre> */}
        <ProgressBarFlat progress={(2 / 6) * 100} size="sm" />
        <p>Step 2/6</p>
        <h1>Your preferences</h1>

        <p className="subtitle">* Indicates a required field</p>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div>
              <fieldset>
                <legend>What are you looking for?</legend>
                <div className="container">
                  <PillButton
                    sx={{
                      m: 2, // Margin all sides equivalent to 'm-2'
                      backgroundColor:
                        employmentType === "Full-time"
                          ? "#047F9C"
                          : "transparent",
                      color:
                        employmentType === "Full-time" ? "#ffffff" : "#047F9C",
                    }}
                    variant="outlined"
                    onClick={() => {
                      setEmploymentType("Full-time");
                    }}
                  >
                    Full-time job
                  </PillButton>
                  <PillButton
                    sx={{
                      m: 2,
                      backgroundColor:
                        employmentType === "Part-time"
                          ? "#047F9C"
                          : "transparent",
                      color:
                        employmentType === "Part-time" ? "#ffffff" : "#047F9C",
                    }}
                    variant="outlined"
                    onClick={() => {
                      setEmploymentType("Part-time");
                    }}
                  >
                    Part-time job
                  </PillButton>
                  <PillButton
                    sx={{
                      m: 2,
                      backgroundColor:
                        employmentType === "Internship"
                          ? "#047F9C"
                          : "transparent",
                      color:
                        employmentType === "Internship" ? "#ffffff" : "#047F9C",
                    }}
                    variant="outlined"
                    onClick={() => {
                      setEmploymentType("Internship");
                    }}
                  >
                    Internship
                  </PillButton>
                  <PillButton
                    sx={{
                      m: 2,
                      backgroundColor:
                        employmentType === "On-campus"
                          ? "#047F9C"
                          : "transparent",
                      color:
                        employmentType === "On-campus" ? "#ffffff" : "#047F9C",
                    }}
                    variant="outlined"
                    onClick={() => {
                      setEmploymentType("On-campus");
                    }}
                  >
                    On-campus job
                  </PillButton>
                </div>
              </fieldset>
              <FormControl component="fieldset">
                <FormLabel
                  id="profile-creation-preferences-require-role"
                  className="mt-7"
                  component="legend"
                  sx={{ color: "#000000ff" }}
                >
                  What technology path most interests you?
                </FormLabel>
                <RadioGroup
                  aria-labelledby="profile-creation-preferences-require-role"
                  name="profile-creation-preferences-require-role"
                  value={pathway}
                  onChange={(e) => {
                    setPathway(e.target.value);
                  }}
                >
                  <FormControlLabel
                    value={CareerPrepPathways.SOFTWARE_DEVELOPER}
                    control={<Radio />}
                    label={CareerPrepPathways.SOFTWARE_DEVELOPER}
                  />
                  <FormControlLabel
                    value={CareerPrepPathways.IT_CLOUD_SUPPORT}
                    control={<Radio />}
                    label={CareerPrepPathways.IT_CLOUD_SUPPORT}
                  />
                  <FormControlLabel
                    value={CareerPrepPathways.CYBERSECURITY}
                    control={<Radio />}
                    label={CareerPrepPathways.CYBERSECURITY}
                  />
                  <FormControlLabel
                    value={CareerPrepPathways.DATA_ANALYTICS}
                    control={<Radio />}
                    label={CareerPrepPathways.DATA_ANALYTICS}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </fieldset>

          <div className="profile-form-progress-btn-group">
            <PillButton
              variant="outlined"
              onClick={() => {
                router.push("/edit-profile/jobseeker/introduction");
              }}
            >
              Previous
            </PillButton>
            <PillButton type="submit">Save and continue</PillButton>
          </div>
        </form>
      </section>
    </main>
  );
}
