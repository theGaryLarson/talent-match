import Image from "next/image";
export default function PhotoCardWithTitle(){
    return(
        <div className="w-[375px] h-[420px] m-4 bg-white space-y-3 rounded-2xl border border-solid border-black shadow box-border">
            
            <Image className="rounded-t-xl" width={375} height={212} src="/cfa_images/stock/christina-wocintechchat-com-bPVM4nOy0Rg-unsplash 1.png" alt={""}/>
            <div className="p-5">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
            <p><strong>Something Catchy Goes Here</strong></p>
            <p>Lorem ipsum dolor sit amet, consectetur</p>
            </div>
        </div>
    );
}