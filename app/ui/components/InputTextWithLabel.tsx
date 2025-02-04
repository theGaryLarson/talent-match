"use client";

import { ChangeEventHandler, useState } from "react";

interface Props {
  children: React.ReactNode;
  id: string;
  disabled?: boolean;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  [key: string]: any;
}

interface ManagedValue {
  value: string;
  defaultValue?: never;
}

interface DefaultValue {
  defaultValue: string;
  value?: never;
}

export default function InputTextWithLabel({
  children,
  id,
  disabled = false,
  className = "",
  onChange,
  value,
  defaultValue,
  ...rest
}: Props & (ManagedValue | DefaultValue)) {
  const [internalValue, setInternalValue] = useState("");

  return (
    <div className={"relative " + className}>
      <div>
        <input
          id={id}
          name={id}
          disabled={disabled}
          className="border-1 peer block w-full appearance-none rounded-lg border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-tw600 focus:outline-none focus:ring-0"
          value={
            typeof defaultValue === "undefined"
              ? (value ?? internalValue)
              : undefined
          }
          defaultValue={
            typeof defaultValue !== "undefined" ? defaultValue : undefined
          }
          onChange={onChange ?? ((e) => setInternalValue(e.target.value))}
          {...rest}
        />
        <label
          htmlFor={id}
          className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-tw600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          {children}
        </label>
      </div>
    </div>
  );
}
