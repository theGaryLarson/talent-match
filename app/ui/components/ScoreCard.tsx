import { HeartIcon, UserIcon } from "@heroicons/react/20/solid";
//draft
interface Props {
    title: string;
    val: number;
}
export default function ScoreCard(props:Props){
    return (
        <div className="flex justify-between p-4 w-72 h-14 bg-whitebg rounded-md border border-blue-background items-center">
            <span className="space-x-2">
            <UserIcon className="inline-block w-8"/>
            <div className=" inline-block text-balance">{props.title}</div>
            </span>
            <div className="inline-block bg-blue-background py-2 px-4 rounded-md text-white font-bold">{props.val}</div>
        </div>
    );
}