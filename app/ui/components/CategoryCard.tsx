import Image from "next/image";
import Link from "next/link";

export default function CategoryCard(props:{imgSrc:string, title:string, text:string, href:string}){
    return(
    <Link href={props.href}>
    <div className="w-[300px] h-[336px] border rounded-3xl text-center flex flex-col items-center space-y-4 hover:scale-105">
        <Image className="rounded-t-xl" src={props.imgSrc} alt={"Stock Photo"} width={300} height={242}></Image>
        <h3 className="text-lg font-bold">{props.title}</h3>
    </div>
    </Link>
);}