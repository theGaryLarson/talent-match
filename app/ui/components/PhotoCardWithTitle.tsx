import Image from "next/image";
export default function PhotoCardWithTitle({title, article}:{title:String; article:String}){
    return(
        <div className="w-[375px] h-[420px] m-4 bg-white space-y-3 rounded-2xl border border-solid border-black shadow box-border relative">
            
            <Image className="rounded-t-xl" width={375} height={212} src="/cfa_images/stock/christina-wocintechchat-com-bPVM4nOy0Rg-unsplash 1.png" alt={""}/>
            <div className="p-5">
                <div className="w-[241px] h-[61px] absolute left-0 top-[140px] bg-white/[.75] rounded-tr-md rounded-br-md flex items-center" ><h3 className="text-xl font-bold px-3">{title}</h3></div>
            <p>{article}</p>
            <p><strong>Something Catchy Goes Here</strong></p>
            <p>Lorem ipsum dolor sit amet, consectetur</p>
            </div>
        </div>
    );
}