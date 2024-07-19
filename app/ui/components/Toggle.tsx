'use client'
import React, { useState } from 'react';

export default function Toggle() {
    const [isMoved, setIsMoved] = useState(false);

    const handleClick = () => {
        setIsMoved(!isMoved);
    };

    return (
        <div className="w-32 h-14 border" onClick={handleClick}>
            <div 
                className={`w-16 h-14 bg-blue-400 border transition-transform duration-500 ${isMoved ? 'translate-x-full' : ''}`} 
                style={{ transform: isMoved ? 'translateX(100%)' : 'translateX(0)', position: 'relative', left: 0 }}
            >
            </div>
        </div>
    );
}