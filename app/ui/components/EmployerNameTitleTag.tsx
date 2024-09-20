"use client"
import Link from "next/link";
import Avatar from "./Avatar";

import { useSession } from "next-auth/react"
export default function EmployerNameTitleTag(props:{name:string| null | undefined, title:string, company:string, pfp:string|undefined}){

    return(
        <div className="w-full border h-[76px] rounded-lg flex items-center">
            <Avatar imgsrc={props.pfp} scale={.69}/>
            <div className="w-full flex items-center flex-wrap justify-between p-4">
                <h2 className="font-bold">{props.name} | {props.title} | <span className="font-light">{props.company}</span></h2>
                <Link className="text-red-600" href='/create-profile/employer/personal'><h2>Edit Profile Details</h2></Link>
            </div>
            
        </div>
    )
}