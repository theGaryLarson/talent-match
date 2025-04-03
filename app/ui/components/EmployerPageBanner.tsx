import RoundedButton from "./RoundedButton";
import { auth } from "@/auth";

export default async function EmployerPageBanner() {
  const session = await auth();
  console.log("session is ", session);
  //h-[615px] content-center bg-jobseeker-hero-1 bg-cover bg-center p-4 text-white bg-blend-darken tablet:p-10 laptop:h-[854px] laptop:p-20 bg-linear-to-r from-purple-500 to-blue-tw500
  return (
    <div
      className={
        "h-[700px] laptop:h-[700px] flex items-center bg-linear-to-b from-primary-main to-[#39b2c2] px-[16px] sm-tablet:px-[50px] laptop:px-[100px]"
      }
    >
      <div className="inline-flex flex-col items-start justify-start gap-2">
        <div
          className="self-stretch font-normal capitalize leading-[105.60px] text-white"
          style={{ fontSize: "clamp(4rem, 24vw, 5rem)" }}
        >
          Unique Access to Undiscovered Talent​{" "}
        </div>
        <div className="self-stretch text-[22px] font-normal leading-[30.80px] text-white">
          The Talent Finder Portal creates a recruiting gateway primarily
          designed for Public​
        </div>
        <div className="flex flex-col items-start justify-start">
          <div className="relative h-[33.21px] w-px" />
        </div>
        <div className="gap-4 flex flex-row items-start justify-start">
          <RoundedButton
            content={"Search Talent"}
            link={"/services/employers/dashboard/talent-search"}
            invertColor={false}
          />
          <RoundedButton
            content={"Post Jobs"}
            link={"mailto:susanne.mata@computingforall.org"}
            invertColor={false}
          />
        </div>
      </div>
    </div>
  );
}
