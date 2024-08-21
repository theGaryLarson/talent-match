import Image from "next/image";

export default function BlockQuote({text, author, imgSrc}:{text:string; author:string; imgSrc:string}){
    return(
    <div className="bg-quote bg-cover bg-left bg-no-repeat px-10 tablet:px-32 laptop:px-48 laptop:px-60 desktop:px-80 py-10 flex justify-center">
        <div className="bg-gray-background flex flex-col phone:flex-row p-10 text-2xl items-center w-full ">
            <Image src={imgSrc} alt={author} width={200} height={220} style={{objectFit: "contain"}}/>
            <strong className="text-7xl self-start mt-4 phone:mx-4 phone:mt-0">“</strong>
            <div className="pl-8 pr-8 phone:pl-0 space-y-8">
                <p>{text}</p>
                <p className="text-blue-text">- {author}</p>
            </div>
        </div>
    </div>
    );
    
}