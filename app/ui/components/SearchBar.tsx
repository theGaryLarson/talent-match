'use client'

import {useSearchParams, usePathname, useRouter} from 'next/navigation';
import {useCallback, useState} from 'react';

export default function SearchBar() {
    const searchParams = useSearchParams();
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )
    const search = searchParams.get('search')
    const pathname = usePathname()
    const router = useRouter()
    const [inputValue, setInputValue] = useState(search || '');
    console.log(search)
    console.log("path: ", pathname)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            router.push(pathname + '?' + createQueryString('search', inputValue));
        }
    };
    return (
        <div className="">
            <label htmlFor="default-search"
                   className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 " aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search"
                       className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                       placeholder="Search multiple skills with a comma separated list and press Enter..."
                       required
                       value={inputValue}
                       onChange={handleInputChange}
                       onKeyDown={handleKeyDown}
                />
            </div>
        </div>
    );

}