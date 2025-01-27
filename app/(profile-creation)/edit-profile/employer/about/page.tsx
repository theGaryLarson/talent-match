"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { RootState } from "@/lib/employerStore";
import { useSelector, useDispatch } from "react-redux";
import InputTextWithLabel from "@/app/ui/components/InputTextWithLabel";
import SelectOptionsWithLabel from "@/app/ui/components/SelectOptionsWithLabel";
import SelectWithLabel from "@/app/ui/components/mui/SelectWithLabel";
import ProgressBarFlat from "@/app/ui/components/ProgressBarFlat";
import PillButton from "@/app/ui/components/PillButton";
import TextareaWithLabel from "@/app/ui/components/TextareaWithLabel";
import { useSession } from "next-auth/react";
import { useUpdateSession } from "@/app/lib/auth/useUpdateSession";
import { PostEmployerAboutDTO } from "@/data/dtos/EmployerProfileCreationDTOs";
import {
  setAbout,
  initialState,
} from "@/lib/features/profileCreation/employerSlice";
import {
  setPageDirty,
  setPageSaved,
} from "@/lib/features/profileCreation/saveSlice";
import _ from "lodash";
import { devLog } from "@/app/lib/utils";
import { ReadEmployerRecordDTO } from "@/app/lib/employer";

const formNamePrefix = "profile-creation-company-";

export default function CreateEmployerCompanyInfoAboutPage() {
  const aboutStoreData = useSelector(
    (state: RootState) => state.employer.about,
  );
  const [aboutData, setAboutData] = useState<PostEmployerAboutDTO>({
    ...aboutStoreData,
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: session, update, status } = useSession();
  const [employerInfo, setEmployerInfo] = useState<ReadEmployerRecordDTO>();
  const updateSessionProperties = useUpdateSession();

  // get employers.is_verified_employee
  useEffect(() => {
    fetch("/api/employers/account/profile/get")
      .then((res) => {
        return res.json();
      })
      .then((jsonData) => {
        setEmployerInfo(jsonData);
      });
  }, []);

  useEffect(() => {
    const initializeFormFields = async () => {
      console.log("session", session);
      if (!session?.user.id) return;
      if (status === "authenticated") {
        if (_.isEqual(aboutStoreData, initialState.about)) {
          const { id, companyId, employerId } = session.user;

          try {
            const response = await fetch(
              `/api/companies/about/get/${session.user.companyId}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              },
            );

            if (!response.ok) {
              const errorData = await response.json();
            } else {
              let { result } = await response.json();

              console.log("fetchedData", result);
              setAboutData({
                ...aboutData,
                companyId: result.companyId,
                aboutUs: result.aboutUs ?? "",
              });
            }
          } catch (error) {
            // dispatch(submitFormFailure('Failed to submit the form'));
          }
        } else {
          console.log("fetching from redux store");
        }
        dispatch(setPageSaved("about"));
      }
      // if (session && status === 'authenticated') {
      //   updateSession();
      // }
    };
    initializeFormFields();
    devLog(aboutData);
  }, [session?.user?.id]);

  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    dispatch(setPageDirty("about"));
    console.log(name, value);
    const fieldName = name.substring(formNamePrefix.length);
    if (aboutData.hasOwnProperty(fieldName)) {
      aboutData[fieldName as keyof PostEmployerAboutDTO] = value;
      setAboutData({ ...aboutData });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!session || !session.user) {
      console.error("User session is not available.");
      return;
    }
    setAboutData({ ...aboutData });
    devLog("aboutData", aboutData);

    try {
      const response = await fetch("/api/companies/about/update/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aboutData),
      });

      if (response.ok) {
        const result = await response.json();
        dispatch(setPageSaved("about"));
        dispatch(setAbout(aboutData));
        router.push("/edit-profile/employer/mission");
      } else {
        const errorData = await response.json();
        if (!session?.user?.employeeIsApproved) {
          router.push("/edit-profile/employer/mission");
        }
      }
    } catch (error) {}
  };

  return (
    <main className="flex justify-center">
      <aside className="profile-form-aside"></aside>
      <section className="profile-form-section">
        <ProgressBarFlat progress={(3 / 5) * 100} size="sm" />
        <p>Step 3/5</p>
        <h1>Company Info</h1>
        <p className="subtitle">* Indicates a required field</p>

        <h2>About</h2>
        <form onSubmit={handleSubmit}>
          Tell us about your company *
          <div className="profile-form-grid">
            <fieldset>
              <TextareaWithLabel
                id="profile-creation-company-aboutUs"
                placeholder="About your company"
                disabled={!employerInfo?.is_verified_employee}
                rows="16"
                onChange={handleFieldChange}
                required
                value={aboutData.aboutUs}
              >
                {/* Tell us about your company * */}
              </TextareaWithLabel>
            </fieldset>
          </div>
          <div className="profile-form-progress-btn-group">
            <PillButton
              className="custom-outline-btn"
              onClick={() => router.push("/edit-profile/employer/company")}
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
