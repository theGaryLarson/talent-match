export default function Teaser({isLarge, title, text}:{isLarge:Boolean, title:string, text:string}){
    if(isLarge){
        return(
            <div className="w-[300px] 2xl:w-[400px] h-[400px] rounded-xl border flex flex-col">
            <div className="w-[300px] 2xl:w-[400px] h-[150px] 2xl:h-[200px] rounded-t-lg bg-black"></div>
            <div className="w-[300px] 2xl:w-[400px] h-[250px] 2xl:h-[200px] p-4 space-y-6">
                <h3 className="font-bold">{title}</h3>
                <p className="text-sm">{text}</p>
                <h3 className="font-bold text-right">Coming Soon</h3>
            </div>
        </div>
        );
    }else{
    return (
        <div className="w-[375px] h-[212px] rounded-xl border flex">
            <div className="w-[134px] h-[212px] rounded-s-lg bg-black"></div>
            <div className="w-[241px] h-[212px] py-4 px-2 space-y-6">
                <h3 className="font-bold">{title}</h3>
                <p className="text-sm">{text}</p>
                <h3 className="font-bold text-right">Coming Soon</h3>
            </div>
        </div>
    );}

}