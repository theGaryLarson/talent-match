import Image from "next/image";

export default function BlockQuote({text, author, imgSrc}:{text:string; author:string; imgSrc:string}){
    return(
    <div className="bg-gray-900 text-white flex flex-col sm:flex-row  p-10 text-2xl items-center">
        <Image src={imgSrc} alt={author} width={200} height={220} style={{objectFit: "contain"}}/>
        <div className="px-16 space-y-8">
        <p>{text}</p>
        <p>-{author}</p>
        </div>
    </div>
    );
    
}