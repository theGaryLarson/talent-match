import Image from "next/image";
import "./employerLanding.css";
import RoundedButton from "../RoundedButton";
import ProfileImg from "./Profile-Image.png";
export default function TCPortalFunctionsFold() {
  return (
    <div className="flex flex-col items-center gap-[42px] bg-gray-200 py-[80px]">
      <div className="text-center">
        <span className="text-[60px] font-normal capitalize leading-[123.20px] text-secondary-main">
          Our Digital <span className="portfolio">Portfolio Platform</span>
        </span>
      </div>
      <div className="text-center font-['Roboto'] text-[22px] font-normal leading-[30.80px] text-[#0f1728]">
        Explore candidate portfolios showcasing projects, collaborative
        experience,and proven abilities. See their skills in action before you
        hire.
      </div>
      <Image src={ProfileImg} alt={""} className="rounded-4xl px-[16px]" />
      <HighLights />
      <RoundedButton
        content={"Browse Candidate Portfolios"}
        invertColor={true}
        link="/services/employers/dashboard/talent-search"
      />
    </div>
  );
}

function HighLights() {
  return (
    <div className="grid tablet:grid-cols-3">
      <Highlight
        src={"/images/employers/Vector1.png"}
        text="Concrete evidence of technical proficiency"
      />
      <Highlight
        src={"/images/employers/Vector2.png"}
        text="Deeper insights into projects and contributions"
      />
      <Highlight
        src={"/images/employers/Vector3.png"}
        text="Spotlights soft skill strengths and development"
      />
    </div>
  );
}

function Highlight(props: { src: string; text: string }) {
  return (
    <div className="self-stretch inline-flex flex-col justify-start items-center gap-4 w-[300px]">
      <Image
        src={props.src}
        alt={""}
        width={228}
        height={185}
        style={{ width: "112px" }}
      />
      <div className="self-stretch inline-flex justify-center items-start">
        <div
          data-gutter-bottom="False"
          data-variant="h4"
          className="inline-flex flex-col justify-start items-center"
        >
          <div className="text-center text-2xl">
            {props.text}
          </div>
        </div>
      </div>
    </div>
  );
}
