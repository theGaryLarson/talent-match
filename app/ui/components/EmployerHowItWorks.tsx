import { ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function EmployerHowItWorks(){
return(
<div>
<div className="text-center text-[#014260] text-[88px]">How It Works</div>
<div className="space-y-[32px]">
<Step buttonText={"Post a Job"} title={"Post a Job"} article={"Create a job post, outline the specific skills you need, and publish it with a few clicks. You'll easily manage and track all your postings from a centralized dashboard, keeping you organized and informed throughout the hiring process."} link={"/underconstruction"}/>
<Step buttonText={"Search Local Candidates"} title={"Discover Local Talent"} article={"Connect with top tech talent right in your area. Simply define your desired search radius, and we'll present you with a curated list of local candidates. Through our advanced filters, you can search for the exact skills and experience you need, ensuring a perfect match for your needs."} link={"/services/employers/dashboard/listview"}/>
<Step buttonText={"Start Hiring"} title={"Connect With EaseConnect With Ease"} article={"Once you've found the perfect candidate, our Portal makes connecting effortless. Directly initiate contact through our messaging system, streamlining communication and ensuring a smooth hiring process."} link={"/underconstruction"}/>
<div className="space-y-6">

<div className="text-center text-[#014260] text-[66px] font-normal font-['Roboto'] capitalize leading-[66px]">Discover diverse, qualified talent in your community</div>
<Image src={"/images/employerBottomPic.png"} alt={"Discover diverse, qualified talent in your community"} width={3480} height={1791}/>
</div>
</div>
</div>
);
}



function Step(props:{buttonText:string, title:string, article:string, link:string}){
    return(
        <div className="grid laptop:grid-cols-2 items-center gap-[32px] laptop:gap-[80px]">
            <div className="space-y-[16px]">
            <div className="text-[#047f9c] text-[44px] font-normal font-['Roboto'] leading-[44px]">{props.title}</div>
            <div className="text-[#0f1728] text-[22px] font-normal font-['Roboto'] leading-[30.80px]">{props.article}</div>
        
            
            </div>
            <div className="w-[680px] h-[439.36px] bg-fuchsia-500 laptop:row-span-2"></div>
            <Link href={props.link} className="w-max h-10 px-6 py-2.5 rounded-[100px] border border-[#014260] justify-center items-center gap-2 inline-flex">
            {props.buttonText}
            <ArrowRightIcon className="w-5 h-5"/>
            </Link>
        </div>
    );
}