import Image from "next/image";
import Step1 from "./StepCard1.png";
import Step2 from "./StepCard2.png";
import Step3 from "./StepCard3.png";
import "./employerLanding.css";
export default function EmployerSteps() {
  return (
    <div>
      <div className="text-center">
        <span className="text-[60px] font-normal capitalize text-secondary-main">
          <span className="portfolio">
            Beyond Resumes —<br /> Real Projects, Real Results
          </span>
        </span>
        <p>
          Our team pre-screens candidates, evaluating their skills and
          experience. We deliver only the top matches, saving you valuable time
          and resources.
        </p>
      </div>
      <div className="grid tablet:grid-cols-3 items-start min-h-[400px] justify-items-center mt-[32px]">
        <Image className="w-[300px]" src={Step1} alt={""} quality={50} />
        <Image className="w-[300px] self-end" src={Step2} alt="" quality={50} />
        <Image className="w-[300px]" src={Step3} alt={""} quality={50} />
      </div>
    </div>
  );
}
