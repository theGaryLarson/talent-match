import RoundedButton from "./RoundedButton";

export default function CFAPortalCard(){
    return (
    <div className="h-[600px] bg-gray-background rounded-3xl flex flex-col justify-center items-center gap-8">
        <h1 className="font-black text-6xl">Career Portal</h1>
        <strong>Build your personal brand, highlight your superpower</strong>
        <div className="flex flex-row-1 gap-8">
            <RoundedButton content="Sign In" link="/login" invertColor/>
            <RoundedButton content="Sign Up" link="/signup" invertColor/>
        </div>
    </div>);
}