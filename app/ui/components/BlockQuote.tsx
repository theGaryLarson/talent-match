import Image from "next/image";

export default function BlockQuote({text, author, imgSrc}:{text:string; author:string; imgSrc:string}){
    return(
    <div className="bg-gray-900 px-24 py-10 flex justify-center">
    <div className="bg-gray-background flex flex-col sm:flex-row  p-10 text-2xl items-center w-full ">
        <Image src={imgSrc} alt={author} width={200} height={220} style={{objectFit: "contain"}}/>
        <div className="px-16 space-y-8">
        <p>{text}</p>
        <p className="text-blue-text">-{author}</p>
        </div>
    </div>
    </div>
    );
    
}