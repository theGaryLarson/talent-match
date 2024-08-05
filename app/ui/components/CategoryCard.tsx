import Link from "next/link";

export default function CategoryCard(props:{imgSrc:string, title:string, text:string, href:string}){
    return(
    <Link href={props.href}>
    <div className="w-[300px] h-[260px] border rounded-2xl text-center flex flex-col items-center space-y-4 hover:scale-105">
        <img className="rounded-t-xl" width={300} src={props.imgSrc}>
        </img>
        <h3 className="text-lg font-bold">{props.title}</h3>
    </div>
    </Link>
);}