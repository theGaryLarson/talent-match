import Image from "next/image";
export default function TCPortalFunctionsFold() {
  return <div>
<div className="text-center"><span className="text-[#014260] text-[88px] font-normal font-['Roboto'] capitalize leading-[123.20px]">Talent & Career </span><span className="text-[#047f9c] text-[88px] font-normal font-['Roboto'] capitalize leading-[123.20px]">Portal</span></div>
<div className="text-center text-[#0f1728] text-[22px] font-normal font-['Roboto'] leading-[30.80px]">Our searchable database quickly connects you with qualified candidates who match your specific needs.</div>
<TabButton/>
  </div>;
}




function TabButton(){
    return(
        <div className="w-[120px] h-[120px] p-4 bg-[#f3f3f3] rounded-2xl shadow flex-col justify-center items-center gap-2 inline-flex">
            <Image  src={"/images/SearchableDB.svg"} alt={""} width="68" height="45"/>
            <div className="text-center text-[#014260] text-sm font-normal font-['Roboto'] leading-[16.80px]">Searchable<br/>Database</div>
        </div>
    );
}