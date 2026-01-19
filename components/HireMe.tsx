'use client'
import { useState } from 'react'  

export default function HireMe() {
  const [isVisible, setIsVisible] = useState<boolean>(true) 
  
  if (!isVisible) return null
  
  const handleClick = () => {
    window.location.href = 'mailto:annaboiko1@icloud.com?subject=Job Offer&body=Hello, Anna! I interested in your portfolio!'
    setIsVisible(false)  
  }
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <button 
        onClick={handleClick}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 text-sm font-semibold"
      >
        Hire Me
      </button>
      {isVisible && (
        <button 
          onClick={() => setIsVisible(false)}
          className="w-8 h-8 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full flex items-center justify-center text-xs shadow-md"
        >
          ×
        </button>
      )}
    </div>
  )
}
