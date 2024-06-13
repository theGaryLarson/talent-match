import CFALogo from "./CFALogo"
import Image from "next/image";
export default function CFAFooter(){
    return(
        <div className="flex items-center w-full bg-blue-background text-white ">
            <Image src="/cfa_images/CFA logo_reverse 1.svg" alt={"CFA Logo"} width={150} height={75}/>
            <p className="text-center">Terms of Services | Privacy Policy | Cookie Settings </p>
        </div>
    );
}