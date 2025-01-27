import { HeartIcon, UserIcon } from "@heroicons/react/20/solid";
//draft
interface Props {
  title: string;
  val: number;
}
export default function ScoreCard(props: Props) {
  return (
    <div className="h-[50px] bg-white rounded-[100px] shadow border backdrop-blur-[120px] justify-center items-center inline-flex">
      <div className="p-5 justify-center items-center gap-2 flex">
        <div className="text-[#181818] text-base font-normal font-['Roboto'] leading-none">
          {props.title}
        </div>
        <div className="text-center text-[#047f9c] text-xl font-bold font-['Roboto'] leading-7">
          {props.val}
        </div>
      </div>
    </div>
  );
}
