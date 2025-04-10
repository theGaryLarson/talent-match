import Image, { StaticImageData } from "next/image";
import RoundedButton from "../RoundedButton";
import ExternshipImg from "./Externship.png";
import EventsImg from "./events.png";
import LogosImg from "./logos.png";
export default function MarketingCards() {
  return (
    <div className="space-y-[64px] py-[64px]">
      <MarketCard
        imgSrc={ExternshipImg}
        link="/underconstruction"
        tittle={"Create Externships Tailored to Your Needs"}
        paragraph={
          "Collaborate with our skilled candidates on real projects. Observe their skills, teamwork, and problem-solving abilities firsthand before making a hiring decision. Shape projects to meet your specific hiring needs and evaluate potential hires in a real-world setting."
        }
        buttonText={"More Info Coming Soon"}
        buttonDisabled={true}
      />
      <MarketCard
        imgSrc={EventsImg}
        link="/services/events"
        textfirst={true}
        tittle={"Join Our Tech Community Network"}
        paragraph={
          "Engage with our community by participating in various events from workshops to talent showcases, industry panels and hiring fairs. Network with potential candidates and build your employer brand in our Tech Community Network forum."
        }
        buttonText={"Get Connected"}
      />
      <MarketCard
        imgSrc={LogosImg}
        link="/services/training-providers"
        tittle={"Building a Skilled and Diverse Tech Workforce"}
        paragraph={
          "We are committed to bridging the skills gap and promoting diversity in tech. We partner with leading training providers and educational institutions to ensure our candidates have the skills you need."
        }
        buttonText={"Learn About Our Partners"}
      />
    </div>
  );
}
function MarketCard({
  tittle,
  paragraph,
  buttonText,
  buttonDisabled = false,
  textfirst = false,
  link,
  imgSrc,
}: {
  imgSrc: StaticImageData;
  link: string;
  textfirst?: boolean;
  tittle: string;
  paragraph: string;
  buttonText: string;
  buttonDisabled?: boolean;
}) {
  return (
    <div className="bg-gray-200 p-[32px] rounded-4xl grid grid-cols-1 laptop:grid-cols-2 gap-[32px]">
      <Image className="" src={imgSrc} alt={"Externship marketing image"} />
      <TextHalf
        link={link}
        appearFirst={textfirst}
        tittle={tittle}
        paragraph={paragraph}
        buttonDisabled={buttonDisabled}
        buttonText={buttonText}
      />
    </div>
  );
}

function TextHalf({
  appearFirst,
  tittle,
  paragraph,
  buttonText,
  buttonDisabled = false,
  link,
}: {
  link: string;
  appearFirst: boolean;
  tittle: string;
  paragraph: string;
  buttonText: string;
  buttonDisabled?: boolean;
}) {
  return (
    <div
      className={`max-w-[600px] space-y-[32px] ${appearFirst ? "laptop:order-first" : ""}`}
    >
      <h3 className="portfolio text-5xl capitalize leading-[58px]">{tittle}</h3>
      <p>{paragraph}</p>
      <RoundedButton
        content={buttonText}
        invertColor={true}
        link={link}
        disabled={buttonDisabled}
      />
    </div>
  );
}
