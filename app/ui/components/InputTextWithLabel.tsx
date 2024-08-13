import {ChangeEventHandler, useState} from "react";

interface Props {
    children: React.ReactNode,
    id: string,
    className?: string,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    [key: string]: any,
}

export default function InputTextWithLabel({
   children,
   id,
   className = "",
   value,
   onChange,
   ...rest
}: Props) {
    const [internalValue, setInternalValue] = useState("");

    return (
        <div className={"relative " + className}>
            <input
                id={id}
                name={id}
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={value ?? internalValue}
                onChange={onChange ?? ((e) => setInternalValue(e.target.value))}
                {...rest}
            />
            <label htmlFor={id}
                   className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
                {children}
            </label>
        </div>
    );
}