"use client";

import Link from "next/link";
import SignupPrompt from "@/app/ui/components/SignupPrompt";
import Image from "next/image";
import Footer from "@/app/ui/Footer";
import SignupHeader from "@/app/ui/SignupHeader";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useUpdateSession } from "@/app/lib/auth/useUpdateSession";
import { useSession } from "next-auth/react";
import { Role } from "@/data/dtos/UserInfoDTO";
import PillButton from "@/app/ui/components/PillButton";

const vectorImgSrc = "/images/signup/jobseeker-vector.png";

export default function JobseekerSignupFinishPage() {
  const [resident, setResident] = useState(false);
  const [termsAgree, setTermsAgree] = useState(false);
  const [checkboxState, setCheckboxState] = useState({
    jobNotifications: false,
    opportunities: false,
  });
  const { data: session } = useSession();
  const updateSessionProperties = useUpdateSession();
  const router = useRouter();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setCheckboxState((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  return (
    <>
      <SignupHeader />

      <main className="mx-auto max-w-screen-sm-tablet overflow-hidden laptop:mx-0 laptop:flex laptop:max-w-full laptop:flex-row laptop:gap-8">
        <SignupPrompt vectorImgSrc={vectorImgSrc} />
        <section className="mx-auto w-full px-8 laptop:pt-24">
          <form className="mx-auto flex flex-col gap-6 laptop:max-w-screen-sm-tablet">
            <fieldset className="flex flex-col gap-3">
              <div className="inline">
                <p className="inline">Are you a Washington State resident? </p>
                <p className="inline text-gray-400">(required)</p>
              </div>
              <label>
                <input
                  type="radio"
                  name="resident"
                  value="yes"
                  onClick={() => setResident(true)}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="resident"
                  value="no"
                  onClick={() => setResident(false)}
                />{" "}
                No
              </label>
            </fieldset>
            <fieldset
              className="flex flex-col gap-3 disabled:text-gray-400"
              disabled={!resident}
            >
              <p>Notifications</p>
              <div>
                <input
                  type="checkbox"
                  id="jobNotifications"
                  checked={checkboxState.jobNotifications}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="jobNotifications">
                  {" "}
                  Receive new job posting notifications
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="opportunities"
                  checked={checkboxState.opportunities}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="opportunities">
                  {" "}
                  Hear more about career opportunities
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAgree}
                  onChange={() => setTermsAgree(!termsAgree)}
                />
                <label htmlFor="terms">
                  {" "}
                  By signing up you agree to our{" "}
                  <Link
                    target="_blank"
                    className="underline"
                    href="/policies/terms-of-service"
                  >
                    terms of use
                  </Link>
                  {/*, and acknowledge you have read the{' '}
                  <Link
                    className="REPLACE-BEFORE-RELEASE"
                    href="/underconstruction"
                  >
                    privacy notice
                  </Link>
                  and{' '}
                  <Link
                    className="REPLACE-BEFORE-RELEASE"
                    href="/underconstruction"
                  >
                    data sharing agreement
                  </Link>*/}
                  .
                </label>
              </div>
            </fieldset>
            <PillButton
              type="submit"
              onClick={async (e: FormEvent) => {
                e.preventDefault();
                const response = await fetch("/api/jobseekers/create", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                if (response.ok) {
                  const data = await response.json();
                  let rolesArray = session?.user.roles || [];
                  rolesArray = rolesArray.filter(
                    (role: Role) => role !== Role.GUEST,
                  );
                  // Add the new role if it's not already in the roles array
                  if (!rolesArray.includes(Role.JOBSEEKER)) {
                    rolesArray.push(Role.JOBSEEKER);
                  }
                  await updateSessionProperties({
                    jobseekerId: data.jobseekerData.jobseeker_id,
                    roles: rolesArray,
                  });
                  router.push("/edit-profile/jobseeker/introduction");
                }
              }}
              sx={{
                marginX: "auto",
                marginY: 4,
                "&:focus": {
                  boxShadow: "none",
                },
                "&:disabled": {
                  color: "#fff",
                  bgcolor: "primary.main",
                  opacity: 0.5,
                },
              }}
              disabled={!(resident && termsAgree)}
            >
              Create account
            </PillButton>
            {/* <DividerWithText className="py-8">or</DividerWithText>
            <div className="flex flex-col gap-2 text-center">
              <p>Already have a TWC account?</p>
              <Link className="text-blue-tw500" href="/signin">
                Sign in
              </Link>
            </div> */}
          </form>
        </section>
        <Image
          src={vectorImgSrc}
          width={1092}
          height={1040}
          className="hidden h-1/2 pt-16 sm-tablet:block laptop:hidden"
          alt="Art of jobseeker"
        />
      </main>

      <footer className="mt-auto pt-8 sm-tablet:hidden">
        <Footer />
      </footer>
    </>
  );
}
