import Avatar from "./Avatar";
import Pill from "./Pill";
import RoundedButton from "./RoundedButton";
let pills = ["Java", "AWS","Azure","Rust" ,"C++"]
export default function JobSeekerCardView(){
    return(
        <div className="border w-full h-[220px] rounded-lg flex space-x-16 p-6 items-center">
            <Avatar imgsrc="/cfa_images/stock/Mask group.png"/>
            <div className="flex flex-col justify-between h-full w-3/5">
            <div className="space-y-2">
                <h3><span className="font-bold">Cloud Computing</span> | <span>GPA 3.5</span></h3>
                <h4>Green River C.C. | Senior</h4>
                <p>
                Eager to start applying my curriculum work into practical use! I am flexible, hardworking, and on meeting deadlines efficiently to meet the organization goals to ensure business success ... 
                </p>
                
            </div>
            <div className="space-x-2">
            {pills.map((pill)=><Pill key={pill} text={pill}/>)}
            </div>
            </div>
            <div className="flex flex-col justify-between h-full">
                <h3 className="text-right">end cap</h3>
                <RoundedButton content={"View Profile"} link={"/#"}/>
            </div>
        </div>
    );
}