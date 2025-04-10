import Ritu from "./ritu.png";
import Alka from "./alka.png";
import Mandira from "./mandira.png";
import Image, { StaticImageData } from "next/image";
const Founders: FounderCardProps[] = [
  {
    paragraph:
      "Having spent years leading engineering teams at Microsoft, I saw firsthand how much time and resources were wasted on traditional hiring that didn't truly reveal a candidate's capabilities. We built this portal to finally solve that disconnect.",
    imgSrc: Ritu,
    name: "Ritu Bahl",
    title: "Executive Director & Founder, CFA",
    prevTitle: "Ex-Amazon, Ex-Microsoft",
  },
  {
    paragraph:
      "At Cisco Systems, we understood the critical importance of nurturing emerging talent.Our externship and internship programs are designed to create meaningful connections between employers and the next generation of tech leaders.",
    imgSrc: Alka,
    name: "Alka Manchanda",
    title: "Co-Director of Program Development, CFA",
    prevTitle: "Ex-Cisco Systems",
  },
  {
    paragraph:
      "Having been on the managing side at Microsoft, I know the budget constraints and the need for effective solutions. We are proud to offer this powerful platform to employers leveling the playing field and connecting you with exceptional talent.",
    imgSrc: Mandira,
    name: "Mandira Virmani",
    title: "Co-Director of Program Development, CFA",
    prevTitle: "Ex-Microsoft",
  },
];
export default function MeetTheFounders() {
  return (
    <div className="p-[32px] space-y-[32px]">
      <div className="text-center">
        <span className="text-[60px] font-normal capitalize leading-[123.20px] text-secondary-main">
          Meet The Founders
        </span>
        <p>
          We're a team of experienced tech leaders who've been in your shoes
          Frustrated by the inefficiencies of traditional hiring, we set out to
          builda better way to connect employers with exceptional tech talent.
        </p>
      </div>
      <div className="grid tablet:grid-cols-3 gap-[64px]">
        {Founders.map((f: FounderCardProps) => (
          <FounderCard {...f} key={f.name} />
        ))}
      </div>
    </div>
  );
}
type FounderCardProps = {
  paragraph: string;
  imgSrc: StaticImageData;
  name: string;
  title: string;
  prevTitle: string;
};
function FounderCard(props: FounderCardProps) {
  return (
    <div className="max-w-[400px] space-y-[32px]">
      <p>"{props.paragraph}"</p>
      <div className="flex gap-[16px]">
        <Image
          className="w-[70px] h-[70px]"
          src={props.imgSrc}
          alt={`picture of ${props.name}`}
        />
        <div>
          <p className="text-xl text-blue-textdark2">{props.name}</p>
          <p className="text-sm">{props.title}</p>
          <p className="text-sm text-neutral-900/60">{props.prevTitle}</p>
        </div>
      </div>
    </div>
  );
}
