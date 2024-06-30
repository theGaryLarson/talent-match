import Image from "next/image";

export default function BlockQuote({text, author, imgSrc}:{text:string; author:string; imgSrc:string}){
    return(
    <div className="bg-quote bg-cover bg-left bg-no-repeat px-10 md:px-32 lg:px-48 xl:px-60 2xl:px-80 py-10 flex justify-center">
        <div className="bg-gray-background flex flex-col sm:flex-row p-10 text-2xl items-center w-full ">
            <Image src={imgSrc} alt={author} width={200} height={220} style={{objectFit: "contain"}}/>
            <strong className="text-7xl self-start mt-4 sm:mx-4 sm:mt-0">“</strong>
            <div className="pl-8 pr-8 sm:pl-0 space-y-8">
                <p>{text}</p>
                <p className="text-blue-text">- {author}</p>
            </div>
        </div>
    </div>
    );
    
}