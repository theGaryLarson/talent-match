import Link from "next/link";

export default function ({text}:{text:string}){
    return (
        <Link className="bg-blue-background hover:bg-blue-700 text-white py-0 px-4 rounded-full inline-block" href={"/skills"}>
            {text}
         
        </Link>
    )
}