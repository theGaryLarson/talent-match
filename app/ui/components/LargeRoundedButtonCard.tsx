import RoundedButton from "./RoundedButton";

export default function LargeRoundedButtonCard(){
    return(
        <div className="flex w-full bg-gray-100 flex-col space-y-7 rounded-lg border px-5 py-5 shadow">
            <h3 className="font-bold">Search for Candidates</h3>
            <p>Meet pre-screened, diverse candidates through CFA’s career services and events, or get involved to help shape your future workforce.</p>
            <RoundedButton content={"Search for Talent"} link={"/services/employers/dashboard/listview"} invertColor={false}/>
        </div>
    );
}