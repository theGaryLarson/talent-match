import RoundedButton from "./RoundedButton";

export default function LargeRoundedButtonCard(props:{title:string, blurb:string, buttonContent:string}){
    return(
        <div className="flex w-full bg-gray-100 flex-col space-y-7 rounded-lg border px-5 py-5 shadow">
            <h3 className="font-bold text-xl">{props.title}</h3>
            <p>{props.blurb}</p>
            <RoundedButton content={props.buttonContent} link={"/services/employers/dashboard/listview"} invertColor={true}/>
            
        </div>
    );
}