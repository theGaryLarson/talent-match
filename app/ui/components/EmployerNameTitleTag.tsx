import Link from "next/link";
import Avatar from "./Avatar";

export default function EmployerNameTitleTag(props:{name:string, title:string, company:string}){
    return(
        <div className="w-full border h-24 rounded-lg flex items-center">
            <Avatar/>
            <div className="w-full flex items-center flex-wrap justify-between p-4">
                <h2 className="font-bold">{props.name} | {props.title} | <span className="font-light">{props.company}</span></h2>
                <Link href='/#'><h2>Edit Profile Details</h2></Link>
            </div>
            
        </div>
    )
}