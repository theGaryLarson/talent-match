import React, { ChangeEvent, useState } from 'react';

interface Props {
  children: React.ReactNode;
  id: string;
  options: { label: string; value: string }[];
  className?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  value?: string | number;
}

export default function SelectOptionsWithLabel({
  children,
  id,
  options,
  className = '',
  placeholder = '',
  required = false,
  disabled = false,
  onChange,
  value,
}: Props) {
  const [internalValue, setInternalValue] = useState('');

  return (
    <div className={'relative ' + className}>
      <div>
        <select
          id={id}
          name={id}
          onChange={onChange ?? ((e) => setInternalValue(e.target.value))}
          value={value ?? internalValue}
          className="border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
          required={required}
          disabled={disabled}
        >
          {placeholder !== '' ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : (
            ''
          )}
          {options.map((item) => {
            return (
              <option key={id + '-option-' + item.value} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
        <label
          htmlFor={id}
          className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500"
        >
          {children}
        </label>
      </div>
    </div>
  );
}
