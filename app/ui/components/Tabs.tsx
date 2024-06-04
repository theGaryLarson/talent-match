'use client'
import { useState } from "react";
interface TabProps {
    label: string;
    content: React.ReactNode;
  }
  
export default function Tabs(props:{tabs: TabProps[];}){
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full">
      <div className="flex border border-solid border-blue-border divide-x-2 divide-inherit rounded-lg">
        {props.tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`py-2 px-2 text-xs font-medium grow 
            ${index === activeIndex ? 'bg-blue-background text-white ': 'text-gray-500 hover:text-blue-600 hover:bg-gray-100 '}
              ${index === 0 ? 'rounded-tl-md rounded-bl-md':''}
              ${index === props.tabs.length -1 ? 'rounded-tr-md rounded-br-md':''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {props.tabs[activeIndex].content}
      </div>
    </div>
  );
};