import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Avatar({imgsrc, scale}:{imgsrc?:string|null; scale?:number}){
    let size = 85;
    if(scale){
        size = 85 * scale
    }
    return(
       <div className={`w-[${size}px] h-[${size}px] flex justify-center items-center`}>
       {imgsrc?<Image width={size} height={size} src={imgsrc} alt={""} className={`rounded-full object-cover aspect-square`}/>:<UserCircleIcon/>}
       </div> 
    )
}