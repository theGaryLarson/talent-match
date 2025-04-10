import Image from "next/image";
import RoundedButton from "../RoundedButton";
import ExternshipImg from "./Externship.png"
export default function MarketingCards() {
  return (
    <div>
      <MarketCard />
      <MarketCard textfirst={true}/>
      <MarketCard />
    </div>
  );
}
function MarketCard({textfirst = false}:{textfirst?:boolean}) {
  return (
    <div className="bg-gray-200 p-[32px] rounded-4xl grid grid-cols-2 gap-[32px]"> 
      <Image className="" src={ExternshipImg} alt={"Externship marketing image"}/>
      <TextHalf appearFirst={textfirst}/>
    </div>
  );
}

function TextHalf({appearFirst}:{appearFirst:boolean}) {
  return (
    <div className={`max-w-[600px] space-y-[32px] ${appearFirst?"order-first":""}`}>
      <h3 className="portfolio text-5xl capitalize leading-[58px]">
        Create Externships Tailored to Your Needs
      </h3>
      <p>
        Collaborate with our skilled candidates on real projects. Observe their
        skills, teamwork, and problem-solving abilities firsthand before making
        a hiring decision. Shape projects to meet your specific hiring needs and
        evaluate potential hires in a real-world setting.
      </p>
      <RoundedButton
        content={"More Info Coming Soon"}
        invertColor={true}
        link="/underconstruction"
        disabled={true}
      />
    </div>
  );
}
