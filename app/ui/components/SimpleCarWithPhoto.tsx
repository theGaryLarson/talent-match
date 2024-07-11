import Link from "next/link";

export default function SimpleCardWithPhoto(props:{title:string, content:string, href:string}){
    return(<Link href={props.href}>
        <div className="border border-black w-[500px] h-[220px] p-4 space-y-3 rounded-lg flex ">
            <div className="space-y-6">
            <h3 className="text-lg font-bold">{props.title}</h3>
            <p>{props.content}</p>
            </div>
            <div className="flex justify-center">
            <img src='/cfa_images/CFA_volunteer.png' width={250}></img>
            </div>
        </div>
        </Link>
    )
}