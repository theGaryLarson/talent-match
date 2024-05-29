import { HeartIcon, UserIcon } from "@heroicons/react/20/solid";
//draft
interface Props {
    title: string;
    val: number;
}
export default function ScoreCard(props:Props){
    return (
        <div className="inline-block w-72 h-14 bg-blue-background rounded-md items-center content-center space-x-4">
        <UserIcon className="inline-block w-8"/>
        <div className=" inline-block text-white text-balance">{props.title}</div>
        <div className="inline-block bg-white p-1">{props.val}</div>
        </div>
    );
}