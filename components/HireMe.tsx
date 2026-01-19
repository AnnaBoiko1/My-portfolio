'use client'
import { useState } from 'react'  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'

export default function HireMe() {
  const [isVisible, setIsVisible] = useState<boolean>(true) 
  
  if (!isVisible) return null
  
  const handleClick = () => {
    window.location.href = 'mailto:annaboiko1@icloud.com?subject=Job Offer&body=Hello, Anna! I interested in your portfolio!'
    setIsVisible(false)  
  }
  
return (
  <div className="fixed bottom-8 right-6 z-[1000] flex items-center gap-3">
    <span className="text-gray-800 font-semibold text-sm whitespace-nowrap">
      Hire Me
    </span>
    <button 
      onClick={handleClick}
      className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center p-0"
      title="Hire Me"
    >
      <FontAwesomeIcon icon={faCommentDots} className="w-5 h-5" />
    </button>
    
    
   
    <button 
      onClick={() => setIsVisible(false)}
      className="w-6 h-6 text-gray-500 hover:text-gray-700 flex items-center justify-center text-xs hover:scale-110 transition-all duration-200 ml-auto"
      title="Close"
    >
      ×
    </button>
  </div>
)


}
