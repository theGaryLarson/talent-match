"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function Toggle() {
  const [isMoved, setIsMoved] = useState(false);
  const handleClick = () => {
    setIsMoved(!isMoved);
  };

  return (
    <div
      className="relative w-[300px] h-14 border rounded-full cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={`absolute top-0 left-0 w-[150px] h-14 bg-blue-400 rounded-full border transition-transform duration-500 transform ${isMoved ? "translate-x-full" : ""}`}
      />
      <div className="absolute inset-0 flex justify-between items-center px-2">
        <span className="w-1/2 text-center">My View</span>
        <span className="w-1/2 text-center">Showcase View</span>
      </div>
    </div>
  );
}
