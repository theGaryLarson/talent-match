import React, { ChangeEvent, useState } from 'react';

interface Props {
  children: React.ReactNode,
  id: string,
  options: {label:string, value:string}[],
  className?: string,
  placeholder?: string,
  required?: boolean,
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void,
  value?: string | number
}

export default function SelectOptionsWithLabel({
  children,
  id,
  options,
  className="",
  placeholder="",
  required=false,
  onChange,
  value,
}: Props){
  const [internalValue, setInternalValue] = useState("");

  return (
    <div className={"relative " + className}>
      <div>
      <select
        id={id}
        name={id}
        onChange={onChange ?? ((e) => setInternalValue(e.target.value))}
        value={value ?? internalValue}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        required={required}
      >
        {
          (placeholder !== '')?
            <option value="" disabled>{placeholder}</option>
          :
            ""
        }
        {
          options.map(
            item => {
              return (
                <option key={id+"-option-"+item.value} value={item.value}>
                  {item.label}
                </option>
              )
            }
          )
        }
      </select>
      <label htmlFor={id} className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
        {children}
      </label>
      </div>
    </div>
  );
}
