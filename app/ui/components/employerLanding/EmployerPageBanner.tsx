import Image from "next/image";
import RoundedButton from "../RoundedButton";

export default async function EmployerPageBanner() {
  return (
    <div
      className={
        "laptop:h-[825px] phone:h-[1300px] grid items-center gap-[64px] laptop:grid-cols-2 bg-linear-to-b from-[#014260] to-[#39b2c2] px-[16px] py-[128px] sm-tablet:px-[50px] laptop:px-[100px] text-white"
      }
    >
      <Image src={"/images/employers/Profile-Card.png"} className="justify-self-center max-w-8/10" alt={""} width={611} height={632}/>
      <div className="laptop:order-first space-y-7">
        <div
          className="self-stretch capitalize leading-tight"
          style={{ fontSize: "clamp(2rem, 10vw, 5rem)" }}
        >Discovering Tech Talent Just Got Easier 
        </div>
        <div className="self-stretch text-[22px] leading-relaxed">
        Revolutionize your hiring process with portfolios that
        showcase candidates' practical skills and project experience
        </div>
        <div className="gap-4 flex flex-row items-start justify-start">
          <RoundedButton
            content={"Explore Portfolios"}
            link={"/services/employers/dashboard/talent-search"}
            invertColor={false}
          />
          <RoundedButton
            content={"Post A Job"}
            link={"mailto:susanne.mata@computingforall.org"}
            invertColor={false}
          />
        </div>
      </div>
      
    </div>
  );
}