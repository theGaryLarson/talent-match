'use client';
import { useState } from 'react';
interface TabProps {
  label: string;
  content: React.ReactNode;
}

export default function Tabs(props: { tabs: TabProps[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full">
      <div className="flex divide-x-2 divide-inherit rounded-lg border border-solid border-blue-border">
        {props.tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`grow px-2 py-2 text-sm font-medium
            ${index === activeIndex ? 'bg-blue-background text-white ' : 'text-gray-500 hover:bg-gray-100 hover:text-blue-600 '}
              ${index === 0 ? 'rounded-bl-md rounded-tl-md' : ''}
              ${index === props.tabs.length - 1 ? 'rounded-br-md rounded-tr-md' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">{props.tabs[activeIndex].content}</div>
    </div>
  );
}
