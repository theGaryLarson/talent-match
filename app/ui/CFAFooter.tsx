import Link from "next/link";
import CFALogo from "./CFALogo"
import Image from "next/image";
export default function CFAFooter(){
    return(
        <div className="w-full bg-primary-600 text-white px-6 py-2">
            <div className="flex justify-between items-center">
            <Link href={"/#"}>
            <Image src="/cfa_images/CFA logo_reverse 1.svg" alt={"CFA Logo"} width={150} height={75}/></Link>
            <div className="grid grid-cols-3 grid rows-3 gap-4 text-sm p-2">
                <Link href={"/#"}>Lorem Ipsum</Link>
                <Link href={"/#"}>Lorem Ipsum</Link>
                <Link href={"/#"}>Lorem Ipsum</Link>
                <Link href={"/#"}>Lorem Ipsum</Link>
                <Link href={"/#"}>Lorem Ipsum</Link>
                <Link href={"/#"}>Lorem Ipsum</Link>
                <Link href={"/#"}>Lorem Ipsum</Link>
                <Link href={"/#"}>Lorem Ipsum</Link>
                <Link href={"/#"}>Lorem Ipsum</Link>
            </div>
            <div className="flex gap-2 items-center">
                <p>Follow Us:</p><a href={"https://www.linkedin.com/company/digitalskillsforall/"} target="_blank"><img src={"/cfa_images/stock/LI-In-Bug.png"} alt={"Linkedin Link"} width={40} ></img></a>
            </div>
            </div>
            <hr/>
            <p className="text-center text-sm p-4"><Link href={"/#"}>Terms of Services</Link> | <Link  href={"/#"}>Privacy Policy</Link> | <Link href={"/#"}>Cookie Settings</Link> </p>
        </div>
    );
}