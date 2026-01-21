"use client";
import { useState } from "react";
import "../app/globals.css"
import Image from 'next/image'

export default function HireMe() {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  if (!isVisible) return null;

  const handleClick = () => {
    window.location.href =
      "mailto:annaboiko1@icloud.com?subject=Job Offer&body=Hello, Anna! I interested in your portfolio!";
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-28 right-6 z-1000 flex items-center gap-1">
      <button
        onClick={handleClick}
        className="w-25 h-10 gap-1 bg-primary-blue hover:bg-primary-red text-white rounded-full  transition-all duration-300 flex items-center justify-center p-0"
        title="Hire Me" 
        
      >
      <span className="text-gray-800 font-semibold text-sm whitespace-nowrap center">
        Hire Me
      </span>
        <Image src= '/hire-me-icon.png' alt="" width={40} height={40}></Image>
      </button>

      <button
        onClick={() => setIsVisible(false)}
        title="Close"
        style={{
        color: 'var(--blue)',
        transform: 'translate(-4px,-10px)'
        
      }}
      >
        ×
      </button>
    </div>
  );
}
