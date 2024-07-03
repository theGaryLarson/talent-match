import Link from "next/link";

export default function SimpleCard(props:{title:string, content:string, href:string}){
    return(
        <div className="border border-black w-[500px] h-[220px] p-4 space-y-3 rounded-lg">
            <h3 className="text-lg">{props.title}</h3>
            <p>{props.content}</p>
            <div className="flex justify-end">
            <Link href={props.href}>Learn More...</Link>
            </div>
        </div>
    )
}