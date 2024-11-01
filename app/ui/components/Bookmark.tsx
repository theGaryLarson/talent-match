"use client"
import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
export default function Bookmark({ bookmarked, addUrl, removeUrl }:
                                 { bookmarked: boolean ; addUrl: string ; removeUrl: string }) {
    const [isBookmarked, setIsBookmarked] = useState(bookmarked);
    const router = useRouter();
    async function toggleBookmark() {
        const initalState = isBookmarked;
        setIsBookmarked(!isBookmarked); // optimistic
        
        const url = isBookmarked ? removeUrl : addUrl;
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
        if (!response.ok) { // issue setting bookmark, correct our optimism :(
          setIsBookmarked(initalState);
          
        }else{
       
            router.refresh();
       
        }
    }

    return (
        <div className="p-2 rounded-full hover:bg-slate-200">
            { isBookmarked ? 
                <BookmarkIconSolid className="h-10 w-10 stroke-2" onClick={toggleBookmark} /> :
                <BookmarkIconOutline className="h-10 w-10 stroke-2" onClick={toggleBookmark} /> }
        </div>
    )
}