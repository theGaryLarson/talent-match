import Link from "next/link";

export default function BrowseByCategory(){
    return(
        <div>
            <h3 className="font-bold text-lg">Browse by Category</h3>
            <div className="grid grid-cols-2 gap-5 py-5 md:grid-cols-4">
            <Link href={""}>Cloud Computing</Link>
            <Link href={""}>Cyber Security</Link>
            <Link href={""}>Data Analyst</Link>
            <Link href={""}>IT Support</Link>
            <Link href={""}>Project Manag.</Link>
            <Link href={""}>Software Dev</Link>
            <Link href={""}>AI Analyst</Link>
            <Link href={""}>UX Researcher</Link>
            <Link href={""}>Machine Learning </Link>
            <Link href={""}>UX Designer</Link>
            <Link href={""}>Lorem Ipsum</Link>
            <Link href={""}>Lorem Ipsum</Link>
            </div>
        </div>
    )
}