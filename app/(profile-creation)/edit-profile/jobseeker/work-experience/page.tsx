"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import ProgressBarFlat from "@/app/ui/components/ProgressBarFlat";
import { Radio, RadioGroup } from "@mui/material";
import PillButton from "@/app/ui/components/PillButton";
import InputTextWithLabel from "../../../../ui/components/InputTextWithLabel";
import WorkExperiences, {
  defaultWorkExperienceData,
  WorkExperienceData,
} from "./form-field-groups/WorkExperiences";
import InternshipExperiences, {
  defaultInternshipExperienceData,
  InternshipExperienceData,
} from "./form-field-groups/InternshipExperiences";
import {
  JsWorkDTO,
  JsWorkExpDTO,
} from "@/data/dtos/JobSeekerProfileCreationDTOs";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/jobseekerStore";
import {
  initialState,
  setWorkExperience,
} from "@/lib/features/profileCreation/jobseekerSlice";
import {
  setPageDirty,
  setPageSaved,
} from "@/lib/features/profileCreation/saveSlice";
import dayjs, { Dayjs } from "dayjs";
import _ from "lodash";
import { devLog } from "@/app/lib/utils";
import { Add } from "@mui/icons-material";

interface Data {
  yearsWorkExperience: string;
  monthsInternshipExperience: string | number;
  workExperiences: WorkExperienceData[];
  internshipExperiences: WorkExperienceData[];
  isAuthorizedToWorkUsa?: boolean | null;
  requiresSponsorship?: boolean | null;
}

export default function CreateJobseekerProfileWorkExperiencePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const originalWorkExperienceStoreData = useSelector(
    (state: RootState) => state.jobseeker.workExperience,
  );
  const workExperienceStoreData = useMemo(
    (): JsWorkExpDTO => ({
      ...originalWorkExperienceStoreData,
      workExperiences: originalWorkExperienceStoreData.workExperiences?.map(
        (workExperience) => ({
          ...workExperience,
          startDate: new Date(workExperience.startDate),
          endDate: workExperience.endDate
            ? new Date(workExperience.endDate)
            : null,
        }),
      ),
    }),
    [originalWorkExperienceStoreData],
  );
  let workExperienceData: JsWorkExpDTO = { ...workExperienceStoreData };
  const [error, setError] = useState<string | null>(null);

  const [hasUnmetRequired, setHasUnmetRequired] = useState("");

  const [data, setData] = useState<Data>({
    yearsWorkExperience: workExperienceData.yearsWorkExperience,
    monthsInternshipExperience:
      workExperienceData.monthsInternshipExperience ?? "",
    workExperiences:
      workExperienceData.workExperiences
        ?.filter((exp) => !exp.isInternship)
        .map(
          (exp): WorkExperienceData => ({
            workId: exp.workId,
            company: exp.company,
            sectorObject: {
              industry_sector_id: exp.sectorId ?? "",
              sector_title: "",
            },
            techAreaObject: { id: exp.techAreaId ?? "", title: "" },
            jobTitle: exp.jobTitle,
            startDate: !Boolean(exp.startDate) ? null : dayjs(exp.startDate),
            endDate: !Boolean(exp.endDate) ? null : dayjs(exp.endDate),
            isCurrentJob: exp.isCurrentJob,
            responsibilities: exp.responsibilities,
          }),
        ) ?? [],
    internshipExperiences:
      workExperienceData.workExperiences
        ?.filter((exp) => exp.isInternship)
        .map(
          (exp): WorkExperienceData => ({
            workId: exp.workId,
            company: exp.company,
            sectorObject: {
              industry_sector_id: exp.sectorId ?? "",
              sector_title: "",
            },
            techAreaObject: { id: exp.techAreaId ?? "", title: "" },
            jobTitle: exp.jobTitle,
            startDate: !Boolean(exp.startDate) ? null : dayjs(exp.startDate),
            endDate: !Boolean(exp.endDate) ? null : dayjs(exp.endDate),
            isCurrentJob: exp.isCurrentJob,
            responsibilities: exp.responsibilities,
          }),
        ) ?? [],
    isAuthorizedToWorkUsa: workExperienceData.isAuthorizedToWorkUsa,
    requiresSponsorship: workExperienceData.requiresSponsorship,
  });

  function addNewWorkExperience() {
    const newWorkExperienceData = defaultWorkExperienceData();
    setData({
      ...data,
      workExperiences: [...data.workExperiences, newWorkExperienceData],
    });
    dispatch(setPageDirty("work-experience"));
  }

  function removeWorkExperience(byUid: string) {
    setData({
      ...data,
      workExperiences: data.workExperiences.filter(
        ({ workId: uid }) => uid !== byUid,
      ),
    });
    dispatch(setPageDirty("work-experience"));
  }

  function addNewInternshipExperience() {
    const newInternshipExperienceData = defaultWorkExperienceData();
    setData({
      ...data,
      internshipExperiences: [
        ...data.internshipExperiences,
        newInternshipExperienceData,
      ],
    });
    dispatch(setPageDirty("work-experience"));
  }

  function removeInternshipExperience(byUid: string) {
    setData({
      ...data,
      internshipExperiences: data.internshipExperiences.filter(
        ({ workId: uid }) => uid !== byUid,
      ),
    });
    dispatch(setPageDirty("work-experience"));
  }

  const handleUpdate = useCallback(
    (key: string, value: any) => {
      setData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
      dispatch(setPageDirty("work-experience"));
    },
    [dispatch],
  );

  const handleInputUpdate = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type } = event.target;
      setData((prevData) => ({
        ...prevData,
        [name]: type === "radio" ? value === "yes" : value, // setting boolean values for radio type
      }));
      dispatch(setPageDirty("work-experience"));
    },
    [dispatch],
  );

  useEffect(() => {
    if (session?.user?.id && status === "authenticated") {
      const initializeFormFields = async () => {
        if (_.isEqual(workExperienceStoreData, initialState.workExperience)) {
          const { id } = session.user;

          try {
            devLog("fetching fresh");
            const response = await fetch(
              "/api/jobseekers/account/work-info/get/" + id,
            );

            if (!response.ok) {
              workExperienceData.userId = id!;
            } else {
              let fetchedData: JsWorkExpDTO = (await response.json()).result;
              workExperienceData = {
                ...fetchedData,
              };
            }

            setData({
              yearsWorkExperience: workExperienceData.yearsWorkExperience,
              monthsInternshipExperience:
                workExperienceData.monthsInternshipExperience ?? "",
              workExperiences:
                workExperienceData.workExperiences
                  ?.filter((exp) => !exp.isInternship)
                  .map(
                    (exp): WorkExperienceData => ({
                      workId: exp.workId,
                      company: exp.company,
                      sectorObject: {
                        industry_sector_id: exp.sectorId ?? "",
                        sector_title: "",
                      },
                      techAreaObject: { id: exp.techAreaId ?? "", title: "" },
                      jobTitle: exp.jobTitle,
                      startDate: dayjs(exp.startDate),
                      endDate: exp.endDate ? dayjs(exp.endDate) : null,
                      isCurrentJob: exp.isCurrentJob,
                      responsibilities: exp.responsibilities,
                    }),
                  ) ?? [],
              internshipExperiences:
                workExperienceData.workExperiences
                  ?.filter((exp) => exp.isInternship)
                  .map(
                    (exp): WorkExperienceData => ({
                      workId: exp.workId,
                      company: exp.company,
                      sectorObject: {
                        industry_sector_id: exp.sectorId ?? "",
                        sector_title: "",
                      },
                      techAreaObject: { id: exp.techAreaId ?? "", title: "" },
                      jobTitle: exp.jobTitle,
                      startDate: dayjs(exp.startDate),
                      endDate: exp.endDate ? dayjs(exp.endDate) : null,
                      isCurrentJob: exp.isCurrentJob,
                      responsibilities: exp.responsibilities,
                    }),
                  ) ?? [],
              isAuthorizedToWorkUsa: workExperienceData.isAuthorizedToWorkUsa,
              requiresSponsorship: workExperienceData.requiresSponsorship,
            });
          } catch (error) {
            console.error(error);
          }
        } else {
          devLog("fetching from store");
        }
      };
      initializeFormFields();
      dispatch(setPageSaved("work-experience"));
    }
  }, [session?.user?.id]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!session?.user?.id) {
      console.error("User session is not available.");
      return;
    }

    const userId = session.user.id!;
    const jobseekerId = session.user.jobseekerId!;
    const workExperiences = data.workExperiences?.map((workExp) => ({
      workId: workExp.workId, //fixme: generate uuid on the backend or is this fine?
      jobseekerId: jobseekerId,
      techAreaId: workExp.techAreaObject.id,
      sectorId: workExp.sectorObject.industry_sector_id,
      company: workExp.company,
      isInternship: false,
      jobTitle: workExp.jobTitle,
      isCurrentJob: workExp.isCurrentJob,
      startDate: workExp.startDate ? workExp.startDate.toDate() : null,
      endDate: workExp.endDate ? workExp.endDate.toDate() : null,
      responsibilities: workExp.responsibilities,
    }));

    // Validate the work experience entries
    if (
      !workExperiences.every((workExperience) => {
        if (!Boolean(workExperience.startDate)) {
          setHasUnmetRequired(`${workExperience.workId}-startDate`);
          return false;
        }
        if (
          !Boolean(workExperience.endDate) &&
          !Boolean(workExperience.isCurrentJob)
        ) {
          setHasUnmetRequired(`${workExperience.workId}-endDate`);
          return false;
        }
        return true;
      })
    ) {
      return;
    }

    const internshipExperiences = data.internshipExperiences?.map(
      (internshipExp) => ({
        workId: internshipExp.workId,
        jobseekerId: jobseekerId,
        techAreaId: internshipExp.techAreaObject.id,
        sectorId: internshipExp.sectorObject.industry_sector_id,
        company: internshipExp.company,
        isInternship: true,
        jobTitle: internshipExp.jobTitle,
        isCurrentJob: internshipExp.isCurrentJob,
        startDate: internshipExp.startDate
          ? internshipExp.startDate.toDate()
          : null,
        endDate: internshipExp.endDate ? internshipExp.endDate.toDate() : null,
        responsibilities: internshipExp.responsibilities,
      }),
    );

    // Validate the internship experience entries
    if (
      !internshipExperiences.every((internshipExperience) => {
        if (!Boolean(internshipExperience.startDate)) {
          setHasUnmetRequired(`${internshipExperience.workId}-startDate`);
          return false;
        }
        if (!Boolean(internshipExperience.endDate)) {
          setHasUnmetRequired(`${internshipExperience.workId}-endDate`);
          return false;
        }
        return true;
      })
    ) {
      return;
    }

    workExperienceData.userId = userId;
    workExperienceData.yearsWorkExperience =
      data.yearsWorkExperience.toString(); // Replace with actual calculation
    workExperienceData.monthsInternshipExperience =
      data.monthsInternshipExperience.toString(); // Replace with actual calculation
    workExperienceData.isAuthorizedToWorkUsa = data.isAuthorizedToWorkUsa;
    workExperienceData.requiresSponsorship = data.requiresSponsorship;
    workExperienceData.workExperiences = [
      ...workExperiences,
      ...internshipExperiences,
    ].map((experience) => ({
      ...experience,
      startDate: experience.startDate ?? new Date(),
    }));

    try {
      const response = await fetch("/api/jobseekers/account/work-info/upsert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workExperienceData),
      });

      if (response.ok) {
        dispatch(setPageSaved("work-experience"));
        dispatch(
          setWorkExperience({
            ...workExperienceData,
            workExperiences: workExperienceData.workExperiences?.map(
              (workExperience) => ({
                ...workExperience,
                startDate: workExperience.startDate.toISOString(),
                endDate: workExperience.endDate?.toISOString() ?? null,
              }),
            ),
          }),
        );
      } else {
        const errorMessage = `Failed to submit work experiences. Status: ${response.status} - ${response.statusText}`;
        setError(errorMessage);
      }

      const result = await response.json();
      router.push("/edit-profile/jobseeker/disclosures");
    } catch (e: any) {
      setError(`An unexpected error occurred: ${e.message}`);
    }
  }

  return (
    <main className="flex justify-center">
      <aside className="profile-form-aside"></aside>
      <section className="profile-form-section">
        <ProgressBarFlat progress={(5 / 6) * 100} size="sm" />
        <p>Step 5/6</p>
        <h1>Work experience</h1>
        <p className="subtitle">* Indicates a required field</p>
        <form onSubmit={handleSubmit}>
          <fieldset className="work-experience-groups">
            <legend>
              <h2>Work experience</h2>
            </legend>
            <div className="profile-form-grid">
              <InputTextWithLabel
                type="number"
                id="profile-creation-experience-work-fulltime-years"
                name="yearsWorkExperience"
                value={data.yearsWorkExperience + ""}
                onChange={handleInputUpdate}
              >
                How many years of full-time work experience do you have (not
                including internship)?
              </InputTextWithLabel>
            </div>
            <WorkExperiences
              data={data.workExperiences}
              hasUnmetRequired={hasUnmetRequired}
              onUpdate={handleUpdate}
              onRemove={removeWorkExperience}
            />
            <PillButton variant="outlined" onClick={addNewWorkExperience}>
              <Add className="mr-2 h-5 w-5" />
              Add work experience
            </PillButton>
          </fieldset>
          <fieldset className="internship-experience-groups">
            <legend>
              <h2>Internship experience</h2>
            </legend>
            <div className="profile-form-grid">
              <InputTextWithLabel
                type="number"
                id="profile-creation-experience-internship-months"
                name="monthsInternshipExperience"
                onChange={handleInputUpdate}
                value={data.monthsInternshipExperience + ""}
              >
                How many months of internship work experience do you have?
              </InputTextWithLabel>
            </div>
            <InternshipExperiences
              data={data.internshipExperiences as InternshipExperienceData[]}
              hasUnmetRequired={hasUnmetRequired}
              onUpdate={handleUpdate}
              onRemove={removeInternshipExperience}
            />
            <PillButton variant="outlined" onClick={addNewInternshipExperience}>
              <Add className="mr-2 h-5 w-5" />
              Add internship experience
            </PillButton>
          </fieldset>
          <fieldset>
            <legend>
              <h2>Authorization</h2>
            </legend>
            <p>
              Note: All work authorization information you provide will only be
              used for the purpose of verifying your qualifications for this job
              application and will not be disclosed to public view or any third
              parties without your express consent.
            </p>
            <div>
              <div className="mt-3">
                Are you authorized to work in the United States? *
              </div>
              <RadioGroup>
                <div className="block">
                  <Radio
                    name="isAuthorizedToWorkUsa"
                    value="yes"
                    onChange={handleInputUpdate}
                    checked={
                      typeof data.isAuthorizedToWorkUsa === "boolean"
                        ? data.isAuthorizedToWorkUsa
                        : false
                    }
                    required
                  />{" "}
                  Yes
                </div>
                <div className="block">
                  <Radio
                    name="isAuthorizedToWorkUsa"
                    value="no"
                    onChange={handleInputUpdate}
                    checked={
                      typeof data.isAuthorizedToWorkUsa === "boolean"
                        ? !data.isAuthorizedToWorkUsa
                        : false
                    }
                    required
                  />{" "}
                  No
                </div>
              </RadioGroup>
            </div>
            <div>
              <h3 className="alert-title">United States of America</h3>
              <p>
                Will you, now or in the future, require sponsorship for
                employment visa status? *
              </p>
              <RadioGroup>
                <div className="block">
                  <Radio
                    name="requiresSponsorship"
                    value="yes"
                    onChange={handleInputUpdate}
                    checked={
                      typeof data.requiresSponsorship === "boolean"
                        ? data.requiresSponsorship
                        : false
                    }
                    required
                  />{" "}
                  Yes
                </div>
                <div className="block">
                  <Radio
                    name="requiresSponsorship"
                    value="no"
                    onChange={handleInputUpdate}
                    checked={
                      typeof data.requiresSponsorship === "boolean"
                        ? !data.requiresSponsorship
                        : false
                    }
                    required
                  />{" "}
                  No
                </div>
              </RadioGroup>
            </div>
          </fieldset>
          <div className="profile-form-progress-btn-group">
            <PillButton
              variant="outlined"
              onClick={() => {
                router.push("/edit-profile/jobseeker/education");
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
