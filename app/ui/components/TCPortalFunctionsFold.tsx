'use client'
import Image from 'next/image';
import { useState } from 'react';
export default function TCPortalFunctionsFold() {
  const [index, setIndex] = useState<number>(0);  
  const tabs = [
    { src: '/images/SearchableDB.svg', text: 'Searchable Database', index: 0 },
    { src: '/images/SkillGapAnalysis.svg', text: 'Skills Gap Analysis', index: 1 },
    { src: '/images/DLTicon.svg', text: 'Diverse Local Talent', index: 2 } // Change the text here
  ]
  const Subtitle = [
    'Our searchable database quickly connects you with qualified candidates who match your specific needs.',
    '',
    ''
  ]
  return (
    <div>
      <div className="text-center">
        <span className="font-['Roboto'] text-[88px] font-normal capitalize leading-[123.20px] text-[#014260]">
          Talent & Career{' '}
        </span>
        <span className="font-['Roboto'] text-[88px] font-normal capitalize leading-[123.20px] text-[#047f9c]">
          Portal
        </span>
      </div>
      <div className="text-center font-['Roboto'] text-[22px] font-normal leading-[30.80px] text-[#0f1728]">
        Our searchable database quickly connects you with qualified candidates
        who match your specific needs.
      </div>
      <div className='flex items center gap-4'>
      {tabs.map((tab, i) => (
      <TabButton
        key={i}
        src={tab.src}
        text={tab.text}
        isSelected={index === tab.index}
        onClick={() => setIndex(tab.index)}
      />
    ))}
      <div id='conent'>
        <p>{index}</p>
      </div>
      </div>
      
    </div>
  );
}

function TabButton(props:{src:string, text:string, isSelected:boolean, onClick: () => void }) {
  return (
    <div className="inline-flex h-[120px] w-[120px] flex-col items-center justify-center gap-2 rounded-2xl bg-[#f3f3f3] p-4 shadow" onClick={props.onClick}>
      <TabImage src={props.src} isSelected={props.isSelected}/>
      <div className="text-center font-['Roboto'] text-sm ">
      {props.text}
      </div>
    </div>
  );
}

function TabImage(props:{src:string, isSelected:boolean}){
    return(
        <Image className={props.isSelected?'':'grayscale'} src={props.src} alt={''} width={48} height={48}/>
    );
}