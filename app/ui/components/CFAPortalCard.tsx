import RoundedButton from "./RoundedButton";

export default function CFAPortalCard(){
    return (
    <div className="flex flex-col justify-center items-center gap-8 py-32 px-8 w-full bg-gray-background rounded-3xl">
        <h1 className="font-black text-5xl sm:text-6xl">Career Portal</h1>
        <strong>Build your personal brand, highlight your superpower</strong>
        <div className="flex flex-row gap-8 text-sm sm:text-lg [&>*]:px-8 [&>*]:py-2 md:[&>*]:px-13 md:[&>*]:py-3">
            <RoundedButton content="Sign In" link="/login" invertColor/>
            <RoundedButton content="Sign Up" link="/signup" invertColor/>
        </div>
    </div>);
}