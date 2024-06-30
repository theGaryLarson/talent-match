import Image from "next/image";
import RoundedButton from "./RoundedButton";
export default function PhotoCardWithTitle({title, article, imgSrc, callToAction}:{title:String; article:String, imgSrc:string, callToAction?:string}){
    return(
        <div className="text-sm bg-white rounded-2xl border border-black shadow box-border relative">
            <div className="w-1/1 flex items-center">
                <Image className="rounded-t-xl" width={3750} height={2120} src={imgSrc} alt={""}/>
                <div className="h-[34px] absolute top-3/8 left-0 bg-blue-trans rounded-tr-md rounded-br-md flex items-center" ><h3 className="text-lg text-white font-bold px-3">{title}</h3></div>
            </div>
            <div className="width-1/1">
                <div className="p-3 space-y-3">
                    <p>{article}</p>
                    <div>
                        <strong>{callToAction}</strong>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur</p>
                </div>
            </div>
        </div>
    );
}