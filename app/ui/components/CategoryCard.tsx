import Link from "next/link";

export default function CategoryCard(props:{imgSrc:string, title:string, text:string}){
    return(
    <Link href={"/services/employers/dashboard/listview"}>
    <div className="w-[200px] h-[200px] text-center flex flex-col items-center hover:scale-105">
        <img className="rounded-xl" width={105} height={105} src={props.imgSrc}>
        </img>
        <h3 className="text-lg bold">{props.title}</h3>
        <p className="text-sm">
        {props.text}
        </p>
    </div>
    </Link>
);}