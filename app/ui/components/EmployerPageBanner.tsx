import RoundedButton from "./RoundedButton";
import { auth } from "@/auth";

export default async function EmployerPageBanner() {
  const session = await auth();
  console.log("session is ", session);
  //h-[615px] content-center bg-jobseeker-hero-1 bg-cover bg-center p-4 text-white bg-blend-darken tablet:p-10 laptop:h-[854px] laptop:p-20 bg-linear-to-r from-purple-500 to-blue-tw500
  return (
    <div
      className={
        "h-[1000px] flex items-center bg-linear-to-b from-primary-main to-[#39b2c2] px-[16px] sm-tablet:px-[50px] laptop:h-[854px] laptop:px-[100px]"
      }
    >
      <div className="inline-flex h-[750px] w-[487px] flex-col items-start justify-start gap-2">
        <div
          className="self-stretch font-normal capitalize leading-[105.60px] text-white"
          style={{ fontSize: "clamp(4rem, 24vw, 5rem);" }}
        >
          Where you discover Local tech talent{" "}
        </div>
        <div className="self-stretch  text-[22px] font-normal leading-[30.80px] text-white">
          Connect with quality local candidates in our Talent Portal
        </div>
        <div className="flex flex-col items-start justify-start">
          <div className="relative h-[33.21px] w-px" />
        </div>
        <RoundedButton
          content={"Search Talent"}
          link={"/services/talent-search"}
          invertColor={false}
        />
      </div>
    </div>
  );
}
