"use client";
import { useState } from "react";
import "../app/globals.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'
import { useLanguage } from '@/context/LanguageContext';

export default function HireMe() {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const { t } = useLanguage();

  if (!isVisible) return null;

  const handleClick = () => {
    window.location.href =
      "mailto:annaboiko1@icloud.com?subject=Job Offer&body=Hello, Anna! I interested in your portfolio!";
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-28 right-6 md:right-20 z-1000 flex items-center gap-1">
      <button
        onClick={handleClick}
        className="w-auto h-10 md:h-12 gap-1.5 md:gap-1 text-white rounded-full transition-all duration-300 flex items-center justify-center p-0 bg-transparent hover:bg-transparent"
        title={t('hire_me')}
      >
        <span 
          className="font-semibold text-sm md:text-lg whitespace-nowrap px-1 py-0.5 md:p-0 rounded-[8px] md:rounded-none max-md:backdrop-blur-md max-md:bg-[var(--navbar-bg)]" 
          style={{ 
            color: 'var(--text)',
          }}
        >
          {t('hire_me')}
        </span>
        <FontAwesomeIcon icon={faCommentDots} size="2x"
          className="w-8 h-8 md:w-10 md:h-10 bg-(--blue) rounded-[45%] text-(--purple) shadow-md hover:bg-(--purple) hover:text-(--blue) transition-colors duration-300" />
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
