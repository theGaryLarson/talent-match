import Image from "next/image";
export default function PhotoCardWithTitle({title, article, imgSrc}:{title:String; article:String, imgSrc:string}){
    return(
        <div className="w-[275px] h-[320px] text-sm bg-white rounded-2xl border border-black shadow box-border relative">
            <Image className="rounded-t-xl" width={375} height={212} src={imgSrc} alt={""}/>
            <div className="w-[164px] h-[34px] absolute left-0 top-[110px] bg-blue-trans rounded-tr-md rounded-br-md flex items-center" ><h3 className="text-lg text-white font-bold px-3">{title}</h3></div>
            <div className="p-3 space-y-3">   
            <p>{article}</p>
            {/* <p><strong>Something Catchy Goes Here</strong></p>
            <p>Lorem ipsum dolor sit amet, consectetur</p> */}
            </div>
        </div>
    );
}