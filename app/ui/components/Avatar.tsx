import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Avatar({imgsrc, scale}:{imgsrc?:string|null; scale?:number}){
    let size = 85;
    if(scale){
        size = 85 * scale
    }
    return(
       <div className={`w-[${size}px] h-[${size}px] flex justify-center items-center`}>
       {imgsrc?<img src={imgsrc} alt={""} className={`rounded-full object-cover w-[${size}px] h-[${size}px]`}/>:<UserCircleIcon/>}
       </div> 
    )
}