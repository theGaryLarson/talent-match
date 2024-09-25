import RoundedButton from "./RoundedButton";

export default function PortalCard(){
    return (
    <div className="flex flex-col justify-center items-center gap-8 py-32 px-8 w-full bg-gray-background rounded-3xl">
        <h1 className="font-black text-5xl phone:text-6xl">Tech Talent Showcase</h1>
        <strong>Build your personal brand, highlight your superpower</strong>
        <div className="flex flex-row gap-8 text-sm phone:text-lg [&>*]:px-8 [&>*]:py-2 tablet:[&>*]:px-13 tablet:[&>*]:py-3">
            <RoundedButton content="Sign In" link="/signin" invertColor/>
            <RoundedButton content="Sign Up" link="/signup" invertColor/>
        </div>
    </div>);
}