import { ArrowRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { ArrowRight } from "@mui/icons-material";
import Link from "next/link";

export default function EmployerHowItWorks(){
return(
<div>
<div className="text-center text-[#014260] text-[88px]">How It Works</div>
<div className="space-y-[32px]">
<Step/>
<Step/>
<Step/>
</div>
</div>
);
}




function Step(){
    return(
        <div className="grid laptop:grid-cols-2 items-center latop:gap-[80px]">
            <div className="space-y-[16px]">
            <div className="text-[#047f9c] text-[44px] font-normal font-['Roboto'] leading-[44px]">Post a Job</div>
            <div className="text-[#0f1728] text-[22px] font-normal font-['Roboto'] leading-[30.80px]">Create a job post, outline the specific skills you need, and publish it with a few clicks. You'll easily manage and track all your postings from a centralized dashboard, keeping you organized and informed throughout the hiring process.</div>
            <br/>
            <Link href="./underconstruction" className="h-10 px-6 py-2.5 rounded-[100px] border border-[#014260] justify-center items-center gap-2 inline-flex">
            Post a Job
            <ArrowRightIcon className="w-5 h-5"/>
            </Link>
            </div>
            <div className="w-[680px] h-[439.36px] bg-black"></div>

        </div>
    );
}