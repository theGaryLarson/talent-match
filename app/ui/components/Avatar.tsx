import { AcademicCapIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Avatar({imgsrc}:{imgsrc?:string|null;}){
    return(
       <div className="w-[85px] h-[85px] flex justify-center items-center">
       {imgsrc?<img src={imgsrc} alt={""} className="rounded-full object-cover w-[85px] h-[85px]"/>:<UserCircleIcon/>}
       </div> 
    )
}