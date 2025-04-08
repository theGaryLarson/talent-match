import Image from 'next/image';
import './employerLanding.css'
export default function TCPortalFunctionsFold() {
  return (
    <div className="flex flex-col items-center gap-[42px] bg-gray-200 ">
      <div className="text-center">
        <span className="text-[88px] font-normal capitalize leading-[123.20px] text-secondary-main">
        Our Digital <span className="portfolio">Portfolio Platform</span>
        </span>
      </div>
      <div className="text-center font-['Roboto'] text-[22px] font-normal leading-[30.80px] text-[#0f1728]">
      Explore candidate portfolios showcasing projects, collaborative experience,and proven abilities. See their skills in action before you hire.
      </div>
      <Image src={"/images/employers/Profile-Image.png"} alt={''} width={1370} height={665} className='rounded-4xl'/>
      <HighLights/>
      </div>
  );
}


function HighLights(){
  return(
    <div>
    <Highlight src={"/images/employers/Vector1.png"} />
    <Highlight src={"/images/employers/Vector2.png"} />
    <Highlight src={"/images/employers/Vector3.png"} />
  </div>
  );
  
}


function Highlight(props:{src:string}){
  return(
    <div className="self-stretch inline-flex flex-col justify-start items-center gap-4 w-[300px]">
    <Image src={props.src} alt={''} width={228} height={185} style={{width:"112px"}}/>
    <div className="self-stretch inline-flex justify-center items-start">
        <div data-gutter-bottom="False" data-variant="h4" className="inline-flex flex-col justify-start items-center">
            <div className="text-center text-2xl">Concrete evidence of technical proficiency</div>
        </div>
    </div>
</div>
  );
}
